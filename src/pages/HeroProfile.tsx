
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import heroes, { Hero } from "@/data/heroes";

export default function HeroProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the hero by ID
  const hero = heroes.find((h) => h.id === Number(id));
  
  if (!hero) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Hero Not Found</h1>
        <p className="mb-8">The hero you're looking for doesn't exist or may have been removed.</p>
        <Button asChild>
          <Link to="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/dashboard" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="aspect-square overflow-hidden">
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{hero.alias || hero.name}</CardTitle>
                  <p className="text-muted-foreground">{hero.name}</p>
                </div>
                <Badge variant={hero.isActive ? "default" : "secondary"}>
                  {hero.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Powers</h3>
                  <div className="flex flex-wrap gap-2">
                    {hero.powers.map((power, index) => (
                      <Badge key={index} variant="outline">
                        {power}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-muted-foreground">{hero.neighborhood}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Coverage Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {hero.coverage.map((area, index) => (
                      <Badge key={index} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Contact</h3>
                  {hero.contact?.email && (
                    <p className="text-sm text-muted-foreground mb-1">
                      Email: {hero.contact.email}
                    </p>
                  )}
                  {hero.contact?.phone && (
                    <p className="text-sm text-muted-foreground mb-1">
                      Phone: {hero.contact.phone}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {hero.contact?.social?.twitter && (
                      <a
                        href={`https://twitter.com/${hero.contact.social.twitter.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </a>
                    )}
                    {hero.contact?.social?.instagram && (
                      <a
                        href={`https://instagram.com/${hero.contact.social.instagram.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <rect
                            width="20"
                            height="20"
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                          />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{hero.bio}</p>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Performance Metrics</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Activity</span>
                            <span className="text-sm font-medium">{hero.activity}%</span>
                          </div>
                          <Progress value={hero.activity} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Response Time</span>
                            <span className="text-sm font-medium">{hero.responseTime}m</span>
                          </div>
                          <Progress 
                            value={100 - (hero.responseTime * 5)} 
                            className="h-2" 
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Rating</span>
                            <span className="text-sm font-medium">{hero.rating}/5</span>
                          </div>
                          <Progress value={hero.rating * 20} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Key Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Rescues</span>
                          <span className="font-medium">{hero.rescues}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Active</span>
                          <span className="font-medium">
                            {new Date(hero.lastActive).toLocaleDateString()}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Coverage Areas</span>
                          <span className="font-medium">{hero.coverage.length}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Powers</span>
                          <span className="font-medium">{hero.powers.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <Button>Request Assistance</Button>
                <Button variant="outline" className="ml-2">Contact Hero</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Strength</span>
                          <span className="text-sm font-medium">{hero.stats.strength}/100</span>
                        </div>
                        <Progress value={hero.stats.strength} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Speed</span>
                          <span className="text-sm font-medium">{hero.stats.speed}/100</span>
                        </div>
                        <Progress value={hero.stats.speed} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Intelligence</span>
                          <span className="text-sm font-medium">{hero.stats.intelligence}/100</span>
                        </div>
                        <Progress value={hero.stats.intelligence} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Durability</span>
                          <span className="text-sm font-medium">{hero.stats.durability}/100</span>
                        </div>
                        <Progress value={hero.stats.durability} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Energy</span>
                          <span className="text-sm font-medium">{hero.stats.energy}/100</span>
                        </div>
                        <Progress value={hero.stats.energy} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Fighting</span>
                          <span className="text-sm font-medium">{hero.stats.fighting}/100</span>
                        </div>
                        <Progress value={hero.stats.fighting} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="incidents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  {hero.incidents.length > 0 ? (
                    <div className="space-y-6">
                      {hero.incidents.map((incident) => (
                        <div key={incident.id} className="border-b pb-4 last:border-0">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{incident.title}</h3>
                            <Badge variant={incident.resolved ? "default" : "secondary"}>
                              {incident.resolved ? "Resolved" : "Ongoing"}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {incident.description}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {new Date(incident.date).toLocaleDateString()}
                            </span>
                            <Badge variant="outline">{incident.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium">Location:</span> {incident.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No incidents recorded yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
