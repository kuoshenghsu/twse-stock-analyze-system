/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  TrendingUp, 
  CheckSquare, 
  Square, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  RefreshCw, 
  AlertTriangle, 
  FileText, 
  Database, 
  Newspaper, 
  Briefcase, 
  Gauge, 
  Coins, 
  HelpCircle,
  TrendingDown,
  Percent,
  CheckCircle2,
  Sliders,
  DollarSign,
  Layers,
  LineChart,
  Download,
  X,
  Printer,
  ExternalLink,
  Star,
  Trash2,
  Plus,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IndustryType, FilterCondition, AnalysisResponse, AnalysisStockResult } from './types';

const INDUSTRIES: { id: IndustryType; label: string; icon: string }[] = [
  { id: '半導體', label: '半導體', icon: '💻' },
  { id: '電子零組件', label: '電子零組件', icon: '🔌' },
  { id: '電腦及週邊設備', label: '電腦及週邊設備 (AI伺服器/散熱/組裝)', icon: '🖥️' },
  { id: '光電業', label: '光電業 (精密光學/面板/鏡頭)', icon: '👓' },
  { id: '汽車工業', label: '汽車工業 (新能源車/車電零組件)', icon: '🚗' },
  { id: '通訊網路', label: '通訊網路', icon: '📡' },
  { id: '生技醫療', label: '生技醫療', icon: '🧬' },
  { id: '金融保險', label: '金融保險', icon: '🏦' },
  { id: '航運物流', label: '航運物流', icon: '🚢' },
  { id: '綠能環保', label: '綠能環保', icon: '🌱' },
  { id: '傳產', label: '傳產 (化學/鋼鐵/紡織)', icon: '🏗️' },
  { id: '其他', label: '其他 (TWSE 上市分類)', icon: '📦' }
];

const AUTOCOMPLETE_STOCKS: { code: string; name: string; english?: string }[] = [
  // 半導體
  { code: '2330', name: '台積電', english: 'TSMC' },
  { code: '2303', name: '聯電', english: 'UMC' },
  { code: '2454', name: '聯發科', english: 'MediaTek' },
  { code: '2337', name: '旺宏', english: 'Macronix' },
  { code: '3711', name: '日月光投控', english: 'ASE' },
  { code: '2408', name: '南亞科', english: 'Nanya Technology' },
  { code: '2344', name: '華邦電', english: 'Winbond' },
  { code: '3034', name: '聯詠', english: 'Novatek' },
  { code: '3035', name: '智原', english: 'Faraday' },
  { code: '3532', name: '台勝科', english: 'FST' },
  { code: '3443', name: '創意', english: 'Global Unichip' },
  { code: '3661', name: '世芯-KY', english: 'Alchip' },
  { code: '5269', name: '祥碩', english: 'ASMedia' },
  { code: '6415', name: '矽力*-KY', english: 'Silergy' },
  // 電子零組件
  { code: '2308', name: '台達電', english: 'Delta' },
  { code: '2327', name: '國巨', english: 'Yageo' },
  { code: '2317', name: '鴻海', english: 'Foxconn' },
  { code: '2492', name: '華新科', english: 'Walsin Technology' },
  { code: '3037', name: '欣興', english: 'Unimicron' },
  { code: '3189', name: '景碩', english: 'Kinsus' },
  { code: '3044', name: '健鼎', english: 'Tripod' },
  { code: '2383', name: '台光電', english: 'EMC' },
  { code: '3016', name: '嘉晶', english: 'Episil-Precision' },
  { code: '3324', name: '雙鴻', english: 'Auras' },
  { code: '6121', name: '新普', english: 'Simplo' },
  // 電腦及週邊設備
  { code: '2382', name: '廣達', english: 'Quanta' },
  { code: '3231', name: '緯創', english: 'Wistron' },
  { code: '2357', name: '華碩', english: 'ASUS' },
  { code: '2353', name: '宏碁', english: 'Acer' },
  { code: '6669', name: '緯穎', english: 'Wiwynn' },
  { code: '2376', name: '技嘉', english: 'Gigabyte' },
  { code: '3017', name: '奇鋐', english: 'AVC' },
  { code: '2301', name: '光寶科', english: 'Lite-On' },
  // 光電業
  { code: '3008', name: '大立光', english: 'Largan' },
  { code: '3406', name: '玉晶光', english: 'GSEO' },
  { code: '2409', name: '友達', english: 'AUO' },
  { code: '3481', name: '群創', english: 'Innolux' },
  { code: '3673', name: 'TPK-KY', english: 'TPK' },
  // 汽車工業
  { code: '2201', name: '裕隆', english: 'Yulon' },
  { code: '2207', name: '和泰車', english: 'Hotai Motor' },
  { code: '1522', name: '堤維西', english: 'TYC' },
  { code: '2497', name: '怡利電', english: 'E-Lead Electronic' },
  { code: '5243', name: '乙盛-KY', english: 'Eson' },
  // 通訊網路
  { code: '2412', name: '中華電', english: 'Chunghwa Telecom' },
  { code: '3045', name: '台灣大', english: 'Taiwan Mobile' },
  { code: '4904', name: '遠傳', english: 'Far EasTone' },
  { code: '2345', name: '智邦', english: 'Accton' },
  { code: '5388', name: '中磊', english: 'Sercomm' },
  { code: '6285', name: '啟碁', english: 'WNC' },
  { code: '3596', name: '智易', english: 'Arcadyan' },
  { code: '4906', name: '正文', english: 'Gemtek' },
  { code: '3062', name: '建漢', english: 'CyberTAN' },
  // 生技醫療
  { code: '1795', name: '美時', english: 'Lotus Pharmaceutical' },
  { code: '1760', name: '寶齡富錦', english: 'PBF' },
  { code: '4119', name: '旭富', english: 'Sciopharm' },
  { code: '4142', name: '國光生', english: 'Adimmune' },
  { code: '1789', name: '神隆', english: 'ScinoPharm' },
  { code: '1762', name: '中化生', english: 'CCPC' },
  { code: '4106', name: '雃博', english: 'APEX Medical' },
  // 金融保險
  { code: '2881', name: '富邦金', english: 'Fubon Financial' },
  { code: '2882', name: '國泰金', english: 'Cathay Financial' },
  { code: '2891', name: '中信金', english: 'CTBC Financial' },
  { code: '2886', name: '兆豐金', english: 'Mega Financial' },
  { code: '2884', name: '玉山金', english: 'E.SUN Financial' },
  { code: '2892', name: '第一金', english: 'First Financial' },
  { code: '2885', name: '元大金', english: 'Yuanta Financial' },
  { code: '2880', name: '華南金', english: 'Hua Nan Financial' },
  { code: '5880', name: '合庫金', english: 'Taiwan Cooperative Financial' },
  // 航運物流
  { code: '2603', name: '長榮', english: 'Evergreen' },
  { code: '2609', name: '陽明', english: 'Yang Ming' },
  { code: '2615', name: '萬海', english: 'Wan Hai' },
  { code: '2618', name: '長榮航', english: 'EVA Air' },
  { code: '2610', name: '華航', english: 'China Airlines' },
  // 綠能環保
  { code: '6806', name: '森崴能源', english: 'Shinfox Energy' },
  { code: '6869', name: '雲豹能源', english: 'JPP' },
  { code: '1513', name: '中興電', english: 'Chung-Hsin Electric' },
  { code: '1503', name: '士電', english: 'SEEC' },
  { code: '1519', name: '華城', english: 'Fortune Electric' },
  { code: '1514', name: '亞力', english: 'Allis Electric' },
  // 傳產
  { code: '2002', name: '中鋼', english: 'China Steel' },
  { code: '1101', name: '台泥', english: 'TCC' },
  { code: '1102', name: '亞泥', english: 'Asia Cement' },
  { code: '1301', name: '台塑', english: 'Formosa Plastics' },
  { code: '1303', name: '南亞', english: 'Nan Ya Plastics' },
  { code: '1326', name: '台化', english: 'Formosa Chemicals' },
  { code: '1216', name: '統一', english: 'Uni-President' },
  { code: '2105', name: '正新', english: 'Cheng Shin Rubber' },
  // 其他
  { code: '2912', name: '統一超', english: 'President Chain Store' },
  { code: '9904', name: '寶成', english: 'Pou Chen' }
];

const INITIAL_FILTERS: FilterCondition = {
  technical: {
    macd: true,
    above10ma: false,
    above30ma: true,
    gain5pct: false,
    kdGold: false,
    multiLine: true
  },
  chip: {
    vol5000: true,
    vol30maLimit: false,
    foreignBuy: true,
    trustBuy: true,
    dealerBuy: false,
    majorIncrease: false
  },
  macro: {
    ratePos: true,
    inflationBetter: false,
    fxRise: false,
    policy利多: true
  },
  industryCondition: {
    recovery: true,
    peerStrong: false,
    supplyTight: false,
    news利多: true
  },
  capitalFlow: {
    flowIn: true,
    etfBuy: false,
    riskOn: true
  },
  techTransit: {
    newProduct: true,
    newTech: false,
    newBiz: false,
    competitiveness: true
  }
};

