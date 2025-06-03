
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Trophy, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Family Competition",
      description: "Unite your family members and compete together in sustainability challenges"
    },
    {
      icon: Trophy,
      title: "League System",
      description: "Progress through Bronze, Silver, Gold, and higher leagues as you earn points"
    },
    {
      icon: TrendingUp,
      title: "Real Impact",
      description: "Track your environmental impact with measurable CO₂ savings and green actions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 font-bold text-green-600">
              <Leaf className="w-6 h-6" />
              <span className="text-xl">Zafeco</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-green-600 hover:bg-green-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-green-600 hover:bg-green-700">
                  Join Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Zafeco
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Unite your family in the ultimate sustainability challenge. Compete, contribute, and create a greener future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                View Rankings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Zafeco?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white shadow-sm border border-green-100">
                <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families already making an impact with Zafeco
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
                Join the Challenge Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
