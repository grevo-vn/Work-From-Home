function doPost(e) {
  if (typeof e !== 'undefined') {
    
    // extract the relevant data
    var commandParam = e.parameter.text;
    var commandParamObject = GetCommandParameter(commandParam);
    
    var errorMessage = '';
    var listItemData = {};

    switch(commandParamObject["command"]) {
        
      case 'start': {
        // Add new row
        listItemData = {"status" : "start"};
      } break;
        
      case 'rest': {
        // Add new row
        listItemData = {"status" : "rest"};
      } break;
        
      case 'rest_end': {
        // Add new row
        listItemData = {"status" : "restart"};
      } break;
        
      case 'workout': {
        // Add new row
        listItemData = {"status" : "workout", "task": commandParamObject["workout_time"]};
      } break;
        
      case 'end': {
        // Add new row
        listItemData = {"status": "closed"};
      } break;
        
      case 'task': {
        if (commandParamObject["id"] != "") {
          // Add new row
          listItemData = {"status": "task start", "task": commandParamObject["id"]};
        } 
        else {
          errorMessage = dMeasages["task_missing_id"];
        }
        
      } break;
        
      case 'task_end': {
        if (commandParamObject["id"] != "") {
          // Add new row
          listItemData = {"status": "task done", "task": commandParamObject["id"]};
        }
        else {
          errorMessage = dMeasages["task_end_missing_id"];
        }
      } break;
        
      default: {
        errorMessage = dMeasages["list_command"];
      } break;
        
    }
    
    if (errorMessage) {
      return ContentService.createTextOutput(errorMessage);
    }
    
    if (listItemData) {
      errorMessage = AddNewRow(listItemData, e.parameter, commandParamObject);
      
      if (errorMessage) {
        return ContentService.createTextOutput(errorMessage);
      }
    }
    
    if (userId && commandParamObject["command"] == "task_end") {
      // Calculate task time
      CalculateTaskTime(userId, commandParamObject);
    }
    
    if (userId && commandParamObject["command"] == "end") {
      // Calculate daily working time
      CalculateDailyWorkingTime(userId, commandParamObject);
    }
    
    if (userId && commandParamObject["command"] != 'task' && commandParamObject["command"] != 'task_end') {
      postToSlack(messageRespone, dSlackUsers[userId]["channel"]);
    }
    else {
      var channelName = e.parameter.channel_name;
      
      if (channelName == "privategroup") {
        if (typeof dPrivateGroups[e.parameter.channel_id] != "undefined") {
          channelName = dPrivateGroups[e.parameter.channel_id];
          postToSlack(messageRespone, [channelName]);
        }
        else {
          // return error missing config for private group
          return ContentService.createTextOutput(dMeasages["missing_config_private_group"]);
        }
      }
      else {
        postToSlack(messageRespone, [channelName]);
      }
    }
    
  }
  return ContentService.createTextOutput();
}

