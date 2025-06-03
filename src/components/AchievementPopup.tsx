import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AchievementPopupProps {
  achievement: {
    name: string;
    description: string;
    colorClass: string;
  };
  onClose: () => void;
}

const AchievementPopup = ({ achievement, onClose }: AchievementPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className="w-80 shadow-lg border-2 border-green-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Achievement Unlocked!
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`p-3 rounded-lg ${achievement.colorClass} mb-2`}>
            <h3 className="font-semibold">{achievement.name}</h3>
            <p className="text-sm">{achievement.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementPopup;