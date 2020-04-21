It is a free tool to check the status when employee work from home.

1) Define slack user and list channels that user wants to automatically post, etc. (Config.gs)

2) Register slack apps and then /wfh command can be used

3) Typing /wfh command in slack and script will post a predefined message to all your channels.

4) The /wfh command results are calculated in time and recorded in WFH report.<br/>
  The manager can easily check the operating status just by looking at this.
  
## How it works?
- Slack admin install the WFH bot and then you can use /wfh command in the channel chat box.
- When user type a command (/wfh) in slack, the fixed text is posted to the channel that the bot have registered.
- At the same time, the data is automatically recorded on the google sheet.

<img src="https://github.com/grevo-vn/Work-From-Home/blob/master/UserManual/Setup/ProcessFlow/process_flow.png" width=600 /><br/>

<b>Notice:</b><br/>
Task command response to exact channel where user post at.<br/>
