# 修繕進度統計

手機優先的靜態儀表板，無外部 CDN 或追蹤碼。index.html 與 details.html 均以同源 fetch('./repair_public_data.json') 載入已查核的公開快照，請透過 GitHub Pages 或本機 HTTP 伺服器開啟。

依本次明確授權，公開內容包含 A–G 棟彙總與去識別修繕明細。每筆僅允許 caseId、floor、description、trade、status、completeDate、note。禁止姓名、電話、精確戶別、門禁數值、鑰匙／磁扣存放資訊、來源檔識別碼、原始試算表及任何秘密進入儲存庫或 Git 歷史。移除獨立個資欄位不足以完成去識別，description、note 等自由文字也必須審閱及遮除。

## 更新資料

由授權負責人查核指定來源、去識別文字及逐筆狀態後，更新 repair_public_data.json。根鍵僅允許：

- aggregates：A–G 各有 total、open、working、completed、needs_review，皆為非負整數，總數等於四狀態之和及該棟 records 長度。
- details：A–G 各有 building 與 records。status 僅允許已完成／處理中／未處理／待確認。
- verifiedAt：完成整份快照資料查核的真實時間（含時區的 ISO 8601），不可沿用舊快照時間。

本次來源為授權 Google Drive「修繕單」內 repair_A.xlsx 至 repair_G.xlsx；依「狀態」欄（reviewedStatus）逐筆分類，不依日期推算。不將 Drive 連結或來源識別碼寫入公開資料。查核時間 2026-10-27T12:16:21Z。A 59、B 137、C 94、D 224、E 141、F 103、G 135，共 893 筆；未處理 330、處理中 69、已完成 494、待確認 0。

保留原始修繕語意與換行，僅遮除識別資訊。884 筆 description 原文不變，9 筆 description 與 199 筆 note 有遮除。逐一審閱去識別後的全部描述與備註，並檢查已知姓名／電話及門禁、戶別、來源單號殘留。B-0117 原始缺失內容空白，公開資料如實保留空字串，不以摘要或推測補造。

首頁各棟卡片連至 details.html?building=A（至 G）。明細頁驗證四狀態計數與每棟 records 完整性，支援棟別切換、狀態篩選及全文搜尋。JSON 載入失敗或格式不符時顯示錯誤，不展示樣本資料。填表狀態及程式驗證均不等同使用者人工驗收。瀏覽器驗證只保護顯示，不能撤回已公開在原始碼／Git 歷史的資料，務必先去識別及查核再提交。

aggregate.schema.json 為舊版僅彙總格式，現行頁面不使用該檔驗證公開明細 JSON。

更新採人工提交，沒有自動拉取來源或定時同步。不要求任何憑證。Pages 使用 main 分支根目錄發布。

