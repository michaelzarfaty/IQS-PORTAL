import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowRight, UserSquare2, FileText, ShieldCheck, Mail, Plus, Send, CreditCard, MessageCircle, X, Search } from "lucide-react";
import { useRole } from "@/lib/RoleContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingType, setOnboardingType] = useState<"Qualifier" | "Client">("Qualifier");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [bgCheckStatus, setBgCheckStatus] = useState<"Pending" | "Running" | "Passed">("Pending");
  const { role } = useRole();
  const isAdmin = role === "Admin";

  const qualifierSteps = [
    { id: 1, title: "Initial Profile", icon: <UserSquare2 className="w-5 h-5" />, desc: "Basic contact and trade info" },
    { id: 2, title: "License Verification", icon: <ShieldCheck className="w-5 h-5" />, desc: "State board lookup & validation" },
    { id: 3, title: "Document Signing", icon: <FileText className="w-5 h-5" />, desc: "Waivers and agreements" },
    { id: 4, title: "Admin Review", icon: <ShieldCheck className="w-5 h-5" />, desc: "Awaiting admin approval" },
    { id: 5, title: "Ready for Placement", icon: <CheckCircle2 className="w-5 h-5" />, desc: "Added to active network" }
  ];

  const clientSteps = [
    { id: 1, title: "Company Profile", icon: <UserSquare2 className="w-5 h-5" />, desc: "Business details and needs" },
    { id: 2, title: "Payment Setup", icon: <ShieldCheck className="w-5 h-5" />, desc: "Connect payment processor" },
    { id: 3, title: "Service Agreements", icon: <FileText className="w-5 h-5" />, desc: "Sign client contracts" },
    { id: 4, title: "Admin Review", icon: <ShieldCheck className="w-5 h-5" />, desc: "Awaiting admin approval" },
    { id: 5, title: "Ready to Hire", icon: <CheckCircle2 className="w-5 h-5" />, desc: "Account activated" }
  ];

  const steps = onboardingType === "Qualifier" ? qualifierSteps : clientSteps;

  return (
    <Layout>
      <div className="p-8 max-w-[1000px] mx-auto space-y-8">
        
        {isAdmin ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Onboarding Management</h1>
                <p className="text-muted-foreground">Initiate and track onboarding for new Qualifiers and Clients.</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button><Plus className="w-4 h-4 mr-2" /> Initiate Onboarding</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Onboarding Invitation</DialogTitle>
                    <DialogDescription>
                      Send a secure link for the user to complete their onboarding profile.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                        <option>Qualifier</option>
                        <option>Client</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => {
                      toast.success("Onboarding invitation sent successfully!");
                    }}>
                      <Send className="w-4 h-4 mr-2" /> Send Invite
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/50 bg-muted/20">
                <h3 className="font-semibold">Active Onboardings</h3>
              </div>
              <div className="divide-y divide-border/50">
                {[
                  { name: "Michael Carter", role: "Qualifier", status: "Step 2: License Verification", progress: 40, date: "Oct 24, 2025", awaitingReview: false },
                  { name: "Sarah Jenkins", role: "Client", status: "Step 1: Company Profile", progress: 20, date: "Oct 25, 2025", awaitingReview: false },
                  { name: "David Rodriguez", role: "Qualifier", status: "Step 3: Document Signing", progress: 60, date: "Oct 26, 2025", awaitingReview: false },
                  { name: "Jessica Wong", role: "Client", status: "Step 4: Admin Review", progress: 80, date: "Oct 27, 2025", awaitingReview: true }
                ].map((item, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{item.role}</Badge>
                          <span className="text-xs text-muted-foreground">Started {item.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground mb-1">{item.status}</p>
                        <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                      {item.awaitingReview ? (
                        <Button size="sm" onClick={() => {
                          setSelectedReview(item);
                          setReviewModalOpen(true);
                        }}>
                          <ShieldCheck className="w-4 h-4 mr-2" /> Review
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => toast.success("Reminder email sent!")}>
                          <Mail className="w-4 h-4 mr-2" /> Remind
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Dialog open={reviewModalOpen} onOpenChange={(open) => {
              setReviewModalOpen(open);
              if (!open) setBgCheckStatus("Pending");
            }}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Review Onboarding: {selectedReview?.name}</DialogTitle>
                  <DialogDescription>
                    Review the submitted profile and documents before approving this {selectedReview?.role}.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Full Name / Company</p>
                      <p className="font-medium">{selectedReview?.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Role</p>
                      <p className="font-medium">{selectedReview?.role}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Submitted Documents</h4>
                    <div className="border rounded-md divide-y">
                      <div className="p-3 flex items-center justify-between hover:bg-muted/10">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Master Agreement.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      <div className="p-3 flex items-center justify-between hover:bg-muted/10">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">License_Copy.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  </div>
                  
                  {selectedReview?.role === "Qualifier" && (
                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-semibold flex items-center justify-between">
                        Background Check
                        <Badge variant={bgCheckStatus === "Passed" ? "default" : "secondary"} className={bgCheckStatus === "Passed" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                          {bgCheckStatus}
                        </Badge>
                      </h4>
                      <p className="text-sm text-muted-foreground">Run an automated background check via Checkr API before approval.</p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        disabled={bgCheckStatus !== "Pending"}
                        onClick={() => {
                          setBgCheckStatus("Running");
                          setTimeout(() => {
                            setBgCheckStatus("Passed");
                            toast.success("Background check completed successfully.");
                          }, 2000);
                        }}
                      >
                        <Search className="w-4 h-4 mr-2" /> 
                        {bgCheckStatus === "Running" ? "Running Check..." : bgCheckStatus === "Passed" ? "Check Passed" : "Run Background Check"}
                      </Button>
                    </div>
                  )}
                </div>
                <DialogFooter className="flex justify-between sm:justify-between">
                  <Button variant="destructive" onClick={() => {
                    toast.error("Onboarding rejected. User will be notified to resubmit.");
                    setReviewModalOpen(false);
                  }}>Reject & Request Changes</Button>
                  <Button onClick={() => {
                    toast.success("Onboarding approved! Welcome email sequence initiated.");
                    setReviewModalOpen(false);
                  }}>Approve Onboarding</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 text-center">
              <div className="flex justify-center gap-4 mb-4">
                <Badge 
                  className={`cursor-pointer ${onboardingType === 'Qualifier' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} hover:bg-primary/80 border-none`}
                  onClick={() => { setOnboardingType('Qualifier'); setCurrentStep(1); }}
                >
                  Qualifier Onboarding
                </Badge>
                <Badge 
                  className={`cursor-pointer ${onboardingType === 'Client' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} hover:bg-primary/80 border-none`}
                  onClick={() => { setOnboardingType('Client'); setCurrentStep(1); }}
                >
                  Client Onboarding
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to the Network</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">Complete the vetting process to become active. We'll guide you through each step.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
              <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
                
                {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center bg-white px-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${currentStep >= step.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                </div>
                <div className="text-center mt-3 max-w-[120px]">
                  <p className={`text-sm font-semibold ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="min-h-[300px] flex flex-col justify-center items-center text-center border-2 border-dashed border-border/50 rounded-xl p-8 bg-muted/10">
            {currentStep === 1 && (
              <div className="max-w-md space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserSquare2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">{onboardingType === 'Qualifier' ? 'Complete Your Profile' : 'Company Profile'}</h2>
                <p className="text-muted-foreground">{onboardingType === 'Qualifier' ? 'Please provide your full contact information, service areas, and primary trades.' : 'Enter your business details, EIN, and primary hiring needs.'}</p>
                {onboardingType === 'Client' && (
                  <div className="space-y-4 text-left mt-4 bg-white p-4 rounded-lg border">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input placeholder="e.g. Acme Corp" />
                    </div>
                    <div className="space-y-2">
                      <Label>EIN / Tax ID</Label>
                      <Input placeholder="XX-XXXXXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Industry</Label>
                      <Input placeholder="e.g. Electrical, HVAC" />
                    </div>
                  </div>
                )}
                <Button className="w-full mt-4" onClick={() => setCurrentStep(2)}>Save Profile <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            )}
            {currentStep === 2 && (
              <div className="max-w-md space-y-4 animate-in fade-in zoom-in-95 w-full">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">{onboardingType === 'Qualifier' ? 'Verify Your Licenses' : 'Payment Setup'}</h2>
                <p className="text-muted-foreground">{onboardingType === 'Qualifier' ? 'Upload copies of your active state licenses.' : 'Connect your preferred payment processor for vendor fees.'}</p>
                
                <div className="border-2 border-dashed border-border/60 rounded-lg p-6 bg-white hover:bg-muted/10 transition-colors cursor-pointer flex flex-col items-center justify-center text-center group mt-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    {onboardingType === 'Qualifier' ? <FileText className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                  </div>
                  <p className="font-medium text-sm">{onboardingType === 'Qualifier' ? 'Click to upload or drag and drop' : 'Connect Stripe Account'}</p>
                  {onboardingType === 'Client' && <p className="text-xs text-muted-foreground mt-1">You will be redirected to Stripe to securely connect your account.</p>}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="w-full" onClick={() => setCurrentStep(1)}>Back</Button>
                  <Button className="w-full" onClick={() => setCurrentStep(3)}>{onboardingType === 'Qualifier' ? 'Verify Licenses' : 'Complete Setup'} <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="max-w-md space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Sign Agreements</h2>
                <p className="text-muted-foreground">Review and electronically sign the {onboardingType === 'Qualifier' ? 'master qualifier agreement' : 'client service agreement'} and waivers.</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="w-full" onClick={() => setCurrentStep(2)}>Back</Button>
                  <Button className="w-full" onClick={() => setCurrentStep(4)}>Sign Documents <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="max-w-md space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Awaiting Admin Review</h2>
                <p className="text-muted-foreground">Your profile and documents have been submitted and are pending review by an admin. You will be notified once approved.</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="w-full" onClick={() => setCurrentStep(3)}>Back</Button>
                  <Button className="w-full" onClick={() => setCurrentStep(5)}>Simulate Admin Approval <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="max-w-md space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">You're All Set!</h2>
                <p className="text-muted-foreground">Your onboarding is complete. You are now active in the network and eligible for placements.</p>
                <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = '/'}>Go to Dashboard</Button>
              </div>
            )}
          </div>
        </div>
      </>
    )}

      {/* Live Chat Widget for Support */}
      {!isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          {chatOpen ? (
            <div className="bg-white border border-border shadow-xl rounded-xl w-[320px] h-[400px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
              <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Onboarding Support</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:text-primary-foreground hover:bg-primary/80" onClick={() => setChatOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 p-4 bg-muted/20 overflow-y-auto flex flex-col gap-3">
                <div className="bg-white border rounded-lg p-3 text-sm self-start max-w-[85%] shadow-sm">
                  Hi there! Need help with your onboarding process?
                </div>
              </div>
              <div className="p-3 border-t bg-white flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          ) : (
            <Button 
              size="lg" 
              className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
              onClick={() => setChatOpen(true)}
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          )}
        </div>
      )}

      </div>
    </Layout>
  );
};

export default Onboarding;
