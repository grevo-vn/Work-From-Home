// default value
var messageRespone = '';
var userId = '';

// ID of Google Sheet "WFH working time" (get from url)
var googleSheetWorkingTimeID = "1yl4zkwtIks5vpx.................fbeszVN2jfuD8dQY";

// ID of Google Sheet "WFH report" (get from url)
var googleSheetReportID = "1hnKXeP2AqAz6sobg.................jRqnqqZ9UHsbhI";

/*
* Key for variable dSlackUsers is "Slack user ID"
* How to find a Slack user ID: https://help.workast.com/hc/en-us/articles/360027461274-How-to-find-a-Slack-user-ID
*/
var dSlackUsers = {
  "U010Q8EMU5P": {"employeeName": "Van Minh Tri", "sheetName": "Van Minh Tri", "channel": ["general", "random", "remote_helper_testing"], "department": "TSD", "projects": "Work At Home"},
  "U010NQQ6RS7": {"employeeName": "Ishizuka Wataru", "sheetName": "Ishizuka Wataru", "channel": ["general", "random", "remote_helper_testing"], "department": "TSD", "projects": "Work At Home"}
};

// Message By Command
var dCmd2Msg = {
  "start": "I start work now.",
  "end": "I finished today's work now.",
  "rest": "I have rest now.",
  "rest_end": "I back to work.",
  "task": "I have started task",
  "task_end": "I have finished task",
  "workout": "I have workout"
};

var dSlackChannels = {
  "general":               "https://hooks.slack.com/services/TL22BAFPT/B0112RADFRC/uzDgvh......Zl5DgjPig8",
  "random":                "https://hooks.slack.com/services/TL22BAFPT/B010PEU5GHZ/NRVBXkZ7......Y8XI7FYD",
  "remote_helper_testing": "https://hooks.slack.com/services/TL22BAFPT/B010QU74P41/kbJT2......O3O4VPd5"
};

// List Messages
var dMeasages = {
  "txt_detail": "Detail",
  "txt_minute": "minutes",
  "task_missing_id": "Please input task id! Format: /wah task [id] -msg [strings]",
  "task_end_missing_id": "Please input task id! Format: /wah task_end [id] -msg [strings]",
  "missing_config_employee": "Configuration for this employee is empty!",
  "missing_config_private_group": "Configuration for this private group is empty!",
  "not_allow_permission": "You don't have permission to post command here! Please contact with administrator. Thank you.",
  "list_command": "List command: start|rest|rest_end|task [id]|task_end [id]|end|workout.\n Optional param: -date,-time,-msg,-complete_time.\n Ex: /wfh task 111 -date 2020/04/01 -time 14:30 -msg print Hello World."
};

/*
* Config for private group
* Example Private group url of "grevo_tsd_all_member": https://app.slack.com/client/TL22BAFPT/G01204EV5JM
* G01204EV5JM is Channel ID, we use it as key of variable dPrivateGroups
*/
var dPrivateGroups = {
  "G01157TGVJB": "privateroom1"
};

var skipWorkingOn = {"saturday": 1, "sunday": 1}; // 1 mean Yes (do not work on that day)




