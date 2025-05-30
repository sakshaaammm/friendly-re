
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [authorityCredentials, setAuthorityCredentials] = useState({
    email: "",
    password: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthorityChange = (e) => {
    const { name, value } = e.target;
    setAuthorityCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // This would be replaced with an actual authentication call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any email/password combination works
      toast({
        title: "Logged in successfully",
        description: "Welcome to your neighborhood dashboard!",
      });
      navigate("/user-dashboard");
    }, 1500);
  };

  const handleAuthorityLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // This would be replaced with an actual authentication call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, any email/password combination works
      toast({
        title: "Authority login successful",
        description: "Welcome to the neighborhood authority dashboard!",
      });
      navigate("/authority-dashboard");
    }, 1500);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Neighborhood Problem Solver</h1>
        
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="user">Resident Login</TabsTrigger>
            <TabsTrigger value="authority">Authority Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle>Resident Login</CardTitle>
                <CardDescription>
                  Log in to report neighborhood problems and redeem vouchers
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleUserLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="user-email" className="text-sm font-medium">Email</label>
                    <Input
                      id="user-email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      value={userCredentials.email}
                      onChange={handleUserChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="user-password" className="text-sm font-medium">Password</label>
                    <Input
                      id="user-password"
                      name="password"
                      type="password"
                      required
                      value={userCredentials.password}
                      onChange={handleUserChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login as Resident"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="authority">
            <Card>
              <CardHeader>
                <CardTitle>Authority Login</CardTitle>
                <CardDescription>
                  Log in to manage neighborhood problems and issue vouchers
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleAuthorityLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="authority-email" className="text-sm font-medium">Email</label>
                    <Input
                      id="authority-email"
                      name="email"
                      type="email"
                      placeholder="authority.email@example.com"
                      required
                      value={authorityCredentials.email}
                      onChange={handleAuthorityChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="authority-password" className="text-sm font-medium">Password</label>
                    <Input
                      id="authority-password"
                      name="password"
                      type="password"
                      required
                      value={authorityCredentials.password}
                      onChange={handleAuthorityChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login as Authority"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
