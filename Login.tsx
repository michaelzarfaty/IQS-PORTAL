import { useState, useEffect } from "react";
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
  const { setRole, setIsAuthenticated, isAuthenticated } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'login' | 'forgot_password' | 'magic_link'>('login');

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  const handleLogin = (role: 'Admin' | 'Client' | 'Vendor' | 'Qualifier') => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setRole(role);
      setIsAuthenticated(true);
      navigate("/");
    }, 800);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('login');
      alert('Password reset link sent to your email!');
    }, 800);
  };

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('login');
      alert('Magic link sent to your email!');
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
            <CardTitle className="text-2xl font-bold tracking-tight">
              {view === 'login' && 'Welcome back'}
              {view === 'forgot_password' && 'Reset Password'}
              {view === 'magic_link' && 'Sign in with Magic Link'}
            </CardTitle>
            <CardDescription>
              {view === 'login' && 'Sign in to your IQS account to continue'}
              {view === 'forgot_password' && 'Enter your email to receive a password reset link'}
              {view === 'magic_link' && 'Enter your email to receive a magic sign-in link'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {view === 'login' && (
              <Tabs defaultValue="client" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-900 border border-slate-800">
                  <TabsTrigger value="client" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Client</TabsTrigger>
                  <TabsTrigger value="qualifier" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Qualifier</TabsTrigger>
                  <TabsTrigger value="vendor" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Vendor</TabsTrigger>
                  <TabsTrigger value="admin" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Admin</TabsTrigger>
                </TabsList>

                {['client', 'qualifier', 'vendor', 'admin'].map((tab) => (
                  <TabsContent key={tab} value={tab} className="space-y-4 mt-0">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin(tab.charAt(0).toUpperCase() + tab.slice(1) as any);
                    }}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${tab}-email`}>Email</Label>
                          <Input 
                            id={`${tab}-email`} 
                            type="email" 
                            placeholder="name@example.com" 
                            className="bg-slate-900/50 border-slate-800"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`${tab}-password`}>Password</Label>
                            <button type="button" onClick={() => setView('forgot_password')} className="text-xs text-primary hover:underline">Forgot password?</button>
                          </div>
                          <Input 
                            id={`${tab}-password`} 
                            type="password" 
                            className="bg-slate-900/50 border-slate-800"
                            required
                          />
                        </div>
                        <Button 
                          type="submit"
                          className="w-full mt-6" 
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                      </div>
                    </form>
                    <div className="mt-4 text-center">
                      <button 
                        type="button" 
                        onClick={() => setView('magic_link')} 
                        className="text-sm text-primary hover:underline"
                      >
                        Sign in with Magic Link instead
                      </button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}

            {view === 'forgot_password' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input 
                    id="reset-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="bg-slate-900/50 border-slate-800"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <div className="mt-4 text-center">
                  <button 
                    type="button" 
                    onClick={() => setView('login')} 
                    className="text-sm text-primary hover:underline"
                  >
                    Back to login
                  </button>
                </div>
              </form>
            )}

            {view === 'magic_link' && (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input 
                    id="magic-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="bg-slate-900/50 border-slate-800"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
                <div className="mt-4 text-center">
                  <button 
                    type="button" 
                    onClick={() => setView('login')} 
                    className="text-sm text-primary hover:underline"
                  >
                    Back to password login
                  </button>
                </div>
              </form>
            )}
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
