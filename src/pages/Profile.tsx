import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Mail, Calendar, Trophy, Leaf, Droplets, Recycle, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WeeklyActivity {
  day: string;
  points: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, actions, achievements, loading } = useUserData();
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  useEffect(() => {
    if (actions) {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);

      const dailyPoints: { [key: string]: number } = {
        'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0
      };

      actions.forEach(action => {
        const actionDate = new Date(action.completed_at);
        if (actionDate >= startOfWeek) {
          const dayName = actionDate.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
          dailyPoints[dayName] += action.points_earned;
        }
      });

      const weeklyData = Object.entries(dailyPoints).map(([day, points]) => ({
        day,
        points
      }));

      const mondayStart = [...weeklyData.slice(1), weeklyData[0]];
      setWeeklyActivity(mondayStart);
    }
  }, [actions]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const joinDate = new Date(profile.created_at).toLocaleDateString();
  const daysActive = Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24));

  const maxDailyPoints = Math.max(...weeklyActivity.map(day => day.points)) || 50;

  const displayedAchievements = showAllAchievements ? achievements : achievements.slice(0, 4);

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
                  {profile.family_name}
                </CardTitle>
                <CardDescription>Family Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{profile.member_count} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Joined {joinDate}</span>
                </div>
                <div className="pt-2">
                  <Badge className={getLeagueColor(profile.league)}>
                    {profile.league} League
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
                  <span className="font-semibold">{profile.points}</span>
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
                  <span className="font-semibold text-green-600">{(profile.points * 0.1).toFixed(1)} kg</span>
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
                      <Progress 
                        value={(day.points / maxDailyPoints) * 100} 
                        className="flex-1" 
                      />
                      <span className="text-sm font-semibold w-12 text-right">{day.points}pt</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Track your family's green milestones</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View All
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>All Achievements</DialogTitle>
                      <DialogDescription>
                        Your family's complete achievement history
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-4 py-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="p-4 rounded-lg border-2 border-green-200 bg-green-50"
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {achievement.achievement_name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            Earned on {new Date(achievement.earned_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {displayedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 rounded-lg border-2 border-green-200 bg-green-50"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {achievement.achievement_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
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