import Logger from "./log.js";

let Log = new Logger();

Log.log("This is a log message."); // {"level":"info","message":"This is a log message."}
Log.log("Message with data", {"upc": 1223456778}); // {"level":"info","upc":1223456778,"message":"Message with data"}
Log.log("This is a warning", Log.LEVELS.WARNING); // {"level":"warning","message":"This is a warning"}
Log.log("Trifecta", Log.LEVELS.FATAL, {x:42}); // {"level":"FATAL","message":"Trifecta","x":42}