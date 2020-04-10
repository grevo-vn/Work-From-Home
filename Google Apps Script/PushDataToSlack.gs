/*
Document: 
- Create Incoming WebHooks In Slack: https://slack.com/intl/en-vn/help/articles/115005265063-Incoming-WebHooks-for-Slack
- Posting a Message to Slack: https://medium.com/expedia-group-tech/how-to-make-a-slackbot-using-google-scripts-2a5e9344898
*/
function postToSlack(message, listChannel, ignoreChannel) {
  
  // for each channel and post data to slack
  for (var i = 0; i < listChannel.length; i++) {
  
    var channelName = listChannel[i];
    if (channelName == ignoreChannel) continue;

    var payload = {
      "channel" : channelName,
      "icon_url" : "https://puu.sh/BQqA9/408cadc2b3.png",
      "text" : message
    }
  
    var options = {
      "method" : "post",
      "contentType" : "application/json",
      "payload" : JSON.stringify(payload)
    };
 
    if (typeof dSlackChannels[channelName] != "undefined") {
      var webhookUrl = dSlackChannels[channelName];
      try {
        UrlFetchApp.fetch(webhookUrl, options);
      }
      catch(err) {
//        err.message;
      }
    }

  }
}
