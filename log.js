import os from 'os';

/**
 * @author John L. Carveth
 * @name log.js
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
     */
    log (message, level='info', data={}) {
        let log = {};
        log.timestamp = this.getISOTimestamp();
        // ( Message & Level ) OR ( Message and Data )
        if (arguments.length == 2) {
            if (typeof arguments[1] === 'string') {
                log.level = arguments[1];
            } else if (typeof arguments[1] === 'object') {
                log.level = 'info'; // Default log level
                for (let line in arguments[1]) {
                    log[line] = arguments[1][line];
                }
            }
        }

        if (!log.level) log.level = level;
        log.message = message;
        if (!log.data) {
            for (let line in data) {
                log[line] = data[line];
            }
        }

        console.log(JSON.stringify(log));
    }

    /**
     * Returns an ISO-formatted timestamp to be included with each log message
     */
    getISOTimestamp() {
        return new Date(Date.now()).toISOString();
    }
}

export default Logger;