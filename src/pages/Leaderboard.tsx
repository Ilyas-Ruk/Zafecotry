
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Medal, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";

const Leaderboard = () => {
  const [familyData, setFamilyData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('familyData');
    if (data) {
      setFamilyData(JSON.parse(data));
    }
  }, []);

  // Mock leaderboard data - in a real app, this would come from a backend
  const leaderboardData = [
    { name: "The Green Warriors", points: 1850, league: "Platinum", members: 5, rank: 1 },
    { name: "Eco Champions", points: 1420, league: "Gold", members: 4, rank: 2 },
    { name: "Planet Savers", points: 1380, league: "Gold", members: 6, rank: 3 },
    { name: "The Johnson Family", points: familyData?.points || 0, league: familyData?.league || "Bronze", members: familyData?.memberCount || 4, rank: 15 },
    { name: "Green Dreamers", points: 890, league: "Silver", members: 3, rank: 4 },
    { name: "Earth Lovers", points: 780, league: "Silver", members: 5, rank: 5 },
    { name: "Sustainable Squad", points: 650, league: "Bronze", members: 4, rank: 6 },
    { name: "Climate Heroes", points: 580, league: "Bronze", members: 2, rank: 7 },
    { name: "Green Machine", points: 520, league: "Bronze", members: 6, rank: 8 },
    { name: "Eco Family", points: 450, league: "Bronze", members: 3, rank: 9 }
  ].sort((a, b) => b.points - a.points).map((family, index) => ({
    ...family,
    rank: index + 1
  }));

  const getLeagueColor = (league) => {
    switch(league) {
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-500" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
  };

  const leagueStats = {
    Bronze: leaderboardData.filter(f => f.league === 'Bronze').length,
    Silver: leaderboardData.filter(f => f.league === 'Silver').length,
    Gold: leaderboardData.filter(f => f.league === 'Gold').length,
    Platinum: leaderboardData.filter(f => f.league === 'Platinum').length,
  };

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
            {leaderboardData.map((family, index) => (
              <Card 
                key={family.name} 
                className={`transition-all duration-200 ${
                  family.name === familyData?.familyName 
                    ? 'ring-2 ring-green-500 bg-green-50/50' 
                    : 'hover:shadow-md'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10">
                        {getRankIcon(family.rank)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {family.name}
                          {family.name === familyData?.familyName && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {family.members} members
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
                  <span className="text-sm text-gray-600">100-499 points + small rewards</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Gold League</span>
                  <span className="text-sm text-gray-600">500-999 points + better rewards</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Platinum League</span>
                  <span className="text-sm text-gray-600">1000+ points + premium rewards</span>
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
