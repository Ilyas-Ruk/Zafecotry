
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Droplets, Recycle, Heart, Car, Sprout, Trophy, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import ActionCard from "@/components/ActionCard";
import PhotoUpload from "@/components/PhotoUpload";
import LeagueModal from "@/components/LeagueModal";
import PromotionModal from "@/components/PromotionModal";
import TutorialOverlay from "@/components/TutorialOverlay";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, actions, tutorialStatus, loading, addAction } = useUserData();
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showLeagueModal, setShowLeagueModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionData, setPromotionData] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (tutorialStatus && !tutorialStatus.tutorial_completed) {
      setShowTutorial(true);
    }
  }, [tutorialStatus]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const greenActions = [
    { id: 'water-reuse', icon: Droplets, title: 'Water Reuse', points: 10, description: 'Reuse water for plants or cleaning', requiresPhoto: true },
    { id: 'recycle', icon: Recycle, title: 'Recycling', points: 5, description: 'Recycle plastic, paper, or glass', requiresPhoto: true },
    { id: 'donate', icon: Heart, title: 'Donate Items', points: 15, description: 'Donate clothes or household items', requiresPhoto: true },
    { id: 'public-transport', icon: Car, title: 'Public Transport', points: 8, description: 'Use public transportation', requiresPhoto: true },
    { id: 'plant', icon: Sprout, title: 'Plant Something', points: 20, description: 'Plant trees, flowers, or vegetables', requiresPhoto: true },
    { id: 'reduce-waste', icon: Leaf, title: 'Reduce Food Waste', points: 12, description: 'Minimize food wastage', requiresPhoto: true }
  ];

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setShowPhotoUpload(true);
  };

  const handlePhotoSubmit = async (actionId: string, imageFile: File) => {
    const action = greenActions.find(a => a.id === actionId);
    if (!action) return;

    const currentLeague = profile.league;
    
    // Add the action to database
    await addAction(actionId, action.title, action.points);
    
    // Calculate new league
    const newPoints = profile.points + action.points;
    const newLeague = getLeague(newPoints);
    
    // Check for league promotion
    if (currentLeague !== newLeague) {
      setPromotionData({ oldLeague: currentLeague, newLeague: newLeague });
      setShowPromotionModal(true);
    }
    
    setShowPhotoUpload(false);
    setSelectedAction(null);
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

  const getLeagueColor = (league: string) => {
    switch(league) {
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Titanium': return 'bg-blue-100 text-blue-800';
      case 'Diamond': return 'bg-cyan-100 text-cyan-800';
      case 'Ruby': return 'bg-red-100 text-red-800';
      case 'Wisdom': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const nextLeagueThreshold = {
    'Bronze': 100,
    'Silver': 250,
    'Gold': 500,
    'Platinum': 750,
    'Titanium': 1000,
    'Diamond': 1500,
    'Ruby': 2000,
    'Wisdom': 3000
  };

  const progressToNext = profile.league === 'Wisdom' ? 100 : (profile.points / nextLeagueThreshold[profile.league]) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Family Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.family_name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {profile.member_count} members
              </p>
            </div>
            <Badge 
              className={`cursor-pointer ${getLeagueColor(profile.league)}`}
              onClick={() => setShowLeagueModal(true)}
            >
              {profile.league} League
            </Badge>
          </div>

          {/* Points and Progress */}
          <Card id="points-section">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    {profile.points} Points
                  </CardTitle>
                  <CardDescription>
                    {profile.league === 'Wisdom' 
                      ? 'You have reached the highest league!' 
                      : `${nextLeagueThreshold[profile.league] - profile.points} points to next league`
                    }
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressToNext} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Green Actions */}
        <Tabs defaultValue="actions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="actions" id="progress-tab">Green Actions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="actions" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Earn Points Today</h2>
            <div id="green-actions" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {greenActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onClick={() => handleActionClick(action)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Actions</CardTitle>
                  <CardDescription>Your latest green contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actions.slice(0, 5).map((action) => (
                      <div key={action.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{action.action_title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(action.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">+{action.points_earned} pts</Badge>
                      </div>
                    ))}
                    {actions.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No actions completed yet. Start your green journey!</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                  <CardDescription>Environmental difference you're making</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Actions</span>
                      <span className="font-semibold">{actions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Points</span>
                      <span className="font-semibold">{profile.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current League</span>
                      <Badge className={getLeagueColor(profile.league)}>{profile.league}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>CO₂ Saved</span>
                      <span className="font-semibold text-green-600">{(profile.points * 0.1).toFixed(1)} kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <PhotoUpload
          action={selectedAction}
          onSubmit={handlePhotoSubmit}
          onClose={() => {
            setShowPhotoUpload(false);
            setSelectedAction(null);
          }}
        />
      )}

      {/* League Modal */}
      {showLeagueModal && (
        <LeagueModal
          currentLeague={profile.league}
          onClose={() => setShowLeagueModal(false)}
        />
      )}

      {/* Promotion Modal */}
      {showPromotionModal && (
        <PromotionModal
          promotionData={promotionData}
          onClose={() => setShowPromotionModal(false)}
        />
      )}

      {/* Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay
          onComplete={() => setShowTutorial(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
