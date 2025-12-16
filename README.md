
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

## Flex 模板與樣式整合
本專案整合了 `louis70109/Announcer` 的 Flex Message 樣板，提供多樣化的訊息展示效果。

### 現有樣板列表
所有的樣板都位於 `src/forms/` (表單) 與 `src/cards/` (Layout)。
您可以在首頁直接點選「建立名片」來使用這些樣板。

- **公告樣板 (Announcement)**：活動公告專用，包含圖片、時間、地點與詳細說明。
- **名單樣板 (Staff List)**：適合展示團隊成員、營業時間或其他清單資訊。
- **卡片樣板 (Card)**：展示個人或商品卡片，包含圓形頭像、背景圖與按鈕。
- **新聞樣板 (News)**：類似新聞的圖文排版，適合分享文章或最新消息。
- 以及原有樣板 (PsPrint, ChatGPT, Google Sheet, etc.)

---

## Static API 服務
本專案即使部署在靜態網站（GitHub Pages），也能提供 RESTful API 風格的 JSON 服務，供開發者獲取 Flex Message 的原始結構。

- **API 列表**： `GET /api/flex/template/list.json`
- **單一樣板 (Rendered)**： `GET /api/flex/template/{id}.json`
- **原始模板 (Raw Source)**： `GET /api/flex/source/{id}.txt` (Lodash Template)
- **資料範本 (Sample Data)**： `GET /api/flex/sample/{id}.json` (Available fields)

### 進階用法：動態渲染
由於本站為靜態託管，無法由伺服器帶入參數渲染。
若您需要動態產生內容，請呼叫 **原始模板 API** 取得 `.txt` 程式碼，並在您的應用程式中（Client-side 或 Server-side）結合 **資料範本** 進行渲染。

例如取得 `ticket-movie.txt` 後，使用 lodash template：
```javascript
const template = _.template(txtContent); // txtContent 來自 source API
const json = template({
  vcard: {
    title: "My Movie",
    date: "2023/12/31"
  }
});
```
```
GET /api/flex/template/announcer-announcement.json
```
回傳：
```json
{
  "type": "flex",
  "altText": "公告標題...",
  "contents": { ... }
}
```
*註：API 回傳的是該樣板的「預設內容」，其中的變數（如圖片、連結）為預設值。*

---

## 如何新增自訂模板
若要加入新的樣板，請遵循以下「**表單 + 模板**」的模式：

1. **建立模板 (Template Layout)**
   在 `src/cards/` 新增 `.txt` 檔案（例如 `my-new-template.txt`）。
   內容為 Flex Message JSON，可使用 Lodash Template 語法 `<% ... %>` 或 `${vcard.title}` 來插入變數。
   ```javascript
   {
     "type": "flex",
     "contents": {
       "type": "bubble",
       "body": {
         "type": "box",
         "layout": "vertical",
         "contents": [
           { "type": "text", "text": ${JSON.stringify(vcard.title)} }
         ]
       }
     }
   }
   ```

2. **建立表單 (Editor Form)**
   在 `src/forms/` 新增 `.pug` 檔案（例如 `my-new-template.pug`）。
   - 繼承 `/layout/forms`。
   - 定義輸入欄位 (`input(v-model="vcard.title")`)。
   - 設定 `window.vueConfig.data.vcard` 的預設值，並指定 `template` 路徑：
     ```javascript
     window.vueConfig.data.vcard = {
       title: '預設標題',
       template: '#{baseurl}cards/my-new-template.txt',
     }
     ```

3. **註冊到列表**
   編輯 `src/businesscards.csv`，加入一行新的設定：
   ```csv
   forms/my-new-template.html,我的新樣板,作者名,zh_TW,封面圖URL,描述
   ```

4. **建置**
   執行 `npm run build`。系統會自動：
   - 生成表單頁面 (`dist/forms/my-new-template.html`)。
   - 生成 API JSON (`dist/api/flex/template/my-new-template.json`)。
   - 更新首頁列表。


## 致謝

原始專案： https://github.com/taichunmin/liff-businesscard ，感謝作者 taichunmin 的開源分享。
