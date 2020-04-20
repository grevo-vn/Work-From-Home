Format: /wfh {cmd} -date [yyyy/mm/dd] -time [H:i] -msg [string]

List command avaiables: start | rest | rest_end | task [id] | task_end [id] | end | workout [mins]
Optional param: -date, -time, -msg, -complete_time.
Ex: /wfh task 111 -date 2020/04/01 -time 14:30 -msg print Hello World


## 1. Start new working day
Ex: 
/wfh start
/wfh start -msg Good moring!
/wfh start -date 2020/04/10 -time 08:00

When you type slack command, current time will be save to google sheet. But if you don't want update it with "current time", you can use param -date and -time instead.

## 2. Take some rest
Ex: /wfh rest -msg I have lunch now!

## 3. Come back to work
Ex: /wfh rest_end

## 4. Start new task
Ex: /wfh task 123 -msg fix issue #475
Ex: /wfh task 148 -date 2020/04/06 -time 11:00

Task id is required

## 5. When task finish
Ex: /wfh task_end 123 -msg pr #775
Ex: /wfh task_end 148 -date 2020/04/08 -time 09:00
Ex: /wfh task_end 114 -date 2020/04/07 -time 10:00 -complete_time 9H

Task id is required

## 6. End of a working day
Ex: /wfh end 
Ex: /wfh end -msg I finished today's work now!

## 7. Exercises
Ex: /wfh workout 3 -msg plank!


