
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Trophy, Camera, Sparkles, Award, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-300">Loading Zafeco...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(74,222,128,0.2),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative p-6 bg-gradient-to-br from-emerald-400/20 to-purple-400/20 rounded-3xl backdrop-blur-sm border border-white/10 animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-purple-400/30 rounded-3xl blur-xl"></div>
              <Sparkles className="w-16 h-16 text-emerald-400 relative z-10 animate-pulse" />
            </div>
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Zafeco
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Elevate your sustainable lifestyle. Join an exclusive community driving environmental excellence through innovative challenges and premium rewards.
          </p>
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover-scale">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-2xl mx-auto flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-2xl blur-xl mx-auto w-16 h-16 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">Global Excellence</h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Compete with elite families worldwide in prestigious sustainability leagues
            </p>
          </div>
          
          <div className="group text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover-scale">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl mx-auto flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-2xl blur-xl mx-auto w-16 h-16 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">Smart Verification</h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Advanced photo verification system with AI-powered impact tracking
            </p>
          </div>
          
          <div className="group text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover-scale">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-emerald-400/30 rounded-2xl blur-xl mx-auto w-16 h-16 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">Premium Rewards</h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Exclusive partnerships with luxury eco-brands and premium experiences
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-lg mx-auto animate-fade-in">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-purple-400/10"></div>
            <CardHeader className="text-center relative z-10 pt-8">
              <CardTitle className="text-3xl font-bold text-white mb-2">Begin Your Journey</CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Join the most sophisticated sustainability platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10 pb-8">
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Enter Zafeco
              </Button>
              <div className="text-center">
                <button
                  onClick={() => navigate('/auth')}
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 underline decoration-emerald-400/50 hover:decoration-emerald-400"
                >
                  Already a member? Sign in
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
