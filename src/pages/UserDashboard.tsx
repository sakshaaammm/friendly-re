
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Voucher data
const voucherCompanies = [
  {
    id: 1,
    name: "Metropolis Coffee",
    logo: "/placeholder.svg",
    discount: "Buy 1 Get 1 Free",
    validUntil: "2023-12-31",
    status: "redeemed",
    redeemedOn: "2023-10-15",
  },
  {
    id: 2,
    name: "Hero's Pizza",
    logo: "/placeholder.svg",
    discount: "30% off any order",
    validUntil: "2023-12-15",
    status: "redeemed",
    redeemedOn: "2023-10-20",
  },
  {
    id: 3,
    name: "Super Fitness Gym",
    logo: "/placeholder.svg",
    discount: "Free 1-week pass",
    validUntil: "2023-11-30",
    status: "redeemed",
    redeemedOn: "2023-10-05",
  },
  {
    id: 4,
    name: "Gotham Bookstore",
    logo: "/placeholder.svg",
    discount: "50% off bestsellers",
    validUntil: "2023-12-10",
    status: "redeemed",
    redeemedOn: "2023-09-28",
  },
  {
    id: 5,
    name: "Stark Electronics",
    logo: "/placeholder.svg",
    discount: "15% off all gadgets",
    validUntil: "2023-12-25",
    status: "redeemed",
    redeemedOn: "2023-10-12",
  },
  {
    id: 6,
    name: "Wayne Enterprises",
    logo: "/placeholder.svg",
    discount: "Free tour of facilities",
    validUntil: "2023-11-15", 
    status: "redeemed",
    redeemedOn: "2023-10-01",
  },
  {
    id: 7,
    name: "Daily Planet News",
    logo: "/placeholder.svg",
    discount: "3 months free subscription",
    validUntil: "2023-12-20",
    status: "redeemed",
    redeemedOn: "2023-09-15",
  },
  {
    id: 8,
    name: "Krypton Fitness",
    logo: "/placeholder.svg",
    discount: "25% off annual membership",
    validUntil: "2023-12-05",
    status: "redeemed",
    redeemedOn: "2023-10-10",
  },
  {
    id: 9,
    name: "Atlantis Spa",
    logo: "/placeholder.svg",
    discount: "Complimentary treatment",
    validUntil: "2023-11-25",
    status: "redeemed",
    redeemedOn: "2023-09-20",
  },
  {
    id: 10,
    name: "Wakanda Tours",
    logo: "/placeholder.svg",
    discount: "20% off adventure packages",
    validUntil: "2023-12-15",
    status: "redeemed",
    redeemedOn: "2023-10-25",
  }
];

// Recent incidents data
const recentIncidents = [
  {
    id: "INC-001",
    title: "Robbery at Central Bank",
    date: "2023-11-01",
    status: "resolved",
    assignedHero: "Captain Shield",
  },
  {
    id: "INC-004",
    title: "Suspicious Package",
    date: "2023-11-04",
    status: "in-progress",
    assignedHero: "Night Watcher",
  }
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        View your reported incidents and redeemed vouchers
      </p>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">My Incidents</TabsTrigger>
          <TabsTrigger value="vouchers">Redeemed Vouchers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">My Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{recentIncidents.length}</p>
                <p className="text-sm text-muted-foreground">Total reported incidents</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("incidents")}>
                  View All
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Redeemed Vouchers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{voucherCompanies.length}</p>
                <p className="text-sm text-muted-foreground">Rewards for community service</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("vouchers")}>
                  View All
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full">
                  <Link to="/report-incident">Report New Incident</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <p className="font-medium">{incident.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(incident.date).toLocaleDateString()} • {incident.id}
                      </p>
                    </div>
                    <Badge
                      variant={incident.status === "resolved" ? "default" : "secondary"}
                    >
                      {incident.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>My Reported Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              {recentIncidents.length > 0 ? (
                <div className="divide-y">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="py-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{incident.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Reported on {new Date(incident.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={incident.status === "resolved" ? "default" : "secondary"}
                        >
                          {incident.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm font-medium">Assigned To</p>
                          <p className="text-sm text-muted-foreground">{incident.assignedHero}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reference Number</p>
                          <p className="text-sm text-muted-foreground">{incident.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground mb-4">You haven't reported any incidents yet</p>
                  <Button asChild>
                    <Link to="/report-incident">Report an Incident</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vouchers">
          <Card>
            <CardHeader>
              <CardTitle>Redeemed Vouchers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {voucherCompanies.map((voucher) => (
                  <Card key={voucher.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{voucher.name}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Redeemed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-muted rounded-full overflow-hidden mr-3 flex items-center justify-center">
                          <img
                            src={voucher.logo}
                            alt={voucher.name}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{voucher.discount}</p>
                          <p className="text-xs text-muted-foreground">
                            Valid until {new Date(voucher.validUntil).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Redeemed on {new Date(voucher.redeemedOn).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
