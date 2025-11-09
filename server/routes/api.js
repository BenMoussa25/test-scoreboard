import express from 'express';
import { supabase } from '../config/supabase.js';
import { apiAuth, adminAuth } from '../middleware/auth.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/scoreboard', apiAuth, async (req, res) => {
  try {
    const scoreboardData = req.body;

    const { error: deleteError } = await supabase
      .from('scoreboard')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) throw deleteError;

    const insertData = scoreboardData.map((team, index) => ({
      team: team.team,
      num_solves: team.num_solves,
      num_bloods: 0,
      score: team.score.toString()
    }));

    const { error: insertError } = await supabase
      .from('scoreboard')
      .insert(insertData);

    if (insertError) throw insertError;

    const { data: updatedScoreboard } = await supabase
      .from('scoreboard')
      .select('*')
      .order('score', { ascending: false });

    req.app.get('io').emit('update', updatedScoreboard);
    logger.info('Scoreboard updated successfully');

    res.json({ success: true, message: 'OK! Scoreboard saved!' });
  } catch (e) {
    logger.error(`Scoreboard update failed: ${e.message}`);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.post('/solve', apiAuth, async (req, res) => {
  try {
    const solveData = req.body;

    if (solveData.length !== 1) {
      return res.status(400).json({
        success: false,
        message: 'Can only send one solve at a time'
      });
    }

    const solve = solveData[0];
    const { team, user, challenge, first_blood, date } = solve;

    const { error } = await supabase
      .from('solve_activity')
      .insert({
        team,
        user,
        challenge,
        first_blood,
        date: new Date(date).toISOString()
      });

    if (error) throw error;

    req.app.get('io').emit('activity', solveData);
    logger.info('New solve activity added');

    if (first_blood) {
      const { error: updateError } = await supabase
        .from('scoreboard')
        .update({ num_bloods: supabase.raw('num_bloods + 1') })
        .eq('team', team);

      req.app.get('io').emit('first_blood', solveData);
      logger.info(`First blood for ${team} on ${challenge}`);
    }

    res.json({
      success: true,
      message: `OK! Solve saved! firstblood status: ${first_blood}`
    });
  } catch (e) {
    logger.error(`Solve submission failed: ${e.message}`);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { login_token } = req.body;

    const { data, error } = await supabase
      .from('admin_tokens')
      .select('token')
      .eq('token', login_token)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      req.session.admin = true;
      logger.info('Admin login successful');
      return res.json({ success: true, message: 'Login successful' });
    }

    logger.warn('Failed admin login attempt');
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (e) {
    logger.error(`Login failed: ${e.message}`);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.get('/scoreboard', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('scoreboard')
      .select('*')
      .order('score', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (e) {
    logger.error(`Get scoreboard failed: ${e.message}`);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.get('/activity', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('solve_activity')
      .select('*')
      .order('date', { ascending: false })
      .limit(100);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (e) {
    logger.error(`Get activity failed: ${e.message}`);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

export default router;
