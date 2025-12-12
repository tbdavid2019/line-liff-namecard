
# LINE 數位版名片 liff-namecard

A Bussiness Card For LINE Using LINE Front-end Framework (LIFF) API.


## Tools 常用工具

* [Flex 開發人員工具](https://www.line-community.me/product_detail?botid=5efadf20851f74ab9c189ff6)
* [Flex Message Simulator 工具](https://developers.line.biz/flex-simulator/)
* [Google Maps Universal cross-platform URL](https://developers.google.com/maps/documentation/urls/guide)
* [Lodash 函式庫文件](https://lodash.com/docs/)

# 環境變數設定

請從 `example.env` 複製為 `.env`，常用欄位：

- `BASEURL`：正式網址（GitHub Pages 請含子路徑，如 `https://username.github.io/repo/`，結尾加 `/`）
- `LIFFID_FULL`：LINE Developers 後台建立 LIFF App 取得的 liffId (FULL)
- `NODE_ENV`：開發設 `development`，正式建置請設 `production`
- `CNAME`：若有自訂網域再填，沒有可留空
- `LIFFID_SHARE*`：已標示 Deprecated，可留空

## LINE Developers 後台設定注意

在 LINE Developers Console 設定 LIFF 的 Endpoint URL 時，請務必加上 `liff-full/` 子路徑。

*   **`.env` 中的 `BASEURL`**：指向網站根目錄（例如 `https://username.github.io/repo/`），這是為了讓程式能正確讀取根目錄下的資源（如 `businesscards.csv`）。
*   **LINE 後台的 Endpoint URL**：指向 LIFF 入口頁面（例如 `https://username.github.io/repo/liff-full/`），這是因為 LIFF 的初始化邏輯位於 `liff-full/` 目錄下。若未加上此子路徑，打開 LIFF 時將無法正常運作。

# 本地開發啟動

```
BASEURL=http://localhost:3000/ pnpm dev

pnpm dev
```

預設 baseurl 為 `http://localhost:3000/`，若需要改為其他網址（或自備 HTTPS），請在 `.env` 調整 `BASEURL`。

## 部署到靜態主機

本專案會把 Pug/Sass 編譯成純靜態檔案，`pnpm build` 後的輸出都在 `dist/`，可以直接丟到任意支援 HTTPS 的靜態主機。

1. 設定 `.env`（可由 `example.env` 複製）：`BASEURL` 填最終 HTTPS 網域（含子路徑時要帶上），`LIFFID_FULL` 填 LINE 後台給的 liffId，`NODE_ENV` 設 `production`。
2. 執行 `pnpm install && pnpm build`，產出 `dist/`。
3. 部署：
   * **Vercel**：Build Command=`pnpm build`，Output Dir=`dist`，Framework 選 None，環境變數同上。
   * **Cloudflare Pages**：Build Command=`pnpm build`，Build output dir=`dist`，環境變數同上。
   * **GitHub Pages**：將 `dist/` 推到 `gh-pages` 分支或用 Actions build 後部署，`BASEURL` 要對應 Pages 網址（含子路徑，如 `https://username.github.io/repo/`）。
4. 線上環境不需要本機憑證；本地開發預設使用 http://localhost:3000/（若需要 HTTPS 可自行配置反向代理/自簽憑證）。

### 發佈到 GitHub Pages（自動化腳本）
```
pnpm install
pnpm build

./scripts/deploy-gh-pages.sh

rm -rf .gh-pages-tmp && git worktree prune && ./scripts/deploy-gh-pages.sh
```



1. 準備 `.env`：至少設定 `BASEURL`（如 `https://username.github.io/repo/`）、`LIFFID_FULL`、`NODE_ENV=production`。
2. 執行 `scripts/deploy-gh-pages.sh`（需要 pnpm、git 已設定遠端 origin）。腳本會：
   - 跑 `pnpm install && pnpm build`
   - 建立/更新 `gh-pages` 分支（git worktree），將 `dist/` 複製過去並推送
3. 到 GitHub Repo Settings → Pages，來源選 `gh-pages` 分支（root）。

## Flex 模板在哪、怎麼新增

- Flex Message 範本：`src/cards/*.txt`（文字版），另有 `src/json5/*.json5`（方便編輯的 JSON5 版）。
- 介面頁面（表單）：`src/forms/*.pug`，會把填寫內容組成訊息並指向對應模板。

新增模板流程：

1. 複製一份相近的 `src/cards/*.txt`，修改為新的 Flex JSON（可沿用原有 `<% %>` 動態變數，如 `liffLink` 等）。
2. 如果需要 JSON5 方便維護，依照 `src/json5/line-carousel-1.json5` 再新增一個檔案。
3. 要讓使用者在前端介面選用/填寫，新增或修改對應的表單頁於 `src/forms/`，必要的文案可加在 `i18n/`。
4. 執行 `pnpm dev`（即時）或 `pnpm build`（正式），生成後在 `dist/` 預覽確認。


## 致謝

原始專案： https://github.com/taichunmin/liff-businesscard ，感謝作者 taichunmin 的開源分享。
