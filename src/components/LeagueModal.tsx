
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Trophy } from "lucide-react";

interface LeagueModalProps {
  currentLeague: string;
  onClose: () => void;
}

const LeagueModal = ({ currentLeague, onClose }: LeagueModalProps) => {
  const leagues = [
    { name: 'Bronze', threshold: 0, color: 'bg-orange-100 text-orange-800' },
    { name: 'Silver', threshold: 100, color: 'bg-gray-100 text-gray-800' },
    { name: 'Gold', threshold: 250, color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Platinum', threshold: 500, color: 'bg-purple-100 text-purple-800' },
    { name: 'Titanium', threshold: 750, color: 'bg-blue-100 text-blue-800' },
    { name: 'Diamond', threshold: 1000, color: 'bg-cyan-100 text-cyan-800' },
    { name: 'Ruby', threshold: 1500, color: 'bg-red-100 text-red-800' },
    { name: 'Wisdom', threshold: 2000, color: 'bg-indigo-100 text-indigo-800' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                League System
              </CardTitle>
              <CardDescription>Progress through different leagues as you earn points</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {leagues.map((league, index) => (
            <div 
              key={league.name}
              className={`p-4 rounded-lg border-2 transition-all ${
                league.name === currentLeague 
                  ? 'border-green-300 bg-green-50 shadow-md' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-gray-400">
                    {index + 1}
                  </div>
                  <div>
                    <Badge className={league.color}>
                      {league.name} League
                    </Badge>
                    {league.name === currentLeague && (
                      <span className="ml-2 text-sm text-green-600 font-semibold">
                        Current League
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {league.threshold === 0 ? 'Starting league' : `${league.threshold}+ points`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeagueModal;
