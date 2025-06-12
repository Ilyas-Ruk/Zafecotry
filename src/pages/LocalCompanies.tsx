import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Bus, 
  Heart, 
  Recycle, 
  Leaf, 
  Phone, 
  Globe, 
  Star,
  ExternalLink,
  Award,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserData } from "@/hooks/useUserData";

interface LocalCompany {
  id: string;
  name: string;
  category: 'transport' | 'charity' | 'recycling' | 'energy' | 'food';
  description: string;
  location: string;
  phone?: string;
  website?: string;
  rating: number;
  pointsReward: number;
  verificationRequired: boolean;
  image: string;
  specialOffer?: string;
  operatingHours?: string;
  certifications?: string[];
}

interface CountryData {
  [key: string]: {
    name: string;
    flag: string;
    companies: LocalCompany[];
  };
}

const LocalCompanies = () => {
  const { profile, loading } = useUserData();
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for different countries with local companies
  const countryData: CountryData = {
    US: {
      name: "United States",
      flag: "🇺🇸",
      companies: [
        {
          id: "us1",
          name: "Metro Transit Authority",
          category: "transport",
          description: "Public bus and rail transportation across the city",
          location: "New York, NY",
          phone: "+1-212-555-0123",
          website: "https://mta.info",
          rating: 4.2,
          pointsReward: 15,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg",
          specialOffer: "Free weekend passes for families with 500+ points",
          operatingHours: "5:00 AM - 12:00 AM",
          certifications: ["Green Transit Certified", "EPA Partner"]
        },
        {
          id: "us2",
          name: "Green Earth Recycling",
          category: "recycling",
          description: "Electronics and hazardous waste recycling center",
          location: "San Francisco, CA",
          phone: "+1-415-555-0456",
          website: "https://greenearthrecycling.com",
          rating: 4.8,
          pointsReward: 25,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
          specialOffer: "Double points for electronics recycling",
          operatingHours: "8:00 AM - 6:00 PM",
          certifications: ["R2 Certified", "ISO 14001"]
        },
        {
          id: "us3",
          name: "Local Food Bank Network",
          category: "charity",
          description: "Community food assistance and volunteer opportunities",
          location: "Chicago, IL",
          phone: "+1-312-555-0789",
          website: "https://chicagofoodbank.org",
          rating: 4.9,
          pointsReward: 30,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
          specialOffer: "Volunteer appreciation events for active families",
          operatingHours: "9:00 AM - 5:00 PM",
          certifications: ["Charity Navigator 4-Star", "GuideStar Gold"]
        },
        {
          id: "us4",
          name: "SolarCity Community",
          category: "energy",
          description: "Residential solar panel installation and maintenance",
          location: "Austin, TX",
          phone: "+1-512-555-0321",
          website: "https://solarcity.com",
          rating: 4.5,
          pointsReward: 50,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg",
          specialOffer: "Free energy audit for Green Challenge families",
          operatingHours: "8:00 AM - 7:00 PM",
          certifications: ["NABCEP Certified", "Energy Star Partner"]
        }
      ]
    },
    UK: {
      name: "United Kingdom",
      flag: "🇬🇧",
      companies: [
        {
          id: "uk1",
          name: "Transport for London",
          category: "transport",
          description: "London's integrated public transport network",
          location: "London, England",
          phone: "+44-20-7222-1234",
          website: "https://tfl.gov.uk",
          rating: 4.3,
          pointsReward: 12,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
          specialOffer: "Oyster card discounts for eco-families",
          operatingHours: "24/7 Service",
          certifications: ["Carbon Trust Standard", "ISO 50001"]
        },
        {
          id: "uk2",
          name: "Veolia UK Recycling",
          category: "recycling",
          description: "Comprehensive waste management and recycling services",
          location: "Manchester, England",
          phone: "+44-161-555-0123",
          website: "https://veolia.co.uk",
          rating: 4.1,
          pointsReward: 20,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
          specialOffer: "Free collection for large recyclable items",
          operatingHours: "7:00 AM - 6:00 PM",
          certifications: ["WAMITAB Approved", "Environment Agency Licensed"]
        },
        {
          id: "uk3",
          name: "Oxfam Community Hub",
          category: "charity",
          description: "Fighting poverty through community action and donations",
          location: "Birmingham, England",
          phone: "+44-121-555-0456",
          website: "https://oxfam.org.uk",
          rating: 4.7,
          pointsReward: 25,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
          specialOffer: "Recognition program for regular volunteers",
          operatingHours: "9:00 AM - 5:30 PM",
          certifications: ["Charity Commission Registered", "Fundraising Regulator"]
        }
      ]
    },
    CA: {
      name: "Canada",
      flag: "🇨🇦",
      companies: [
        {
          id: "ca1",
          name: "Toronto Transit Commission",
          category: "transport",
          description: "Public transit serving the Greater Toronto Area",
          location: "Toronto, ON",
          phone: "+1-416-555-0123",
          website: "https://ttc.ca",
          rating: 4.0,
          pointsReward: 14,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg",
          specialOffer: "Family transit passes at reduced rates",
          operatingHours: "5:00 AM - 1:30 AM",
          certifications: ["Green Transit Leader", "CUTA Member"]
        },
        {
          id: "ca2",
          name: "Recycle BC",
          category: "recycling",
          description: "Province-wide recycling program for packaging and paper",
          location: "Vancouver, BC",
          phone: "+1-604-555-0789",
          website: "https://recyclebc.ca",
          rating: 4.6,
          pointsReward: 18,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
          specialOffer: "Educational workshops for families",
          operatingHours: "8:00 AM - 5:00 PM",
          certifications: ["Extended Producer Responsibility", "CSA Certified"]
        }
      ]
    },
    AU: {
      name: "Australia",
      flag: "🇦🇺",
      companies: [
        {
          id: "au1",
          name: "Sydney Trains",
          category: "transport",
          description: "Electric train network serving Greater Sydney",
          location: "Sydney, NSW",
          phone: "+61-2-555-0123",
          website: "https://sydneytrains.info",
          rating: 4.1,
          pointsReward: 16,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg",
          specialOffer: "Opal card benefits for eco-conscious families",
          operatingHours: "4:30 AM - 1:00 AM",
          certifications: ["Green Building Council", "Carbon Neutral"]
        },
        {
          id: "au2",
          name: "Planet Ark Recycling",
          category: "recycling",
          description: "National recycling programs and environmental education",
          location: "Melbourne, VIC",
          phone: "+61-3-555-0456",
          website: "https://planetark.org",
          rating: 4.8,
          pointsReward: 22,
          verificationRequired: true,
          image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
          specialOffer: "Free recycling guides and workshops",
          operatingHours: "9:00 AM - 5:00 PM",
          certifications: ["Australian Environmental Foundation", "Recycling Industry"]
        }
      ]
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return <Bus className="w-5 h-5" />;
      case 'charity':
        return <Heart className="w-5 h-5" />;
      case 'recycling':
        return <Recycle className="w-5 h-5" />;
      case 'energy':
        return <Leaf className="w-5 h-5" />;
      case 'food':
        return <Users className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-blue-100 text-blue-800';
      case 'charity':
        return 'bg-red-100 text-red-800';
      case 'recycling':
        return 'bg-green-100 text-green-800';
      case 'energy':
        return 'bg-yellow-100 text-yellow-800';
      case 'food':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCompanies = selectedCategory === "all" 
    ? countryData[selectedCountry]?.companies || []
    : countryData[selectedCountry]?.companies.filter(company => company.category === selectedCategory) || [];

  const CompanyCard = ({ company }: { company: LocalCompany }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={company.image} 
          alt={company.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={getCategoryColor(company.category)}>
            <div className="flex items-center gap-1">
              {getCategoryIcon(company.category)}
              {company.category}
            </div>
          </Badge>
        </div>
        {company.specialOffer && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-orange-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Special Offer
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-xl">{company.name}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{company.rating}</span>
          </div>
        </div>
        <CardDescription>{company.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            {company.location}
          </div>
          {company.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              {company.phone}
            </div>
          )}
          {company.operatingHours && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {company.operatingHours}
            </div>
          )}
        </div>

        {company.specialOffer && (
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 font-medium">{company.specialOffer}</p>
          </div>
        )}

        {company.certifications && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Certifications:</p>
            <div className="flex flex-wrap gap-1">
              {company.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800">
              +{company.pointsReward} points
            </Badge>
            {company.verificationRequired && (
              <Badge variant="outline" className="text-xs">
                Photo Required
              </Badge>
            )}
          </div>
          {company.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                Visit
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading local companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Local Green Partners</h1>
          <p className="text-gray-600">Connect with eco-friendly companies in your area and earn points</p>
        </div>

        {/* Country and Category Selection */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(countryData).map(([code, country]) => (
                  <SelectItem key={code} value={code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      {country.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="transport">Public Transport</SelectItem>
                <SelectItem value="charity">Charity & Volunteering</SelectItem>
                <SelectItem value="recycling">Recycling Centers</SelectItem>
                <SelectItem value="energy">Renewable Energy</SelectItem>
                <SelectItem value="food">Sustainable Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Country Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{countryData[selectedCountry]?.flag}</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {countryData[selectedCountry]?.name}
                </h2>
                <p className="text-gray-600">
                  {filteredCompanies.length} green companies available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="text-center p-8">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or country to see available green partners.
            </p>
          </Card>
        )}

        {/* How it Works */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How to Earn Points with Local Partners</CardTitle>
            <CardDescription>Follow these steps to start earning points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose a Partner</h3>
                <p className="text-sm text-gray-600">Select a local green company from the list</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Take Action</h3>
                <p className="text-sm text-gray-600">Use their services or volunteer with them</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Upload Proof</h3>
                <p className="text-sm text-gray-600">Take a photo and earn your points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocalCompanies;