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

let argRegex = /-[A-Za-z]/

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
    
}