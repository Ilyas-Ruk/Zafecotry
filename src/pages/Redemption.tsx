import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Tag, Store, Utensils, ShoppingBag } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useUserData } from "@/hooks/useUserData";
import { useToast } from "@/hooks/use-toast";

interface Voucher {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  value: number;
  category: 'restaurant' | 'supermarket' | 'retail';
  merchant: string;
  expiryDays: number;
  image: string;
}

const Redemption = () => {
  const { profile, loading } = useUserData();
  const { toast } = useToast();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  // Mock voucher data - in a real app, this would come from your backend
  const vouchers: Voucher[] = [
    {
      id: 'v1',
      title: 'Whole Foods Market',
      description: '$20 off your next purchase',
      pointsCost: 200,
      value: 20,
      category: 'supermarket',
      merchant: 'Whole Foods',
      expiryDays: 30,
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'
    },
    {
      id: 'v2',
      title: 'Green Earth Restaurant',
      description: '$30 dining voucher',
      pointsCost: 300,
      value: 30,
      category: 'restaurant',
      merchant: 'Green Earth',
      expiryDays: 60,
      image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg'
    },
    {
      id: 'v3',
      title: 'Eco Store',
      description: '$15 off sustainable products',
      pointsCost: 150,
      value: 15,
      category: 'retail',
      merchant: 'Eco Store',
      expiryDays: 45,
      image: 'https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg'
    },
    // Add more vouchers as needed
  ];

  const handleRedemption = async (voucher: Voucher) => {
    if (!profile) return;

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
      default:
        return <Gift className="w-4 h-4" />;
    }
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
                <p className="text-sm text-gray-600">Use your points to redeem vouchers</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-green-600">{profile.points}</span>
                <span className="text-gray-600 ml-2">pts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Rewards</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
            <TabsTrigger value="supermarket">Supermarkets</TabsTrigger>
            <TabsTrigger value="retail">Retail</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers.map((voucher) => (
                <Card key={voucher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={voucher.image} 
                      alt={voucher.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getCategoryIcon(voucher.category)}
                        {voucher.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {voucher.pointsCost} pts
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{voucher.title}</CardTitle>
                    <CardDescription>{voucher.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        <p>• Value: ${voucher.value}</p>
                        <p>• Valid for {voucher.expiryDays} days</p>
                        <p>• Redeemable at {voucher.merchant}</p>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        onClick={() => handleRedemption(voucher)}
                        disabled={profile.points < voucher.pointsCost}
                      >
                        {profile.points >= voucher.pointsCost ? (
                          <>
                            <Tag className="w-4 h-4 mr-2" />
                            Redeem Now
                          </>
                        ) : (
                          `Need ${voucher.pointsCost - profile.points} more points`
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurant">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers
                .filter(v => v.category === 'restaurant')
                .map(voucher => (
                  // Same card component as above
                  <Card key={voucher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Card content same as above */}
                  </Card>
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="supermarket">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers
                .filter(v => v.category === 'supermarket')
                .map(voucher => (
                  // Same card component as above
                  <Card key={voucher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Card content same as above */}
                  </Card>
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="retail">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vouchers
                .filter(v => v.category === 'retail')
                .map(voucher => (
                  // Same card component as above
                  <Card key={voucher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Card content same as above */}
                  </Card>
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