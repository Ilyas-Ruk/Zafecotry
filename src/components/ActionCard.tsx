
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

interface ActionCardProps {
  action: {
    id: string;
    icon: React.ComponentType<any>;
    title: string;
    points: number;
    description: string;
    requiresPhoto?: boolean;
  };
  onClick: () => void;
}

const ActionCard = ({ action, onClick }: ActionCardProps) => {
  const Icon = action.icon;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
            <Icon className="w-6 h-6 text-green-600" />
          </div>
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            +{action.points} pts
          </Badge>
        </div>
        <CardTitle className="text-lg">{action.title}</CardTitle>
        <CardDescription className="text-sm">{action.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={onClick}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          {action.requiresPhoto && (
            <Camera className="w-4 h-4 mr-2" />
          )}
          {action.requiresPhoto ? 'Upload Photo' : 'Complete Action'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
