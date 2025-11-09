/*
  # Create CTF Live Scoreboard Schema

  1. New Tables
    - `scoreboard`
      - `id` (uuid, primary key)
      - `team` (text, team name)
      - `num_solves` (integer, number of challenges solved)
      - `num_bloods` (integer, number of first bloods)
      - `score` (text, team score)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `solve_activity`
      - `id` (uuid, primary key)
      - `team` (text, team name)
      - `user` (text, username)
      - `challenge` (text, challenge name)
      - `first_blood` (boolean, first blood status)
      - `date` (timestamp, solve timestamp)
      - `created_at` (timestamp)
    
    - `admin_tokens`
      - `id` (uuid, primary key)
      - `token` (text, admin authentication token)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Public read access for scoreboard and activity
    - Protected write access requiring API token validation
*/

CREATE TABLE IF NOT EXISTS scoreboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team text NOT NULL,
  num_solves integer DEFAULT 0,
  num_bloods integer DEFAULT 0,
  score text DEFAULT '0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS solve_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team text NOT NULL,
  "user" text,
  challenge text,
  first_blood boolean DEFAULT false,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scoreboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE solve_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scoreboard"
  ON scoreboard
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert scoreboard"
  ON scoreboard
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update scoreboard"
  ON scoreboard
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete scoreboard"
  ON scoreboard
  FOR DELETE
  TO service_role
  USING (true);

CREATE POLICY "Anyone can read solve activity"
  ON solve_activity
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert solve activity"
  ON solve_activity
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update solve activity"
  ON solve_activity
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete solve activity"
  ON solve_activity
  FOR DELETE
  TO service_role
  USING (true);

CREATE POLICY "Service role can read admin tokens"
  ON admin_tokens
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert admin tokens"
  ON admin_tokens
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_scoreboard_score ON scoreboard(score DESC);
CREATE INDEX IF NOT EXISTS idx_solve_activity_date ON solve_activity(date DESC);
CREATE INDEX IF NOT EXISTS idx_solve_activity_team ON solve_activity(team);
CREATE INDEX IF NOT EXISTS idx_admin_tokens_token ON admin_tokens(token);
