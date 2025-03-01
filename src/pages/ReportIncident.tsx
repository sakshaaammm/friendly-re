
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Location {
  latitude: number | null;
  longitude: number | null;
  address: string;
}

interface ReportData {
  title: string;
  description: string;
  location: Location;
  imageFile: File | null;
  imagePreview: string | null;
  date: string;
  status: "pending" | "in-progress" | "completed";
}

const ReportIncident = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  
  const [reportData, setReportData] = useState<ReportData>({
    title: "",
    description: "",
    location: {
      latitude: null,
      longitude: null,
      address: "",
    },
    imageFile: null,
    imagePreview: null,
    date: new Date().toISOString().split('T')[0],
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReportData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const getLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simulate getting address from coordinates (in a real app, you'd use a geocoding service)
          const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (City Center)`;
          
          setReportData((prev) => ({
            ...prev,
            location: {
              latitude,
              longitude,
              address: mockAddress,
            },
          }));
          
          setLoadingLocation(false);
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadingLocation(false);
          toast({
            title: "Location error",
            description: "Could not get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setLoadingLocation(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter location manually.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!reportData.title || !reportData.description || !reportData.location.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate API call to submit incident
    setTimeout(() => {
      // In a real app, you'd send this data to your backend
      console.log("Submitting incident:", reportData);
      
      toast({
        title: "Incident reported",
        description: "Your incident has been successfully reported. The authorities have been notified.",
      });
      
      // Reset form
      setReportData({
        title: "",
        description: "",
        location: {
          latitude: null,
          longitude: null,
          address: "",
        },
        imageFile: null,
        imagePreview: null,
        date: new Date().toISOString().split('T')[0],
        status: "pending",
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Report an Incident</h1>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>
            Fill in the details of the incident you're reporting. The more information you provide, the better our heroes can respond.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="font-medium">
                Incident Title *
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of the incident"
                value={reportData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="font-medium">
                Detailed Description *
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide as much detail as possible about what happened"
                value={reportData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Location *</label>
              <div className="flex gap-2">
                <Input
                  name="address"
                  placeholder="Address or location description"
                  value={reportData.location.address}
                  onChange={(e) => {
                    setReportData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        address: e.target.value,
                      },
                    }));
                  }}
                  className="flex-1"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={getLocation}
                  disabled={loadingLocation}
                >
                  {loadingLocation ? "Detecting..." : "Detect Location"}
                </Button>
              </div>
              {reportData.location.latitude && reportData.location.longitude && (
                <p className="text-sm text-muted-foreground">
                  Coordinates: {reportData.location.latitude.toFixed(4)}, {reportData.location.longitude.toFixed(4)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="image" className="font-medium">
                Upload Photo
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <div className="border rounded-md flex items-center justify-center bg-muted/50 h-40">
                  {reportData.imagePreview ? (
                    <img
                      src={reportData.imagePreview}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain rounded-md"
                    />
                  ) : (
                    <span className="text-muted-foreground">Image preview</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="font-medium">
                Date of Incident *
              </label>
              <Input
                id="date"
                name="date"
                type="date"
                value={reportData.date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="pt-2">
              <Badge>Status: Pending Review</Badge>
              <p className="mt-2 text-sm text-muted-foreground">
                Your report will be reviewed by the authorities upon submission.
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Incident Report"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ReportIncident;
