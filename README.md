# log.js
### A dead-simple, lightweight (>5KB) logging utility for Node.js applications in a JSON format.
---
## Installation
log.js is available on the npm registry, and can be installed with a single command:
```
npm i @jlcarveth/log.js --save
```
Otherwise, `log.js` consists of a single javascript file, so it can be downloaded and added to your project manually:
```
curl https://raw.githubusercontent.com/JLCarveth/log.js/master/log.js > log.js
```

## Usage
The goal of log.js is to be dead simple to use. You can *almost* entirely replace `console.log` calls with `Logger.log` calls and that's it.
```
import logger from 'log.js'; // Import the package

const Logger = new Logger(); // Initialize the package

[...]
Logger.log({'message' : 'A request was made to /api/some/route.'});
```
This will return a nice JSON-formatted string to be output to STDOUT:

```
{"timestamp":"2022-06-14T15:43:24.516Z","level":"info","message":"A request was made to /api/some/route.","hostname":"JohnC-pc"}
```

When a log level is not specified, `info` is used. To specify a log level, do the following:
```
Logger.log({"message" : "...", "level" : "warning"});
```
The following log levels are available by default:
- info
- warning
- error
- fatal

Additional parameters can be logged easily. Simply store the parameters in an Object and pass it to `log()`:
```
let data = {
    "headers" : { ... },
    "response" : { ... }
}
Logger.log({"message" : " ... "}, data);
```

Any parameters passed to `log()` are included in the log messages:
```
{"timestamp":"2022-06-14T15:31:37.273Z","level":"info","message":"Inbound request","hostname":"JohnC-pc","clientAddress":"::1","targetURL":"https://www.uuidtools.com/api/generate/v5/namespace/ns:url/name/JohnLCarveth","method":"GET","body":{},"headers":{"target-url":"https://www.uuidtools.com/api/generate/v5/namespace/ns:url/name/JohnLCarveth","user-agent":"PostmanRuntime/7.29.0","accept":"*/*","postman-token":"6f92736e-ec2c-4971-9dfe-070c6e448592","host":"localhost:3069","accept-encoding":"gzip, deflate, br","connection":"keep-alive"}}
```