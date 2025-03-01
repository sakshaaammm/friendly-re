
// This is mock data for the heroes that would typically come from a database

export interface Hero {
  id: number;
  name: string;
  alias?: string;
  neighborhood: string;
  powers: string[];
  bio: string;
  image: string;
  activity: number;
  responseTime: number;
  rescues: number;
  rating: number;
  isActive: boolean;
  lastActive: string;
  contact?: {
    email?: string;
    phone?: string;
    social?: {
      twitter?: string;
      instagram?: string;
    };
  };
  address?: string;
  coverage: string[];
  stats: {
    strength: number;
    speed: number;
    intelligence: number;
    durability: number;
    energy: number;
    fighting: number;
  };
  incidents: Incident[];
}

export interface Incident {
  id: number;
  date: string;
  title: string;
  description: string;
  location: string;
  resolved: boolean;
  type: "rescue" | "crime" | "disaster" | "medical" | "other";
}

const heroes: Hero[] = [
  {
    id: 1,
    name: "John Doe",
    alias: "The Guardian",
    neighborhood: "Downtown",
    powers: ["Super Strength", "Flight", "Invulnerability"],
    bio: "A former military officer who gained powers after a freak accident during a thunderstorm. Now protects Downtown from threats both mundane and extraordinary.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    activity: 85,
    responseTime: 5.2,
    rescues: 123,
    rating: 4.8,
    isActive: true,
    lastActive: "2023-07-15T14:30:00Z",
    contact: {
      email: "guardian@heroes.com",
      social: {
        twitter: "@TheGuardian",
        instagram: "@real_guardian",
      },
    },
    coverage: ["Downtown", "Financial District", "Harbor"],
    stats: {
      strength: 90,
      speed: 65,
      intelligence: 75,
      durability: 85,
      energy: 60,
      fighting: 80,
    },
    incidents: [
      {
        id: 101,
        date: "2023-07-15T14:30:00Z",
        title: "Bank Robbery Foiled",
        description:
          "Stopped a gang of armed robbers at First National Bank. No civilian casualties.",
        location: "First National Bank, Downtown",
        resolved: true,
        type: "crime",
      },
      {
        id: 102,
        date: "2023-07-10T09:15:00Z",
        title: "Apartment Fire Rescue",
        description:
          "Rescued 6 residents from a burning apartment building before fire department arrival.",
        location: "Oakwood Apartments, Downtown",
        resolved: true,
        type: "rescue",
      },
    ],
  },
  {
    id: 2,
    name: "Sara Chen",
    alias: "Swift",
    neighborhood: "Eastside",
    powers: ["Super Speed", "Enhanced Reflexes", "Rapid Healing"],
    bio: "A college track star who discovered her metahuman abilities after being struck by experimental particle radiation. Uses her powers to help people in need across the Eastside.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80",
    activity: 92,
    responseTime: 2.1,
    rescues: 87,
    rating: 4.5,
    isActive: true,
    lastActive: "2023-07-16T08:45:00Z",
    contact: {
      email: "swift@heroes.com",
      social: {
        twitter: "@SwiftHero",
        instagram: "@thereal_swift",
      },
    },
    coverage: ["Eastside", "University District", "Riverfront"],
    stats: {
      strength: 60,
      speed: 98,
      intelligence: 80,
      durability: 65,
      energy: 70,
      fighting: 75,
    },
    incidents: [
      {
        id: 201,
        date: "2023-07-16T08:45:00Z",
        title: "Medical Emergency Response",
        description:
          "Delivered emergency medication to hospital during traffic gridlock.",
        location: "Eastside General Hospital",
        resolved: true,
        type: "medical",
      },
    ],
  },
  {
    id: 3,
    name: "Miguel Sanchez",
    alias: "Mindwave",
    neighborhood: "Westside",
    powers: ["Telekinesis", "Telepathy", "Force Fields"],
    bio: "A brilliant neuroscientist who developed psychic abilities after experimenting with brain enhancement technology. Protects Westside while continuing his research.",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    activity: 78,
    responseTime: 7.5,
    rescues: 64,
    rating: 4.3,
    isActive: true,
    lastActive: "2023-07-14T18:20:00Z",
    contact: {
      email: "mindwave@heroes.com",
      social: {
        twitter: "@MindwaveHero",
        instagram: "@mind_wave",
      },
    },
    coverage: ["Westside", "Research District", "Hillcrest"],
    stats: {
      strength: 45,
      speed: 50,
      intelligence: 95,
      durability: 60,
      energy: 85,
      fighting: 65,
    },
    incidents: [
      {
        id: 301,
        date: "2023-07-14T18:20:00Z",
        title: "Research Lab Containment",
        description:
          "Contained hazardous material spill with force fields at Quantum Research Facility.",
        location: "Quantum Research Facility, Research District",
        resolved: true,
        type: "disaster",
      },
    ],
  },
  {
    id: 4,
    name: "Alex Washington",
    alias: "Nightshade",
    neighborhood: "Northside",
    powers: ["Shadow Manipulation", "Invisibility", "Night Vision"],
    bio: "A former intelligence operative who mastered ancient shadow arts. Works mostly at night to keep Northside safe from criminal organizations.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    activity: 65,
    responseTime: 8.3,
    rescues: 42,
    rating: 4.1,
    isActive: false,
    lastActive: "2023-07-10T23:45:00Z",
    contact: {
      email: "nightshade@heroes.com",
      social: {
        twitter: "@NightshadeHero",
      },
    },
    coverage: ["Northside", "Industrial District", "Port Area"],
    stats: {
      strength: 70,
      speed: 75,
      intelligence: 85,
      durability: 65,
      energy: 80,
      fighting: 90,
    },
    incidents: [
      {
        id: 401,
        date: "2023-07-10T23:45:00Z",
        title: "Weapons Shipment Intercepted",
        description:
          "Intercepted and disabled an illegal weapons shipment at the port.",
        location: "North Harbor, Port Area",
        resolved: true,
        type: "crime",
      },
    ],
  },
  {
    id: 5,
    name: "Olivia Johnson",
    alias: "Ember",
    neighborhood: "Southside",
    powers: ["Pyrokinesis", "Heat Resistance", "Smoke Control"],
    bio: "A firefighter who gained fire abilities after being trapped in a burning chemical plant. Uses her powers to fight fires and rescue people in danger.",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    activity: 88,
    responseTime: 4.7,
    rescues: 104,
    rating: 4.6,
    isActive: true,
    lastActive: "2023-07-16T12:10:00Z",
    contact: {
      email: "ember@heroes.com",
      phone: "555-FIRE-911",
      social: {
        instagram: "@ember_hero",
      },
    },
    coverage: ["Southside", "Warehouse District", "Riverside"],
    stats: {
      strength: 65,
      speed: 70,
      intelligence: 75,
      durability: 85,
      energy: 90,
      fighting: 75,
    },
    incidents: [
      {
        id: 501,
        date: "2023-07-16T12:10:00Z",
        title: "Chemical Plant Fire Contained",
        description:
          "Contained and extinguished fire at South Chemical Plant, preventing toxic explosion.",
        location: "South Chemical Plant, Southside",
        resolved: true,
        type: "disaster",
      },
      {
        id: 502,
        date: "2023-07-12T15:30:00Z",
        title: "School Bus Rescue",
        description:
          "Rescued children from school bus accident before vehicle caught fire.",
        location: "Southside Bridge, Riverside",
        resolved: true,
        type: "rescue",
      },
    ],
  },
  {
    id: 6,
    name: "David Kim",
    alias: "Voltage",
    neighborhood: "Tech District",
    powers: ["Electrokinesis", "Technopathy", "Energy Absorption"],
    bio: "A brilliant electrical engineer who gained electrical powers after an accident with an experimental power generator. Protects the Tech District while developing new sustainable energy technologies.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    activity: 80,
    responseTime: 6.8,
    rescues: 76,
    rating: 4.4,
    isActive: true,
    lastActive: "2023-07-15T10:20:00Z",
    contact: {
      email: "voltage@heroes.com",
      social: {
        twitter: "@VoltageHero",
        instagram: "@voltage_official",
      },
    },
    coverage: ["Tech District", "Downtown", "Research District"],
    stats: {
      strength: 60,
      speed: 75,
      intelligence: 90,
      durability: 70,
      energy: 95,
      fighting: 65,
    },
    incidents: [
      {
        id: 601,
        date: "2023-07-15T10:20:00Z",
        title: "Power Grid Stabilization",
        description:
          "Prevented citywide blackout by stabilizing overloaded power grid during heatwave.",
        location: "Central Power Station, Tech District",
        resolved: true,
        type: "disaster",
      },
    ],
  },
];

export default heroes;
