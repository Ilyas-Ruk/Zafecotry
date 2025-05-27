import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Droplets, Recycle, Heart, Car, Sprout, Trophy, Users, Camera } from "lucide-react";
import Navigation from "@/components/Navigation";
import ActionCard from "@/components/ActionCard";
import PhotoUpload from "@/components/PhotoUpload";

const Dashboard = () => {
  const navigate = useNavigate();
  const [familyData, setFamilyData] = useState(null);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('familyData');
    if (!data) {
      navigate('/');
      return;
    }
    setFamilyData(JSON.parse(data));
  }, [navigate]);

  if (!familyData) return null;

  const greenActions = [
    { id: 'water-reuse', icon: Droplets, title: 'Water Reuse', points: 10, description: 'Reuse water for plants or cleaning', requiresPhoto: true },
    { id: 'recycle', icon: Recycle, title: 'Recycling', points: 5, description: 'Recycle plastic, paper, or glass' },
    { id: 'donate', icon: Heart, title: 'Donate Items', points: 15, description: 'Donate clothes or household items' },
    { id: 'public-transport', icon: Car, title: 'Public Transport', points: 8, description: 'Use public transportation' },
    { id: 'plant', icon: Sprout, title: 'Plant Something', points: 20, description: 'Plant trees, flowers, or vegetables', requiresPhoto: true },
    { id: 'reduce-waste', icon: Leaf, title: 'Reduce Food Waste', points: 12, description: 'Minimize food wastage' }
  ];

  const handleActionClick = (action) => {
    if (action.requiresPhoto) {
      setSelectedAction(action);
      setShowPhotoUpload(true);
    } else {
      // Add points directly for non-photo actions
      const newPoints = familyData.points + action.points;
      const updatedData = { ...familyData, points: newPoints };
      setFamilyData(updatedData);
      localStorage.setItem('familyData', JSON.stringify(updatedData));
    }
  };

  const handlePhotoSubmit = (actionId, imageFile) => {
    const action = greenActions.find(a => a.id === actionId);
    const newPoints = familyData.points + action.points;
    const updatedData = { ...familyData, points: newPoints };
    setFamilyData(updatedData);
    localStorage.setItem('familyData', JSON.stringify(updatedData));
    setShowPhotoUpload(false);
    setSelectedAction(null);
  };

  const getLeagueColor = (league) => {
    switch(league) {
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const nextLeagueThreshold = {
    'Bronze': 100,
    'Silver': 500,
    'Gold': 1000,
    'Platinum': 2000
  };

  const progressToNext = (familyData.points / nextLeagueThreshold[familyData.league]) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Family Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{familyData.familyName}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {familyData.memberCount} members
              </p>
            </div>
            <Badge className={getLeagueColor(familyData.league)}>
              {familyData.league} League
            </Badge>
          </div>

          {/* Points and Progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    {familyData.points} Points
                  </CardTitle>
                  <CardDescription>
                    {nextLeagueThreshold[familyData.league] - familyData.points} points to next league
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
            <TabsTrigger value="actions">Green Actions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="actions" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Earn Points Today</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Your family's green impact this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Water Reused</span>
                      <span className="font-semibold">45L</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Items Recycled</span>
                      <span className="font-semibold">12 items</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO₂ Saved</span>
                      <span className="font-semibold text-green-600">8.5kg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Unlock badges for your green actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-xs font-medium">Water Saver</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg opacity-50">
                      <Recycle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs font-medium">Eco Warrior</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg opacity-50">
                      <Sprout className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs font-medium">Green Thumb</p>
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
    </div>
  );
};

export default Dashboard;
