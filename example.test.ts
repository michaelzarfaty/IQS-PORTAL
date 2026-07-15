import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/lib/RoleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, UserSquare2, Users, Building2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useRole();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (role: 'Admin' | 'Client' | 'Vendor' | 'Qualifier') => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setRole(role);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-8">
          <img 
            src="https://vibe.filesafe.space/1783350442961167380/attachments/e73efa72-5bce-4447-8a3d-493aafd0ecec.png" 
            alt="IQS Logo" 
            className="h-12 object-contain drop-shadow-lg" 
          />
        </div>

        <Card className="border-white/10 bg-slate-950/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your IQS account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="client" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-900 border border-slate-800">
                <TabsTrigger value="client" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Client</TabsTrigger>
                <TabsTrigger value="qualifier" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Qualifier</TabsTrigger>
                <TabsTrigger value="vendor" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Vendor</TabsTrigger>
                <TabsTrigger value="admin" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Admin</TabsTrigger>
              </TabsList>

              {['client', 'qualifier', 'vendor', 'admin'].map((tab) => (
                <TabsContent key={tab} value={tab} className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor={`${tab}-email`}>Email</Label>
                    <Input 
                      id={`${tab}-email`} 
                      type="email" 
                      placeholder="name@example.com" 
                      className="bg-slate-900/50 border-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${tab}-password`}>Password</Label>
                      <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                    </div>
                    <Input 
                      id={`${tab}-password`} 
                      type="password" 
                      className="bg-slate-900/50 border-slate-800"
                    />
                  </div>
                  <Button 
                    className="w-full mt-6" 
                    onClick={() => handleLogin(tab.charAt(0).toUpperCase() + tab.slice(1) as any)}
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center border-t border-white/5 pt-6 pb-6 text-sm text-slate-400">
            <p>Don&apos;t have an account?</p>
            <a href="#" className="text-primary hover:underline mt-1 font-medium">Contact support to get set up</a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
