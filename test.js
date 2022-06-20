import Logger from "./log.js";

let Log = new Logger();

Log.log("This is a log message."); // {"timestamp":"2022-06-20T11:32:10.836Z","level":"info","message":"This is a log message."}
Log.log("Message with data", {"upc": 1223456778}); // {"timestamp":"2022-06-20T11:32:10.839Z","level":"info","upc":1223456778,"message":"Message with data"}
Log.log("This is a warning", Log.LEVELS.WARNING); // {"timestamp":"2022-06-20T11:32:10.839Z","level":"warning","message":"This is a warning"}
Log.log("Trifecta", Log.LEVELS.FATAL, {x:42}); // {"timestamp":"2022-06-20T11:32:10.839Z","level":"FATAL","message":"Trifecta","x":42}