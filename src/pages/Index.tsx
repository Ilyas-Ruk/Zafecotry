
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Users, Trophy, Camera } from "lucide-react";

const Index = () => {
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (familyName && email && memberCount) {
      // Store family data in localStorage for demo
      localStorage.setItem('familyData', JSON.stringify({
        familyName,
        email,
        memberCount: parseInt(memberCount),
        points: 0,
        league: 'Bronze',
        joinDate: new Date().toISOString()
      }));
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Green Family Challenge
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Unite your family in the ultimate sustainability challenge. Compete, contribute, and create a greener future together.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-green-100">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Family Competition</h3>
            <p className="text-gray-600 text-sm">Compete with families worldwide in sustainability leagues</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-green-100">
            <Camera className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Photo Verification</h3>
            <p className="text-gray-600 text-sm">Upload photos to prove your green actions and earn points</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-green-100">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Rewards & Recognition</h3>
            <p className="text-gray-600 text-sm">Climb leagues and earn rewards from local businesses</p>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Join the Challenge</CardTitle>
              <CardDescription>Register your family and start making a difference today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="familyName">Family Name</Label>
                <Input
                  id="familyName"
                  placeholder="The Johnson Family"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="family@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="members">Number of Family Members</Label>
                <Input
                  id="members"
                  type="number"
                  placeholder="4"
                  min="1"
                  value={memberCount}
                  onChange={(e) => setMemberCount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleSignUp}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                disabled={!familyName || !email || !memberCount}
              >
                Start Our Green Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
