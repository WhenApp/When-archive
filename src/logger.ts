interface ILoggerColorMap {
  [index: string]: string;
}

interface ILogger {
  [index: string]: Function;
}

interface IConsole extends Console {
  [index: string]: Function;
}

// code adapted from https://github.com/GoogleChrome/workbox/blob/ca79dab1e5e7230b04d3acd08d91a27f476bed13/packages/workbox-core/_private/logger.mjs
const logger = (() => {
  const methodToColorMap: ILoggerColorMap = {
    debug: '#7f8c8d', // Gray
    log: '#333', // Black
    warn: '#f39c12', // Yellow
    error: '#c0392b', // Red
  };

  const print = (method: string, args: string[]) => {
    const styles = [
      `background: ${methodToColorMap[method]}`,
      'border-radius: 0.5em',
      'color: white',
      'font-weight: bold',
      'padding: 2px 0.5em',
    ];

    const logPrefix = ['%cWhen', styles.join(';')];

    (console as IConsole)[method](...logPrefix, ...args);
  };

  const api: ILogger = {};
  for (const method of Object.keys(methodToColorMap)) {
    api[method] = (...args: string[]) => {
      print(method, args);
    };
  }

  return api;
})();

export { logger };
