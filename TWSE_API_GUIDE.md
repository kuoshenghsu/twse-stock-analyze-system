# 臺灣證券交易所 (TWSE) OpenAPI 接口清單與說明指南

此指南整理自 `https://openapi.twse.com.tw/v1/swagger.json`，共包含 **143** 個 API 接口，分為 **7** 個主要類別。這份參考指引便於為系統後續的財務指標、籌碼與交易面分析提供精準的 OpenAPI 數據鏈路來源。

## 📂 類別：公司治理 (共 56 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/opendata/t187ap46_L_21` | 上市公司企業ESG資訊揭露彙總資料-職業安全衛生 |
| `GET` | `/opendata/t187ap45_L` | 上市公司股利分派情形 |
| `GET` | `/opendata/t187ap46_L_20` | 上市公司企業ESG資訊揭露彙總資料-反競爭行為法律訴訟 |
| `GET` | `/opendata/t187ap46_L_19` | 上市公司企業ESG資訊揭露彙總資料-風險管理政策 |
| `GET` | `/opendata/t187ap46_L_18` | 上市公司企業ESG資訊揭露彙總資料-持股及控制力 |
| `GET` | `/opendata/t187ap46_L_17` | 上市公司企業ESG資訊揭露彙總資料-普惠金融 |
| `GET` | `/opendata/t187ap46_L_16` | 上市公司企業ESG資訊揭露彙總資料-資訊安全 |
| `GET` | `/opendata/t187ap46_L_15` | 上市公司企業ESG資訊揭露彙總資料-社區關係 |
| `GET` | `/opendata/t187ap46_L_14` | 上市公司企業ESG資訊揭露彙總資料-產品品質與安全 |
| `GET` | `/opendata/t187ap46_L_13` | 上市公司企業ESG資訊揭露彙總資料-供應鏈管理 |
| `GET` | `/opendata/t187ap46_L_12` | 上市公司企業ESG資訊揭露彙總資料-食品安全 |
| `GET` | `/opendata/t187ap46_L_11` | 上市公司企業ESG資訊揭露彙總資料-產品生命週期 |
| `GET` | `/opendata/t187ap46_L_10` | 上市公司企業ESG資訊揭露彙總資料-燃料管理 |
| `GET` | `/opendata/t187ap46_L_9` | 上市公司企業ESG資訊揭露彙總資料-功能性委員會 |
| `GET` | `/opendata/t187ap46_L_8` | 上市公司企業ESG資訊揭露彙總資料-氣候相關議題管理 |
| `GET` | `/opendata/t187ap05_P` | 公開發行公司每月營業收入彙總表 |
| `GET` | `/opendata/t187ap46_L_7` | 上市公司企業ESG資訊揭露彙總資料-投資人溝通 |
| `GET` | `/opendata/t187ap46_L_6` | 上市公司企業ESG資訊揭露彙總資料-董事會 |
| `GET` | `/opendata/t187ap46_L_5` | 上市公司企業ESG資訊揭露彙總資料-人力發展 |
| `GET` | `/opendata/t187ap46_L_4` | 上市公司企業ESG資訊揭露彙總資料-廢棄物管理 |
| `GET` | `/opendata/t187ap46_L_3` | 上市公司企業ESG資訊揭露彙總資料-水資源管理 |
| `GET` | `/opendata/t187ap46_L_2` | 上市公司企業ESG資訊揭露彙總資料-能源管理 |
| `GET` | `/opendata/t187ap46_L_1` | 上市公司企業ESG資訊揭露彙總資料-溫室氣體排放 |
| `GET` | `/company/applylistingForeign` | 外國公司向證交所申請第一上市之公司 |
| `GET` | `/company/newlisting` | 最近上市公司 |
| `GET` | `/company/suspendListingCsvAndHtml` | 終止上市公司 |
| `GET` | `/company/applylistingLocal` | 申請上市之本國公司 |
| `GET` | `/opendata/t187ap04_L` | 上市公司每日重大訊息 |
| `GET` | `/opendata/t187ap03_L` | 上市公司基本資料 |
| `GET` | `/opendata/t187ap02_L` | 上市公司持股逾 10% 大股東名單 |
| `GET` | `/opendata/t187ap14_L` | 上市公司各產業EPS統計資訊 |
| `GET` | `/opendata/t187ap08_L` | 上市公司董事、監察人持股不足法定成數彙總表 |
| `GET` | `/opendata/t187ap11_L` | 上市公司董監事持股餘額明細資料 |
| `GET` | `/opendata/t187ap12_L` | 上市公司每日內部人持股轉讓事前申報表-持股轉讓日報表 |
| `GET` | `/opendata/t187ap13_L` | 上市公司每日內部人持股轉讓事前申報表-持股未轉讓日報表 |
| `GET` | `/opendata/t187ap22_L` | 上市公司金管會證券期貨局裁罰案件專區 |
| `GET` | `/opendata/t187ap30_L` | 上市公司獨立董監事兼任情形彙總表 |
| `GET` | `/opendata/t187ap29_A_L` | 上市公司董事酬金相關資訊  |
| `GET` | `/opendata/t187ap29_B_L` | 上市公司監察人酬金相關資訊  |
| `GET` | `/opendata/t187ap29_C_L` | 上市公司合併報表董事酬金相關資訊  |
| `GET` | `/opendata/t187ap29_D_L` | 上市公司合併報表監察人酬金相關資訊  |
| `GET` | `/opendata/t187ap23_L` | 上市公司違反資訊申報、重大訊息及說明記者會規定專區 |
| `GET` | `/opendata/t187ap03_P` | 公開發行公司基本資料 |
| `GET` | `/announcement/punish` | 集中市場公布處置股票 |
| `GET` | `/opendata/t187ap10_L` | 上市公司董事、監察人持股不足法定成數連續達3個月以上彙總表 |
| `GET` | `/opendata/t187ap38_L` | 上市公司股東會公告-召集股東常(臨時)會公告資料彙總表(95年度起適用) |
| `GET` | `/opendata/t187ap24_L` | 上市公司經營權及營業範圍異(變)動專區-經營權異動公司 |
| `GET` | `/opendata/t187ap26_L` | 上市公司經營權及營業範圍異(變)動專區-經營權異動且營業範圍重大變更停止買賣公司 |
| `GET` | `/opendata/t187ap41_L` | 上市公司召開股東常 (臨時) 會日期、地點及採用電子投票情形等資料彙總表 |
| `GET` | `/opendata/t187ap25_L` | 上市公司經營權及營業範圍異(變)動專區-營業範圍重大變更公司 |
| `GET` | `/opendata/t187ap27_L` | 上市公司經營權及營業範圍異(變)動專區-經營權異動且營業範圍重大變更列為變更交易公司 |
| `GET` | `/opendata/t187ap32_L` | 上市公司公司治理之相關規程規則 |
| `GET` | `/opendata/t187ap33_L` | 上市公司董事長是否兼任總經理 |
| `GET` | `/opendata/t187ap09_L` | 上市公司董事、監察人質權設定占董事及監察人實際持有股數彙總表 |
| `GET` | `/opendata/t187ap34_L` | 上市公司採累積投票制、全額連記法、候選人提名制選任董監事及當選資料彙總表 |
| `GET` | `/opendata/t187ap35_L` | 上市公司股東行使提案權情形彙總表 |

## 📂 類別：其他 (共 4 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/opendata/t187ap47_L` | 基金基本資料彙總表 |
| `GET` | `/news/eventList` | 證交所活動訊息 |
| `GET` | `/news/newsList` | 證交所新聞 |
| `GET` | `/exchangeReport/BFI61U` | 中央登錄公債補息資料表 |

## 📂 類別：券商資料 (共 9 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/ETFReport/ETFRank` | 定期定額交易戶數統計排行月報表 |
| `GET` | `/brokerService/secRegData` | 開辦定期定額業務證券商名單 |
| `GET` | `/brokerService/brokerList` | 證券商總公司基本資料 |
| `GET` | `/opendata/t187ap01` | 券商業務別人員數 |
| `GET` | `/opendata/t187ap20` | 各券商每月月計表 |
| `GET` | `/opendata/t187ap21` | 各券商收支概況表資料 |
| `GET` | `/opendata/t187ap18` | 證券商基本資料 |
| `GET` | `/opendata/OpenData_BRK01` | 證券商營業員男女人數統計資料 |
| `GET` | `/opendata/OpenData_BRK02` | 證券商分公司基本資料 |

## 📂 類別：指數 (共 5 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/exchangeReport/MI_INDEX4` | 每日上市上櫃跨市場成交資訊 |
| `GET` | `/indicesReport/FRMSA` | 寶島股價指數歷史資料 |
| `GET` | `/indicesReport/TAI50I` | 臺灣 50 指數歷史資料 |
| `GET` | `/indicesReport/MI_5MINS_HIST` | 發行量加權股價指數歷史資料 |
| `GET` | `/indicesReport/MFI94U` | 發行量加權股價報酬指數 |

