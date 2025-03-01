
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

// Mock data for vouchers
const mockVouchers = [
  {
    id: "VCH-001",
    company: "Local Grocery Store",
    discount: "15% off on all items",
    expiryDate: "2023-12-31",
    code: "GROCERY15",
    availableCount: 5,
    issuedCount: 0,
  },
  {
    id: "VCH-002",
    company: "City Cinema",
    discount: "Buy 1 Get 1 Free",
    expiryDate: "2023-12-15",
    code: "CINEMA2FOR1",
    availableCount: 10,
    issuedCount: 2,
  },
  {
    id: "VCH-003",
    company: "Sunshine Cafe",
    discount: "Free Coffee with any Meal",
    expiryDate: "2023-12-20",
    code: "FREECOFFEE",
    availableCount: 8,
    issuedCount: 1,
  },
  {
    id: "VCH-004",
    company: "Quick Repair Services",
    discount: "20% off on Home Repairs",
    expiryDate: "2023-12-25",
    code: "REPAIR20",
    availableCount: 7,
    issuedCount: 3,
  },
  {
    id: "VCH-005",
    company: "Green Park Restaurant",
    discount: "10% off on Dinner Menu",
    expiryDate: "2023-12-31",
    code: "DINNER10",
    availableCount: 12,
    issuedCount: 0,
  },
  {
    id: "VCH-006",
    company: "City Fitness Gym",
    discount: "1 Week Free Trial",
    expiryDate: "2023-12-15",
    code: "FITWEEK",
    availableCount: 15,
    issuedCount: 5,
  },
  {
    id: "VCH-007",
    company: "Bookworm Store",
    discount: "Buy 2 Books Get 1 Free",
    expiryDate: "2023-12-20",
    code: "BOOK3FOR2",
    availableCount: 10,
    issuedCount: 2,
  },
  {
    id: "VCH-008",
    company: "Tech Gadget Shop",
    discount: "5% off on Electronics",
    expiryDate: "2023-12-25",
    code: "TECH5",
    availableCount: 20,
    issuedCount: 1,
  },
  {
    id: "VCH-009",
    company: "Trendy Fashion",
    discount: "15% off on Clothing",
    expiryDate: "2023-12-31",
    code: "FASHION15",
    availableCount: 10,
    issuedCount: 0,
  },
  {
    id: "VCH-010",
    company: "Organic Market",
    discount: "Free Delivery on orders over $30",
    expiryDate: "2023-12-15",
    code: "ORGFREE",
    availableCount: 8,
    issuedCount: 3,
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

interface Voucher {
  id: string;
  company: string;
  discount: string;
  expiryDate: string;
  code: string;
  availableCount: number;
  issuedCount: number;
}

const AuthorityDashboard = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [mainTab, setMainTab] = useState("problems");
  
  // For voucher issuance
  const [selectedResidentId, setSelectedResidentId] = useState("");

  // Mock residents data
  const residents = [
    { id: "USR-001", name: "John Citizen", email: "john@example.com" },
    { id: "USR-002", name: "Sarah Connor", email: "sarah@example.com" },
    { id: "USR-003", name: "Michael Johnson", email: "michael@example.com" },
    { id: "USR-004", name: "Emily Brown", email: "emily@example.com" },
    { id: "USR-005", name: "James Wilson", email: "james@example.com" },
  ];

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

  // Filter vouchers based on search term
  const filteredVouchers = vouchers.filter((voucher) => 
    voucher.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.discount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const issueVoucher = (voucherId: string, residentId: string) => {
    // Find the selected voucher and resident
    const voucher = vouchers.find(v => v.id === voucherId);
    const resident = residents.find(r => r.id === residentId);
    
    if (!voucher || !resident) {
      toast({
        title: "Error",
        description: "Invalid voucher or resident selection.",
        variant: "destructive",
      });
      return;
    }
    
    if (voucher.availableCount <= 0) {
      toast({
        title: "Error",
        description: "No more vouchers available for this offer.",
        variant: "destructive",
      });
      return;
    }
    
    // Update the voucher count
    setVouchers(vouchers.map(v => 
      v.id === voucherId 
        ? { 
            ...v, 
            availableCount: v.availableCount - 1,
            issuedCount: v.issuedCount + 1
          } 
        : v
    ));
    
    // Update selected voucher if it's currently selected
    if (selectedVoucher && selectedVoucher.id === voucherId) {
      setSelectedVoucher({ 
        ...selectedVoucher, 
        availableCount: selectedVoucher.availableCount - 1,
        issuedCount: selectedVoucher.issuedCount + 1
      });
    }
    
    toast({
      title: "Voucher Issued",
      description: `${voucher.company} voucher issued to ${resident.name}.`,
    });
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
      <p className="text-muted-foreground mb-8">Manage neighborhood problems and issue vouchers to residents</p>
      
      <Tabs value={mainTab} onValueChange={setMainTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="problems">Neighborhood Problems</TabsTrigger>
          <TabsTrigger value="vouchers">Voucher Management</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {mainTab === "problems" && (
        <>
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
                          <h3 className="font-semibold mb-2">Issue Voucher for Reporting</h3>
                          <div className="grid gap-4">
                            <p className="text-sm text-muted-foreground">
                              Reward the resident for reporting this problem by issuing a voucher
                            </p>
                            <Select onValueChange={(value) => setSelectedVoucher(vouchers.find(v => v.id === value) || null)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a voucher to issue" />
                              </SelectTrigger>
                              <SelectContent>
                                {vouchers.map((voucher) => (
                                  <SelectItem 
                                    key={voucher.id} 
                                    value={voucher.id}
                                    disabled={voucher.availableCount === 0}
                                  >
                                    {voucher.company} - {voucher.discount} ({voucher.availableCount} left)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button 
                              disabled={!selectedVoucher} 
                              onClick={() => {
                                if (selectedVoucher) {
                                  issueVoucher(selectedVoucher.id, "USR-001"); // Assuming reporter is first user
                                  setSelectedVoucher(null);
                                }
                              }}
                            >
                              Issue Voucher to Reporter
                            </Button>
                          </div>
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
        </>
      )}
      
      {mainTab === "vouchers" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Available Vouchers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {vouchers.reduce((acc, voucher) => acc + voucher.availableCount, 0)}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Total Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{vouchers.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Issued Vouchers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {vouchers.reduce((acc, voucher) => acc + voucher.issuedCount, 0)}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Voucher Search</CardTitle>
                  <CardDescription>Find vouchers by company or discount</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Search vouchers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Voucher List</CardTitle>
                  <CardDescription>
                    {filteredVouchers.length} vouchers available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {filteredVouchers.length > 0 ? (
                      filteredVouchers.map((voucher) => (
                        <div
                          key={voucher.id}
                          onClick={() => setSelectedVoucher(voucher)}
                          className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                            selectedVoucher?.id === voucher.id ? "bg-muted border border-primary" : "border"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-medium">{voucher.company}</div>
                            <div className="text-xs text-muted-foreground">{voucher.id}</div>
                          </div>
                          <div className="text-sm mb-2">
                            {voucher.discount}
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Available: {voucher.availableCount}</span>
                            <span>Issued: {voucher.issuedCount}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No vouchers match your search
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              {selectedVoucher ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedVoucher.company}</CardTitle>
                        <CardDescription>Voucher ID: {selectedVoucher.id}</CardDescription>
                      </div>
                      <Badge variant={selectedVoucher.availableCount > 0 ? "secondary" : "outline"}>
                        {selectedVoucher.availableCount} Available
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-1">Discount Offer</h3>
                        <p className="text-muted-foreground">
                          {selectedVoucher.discount}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Voucher Code</h3>
                        <p className="font-mono bg-muted p-2 rounded">
                          {selectedVoucher.code}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-1">Expiry Date</h3>
                        <p className="text-muted-foreground">
                          {new Date(selectedVoucher.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Usage Statistics</h3>
                        <div className="flex gap-4">
                          <p className="text-muted-foreground">
                            Issued: {selectedVoucher.issuedCount}
                          </p>
                          <p className="text-muted-foreground">
                            Available: {selectedVoucher.availableCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-semibold mb-4">Issue This Voucher</h3>
                      
                      {selectedVoucher.availableCount > 0 ? (
                        <div className="space-y-4">
                          <Select onValueChange={setSelectedResidentId}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a resident" />
                            </SelectTrigger>
                            <SelectContent>
                              {residents.map((resident) => (
                                <SelectItem key={resident.id} value={resident.id}>
                                  {resident.name} ({resident.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button 
                            disabled={!selectedResidentId} 
                            onClick={() => {
                              if (selectedResidentId) {
                                issueVoucher(selectedVoucher.id, selectedResidentId);
                                setSelectedResidentId("");
                              }
                            }}
                          >
                            Issue Voucher
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <p className="text-muted-foreground">
                            No more vouchers available for this offer.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] border rounded-lg bg-muted/40">
                  <div className="text-center p-8">
                    <h3 className="text-xl font-medium mb-2">No Voucher Selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select a voucher from the list to view its details and issue it to residents.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorityDashboard;
