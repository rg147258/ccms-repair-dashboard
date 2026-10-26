# 修繕進度統計

手機優先的單檔靜態儀表板，無外部 CDN、追蹤碼或資料連線。可由 GitHub Pages 開啟，或下載 index.html 離線查看。

公開內容僅限棟別名稱、總件數、未處理／處理中／已完成件數與資料查核時間。不接受逐筆明細、戶別、備註、個人資訊或原始檔案；不要將來源試算表或任何私人版本歷史加入本儲存庫。

## 更新資料

由授權負責人先查核來源、統計規則與彙總，手動審閱後，只更新 index.html 中 aggregate-data JSON 區塊。公開資料鍵僅允許：

- schemaVersion：1.0。
- verifiedAt：實際資料查核時間（含時區的 ISO 8601），未查核為 null。
- statusRule：pending（待核定）、approved_explicit（核定狀態分類）、approved_dates（核定日期分類）。不在頁面執行日期分類，必須在公開前完成並核准彙總。
- buildings：每棟僅 building、total、open、working、completed。總數必須等於三狀態合計；皆為非負整數。

尚無核實資料時維持空陣列、null、pending，不放示範數字。若狀態規則未核定或缺少查核時間，頁面不顯示統計數字。瀏覽器驗證只保護顯示，不能撤回已公開在原始碼／Git 歷史的資料；務必先審閱再提交。

更新採人工提交，沒有自動拉取來源或定時同步。不要求任何憑證。Pages 使用 main 分支根目錄發布。

