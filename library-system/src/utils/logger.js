const LogLevel = Object.freeze({
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
});

let currentLevel = LogLevel.INFO;

const styles = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function timestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function format(level, color, message, data) {
  const ts = styles.dim + timestamp() + styles.reset;
  const tag = color + level.padEnd(5) + styles.reset;
  const body = data !== undefined ? `${message} ${JSON.stringify(data)}` : message;
  return `${ts} ${tag} ${body}`;
}

export function setLogLevel(level) {
  if (Object.values(LogLevel).includes(level)) {
    currentLevel = level;
  }
}

export function debug(message, data) {
  if (currentLevel <= LogLevel.DEBUG) console.log(format('DEBUG', styles.cyan, message, data));
}

export function info(message, data) {
  if (currentLevel <= LogLevel.INFO) console.log(format('INFO', styles.green, message, data));
}

export function warn(message, data) {
  if (currentLevel <= LogLevel.WARN) console.warn(format('WARN', styles.yellow, message, data));
}

export function error(message, data) {
  if (currentLevel <= LogLevel.ERROR) console.error(format('ERROR', styles.red, message, data));
}

export { LogLevel };