#!/usr/bin/env node
import Logger from "../log.js";
let Log = new Logger();

let BOLD = '\x1b[1m';
let RESET = '\x1b[0m';
let man = "\t\tlog.js v1.1.0\n" +
        BOLD + "NAME" + RESET + "\n" +
        "\t log.js - A simple command-line logging utility in JSON-format.\n" + 
        BOLD + "SYNOPSIS " + RESET + "\n" +
        "\tlogger MESSAGE [-l LEVEL] [data]\n" +
        BOLD + "DESCRIPTION" + RESET + "\n" +
        "\tAppend a log message to standard output.";

// Possible flags that can be passed to logger and if a value is expected
// As of now, only one flag is supported, but adding additional flags this way
// is trivial
let flags = [
    {
        "flag" : "-l",
        "name" : "--level",
        "tag" : "level",
        "expectValue" : true    // Whether the CLI expects a value w/ flag
                                // "info", "warning","error","fatal", or any
                                // other log level you chose
        // Usage:
        //  -l info
        // --level warning
    }
]

let pargs = {}      // Contains all arguments once parsed
let toSkip = [0,1]; // Tracks IDs of args to ignore
let data = {};
let message = '';

let argRegex = /-+[A-Za-z]/ // Regex used to match command-line arguments ex. "-l"
let kvRegex = /[A-Za-z0-9]*=[A-Za-z0-9]*/ // Matches key=value pairs

/**
 * First argument is always node binary,
 * second argument is logger binary
 */
if (process.argv.length === 2) {
    console.log(man)
    process.exit(0)
} else if (process.argv.length === 3) {
    // One argument provided, must be message
    // Is there even more to be done here in terms of validity checks?
    Log.log(process.argv[2]);
    process.exit(0);
} else {
    // Parse arguments, look for level=[a-zA-Z]*
    // Otherwise it's all data arguments x=42
    // Iterate through args looking for ones that match
    process.argv.forEach((arg, index) => {
        if (!toSkip.includes(index)) {
            if (argRegex.test(arg)) {
                // If argument is identified as a "flag" ie "-l" or "--something"
                parseArgument(arg, index);
            } else if (kvRegex.test(arg)) {
                data[arg.split('=')[0]] = arg.split('=')[1];
            } else {
                // Assume parameter is message
                message = arg;
            }
        }
    });
    Log.log(message, pargs.level, data);
}

/**
 * Parses a single argument to see if it's a valid flag.
 * @param {*} arg Argument to be parsed
 * @param {*} index position of the argument with process.argv
 */
function parseArgument(arg, index) {
    flags.forEach(flag => {
        if (arg === flag.name || arg === flag.flag) {
            if (flag.expectValue) {
                // flag expects a value, ensure there are enough arguments
                if (index < process.argv.length - 1) {
                    pargs[flag.tag] = process.argv[index + 1];
                    toSkip.push(index + 1);
                } else {
                    console.log("Not enough parameters.")
                    process.exit(9); //Invalid Argument exit code s
                }
            } else {
                // Flag doesn't expect value, so just store the fact that
                // it was passed
                pargs[flag.tag] = true;
            }
        }
    });
}