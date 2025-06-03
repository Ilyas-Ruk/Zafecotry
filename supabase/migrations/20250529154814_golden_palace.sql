/*
  # Create achievements table

  1. New Tables
    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `achievement_id` (text)
      - `achievement_name` (text)
      - `description` (text)
      - `earned_at` (timestamptz)
      - `category` (text)

  2. Security
    - Enable RLS on `achievements` table
    - Add policies for:
      - Users can read their own achievements
      - Users can insert their own achievements
*/

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  achievement_id text NOT NULL,
  achievement_name text NOT NULL,
  description text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  category text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);