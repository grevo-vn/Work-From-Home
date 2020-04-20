## Init source in google drive
1. Access https://drive.google.com/ and create new folder WFH
2. In folder WFH, we will create new file Google Apps Script.

If you don't see "Google Apps Script", <br/>
please click New --> More --> "Connect more apps", and then search with keyword "Google Apps Script".
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/create_new_gas.png" width=300/>

Double click in new file, google will bring you to Apps Script Editor.<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/config.png" width=300/>

Create new 5 files in Apps Script Editor. Content of file, please get it in here: https://github.com/grevo-vn/Work-From-Home/tree/master/GoogleAppsScript
<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/create_new_file.png" width=300/>
<br/><br/><br/>

<b>Deploy script as web app</b><br/>
Choose Publish --> Deploy as web app… <br/>
Set Who has access to the app = “Anyone, even anonymous”<br/>
And then click Deploy.<br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GAS/deploy_as_web_app.png" width=300><br/>
Copy "Current web app URL", we will use it for "Slack Apps".
<br/><br/><br/>

PS: If you want to distribute or update script, please see more information of Google Apps Script in https://developers.google.com/apps-script

<br/><br/>
3. In folder WFH, create two files google sheet

<b>WFH working time</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GoogleSheet/google_sheet_working_time.png" width=300/>
<br/>

<b>WFH report</b><br/>
<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/GoogleSheet/google_sheet_report.png" width=300/>
<br/>

<b>Notice:</b><br/>
Please set name of first sheet is "Template". We need it to clone new sheet for new employee.<br/>
And take a look on URL, you will see "Google Sheet ID".<br/><br/>

Congratulation! We are almost done for this part.<br/>

## Set up Slack Apps
1. Create new slack apps

Go to https://api.slack.com/apps?new_app=1 <br/>
Enter your "App Name", choose "Slack Workspace" and then click button "Create App" <br/>
<img src="https://a.slack-edge.com/80588/img/api/start/app_creation_dialog.png" width=300/> <br/><br/>

P/S: More information about Slack Apps, you can find out in here https://api.slack.com/start/overview<br/>

2. Set up Slash Command

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command1.png" width=300 /><br/>
Click on "Slash Commands"<br/>

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command2.png" width=300 /><br/>
Click button "Create New Command"<br/>

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/setup_slash_command3.png" width=300 /><br/>

<b>Command:</b> /wfh <br/>
<b>Request URL:</b> Enter "Current web app URL" that we get from Google Apps Script  <br/>
<b>Short Description:</b> List commands for Work At Home Apps <br/>
<b>Usage Hint:</b> start -msg [string] | rest -msg [string] | rest_end -msg [string] | task [id] -msg [strings] | task_end [id] -msg [strings] | end -msg [string] <br/>

And then Click button "Save".<br/>

3. Add Slack Apps to WorkSpace

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/SlackApps/install_apps_to_workspace.png" width=300/>










