import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Leaf, 
  Droplets, 
  Recycle, 
  Heart,
  Car,
  Sprout,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Fire,
  Sparkles
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserData } from "@/hooks/useUserData";

interface DailyProgress {
  date: string;
  points: number;
  actions: number;
}

interface ActionTypeData {
  name: string;
  count: number;
  points: number;
  color: string;
}

interface MonthlyData {
  month: string;
  points: number;
  actions: number;
  co2Saved: number;
}

const Analytics = () => {
  const { profile, actions, loading } = useUserData();
  const [dailyProgress, setDailyProgress] = useState<DailyProgress[]>([]);
  const [actionTypeData, setActionTypeData] = useState<ActionTypeData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    if (actions && actions.length > 0) {
      generateAnalyticsData();
    }
  }, [actions]);

  const generateAnalyticsData = () => {
    // Generate daily progress for last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyData = last30Days.map(date => {
      const dayActions = actions.filter(action => 
        action.completed_at.split('T')[0] === date
      );
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        points: dayActions.reduce((sum, action) => sum + action.points_earned, 0),
        actions: dayActions.length
      };
    });
    setDailyProgress(dailyData);

    // Generate action type data
    const actionTypes = [
      { id: 'water-reuse', name: 'Water Reuse', color: '#06B6D4', icon: Droplets },
      { id: 'recycle', name: 'Recycling', color: '#10B981', icon: Recycle },
      { id: 'donate', name: 'Donate Items', color: '#F59E0B', icon: Heart },
      { id: 'public-transport', name: 'Public Transport', color: '#8B5CF6', icon: Car },
      { id: 'plant', name: 'Plant Something', color: '#06B6D4', icon: Sprout },
      { id: 'reduce-waste', name: 'Reduce Food Waste', color: '#EF4444', icon: Leaf }
    ];

    const typeData = actionTypes.map(type => {
      const typeActions = actions.filter(action => action.action_id === type.id);
      return {
        name: type.name,
        count: typeActions.length,
        points: typeActions.reduce((sum, action) => sum + action.points_earned, 0),
        color: type.color
      };
    }).filter(type => type.count > 0);
    setActionTypeData(typeData);

    // Generate monthly data for last 6 months
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return date;
    });

    const monthlyStats = last6Months.map(date => {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthActions = actions.filter(action => {
        const actionDate = new Date(action.completed_at);
        return actionDate >= monthStart && actionDate <= monthEnd;
      });

      const points = monthActions.reduce((sum, action) => sum + action.points_earned, 0);
      
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        points,
        actions: monthActions.length,
        co2Saved: points * 0.1 // Assuming 0.1kg CO2 saved per point
      };
    });
    setMonthlyData(monthlyStats);
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <p className="text-cyan-300 font-medium">Loading your vibe check...</p>
        </div>
      </div>
    );
  }

  const totalActions = actions.length;
  const totalCO2Saved = profile.points * 0.1;
  const averagePointsPerAction = totalActions > 0 ? profile.points / totalActions : 0;
  const daysActive = Math.floor((new Date().getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24));

  // Calculate streaks
  const calculateStreak = () => {
    if (actions.length === 0) return 0;
    
    let currentStreak = 0;
    let maxStreak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const hasAction = actions.some(action => 
        action.completed_at.split('T')[0] === dateStr
      );
      
      if (hasAction) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else if (i > 0) { // Don't break streak on first day (today)
        break;
      }
    }
    
    return { current: currentStreak, max: maxStreak };
  };

  const streaks = calculateStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Fire className="w-8 h-8 text-orange-500" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Green Stats ✨
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Track your eco impact and flex those green gains 💚</p>
        </div>

        {/* Key Metrics - Gen Z Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold text-cyan-300">Total Points</span>
              </div>
              <div className="text-3xl font-black text-white">{profile.points}</div>
              <div className="text-xs text-cyan-300">absolutely slaying 🔥</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-400/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-bold text-purple-300">Actions</span>
              </div>
              <div className="text-3xl font-black text-white">{totalActions}</div>
              <div className="text-xs text-purple-300">eco warrior mode 💪</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-400/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-400" />
                <span className="text-sm font-bold text-green-300">CO₂ Saved</span>
              </div>
              <div className="text-3xl font-black text-white">{totalCO2Saved.toFixed(1)}kg</div>
              <div className="text-xs text-green-300">planet hero status 🌍</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border-orange-400/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Fire className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-bold text-orange-300">Streak</span>
              </div>
              <div className="text-3xl font-black text-white">{streaks.current}</div>
              <div className="text-xs text-orange-300">days of pure fire 🔥</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">Overview</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">Trends</TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300">Actions</TabsTrigger>
            <TabsTrigger value="goals" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Daily Activity Chart */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-300">
                    <BarChart3 className="w-5 h-5" />
                    Daily Grind (Last 30 Days)
                  </CardTitle>
                  <CardDescription className="text-gray-400">Points earned per day - showing off that consistency 💯</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                      <Bar dataKey="points" fill="url(#gradient1)" />
                      <defs>
                        <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Action Types Distribution */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-300">
                    <PieChartIcon className="w-5 h-5" />
                    Your Green Vibe Check
                  </CardTitle>
                  <CardDescription className="text-gray-400">What type of eco warrior are you? 🌱</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={actionTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ name, count }) => `${name}: ${count}`}
                      >
                        {actionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Progress Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Avg Points/Action</span>
                    <span className="font-bold text-cyan-300">{averagePointsPerAction.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Days Active</span>
                    <span className="font-bold text-purple-300">{daysActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Max Streak</span>
                    <span className="font-bold text-orange-300">{streaks.max} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Current League</span>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">{profile.league}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-green-300">Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">CO₂ Reduction</span>
                      <span className="font-bold text-green-400">{totalCO2Saved.toFixed(1)} kg</span>
                    </div>
                    <Progress value={Math.min((totalCO2Saved / 100) * 100, 100)} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Water Saved</span>
                      <span className="font-bold text-blue-400">{(profile.points * 2).toFixed(0)} L</span>
                    </div>
                    <Progress value={Math.min((profile.points * 2 / 1000) * 100, 100)} className="h-2 bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Waste Reduced</span>
                      <span className="font-bold text-orange-400">{(profile.points * 0.5).toFixed(1)} kg</span>
                    </div>
                    <Progress value={Math.min((profile.points * 0.5 / 50) * 100, 100)} className="h-2 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-yellow-300">Achievement Unlocked 🏆</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {streaks.current >= 7 && (
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                        <Fire className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-bold text-green-300">Week Streak Beast! 🔥</span>
                      </div>
                    )}
                    {profile.points >= 100 && (
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
                        <Award className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-bold text-blue-300">Century Club Member! 💯</span>
                      </div>
                    )}
                    {totalActions >= 10 && (
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                        <Zap className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-bold text-purple-300">Action Hero Status! ⚡</span>
                      </div>
                    )}
                    {actionTypeData.length >= 3 && (
                      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-bold text-yellow-300">Diversity Champion! ✨</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Progress */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300">Monthly Glow Up 📈</CardTitle>
                  <CardDescription className="text-gray-400">Your eco journey over time - pure growth energy</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                      <Line type="monotone" dataKey="points" stroke="#06B6D4" strokeWidth={3} />
                      <Line type="monotone" dataKey="actions" stroke="#8B5CF6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* CO2 Savings Trend */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-300">Planet Healing Vibes 🌍</CardTitle>
                  <CardDescription className="text-gray-400">Your environmental impact is literally iconic</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F3F4F6'
                        }} 
                      />
                      <Area type="monotone" dataKey="co2Saved" stroke="#10B981" fill="url(#gradient2)" />
                      <defs>
                        <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Action Breakdown */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Action Breakdown 📊</CardTitle>
                  <CardDescription className="text-gray-400">Your green action portfolio is chef's kiss 💋</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {actionTypeData.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: action.color }}
                          />
                          <span className="font-medium text-white">{action.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-cyan-300">{action.count} actions</div>
                          <div className="text-sm text-gray-400">{action.points} points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Actions */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-300">Recent Wins 🎉</CardTitle>
                  <CardDescription className="text-gray-400">Your latest green flex moments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actions.slice(0, 8).map((action) => (
                      <div key={action.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                        <div>
                          <p className="font-medium text-sm text-white">{action.action_title}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(action.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">+{action.points_earned} pts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Goals */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-300">
                    <Target className="w-5 h-5" />
                    Weekly Targets 🎯
                  </CardTitle>
                  <CardDescription className="text-gray-400">Hit these goals and you're literally unstoppable</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Points Goal (50/week)</span>
                      <span className="font-bold text-cyan-300">32/50</span>
                    </div>
                    <Progress value={64} className="h-3 bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Actions Goal (5/week)</span>
                      <span className="font-bold text-purple-300">3/5</span>
                    </div>
                    <Progress value={60} className="h-3 bg-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Streak Goal (7 days)</span>
                      <span className="font-bold text-orange-300">{Math.min(streaks.current, 7)}/7</span>
                    </div>
                    <Progress value={(Math.min(streaks.current, 7) / 7) * 100} className="h-3 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Challenges */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-pink-300">
                    <Calendar className="w-5 h-5" />
                    Monthly Challenges 🚀
                  </CardTitle>
                  <CardDescription className="text-gray-400">Special missions for the eco elite</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border-2 border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg">
                    <h4 className="font-bold text-cyan-300">Water Conservation Champion 💧</h4>
                    <p className="text-sm text-cyan-200 mb-2">Complete 10 water reuse actions</p>
                    <Progress value={30} className="h-2 bg-slate-700" />
                    <p className="text-xs text-cyan-300 mt-1">3/10 completed - you got this!</p>
                  </div>
                  <div className="p-4 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                    <h4 className="font-bold text-green-300">Recycling Hero ♻️</h4>
                    <p className="text-sm text-green-200 mb-2">Recycle 15 items this month</p>
                    <Progress value={53} className="h-2 bg-slate-700" />
                    <p className="text-xs text-green-300 mt-1">8/15 completed - halfway there!</p>
                  </div>
                  <div className="p-4 border-2 border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                    <h4 className="font-bold text-purple-300">Green Transport 🚌</h4>
                    <p className="text-sm text-purple-200 mb-2">Use public transport 8 times</p>
                    <Progress value={25} className="h-2 bg-slate-700" />
                    <p className="text-xs text-purple-300 mt-1">2/8 completed - keep going!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;