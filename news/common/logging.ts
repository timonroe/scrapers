
export default class Logger {
  logging: boolean;

  constructor(log: boolean) {
    if (log) {
      this.logging = true;
    } else {
      this.logging = false;
    }
  }

  log(value: string | object | undefined): void {
    if (!this.logging || !value) return;
    if (typeof value === 'object') {
      console.log(JSON.stringify(value, null, 2));
    } else {
      console.log(value);
    }
  }

}
