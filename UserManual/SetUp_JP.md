# Slackボット、Slackスラッシュコマンド、Googleアプリスクリプトを使用してSlackアプリWFHを作成する
Writer: Van Minh Tri
Date: 2020-07-08

## 前書き

- いくつかの無料ツールで作業時間とタスクを簡単に追跡：Slack、Google Sheet、Google Apps Script
- 簡単にインストールして使用できます。

## Part 1. セットアップ準備：Google Drive 内のソース設定

#### 1. Google Drive に新規フォルダを作成

https://drive.google.com/​ にアクセスし、「WFH」というフォルダ名で新規フォルダを
作成します。

#### 2. Google Apps Script を新規作成

「WFH」フォルダ内に、Google Apps Script を新規作成します。Google Apps Script
の項目が見つからない場合は、次のように設定します。

「新規」 → 「その他」 → 「アプリを追加」で表示されるポップアップウィンドウ内
で、「Google Apps Script」を検索<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/create_new_gas.png" width=500/><br/>

a) 新規作成された Google Apps Script を開きます。

Apps Script Editor（Google Apps の設定を調整したり、スクリプトを書き換え
たりする画面）が表示されます。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/config.png" width=500/><br/>

b) Apps Script Editor にて、 5 つのスクリプトファイルを作成します。

画面上部のツールバーから、「ファイル」 → 「New」から「スクリプト ファイ
ル」を選択することで、同一のGoogle Apps Script 内にスクリプトファイルを新
規作成できます。これを 5 回つ作成します。

それぞれのファイル名とコードは下記よりコピー＆ペーストしてください。
https://github.com/grevo-vn/Work-From-Home/tree/master/GoogleAppsScript<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/create_new_file.png" width=500/><br/>

c) 完成したスクリプトをウェブアプリとして公開します。

上部ツールバーから「公開」 → 「ウェブアプリケーションとして導入...」を選
択します。
アプリの公開範囲を設定するポップアップが開くので、「アプリケーションにア
クセスできるユーザ」を「全員(匿名)」にします。

「導入」をクリックすることで、ウェブアプリとしての利用準備が完了します。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/deploy_as_web_app.png" width=500><br/>
導入完了後に表示される「現在のウェブアプリケーションのURL」は、後ほど

Slack Apps の設定で必要になるので、コピーやメモしておきましょう。

※GAS（Google Apps Script）を利用する理由について

Slackからの入力を受信・データをスプレッドシートに保管・出力し、Slackへの投稿を
することが目的です。これらに必要なサーバとしての役割、アプリとしての役割を一手
に担うことができるため、広く利用されているGoogle Accountとの親和性も高いGAS
を利用しています。

スクリプトを改修したい場合は、GASの開発者向け情報をご参照ください。
https://developers.google.com/apps-script

#### 3. スプレッドシートを新規作成
「WFH」フォルダ内に 2 種類のスプレッドシートを作成します。

a) WFH working time<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GoogleSheet/google_sheet_working_time.png" width=500/><br/>

b) WFH report<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GoogleSheet/google_sheet_report.png" width=500/><br/>

Notice:

新たなメンバーが追加される際、シートを複製して使う前提のため、一番左のシート名
を「Template」にします。

以上でセットアップ前の準備は完了となります。

このままではアプリは機能しませんが、後の工程で再びGASに戻ってスクリプトを編

集します。その際、ここで作成したスプレッドシート 2 種類のID（URL上の d/ と /edit
の間の文字列）が必要になります。


## Part 2. Slack Apps セットアップ

#### 1. Slack Apps を新規作成する

Web版SlackのSlack Apps設定ページ (​https://api.slack.com/apps?new_app=1​) にアクセ
スし、必要な情報を埋めていきます。

「App Name」 にアプリ名を入れ、「Development Slack Workspac」" にはアプリを利
用したいワークスペースを選択します。最後に "Create App" をクリックすれば、Slack
内で稼働できるアプリが作成されます。

以降の工程で、アプリをインストールしたり、機能やコマンドを追加していきます。<br/>
<img src="https://a.slack-edge.com/80588/img/api/start/app_creation_dialog.png" width=500/><br/>

※ Slack Apps の詳細については、公式ページ (​https://api.slack.com/start/overview​) か
ら確認できます。


#### 2. / コマンドを設定する
Slack上でのコマンド入力によって、アプリが動作するように設定します。

a) 「Add features and functionality」の項目内にある「Slash Commands」 をクリック
します。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command1.png" width=500 /><br/>

b) 「Create New Command」 をクリックし、それぞれコマンドを作成します。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command2.png" width=500 /><br/>

c) コマンド設定に必要な情報を入力します。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command3.png" width=500 /><br/>

Command
「/wfh」と入力します。（どのコマンドで起動するかを設定）

Request URL
セットアップ準備​の項目で新規作成した Google Apps Script の「現在のウェブ
アプリケーションのURL」 を入力します。

Short Description
アプリの説明です。Slack 上で他のユーザーの目にも触れるので、分かりやすい
内容が推奨されます。

Usage Hint
その他使えるコマンドがあれば、ユーザーガイドとして記載できます。
本アプリでは、作業の開始/休憩/終了時など、特定のタイミングに文字列を投稿
できる下記のコマンドが使用可能です。
・start -msg [文字列]
・rest -msg [文字列]
・rest_end -msg [文字列]
・task [ID] -msg [文字列]
・task_end [ID] -msg [文字列]
・end -msg [文字列]

