import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Trophy, User, Leaf, LogOut, Menu, Gift, BarChart3, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/local-companies', icon: MapPin, label: 'Local Partners' },
    { path: '/redemption', icon: Gift, label: 'Rewards' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  const publicNavItems = [
    { path: '/about', icon: Info, label: 'About Us' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-bold text-green-600">
            <Leaf className="w-5 h-5" />
            <span className="text-base md:text-xl">Green Family Challenge</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      location.pathname === item.path
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      location.pathname === item.path
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  Join Challenge
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[385px] p-0">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b">
                    <div className="flex items-center gap-2 font-bold text-green-600">
                      <Leaf className="w-5 h-5" />
                      <span className="text-lg">Green Family Challenge</span>
                    </div>
                  </div>
                  <div className="flex-1 py-4">
                    {user ? (
                      <>
                        {navItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors",
                              location.pathname === item.path
                                ? "bg-green-50 text-green-700"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                        {publicNavItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors",
                              location.pathname === item.path
                                ? "bg-green-50 text-green-700"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                          >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                          </Link>
                        ))}
                        <div className="px-6 py-4">
                          <Button
                            onClick={() => {
                              setIsOpen(false);
                              navigate('/auth');
                            }}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          >
                            Join Challenge
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  {user && (
                    <div className="p-6 border-t mt-auto">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-base font-medium text-gray-600"
                        onClick={() => {
                          setIsOpen(false);
                          handleSignOut();
                        }}
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;