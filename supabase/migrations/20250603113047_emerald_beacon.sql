/*
  # Add achievement templates and sync data

  1. New Tables
    - `achievement_templates`
      - `id` (text, primary key) 
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `league` (text)
      - `icon` (text)
      - `color_class` (text)

  2. Data
    - Insert achievement templates for leagues and milestones
*/

CREATE TABLE IF NOT EXISTS achievement_templates (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  league text,
  icon text NOT NULL,
  color_class text NOT NULL
);

-- Insert achievement templates
INSERT INTO achievement_templates (id, name, description, category, league, icon, color_class) VALUES
  ('bronze_league', 'Bronze Pioneer', 'Started your green journey in the Bronze League', 'league', 'Bronze', 'Trophy', 'bg-orange-100 text-orange-800'),
  ('silver_league', 'Silver Achiever', 'Advanced to the Silver League', 'league', 'Silver', 'Trophy', 'bg-gray-100 text-gray-800'),
  ('gold_league', 'Gold Champion', 'Reached the prestigious Gold League', 'league', 'Gold', 'Trophy', 'bg-yellow-100 text-yellow-800'),
  ('platinum_league', 'Platinum Master', 'Ascended to the Platinum League', 'league', 'Platinum', 'Trophy', 'bg-purple-100 text-purple-800'),
  ('titanium_league', 'Titanium Elite', 'Achieved the powerful Titanium League', 'league', 'Titanium', 'Trophy', 'bg-blue-100 text-blue-800'),
  ('diamond_league', 'Diamond Expert', 'Earned your place in the Diamond League', 'league', 'Diamond', 'Trophy', 'bg-cyan-100 text-cyan-800'),
  ('ruby_league', 'Ruby Legend', 'Attained the legendary Ruby League', 'league', 'Ruby', 'Trophy', 'bg-red-100 text-red-800'),
  ('wisdom_league', 'Wisdom Sage', 'Reached the ultimate Wisdom League', 'league', 'Wisdom', 'Trophy', 'bg-indigo-100 text-indigo-800'),
  ('first_action', 'First Step', 'Completed your first green action', 'milestone', NULL, 'Leaf', 'bg-green-100 text-green-800'),
  ('ten_actions', 'Consistent Green', 'Completed 10 green actions', 'milestone', NULL, 'Leaf', 'bg-green-100 text-green-800'),
  ('fifty_actions', 'Green Warrior', 'Completed 50 green actions', 'milestone', NULL, 'Leaf', 'bg-green-100 text-green-800'),
  ('hundred_actions', 'Green Master', 'Completed 100 green actions', 'milestone', NULL, 'Leaf', 'bg-green-100 text-green-800');