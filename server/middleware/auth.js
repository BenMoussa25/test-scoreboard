import logger from '../utils/logger.js';

const CTFd_TOKEN = process.env.CTFd_TOKEN || 'TOKEN';

export const apiAuth = (req, res, next) => {
  const ctfdTokenHeader = req.headers['verify-ctfd'];

  if (ctfdTokenHeader !== CTFd_TOKEN) {
    logger.warn(`Unauthorized API access attempt from ${req.ip}`);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
};

export const adminAuth = (req, res, next) => {
  if (req.session.admin !== true) {
    logger.warn(`Unauthorized admin access attempt from ${req.ip}`);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
};
