import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Tag, Store, Utensils, ShoppingBag, Crown, Lock, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserData } from "@/hooks/useUserData";
import { useToast } from "@/hooks/use-toast";

interface Voucher {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  value: number;
  category: 'restaurant' | 'supermarket' | 'retail' | 'premium';
  merchant: string;
  expiryDays: number;
  image: string;
  requiredLeague?: string;
  isExclusive?: boolean;
}

const Redemption = () => {
  const { profile, loading } = useUserData();
  const { toast } = useToast();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  // Enhanced voucher data with league restrictions
  const vouchers: Voucher[] = [
    // Basic vouchers (available to all leagues)
    {
      id: 'v1',
      title: 'Local Grocery Store',
      description: '$10 off your next purchase',
      pointsCost: 100,
      value: 10,
      category: 'supermarket',
      merchant: 'Green Grocers',
      expiryDays: 30,
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'
    },
    {
      id: 'v2',
      title: 'Eco Cafe',
      description: '$15 dining voucher',
      pointsCost: 150,
      value: 15,
      category: 'restaurant',
      merchant: 'Eco Cafe',
      expiryDays: 45,
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg'
    },
    {
      id: 'v3',
      title: 'Sustainable Store',
      description: '$12 off eco-friendly products',
      pointsCost: 120,
      value: 12,
      category: 'retail',
      merchant: 'Green Living',
      expiryDays: 60,
      image: 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg'
    },
    
    // WISDOM LEAGUE EXCLUSIVE VOUCHERS
    {
      id: 'w1',
      title: 'Premium Organic Restaurant',
      description: '$100 fine dining experience',
      pointsCost: 800,
      value: 100,
      category: 'premium',
      merchant: 'Terra Verde Fine Dining',
      expiryDays: 90,
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      requiredLeague: 'Wisdom',
      isExclusive: true
    },
    {
      id: 'w2',
      title: 'Whole Foods Premium',
      description: '$75 premium organic groceries',
      pointsCost: 600,
      value: 75,
      category: 'premium',
      merchant: 'Whole Foods Market',
      expiryDays: 60,
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
      requiredLeague: 'Wisdom',
      isExclusive: true
    },
    {
      id: 'w3',
      title: 'Tesla Supercharger Credits',
      description: '$50 in charging credits',
      pointsCost: 500,
      value: 50,
      category: 'premium',
      merchant: 'Tesla',
      expiryDays: 120,
      image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg',
      requiredLeague: 'Wisdom',
      isExclusive: true
    },
    {
      id: 'w4',
      title: 'Patagonia Gear Voucher',
      description: '$150 sustainable outdoor gear',
      pointsCost: 1200,
      value: 150,
      category: 'premium',
      merchant: 'Patagonia',
      expiryDays: 180,
      image: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg',
      requiredLeague: 'Wisdom',
      isExclusive: true
    },
    {
      id: 'w5',
      title: 'Spa & Wellness Retreat',
      description: '$200 eco-luxury spa experience',
      pointsCost: 1500,
      value: 200,
      category: 'premium',
      merchant: 'Green Sanctuary Spa',
      expiryDays: 90,
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
      requiredLeague: 'Wisdom',
      isExclusive: true
    },
    {
      id: 'w6',
      title: 'Premium Solar Panel Consultation',
      description: 'Free $500 home solar assessment',
      pointsCost: 1000,
      value: 500,
      category: 'premium',
      merchant: 'SolarTech Solutions',
      expiryDays: 365,
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
      requiredLeague: 'Wisdom',
      isExclusive: true
    }
  ];

  const handleRedemption = async (voucher: Voucher) => {
    if (!profile) return;

    // Check league requirement
    if (voucher.requiredLeague && profile.league !== voucher.requiredLeague) {
      toast({
        title: "League Requirement Not Met",
        description: `This exclusive voucher is only available to ${voucher.requiredLeague} League members.`,
        variant: "destructive"
      });
      return;
    }

    if (profile.points < voucher.pointsCost) {
      toast({
        title: "Insufficient Points",
        description: `You need ${voucher.pointsCost - profile.points} more points to redeem this voucher.`,
        variant: "destructive"
      });
      return;
    }

    setSelectedVoucher(voucher);
    // This is where we'll integrate Stripe for payment processing
    toast({
      title: "Coming Soon!",
      description: "Voucher redemption will be available once Stripe is integrated.",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'supermarket':
        return <ShoppingBag className="w-4 h-4" />;
      case 'retail':
        return <Store className="w-4 h-4" />;
      case 'premium':
        return <Crown className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

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

  const canAccessVoucher = (voucher: Voucher) => {
    if (!voucher.requiredLeague) return true;
    return profile?.league === voucher.requiredLeague;
  };

  const VoucherCard = ({ voucher }: { voucher: Voucher }) => {
    const canAccess = canAccessVoucher(voucher);
    const hasEnoughPoints = profile && profile.points >= voucher.pointsCost;

    return (
      <Card className={`overflow-hidden transition-all duration-200 ${
        canAccess ? 'hover:shadow-lg' : 'opacity-60'
      } ${voucher.isExclusive ? 'ring-2 ring-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50' : ''}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={voucher.image} 
            alt={voucher.title}
            className={`w-full h-full object-cover ${!canAccess ? 'grayscale' : ''}`}
          />
          {voucher.isExclusive && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-indigo-600 text-white flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Wisdom Exclusive
              </Badge>
            </div>
          )}
          {!canAccess && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Wisdom League Required</p>
              </div>
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className={`flex items-center gap-1 ${
              voucher.category === 'premium' ? 'border-indigo-300 text-indigo-700' : ''
            }`}>
              {getCategoryIcon(voucher.category)}
              {voucher.category === 'premium' ? 'Premium' : voucher.category}
            </Badge>
            <Badge className={`${voucher.isExclusive ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
              {voucher.pointsCost} pts
            </Badge>
          </div>
          <CardTitle className="text-xl">{voucher.title}</CardTitle>
          <CardDescription>{voucher.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Value: ${voucher.value}
              </p>
              <p>• Valid for {voucher.expiryDays} days</p>
              <p>• Redeemable at {voucher.merchant}</p>
              {voucher.requiredLeague && (
                <p className="flex items-center gap-1 text-indigo-600 font-medium">
                  <Crown className="w-3 h-3" />
                  {voucher.requiredLeague} League Required
                </p>
              )}
            </div>
            <Button 
              className={`w-full ${
                voucher.isExclusive 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              }`}
              onClick={() => handleRedemption(voucher)}
              disabled={!canAccess || !hasEnoughPoints}
            >
              {!canAccess ? (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Wisdom League Required
                </>
              ) : hasEnoughPoints ? (
                <>
                  <Tag className="w-4 h-4 mr-2" />
                  Redeem Now
                </>
              ) : (
                `Need ${voucher.pointsCost - (profile?.points || 0)} more points`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading rewards...</p>
        </div>
      </div>
    );
  }

  const isWisdomLeague = profile.league === 'Wisdom';
  const wisdomVouchers = vouchers.filter(v => v.isExclusive);
  const regularVouchers = vouchers.filter(v => !v.isExclusive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Redeem Rewards</h1>
          <p className="text-gray-600">Turn your green points into eco-friendly rewards</p>
        </div>

        {/* Points Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Available Points</h2>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  Use your points to redeem vouchers
                  <Badge className={getLeagueColor(profile.league)}>
                    {profile.league} League
                  </Badge>
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-green-600">{profile.points}</span>
                <span className="text-gray-600 ml-2">pts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wisdom League Promotion */}
        {!isWisdomLeague && (
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                  <Crown className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    Unlock Wisdom League Exclusive Rewards!
                  </h3>
                  <p className="text-indigo-700 mb-3">
                    Reach 2000 points to access premium vouchers worth up to $500 from top eco-friendly brands.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-indigo-600">
                      Progress: {profile.points}/2000 points
                    </div>
                    <div className="flex-1 max-w-xs">
                      <div className="w-full bg-indigo-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((profile.points / 2000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Rewards</TabsTrigger>
            <TabsTrigger value="wisdom" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Wisdom Exclusive
            </TabsTrigger>
            <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
            <TabsTrigger value="supermarket">Supermarkets</TabsTrigger>
            <TabsTrigger value="retail">Retail</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {isWisdomLeague && wisdomVouchers.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-indigo-900">Wisdom League Exclusive</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {wisdomVouchers.map((voucher) => (
                    <VoucherCard key={voucher.id} voucher={voucher} />
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Regular Rewards</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularVouchers.map((voucher) => (
                  <VoucherCard key={voucher.id} voucher={voucher} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wisdom">
            <div className="space-y-6">
              {!isWisdomLeague ? (
                <Card className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50">
                  <Crown className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    Wisdom League Required
                  </h3>
                  <p className="text-indigo-700 mb-4">
                    Reach 2000 points to unlock these exclusive premium rewards
                  </p>
                  <Badge className="bg-indigo-100 text-indigo-800">
                    Current: {profile.points}/2000 points
                  </Badge>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wisdomVouchers.map((voucher) => (
                    <VoucherCard key={voucher.id} voucher={voucher} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="restaurant">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers
                .filter(v => v.category === 'restaurant')
                .map(voucher => (
                  <VoucherCard key={voucher.id} voucher={voucher} />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="supermarket">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers
                .filter(v => v.category === 'supermarket')
                .map(voucher => (
                  <VoucherCard key={voucher.id} voucher={voucher} />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="retail">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers
                .filter(v => v.category === 'retail')
                .map(voucher => (
                  <VoucherCard key={voucher.id} voucher={voucher} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Redemption;