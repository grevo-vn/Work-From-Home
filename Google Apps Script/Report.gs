function CalculateTaskTime(userId, commandParamObject) {
  var sheetName = dSlackUsers[userId]["sheetName"];
  
  // 1. get data from google sheet "working time"
  var result = ProcessCaculateTaskTime(sheetName, commandParamObject['id']);
  
  if (!result) return false;
  
  // 2. insert data to google sheet "report"
  AddNewRowToReport(sheetName, result, commandParamObject);
}

function ProcessCaculateTaskTime(sheetName, taskId) {
  var sss    = SpreadsheetApp.openById(googleSheetWorkingTimeID);
  var sheet  = sss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  
  var dateStartStr = "";
  var dateEndStr   = "";
  var startTime    = "";
  var endTime      = "";

  for(var i=values.length; i > 2; i--) {
    
    if (typeof values[i] == "undefined") continue;
    
    if(values[i][5] == taskId && values[i][3] == "task start") {
      dateStartStr     = Utilities.formatDate(new Date(values[i][1]), "GMT+7", "yyyy/MM/dd");
      var timeStartStr = Utilities.formatDate(new Date(values[i][2]), "GMT+7", "HH:mm");
      startTime        = dateStartStr + " " + timeStartStr;
    }
    
    if(endTime == "" && values[i][5] == taskId && values[i][3] == "task done") {
      dateEndStr     = Utilities.formatDate(new Date(values[i][1]), "GMT+7", "yyyy/MM/dd");
      var timeEndStr = Utilities.formatDate(new Date(values[i][2]), "GMT+7", "HH:mm");
      endTime        = dateEndStr + " " + timeEndStr;
    }
    
    if (startTime && endTime) break;
  }
  
  if (startTime == "") return false;
  
  var totalSpentTime = SpentTimeForTask(startTime, endTime, dateStartStr, dateEndStr) + " (task)";
  var result = {"date": dateEndStr, "totalSpentTime": totalSpentTime, "taskId": taskId};
  
  return result;
}

function CalculateDailyWorkingTime(userId, commandParamObject) {
  var sheetName = dSlackUsers[userId]["sheetName"];
  
  // 1. get data from google sheet "working time"
  var result = ProcessStartTimeAndEndTimeToday(sheetName);
  
  if (!result) return false;
  
  // 2. insert data to google sheet "report"
  AddNewRowToReport(sheetName, result, commandParamObject);
}

/*
* get start time and end time today
* Format date: yyyy/MM/dd
*/
function ProcessStartTimeAndEndTimeToday(sheetName) {
  var sss    = SpreadsheetApp.openById(googleSheetWorkingTimeID);
  var sheet  = sss.getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  
  var dateStartStr = "";
  var dateEndStr   = "";
  var startTime = "";
  var endTime   = "";

  for(var i=values.length; i > 2; i--) {
    
    if (typeof values[i] == "undefined") continue;
      
    var dateStr = Utilities.formatDate(new Date(values[i][1]), "GMT+7", "yyyy/MM/dd");
    
    if(values[i][3] == "start") {
      startTime = Utilities.formatDate(new Date(values[i][2]), "GMT+7", "HH:mm");
      dateStartStr = dateStr;
    }
    
    if (endTime == '' && values[i][3] == "closed") {
      endTime = Utilities.formatDate(new Date(values[i][2]), "GMT+7", "HH:mm");
      dateEndStr = dateStr;
    }
    
    if (startTime && endTime) break;
  }
  
  if (startTime == "") return false;
  
  startTime = dateStartStr + " " + startTime;
  endTime   = dateEndStr + " " + endTime;
  
  var totalSpentTime = SpentTimeForDailyWorking(startTime, endTime) + " (daily)";
  var result = {"date": dateEndStr, "totalSpentTime": totalSpentTime};
  
  return result;
}

function AddNewRowToReport(sheetName, result, commandParamObject) {
  var sheet = GetSheetObject(googleSheetReportID, sheetName);
  var lastRow = sheet.getLastRow();
  
  // check duplicate data in last row
//  var checkDuplicate = CheckDuplicateReportData(sheet, result, lastRow);
//  if (checkDuplicate) return;
  
  var rowInsert = lastRow + 1;
  var indexStartRow = rowInsert - 3;
  sheet.getRange(rowInsert, 1).setValue(indexStartRow);
    
  // add date
  sheet.getRange(rowInsert, 2).setValue(result["date"]);
  
  // add time
  sheet.getRange(rowInsert, 3).setValue(result["totalSpentTime"]);
  
  // add taskId
  if (typeof result["taskId"] != "undefined") {
    sheet.getRange(rowInsert, 4).setValue(result["taskId"]);
  }
  
    // add complete time
  if (commandParamObject["complete_time"] != "") {
    sheet.getRange(rowInsert, 5).setValue(commandParamObject["complete_time"]);
  }
  
  return '';
}

function CheckDuplicateReportData(sheet, result, lastRow) {
  var dateStr     = sheet.getRange(lastRow, 2).getValue();
  var dateCheck   = Utilities.formatDate(new Date(dateStr), "GMT+7", "yyyy/MM/dd");
  var resultCheck = sheet.getRange(lastRow, 3).getValue();

  if (result["date"] == dateCheck && result["totalSpentTime"] == resultCheck) {
    return true;
  }
  
  return false;
}

