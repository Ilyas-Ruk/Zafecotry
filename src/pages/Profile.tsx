
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Mail, Calendar, Trophy, Leaf, Droplets, Recycle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const navigate = useNavigate();
  const [familyData, setFamilyData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('familyData');
    if (!data) {
      navigate('/');
      return;
    }
    setFamilyData(JSON.parse(data));
  }, [navigate]);

  if (!familyData) return null;

  const getLeagueColor = (league) => {
    switch(league) {
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('familyData');
    navigate('/');
  };

  const joinDate = new Date(familyData.joinDate).toLocaleDateString();
  const daysActive = Math.floor((new Date() - new Date(familyData.joinDate)) / (1000 * 60 * 60 * 24));

  // Mock activity data
  const weeklyActivity = [
    { day: 'Mon', points: 25 },
    { day: 'Tue', points: 18 },
    { day: 'Wed', points: 32 },
    { day: 'Thu', points: 15 },
    { day: 'Fri', points: 28 },
    { day: 'Sat', points: 40 },
    { day: 'Sun', points: 22 }
  ];

  const achievements = [
    { name: 'First Water Reuse', icon: Droplets, earned: true, description: 'Upload your first water reuse photo' },
    { name: 'Recycling Champion', icon: Recycle, earned: false, description: 'Recycle 20 items in a week' },
    { name: 'Green Streak', icon: Leaf, earned: true, description: 'Complete green actions for 7 days straight' },
    { name: 'League Climber', icon: Trophy, earned: false, description: 'Reach Silver League' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Profile</h1>
          <p className="text-gray-600">Manage your family's green journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Family Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {familyData.familyName}
                </CardTitle>
                <CardDescription>Family Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{familyData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{familyData.memberCount} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Joined {joinDate}</span>
                </div>
                <div className="pt-2">
                  <Badge className={getLeagueColor(familyData.league)}>
                    {familyData.league} League
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Points</span>
                  <span className="font-semibold">{familyData.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Days Active</span>
                  <span className="font-semibold">{daysActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Rank</span>
                  <span className="font-semibold">#15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CO₂ Saved</span>
                  <span className="font-semibold text-green-600">24.8 kg</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity and Achievements */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Your points earned this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex items-center gap-3">
                      <span className="text-sm font-medium w-8">{day.day}</span>
                      <Progress value={(day.points / 40) * 100} className="flex-1" />
                      <span className="text-sm font-semibold w-12 text-right">{day.points}pt</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Track your family's green milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.name}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.earned 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <achievement.icon 
                          className={`w-6 h-6 ${
                            achievement.earned ? 'text-green-600' : 'text-gray-400'
                          }`} 
                        />
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
