import chalk from "chalk"

export default class Logger {
  static log = console.log
  static warn = console.warn
  static error = console.error
  static debug = console.debug
  static info = console.info

  static patch() {
    console.log = (...msg: any[]) => this.log(`[${chalk.green(new Date().toUTCString())}][${chalk.blue('LOG')}]`, ...msg)
    console.warn = (...msg: any[]) => this.warn(`[${chalk.green(new Date().toUTCString())}][${chalk.yellow('WARN')}]`, ...msg)
    console.error = (...msg: any[]) => this.error(`[${chalk.green(new Date().toUTCString())}][${chalk.red('ERROR')}]`, ...msg)
    console.debug = (...msg: any[]) => this.error(`[${chalk.green(new Date().toUTCString())}][${chalk.blueBright('DEBUG')}]`, ...msg)
    console.info = (...msg: any[]) => this.error(`[${chalk.green(new Date().toUTCString())}][${chalk.green('INFO')}]`, ...msg)
  }
}