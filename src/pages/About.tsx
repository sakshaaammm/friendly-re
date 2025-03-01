
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function About() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Hero Tracker</h1>
        <p className="text-muted-foreground text-lg">
          Learn about our mission to connect communities with their local heroes.
        </p>
      </div>

      <Tabs defaultValue="mission" className="max-w-3xl mx-auto mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mission">Our Mission</TabsTrigger>
          <TabsTrigger value="story">Our Story</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
        </TabsList>
        <TabsContent value="mission" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p>
                  At Hero Tracker, our mission is to create safer, more connected
                  communities by facilitating relationships between local heroes
                  and the neighborhoods they serve.
                </p>
                <p>
                  We believe that recognizing and supporting heroic individuals
                  who contribute to community safety and well-being is essential
                  for building resilient societies. By providing a platform that
                  makes heroes more accessible and accountable, we aim to:
                </p>
                <ul className="my-4 space-y-2">
                  <li>
                    Increase community awareness of local heroes and their
                    capabilities
                  </li>
                  <li>
                    Provide transparent tracking of hero activities and
                    effectiveness
                  </li>
                  <li>
                    Create efficient channels for requesting hero assistance
                    during emergencies
                  </li>
                  <li>
                    Facilitate community support for heroes through various
                    contribution mechanisms
                  </li>
                  <li>
                    Build a data-driven approach to optimizing hero coverage and
                    response
                  </li>
                </ul>
                <p>
                  Our ultimate goal is to ensure that every neighborhood has
                  access to reliable hero support, and that heroes receive the
                  recognition and resources they need to continue their important
                  work.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="story" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p>
                  Hero Tracker began in 2020 during a time when communities
                  needed heroes more than ever. Our founder, Dr. Emily
                  Chen, witnessed firsthand how local heroes were making
                  extraordinary differences in neighborhoods hit hard by
                  multiple crises.
                </p>
                <p>
                  The idea was simple: create a transparent system that helps
                  communities locate, evaluate, and support heroes, while giving
                  heroes the visibility and resources they need to maximize their
                  impact.
                </p>
                <p>
                  What started as a small database of neighborhood heroes in one
                  city has grown into a comprehensive platform with plans to
                  expand nationwide. We've helped coordinate thousands of hero
                  interventions, from everyday assistance to crisis response.
                </p>
                <blockquote className="border-l-4 pl-4 italic my-4">
                  "Heroes exist in every community, often working without
                  recognition or support. Our platform aims to change that by
                  making heroism visible, accountable, and sustainable."
                  <footer className="text-right">— Dr. Emily Chen, Founder</footer>
                </blockquote>
                <p>
                  As we grow, we remain committed to our core values of
                  transparency, community empowerment, and hero support. We
                  believe that by strengthening the connection between heroes and
                  communities, we can build a safer, more resilient society for
                  everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
                <p>
                  Hero Tracker is made possible by a dedicated team of
                  technologists, community organizers, and former heroes who
                  believe in the power of community-hero collaboration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Dr. Emily Chen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Dr. Emily Chen</h3>
                    <p className="text-muted-foreground">Founder & CEO</p>
                    <p className="mt-2 text-sm">
                      Former emergency response coordinator with a PhD in
                      Community Resilience
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
                        alt="Marcus Johnson"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Marcus Johnson</h3>
                    <p className="text-muted-foreground">CTO</p>
                    <p className="mt-2 text-sm">
                      Full-stack developer and former cybersecurity expert
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80"
                        alt="Sofia Rodriguez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Sofia Rodriguez</h3>
                    <p className="text-muted-foreground">Community Director</p>
                    <p className="mt-2 text-sm">
                      Community organizer with expertise in public-private
                      partnerships
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2834&q=80"
                        alt="David Kim"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">David Kim</h3>
                    <p className="text-muted-foreground">Hero Liaison</p>
                    <p className="mt-2 text-sm">
                      Former hero with 10+ years of experience in crisis response
                    </p>
                  </div>
                </div>

                <p>
                  Our team is supported by a diverse advisory board of community
                  leaders, security experts, and active heroes who provide
                  guidance on platform development and ethical considerations.
                </p>
                <p>
                  We're always looking for passionate individuals to join our
                  mission. Visit our careers page to learn about current
                  opportunities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/50 rounded-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
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
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Transparency</h3>
            <p className="text-muted-foreground text-sm">
              We believe in open, honest reporting of hero activities and
              effectiveness.
            </p>
          </div>

          <div>
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
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
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground text-sm">
              We empower communities to take an active role in hero support and
              oversight.
            </p>
          </div>

          <div>
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
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
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Safety</h3>
            <p className="text-muted-foreground text-sm">
              We prioritize community safety through responsible hero tracking
              and response optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
