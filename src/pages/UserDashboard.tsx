
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock user data
const user = {
  name: "John Citizen",
  email: "john@example.com",
  avatar: "/placeholder.svg",
  points: 120,
  reportedProblems: 5,
  joinedDate: "2023-01-15",
};

// Mock problem reports data
const mockProblems = [
  {
    id: "INC-001",
    title: "Broken Streetlight",
    location: "123 Main Street, Downtown",
    date: "2023-11-01",
    status: "completed",
    points: 20,
  },
  {
    id: "INC-002",
    title: "Pothole on Road",
    location: "456 Oak Avenue, Westside",
    date: "2023-10-25",
    status: "in-progress",
    points: 15,
  },
  {
    id: "INC-003",
    title: "Graffiti on Wall",
    location: "789 Pine Street, Northside",
    date: "2023-10-15",
    status: "pending",
    points: 10,
  },
  {
    id: "INC-004",
    title: "Overflowing Trash Bin",
    location: "321 Elm Drive, Southside",
    date: "2023-10-05",
    status: "pending",
    points: 10,
  },
  {
    id: "INC-005",
    title: "Fallen Tree Branch",
    location: "654 Maple Road, Eastside",
    date: "2023-09-28",
    status: "completed",
    points: 25,
  },
];

// Mock vouchers data
const mockAvailableVouchers = [
  {
    id: "VCH-001",
    company: "Local Grocery Store",
    discount: "15% off on all items",
    expiryDate: "2023-12-31",
    pointsRequired: 50,
    code: null,
  },
  {
    id: "VCH-002",
    company: "City Cinema",
    discount: "Buy 1 Get 1 Free",
    expiryDate: "2023-12-15",
    pointsRequired: 40,
    code: null,
  },
  {
    id: "VCH-003",
    company: "Sunshine Cafe",
    discount: "Free Coffee with any Meal",
    expiryDate: "2023-12-20",
    pointsRequired: 25,
    code: null,
  },
  {
    id: "VCH-004",
    company: "Quick Repair Services",
    discount: "20% off on Home Repairs",
    expiryDate: "2023-12-25",
    pointsRequired: 60,
    code: null,
  },
  {
    id: "VCH-005",
    company: "Green Park Restaurant",
    discount: "10% off on Dinner Menu",
    expiryDate: "2023-12-31",
    pointsRequired: 35,
    code: null,
  },
];

const mockRedeemedVouchers = [
  {
    id: "VCH-006",
    company: "City Fitness Gym",
    discount: "1 Week Free Trial",
    redeemedDate: "2023-11-01",
    expiryDate: "2023-12-15",
    code: "FITWEEK123",
  },
  {
    id: "VCH-007",
    company: "Bookworm Store",
    discount: "Buy 2 Books Get 1 Free",
    redeemedDate: "2023-10-20",
    expiryDate: "2023-12-20",
    code: "BOOK3FOR2XYZ",
  },
];

const UserDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [availableVouchers, setAvailableVouchers] = useState(mockAvailableVouchers);
  const [redeemedVouchers, setRedeemedVouchers] = useState(mockRedeemedVouchers);
  const [userData, setUserData] = useState(user);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const redeemVoucher = (voucherId: string) => {
    const voucher = availableVouchers.find(v => v.id === voucherId);
    
    if (!voucher) {
      toast({
        title: "Error",
        description: "Voucher not found",
        variant: "destructive",
      });
      return;
    }
    
    if (userData.points < voucher.pointsRequired) {
      toast({
        title: "Insufficient Points",
        description: `You need ${voucher.pointsRequired} points to redeem this voucher`,
        variant: "destructive",
      });
      return;
    }
    
    // Generate a random voucher code
    const code = voucher.company.substring(0, 4).toUpperCase() + Math.floor(Math.random() * 10000);
    
    // Update user points
    setUserData({
      ...userData,
      points: userData.points - voucher.pointsRequired,
    });
    
    // Remove from available vouchers
    setAvailableVouchers(availableVouchers.filter(v => v.id !== voucherId));
    
    // Add to redeemed vouchers
    setRedeemedVouchers([
      {
        ...voucher,
        code,
        redeemedDate: new Date().toISOString().split("T")[0],
      },
      ...redeemedVouchers,
    ]);
    
    toast({
      title: "Voucher Redeemed",
      description: `You've successfully redeemed the ${voucher.company} voucher`,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Resident Dashboard</h1>
      <p className="text-muted-foreground mb-8">Track your reported problems and redeem rewards</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <CardDescription>Use to redeem vouchers</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.points} pts</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Reported Problems</CardTitle>
              <CardDescription>Total neighborhood issues</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProblems.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Solved Issues</CardTitle>
              <CardDescription>Problems marked as complete</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProblems.filter(p => p.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-sm font-medium">Redeemed Vouchers</CardTitle>
              <CardDescription>Rewards claimed</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{redeemedVouchers.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">{userData.name}</h3>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span>{new Date(userData.joinedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Points</span>
                <span className="font-medium">{userData.points} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reported Problems</span>
                <span>{userData.reportedProblems}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/report-incident" className="w-full">
              <Button className="w-full">Report New Problem</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="problems">My Reported Problems</TabsTrigger>
              <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back, {userData.name}!</CardTitle>
                  <CardDescription>
                    Here's a summary of your neighborhood contributions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Latest Reported Problems</h3>
                    <div className="space-y-2">
                      {mockProblems.slice(0, 3).map((problem) => (
                        <div key={problem.id} className="flex justify-between items-center p-3 border rounded-md">
                          <div>
                            <div className="font-medium">{problem.title}</div>
                            <div className="text-sm text-muted-foreground">{problem.location}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(problem.status)}
                            <span className="text-sm font-medium">+{problem.points} pts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("problems")}
                      >
                        View All Problems
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Available Vouchers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableVouchers.slice(0, 2).map((voucher) => (
                        <Card key={voucher.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{voucher.company}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm">{voucher.discount}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Expires: {new Date(voucher.expiryDate).toLocaleDateString()}
                            </p>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button 
                              size="sm" 
                              variant={userData.points >= voucher.pointsRequired ? "default" : "outline"}
                              disabled={userData.points < voucher.pointsRequired}
                              onClick={() => redeemVoucher(voucher.id)}
                              className="w-full"
                            >
                              Redeem for {voucher.pointsRequired} pts
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("vouchers")}
                      >
                        View All Vouchers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="problems">
              <Card>
                <CardHeader>
                  <CardTitle>My Reported Problems</CardTitle>
                  <CardDescription>
                    Track the status of problems you've reported in your neighborhood
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProblems.map((problem) => (
                      <div key={problem.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
                        <div className="mb-2 md:mb-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{problem.title}</span>
                            <span className="text-xs text-muted-foreground">({problem.id})</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{problem.location}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Reported: {new Date(problem.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusBadge(problem.status)}
                          <Badge variant="outline" className="bg-primary-foreground">
                            +{problem.points} pts
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link to="/report-incident">
                    <Button>Report New Problem</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="vouchers">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Vouchers</CardTitle>
                    <CardDescription>
                      Redeem your points for these neighborhood rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableVouchers.map((voucher) => (
                        <Card key={voucher.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{voucher.company}</CardTitle>
                            <CardDescription>{voucher.discount}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex justify-between text-sm">
                              <span>Required Points:</span>
                              <span className="font-medium">{voucher.pointsRequired} pts</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span>Expires:</span>
                              <span>{new Date(voucher.expiryDate).toLocaleDateString()}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <Button 
                              className="w-full"
                              disabled={userData.points < voucher.pointsRequired}
                              onClick={() => redeemVoucher(voucher.id)}
                            >
                              {userData.points >= voucher.pointsRequired 
                                ? "Redeem Now" 
                                : `Need ${voucher.pointsRequired - userData.points} more pts`}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Redeemed Vouchers</CardTitle>
                    <CardDescription>
                      Vouchers you've already claimed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {redeemedVouchers.map((voucher) => (
                        <Card key={voucher.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{voucher.company}</CardTitle>
                            <CardDescription>{voucher.discount}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="bg-muted p-2 rounded-md font-mono text-center mb-2">
                              {voucher.code}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Redeemed:</span>
                                <p>{new Date(voucher.redeemedDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Expires:</span>
                                <p>{new Date(voucher.expiryDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {redeemedVouchers.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        You haven't redeemed any vouchers yet
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
