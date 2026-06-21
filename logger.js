'use strict';

const consoleApi = globalThis['console'];
const consoleLog =
  typeof consoleApi?.log === 'function' ? consoleApi.log.bind(consoleApi) : () => {};
const consoleWarn =
  typeof consoleApi?.warn === 'function' ? consoleApi.warn.bind(consoleApi) : () => {};
const consoleError =
  typeof consoleApi?.error === 'function' ? consoleApi.error.bind(consoleApi) : () => {};
const isDevelopment =
  typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';

function debug(...args) {
  if (isDevelopment) {
    consoleLog(...args);
  }
}

function info(...args) {
  consoleLog(...args);
}

function warn(...args) {
  consoleWarn(...args);
}

function error(...args) {
  consoleError(...args);
}

const logger = {
  debug,
  info,
  warn,
  error,
};

exports.logger = logger;
exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;