最後に「Save」をクリックすれば、コマンドの設定は完了です。


#### 3. Slack Apps をワークスペースに追加する

「Install your app to your workspace」の項目内にある「Install App to Workspace」を
クリックします。これで現在のワークスペースにアプリが追加されます。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/install_apps_to_workspace.png" width=500/><br/>

#### 4. WebHook を登録する
文言を各チャンネルに投稿するために、Webhook（特定のコマンド実行などによっ
て、指定されたURLにデータを追記する仕組み）を設定します。


a) 「Add features and functionality」にある「Incoming Webhooks」をクリック。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook1.png" width=500/><br/>

b) 右上の「Active Incoming Webhooks」を On にします。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook2.png" width=500/><br/>

c) 「Add new Webhook to Workspace」をクリックして、Slackのどのチャンネル上で
アプリを稼働させるか設定します。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook3.png" width=500 /><br/>

d) 作業状況を投稿したいチャンネルを選択し、「Allow」をクリックします。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook4.png" width=500 /><br/>
以上でSlack Appsでの設定は完了です。次に、アプリの機能を編集します。


## Part 3. Config.gs セットアップ

Google Apps Script を再度開き、Slack Apps で設定したコマンドが有効に機能するよ
う、Webhookとスプレッドシートを紐づけます。
編集するのは「Config.gs」になります。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/config.png" width=500/><br/>

#### 1. スプレッドシート ID を指定する
以下の変数に、​セットアップ準備​で新規作成した対応するスプレッドシートのIDを代入

します。（IDはスプレッドシートURLの ~d/......./edit で挟まれた箇所の文字列）

var googleSheetWorkingTimeID = "WFH working time シートのID"
var googleSheetReportID = "WFH report シートのID"

#### 2. 利用ユーザー情報を入力する

変数 dSlackUsers に、アプリを利用するユーザー情報を入力します。
※アプリの動作不良を避けるために、JavaScriptまたはGAS習得者による入力を推奨。

必要な情報としては、①SlackユーザーID、②利用者名、③利用チャンネル名（複数
可）の 3 種類になります。

var dSlackUsers = {...} のカッコ内に、以下のフォーマットで入力します。

"SlackのユーザーID": {"userName": "利用者名", "sheetName": "利用者名
", "channel": ["利用チャンネル1", "利用チャンネル2", "利用チャンネル
3"]}

同じカッコ内で、カンマで区切って同じフォーマットを追加すれば、複数メン

バー分の情報を追記できます。


var dSlackUsers = {
"U010Q8EMU5P": {"userName": "Van Minh Tri", "sheetName": "Van
Minh Tri", "channel": ["general", "random",
"remote_helper_testing"]},
"U000X0XXX0X": {"userName": "Owlcat", "sheetName": "Owlcat",
"channel": ["general", "random", "remote_helper_testing"]},
...
};

① SlackユーザーIDの取得


Slackのアカウントプロフィールから確認できます。

② userName


ユーザー名を入力します。

sheetName


ここで入力した値がスプレッドシート上で自動的に出力されます。

③ channel

コマンドを入力した際に投稿が行われるチャンネルを指定します。


#### 3. Webhook URL** の反映
変数 dSlackChannels にアプリを動かすチャンネルとWebhookの情報を入力します。
※アプリの動作不良を避けるために、JavaScriptまたはGAS習得者による入力を推奨。

必要な情報は①Channel名、②Webhook URLで、いずれも Slack Apps
(​https://api.slack.com/apps​) の設定画面で確認できます。
設定画面はメニュー内「Features」にある「Incoming Webhook」で表示できます。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook3.png" width=500 /><br/>


設定画面に記載された情報は、

var dSlackChannels = {...} のカッコ内に、以下のフォーマットで入力します。

"Channel名": "WebhookのURL"

同じカッコ内で、カンマで区切って同じフォーマットを追加すれば、複数チャン

ネル分の情報を追記できます。

var dSlackChannels = {
"general": "https://hooks.slack.com/services/ABC...jklm1",
"random": "https://hooks.slack.com/services/DEF...nopq2",
"remote_helper_testing":
"https://hooks.slack.com/services/GHI...rstu3",
...
};

## Part 4. 諸注意

スクリプトを編集した際は、再度公開するまでその編集内容は反映されません。

セットアップ準備の時と同じく、ツールバーから「公開」→「ウェブアプリケーション

として導入...」と選択していきます。

ポップアップ内で 「プロジェクトパージョン」を「新規作成」にし、「更新」をク

リックすることで内容が反映されます。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/update_gas.png" width=500 /><br/>


また、実際にSlack上で /wfh コマンドを実行した際、operation_timeout というエラー
ログが返ってくることがあります。
これはSlackの仕様によるもので、コマンド実行から 3 秒が経過すると、実行に失敗し
たと内部で判定され、Slackbotが自動的にメッセージを送信するために発生します。

実際のスクリプト上は問題なくコマンドが機能しているので、WFH APP の動作に影響
はありません。<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Issues/operation_timeout.png" width=500 /><br/>

エラーが表示されていても、上記画像のようにコマンドの実行結果が正しく表示されていれ
ば、問題ありません。


