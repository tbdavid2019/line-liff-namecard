# LINE 圖文訊息 flex message 倉庫 david888

這是一個基於 LINE Front-end Framework (LIFF) API 的 Flex Message 樣板倉庫與編輯器。
本專案為維護版本，提供多種實用的 Flex Message 樣板供開發者與使用者快速建立精美的 LINE 訊息。

## 🌟 精選樣板 (Featured Templates)

本專案收錄了豐富的樣板，您可以在首頁直接點選「建立名片」來使用。

### 📢 公告與資訊 (Announcer Series)
- **公告樣板 (Announcement)**: 活動公告專用，包含圖片、時間、地點與詳細說明。
- **名單樣板 (Staff List)**: 適合展示團隊成員、營業時間或其他清單資訊。
- **卡片樣板 (Card)**: 展示個人或商品卡片，包含圓形頭像、背景圖與按鈕。
- **新聞樣板 (News)**: 類似新聞的圖文排版，適合分享文章或最新消息。

### 🏷️ 商業應用 (Business & Official)
- **AiTAGO 折扣碼 (Coupon)**: 快速分享折扣碼、優惠券。
- **AiTAGO 影片訊息 (Video)**: 包含影片預覽圖的影音訊息模板。
- **LINE 官方樣板**: 收據 (Receipt)、交通路線 (Transit)、購物 (Shopping)、菜單 (Menu)、社群 (Social)。

### 🛠️ 實用工具 (Utilities)
- **ChatGPT 問與答**: 模擬 AI 問答介面。
- **Google Sheet / CSV**: 讀取試算表或 CSV 資料批次產生名片。
- **JSON5**: 供開發者直接編輯 JSON5 格式。

### 🎮 趣味 (Fun)
- **動物森友會**: 護照 (Passport)、心意卡 (Postcard)。

---

## 🚀 Static API 服務

本專案即使部署在靜態網站（GitHub Pages），也能提供 RESTful API 風格的 JSON 服務，供開發者獲取 Flex Message 的原始結構。

- **API 列表**: `GET /api/flex/template/list.json`
- **單一樣板 (Rendered)**: `GET /api/flex/template/{id}.json`
- **原始模板 (Raw Source)**: `GET /api/flex/source/{id}.txt` (Lodash Template)
- **資料範本 (Sample Data)**: `GET /api/flex/sample/{id}.json` (Available fields)

### 進階用法：動態渲染
由於本站為靜態託管，無法由伺服器帶入參數渲染。若您需要動態產生內容，請呼叫 **原始模板 API** 取得 `.txt` 程式碼，並在您的應用程式中（Client-side 或 Server-side）結合 **資料範本** 進行渲染。

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

---

## 💻 開發指南 (Development Guide)

### 常用工具 (Tools)
* [Flex 開發人員工具](https://www.line-community.me/product_detail?botid=5efadf20851f74ab9c189ff6)
* [Flex Message Simulator 工具](https://developers.line.biz/flex-simulator/)
* [Lodash 函式庫文件](https://lodash.com/docs/)

### 環境變數設定 (Environment Variables)
請從 `example.env` 複製為 `.env`，常用欄位：
- `BASEURL`: 正式網址（GitHub Pages 請含子路徑，如 `https://username.github.io/repo/`，結尾加 `/`）
- `LIFFID_FULL`: LINE Developers 後台建立 LIFF App 取得的 liffId (FULL)
- `NODE_ENV`: 開發設 `development`，正式建置請設 `production`

### LINE Developers 後台設定注意
在 LINE Developers Console 設定 LIFF 的 Endpoint URL 時，請務必加上 `liff-full/` 子路徑。
- **Endpoint URL 範例**: `https://username.github.io/repo/liff-full/`

### 本地開發啟動
```bash
# 預設 baseurl 為 http://localhost:3000/
pnpm install
pnpm dev
```

---

## 📦 部署 (Deployment)

本專案會把 Pug/Sass 編譯成純靜態檔案，`pnpm build` 後的輸出都在 `dist/`。

### 一般部署
1. 設定 `.env` (`NODE_ENV=production`, `BASEURL` 等)。
2. 執行 `pnpm build`。
3. 將 `dist/` 目錄部署至 Vercel, Cloudflare Pages 或 GitHub Pages。

### 發佈到 GitHub Pages（自動化腳本）
```bash
# 確保 git remote origin 已設定
./scripts/deploy-gh-pages.sh

# 若遇到 worktree 衝突，可先執行清理：
rm -rf .gh-pages-tmp && git worktree prune && ./scripts/deploy-gh-pages.sh
```

---

## ➕ 如何新增自訂模板

1. **建立模板 (Template Layout)**
   在 `src/cards/` 新增 `.txt` 檔案（例如 `my-new-template.txt`），內容為 Flex Message JSON (支援 Lodash Template 語法)。

2. **建立表單 (Editor Form)**
   在 `src/forms/` 新增 `.pug` 檔案，繼承 `/layout/forms`，並設定 `window.vueConfig.data.vcard` 指向您的模板路徑。

3. **註冊到列表**
   編輯 `src/businesscards.csv` 加入新樣板資訊。

4. **建置**
   執行 `npm run build` 生成頁面與 API。

---

## 致謝 (Credits)

Original Project: **liff-businesscard** by **taichunmin**.
