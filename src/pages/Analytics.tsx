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
  Activity
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
      { id: 'water-reuse', name: 'Water Reuse', color: '#3B82F6', icon: Droplets },
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading analytics...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your family's environmental impact and progress</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">Total Points</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{profile.points}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">Total Actions</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalActions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-600">CO₂ Saved</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalCO2Saved.toFixed(1)}kg</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-600">Current Streak</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{streaks.current} days</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Daily Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Daily Activity (Last 30 Days)
                  </CardTitle>
                  <CardDescription>Points earned per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="points" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Action Types Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Action Types Distribution
                  </CardTitle>
                  <CardDescription>Breakdown by action category</CardDescription>
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
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Progress Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Points/Action</span>
                    <span className="font-semibold">{averagePointsPerAction.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Days Active</span>
                    <span className="font-semibold">{daysActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Max Streak</span>
                    <span className="font-semibold">{streaks.max} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current League</span>
                    <Badge className="bg-green-100 text-green-800">{profile.league}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CO₂ Reduction</span>
                      <span className="font-semibold text-green-600">{totalCO2Saved.toFixed(1)} kg</span>
                    </div>
                    <Progress value={Math.min((totalCO2Saved / 100) * 100, 100)} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Water Saved</span>
                      <span className="font-semibold text-blue-600">{(profile.points * 2).toFixed(0)} L</span>
                    </div>
                    <Progress value={Math.min((profile.points * 2 / 1000) * 100, 100)} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Waste Reduced</span>
                      <span className="font-semibold text-orange-600">{(profile.points * 0.5).toFixed(1)} kg</span>
                    </div>
                    <Progress value={Math.min((profile.points * 0.5 / 50) * 100, 100)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {streaks.current >= 7 && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">7-Day Streak!</span>
                      </div>
                    )}
                    {profile.points >= 100 && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">100 Points Milestone</span>
                      </div>
                    )}
                    {totalActions >= 10 && (
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                        <Award className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">10 Actions Completed</span>
                      </div>
                    )}
                    {actionTypeData.length >= 3 && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">Diverse Actions</span>
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
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                  <CardDescription>Points and actions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="points" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="actions" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* CO2 Savings Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>CO₂ Savings Trend</CardTitle>
                  <CardDescription>Environmental impact over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="co2Saved" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Action Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Action Breakdown</CardTitle>
                  <CardDescription>Detailed statistics by action type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {actionTypeData.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: action.color }}
                          />
                          <span className="font-medium">{action.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{action.count} actions</div>
                          <div className="text-sm text-gray-600">{action.points} points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Actions</CardTitle>
                  <CardDescription>Your latest green contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actions.slice(0, 8).map((action) => (
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Weekly Goals
                  </CardTitle>
                  <CardDescription>Track your weekly targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Points Goal (50/week)</span>
                      <span className="font-semibold">32/50</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Actions Goal (5/week)</span>
                      <span className="font-semibold">3/5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Streak Goal (7 days)</span>
                      <span className="font-semibold">{Math.min(streaks.current, 7)}/7</span>
                    </div>
                    <Progress value={(Math.min(streaks.current, 7) / 7) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Monthly Challenges
                  </CardTitle>
                  <CardDescription>Special challenges for this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border-2 border-green-200 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Water Conservation Champion</h4>
                    <p className="text-sm text-green-600 mb-2">Complete 10 water reuse actions</p>
                    <Progress value={30} className="h-2" />
                    <p className="text-xs text-green-600 mt-1">3/10 completed</p>
                  </div>
                  <div className="p-3 border-2 border-blue-200 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Recycling Hero</h4>
                    <p className="text-sm text-blue-600 mb-2">Recycle 15 items this month</p>
                    <Progress value={53} className="h-2" />
                    <p className="text-xs text-blue-600 mt-1">8/15 completed</p>
                  </div>
                  <div className="p-3 border-2 border-purple-200 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Green Transport</h4>
                    <p className="text-sm text-purple-600 mb-2">Use public transport 8 times</p>
                    <Progress value={25} className="h-2" />
                    <p className="text-xs text-purple-600 mt-1">2/8 completed</p>
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