import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Users, 
  Target, 
  Award, 
  Heart,
  Globe,
  Lightbulb,
  Recycle,
  TreePine,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Star,
  CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      bio: "Environmental scientist turned tech entrepreneur, passionate about making sustainability accessible to families worldwide."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio: "Former Google engineer with 10+ years building scalable platforms. Believes technology can solve climate challenges."
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Sustainability",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      bio: "PhD in Environmental Science, former UN climate advisor. Expert in carbon footprint measurement and reduction strategies."
    },
    {
      name: "Alex Kim",
      role: "Head of Community",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      bio: "Community building expert who has helped scale environmental movements across 50+ countries."
    }
  ];

  const milestones = [
    { year: "2023", event: "Green Family Challenge founded", description: "Started with a vision to gamify sustainability" },
    { year: "2023", event: "First 1,000 families joined", description: "Early adopters from 15 countries" },
    { year: "2024", event: "100,000+ green actions completed", description: "Families worldwide taking climate action" },
    { year: "2024", event: "Partnership with local businesses", description: "Reward system launched in 25 cities" },
    { year: "2024", event: "1 million kg CO₂ saved", description: "Collective environmental impact milestone" }
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Impact",
      description: "Every small action contributes to a larger movement for planetary health."
    },
    {
      icon: Users,
      title: "Family First",
      description: "Strengthening family bonds while building sustainable habits together."
    },
    {
      icon: Target,
      title: "Measurable Results",
      description: "Transparent tracking of environmental impact and personal progress."
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Building a supportive network of eco-conscious families worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Green Family Challenge
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to make sustainability fun, accessible, and rewarding for families worldwide. 
            Together, we're building a greener future, one action at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-green-100 text-green-800 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              50,000+ Families
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              75+ Countries
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
              <Recycle className="w-4 h-4 mr-2" />
              1M+ Green Actions
            </Badge>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-green-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To empower families worldwide to take meaningful climate action through gamification, 
                community support, and tangible rewards. We believe that when families work together 
                towards sustainability goals, they create lasting habits that benefit both their 
                household and the planet.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                A world where every family is actively engaged in environmental stewardship, 
                where sustainable living is the norm, and where collective action creates 
                measurable positive impact on our planet's health and future generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <value.icon className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="font-semibold text-green-600">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Journey</h2>
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center bg-gradient-to-br from-green-100 to-emerald-100">
              <CardContent className="p-8">
                <TreePine className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-700 mb-2">1,000,000 kg</div>
                <p className="text-green-600 font-semibold">CO₂ Emissions Saved</p>
                <p className="text-sm text-gray-600 mt-2">Equivalent to planting 45,000 trees</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-blue-100 to-cyan-100">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-700 mb-2">50,000+</div>
                <p className="text-blue-600 font-semibold">Active Families</p>
                <p className="text-sm text-gray-600 mt-2">Across 75 countries worldwide</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-100 to-pink-100">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-700 mb-2">2,500,000</div>
                <p className="text-purple-600 font-semibold">Green Actions Completed</p>
                <p className="text-sm text-gray-600 mt-2">And counting every day</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We'd love to hear from you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <span>hello@greenfamilychallenge.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>+1 (555) 123-GREEN</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span>San Francisco, CA, USA</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Join Our Mission</CardTitle>
                <CardDescription>Ready to make a difference?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Whether you're a family looking to start your green journey, a business 
                  interested in partnerships, or an investor who shares our vision, we'd 
                  love to connect.
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Users className="w-4 h-4 mr-2" />
                    Join as a Family
                  </Button>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Business Partnerships
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Green Journey?</h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of families making a positive impact on our planet
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Star className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;