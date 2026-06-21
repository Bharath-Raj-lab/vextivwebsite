export type LoggerArgs = unknown[];

export interface Logger {
  debug(...args: LoggerArgs): void;
  info(...args: LoggerArgs): void;
  warn(...args: LoggerArgs): void;
  error(...args: LoggerArgs): void;
}

export declare const logger: Logger;
export declare const debug: Logger['debug'];
export declare const info: Logger['info'];
export declare const warn: Logger['warn'];
export declare const error: Logger['error'];
