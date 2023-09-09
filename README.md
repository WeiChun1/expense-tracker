# Expense-Tracker

## 介紹

可以創建帳號得到一個屬於自己的記帳本，可以新增、刪除、更新自己的支出資料。

## 功能

* 瀏覽所有支出與總金額
* 依據不同分類的支出看此分類的總金額
* 新增支出
* 刪除支出
* 修改支出的名稱、日期、類別與金額
* 使用者可以透過直接註冊或是Facebook註冊帳號，得到一個自己的記帳本

## 開始使用

1. 請先確認有安裝 Node.js 與 npm
2. 開啟終端機，到欲存放專案的路徑下，將專案 clone 到本地，輸入：

   ```bash
   git clone https://github.com/WeiChun1/expense-tracker.git
   ```
3. 開啟終端機，到欲存放專案的路徑下，將專案 clone 到本地，輸入：

   ```bash
   cd expense-tracker
   ```
   
4. 安裝相關套件，輸入：

   ```bash
   npm install
   ```

5. 根據 .env.example 設定環境變數，新增 .env 檔案，檔案中輸入：

   ```bash
   MONGODB_URI=SKIP
   FACEBOOK_ID=SKIP
   FACEBOOK_SECRET=SKIP
   FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
   SESSION_SECRET=SKIP
   PORT=3000
   ```

7. 載入種子資料，輸入：

   ```bash
   npm run seed
   ```
   
8. 執行專案，輸入：

   ```bash
   npm run start
   ```

9. 打開瀏覽器輸入以下網址

    ```bash
    http://localhost:3000
    ```

測試帳號
   >* name: 廣志
   >* email: <user1@example.com>
   >* password: 12345678

   >* name: 小新
   >* email: <user2@example.com>
   >* password: 12345678

## 開發工具
* Node.js: 14.16.0
* Express: 4.17.1
* Bootstrap: 5.0.2
* Bcrypt.js: 2.4.3
* Body*parser: 1.20.2
* Connect*flash: 0.1.1
* Express*handlebars: 4.0.2
* Express*session: 1.17.1
* Method*override: 3.0.0
* Mongoose: 5.9.7
* Passport: 0.4.1
* Passport*facebook: 3.0.0
* Passport*local: 1.0.0