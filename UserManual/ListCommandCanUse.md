<b>Format:</b> /wfh {cmd} -date [yyyy/mm/dd] -time [H:i] -msg [string]

List command avaiables: start | rest | rest_end | task [id] | task_end [id] | end | workout [mins]<br/>
Optional param: -date, -time, -msg, -complete_time.<br/>
Example: /wfh task 111 -date 2020/04/01 -time 14:30 -msg print Hello World<br/>


## 1. Start new working day
/wfh start<br/>
/wfh start -msg Good moring!<br/>
/wfh start -date 2020/04/10 -time 08:00<br/>

When you type slack command, current time will be save to google sheet. But if you don't want update it with "current time", you can use param -date and -time instead.

## 2. Take some rest
/wfh rest -msg I have lunch now!<br/>

## 3. Come back to work
/wfh rest_end<br/>

## 4. Start new task
/wfh task 123 -msg fix issue #475<br/>
/wfh task 148 -date 2020/04/06 -time 11:00<br/>

Task id is required

## 5. When task finish
/wfh task_end 123 -msg pr #775<br/>
/wfh task_end 148 -date 2020/04/08 -time 09:00<br/>
/wfh task_end 114 -date 2020/04/07 -time 10:00 -complete_time 9H<br/>

Task id is required

## 6. End of a working day
/wfh end <br/>
/wfh end -msg I finished today's work now!<br/>

## 7. Exercises
// Work out 3 minutes with plank.<br/>
/wfh workout 3 -msg plank!<br/>


