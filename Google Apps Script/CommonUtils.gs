function GetCurrentDate(chars) {
  var d = new Date();
  var dateString = DateToYMD(d, chars);
 return dateString; 
}

function GetCurrentHM() {
  var d = new Date();
  var dateString = DateToHM(d);
 return dateString;
}

function DateToYMD(date, chars) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  
  return '' + y + chars + (m<=9 ? '0' + m : m) + chars + (d <= 9 ? '0' + d : d);
}

function DateToHM(date) {
  var h = date.getHours();
  var m = date.getMinutes();
  
  return '' + (h<=9 ? '0' + h : h) + ":" + (m<=9 ? '0' + m : m);
}

function SpentTimeForTask(startTime, endTime, dateStartStr, dateEndStr) {
  var d1 = new Date(Date.parse(startTime));
  var d2 = new Date(Date.parse(endTime));
  
  // Calculate the difference in seconds
  var seconds = (d2.getTime() - d1.getTime()) / 1000;
  
  if (dateStartStr == dateEndStr) {
    
      //take out seconds
    var distance = seconds/60;
    var minutes  = Math.floor(distance % 60);
    distance     = distance/60; 
    var hours    = Math.floor(distance % 24);
    
    if (hours >= 5) hours = hours - 1;
    
    return '' + (hours <= 9 ? '0' + hours : hours) + ":" + (minutes <= 9 ? '0' + minutes : minutes);
  } 
  else {
    var numberWeekOfStartDate = Utilities.formatDate(d1, "GMT+7", "w");
    var numberWeekOfEndDate   = Utilities.formatDate(d2, "GMT+7", "w");
    var totalDate = Math.ceil(seconds/86400);
    
    if (numberWeekOfStartDate == numberWeekOfEndDate) {
      return totalDate + " MD";
    } 
    else {
      var distanceWeek = numberWeekOfEndDate - numberWeekOfStartDate;
      
      var factor = 2;
      if (skipWorkingOn["saturday"] == 0 || skipWorkingOn["sunday"] == 0) factor = 1;
      
      var numberIgnoreWeek = distanceWeek * factor;
      var totalFinalDays = totalDate - numberIgnoreWeek;
      
      return totalFinalDays + " MD";
    }
  }
}

function SpentTimeForDailyWorking(startTime, endTime) {
  var d1 = new Date(Date.parse(startTime));
  var d2 = new Date(Date.parse(endTime));
  
  // Calculate the difference in seconds
  var seconds = (d2.getTime() - d1.getTime()) / 1000;
  
  //take out seconds
  var distance = seconds/60;
  var minutes  = Math.floor(distance % 60);
  distance     = distance/60; 
  var hours    = Math.floor(distance % 24);
  
  if (hours >= 5) hours = hours - 1;
  
  // return (hours * 60 + minutes);
  return '' + (hours <= 9 ? '0' + hours : hours) + ":" + (minutes <= 9 ? '0' + minutes : minutes);
}

function CreateNewSheetIfNotExist(sss, sheetName) {
  var sheet = sss.getSheetByName('Template').copyTo(sss);
  SpreadsheetApp.flush();
  sheet.setName(sheetName);
  
  sss.setActiveSheet(sss.getSheetByName(sheetName));
  sss.moveActiveSheet(1);
  
  // set employee information
  if (typeof dSlackUsers[userId]["employeeName"] != "undefined") {
    sheet.getRange(1,2).setValue(dSlackUsers[userId]["employeeName"]);
  }
  
  if (typeof dSlackUsers[userId]["department"] != "undefined") {
    sheet.getRange(2,1).setValue(dSlackUsers[userId]["department"]);
  }
  
  if (typeof dSlackUsers[userId]["projects"] != "undefined") {
    sheet.getRange(2,2).setValue(dSlackUsers[userId]["projects"]);
  }
  
  return sheet;
}

function GetSheetObject(sheetID, sheetName) {
  var sss   = SpreadsheetApp.openById(sheetID);
  var sheet = sss.getSheetByName(sheetName);
  
  if (!sheet) {
    // create new sheet
    sheet = CreateNewSheetIfNotExist(sss, sheetName);
  }
  
  return sheet;
}