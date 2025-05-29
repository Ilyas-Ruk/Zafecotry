import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Medal, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardFamily {
  id: string;
  family_name: string;
  points: number;
  league: string;
  member_count: number;
  rank?: number;
}

const Leaderboard = () => {
  const [families, setFamilies] = useState<LeaderboardFamily[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, family_name, points, league, member_count')
        .order('points', { ascending: false });

      if (error) throw error;

      // Add rank to each family
      const rankedFamilies = data.map((family, index) => ({
        ...family,
        rank: index + 1
      }));

      setFamilies(rankedFamilies);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
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

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-500" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
  };

  const leagueStats = {
    Bronze: families.filter(f => f.league === 'Bronze').length,
    Silver: families.filter(f => f.league === 'Silver').length,
    Gold: families.filter(f => f.league === 'Gold').length,
    Platinum: families.filter(f => f.league === 'Platinum').length,
    Titanium: families.filter(f => f.league === 'Titanium').length,
    Diamond: families.filter(f => f.league === 'Diamond').length,
    Ruby: families.filter(f => f.league === 'Ruby').length,
    Wisdom: families.filter(f => f.league === 'Wisdom').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <Trophy className="w-12 h-12 text-green-600 animate-bounce" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Leaderboard</h1>
          <p className="text-gray-600">See how your family ranks against others worldwide</p>
        </div>

        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="leagues">League Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="space-y-4">
            {families.map((family) => (
              <Card 
                key={family.id} 
                className="hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {getRankIcon(family.rank!)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {family.family_name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {family.member_count} members
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-lg">{family.points}</span>
                      </div>
                      <Badge className={getLeagueColor(family.league)}>
                        {family.league}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leagues" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(leagueStats).map(([league, count]) => (
                <Card key={league}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      {league} League
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <p className="text-sm text-gray-600">families competing</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>League Promotion Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Bronze League</span>
                  <span className="text-sm text-gray-600">Starting league - 0-99 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Silver League</span>
                  <span className="text-sm text-gray-600">100-249 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Gold League</span>
                  <span className="text-sm text-gray-600">250-499 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Platinum League</span>
                  <span className="text-sm text-gray-600">500-749 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Titanium League</span>
                  <span className="text-sm text-gray-600">750-999 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                  <span className="font-medium">Diamond League</span>
                  <span className="text-sm text-gray-600">1000-1499 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Ruby League</span>
                  <span className="text-sm text-gray-600">1500-1999 points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                  <span className="font-medium">Wisdom League</span>
                  <span className="text-sm text-gray-600">2000+ points</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;