## 📂 類別：權證 (共 3 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/opendata/t187ap36_L` | 上市認購(售)權證年度發行量概況統計表 |
| `GET` | `/opendata/t187ap43_L` | 上市認購(售)權證交易人數檔 |
| `GET` | `/opendata/t187ap42_L` | 上市認購(售)權證每日成交資料檔 |

## 📂 類別：證券交易 (共 36 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/exchangeReport/BWIBBU_ALL` | 上市個股日本益比、殖利率及股價淨值比（依代碼查詢） |
| `GET` | `/exchangeReport/STOCK_DAY_AVG_ALL` | 上市個股日收盤價及月平均價 |
| `GET` | `/exchangeReport/STOCK_DAY_ALL` | 上市個股日成交資訊 |
| `GET` | `/exchangeReport/FMSRFK_ALL` | 上市個股月成交資訊 |
| `GET` | `/exchangeReport/FMNPTK_ALL` | 上市個股年成交資訊 |
| `GET` | `/exchangeReport/MI_INDEX` | 每日收盤行情-大盤統計資訊 |
| `GET` | `/fund/MI_QFIIS_cat` | 集中市場外資及陸資投資類股持股比率表 |
| `GET` | `/fund/MI_QFIIS_sort_20` | 集中市場外資及陸資持股前 20 名彙總表 |
| `GET` | `/exchangeReport/TWT88U` | 上市個股首五日無漲跌幅 |
| `GET` | `/Announcement/BFZFZU_T` | 投資理財節目異常推介個股 |
| `GET` | `/exchangeReport/TWTB4U` | 上市股票每日當日沖銷交易標的及統計 |
| `GET` | `/exchangeReport/TWTBAU1` | 集中市場暫停先賣後買當日沖銷交易標的預告表 |
| `GET` | `/exchangeReport/TWTBAU2` | 集中市場暫停先賣後買當日沖銷交易歷史查詢 |
| `GET` | `/exchangeReport/MI_5MINS` | 每 5 秒委託成交統計 |
| `GET` | `/exchangeReport/FMTQIK` | 集中市場每日市場成交資訊 |
| `GET` | `/exchangeReport/MI_INDEX20` | 集中市場每日成交量前二十名證券 |
| `GET` | `/exchangeReport/TWT53U` | 集中市場零股交易行情單 |
| `GET` | `/exchangeReport/TWTAWU` | 集中市場暫停交易證券 |
| `GET` | `/exchangeReport/BFT41U` | 集中市場盤後定價交易 |
| `GET` | `/exchangeReport/BFI84U` | 集中市場停資停券預告表 |
| `GET` | `/exchangeReport/MI_MARGN` | 集中市場融資融券餘額 |
| `GET` | `/block/BFIAUU_d` | 集中市場鉅額交易日成交量值統計 |
| `GET` | `/block/BFIAUU_m` | 集中市場鉅額交易月成交量值統計 |
| `GET` | `/block/BFIAUU_y` | 集中市場鉅額交易年成交量值統計 |
| `GET` | `/exchangeReport/STOCK_FIRST` | 每日第一上市外國股票成交量值 |
| `GET` | `/exchangeReport/TWT85U` | 集中市場證券變更交易 |
| `GET` | `/holidaySchedule/holidaySchedule` | 有價證券集中交易市場開（休）市日期 |
| `GET` | `/exchangeReport/BWIBBU_d` | 上市個股日本益比、殖利率及股價淨值比（依日期查詢） |
| `GET` | `/SBL/TWT96U` | 上市上櫃股票當日可借券賣出股數 |
| `GET` | `/exchangeReport/TWT84U` | 上市個股股價升降幅度 |
| `GET` | `/opendata/twtazu_od` | 集中市場漲跌證券數統計表 |
| `GET` | `/opendata/t187ap19` | 電子式交易統計資訊 |
| `GET` | `/opendata/t187ap37_L` | 上市權證基本資料彙總表 |
| `GET` | `/announcement/notetrans` | 集中市場公布注意累計次數異常資訊 |
| `GET` | `/announcement/notice` | 集中市場當日公布注意股票 |
| `GET` | `/exchangeReport/TWT48U_ALL` | 上市股票除權除息預告表 |

