# log.js
### A dead-simple, lightweight (>8KB) logging utility for Node.js applications in a JSON format.
---
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/jlcarveth/log.js)
![npm (scoped)](https://img.shields.io/npm/v/@jlcarveth/log.js)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@jlcarveth/log.js)
![GitHub issues](https://img.shields.io/github/issues/jlcarveth/log.js)
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
The goal of log.js is to be dead simple to use. Simplest use of log.js simply involves replacing `console.log` calls with `Logger.log` calls:
```
import logger from 'log.js'; // Import the package

const Logger = new logger(); // Initialize the package

[...]
Logger.log('A request was made to /api/some/route.');
```
This will return a nice JSON-formatted string to be output to STDOUT:

```
{"timestamp":"2022-06-14T15:43:24.516Z","level":"info","message":"A request was made to /api/some/route.","hostname":"JohnC-pc"}
```

When a log level is not specified, `info` is used. To specify a log level, do the following:
```
Logger.log("This is a warning, peace and love.", Logger.LEVELS.WARNING);
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
    "request" : { ... }
}
Logger.log("Incoming Request on /api/books", data);
```

Any parameters passed to `log()` are included in the log messages:
```
{"timestamp":"2022-06-14T15:31:37.273Z","level":"info","message":"Incoming request","hostname":"JohnC-pc","clientAddress":"::1","targetURL":"https://www.uuidtools.com/api/generate/v5/namespace/ns:url/name/JohnLCarveth","method":"GET","body":{},"headers":{"target-url":"https://www.uuidtools.com/api/generate/v5/namespace/ns:url/name/JohnLCarveth","user-agent":"PostmanRuntime/7.29.0","accept":"*/*","postman-token":"6f92736e-ec2c-4971-9dfe-070c6e448592","host":"localhost:3069","accept-encoding":"gzip, deflate, br","connection":"keep-alive"}}
```

## Command-Line Interface
`log.js` also provides a command-line tool to allow for JSON logging in other environments, specifically shell scripts. Simply install the package globally:
```
npm i -g @jlcarveth/log.js
```
Once installed, the `logjs` binary becomes available. Usage is quite familiar to the Javascript API:
```
# Basic Usage
$ logjs "This is a log message"
{"timestamp":"2022-06-27T12:45:51.716Z","level":"info","message":"This is a log message"}

# Specify log level with -l OR --level
$ logjs "This is a test message" -l warning
{"timestamp":"2022-06-27T12:39:06.999Z","level":"warning","message":"This is a test message"}

# Additional data is passed through with a key=value pattern:
$ logjs "This is a test message" -l warning x=42 y=21
{"timestamp":"2022-06-27T12:39:15.204Z","level":"warning","message":"This is a test message","x":"42","y":"21"}
```
Output is JSON-formatted and can be piped to a file or another utility.
