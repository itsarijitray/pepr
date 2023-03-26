// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2023-Present The Pepr Authors

import { cyan, gray, red, yellow } from "ansi-colors";

/**
 * Enumeration representing different logging levels.
 */
export enum LogLevel {
  debug = 0,
  info = 1,
  warn = 2,
  error = 3,
}

/**
 * Simple logger class that logs messages at different log levels.
 */
export class Logger {
  private _logLevel: LogLevel;

  /**
   * Create a new logger instance.
   * @param logLevel - The minimum log level to log messages for.
   */
  constructor(logLevel: LogLevel) {
    this._logLevel = logLevel;
  }

  /**
   * Log a debug message.
   * @param message - The message to log.
   */
  public debug(message: any, prefix?: string): void {
    this.log(LogLevel.debug, message, prefix);
  }

  /**
   * Log an info message.
   * @param message - The message to log.
   */
  public info(message: any, prefix?: string): void {
    this.log(LogLevel.info, message, prefix);
  }

  /**
   * Log a warning message.
   * @param message - The message to log.
   */
  public warn(message: any, prefix?: string): void {
    this.log(LogLevel.warn, message, prefix);
  }

  /**
   * Log an error message.
   * @param message - The message to log.
   */
  public error(message: any, prefix?: string): void {
    this.log(LogLevel.error, message, prefix);
  }

  /**
   * Log a message at the specified log level.
   * @param logLevel - The log level of the message.
   * @param message - The message to log.
   */
  private log(logLevel: LogLevel, message: any, callerPrefix = ""): void {
    const color = {
      [LogLevel.debug]: gray,
      [LogLevel.info]: cyan,
      [LogLevel.warn]: yellow,
      [LogLevel.error]: red,
    };

    if (logLevel >= this._logLevel) {
      // Prefix the message with the colored log level.
      let prefix = "[" + LogLevel[logLevel] + "]\t" + callerPrefix;

      prefix = color[logLevel](prefix);

      // If the message is an object, stringify it.
      if (message == "[object Object]") {
        message = JSON.stringify(message, null, 2);
      }

      // Log the message.
      console.log(prefix + "\t" + message);
    }
  }
}

export default new Logger(LogLevel.info);