const generateHtmlReport = (stock: AnalysisStockResult, report: AnalysisResponse | null) => {
  const dateStr = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
  
  const printSentiment = stock.newsSentiment || "中性";
  let sentimentBg = "#f1f5f9";
  let sentimentColor = "#475569";
  let sentimentBorder = "#cbd5e1";
  if (printSentiment === "正面") {
    sentimentBg = "#ecfdf5";
    sentimentColor = "#047857";
    sentimentBorder = "#a7f3d0";
  } else if (printSentiment === "負面") {
    sentimentBg = "#fef2f2";
    sentimentColor = "#b91c1c";
    sentimentBorder = "#fecaca";
  } else if (printSentiment === "中性") {
    sentimentBg = "#fffbeb";
    sentimentColor = "#d97706";
    sentimentBorder = "#fef3c7";
  }
  
  const conclusionHtml = report && report.conclusion ? `
    <div class="section" style="margin-top: 40px; border-top: 2px solid #e2e8f0; padding-top: 20px;">
      <h2 class="section-title">🔮 產業綜合評估與資金流向對接</h2>
      <div class="grid grid-2">
        <div class="card bg-purple">
          <h3>📈 產業強弱走向</h3>
          <p>${report.conclusion.strength}</p>
        </div>
        <div class="card bg-blue">
          <h3>👥 資金流向監測</h3>
          <p>${report.conclusion.flow}</p>
        </div>
      </div>
      
      <div class="grid grid-2 mt-4">
        <div class="card border-emerald">
          <h3 class="text-emerald">🎯 核心量化利多因子</h3>
          <ul class="list">
            ${(report.conclusion.pros || []).map((p: string) => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div class="card border-amber">
          <h3 class="text-amber">⚠️ 警戒量化風險因子</h3>
          <ul class="list">
            ${(report.conclusion.cons || []).map((c: string) => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【個股量化研究報告】${stock.name} (${stock.code})</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
      padding: 40px 20px;
    }
    
    .container {
      max-width: 850px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    
    header {
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 24px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .header-left h1 {
      font-size: 26px;
      font-weight: 900;
      color: #1e3a8a;
      letter-spacing: -0.025em;
      margin-bottom: 6px;
    }
    
    .header-left .subtitle {
      font-size: 14px;
      color: #475569;
      font-weight: 500;
    }
    
    .header-right {
      text-align: right;
    }
    
    .date-badge {
      font-size: 12px;
      background-color: #f1f5f9;
      color: #334155;
      padding: 6px 12px;
      border-radius: 9999px;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 8px;
    }
    
    .score-box {
      background: linear-gradient(135deg, #059669, #10b981);
      color: white;
      padding: 12px 24px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    }
    
    .score-box .score-val {
      font-size: 32px;
      font-weight: 800;
      line-height: 1;
    }
    
    .score-box .score-lbl {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 4px;
      font-weight: 600;
      opacity: 0.9;
    }
    
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 30px;
    }
    
    .kpi-card {
      padding: 16px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    
    .kpi-card.price {
      background-color: #f8fafc;
    }
    
    .kpi-card.target {
      background-color: #e0e7ff;
      border-color: #c7d2fe;
    }
    
    .kpi-card.operation {
      background-color: #d1fae5;
      border-color: #a7f3d0;
    }
    
    .kpi-label {
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 6px;
      display: block;
    }
    
    .kpi-value {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 12px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .section-content {
      font-size: 14.5px;
      color: #334155;
      line-height: 1.7;
    }
    
    .news-box {
      background-color: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 16px;
      border-radius: 0 12px 12px 0;
      font-style: italic;
      margin-top: 8px;
    }
    
    .risk-banner {
      background-color: #fffbeb;
      border: 1px solid #fde68a;
      padding: 16px;
      border-radius: 12px;
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    
    .risk-banner-title {
      font-weight: 700;
      color: #b45309;
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .risk-banner-desc {
      color: #78350f;
      font-size: 13.5px;
    }
    
    .grid {
      display: grid;
      gap: 16px;
    }
    
    .grid-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .card {
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
    
    .card.bg-purple {
      background-color: #faf5ff;
      border-color: #e9d5ff;
    }
    
    .card.bg-blue {
      background-color: #f0fdf4;
      border-color: #bbf7d0;
    }
    
    .card.border-emerald {
      border-left: 4px solid #10b981;
      background-color: #f6fdf9;
    }
    
    .card.border-amber {
      border-left: 4px solid #f59e0b;
      background-color: #fffdf5;
    }
    
    .card h3 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1e293b;
    }
    
    .card p {
      font-size: 13.5px;
      color: #475569;
    }
    
    .list {
      padding-left: 18px;
      font-size: 13.5px;
      color: #475569;
    }
    
    .list li {
      margin-bottom: 6px;
    }
    
    footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
    }
    
    .text-emerald { color: #047857; }
    .text-amber { color: #b45309; }
    .mt-4 { margin-top: 16px; }
    
    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
        border: none;
        padding: 0;
        max-width: 100%;
      }
      header {
        border-bottom-color: #000;
      }
      .score-box {
        box-shadow: none;
        border: 1px solid #000;
        background: #f1f5f9;
        color: #000;
      }
      .score-box .score-val {
        color: #000;
      }
      .kpi-card {
        border-color: #000 !important;
        background: none !important;
      }
      .kpi-card * {
        color: #000 !important;
      }
      .card {
        background: none !important;
        border-color: #000 !important;
      }
      .card * {
        color: #000 !important;
      }
      .news-box {
        background: none !important;
        border-color: #000 !important;
      }
      .risk-banner {
        background: none !important;
        border-color: #000 !important;
      }
      .risk-banner * {
        color: #000 !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="header-left">
        <h1>${stock.name} (${stock.code}) 量化研究報告</h1>
        <div class="subtitle">台灣證券交易所（TWSE）上市標的・多重因子智慧分析報告</div>
      </div>
      <div class="header-right">
        <div class="date-badge">報告產出時間: ${dateStr} ${timeStr}</div>
        ${report && report.twseDataDate ? `<div class="date-badge" style="background-color: #e0f2fe; color: #0369a1; margin-top: 5px; font-weight: bold;">數據交易日: ${report.twseDataDate}</div>` : ''}
        <div class="score-box">
          <div class="score-val">${stock.score}</div>
          <div class="score-lbl">綜合評分 / 100</div>
        </div>
      </div>
    </header>
    
    <div class="kpi-grid">
      <div class="kpi-card price" style="background-color: #f0f9ff; border-color: #bae6fd;">
        <span class="kpi-label" style="color: #0369a1;">當日價格 (TWSE)</span>
        <span class="kpi-value" style="color: #0369a1;">${typeof stock.currentPrice === 'number' ? 'NT$ ' + stock.currentPrice : stock.currentPrice}</span>
        ${report && report.twseDataDate ? `<div style="font-size: 10px; color: #0284c7; margin-top: 4px; font-weight: bold;">數據日期: ${report.twseDataDate}</div>` : ''}
      </div>
      <div class="kpi-card price" style="background-color: #fdf2f8; border-color: #fbcfe8;">
        <span class="kpi-label" style="color: #be185d;">分析基準價 (FinMind)</span>
        <span class="kpi-value" style="color: #be185d;">${stock.previousPrice ? 'NT$ ' + stock.previousPrice : 'NT$ ' + stock.currentPrice}</span>
      </div>
      <div class="kpi-card target">
        <span class="kpi-label" style="color: #4f46e5;">量化估算目標價</span>
        <span class="kpi-value" style="color: #4f46e5;">${stock.targetPrice}</span>
      </div>
      <div class="kpi-card operation">
        <span class="kpi-label" style="color: #059669;">操作價位帶建議</span>
        <span class="kpi-value" style="color: #059669; font-size: 13px; display: block; margin-top: 4px;">${stock.operatingRange}</span>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">📊 技術面分析要評</h2>
      <div class="section-content">
        <p>${stock.technicalSummary}</p>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">👥 籌碼進出考量</h2>
      <div class="section-content">
        <p>${stock.chipSummary}</p>
      </div>
    </div>
    
    <div class="section">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px;">
        <h2 class="section-title" style="border: none; margin: 0; padding: 0;">📰 當日財經新聞與輿情觀點 (Anue 鉅亨網/經濟日報關鍵摘要)</h2>
        ${stock.newsUrl ? `
          <a href="${stock.newsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11.5px; color: #0284c7; text-decoration: none; font-weight: bold; background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 3px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
            閱讀完整報導 ↗
          </a>
        ` : ''}
      </div>
      <div class="section-content">
        <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 11px; font-weight: bold; padding: 3px 9px; border-radius: 99px; background-color: ${sentimentBg}; color: ${sentimentColor}; border: 1px solid ${sentimentBorder}; display: inline-flex; align-items: center; gap: 4px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${sentimentColor};"></span>
            新聞情緒分析指標 Sentiment: ${printSentiment}
          </span>
        </div>
        <div class="news-box">
          「${stock.newsSummary}」
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">⚠️ 風險防守與關鍵注意</h2>
      <div class="risk-banner">
        <div>
          <div class="risk-banner-title">理財防守提示：</div>
          <p class="risk-banner-desc">${stock.riskAlert}</p>
        </div>
      </div>
    </div>
    
    ${conclusionHtml}
    
    <footer>
      <p>※ 本報告由「台灣證券交易所個股與產業整合分析系統」自動計算生成。僅供學術研究與量化參考，不代表任何形式之投資引導與買賣推介。 ※</p>
    </footer>
  </div>
</body>
</html>`;
};

const generateAllHtmlReport = (stocks: AnalysisStockResult[], report: AnalysisResponse | null) => {
  const dateStr = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
  
  const industryStr = report && report.scope && report.scope.industries ? report.scope.industries.join(', ') : '';

  const conclusionHtml = report && report.conclusion ? `
    <div class="conclusion-cover page-break">
      <div class="cover-header">
        <h1>🔮 產業綜合評估與資金流向對接</h1>
        <p style="margin-top: 6px; color: #475569;">產業板塊資金熱度與多空利多/風險關鍵因子對接研究</p>
      </div>

      <div class="grid grid-2" style="margin-top: 24px;">
        <div class="card bg-purple">
          <h3>📈 產業強弱走向</h3>
          <p>${report.conclusion.strength}</p>
        </div>
        <div class="card bg-blue">
          <h3>👥 資金流向監測</h3>
          <p>${report.conclusion.flow}</p>
        </div>
      </div>
      
      <div class="grid grid-2 mt-4" style="margin-top: 20px;">
        <div class="card border-emerald">
          <h3 class="text-emerald">🎯 核心量化利多因子</h3>
          <ul class="list">
            ${(report.conclusion.pros || []).map((p: string) => `<li>${p}</li>`).join('')}
          </ul>
        </div>
        <div class="card border-amber">
          <h3 class="text-amber">⚠️ 警戒量化風險因子</h3>
          <ul class="list">
            ${(report.conclusion.cons || []).map((c: string) => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div style="text-align: center; margin-top: 80px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 40px;">
        <p style="font-size: 16px; font-weight: bold; color: #1e3a8a;">精選之五大最具潛力標的個股深度量化研究報告</p>
        <span style="font-size: 12px; display: block; margin-top: 8px;">(以下各標的在瀏覽、列印或另存 PDF 時將會自動分配於獨立頁面)</span>
      </div>
    </div>
  ` : '';

  const stocksHtml = stocks.map((stock, index) => {
    const printSentiment = stock.newsSentiment || "中性";
    let sentimentBg = "#f1f5f9";
    let sentimentColor = "#475569";
    let sentimentBorder = "#cbd5e1";
    if (printSentiment === "正面") {
      sentimentBg = "#ecfdf5";
      sentimentColor = "#047857";
      sentimentBorder = "#a7f3d0";
    } else if (printSentiment === "負面") {
      sentimentBg = "#fef2f2";
      sentimentColor = "#b91c1c";
      sentimentBorder = "#fecaca";
    } else if (printSentiment === "中性") {
      sentimentBg = "#fffbeb";
      sentimentColor = "#d97706";
      sentimentBorder = "#fef3c7";
    }
    return `
    <div class="stock-section ${index < stocks.length - 1 ? 'page-break' : ''}">
      <div class="stock-header">
        <div class="rank-badge">推薦第 ${index + 1} 名</div>
        <h2>${stock.name} (${stock.code}) 量化研究報告</h2>
        <div class="score-badge">綜合評分: ${stock.score} / 100</div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card price" style="background-color: #f0f9ff; border-color: #bae6fd;">
          <span class="kpi-label" style="color: #0369a1;">當日價格 (TWSE)</span>
          <span class="kpi-value" style="color: #0369a1;">${typeof stock.currentPrice === 'number' ? 'NT$ ' + stock.currentPrice : stock.currentPrice}</span>
          ${report && report.twseDataDate ? `<div style="font-size: 10px; color: #0284c7; margin-top: 4px; font-weight: bold;">數據日期: ${report.twseDataDate}</div>` : ''}
        </div>
        <div class="kpi-card price" style="background-color: #fdf2f8; border-color: #fbcfe8;">
          <span class="kpi-label" style="color: #be185d;">分析基準價 (FinMind)</span>
          <span class="kpi-value" style="color: #be185d;">${stock.previousPrice ? 'NT$ ' + stock.previousPrice : 'NT$ ' + stock.currentPrice}</span>
        </div>
        <div class="kpi-card target">
          <span class="kpi-label" style="color: #4f46e5;">量化估算目標價</span>
          <span class="kpi-value" style="color: #4f46e5;">${stock.targetPrice}</span>
        </div>
        <div class="kpi-card operation">
          <span class="kpi-label" style="color: #059669;">操作價位帶建議</span>
          <span class="kpi-value" style="color: #059669; font-size: 11px; display: block; margin-top: 4px; line-height: 1.3;">${stock.operatingRange}</span>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">📊 技術面分析要評</h3>
        <div class="section-content">
          <p>${stock.technicalSummary}</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">👥 籌碼進出考量</h3>
        <div class="section-content">
          <p>${stock.chipSummary}</p>
        </div>
      </div>
      
      <div class="section">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px;">
          <h3 class="section-title" style="border: none; margin: 0; padding: 0;">📰 當日財經新聞與輿情觀點</h3>
          ${stock.newsUrl ? `
            <a href="${stock.newsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; color: #0284c7; text-decoration: none; font-weight: bold; background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 6px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
              閱讀完整報導 ↗
            </a>
          ` : ''}
        </div>
        <div class="section-content">
          <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 11px; font-weight: bold; padding: 3px 9px; border-radius: 99px; background-color: ${sentimentBg}; color: ${sentimentColor}; border: 1px solid ${sentimentBorder}; display: inline-flex; align-items: center; gap: 4px;">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${sentimentColor};"></span>
              新聞情緒分析指標 Sentiment: ${printSentiment}
            </span>
          </div>
          <div class="news-box">
            「${stock.newsSummary}」
          </div>
        </div>
      </div>
      
      <div class="section" style="margin-bottom: 0;">
        <h3 class="section-title">⚠️ 風險防守與關鍵注意</h3>
        <div class="risk-banner">
          <div>
            <div class="risk-banner-title">理緩防守提示：</div>
            <p class="risk-banner-desc">${stock.riskAlert}</p>
          </div>
        </div>
      </div>
    </div>
  `; }).join('');

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>【產業前五名最具潛力標的合併報告】${industryStr}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
      padding: 40px 20px;
    }
    
    .container {
      max-width: 850px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }

    .master-title-block {
      text-align: center;
      border-bottom: 3px double #3b82f6;
      padding-bottom: 24px;
      margin-bottom: 40px;
    }

    .master-title-block h1 {
      font-size: 26px;
      font-weight: 900;
      color: #1e3a8a;
      margin-bottom: 10px;
    }

    .master-title-block .metadata {
      font-size: 13px;
      color: #475569;
      display: flex;
      justify-content: center;
      gap: 20px;
      font-weight: 500;
    }

    .page-break {
      page-break-after: always;
      break-after: page;
    }

    .conclusion-cover {
      padding-bottom: 30px;
      margin-bottom: 40px;
    }

    .cover-header h1 {
      font-size: 20px;
      font-weight: 800;
      color: #1e3a8a;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 8px;
    }

    .stock-section {
      padding-top: 30px;
      padding-bottom: 30px;
      margin-bottom: 40px;
    }

    .stock-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 12px;
    }

    .rank-badge {
      font-weight: 800;
      font-size: 11px;
      background-color: #3b82f6;
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      text-transform: uppercase;
    }

    .stock-header h2 {
      font-size: 20px;
      font-weight: 850;
      color: #0f172a;
      flex: 1;
      margin-left: 15px;
    }

    .score-badge {
      font-size: 12px;
      background-color: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
      font-weight: bold;
      padding: 4px 12px;
      border-radius: 8px;
    }
    
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 25px;
    }
    
    .kpi-card {
      padding: 12px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    
    .kpi-card.price {
      background-color: #f8fafc;
    }
    
    .kpi-card.target {
      background-color: #e0e7ff;
      border-color: #c7d2fe;
    }
    
    .kpi-card.operation {
      background-color: #d1fae5;
      border-color: #a7f3d0;
    }
    
    .kpi-label {
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 4px;
      display: block;
    }
    
    .kpi-value {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 4px;
    }
    
    .section-content {
      font-size: 13.5px;
      color: #334155;
      line-height: 1.6;
    }
    
    .news-box {
      background-color: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 12px;
      border-radius: 0 12px 12px 0;
      font-style: italic;
      margin-top: 4px;
    }
    
    .risk-banner {
      background-color: #fffbeb;
      border: 1px solid #fde68a;
      padding: 12px;
      border-radius: 12px;
      display: flex;
      gap: 12px;
    }
    
    .risk-banner-title {
      font-weight: 700;
      color: #b45309;
      font-size: 13px;
      margin-bottom: 2px;
    }
    
    .risk-banner-desc {
      color: #78350f;
      font-size: 12.5px;
    }
    
    .grid {
      display: grid;
      gap: 16px;
    }
    
    .grid-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .card {
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
    
    .card.bg-purple {
      background-color: #faf5ff;
      border-color: #e9d5ff;
    }
    
    .card.bg-blue {
      background-color: #f0fdf4;
      border-color: #bbf7d0;
    }
    
    .card.border-emerald {
      border-left: 4px solid #10b981;
      background-color: #f6fdf9;
    }
    
    .card.border-amber {
      border-left: 4px solid #f59e0b;
      background-color: #fffdf5;
    }
    
    .card h3 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1e293b;
    }
    
    .card p {
      font-size: 13px;
      color: #475569;
    }
    
    .list {
      padding-left: 18px;
      font-size: 13px;
      color: #475569;
    }
    
    .list li {
      margin-bottom: 6px;
    }
    
    footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      margin-top: 40px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
    }
    
    .text-emerald { color: #047857; }
    .text-amber { color: #b45309; }
    .mt-4 { margin-top: 16px; }
    
    @media print {
      body {
        background-color: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
        border: none;
        padding: 0;
        max-width: 100%;
      }
      .master-title-block {
        border-bottom-color: #000;
      }
      .stock-header {
        border-bottom-color: #000;
      }
      .cover-header h1 {
        border-bottom-color: #000;
      }
      .rank-badge {
        background-color: #000 !important;
        color: #fff !important;
        border: 1px solid #000;
      }
      .score-badge {
        background: none !important;
        border-color: #000 !important;
        color: #000 !important;
      }
      .kpi-card {
        border-color: #000 !important;
        background: none !important;
      }
      .kpi-card * {
        color: #000 !important;
      }
      .card {
        background: none !important;
        border-color: #000 !important;
      }
      .card * {
        color: #000 !important;
      }
      .news-box {
        background: none !important;
        border-color: #000 !important;
      }
      .risk-banner {
        background: none !important;
        border-color: #000 !important;
      }
      .risk-banner * {
        color: #000 !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="master-title-block">
      <h1>【產業多因子量化評估與潛力個股合併報告】</h1>
      <div class="subtitle" style="font-size: 16px; color: #3b82f6; font-weight: bold; margin-bottom: 8px;">產業板塊：${industryStr}</div>
      <div class="metadata">
        <span>報告產出時間：${dateStr} ${timeStr}</span>
        ${report && report.twseDataDate ? `<span>最新數據交易日：${report.twseDataDate}</span>` : ''}
      </div>
    </div>

    ${conclusionHtml}
    
    ${stocksHtml}
    
    <footer>
      <p>※ 本報告由「台灣證券交易所個股與產業整合分析系統」自動計算生成。僅供學術研究與量化參考，不代表任何形式之投資引導與買賣推介。 ※</p>
    </footer>
  </div>
</body>
</html>`;
};

export default function App() {
  const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>(['半導體']);
  const [filters, setFilters] = useState<FilterCondition>(INITIAL_FILTERS);
  const [analysisPeriod, setAnalysisPeriod] = useState<string>('1m');
  const [priceSourceMode, setPriceSourceMode] = useState<string>('auto');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<string>('');
  const [tpexStatus, setTpexStatus] = useState<{ online: boolean; tpexQuotesCount: number; twseQuotesCount?: number; tpexConnection: string } | null>(null);
  
  // Section expand/collapse controls
  const [expandedSections, setExpandedSections] = useState({
    technical: true,
    chip: true,
    macro: false,
    industryCondition: false,
    capitalFlow: false,
    techTransit: false
  });

  const [report, setReport] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [printingStockCode, setPrintingStockCode] = useState<string | null>(null);
  const [exportModalStock, setExportModalStock] = useState<AnalysisStockResult | null>(null);

  // Watchlist & manual tracking states
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tw_watchlist');
      // Use standard default codes if local storage is empty
      return stored ? JSON.parse(stored) : ['2330', '2317', '2454'];
    } catch (_) {
      return ['2330', '2317', '2454'];
    }
  });

  const [watchlistInput, setWatchlistInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [apiSuggestions, setApiSuggestions] = useState<Array<{ code: string; name: string; english?: string }>>([]);

  // Debounced real-time suggestions fetch from the complete TWSE stock list
  useEffect(() => {
    const query = watchlistInput.trim();
    if (!query) {
      setApiSuggestions([]);
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search-stocks?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.stocks)) {
            setApiSuggestions(data.stocks);
          }
        }
      } catch (err) {
        console.error('Failed to fetch autocomplete suggestions from API:', err);
      }
    }, 250); // 250ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [watchlistInput]);

  const filteredSuggestions = (() => {
    const query = watchlistInput.trim().toLowerCase();
    if (!query) return [];

    // Prioritize direct matches from primary local HOT assets dictionary
    const localMatches = AUTOCOMPLETE_STOCKS.filter(st => {
      return (
        st.code.includes(query) ||
        st.name.toLowerCase().includes(query) ||
        (st.english && st.english.toLowerCase().includes(query))
      );
    });

    // Map fetched API suggestions to standard schema
    const apiMatches = apiSuggestions.map(st => ({
      code: st.code,
      name: st.name,
      english: st.english || ''
    }));

    // Merge without duplicates favoring hot predefined metadata
    const merged = [...localMatches];
    const seen = new Set(localMatches.map(st => st.code));
    
    apiMatches.forEach(st => {
      if (!seen.has(st.code)) {
        seen.add(st.code);
        merged.push(st);
      }
    });

    return merged.slice(0, 10);
  })();

  const [watchlistQuotes, setWatchlistQuotes] = useState<Array<{
    code: string;
    name: string;
    close: number;
    change: number;
    changePercent: number;
    foundInTwse?: boolean;
  }>>([]);
  const [fetchingWatchlist, setFetchingWatchlist] = useState<boolean>(false);

  const fetchWatchlistQuotes = async (currentWatchlist: string[]) => {
    if (currentWatchlist.length === 0) {
      setWatchlistQuotes([]);
      return;
    }
    setFetchingWatchlist(true);
    try {
      const res = await fetch('/api/watchlist-quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes: currentWatchlist })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.quotes)) {
          setWatchlistQuotes(data.quotes);
        }
      }
    } catch (err) {
      console.error('Failed to load watchlist quotes:', err);
    } finally {
      setFetchingWatchlist(false);
    }
  };

  useEffect(() => {
    fetchWatchlistQuotes(watchlist);
  }, [watchlist]);

  const handleAddToWatchlist = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = watchlistInput.trim();
    if (!cleanInput) return;
    
    // Attempt to map name/english to stock code if it is in our dictionary
    let targetCode = cleanInput;
    const foundMatch = AUTOCOMPLETE_STOCKS.find(st => 
      st.name === cleanInput || 
      st.name.toLowerCase() === cleanInput.toLowerCase() || 
      (st.english && st.english.toLowerCase() === cleanInput.toLowerCase())
    );
    if (foundMatch) {
      targetCode = foundMatch.code;
    }

    if (!/^[A-Za-z0-9]{4,6}$/.test(targetCode)) {
      alert('請輸入正確的台灣股票代號（4-6碼）或搜尋建議清單中的個股名稱（例如：台積電、2330、TSMC）。');
      return;
    }

    if (watchlist.includes(targetCode)) {
      alert('該個股已在您的自選追蹤清單中。');
      return;
    }

    const updated = [...watchlist, targetCode];
    setWatchlist(updated);
    setWatchlistInput('');
    setShowSuggestions(false);
    try {
      localStorage.setItem('tw_watchlist', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save watchlist to localStorage:', err);
    }
  };

  const handleRemoveFromWatchlist = (codeToRemove: string) => {
    const updated = watchlist.filter(code => code !== codeToRemove);
    setWatchlist(updated);
    try {
      localStorage.setItem('tw_watchlist', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save watchlist to localStorage:', err);
    }
  };

  const handleAddCodeToWatchlist = (code: string) => {
    if (watchlist.includes(code)) return;
    const updated = [...watchlist, code];
    setWatchlist(updated);
    try {
      localStorage.setItem('tw_watchlist', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save watchlist to localStorage:', err);
    }
  };

  const analyzeCustomStock = async (code: string) => {
    setLoading(true);
    setError(null);
    setReport(null);

    const logMessages = [
      `⚡ 正在為自選個股 [${code}] 下載並剖析最新行情與籌碼數據...`,
      '📈 計算當日價格走勢與成交量能指標...',
      '👥 解析該個股之三大法人、投信、自營商籌碼買賣紀錄...',
      '🤖 啟動 Gemini 3.5 智能理財專家，調閱最新與該個股相關的重大財經財商事件...',
      '🔍 綜合提煉深度報告、客觀評估產業地位以及風險提示...'
    ];

    let currentLogIdx = 0;
    setLoadingProgress(logMessages[0]);
    
    const interval = setInterval(() => {
      currentLogIdx++;
      if (currentLogIdx < logMessages.length) {
        setLoadingProgress(logMessages[currentLogIdx]);
      }
    }, 2500);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industries: [],
          filters: {
            fundamental: { peLower: 0, peUpper: 200, yieldLower: 0, pbUpper: 20 },
            chip: { foreignBuy: false, trustBuy: false },
            technical: { gain5pct: false }
          },
          period: analysisPeriod,
          priceSourceMode,
          customCode: code
        })
      });

      clearInterval(interval);

      if (!res.ok) {
        throw new Error('伺服器分析或網際網路通道超時，請重新選取條件並再次分析。');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.message || '分析失敗');
      }

      setReport(data);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || '連線中斷，請重試');
    } finally {
      setLoading(false);
    }
  };

  const analyzeWatchlistAll = async () => {
    if (watchlist.length === 0) {
      alert('您的自選追蹤清單目前為空，請先新增個股代號！');
      return;
    }
    setLoading(true);
    setError(null);
    setReport(null);

    const logMessages = [
      `⚡ 正在為您清單中所有的自選個股 [${watchlist.join(', ')}] 調取最新行情數據...`,
      '📈 全面交叉分析當日價格走勢與大盤成交量能指標...',
      '👥 解析清單中所有個股之三大法人、投信、自營商聯動籌碼流向...',
      '🤖 啟動 Gemini 3.5 智能理財專家，深度調研這批自選股之最新財商事件與重大消息...',
      '🔍 綜合提煉多股對比深度報告、估計各自目標價、操作區間及配置提示...'
    ];

    let currentLogIdx = 0;
    setLoadingProgress(logMessages[0]);
    
    const interval = setInterval(() => {
      currentLogIdx++;
      if (currentLogIdx < logMessages.length) {
        setLoadingProgress(logMessages[currentLogIdx]);
      }
    }, 2500);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industries: [],
          filters: {
            fundamental: { peLower: 0, peUpper: 200, yieldLower: 0, pbUpper: 20 },
            chip: { foreignBuy: false, trustBuy: false },
            technical: { gain5pct: false }
          },
          period: analysisPeriod,
          priceSourceMode,
          customCodes: watchlist
        })
      });

      clearInterval(interval);

      if (!res.ok) {
        throw new Error('伺服器分析或網際網路通道超時，請重新選取條件並再次分析。');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.message || '分析失敗');
      }

      setReport(data);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || '連線中斷，請重試');
    } finally {
      setLoading(false);
    }
  };

  const getTaiwanDateStr = () => {
    try {
      const formatter = new Intl.DateTimeFormat('zh-TW', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formatter.format(new Date()).replace(/\//g, '-');
    } catch (e) {
      return '2026-06-03';
    }
  };

  const handlePrintStock = (stockCode: string) => {
    setPrintingStockCode(stockCode);
    document.body.classList.add('printing-single-card');
    setTimeout(() => {
      window.print();
      document.body.classList.remove('printing-single-card');
      setPrintingStockCode(null);
    }, 150);
  };

  // Fetch TPEx connection status on mount
  useEffect(() => {
    checkTpexStatus();
  }, []);

  const checkTpexStatus = async () => {
    try {
      const res = await fetch('/api/tpex/status');
      if (res.ok) {
        const data = await res.json();
        setTpexStatus(data);
      }
    } catch (e) {
      setTpexStatus({ online: true, tpexQuotesCount: 0, tpexConnection: 'FAILED' });
    }
  };

  const handleToggleIndustry = (id: IndustryType) => {
    if (selectedIndustries.includes(id)) {
      if (selectedIndustries.length > 1) {
        setSelectedIndustries(selectedIndustries.filter(i => i !== id));
      }
    } else {
      setSelectedIndustries([...selectedIndustries, id]);
    }
  };

  const handleToggleFilter = (cat: keyof FilterCondition, field: string) => {
    setFilters(prev => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        [field]: !((prev[cat] as any)[field])
      }
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper to load presets
  const applyPreset = (presetName: 'growth' | 'chip' | 'defense') => {
    if (presetName === 'growth') {
      setFilters({
        technical: { macd: true, above10ma: true, above30ma: true, gain5pct: true, kdGold: true, multiLine: true },
        chip: { vol5000: true, vol30maLimit: true, foreignBuy: true, trustBuy: false, dealerBuy: false, majorIncrease: true },
        macro: { ratePos: true, inflationBetter: true, fxRise: false, policy利多: true },
        industryCondition: { recovery: true, peerStrong: true, supplyTight: false, news利多: true },
        capitalFlow: { flowIn: true, etfBuy: false, riskOn: true },
        techTransit: { newProduct: true, newTech: true, newBiz: false, competitiveness: true }
      });
    } else if (presetName === 'chip') {
      setFilters({
        technical: { macd: false, above10ma: true, above30ma: true, gain5pct: false, kdGold: true, multiLine: false },
        chip: { vol5000: true, vol30maLimit: false, foreignBuy: true, trustBuy: true, dealerBuy: true, majorIncrease: true },
        macro: { ratePos: false, inflationBetter: false, fxRise: true, policy利多: false },
        industryCondition: { recovery: true, peerStrong: false, supplyTight: true, news利多: true },
        capitalFlow: { flowIn: true, etfBuy: true, riskOn: true },
        techTransit: { newProduct: false, newTech: false, newBiz: false, competitiveness: true }
      });
    } else if (presetName === 'defense') {
      setFilters({
        technical: { macd: true, above10ma: false, above30ma: true, gain5pct: false, kdGold: false, multiLine: true },
        chip: { vol5000: false, vol30maLimit: true, foreignBuy: true, trustBuy: false, dealerBuy: false, majorIncrease: false },
        macro: { ratePos: true, inflationBetter: true, fxRise: true, policy利多: true },
        industryCondition: { recovery: false, peerStrong: false, supplyTight: false, news利多: false },
        capitalFlow: { flowIn: false, etfBuy: true, riskOn: false },
        techTransit: { newProduct: true, newTech: false, newBiz: false, competitiveness: true }
      });
    }
  };

  const handleRunAnalysis = async () => {
    if (selectedIndustries.length === 0) {
      setError('請至少選擇一個產業類別');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    const logMessages = [
      '⚡ 正在向臺灣證券交易所（TWSE）OpenAPI 下載行情數據...',
      '📈 解構成交量能、本益比（PER）與殖利率（Dividend Yield）精細指標...',
      '👥 分類籌碼，提取三大法人（外資、投信、自營商）當日進出流向...',
      '🤖 啟動 Gemini 3.5 智能理財專家，發起總經政策與產業轉型技術評核...',
      '🔍 檢閱奇摩股市與鉅亨網，提煉最新法人報告觀點與媒體風向摘要...'
    ];

    let currentLogIdx = 0;
    setLoadingProgress(logMessages[0]);
    
    const interval = setInterval(() => {
      currentLogIdx++;
      if (currentLogIdx < logMessages.length) {
        setLoadingProgress(logMessages[currentLogIdx]);
      }
    }, 2800);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industries: selectedIndustries,
          filters,
          period: analysisPeriod,
          priceSourceMode
        })
      });

      clearInterval(interval);

      if (!res.ok) {
        throw new Error('伺服器分析或網際網路通道超時，請重新選取條件並再次分析。');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.message || '分析失敗');
      }

      setReport(data);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || '連線中斷，請重試');
    } finally {
      setLoading(false);
    }
  };

  // Convert raw filter keys to readable Taiwanese subtitles for display
  const getSelectedFiltersText = (): string[] => {
    const list: string[] = [];
    if (filters.technical.macd) list.push('MACD靠近黃金交叉 (0<D-M<1.5)');
    if (filters.technical.above10ma) list.push('股價高於10MA');
    if (filters.technical.above30ma) list.push('股價高於30MA');
    if (filters.technical.gain5pct) list.push('本日漲幅>5%');
    if (filters.technical.kdGold) list.push('KD交叉向上');
    if (filters.technical.multiLine) list.push('均線多頭排列');

    if (filters.chip.vol5000) list.push('日成交量大於5000張');
    if (filters.chip.vol30maLimit) list.push('量能無虛爆(<30均量x3)');
    if (filters.chip.foreignBuy) list.push('外資買超擴大');
    if (filters.chip.trustBuy) list.push('投信卡位建倉');
    if (filters.chip.dealerBuy) list.push('自營商跟風加碼');
    if (filters.chip.majorIncrease) list.push('千張大戶持股攀升');

    if (filters.macro.ratePos) list.push('利率政策偏多');
    if (filters.macro.inflationBetter) list.push('通膨預期降溫');
    if (filters.macro.fxRise) list.push('台幣匯率強升');
    if (filters.macro.policy利多) list.push('政府政策偏向利多');

    if (filters.industryCondition.recovery) list.push('景氣拐點成長/復甦');
    if (filters.industryCondition.peerStrong) list.push('同類成分股強勢');
    if (filters.industryCondition.supplyTight) list.push('供需缺口偏緊');
    if (filters.industryCondition.news利多) list.push('正面產業新聞釋出');

    if (filters.capitalFlow.flowIn) list.push('主力資金顯著流入');
    if (filters.capitalFlow.etfBuy) list.push('投信/ETF增量配置');
    if (filters.capitalFlow.riskOn) list.push('市場風險偏好上升');

    if (filters.techTransit.newProduct) list.push('利潤率佳新產品投產');
    if (filters.techTransit.newTech) list.push('前瞻量產新技術製程');
    if (filters.techTransit.newBiz) list.push('高壁壘商業模式轉型');
    if (filters.techTransit.competitiveness) list.push('全球競爭力實質提升');

    return list;
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans antialiased">
      {/* Upper Premium Header bar */}
      <header className="sticky top-0 z-40 bg-white/5 border-b border-white/10 shadow-sm backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg shadow-inner">
              <Gauge className="w-6 h-6" id="header-logo-icon" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                臺灣證券交易所 (TWSE) 機構級個股與產業整合分析系統
              </h1>
              <p className="text-xs text-slate-400 font-mono opacity-80">
                Institutional Quantitative & Technical Intelligence Terminal — Listed Mainboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto text-xs">
            <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded text-slate-300 font-mono font-medium">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              {priceSourceMode === 'auto' && '價格智選核心 (自動雙鏈路)'}
              {priceSourceMode === 'twse' && '價格智選核心 (TWSE API)'}
              {priceSourceMode === 'finmind' && '價格智選核心 (FinMind API)'}
              :
              {tpexStatus ? (
                tpexStatus.tpexConnection === 'SUCCESS' ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    ● SUCCESS
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    ▲ FALLBACK
                  </span>
                )
              ) : (
                <span className="text-slate-400">連接中...</span>
              )}
            </span>
            <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2.5 py-1.5 rounded font-mono font-medium">
              台北時間: {getTaiwanDateStr()}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Control Panel (lg:col-span-4) */}
        <div className="lg:col-span-5 flex flex-col gap-6" id="dashboard-sidebar-controls">
          
          {/* Quick Preset Badges */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm backdrop-blur-md">
            <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-slate-400 animate-pulse" /> 快速套用機構篩選模型
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <button 
                id="preset-growth-btn"
                onClick={() => applyPreset('growth')}
                className="text-xs font-medium py-2 px-1 bg-sky-500/10 text-sky-300 border border-sky-500/20 rounded-lg hover:bg-sky-500/20 transition-colors flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>📈 技術轉型成長股</span>
              </button>
              <button 
                id="preset-chip-btn"
                onClick={() => applyPreset('chip')}
                className="text-xs font-medium py-2 px-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg hover:bg-emerald-500/20 transition-colors flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>👥 法人籌碼多群股</span>
              </button>
              <button 
                id="preset-defense-btn"
                onClick={() => applyPreset('defense')}
                className="text-xs font-medium py-2 px-1 bg-indigo-505/10 text-indigo-300 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition-colors flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>🛡️ 總經防守殖利率股</span>
              </button>
            </div>
          </div>

          {/* ⭐ Custom Watchlist Tracker (自選個股追蹤與分析) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm backdrop-blur-md">
            <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" /> 自選個股追蹤
              </span>
              <span className="text-[10px] bg-white/10 border border-white/15 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                {watchlist.length} 檔追蹤中
              </span>
            </h2>

            {/* Quick manual entry form */}
            <form onSubmit={handleAddToWatchlist} className="flex gap-2 mb-4 animate-fade-in relative">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={watchlistInput}
                  onChange={e => {
                    setWatchlistInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="輸入代碼或中文/英文名稱"
                  maxLength={16}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
                
                {/* Autocomplete Dropdown suggestions list */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 z-[99] max-h-64 overflow-y-auto bg-slate-900 border border-white/15 rounded-lg shadow-2xl backdrop-blur-md divide-y divide-white/5 animate-fade-in">
                    {filteredSuggestions.map((st) => (
                      <button
                        key={st.code}
                        type="button"
                        onMouseDown={() => {
                          setWatchlistInput(st.code);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-blue-600/20 hover:text-white flex items-center justify-between transition-colors cursor-pointer font-sans"
                      >
                        <span className="font-semibold flex items-center gap-1.5">
                          <span className="text-white">{st.name}</span>
                          <span className="text-slate-400 text-[10px] font-mono">({st.code})</span>
                        </span>
                        {st.english && (
                          <span className="text-[10px] text-slate-500 font-mono italic max-w-[120px] truncate">
                            {st.english}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white border border-blue-500/20 rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>新增</span>
              </button>
            </form>

            {/* List of watchlisted stock quotes */}
            {fetchingWatchlist && watchlistQuotes.length === 0 ? (
              <div className="text-center py-4 text-xs text-slate-400 font-mono">
                <RefreshCw className="w-4 h-4 mx-auto mb-1 animate-spin text-blue-400" />
                正在下載自選股 OpenAPI 行情資料...
              </div>
            ) : watchlistQuotes.length === 0 ? (
              <div className="text-center py-4 text-xs text-slate-500 border border-dashed border-white/10 rounded-lg p-3">
                追蹤清單為空。輸入代碼並點擊＋新增自選股。
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {watchlistQuotes.map((quote) => {
                  const isUp = quote.change > 0;
                  const isDown = quote.change < 0;
                  const changeColor = isUp ? 'text-rose-400' : isDown ? 'text-emerald-400' : 'text-slate-400';
                  const changeBg = isUp ? 'bg-rose-500/10 border-rose-500/20' : isDown ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-500/10 border-slate-500/20';
                  
                  return (
                    <div 
                      key={quote.code}
                      className="group flex items-center justify-between bg-black/20 border border-white/5 hover:border-white/10 rounded-lg p-2.5 transition-all"
                    >
                      {/* Left: Code & Name (Interactive analyze trigger) */}
                      <button
                        onClick={() => analyzeCustomStock(quote.code)}
                        className="flex-1 text-left flex flex-col cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                        title="點擊直接呼叫分析系統，開啟 AI 深度剖析"
                        type="button"
                      >
                        <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1">
                          {quote.name || `自選股 ${quote.code}`}
                          <span className="text-[10px] text-slate-400 font-mono font-normal">({quote.code})</span>
                        </span>
                        <span className="text-[10px] text-blue-500 hidden group-hover:inline font-semibold">
                          ⚡ 點擊啟動 AI 深度分析
                        </span>
                      </button>

                      {/* Right: Quick Quote Status */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-200 font-mono">
                            NT$ {quote.close?.toFixed(1) || quote.close}
                          </div>
                          <span className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded font-bold border ${changeBg} ${changeColor}`}>
                            {isUp ? '▲' : isDown ? '▼' : ''}
                            {quote.changePercent ? `${isUp ? '+' : ''}${quote.changePercent}%` : '0.00%'}
                          </span>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => handleRemoveFromWatchlist(quote.code)}
                          className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded transition-all cursor-pointer bg-transparent focus:outline-none"
                          title="移除追蹤"
                          type="button"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {watchlist.length > 0 && (
              <button
                type="button"
                onClick={analyzeWatchlistAll}
                disabled={loading}
                className="w-full mt-3 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-blue-400/20 rounded-lg py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg hover:shadow-indigo-500/15 cursor-pointer focus:outline-none"
              >
                <Cpu className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
                <span>一次分析清單中所有個股 ({watchlist.length} 檔)</span>
              </button>
            )}
            
            <div className="mt-2.5 pt-2 border-t border-white/5 text-[10.5px] text-slate-400 text-center leading-relaxed">
              💡 提示：點擊自選個股可直接啟動 <b>AI 終端系統</b>，對該檔個股深度分析本益比、三大法人籌碼與最新新聞！
            </div>
          </div>

          {/* 1. Industry Categories List */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
              <h2 className="font-bold text-slate-100 flex items-center gap-1.5">
                <Building2 className="w-5 h-5 text-slate-300" /> 選擇上市產業類別
              </h2>
              <span className="text-xs text-slate-400">複選可 / 需至少選 1 項</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {INDUSTRIES.map((industry) => {
                const isSelected = selectedIndustries.includes(industry.id);
                return (
                  <button
                    key={industry.id}
                    id={`industry-btn-${industry.id}`}
                    onClick={() => handleToggleIndustry(industry.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600/50 text-white shadow-lg shadow-blue-900/20 transform scale-[1.02]' 
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg mb-1">{industry.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{industry.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Filter Collapsible Checklist */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2.5">
              <h2 className="font-bold text-slate-100 flex items-center gap-1.5">
                <CheckSquare className="w-5 h-5 text-slate-300" /> 整合分析過濾條件
              </h2>
              <button 
                id="reset-filters-btn"
                onClick={() => setFilters({
                  technical: { macd: false, above10ma: false, above30ma: false, gain5pct: false, kdGold: false, multiLine: false },
                  chip: { vol5000: false, vol30maLimit: false, foreignBuy: false, trustBuy: false, dealerBuy: false, majorIncrease: false },
                  macro: { ratePos: false, inflationBetter: false, fxRise: false, policy利多: false },
                  industryCondition: { recovery: false, peerStrong: false, supplyTight: false, news利多: false },
                  capitalFlow: { flowIn: false, etfBuy: false, riskOn: false },
                  techTransit: { newProduct: false, newTech: false, newBiz: false, competitiveness: false }
                })}
                className="text-xs font-medium text-slate-400 hover:text-red-400 border border-white/10 rounded px-2 py-0.5 hover:bg-white/5 cursor-pointer"
              >
                重置清空
              </button>
            </div>

            {/* Filter accordions */}
            <div className="space-y-4">
              
              {/* Technical indicators accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  id="accordion-technical-toggle"
                  onClick={() => toggleSection('technical')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    📊 技術指標過濾 ({Object.values(filters.technical).filter(Boolean).length})
                  </span>
                  {expandedSections.technical ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedSections.technical && (
                  <div className="p-3.5 space-y-2.5 bg-slate-950/40 border-t border-white/10 transition-all">
                    {[
                      { key: 'macd', label: 'MACD 金叉臨界點 (0 < Diff-MACD < 1.5)' },
                      { key: 'above10ma', label: '收盤價高於 10MA 短支撐' },
                      { key: 'above30ma', label: '收盤價高於 30MA 中期生命線' },
                      { key: 'gain5pct', label: '當日反彈上漲幅 ＞ 5%' },
                      { key: 'kdGold', label: 'KD指標低檔黃金交叉' },
                      { key: 'multiLine', label: '月線/季線 多頭排列' }
                    ].map(f => (
                      <div 
                        key={f.key} 
                        id={`filter-tech-${f.key}`}
                        onClick={() => handleToggleFilter('technical', f.key)}
                        className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300 hover:text-white"
                      >
                        {filters.technical[f.key as keyof typeof filters.technical] ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500/50" />
                        )}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Chip indicators accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  id="accordion-chip-toggle"
                  onClick={() => toggleSection('chip')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    👥 籌碼進出指標 ({Object.values(filters.chip).filter(Boolean).length})
                  </span>
                  {expandedSections.chip ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedSections.chip && (
                  <div className="p-3.5 space-y-2.5 bg-slate-950/40 border-t border-white/10">
                    {[
                      { key: 'vol5000', label: '當日成交量 ＞ 5000 張' },
                      { key: 'vol30maLimit', label: '成交量未失控 (＜30日均量 × 3)' },
                      { key: 'foreignBuy', label: '三大法人：外資買超' },
                      { key: 'trustBuy', label: '三大法人：投信買超' },
                      { key: 'dealerBuy', label: '三大法人：自營商買超' },
                      { key: 'majorIncrease', label: '集保千張籌碼大戶持股增加' }
                    ].map(f => (
                      <div 
                        key={f.key}
                        id={`filter-chip-${f.key}`}
                        onClick={() => handleToggleFilter('chip', f.key)}
                        className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300 hover:text-white"
                      >
                        {filters.chip[f.key as keyof typeof filters.chip] ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500/50" />
                        )}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Macro policy indicators accordion */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  id="accordion-macro-toggle"
                  onClick={() => toggleSection('macro')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    🌎 總體經濟與政策 ({Object.values(filters.macro).filter(Boolean).length})
                  </span>
                  {expandedSections.macro ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedSections.macro && (
                  <div className="p-3.5 space-y-2.5 bg-slate-950/40 border-t border-white/10">
                    {[
                      { key: 'ratePos', label: '利率政策周期偏多 (降息預期)' },
                      { key: 'inflationBetter', label: 'CPI通膨數據改善' },
                      { key: 'fxRise', label: '新台幣兌美元匯率走升' },
                      { key: 'policy利多', label: '政府公共政策有政策利多' }
                    ].map(f => (
                      <div 
                        key={f.key}
                        id={`filter-macro-${f.key}`}
                        onClick={() => handleToggleFilter('macro', f.key)}
                        className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300 hover:text-white"
                      >
                        {filters.macro[f.key as keyof typeof filters.macro] ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500/50" />
                        )}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Industry climate and conditions */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  id="accordion-industry-toggle"
                  onClick={() => toggleSection('industryCondition')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    🏭 產業景氣動態 ({Object.values(filters.industryCondition).filter(Boolean).length})
                  </span>
                  {expandedSections.industryCondition ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedSections.industryCondition && (
                  <div className="p-3.5 space-y-2.5 bg-slate-950/40 border-t border-white/10">
                    {[
                      { key: 'recovery', label: '景氣週期呈現 復甦 / 成長 驅動' },
                      { key: 'peerStrong', label: '上游、下游同業鏈條呈現強烈漲勢' },
                      { key: 'supplyTight', label: '庫存調整結束，市場供需偏緊' },
                      { key: 'news利多', label: '新聞媒體透露近期主流訂單利多' }
                    ].map(f => (
                      <div 
                        key={f.key}
                        id={`filter-ind-${f.key}`}
                        onClick={() => handleToggleFilter('industryCondition', f.key)}
                        className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300 hover:text-white"
                      >
                        {filters.industryCondition[f.key as keyof typeof filters.industryCondition] ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500/50" />
                        )}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Capital flow indicators */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  id="accordion-flow-toggle"
                  onClick={() => toggleSection('capitalFlow')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    💸 資金流向與偏好 ({Object.values(filters.capitalFlow).filter(Boolean).length})
                  </span>
                  {expandedSections.capitalFlow ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedSections.capitalFlow && (
                  <div className="p-3.5 space-y-2.5 bg-slate-950/40 border-t border-white/10">
                    {[
                      { key: 'flowIn', label: '同業群板塊資金流入佔比急增' },
                      { key: 'etfBuy', label: '高股息/中小型主題 ETF 加速增持' },
                      { key: 'riskOn', label: '外圍資金追價意願與風險偏好提升' }
                    ].map(f => (
                      <div 
                        key={f.key}
                        id={`filter-flow-${f.key}`}
                        onClick={() => handleToggleFilter('capitalFlow', f.key)}
                        className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300 hover:text-white"
                      >
                        {filters.capitalFlow[f.key as keyof typeof filters.capitalFlow] ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500/50" />
                        )}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical transformation and business innovation */}
              <div className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  id="accordion-transit-toggle"
                  onClick={() => toggleSection('techTransit')}
                  className="w-full flex items-center justify-between p-3.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    ⚡ 技術轉型與競爭力 ({Object.values(filters.techTransit).filter(Boolean).length})
                  </span>
                  {expandedSections.techTransit ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedSections.techTransit && (
                  <div className="p-3.5 space-y-2.5 bg-slate-950/40 border-t border-white/10">
                    {[
                      { key: 'newProduct', label: '高毛利新世代新產品投片投產' },
                      { key: 'newTech', label: '製程領先或跨入前瞻核心新技術' },
                      { key: 'newBiz', label: '從單一產品跨足軟體/授權新商業模式' },
                      { key: 'competitiveness', label: '關鍵核心專利與晶圓全球競爭力提升' }
                    ].map(f => (
                      <div 
                        key={f.key}
                        id={`filter-trans-${f.key}`}
                        onClick={() => handleToggleFilter('techTransit', f.key)}
                        className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300 hover:text-white"
                      >
                        {filters.techTransit[f.key as keyof typeof filters.techTransit] ? (
                          <CheckSquare className="w-4 h-4 text-blue-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500/50" />
                        )}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 3. Analysis Period & Data Source Configuration */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-sm backdrop-blur-md" id="period-selection-panel">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
              <h2 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
                <Sliders className="w-5 h-5 text-slate-300" /> 分析歷史區間條件 (FinMind對接)
              </h2>
              <span className="text-xs text-slate-400">雙資料源</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono tracking-wider">
                  過往歷史時間跨度分析 (影響均線排列、阻力支撐評估)：
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { id: '1w', label: '1 週' },
                    { id: '1m', label: '1 月' },
                    { id: '3m', label: '3 月' },
                    { id: '6m', label: '半年' },
                    { id: '1y', label: '1 年' }
                  ].map(p => (
                    <button
                      key={p.id}
                      id={`period-btn-${p.id}`}
                      type="button"
                      onClick={() => setAnalysisPeriod(p.id)}
                      className={`text-xs font-semibold py-2 rounded-lg border text-center transition-all cursor-pointer ${
                        analysisPeriod === p.id
                          ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-sm font-bold scale-[1.03]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 uppercase font-mono tracking-wider">
                  當日最新價格資訊來源頻道 (容災與自主切換)：
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'auto', label: '自動偵測 / 優選' },
                    { id: 'twse', label: 'TWSE OpenAPI' },
                    { id: 'finmind', label: 'FinMind 智庫' }
                  ].map(p => (
                    <button
                      key={p.id}
                      id={`price-source-btn-${p.id}`}
                      type="button"
                      onClick={() => setPriceSourceMode(p.id)}
                      className={`text-[11px] font-semibold py-2 rounded-lg border text-center transition-all cursor-pointer ${
                        priceSourceMode === p.id
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 shadow-sm font-bold scale-[1.03]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-3.5 rounded-lg space-y-2 text-[11px] text-slate-400 font-sans leading-relaxed">
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold shrink-0">● 最新一日：</span>
                  <span>對接 <strong>TWSE OpenAPI</strong> 自動提取最新收盤行情及三大法人買賣。</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-blue-400 font-bold shrink-0">● 歷史統計：</span>
                  <span>串接 <strong>FinMind 財金資料庫</strong> 下載歷史日K行情，進行週/月生命線走勢關聯。</span>
                </div>
                <div className={`flex items-start gap-1.5 font-medium transition-all duration-300 ${priceSourceMode === 'finmind' ? 'text-emerald-400/95 font-bold bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/25 animate-pulse' : 'text-amber-500/90'}`}>
                  <span className="shrink-0">{priceSourceMode === 'finmind' ? '💡 行情策略：' : '⚠️ 專業算則：'}</span>
                  <span>
                    {priceSourceMode === 'finmind' ? (
                      '【FinMind 模式】主要以提取當日最新收盤價進行量化部署；若當日尚未更新（通常於 14:30 之後更新）或無資料，系統將自動、無縫改採前一日最新收盤數據，以確保分析正確完整。'
                    ) : (
                      '點選分析將自動以前一日收盤價為量化分析原點，今日即時行情僅作為操作價位帶極值參考。'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trigger Analysis Button */}
          <button
            id="start-analysis-btn"
            disabled={loading}
            onClick={handleRunAnalysis}
            className={`w-full py-4 text-center rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              loading 
                ? 'bg-white/5 border border-white/5 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-950/50 border border-blue-500/30 active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
                正在進行智能量化評分與輿情彙整...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current text-white" />
                啟動六大面向分析（最新量化評估）
              </>
            )}
          </button>
          
        </div>

        {/* Right Side Analysis Display Panel (lg:col-span-8) */}
        <div className="lg:col-span-7 flex flex-col gap-6" id="dashboard-result-panel">
          
          {/* Error Board */}
          {error && (
            <div id="error-banner" className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-3 text-rose-300">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm">數據鏈接或計算超時</h3>
                <p className="text-xs mt-1 text-rose-400 opacity-80 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* Condition: Loading Progress Animation */}
            {loading && (
              <motion.div
                key="loading-board"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                id="loading-report-card"
                className="bg-white/5 border border-white/10 shadow-md backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <div className="p-4 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-full mb-6 relative">
                  <RefreshCw className="w-10 h-10 animate-spin" />
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25"></div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">機構級多重因子走勢運算中</h3>
                <p className="text-sm text-blue-300 max-w-md leading-relaxed font-mono px-4 py-2 border border-white/5 bg-white/5 rounded mb-4">
                  {loadingProgress}
                </p>
                <div className="w-64 bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-1.5 rounded-full animate-bar-slide w-1/2"></div>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  本系統將從臺灣證券交易所（TWSE）開放資料提取 當日上市個股標的，對接外資買賣、股價季線並透過 Gemini Grounding 搜索財經新聞網摘要。
                </p>
              </motion.div>
            )}

            {/* Condition: Empty State Dashboard */}
            {!loading && !report && (
              <motion.div
                key="empty-board"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="empty-report-card"
                className="bg-white/5 border border-white/10 rounded-2xl p-8 min-h-[500px] flex flex-col items-center justify-center text-center text-slate-400 backdrop-blur-md font-sans"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-300 mb-5 border border-white/10">
                  <LineChart className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">一鍵產出機構級專業股市報告</h3>
                <span className="text-xs text-slate-400 max-w-sm leading-relaxed mb-6 block">
                  請於左側控制板選擇欲分析的 **上市產業**、配置 **六大過濾指標**，您也可直接點選上方快速套用預設模型。點擊下方「啟動分析」自動生成最新量化分析報告。
                </span>
                
                <div className="grid grid-cols-2 gap-4 max-w-md text-left text-xs bg-black/20 border border-white/5 p-4 rounded-xl font-mono text-slate-300">
                  <div>
                    <span className="font-bold text-blue-400 leading-normal block mb-1">📐 技術面評估 30%</span>
                    指標包含日MACD發散軌跡、KD臨界支撐與30MA股價生命線。
                  </div>
                  <div>
                    <span className="font-bold text-blue-400 leading-normal block mb-1">👥 籌碼集中度 25%</span>
                    結合臺灣證券交易所三大法人明細，過濾外資與投信底層建倉股票。
                  </div>
                  <div className="border-t border-white/10 pt-2.5">
                    <span className="font-bold text-blue-400 block mb-1">🏦 產業與總經 35%</span>
                    過濾利率通膨循環、緊俏供需走勢與晶圓製程技術升級。
                  </div>
                  <div className="border-t border-white/10 pt-2.5">
                    <span className="font-bold text-blue-400 block mb-1">📰 新聞輿情熱度 10%</span>
                    實時檢索鉅亨網 (Anue) 與台股主流財經板塊輿論脈動。
                  </div>
                </div>
              </motion.div>
            )}

            {/* Condition: Full Detailed Report Loaded */}
            {!loading && report && (
              <motion.div
                key="report-board"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
                id="stock-analysis-report"
              >
                {/* 1. Meta / Source info Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-md backdrop-blur-md">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3 mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase block mb-1">
                        Report Overview
                      </span>
                      <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
                        <FileText className="w-5 h-5 text-slate-300" /> 【資料來源與分析範疇】
                      </h3>
                    </div>
                    <div className="text-right text-xs font-sans">
                      <span className="font-semibold block text-slate-300">
                        分析對象: <span className="text-blue-400 font-bold">{report.scope.industries.join(', ')}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-blue-400 block mb-1 font-semibold">【資料來源】</span>
                      <ul className="space-y-1 text-slate-300 list-disc pl-4 font-mono font-medium">
                        <li>
                          收盤行情來源核心 :{' '}
                          <span className="text-emerald-400 font-bold">
                            {priceSourceMode === 'auto' && '自動偵測選定 (TWSE / FinMind 雙連線)'}
                            {priceSourceMode === 'twse' && 'TWSE OpenAPI (強制連線模式)'}
                            {priceSourceMode === 'finmind' && 'FinMind 智庫 API (強制連線模式)'}
                          </span>
                        </li>
                        {report.twseDataDate && (
                          <li>
                            {priceSourceMode === 'auto' && '當日收盤數據'}
                            {priceSourceMode === 'twse' && 'TWSE OpenAPI'}
                            {priceSourceMode === 'finmind' && 'FinMind 智庫'}
                            數據交易日期: <span className="text-sky-400 font-bold font-mono">{report.twseDataDate}</span>
                          </li>
                        )}
                        <li>財經新聞摘要來源: <span className="text-emerald-400 font-bold">{report.sources.news || report.sources.twse}</span></li>
                        {report.sources.missing && report.sources.missing.length > 0 && (
                          <li className="text-amber-400">未獲取部分: {report.sources.missing.join(', ')}</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <span className="text-blue-400 block mb-1 font-semibold">【套用的主要過濾條件】</span>
                      <div className="flex flex-wrap gap-1">
                        {report.scope.filters.map((f, i) => (
                          <span key={i} className="bg-white/5 text-slate-300 border border-white/15 font-mono text-[10px] px-1.5 py-0.5 rounded leading-tight">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Top 5 Stock List Cards */}
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans pb-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-bold text-slate-100 border-l-4 border-blue-500 pl-2.5 flex items-center gap-1.5 text-base">
                        <TrendingUp className="w-5 h-5 text-slate-200" /> 【產業前五名最具潛力標的】
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        (依技術面/籌碼等多重因子綜合排序評分)
                      </span>
                    </div>

                    {report && report.stocks && report.stocks.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const htmlResult = generateAllHtmlReport(report.stocks.slice(0, 5), report);
                          const blob = new Blob([htmlResult], { type: 'text/html;charset=utf-8;' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          const industryStr = report.scope && report.scope.industries ? report.scope.industries.join('_') : '產業';
                          link.setAttribute('download', `量化研究報告_${industryStr}_前五名合併報告.html`);
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="print-action-btn flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/30 text-emerald-300 hover:text-white px-3 py-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer shadow-sm shadow-emerald-500/5 hover:scale-[1.02]"
                        title="一鍵匯出包含前五名個股的完整合併報告 HTML/PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>匯出前五名合併報告 (HTML/PDF)</span>
                      </button>
                    )}
                  </div>

                  {report.stocks.slice(0, 5).map((stock, index) => (
                    <div 
                      key={stock.code} 
                      id={`stock-card-${stock.code}`}
                      className={`bg-white/5 border border-white/10 rounded-xl shadow-sm hover:shadow-md hover:border-white/20 transition-all divide-y divide-white/10 overflow-hidden backdrop-blur-md ${
                        printingStockCode === stock.code ? 'active-print-target' : ''
                      }`}
                    >
                      {/* Card Title Header info */}
                      <div className="p-4 bg-white/5 flex flex-wrap items-center justify-between gap-3 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-600 border border-blue-500/20 text-white font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-base font-bold text-white font-sans">
                            {stock.name} ({stock.code})
                          </span>
                          <span className="text-xs text-slate-300 font-mono border border-white/10 px-1.5 py-0.5 rounded bg-white/5">
                            證交所上市標的
                          </span>
                        </div>

                        {/* score & print controls */}
                        <div className="flex items-center gap-3">
                          {watchlist.includes(stock.code) ? (
                            <span className="flex items-center gap-1 bg-amber-500/15 text-amber-400 border border-amber-500/25 text-xs px-2.5 py-1 rounded select-none">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="hidden sm:inline">已在自選</span>
                              <span className="sm:hidden">已選</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => handleAddCodeToWatchlist(stock.code)}
                              className="flex items-center gap-1 bg-amber-500/25 hover:bg-amber-500/40 text-amber-300 hover:text-amber-100 border border-amber-500/30 text-xs px-2.5 py-1 rounded transition-colors cursor-pointer"
                              title="將此個股加入自選追蹤清單"
                            >
                              <Star className="w-3.5 h-3.5 text-amber-400" />
                              <span>加入自選</span>
                            </button>
                          )}

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-400">綜合評分:</span>
                            <span className="bg-emerald-600 border border-emerald-500/10 text-white font-mono text-xs font-extrabold px-2.5 py-1 rounded shadow-inner">
                              {stock.score} / 100
                            </span>
                          </div>

                          <button
                            onClick={() => setExportModalStock(stock)}
                            className="print-action-btn flex items-center gap-1 bg-blue-600/25 hover:bg-blue-600/40 text-blue-300 hover:text-white border border-blue-500/30 text-xs px-2.5 py-1 rounded transition-colors cursor-pointer"
                            title="匯出此個股精美 PDF 報告"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>匯出 PDF</span>
                          </button>
                        </div>
                      </div>

                      {/* Financial KPIs Grid */}
                      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-sm text-center font-mono animate-fade-in">
                        <div className="bg-sky-500/5 p-2 rounded border border-sky-500/20 flex flex-col justify-center items-center min-h-[58px]">
                          <span className="text-white font-bold text-base block font-mono">
                            {typeof stock.currentPrice === 'number' ? `NT$ ${stock.currentPrice}` : stock.currentPrice}
                          </span>
                        </div>

                        <div className="bg-pink-500/5 p-2 rounded border border-pink-500/20">
                          <span className="text-pink-400 block mb-0.5 font-sans font-semibold text-[10px] uppercase">
                            前日分析價 (FinMind)
                          </span>
                          <span className="text-white font-bold text-base">
                            {stock.previousPrice ? `NT$ ${stock.previousPrice}` : "NT$ --"}
                          </span>
                        </div>

                        <div className="bg-indigo-500/5 p-2 rounded border border-indigo-500/20">
                          <span className="text-indigo-400 block mb-0.5 font-sans font-semibold text-[10px] uppercase">
                            目標價位帶
                          </span>
                          <span className="text-white font-bold text-sm">
                            {stock.targetPrice}
                          </span>
                        </div>

                        <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/20">
                          <span className="text-emerald-400 block mb-0.5 font-sans font-semibold text-[10px] uppercase">
                            操作價位帶
                          </span>
                          <span className="text-white font-bold text-[11px] sm:text-[12px] leading-tight flex items-center justify-center min-h-[24px]">
                            {stock.operatingRange}
                          </span>
                        </div>
                      </div>

                      {/* Technical and chip details */}
                      <div className="p-4 space-y-4 text-sm leading-relaxed text-slate-300 font-sans">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="font-bold text-white flex items-center gap-1 mb-1.5 bg-blue-500/10 border border-blue-500/10 px-2.5 py-1 rounded w-fit pb-1 sm:w-auto text-xs">
                              📊 技術分析評核
                            </span>
                            <p className="text-slate-200 leading-relaxed text-[13.5px]">{stock.technicalSummary}</p>
                          </div>
                          <div>
                            <span className="font-bold text-white flex items-center gap-1 mb-1.5 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded w-fit pb-1 sm:w-auto text-xs">
                              👥 籌碼進出考量
                            </span>
                            <p className="text-slate-200 leading-relaxed text-[13.5px]">{stock.chipSummary}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-white flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded text-xs w-fit">
                                <Newspaper className="w-3.5 h-3.5 text-slate-400" /> 當日財經新聞輿論摘要 (Anue 鉅亨網/經濟日報關鍵觀點)
                              </span>
                              {(() => {
                                const sentiment = stock.newsSentiment || "中性";
                                if (sentiment === "正面") {
                                  return (
                                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 animate-pulse">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                      正面輿情
                                    </span>
                                  );
                                } else if (sentiment === "負面") {
                                  return (
                                    <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                                      負面輿情
                                    </span>
                                  );
                                } else {
                                  return (
                                    <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                      中性輿情
                                    </span>
                                  );
                                }
                              })()}
                            </div>
                            {stock.newsUrl && (
                              <a
                                href={stock.newsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-sm active:scale-95"
                              >
                                <span>閱讀原始報導 / 搜尋輿情</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10 italic text-[13.5px] leading-relaxed">
                            「{stock.newsSummary}」
                          </p>
                        </div>
                      </div>

                      {/* Risk banner inside individual stock */}
                      <div className="bg-amber-500/5 p-3.5 flex gap-2 text-sm border-t border-white/10 text-slate-300 font-sans md:rounded-b-xl">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="font-sans leading-relaxed text-[13px]">
                          <span className="font-semibold text-amber-400">上行風險與資產預警:</span> {stock.riskAlert}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Global Industry Analysis conclusion */}
                <div id="general-conclusion-block" className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-sm space-y-4 backdrop-blur-md">
                  <h3 className="font-bold text-white border-l-4 border-blue-500 pl-2.5 flex items-center gap-1.5 text-base font-sans">
                    【綜合產業結論與風險揭露】
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-2">
                      <span className="font-bold text-slate-100 block border-b border-white/10 pb-1">
                        🌍 產業強弱與大環境走勢
                      </span>
                      <p className="text-slate-300 leading-relaxed">{report.conclusion.strength}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-2">
                      <span className="font-bold text-slate-100 block border-b border-white/10 pb-1">
                        💸 資金板塊熱度與ETF配置
                      </span>
                      <p className="text-slate-300 leading-relaxed">{report.conclusion.flow}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 font-sans">
                    <div className="space-y-1.5">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        🟢 全局主要上行利多 (Upside Catalysts)
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc pl-4 font-sans">
                        {report.conclusion.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5 font-sans">
                      <span className="font-bold text-red-400 flex items-center gap-1">
                        🔴 全局主要下行風險 (Downside Risks)
                      </span>
                      <ul className="space-y-1 text-slate-300 list-disc pl-4">
                        {report.conclusion.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Formal institutional disclaimer text */}
                <div id="analyst-disclaimer" className="text-[10px] text-slate-400 leading-relaxed font-sans bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="font-bold mb-1 text-slate-300">【宣示性免責聲明 (Institutional Disclaimer)】</p>
                  <p>
                    本研究報告係依據中華民國主管機關核定之開放資料（臺灣證券交易所 TWSE OpenAPI）與合規公開財經新聞資源進行量化指標篩選。報告內容所有推論、目標價格帶與評估分數僅供專業學術與模擬研究用途，非屬特定買賣與投資建議。證券商品價格浮動，過去表現不代表未來獲利，投資人應自行評估整體政策變更、匯率走勢及個股財報風險，並自負投資損益之責。
                  </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      <footer className="bg-black/40 border-t border-white/10 py-6 mt-12 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 臺灣證券交易所（TWSE）整合分析系統 ｜ 金融量化研究院 ｜ 僅供理財研究展示</p>
          <p className="mt-1 text-slate-500">
            Powered by @google/genai & Gemini-3.5-Flash with Google Search Grounding
          </p>
        </div>
      </footer>

      {/* Export modal overlay */}
      <AnimatePresence>
        {exportModalStock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setExportModalStock(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                個股研究報告匯出選項
              </h3>
              
              <div className="mb-5">
                <p className="text-sm text-slate-300">
                  標的：<span className="font-bold text-white">{exportModalStock.name} ({exportModalStock.code})</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  請選擇最適合您的匯出方式：
                </p>
              </div>

              <div className="space-y-4">
                {/* Option 1: Standalone HTML Download */}
                <button
                  onClick={() => {
                    const htmlResult = generateHtmlReport(exportModalStock, report);
                    const blob = new Blob([htmlResult], { type: 'text/html;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `量化研究報告_${exportModalStock.code}_${exportModalStock.name}.html`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setTimeout(() => setExportModalStock(null), 350);
                  }}
                  className="w-full relative flex items-start gap-3 bg-blue-600/20 hover:bg-blue-600/35 border border-blue-500/30 hover:border-blue-500/50 p-4 rounded-xl text-left transition-all group cursor-pointer"
                >
                  <Download className="w-5 h-5 text-blue-400 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-bold text-blue-300 block text-sm group-hover:text-blue-200">
                      1. 下載此個股電子報告 (HTML檔)
                    </span>
                    <span className="text-xs text-slate-300 leading-relaxed block mt-1">
                      下載獨立電子報告。完美配對專業排版與色彩，並可直接按 Ctrl+P 另存為完美單頁 PDF。
                    </span>
                  </div>
                </button>

                {/* Option 2: All Top 5 Industry Stocks Export */}
                {report && report.stocks && report.stocks.length > 0 && (
                  <button
                    onClick={() => {
                      const htmlResult = generateAllHtmlReport(report.stocks.slice(0, 5), report);
                      const blob = new Blob([htmlResult], { type: 'text/html;charset=utf-8;' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      const industryStr = report.scope && report.scope.industries ? report.scope.industries.join('_') : '產業';
                      link.setAttribute('download', `量化研究報告_${industryStr}_前五名合併報告.html`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      setTimeout(() => setExportModalStock(null), 350);
                    }}
                    className="w-full relative flex items-start gap-3 bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/30 hover:border-emerald-500/50 p-4 rounded-xl text-left transition-all group cursor-pointer border-dashed"
                  >
                    <Download className="w-5 h-5 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-bold text-emerald-300 block text-sm group-hover:text-emerald-200">
                        2. 一次匯出『產業前五名』合併報告 (HTML檔)
                      </span>
                      <span className="text-xs text-slate-300 leading-relaxed block mt-1">
                        強烈推薦！一鍵匯出目前產業推薦前 5 名所有個股與總體資金走向評核之精美完整報告。可直接按 Ctrl+P 另存為多頁 PDF，快速一次存檔！
                      </span>
                    </div>
                  </button>
                )}

                {/* Option 3: Browser print window for current stock */}
                <button
                  onClick={() => {
                    const code = exportModalStock.code;
                    setExportModalStock(null);
                    setTimeout(() => {
                      handlePrintStock(code);
                    }, 200);
                  }}
                  className="w-full relative flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 rounded-xl text-left transition-all group cursor-pointer"
                >
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <Printer className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block text-sm group-hover:text-white">
                      3. 呼叫瀏覽器列印當前個股為 PDF
                    </span>
                    <span className="text-xs text-slate-400 leading-relaxed block mt-1">
                      直接呼叫瀏覽器列印列印本張個股。注意：若為預覽 Pane iFrame 限制列印，請點選項 1 或 2 進行下載後儲存。
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setExportModalStock(null)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs rounded-lg transition-colors cursor-pointer font-medium"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
