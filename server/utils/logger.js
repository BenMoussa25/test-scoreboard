import winston from 'winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDir = join(__dirname, '..');
const logFile = join(logDir, 'activity.log');

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, '');
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: logFile }),
    new winston.transports.Console()
  ]
});

export default logger;
