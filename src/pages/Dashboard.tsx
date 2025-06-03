import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Plus, Trophy, Leaf, Camera, Target, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useAchievements } from "@/hooks/useAchievements";
import Navigation from "@/components/Navigation";
import ActionCard from "@/components/ActionCard";
import PhotoUpload from "@/components/PhotoUpload";
import TutorialOverlay from "@/components/TutorialOverlay";
import AchievementPopup from "@/components/AchievementPopup";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile, actions, loading: userLoading, addAction, refreshData } = useUserData();
  const { achievements, checkAndAwardAchievement } = useAchievements();
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [achievementPopup, setAchievementPopup] = useState<any>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const sustainabilityActions = [
    {
      id: 'water-conservation',
      title: 'Water Conservation',
      description: 'Take a shorter shower or fix a leaky faucet',
      points: 15,
      icon: 'Droplets',
      category: 'Water'
    },
    {
      id: 'energy-saving',
      title: 'Energy Saving',
      description: 'Switch to LED bulbs or unplug devices',
      points: 20,
      icon: 'Zap',
      category: 'Energy'
    },
    {
      id: 'recycling',
      title: 'Recycling',
      description: 'Properly sort and recycle household waste',
      points: 10,
      icon: 'RotateCcw',
      category: 'Waste'
    },
    {
      id: 'sustainable-transport',
      title: 'Sustainable Transport',
      description: 'Walk, bike, or use public transport',
      points: 25,
      icon: 'Bike',
      category: 'Transport'
    },
    {
      id: 'plant-care',
      title: 'Plant Care',
      description: 'Water plants or start a small garden',
      points: 15,
      icon: 'Leaf',
      category: 'Environment'
    },
    {
      id: 'eco-shopping',
      title: 'Eco Shopping',
      description: 'Buy local or organic products',
      points: 20,
      icon: 'ShoppingBag',
      category: 'Consumption'
    }
  ];

  const handleActionClick = (action: any) => {
    setSelectedAction(action);
    setShowPhotoUpload(true);
  };

  const handlePhotoSubmit = async (actionId: string, imageFile: File) => {
    if (!selectedAction || !profile) return;

    try {
      // For now, we'll use a placeholder URL since we don't have image upload implemented
      const photoUrl = `placeholder-${Date.now()}.jpg`;
      
      await addAction(
        actionId,
        selectedAction.title,
        selectedAction.points,
        photoUrl
      );

      // Check for new achievements
      const newAchievement = await checkAndAwardAchievement(
        { ...profile, points: profile.points + selectedAction.points },
        actions.length + 1
      );

      if (newAchievement) {
        setAchievementPopup(newAchievement);
      }

      // Refresh data to get updated profile and actions
      refreshData();
      
      setShowPhotoUpload(false);
      setSelectedAction(null);
    } catch (error) {
      console.error('Error adding action:', error);
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center pt-20">
          <div className="text-center">
            <p className="text-gray-600">Unable to load profile data.</p>
            <Button onClick={() => navigate('/auth')} className="mt-4">
              Go to Authentication
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getLeagueColor = (league: string) => {
    const colors: { [key: string]: string } = {
      'Bronze': 'bg-amber-100 text-amber-800',
      'Silver': 'bg-gray-100 text-gray-800',
      'Gold': 'bg-yellow-100 text-yellow-800',
      'Platinum': 'bg-purple-100 text-purple-800',
      'Titanium': 'bg-blue-100 text-blue-800',
      'Diamond': 'bg-cyan-100 text-cyan-800',
      'Ruby': 'bg-red-100 text-red-800',
      'Wisdom': 'bg-indigo-100 text-indigo-800'
    };
    return colors[league] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {showTutorial && (
        <TutorialOverlay onComplete={handleTutorialComplete} />
      )}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {profile.family_name} Family!
          </h1>
          <p className="text-gray-600">
            Track your sustainability actions and compete with families worldwide
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{profile.points}</div>
              <p className="text-xs text-gray-600">Keep earning points!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current League</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <Badge className={getLeagueColor(profile.league)}>
                {profile.league}
              </Badge>
              <p className="text-xs text-gray-600 mt-1">League standing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actions Completed</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{actions.length}</div>
              <p className="text-xs text-gray-600">Eco-friendly actions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="actions">Available Actions</TabsTrigger>
            <TabsTrigger value="recent">Recent Actions</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="actions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Choose Your Next Action</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Suggest Action
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sustainabilityActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={{
                    id: action.id,
                    icon: Leaf,
                    title: action.title,
                    points: action.points,
                    description: action.description,
                    requiresPhoto: true
                  }}
                  onClick={() => handleActionClick(action)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Recent Actions</h2>
            
            {actions.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No actions yet</h3>
                  <p className="text-gray-600 mb-4">Start your sustainability journey by completing your first action!</p>
                  <Button onClick={() => navigate('/dashboard')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Complete Your First Action
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {actions.slice(0, 10).map((action) => (
                  <Card key={action.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{action.action_title}</h3>
                          <p className="text-sm text-gray-600">
                            Completed {new Date(action.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">+{action.points_earned} points</Badge>
                        {action.photo_url && (
                          <Camera className="w-4 h-4 text-gray-400 mt-1 ml-auto" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 opacity-60'}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Trophy className={`w-8 h-8 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <h3 className={`font-semibold mb-2 ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm mb-3 ${achievement.earned ? 'text-gray-700' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                    <Badge className={achievement.earned ? achievement.color_class : 'bg-gray-100 text-gray-500'}>
                      {achievement.earned ? 'Earned!' : `${achievement.points_reward} points`}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoUpload && selectedAction && (
        <PhotoUpload
          action={{
            id: selectedAction.id,
            title: selectedAction.title,
            points: selectedAction.points,
            description: selectedAction.description
          }}
          onSubmit={handlePhotoSubmit}
          onClose={() => {
            setShowPhotoUpload(false);
            setSelectedAction(null);
          }}
        />
      )}

      {/* Achievement Popup */}
      {achievementPopup && (
        <AchievementPopup
          achievement={achievementPopup}
          onClose={() => setAchievementPopup(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
