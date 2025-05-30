
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const servicesList = [
    {
      title: "Hero Monitoring",
      description: "Real-time tracking of hero activities and interventions across the city.",
      icon: "📡",
    },
    {
      title: "Incident Reporting",
      description: "Comprehensive system for citizens to report criminal activities and request hero assistance.",
      icon: "🚨",
    },
    {
      title: "Hero Certification",
      description: "Official verification and licensing process for new heroes joining the network.",
      icon: "🏅",
    },
    {
      title: "Training Programs",
      description: "Specialized training and skill development for heroes of all power levels.",
      icon: "💪",
    },
    {
      title: "Community Outreach",
      description: "Connecting heroes with local communities for educational and preventative initiatives.",
      icon: "🤝",
    },
    {
      title: "Damage Assessment",
      description: "Post-incident evaluation and coordination with city services for cleanup and reconstruction.",
      icon: "🏗️",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The Neighborhood Hero Tracker provides comprehensive services to support
          heroes and communities in maintaining safety and order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((service, index) => (
          <Card key={index} className="card-hover-effect">
            <CardHeader>
              <div className="text-4xl mb-2">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Custom Solutions</h2>
        <p className="mb-4">
          Need specialized hero services for your neighborhood or organization?
          Our team can develop tailored solutions to meet your specific security needs.
        </p>
        <div className="mt-6">
          <a 
            href="/contact" 
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us for Custom Services
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
