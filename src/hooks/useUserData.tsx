
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserProfile {
  id: string;
  family_name: string;
  email: string;
  member_count: number;
  points: number;
  league: string;
  created_at: string;
  updated_at: string;
}

interface UserAction {
  id: string;
  action_id: string;
  action_title: string;
  points_earned: number;
  photo_url: string | null;
  completed_at: string;
}

interface TutorialStatus {
  tutorial_completed: boolean;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [actions, setActions] = useState<UserAction[]>([]);
  const [tutorialStatus, setTutorialStatus] = useState<TutorialStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setProfile(null);
      setActions([]);
      setTutorialStatus(null);
      setLoading(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Fetch actions
      const { data: actionsData } = await supabase
        .from('user_actions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      // Fetch tutorial status
      const { data: tutorialData } = await supabase
        .from('user_tutorials')
        .select('tutorial_completed')
        .eq('user_id', user.id)
        .single();

      setProfile(profileData);
      setActions(actionsData || []);
      setTutorialStatus(tutorialData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile(data);
    }
    return { data, error };
  };

  const addAction = async (actionId: string, actionTitle: string, pointsEarned: number, photoUrl?: string) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('user_actions')
      .insert({
        user_id: user.id,
        action_id: actionId,
        action_title: actionTitle,
        points_earned: pointsEarned,
        photo_url: photoUrl
      })
      .select()
      .single();

    if (!error && data) {
      setActions(prev => [data, ...prev]);
      // Update profile points
      if (profile) {
        const newPoints = profile.points + pointsEarned;
        const newLeague = getLeague(newPoints);
        await updateProfile({ points: newPoints, league: newLeague });
      }
    }
    return { data, error };
  };

  const getLeague = (points: number) => {
    if (points >= 2000) return 'Wisdom';
    if (points >= 1500) return 'Ruby';
    if (points >= 1000) return 'Diamond';
    if (points >= 750) return 'Titanium';
    if (points >= 500) return 'Platinum';
    if (points >= 250) return 'Gold';
    if (points >= 100) return 'Silver';
    return 'Bronze';
  };

  return {
    profile,
    actions,
    tutorialStatus,
    loading,
    updateProfile,
    addAction,
    refreshData: fetchUserData
  };
};
