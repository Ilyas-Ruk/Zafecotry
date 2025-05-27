
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Sparkles } from "lucide-react";

interface PromotionModalProps {
  promotionData: {
    oldLeague: string;
    newLeague: string;
  };
  onClose: () => void;
}

const PromotionModal = ({ promotionData, onClose }: PromotionModalProps) => {
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="w-16 h-16 text-yellow-500" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              <Star className="w-4 h-4 text-yellow-400 absolute -bottom-1 -left-1 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Congratulations! 🎉
          </CardTitle>
          <CardDescription className="text-base">
            You've been promoted to a new league!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Badge className={getLeagueColor(promotionData.oldLeague)}>
                {promotionData.oldLeague} League
              </Badge>
              <span className="text-2xl">→</span>
              <Badge className={getLeagueColor(promotionData.newLeague)}>
                {promotionData.newLeague} League
              </Badge>
            </div>
            <p className="text-gray-600">
              Keep up the great work! Your green actions are making a real difference.
            </p>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            Continue Your Green Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionModal;
