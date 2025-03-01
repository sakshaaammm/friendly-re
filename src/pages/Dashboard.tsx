
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import heroes from "@/data/heroes";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [neighborhood, setNeighborhood] = useState("all");
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique neighborhoods for the filter
  const neighborhoods = Array.from(
    new Set(heroes.map((hero) => hero.neighborhood))
  );

  // Filter heroes based on search, neighborhood, rating, and active status
  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch =
      hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hero.alias?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesNeighborhood = 
      neighborhood === "all" || hero.neighborhood === neighborhood;
    
    const matchesRating = hero.rating >= ratingFilter[0] / 20;
    
    const matchesActive = 
      activeFilter === "all" || 
      (activeFilter === "active" && hero.isActive) || 
      (activeFilter === "inactive" && !hero.isActive);
    
    return matchesSearch && matchesNeighborhood && matchesRating && matchesActive;
  });

  return (
    <div className="container py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Hero Dashboard</h1>
        <p className="text-muted-foreground">
          Track and monitor heroes in your neighborhood
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Hero Finder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Search by name or alias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select
                    value={neighborhood}
                    onValueChange={(value) => setNeighborhood(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select neighborhood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Neighborhoods</SelectItem>
                      {neighborhoods.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={activeFilter}
                    onValueChange={(value) => setActiveFilter(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Rating: {(ratingFilter[0] / 20).toFixed(1)}
                </label>
                <Slider
                  value={ratingFilter}
                  max={100}
                  step={5}
                  onValueChange={setRatingFilter}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grid" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredHeroes.length} of {heroes.length} heroes
          </div>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="table">Table</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredHeroes.map((hero) => (
              <Card key={hero.id} className="overflow-hidden hero-card">
                <div className="h-48 overflow-hidden">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover hero-image"
                  />
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        <Link
                          to={`/hero/${hero.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {hero.alias || hero.name}
                        </Link>
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {hero.neighborhood}
                      </p>
                    </div>
                    <Badge
                      variant={hero.isActive ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {hero.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid gap-2">
                    <div className="flex justify-between text-sm">
                      <span>Rating</span>
                      <span className="font-medium">{hero.rating}/5</span>
                    </div>
                    <Progress value={hero.rating * 20} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Response Time</span>
                      <span className="font-medium">{hero.responseTime}m</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rescues</span>
                      <span className="font-medium">{hero.rescues}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex gap-2 flex-wrap">
                    {hero.powers.slice(0, 2).map((power, index) => (
                      <Badge variant="outline" key={index}>
                        {power}
                      </Badge>
                    ))}
                    {hero.powers.length > 2 && (
                      <Badge variant="outline">+{hero.powers.length - 2}</Badge>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredHeroes.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">
                  No heroes match your search criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <div className="rounded-md border">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Neighborhood
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Rating
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Response Time
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Rescues
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Last Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHeroes.map((hero) => (
                      <tr
                        key={hero.id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td className="p-4 align-middle">
                          <Link
                            to={`/hero/${hero.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {hero.alias || hero.name}
                          </Link>
                        </td>
                        <td className="p-4 align-middle">
                          {hero.neighborhood}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={hero.isActive ? "default" : "secondary"}
                          >
                            {hero.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{hero.rating}/5</td>
                        <td className="p-4 align-middle">
                          {hero.responseTime}m
                        </td>
                        <td className="p-4 align-middle">{hero.rescues}</td>
                        <td className="p-4 align-middle">
                          {new Date(hero.lastActive).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredHeroes.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">
                      No heroes match your search criteria. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
