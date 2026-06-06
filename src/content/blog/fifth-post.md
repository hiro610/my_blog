---
title: "第5話：フロントエンド超入門：HTML/CSS/JavaScriptの基礎構造と、データ収集に必須となるDOM操作の重要性"
pubDate: 2026-06-07
description: Web分析の基礎、第3弾。ブラウザがWebページを描画する仕組みと、プログラムからHTMLを制御する「DOM（Document Object Model）」の概念を解説。フェーズ2で実装する「自作生ログ収集API」へと直結する、JavaScriptによるイベント検知の予習を行います。
author: hiro
---

# フロントエンド超入門：HTML/CSS/JavaScriptの基礎構造とDOM操作の重要性

自給自足型データ基盤構築ラボのフェーズ1の締めくくりとして、Webサイトがブラウザ上でどのように動き、データを生み出しているのか、その最小単位である「フロントエンドの構造」を解剖します。

データサイエンティストにとって、Webのフロントエンドを理解することは、**「スクレイピングによるデータ収集」**や、今後のフェーズ2で挑戦する**「自作ログ収集スクリプトによるデータエンジニアリング」**において、圧倒的なアドバンテージとなります。

---

## Webページを構成する3大要素

ブラウザが1つのWebサイトを表示する時、裏側では以下の3つの言語が役割を分担して動いています。

1. **HTML (HyperText Markup Language)**
   サイトの「骨組み・文章構造」を定義します。タグ（`<h1>`, `<p>`, `<div>`など）を使って、どこがタイトルでどこが本文かをコンピューターに教えます。
2. **CSS (Cascading Style Sheets)**
   サイトの「見た目・デザイン」を整えます。色、配置、文字の大きさ、スマホ対応のレイアウト（レスポンシブ）などを担当します。
3. **JavaScript**
   サイトに「動き・知能」を与えます。ボタンを押したときにポップアップを開いたり、非同期でデータをサーバーに送ったりする、ブラウザ上で動く唯一のプログラミング言語です。

---

## データ収集の鍵を握る「DOM操作」とは？

ブラウザは、サーバーから送られてきた生のHTMLテキストをそのまま画面に表示しているわけではありません。プログラム（JavaScript）からHTMLを自由にいじれるように、ブラウザの内部で**「木構造（ツリー構造）のデータオブジェクト」**に変換します。

この、ブラウザが作ったHTMLのデータ模型のことを **DOM (Document Object Model)** と呼びます。

そして、JavaScriptを使って「特定のボタンの文字を書き換える」「新しい要素を付け足す」といった操作を行うことを**「DOM操作」**と言います。

### なぜデータサイエンティストにDOM知識が必要なのか？

1. **高度なWebスクレイピング**
   PythonのBeautifulSoupやSeleniumを使ってWeb上のデータを収集する際、「どの要素（DOMノード）にターゲットのデータが格納されているか」を正確に見極めるために、DOM構造の理解が絶対に必要です。
2. **【フェーズ2への伏線】独自の生ログ収集**
   パッケージ化されたGA4だけに頼らず、自分一人の手でログ収集パイプラインを作るフェーズ2では、以下のようなJavaScriptによるDOM操作（イベントリスナーの設置）を自分で実装します。

```javascript
// ユーザーが特定のアフィリエイトリンクをクリックした瞬間を検知するDOM操作の例
const targetLink = document.querySelector('.affiliate-link');

targetLink.addEventListener('click', (event) => {
    // クリックされたというログデータを、裏側の自作Python(FastAPI)サーバーへ送信する
    fetch('[https://api.hiscalm.com/v1/logs](https://api.hiscalm.com/v1/logs)', {
        method: 'POST',
        body: JSON.stringify({
            event: 'link_click',
            url: window.location.href,
            timestamp: new Date().toISOString()
        })
    });
});