function AddNewRow(listItemData, commandParameter, commandParamObject) {
    var command = commandParamObject["command"];
    var message = commandParamObject["msg"];
  
    userId = commandParameter.user_id;
    if (typeof dSlackUsers[userId] == "undefined") {
      return dMeasages["missing_config_user"];
    }
  
    // check channel allow
    var channelName = commandParameter.channel_name;
    if (commandParameter.channel_name == "privategroup") 
    {
      if (typeof dPrivateGroups[commandParameter.channel_id] != "undefined") {
        channelName = dPrivateGroups[commandParameter.channel_id];
      }
      else {
        channelName = commandParameter.channel_id;
      }
    }
    
    var listChannel = dSlackUsers[userId]["channel"];
    if (listChannel.indexOf(channelName) == -1) {
      return dMeasages["not_allow_permission"];
    }
    
    messageRespone = dSlackUsers[userId]["userName"] + ": " + dCmd2Msg[command];
    
    if (command == "task" || command == "task_end") {
      messageRespone = dSlackUsers[userId]["userName"] + ": " + dCmd2Msg[command] + " " + listItemData['task'];
      
      if (message.trim()) {
          messageRespone += ". " + dMeasages["txt_detail"] + ":";
      }
    }
  
    if (command == "workout") {
      messageRespone = dSlackUsers[userId]["userName"] + ": " + dCmd2Msg[command] + " " + listItemData['task'] + " " + dMeasages["txt_minute"] + ".";
    }
  
    messageRespone += " " + message.trim();
    
    // Get data from config
    var sheetName = dSlackUsers[userId]["sheetName"];
    var sheet = GetSheetObject(googleSheetWorkingTimeID, sheetName);
  
    // get last row to insert
    var rowInsert = sheet.getLastRow() + 1;
    
    var startTimeHM = "" + GetCurrentHM();
    var indexStartRow = rowInsert - 3;
    sheet.getRange(rowInsert, 1).setValue(indexStartRow);
    
    // add date
    if (commandParamObject["date"] != "") {
      sheet.getRange(rowInsert, 2).setValue(commandParamObject["date"]);
    } else {
      sheet.getRange(rowInsert, 2).setValue(new Date()).setNumberFormat("yyyy/MM/dd");
    }
  
    // add time
    if (commandParamObject["time"] != "") {
      sheet.getRange(rowInsert, 3).setValue(commandParamObject["time"]);
    }
    else {
      sheet.getRange(rowInsert, 3).setValue(startTimeHM);
    }
  
    sheet.getRange(rowInsert, 4).setValue(listItemData["status"]);
    sheet.getRange(rowInsert, 5).setValue(channelName);
  
    if (typeof listItemData['task'] != "undefined") {
      sheet.getRange(rowInsert, 6).setValue(listItemData['task']);
      sheet.getRange(rowInsert, 8).setValue(message.trim());
    }
    sheet.getRange(rowInsert, 9).setValue(messageRespone);
    sheet.getRange(rowInsert, 10).setValue(commandParameter.text);
  
  return '';
}

/*
* Analytic parameters
* Ex: /wah task 135 -date 2020/04/01 -time 08:00 -msg print Hello World
*/
function GetCommandParameter(commandParam) {
  var messageString = commandParam.trim();
  var taskCommand = ["task", "task_end"];
  var commandParamObject = {"command": "", "id": "", "date": "", "time": "", "msg": "", "complete_time": "", "workout_time": ""};
  var commandArr = commandParam.split(' ');
  
  for (var i = 0; i < commandArr.length; i++) {
    
    // get main command
    if ( i == 0) {
      commandParamObject["command"] = commandArr[i];
      messageString = messageString.replace(commandArr[i], "");
      continue;
    }
    
    // get id if command is task or task_end or workout
    if (i == 1) {
      if (taskCommand.indexOf(commandParamObject["command"]) != -1) {
        commandParamObject["id"] = commandArr[i];
        messageString = messageString.replace(commandArr[i], "");
      }
      
      if (commandParamObject["command"] == 'workout') {
        commandParamObject["workout_time"] = commandArr[i];
        messageString = messageString.replace(commandArr[i], "");
      }
    }
    
    // get date
    var nextIndex = i + 1;
    if (commandArr[i] == "-date" && typeof commandArr[nextIndex] != "undefined") {
      commandParamObject["date"] = commandArr[nextIndex];
      messageString = messageString.replace(commandArr[i], "").replace(commandArr[nextIndex], "");
    }
    
    // get time
    if (commandArr[i] == "-time" && typeof commandArr[nextIndex] != "undefined") {
      commandParamObject["time"] = commandArr[nextIndex];
      messageString = messageString.replace(commandArr[i], "").replace(commandArr[nextIndex], "");
    }
    
    // get complete_time
    if (commandArr[i] == "-complete_time" && typeof commandArr[nextIndex] != "undefined") {
      commandParamObject["complete_time"] = commandArr[nextIndex];
      messageString = messageString.replace(commandArr[i], "").replace(commandArr[nextIndex], "");
    }
    
  }
  
  // get message
  messageString = messageString.replace("-msg", "");
  commandParamObject["msg"] = messageString.trim();
  
  return commandParamObject;
}
