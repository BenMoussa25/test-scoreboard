import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './config/supabase.js';
import apiRoutes from './routes/api.js';
import logger from './utils/logger.js';

dotenv.config({ path: '../.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

const CTF_TITLE = process.env.CTF_TITLE || 'TitleCTF';
const CTFd_TOKEN = process.env.CTFd_TOKEN || 'TOKEN';
const start_date = process.env.start_date || '2000-01-01 00:00:00';
const finish_date = process.env.finish_date || '2000-01-02 00:00:00';
const PORT = process.env.PORT || 5000;
const DOMAIN = process.env.DOMAIN || 'localhost';
const admin_token = process.env.admin_token || 'admin_token_to_change';

const randomToken = crypto.randomBytes(128).toString('hex');

app.use(cors({
  origin: process.env.CLIENT_URL || `http://localhost:5173`,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'token',
  secret: randomToken,
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 3,
    secure: process.env.HTTPS === 'true'
  }
}));

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('io', io);

app.use('/api', apiRoutes);

app.get('/api/config', (req, res) => {
  res.json({
    title: CTF_TITLE,
    start_date,
    finish_date
  });
});

const logFile = path.join(__dirname, 'activity.log');

const watchLogs = () => {
  if (fs.existsSync(logFile)) {
    fs.watch(logFile, (event, filename) => {
      fs.readFile(logFile, 'utf8', (err, data) => {
        if (!err) {
          io.emit('logs', data);
        }
      });
    });
  }
};

io.on('connection', async (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  try {
    const { data: solves } = await supabase
      .from('solve_activity')
      .select('*')
      .order('date', { ascending: false })
      .limit(100);

    socket.emit('activity', solves || []);

    const { data: scoreboard } = await supabase
      .from('scoreboard')
      .select('*')
      .order('score', { ascending: false });

    socket.emit('update', scoreboard || []);

    watchLogs();
  } catch (e) {
    logger.error(`Socket connection error: ${e.message}`);
  }

  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

const initDatabase = async () => {
  try {
    const { data: existingToken } = await supabase
      .from('admin_tokens')
      .select('token')
      .eq('token', admin_token)
      .maybeSingle();

    if (!existingToken) {
      const { error } = await supabase
        .from('admin_tokens')
        .insert({ token: admin_token });

      if (error) throw error;
      logger.info('Admin token created');
    }
  } catch (e) {
    logger.error(`Database initialization error: ${e.message}`);
  }
};

initDatabase();

server.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server listening on http://0.0.0.0:${PORT}`);
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
