
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, TrendingUp, Crown, Medal, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

interface FamilyRanking {
  id: string;
  family_name: string;
  points: number;
  league: string;
  member_count: number;
  rank: number;
}

interface LeagueStats {
  league: string;
  family_count: number;
  avg_points: number;
  top_family: string;
  color_class: string;
}

const Leaderboard = () => {
  const [families, setFamilies] = useState<FamilyRanking[]>([]);
  const [leagueStats, setLeagueStats] = useState<LeagueStats[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <Trophy className="w-4 h-4 text-gray-400" />;
  };

  const fetchLeaderboardData = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, family_name, points, league, member_count')
        .order('points', { ascending: false });

      if (error) throw error;

      // Add rank to each family
      const rankedFamilies = profiles.map((family, index) => ({
        ...family,
        rank: index + 1
      }));

      setFamilies(rankedFamilies);

      // Calculate league statistics
      const leagueGroups = profiles.reduce((acc, family) => {
        if (!acc[family.league]) {
          acc[family.league] = {
            families: [],
            total_points: 0
          };
        }
        acc[family.league].families.push(family);
        acc[family.league].total_points += family.points;
        return acc;
      }, {} as any);

      const leagueStatsData = Object.entries(leagueGroups).map(([league, data]: [string, any]) => {
        const topFamily = data.families.reduce((prev: any, current: any) => 
          prev.points > current.points ? prev : current
        );
        
        return {
          league,
          family_count: data.families.length,
          avg_points: Math.round(data.total_points / data.families.length),
          top_family: topFamily.family_name,
          color_class: getLeagueColor(league)
        };
      }).sort((a, b) => {
        const leagueOrder = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Titanium', 'Diamond', 'Ruby', 'Wisdom'];
        return leagueOrder.indexOf(b.league) - leagueOrder.indexOf(a.league);
      });

      setLeagueStats(leagueStatsData);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();

    // Set up real-time subscription
    const subscription = supabase
      .channel('profiles')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'profiles' 
      }, () => {
        fetchLeaderboardData();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Rankings</h1>
          <p className="text-gray-600">See how your family ranks in Zafeco</p>
        </div>

        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="leaderboard">Family Rankings</TabsTrigger>
            <TabsTrigger value="leagues">League Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Global Family Rankings
                </CardTitle>
                <CardDescription>Top performing families worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {families.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No families registered yet. Be the first to join!</p>
                  ) : (
                    families.slice(0, 50).map((family) => (
                      <div
                        key={family.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          family.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(family.rank)}
                            <span className="font-bold text-lg">{family.rank}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{family.family_name}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {family.member_count} members
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-bold text-lg">{family.points}</p>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                          <Badge className={getLeagueColor(family.league)}>
                            {family.league}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leagues" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leagueStats.map((stat) => (
                <Card key={stat.league}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>{stat.league} League</span>
                      <Badge className={stat.color_class}>{stat.family_count}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Families</span>
                      <span className="font-semibold">{stat.family_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Points</span>
                      <span className="font-semibold">{stat.avg_points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Top Family</span>
                      <span className="font-semibold text-green-600 truncate max-w-24" title={stat.top_family}>
                        {stat.top_family}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
