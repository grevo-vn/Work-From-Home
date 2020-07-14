# Create slack apps WFH with slack bot, slack slash command and google apps script
Writer: Van Minh Tri
Date: 2020-07-08

## Introduction

- Tracking working time and tasks easy with some free tools: Slack, Google Sheet, Google Apps Script
- Easy to install and use.


## Part 1. Init source in Google Drive
#### 1. Create new folder in Google Drive
Access https://drive.google.com/ and create new folder WFH

#### 2. Create new file Google Apps Script

If you don't see "Google Apps Script", <br/>
please click New --> More --> "Connect more apps", and then search with keyword "Google Apps Script".
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/create_new_gas.png" width=300/>

<b>a) Double click in new file, google will bring you to Apps Script Editor</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/config.png" width=300/>

<b>b) Create new 5 files in Apps Script Editor</b><br/>
Content of file, please get it in here: https://github.com/grevo-vn/Work-From-Home/tree/master/GoogleAppsScript
<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/create_new_file.png" width=300/>
<br/><br/><br/>

<b>c) Deploy script as web app</b><br/>
Choose Publish --> Deploy as web app… <br/>
Set Who has access to the app = “Anyone, even anonymous”<br/>
And then click Deploy.<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/deploy_as_web_app.png" width=300><br/>
Copy "Current web app URL", we will use it for "Slack Apps".
<br/><br/><br/>

<b>Question: Why we need a Google Apps Script file?<br/>
Answer: We need it as a web server that will receive response from slack, save data to google sheet and post message to some groups in slack. </b><br/><br/>

PS: If you want to distribute or update script, please see more information of Google Apps Script in https://developers.google.com/apps-script

#### 3. Create two files Google Sheet
In folder WFH, we will create two file Google Sheet:

<b>a) WFH working time</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GoogleSheet/google_sheet_working_time.png" width=300/>
<br/>

<b>b) WFH report</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GoogleSheet/google_sheet_report.png" width=300/>
<br/>

<b>Notice:</b><br/>
Please set name of first sheet is "Template". We need it to clone new sheet for new employee.<br/>
And take a look on URL, you will see "Google Sheet ID".<br/><br/>

<b>Congratulation! We are almost done for this part.</b><br/>
<b>We will come back with "Google Apps Script file" again to update the configuaration after we set up slack apps.</b><br/>

## Part 2. Set up Slack Apps
#### 1. Create new Slack Apps

Go to https://api.slack.com/apps?new_app=1 <br/>
Enter your "App Name", choose "Slack Workspace" and then click button "Create App" <br/>
<img src="https://a.slack-edge.com/80588/img/api/start/app_creation_dialog.png" width=300/> <br/><br/>

P/S: More information about Slack Apps, you can find out in here https://api.slack.com/start/overview<br/>

#### 2. Set up Slash Command

<b>a) Click on "Slash Commands"</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command1.png" width=300 /><br/>

<b>b) Click button "Create New Command"</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command2.png" width=300 /><br/>

<b>c) Setting command</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command3.png" width=300 /><br/>

<b>Command:</b> /wfh <br/>
<b>Request URL:</b> Enter "Current web app URL" that we get from Google Apps Script  <br/>
<b>Short Description:</b> List commands for Work At Home Apps <br/>
<b>Usage Hint:</b> start -msg [string] | rest -msg [string] | rest_end -msg [string] | task [id] -msg [strings] | task_end [id] -msg [strings] | end -msg [string] <br/>

And then Click button "Save".<br/>

#### 3. Add Slack Apps to WorkSpace

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/install_apps_to_workspace.png" width=300/>

#### 4. Register Incoming WebHooks

we need it to post message to channel<br/><br/>

<b>a) Click on link "Incomming Webhooks"</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook1.png" width=300/><br/>

<b>b) Turn On "Active Incomming Webhooks"</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook2.png" width=300/><br/>

<b>c) Click "Add new Webhook to Workspace", to add "Slack Apps" to channel</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook3.png" width=300 />
<br/>

<b>d) Choose channel that you want post message</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook4.png" width=300 />
<br/><br/>
<b>We have done to setup slack apps.</b><br/>


## Part 3. Set up Config.gs

Come back with Google Apps Script.<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/config.png" width=300/><br/>
We need to config for our environment.<br/>

#### 1. Update variable googleSheetWorkingTimeID and googleSheetReportID

We can get that ID in URL of Google Sheet.

#### 2. Update information for variable dSlackUsers

<pre>var dSlackUsers = {
  "U010Q8EMU5P": {"userName": "Van Minh Tri", "sheetName": "Van Minh Tri", "channel": ["general", "random", "remote_helper_testing"]},
…
};
</pre>

<br/>
<b>a) U010Q8EMU5P:</b> This is Slack User Id, Plese see how to get it in https://help.workast.com/hc/en-us/articles/360027461274-How-to-find-a-Slack-user-ID<br/>

<b>b) userName:</b> Name of User. <br/>

<b>c) sheetName:</b> Name of sheet in google sheet that will create automatic for user. <br/>

<b>d) channel:</b> List channel that apps will post for this user when they type command. <br/>


#### 3. Update information for variable dSlackChannels

Come back slack apps setting: https://api.slack.com/apps <br/>
Copy channel for key and Webhook URL for value.<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_incomming_webhook3.png" width=300 /><br/>


## Part 4. Notice

1) If you change anything in Apps Script editor, you need to publish it again.<br/>
Choose Publish > Deploy as web app… <br/>
In popup, choose Project version = “New”. And then click button Update.<br/>

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/update_gas.png" width=300 /><br/>

2) Issues<br/>
When you run /wfh commands, Slackbot sometimes returns an error saying "operation_timeout".<br/>
This happens because Slack presumes it failed when the command takes over 3 seconds to respond, and then Slackbot sends the message automatically.<br/>
So, even that error shows up, the script of WFH APP works correctly.<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Issues/operation_timeout.png" width=400 /><br/>
You'll find your /wfh command runs without a failure in your channel.<br/>






