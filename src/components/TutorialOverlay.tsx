
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Trophy, Camera, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface TutorialOverlayProps {
  onComplete: () => void;
}

const TutorialOverlay = ({ onComplete }: TutorialOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();

  const tutorialSteps = [
    {
      title: "Welcome to Green Family Challenge! 🌱",
      description: "Let's take a quick tour to get you started on your sustainable journey.",
      highlight: null,
      icon: Users
    },
    {
      title: "Green Actions",
      description: "Complete eco-friendly activities like recycling, water reuse, and planting to earn points. Each action requires photo proof!",
      highlight: "green-actions",
      icon: Camera
    },
    {
      title: "Points & Leagues",
      description: "Earn points for every green action. As you accumulate points, you'll advance through different leagues from Bronze to Wisdom!",
      highlight: "points-section",
      icon: Trophy
    },
    {
      title: "Track Your Progress",
      description: "Monitor your weekly activity, achievements, and environmental impact in the Progress tab.",
      highlight: "progress-tab",
      icon: Trophy
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    if (user) {
      await supabase
        .from('user_tutorials')
        .update({ 
          tutorial_completed: true, 
          completed_at: new Date().toISOString() 
        })
        .eq('user_id', user.id);
    }
    onComplete();
  };

  const currentStepData = tutorialSteps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                <CardDescription className="text-xs">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleComplete}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{currentStepData.description}</p>
          
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {currentStep === tutorialSteps.length - 1 ? "Get Started!" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="flex gap-1 justify-center">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialOverlay;
