/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StockData {
  code: string;
  name: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number; // in shares or lots
  change: number; // absolute change
  changePercent: number; // percentage change
  pe?: number; // PE ratio
  yield?: number; // Dividend yield
  pb?: number; // PB ratio
  foreignBuy?: number; // foreign buy amount
  trustBuy?: number; // investment trust buy amount
  dealerBuy?: number; // dealer buy amount
  industry?: string;
}

export type IndustryType =
  | '半導體'
  | '電子零組件'
  | '電腦及週邊設備'
  | '光電業'
  | '汽車工業'
  | '通訊網路'
  | '生技醫療'
  | '金融保險'
  | '航運物流'
  | '綠能環保'
  | '傳產'
  | '其他';

export interface FilterCondition {
  technical: {
    macd: boolean; // MACD 0<D-M<1.5
    above10ma: boolean; // 收盤價 > 10MA
    above30ma: boolean; // 收盤價 > 30MA
    gain5pct: boolean; // 漲幅 > 5%
    kdGold: boolean; // KD黃金交叉
    multiLine: boolean; // 均線多頭排列
  };
  chip: {
    vol5000: boolean; // 成交量 > 5000張
    vol30maLimit: boolean; // 成交量 < 30日均量 * 3
    foreignBuy: boolean; // 外資買超
    trustBuy: boolean; // 投信買超
    dealerBuy: boolean; // 自營商買超
    majorIncrease: boolean; // 大戶增加
  };
  macro: {
    ratePos: boolean; // 利率偏多
    inflationBetter: boolean; // 通膨改善
    fxRise: boolean; // 匯率走升
    policy利多: boolean; // 政策利多
  };
  industryCondition: {
    recovery: boolean; // 產業復甦景氣
    peerStrong: boolean; // 同業強勢
    supplyTight: boolean; // 供需偏緊
    news利多: boolean; // 新聞利多
  };
  capitalFlow: {
    flowIn: boolean; // 資金流入族群
    etfBuy: boolean; // ETF增持
    riskOn: boolean; // 風險偏好提升
  };
  techTransit: {
    newProduct: boolean; // 新產品
    newTech: boolean; // 新技術
    newBiz: boolean; // 新商業模式
    competitiveness: boolean; // 競爭力提升
  };
}

export interface AnalysisStockResult {
  name: string;
  code: string;
  currentPrice: number | string;
  previousPrice?: number | string;
  historySource?: string;
  targetPrice: string;
  operatingRange: string;
  technicalSummary: string;
  chipSummary: string;
  companyIntro: string;
  mainBusiness: string;
  newsSummary: string;
  newsUrl: string;
  score: number;
  riskAlert: string;
}

export interface AnalysisResponse {
  twseDataDate?: string;
  success: {
    tpex: boolean;
    news: boolean;
  };
  sources: {
    tpex: string;
    news: string;
    missing: string[];
  };
  scope: {
    industries: IndustryType[];
    filters: string[];
  };
  stocks: AnalysisStockResult[];
  conclusion: {
    strength: string;
    flow: string;
    pros: string[];
    cons: string[];
  };
}