## 📂 類別：財務報表 (共 30 個接口)

| 請求方式 | API 完整路徑 | 接口說明描述與數據集名稱 |
| :---: | :--- | :--- |
| `GET` | `/opendata/t187ap07_X_ci` | 公發公司資產負債表-一般業 |
| `GET` | `/opendata/t187ap07_X_mim` | 公發公司資產負債表-異業 |
| `GET` | `/opendata/t187ap06_X_basi` | 公發公司綜合損益表-金融業 |
| `GET` | `/opendata/t187ap06_X_bd` | 公發公司綜合損益表-證券期貨業 |
| `GET` | `/opendata/t187ap06_X_ci` | 公發公司綜合損益表-一般業 |
| `GET` | `/opendata/t187ap06_X_fh` | 公發公司綜合損益表-金控業 |
| `GET` | `/opendata/t187ap06_X_ins` | 公發公司綜合損益表-保險業 |
| `GET` | `/opendata/t187ap06_X_mim` | 公發公司綜合損益表-異業 |
| `GET` | `/opendata/t187ap05_L` | 上市公司每月營業收入彙總表 |
| `GET` | `/opendata/t187ap15_L` | 上市公司截至各季綜合損益財測達成情形(簡式) |
| `GET` | `/opendata/t187ap16_L` | 上市公司當季綜合損益經會計師查核(核閱)數與當季預測數差異達百分之十以上者，或截至當季累計差異達百分之二十以上者(簡式) |
| `GET` | `/opendata/t187ap17_L` | 上市公司營益分析查詢彙總表(全體公司彙總報表) |
| `GET` | `/opendata/t187ap31_L` | 上市公司財務報告經監察人承認情形 |
| `GET` | `/opendata/t187ap06_L_bd` | 上市公司綜合損益表(證券期貨業) |
| `GET` | `/opendata/t187ap06_L_ci` | 上市公司綜合損益表(一般業) |
| `GET` | `/opendata/t187ap06_L_fh` | 上市公司綜合損益表(金控業) |
| `GET` | `/opendata/t187ap06_L_ins` | 上市公司綜合損益表(保險業) |
| `GET` | `/opendata/t187ap06_L_mim` | 上市公司綜合損益表(異業) |
| `GET` | `/opendata/t187ap07_L_bd` | 上市公司資產負債表(證券期貨業) |
| `GET` | `/opendata/t187ap07_L_ci` | 上市公司資產負債表(一般業) |
| `GET` | `/opendata/t187ap07_L_fh` | 上市公司資產負債表(金控業) |
| `GET` | `/opendata/t187ap07_L_ins` | 上市公司資產負債表(保險業) |
| `GET` | `/opendata/t187ap07_L_mim` | 上市公司資產負債表(異業) |
| `GET` | `/opendata/t187ap07_X_basi` | 公發公司資產負債表-金融業 |
| `GET` | `/opendata/t187ap07_X_bd` | 公發公司資產負債表-證券期貨業 |
| `GET` | `/opendata/t187ap07_X_fh` | 公發公司資產負債表-金控業 |
| `GET` | `/opendata/t187ap07_X_ins` | 公發公司資產負債表-保險業 |
| `GET` | `/opendata/t187ap11_P` | 公發公司董監事持股餘額明細 |
| `GET` | `/opendata/t187ap06_L_basi` | 上市公司綜合損益表(金融業) |
| `GET` | `/opendata/t187ap07_L_basi` | 上市公司資產負債表(金融業) |

