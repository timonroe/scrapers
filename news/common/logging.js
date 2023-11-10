export default class Logger {
    logging;
    constructor(log) {
        if (log) {
            this.logging = true;
        }
        else {
            this.logging = false;
        }
    }
    log(value) {
        if (!this.logging || !value)
            return;
        if (typeof value === 'object') {
            console.log(JSON.stringify(value, null, 2));
        }
        else {
            console.log(value);
        }
    }
}
