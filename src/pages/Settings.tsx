import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, CheckCircle2, Server, KeyRound, Globe, Save, Calendar, Globe2, Link as LinkIcon, AlertTriangle, CreditCard, Phone, Database } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [emailConnected, setEmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [domainSettings, setDomainSettings] = useState({
    customDomain: "app.iqs.com",
    status: "verified"
  });
  const [smtpSettings, setSmtpSettings] = useState({
    host: localStorage.getItem('smtpHost') || "",
    port: localStorage.getItem('smtpPort') || "587",
    user: localStorage.getItem('smtpUser') || "",
    pass: localStorage.getItem('smtpPass') || ""
  });
  const [supabaseSettings, setSupabaseSettings] = useState({
    url: localStorage.getItem('supabaseUrl') || '',
    key: localStorage.getItem('supabaseAnonKey') || ''
  });
  const handleConnectEmail = () => {
    toast.success("OAuth connection initiated. Redirecting to provider...");
    setTimeout(() => {
      setEmailConnected(true);
      toast.success("Email successfully connected!");
    }, 1500);
  };

  const handleConnectCalendar = () => {
    toast.success("Redirecting to Google Calendar authorization...");
    setTimeout(() => {
      setCalendarConnected(true);
      toast.success("Google Calendar successfully connected!");
    }, 1500);
  };

  const handleSaveDomain = () => {
    toast.success("Domain settings updated successfully. DNS verification may take up to 24 hours.");
  };

  const handleSaveSmtp = () => {
    localStorage.setItem('smtpHost', smtpSettings.host);
    localStorage.setItem('smtpPort', smtpSettings.port);
    localStorage.setItem('smtpUser', smtpSettings.user);
    localStorage.setItem('smtpPass', smtpSettings.pass);
    toast.success("SMTP Settings saved successfully!");
  };

  const handleSaveSupabase = () => {
    let cleanUrl = supabaseSettings.url.trim();
    if (cleanUrl && !cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    
    localStorage.setItem('supabaseUrl', cleanUrl);
    localStorage.setItem('supabaseAnonKey', supabaseSettings.key.trim());
    toast.success("Supabase Database settings saved successfully! Reloading...");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <Layout>
      <div className="p-8 max-w-[1200px] mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">System Settings</h1>
          <p className="text-muted-foreground">Manage integrations, email connections, and platform preferences.</p>
        </div>

        <Tabs defaultValue="database" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email Integrations</TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Calendar</TabsTrigger>
            <TabsTrigger value="domain" className="flex items-center gap-2"><Globe2 className="w-4 h-4" /> Custom Domain</TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2"><KeyRound className="w-4 h-4" /> API Keys</TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2"><Database className="w-4 h-4" /> Database</TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone System</TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2"><Globe className="w-4 h-4" /> General</TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment Processors</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect via OAuth</CardTitle>
                  <CardDescription>Quickly connect your Google Workspace or Microsoft 365 account to send automated emails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {emailConnected ? (
                    <div className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg text-center">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
                      <h3 className="font-semibold text-green-800 dark:text-green-300">Email Connected</h3>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">admin@iqs.com is successfully linked.</p>
                      <Button variant="outline" className="mt-4" onClick={() => setEmailConnected(false)}>Disconnect</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button className="w-full justify-start" variant="outline" onClick={handleConnectEmail}>
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Connect Google Workspace
                      </Button>
                      <Button className="w-full justify-start" variant="outline" onClick={handleConnectEmail}>
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                          <path d="M11.4 24H0V12.6H11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0H11.4V11.4ZM24 11.4H12.6V0H24V11.4Z" fill="#00A4EF"/>
                        </svg>
                        Connect Microsoft 365
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Connecting via OAuth is the recommended way to ensure high deliverability for automated follow-ups and invoices.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom SMTP Settings</CardTitle>
                  <CardDescription>Use your own mail server credentials to send platform emails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>SMTP Host</Label>
                      <Input value={smtpSettings.host} onChange={e => setSmtpSettings({...smtpSettings, host: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Port</Label>
                      <Input value={smtpSettings.port} onChange={e => setSmtpSettings({...smtpSettings, port: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Username / Email</Label>
                    <Input value={smtpSettings.user} onChange={e => setSmtpSettings({...smtpSettings, user: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Password / App Password</Label>
                    <Input type="password" value={smtpSettings.pass} onChange={e => setSmtpSettings({...smtpSettings, pass: e.target.value})} />
                  </div>
                  <Button onClick={handleSaveSmtp} className="w-full">
                    <Save className="w-4 h-4 mr-2" /> Save SMTP Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Calendar Integration</CardTitle>
                <CardDescription>Connect your Google Calendar to automatically sync appointments, renewals, and intro calls.</CardDescription>
              </CardHeader>
              <CardContent>
                {calendarConnected ? (
                  <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg text-center max-w-md mx-auto">
                    <Calendar className="w-12 h-12 text-blue-500 mb-3" />
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300">Calendar Connected</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Your Google Calendar is successfully synced with IQS.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setCalendarConnected(false)}>Disconnect Calendar</Button>
                  </div>
                ) : (
                  <div className="max-w-md">
                    <Button className="w-full justify-start" variant="outline" onClick={handleConnectCalendar}>
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Connect Google Calendar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      By connecting your calendar, you allow IQS to create, read, and manage events related to your workflow directly in your Google Calendar.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="domain" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Domain Configuration</CardTitle>
                <CardDescription>Set up a custom domain for your portals and public-facing pages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-2">
                    <Label>Your Custom Domain</Label>
                    <div className="flex gap-3">
                      <Input 
                        value={domainSettings.customDomain} 
                        onChange={e => setDomainSettings({...domainSettings, customDomain: e.target.value})} 
                        placeholder="e.g., portal.yourcompany.com"
                      />
                      <Button onClick={handleSaveDomain}>Save Domain</Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" /> DNS Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      To connect your domain, add the following CNAME record to your DNS provider's settings.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm font-mono bg-background p-3 rounded border">
                      <div className="font-semibold text-muted-foreground">Type</div>
                      <div className="font-semibold text-muted-foreground">Name / Host</div>
                      <div className="font-semibold text-muted-foreground">Value / Target</div>
                      
                      <div>CNAME</div>
                      <div>portal</div>
                      <div className="break-all">cname.iqs-platform.com</div>
                    </div>
                  </div>

                  {domainSettings.status === "verified" ? (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-900">
                      <CheckCircle2 className="w-4 h-4" />
                      Domain successfully verified and active
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-900">
                      <AlertTriangle className="w-4 h-4" />
                      Pending DNS verification
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your external API keys for background checks, Stripe, and CRMs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Stripe Publishable Key</Label>
                  <Input type="text" placeholder="pk_test_51Nx..." defaultValue={localStorage.getItem('stripePk') || ''} onChange={(e) => localStorage.setItem('stripePk', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Stripe Secret Key</Label>
                  <Input type="password" placeholder="sk_test_51Nx..." defaultValue={localStorage.getItem('stripeSk') || ''} onChange={(e) => localStorage.setItem('stripeSk', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>AvocoLab CRM API Key</Label>
                  <Input type="password" value="av_live_XXXXXXXXXXXXXXXXXXXXXXXXXX" readOnly />
                </div>
                <Button onClick={() => toast.success("API Keys saved successfully!")}>
                  <Save className="w-4 h-4 mr-2" /> Save API Keys
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supabase Database Connection</CardTitle>
                <CardDescription>Connect your free Supabase project directly from the browser. No code required.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Supabase Project URL</Label>
                  <Input 
                    placeholder="https://xyzcompany.supabase.co" 
                    value={supabaseSettings.url}
                    onChange={(e) => setSupabaseSettings({...supabaseSettings, url: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Anon / Public Key</Label>
                  <Input 
                    type="password" 
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                    value={supabaseSettings.key}
                    onChange={(e) => setSupabaseSettings({...supabaseSettings, key: e.target.value})}
                  />
                </div>
                <Button onClick={handleSaveSupabase}>
                  <Save className="w-4 h-4 mr-2" /> Save & Connect Database
                </Button>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                  <strong>How to get these keys:</strong><br />
                  1. Log into Supabase and open your project.<br />
                  2. Click the gear icon (Project Settings) on the bottom left.<br />
                  3. Click "API" in the menu.<br />
                  4. Copy the "Project URL" and the "anon" key and paste them here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phone" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QUO Phone System Integration</CardTitle>
                <CardDescription>Connect your QUO phone system for automated SMS and Voice routing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>QUO API Key</Label>
                  <Input type="password" placeholder="quo_live_XXXXXXXXXXXXXXXXXXXXXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label>Webhook URL (For inbound SMS/Calls)</Label>
                  <Input readOnly value="https://app.iqs.com/api/webhooks/quo" />
                </div>
                <Button onClick={() => toast.success("QUO Phone System settings saved!")}>
                  <Save className="w-4 h-4 mr-2" /> Save QUO Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your platform's base settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">General settings configuration (Company Name, Address, Timezone) will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Payment Processors</CardTitle>
                <CardDescription>Connect alternative payment processors for vendors to charge their fees.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6 flex flex-col items-center text-center space-y-4 hover:border-primary transition-colors">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Stripe Connect</h3>
                      <p className="text-sm text-muted-foreground mt-1">Allow vendors to receive payments directly to their Stripe accounts.</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => toast.success("Redirecting to Stripe Connect OAuth...")}>Connect Stripe</Button>
                  </div>
                  
                  <div className="border rounded-lg p-6 flex flex-col items-center text-center space-y-4 hover:border-primary transition-colors">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                      <CreditCard className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Square</h3>
                      <p className="text-sm text-muted-foreground mt-1">Connect Square accounts for processing vendor service fees.</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => toast.success("Redirecting to Square authorization...")}>Connect Square</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;