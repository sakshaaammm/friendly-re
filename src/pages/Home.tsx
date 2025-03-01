
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroes from "@/data/heroes";

export default function Home() {
  // Filter active heroes
  const activeHeroes = heroes.filter((hero) => hero.isActive);
  // Get top 3 heroes by rating
  const topHeroes = [...heroes].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-secondary/20 py-20 md:py-28">
        <div className="container px-4 mx-auto text-center">
          <div className="hero-animation max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Tracking Heroes in Your Neighborhood
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover, support, and connect with local heroes making a
              difference in your community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="font-semibold"
              >
                <Link to="/dashboard">View Heroes</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="font-semibold"
              >
                <Link to="/contact">Report Incident</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 hidden md:block">
            <div className="relative">
              <div className="absolute -top-8 -left-8 bg-primary/10 rounded-full w-64 h-64 rotate-animation blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 bg-primary/10 rounded-full w-64 h-64 rotate-animation blur-3xl"></div>
              <div className="grid grid-cols-3 gap-4 relative">
                {topHeroes.map((hero) => (
                  <div
                    key={hero.id}
                    className="rounded-lg overflow-hidden hero-card bg-card shadow-lg"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={hero.image}
                        alt={hero.name}
                        className="w-full h-full object-cover hero-image"
                      />
                    </div>
                    <div className="p-4">
                      <Link to={`/hero/${hero.id}`}>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                          {hero.alias || hero.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {hero.neighborhood}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {heroes.length}
              </div>
              <div className="text-muted-foreground">Registered Heroes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {activeHeroes.length}
              </div>
              <div className="text-muted-foreground">Active Heroes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {heroes.reduce((total, hero) => total + hero.rescues, 0)}
              </div>
              <div className="text-muted-foreground">Total Rescues</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {(
                  heroes.reduce(
                    (total, hero) => total + hero.responseTime,
                    0
                  ) / heroes.length
                ).toFixed(1)}m
              </div>
              <div className="text-muted-foreground">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Our platform makes it easy to find, track, and connect with heroes
              in your neighborhood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover-effect">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Heroes</h3>
                <p className="text-muted-foreground">
                  Discover heroes operating in your neighborhood with our
                  comprehensive database and filtering tools.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="M12 12v3" />
                    <path d="M12 9h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Report Incidents</h3>
                <p className="text-muted-foreground">
                  Easily report situations that require hero assistance, from
                  emergencies to community support needs.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary h-6 w-6"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Heroes</h3>
                <p className="text-muted-foreground">
                  Contribute to hero initiatives, provide testimonials, and help
                  sustain their valuable work in the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Be part of a growing network of hero supporters helping make our
              neighborhoods safer and stronger.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Get Involved</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
