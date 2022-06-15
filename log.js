import os from 'os';

/**
 * @author John L. Carveth
 * @name log.js
 * @version 0.5.2
 * @description A dead-simple logging utility that formats log messages
 * and outputs them to a JSON format.
 */
class Logger {
    LEVELS = {
        INFO : 'info',
        WARNING : 'warning',
        ERROR : 'error',
        FATAL : 'FATAL'
    };

    constructor () {
        this.hostname = os.hostname();
    }

    /**
     * Sends a JSON-formatted log message to STDOUT
     * TODO:
     * Improve method signature such that the following are supported:
     *  - log(message); Logs a message with no data, level=info
     *  - log(message, level); Logs a message w/ no data, level=level
     *  - log(message, data); Logs a message w/ level=info;
     *  - log(message, data, level); Logs a message w/ level=level
     * This should be do-able by type-checking and counting argument #s.
     */
    log({message, level =this.LEVELS.INFO}, data) {
        let date =this.getISOTimestamp();
        let json = {
            'timestamp' : date,
            'level' : level,
            'message' : message,
            'hostname' : this.hostname
        };

        for (let line in data) {
            json[line] = data[line];
        }

        console.log(JSON.stringify(json));
    }

    /**
     * Returns an ISO-formatted timestamp to be included with each log message
     */
    getISOTimestamp() {
        return new Date(Date.now()).toISOString();
    }
}

export default Logger;