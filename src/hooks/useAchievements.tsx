
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: string;
  points_reward: number;
  earned: boolean;
  color_class: string;
}

interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
}

export const useAchievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAchievements();
    } else {
      setAchievements([]);
      setUserAchievements([]);
      setLoading(false);
    }
  }, [user]);

  const fetchAchievements = async () => {
    if (!user) return;

    try {
      // For now, use the existing achievements table data
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      // Create a static list of achievements since we don't have the full schema yet
      const staticAchievements: Achievement[] = [
        {
          id: '1',
          name: 'First Steps',
          description: 'Complete your first green action',
          icon: 'Leaf',
          requirement_type: 'actions_count',
          requirement_value: '1',
          points_reward: 10,
          earned: false,
          color_class: 'bg-green-100 text-green-800'
        },
        {
          id: '2',
          name: 'League Climber',
          description: 'Reach Silver League',
          icon: 'Trophy',
          requirement_type: 'league',
          requirement_value: 'Silver',
          points_reward: 25,
          earned: false,
          color_class: 'bg-gray-100 text-gray-800'
        },
        {
          id: '3',
          name: 'Point Master',
          description: 'Earn 100 total points',
          icon: 'Trophy',
          requirement_type: 'points',
          requirement_value: '100',
          points_reward: 20,
          earned: false,
          color_class: 'bg-yellow-100 text-yellow-800'
        },
        {
          id: '4',
          name: 'Gold Standard',
          description: 'Reach Gold League',
          icon: 'Trophy',
          requirement_type: 'league',
          requirement_value: 'Gold',
          points_reward: 50,
          earned: false,
          color_class: 'bg-yellow-100 text-yellow-800'
        },
        {
          id: '5',
          name: 'Eco Warrior',
          description: 'Earn 500 total points',
          icon: 'Trophy',
          requirement_type: 'points',
          requirement_value: '500',
          points_reward: 75,
          earned: false,
          color_class: 'bg-green-100 text-green-800'
        },
        {
          id: '6',
          name: 'Platinum Elite',
          description: 'Reach Platinum League',
          icon: 'Trophy',
          requirement_type: 'league',
          requirement_value: 'Platinum',
          points_reward: 100,
          earned: false,
          color_class: 'bg-purple-100 text-purple-800'
        }
      ];

      // Mark achievements as earned based on existing data
      const earnedAchievementIds = achievementsData?.map(a => a.achievement_id) || [];
      const updatedAchievements = staticAchievements.map(achievement => ({
        ...achievement,
        earned: earnedAchievementIds.includes(achievement.id)
      }));

      setAchievements(updatedAchievements);
      setUserAchievements(achievementsData || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAndAwardAchievement = async (profile: any, actionsCount: number) => {
    if (!user || !profile) return null;

    // Check for league achievements
    const leagueAchievements = achievements.filter(a => 
      a.requirement_type === 'league' && 
      a.requirement_value === profile.league && 
      !a.earned
    );

    // Check for points achievements
    const pointsAchievements = achievements.filter(a => 
      a.requirement_type === 'points' && 
      profile.points >= parseInt(a.requirement_value) && 
      !a.earned
    );

    // Check for actions achievements
    const actionsAchievements = achievements.filter(a => 
      a.requirement_type === 'actions_count' && 
      actionsCount >= parseInt(a.requirement_value) && 
      !a.earned
    );

    const newAchievements = [...leagueAchievements, ...pointsAchievements, ...actionsAchievements];

    if (newAchievements.length > 0) {
      // Award the first new achievement
      const achievement = newAchievements[0];
      
      try {
        await supabase
          .from('achievements')
          .insert({
            user_id: user.id,
            achievement_id: achievement.id,
            achievement_name: achievement.name,
            description: achievement.description,
            category: 'general',
            earned_at: new Date().toISOString()
          });

        // Refresh achievements
        fetchAchievements();

        return {
          name: achievement.name,
          description: achievement.description,
          colorClass: achievement.color_class
        };
      } catch (error) {
        console.error('Error awarding achievement:', error);
      }
    }

    return null;
  };

  return {
    achievements,
    userAchievements,
    loading,
    checkAndAwardAchievement,
    refreshAchievements: fetchAchievements
  };
};
