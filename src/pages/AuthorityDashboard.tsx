
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Mock data for reported problems
const mockIncidents = [
  {
    id: "INC-001",
    title: "Broken Streetlight",
    description: "Streetlight at the corner of Oak and Main has been out for three days. Area is very dark at night.",
    location: "123 Main Street, Downtown",
    date: "2023-11-01",
    status: "pending",
    reporter: "John Citizen",
    priority: "high",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "INC-002",
    title: "Large Pothole",
    description: "Deep pothole in the middle of Park Avenue. Several cars have been damaged.",
    location: "456 Park Avenue, Westside",
    date: "2023-11-02",
    status: "in-progress",
    reporter: "Sarah Connor",
    priority: "high",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "INC-003",
    title: "Fallen Tree Branch",
    description: "Large branch blocking sidewalk after the storm. Pedestrians have to walk on the road.",
    location: "Highway 101, North Exit",
    date: "2023-11-03",
    status: "completed",
    reporter: "Michael Johnson",
    priority: "medium",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "INC-004",
    title: "Graffiti on Park Wall",
    description: "Offensive graffiti on the wall of Central Park. Needs to be cleaned.",
    location: "Central Park, East Entrance",
    date: "2023-11-04",
    status: "pending",
    reporter: "Emily Brown",
    priority: "medium",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "INC-005",
    title: "Flooding on Main Street",
    description: "After heavy rain, there's significant flooding on Main Street. Drainage seems to be blocked.",
    location: "Riverside District",
    date: "2023-11-05",
    status: "in-progress",
    reporter: "James Wilson",
    priority: "high",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "INC-006",
    title: "Damaged Playground Equipment",
    description: "The slide in Community Park has a large crack and is unsafe for children.",
    location: "Community Park",
    date: "2023-11-06",
    status: "completed",
    reporter: "Linda Martinez",
    priority: "medium",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "INC-007",
    title: "Abandoned Vehicle",
    description: "Car has been parked for over two weeks and appears to be abandoned.",
    location: "789 Business Boulevard",
    date: "2023-11-07",
    status: "in-progress",
    reporter: "Robert Taylor",
    priority: "high",
    imageUrl: "/placeholder.svg",
  },
];

interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: string;
  reporter: string;
  priority: string;
  imageUrl: string;
}

const AuthorityDashboard = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  // Filter incidents based on search term and filters
  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = 
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || incident.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const updateIncidentStatus = (id: string, newStatus: string) => {
    setIncidents(incidents.map(incident => 
      incident.id === id ? { ...incident, status: newStatus } : incident
    ));
    
    toast({
      title: "Status Updated",
      description: `Problem ${id} status changed to ${newStatus}.`,
    });
    
    // Update selected incident if it's currently selected
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident({ ...selectedIncident, status: newStatus });
    }
  };

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2">Community Authority Dashboard</h1>
      <p className="text-muted-foreground mb-8">Manage and respond to reported neighborhood problems</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{incidents.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{incidents.filter(i => i.status === "pending").length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{incidents.filter(i => i.status === "completed").length}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Problem Filters</CardTitle>
              <CardDescription>Filter neighborhood problems by status, priority or search term</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Search</label>
                <Input
                  placeholder="Search by ID, title, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Problem List</CardTitle>
              <CardDescription>
                {filteredIncidents.length} problems found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {filteredIncidents.length > 0 ? (
                  filteredIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      onClick={() => setSelectedIncident(incident)}
                      className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                        selectedIncident?.id === incident.id ? "bg-muted border border-primary" : "border"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium">{incident.title}</div>
                        <div className="text-xs text-muted-foreground">{incident.id}</div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2 truncate">
                        {incident.location}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(incident.status)}
                        {getPriorityBadge(incident.priority)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No problems match your search criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedIncident ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedIncident.title}</CardTitle>
                    <CardDescription>Problem ID: {selectedIncident.id}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(selectedIncident.status)}
                    {getPriorityBadge(selectedIncident.priority)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-1">Description</h3>
                        <p className="text-muted-foreground">
                          {selectedIncident.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          {selectedIncident.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-1">Reported By</h3>
                        <p className="text-muted-foreground">
                          {selectedIncident.reporter}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Date Reported</h3>
                        <p className="text-muted-foreground">
                          {new Date(selectedIncident.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Problem Photo</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedIncident.imageUrl}
                          alt={selectedIncident.title}
                          className="w-full h-60 object-cover"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="actions" className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Update Status</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={selectedIncident.status === "pending" ? "default" : "outline"}
                          onClick={() => updateIncidentStatus(selectedIncident.id, "pending")}
                        >
                          Set as Pending
                        </Button>
                        <Button
                          variant={selectedIncident.status === "in-progress" ? "default" : "outline"}
                          onClick={() => updateIncidentStatus(selectedIncident.id, "in-progress")}
                        >
                          Set as In Progress
                        </Button>
                        <Button
                          variant={selectedIncident.status === "completed" ? "default" : "outline"}
                          onClick={() => updateIncidentStatus(selectedIncident.id, "completed")}
                        >
                          Mark as Completed
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Assign Community Helper</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a helper to respond" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="helper1">John Smith (Local Repair)</SelectItem>
                          <SelectItem value="helper2">Mary Johnson (Cleanup Crew)</SelectItem>
                          <SelectItem value="helper3">Robert Davis (Electrician)</SelectItem>
                          <SelectItem value="helper4">Lisa Wilson (Public Works)</SelectItem>
                          <SelectItem value="helper5">David Brown (Parks Dept.)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="mt-2">Assign Helper</Button>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="mr-2">
                        Download Report
                      </Button>
                      <Button variant="destructive">
                        Archive Problem
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[400px] border rounded-lg bg-muted/40">
              <div className="text-center p-8">
                <h3 className="text-xl font-medium mb-2">No Problem Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select a problem from the list to view its details and take action.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
