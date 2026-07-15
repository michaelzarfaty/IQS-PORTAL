import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Clock, PhoneCall, ShieldAlert, UserX, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
const retentionCases = [
  {
    id: "RC-1042",
    client: "Volt Masters",
    qualifier: "Angela Torres",
    issue: "Qualifier requested to disassociate",
    status: "At Risk",
    daysLeft: 14,
    value: "$4,500/mo",
    lastContact: "2 days ago",
  },
  {
    id: "RC-1043",
    client: "Suncoast HVAC LLC",
    qualifier: "Diana Flores",
    issue: "Payment failed for 2 months",
    status: "Critical",
    daysLeft: 3,
    value: "$3,200/mo",
    lastContact: "Today",
  },
  {
    id: "RC-1044",
    client: "ProAir Services",
    qualifier: "Marcus Rivera",
    issue: "Client looking to hire internal qualifier",
    status: "Saved",
    daysLeft: 0,
    value: "$5,000/mo",
    lastContact: "1 week ago",
  },
];

export default function Retention() {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isLogCallOpen, setIsLogCallOpen] = useState(false);
  const { toast } = useToast();

  const handleLogCall = () => {
    toast({
      title: "Call Logged",
      description: "The retention call notes have been saved successfully.",
    });
    setIsLogCallOpen(false);
  };

  return (
    <Layout>
      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Retention Portal</h1>
            <p className="text-muted-foreground mt-2">Manage at-risk accounts, track save rates, and handle qualifier disassociations.</p>
          </div>
          <Button onClick={() => setIsLogCallOpen(true)}>
            <PhoneCall className="w-4 h-4 mr-2" /> Log Retention Call
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total At Risk</CardDescription>
              <CardTitle className="text-4xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> +3 this week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Saved Accounts (MTD)</CardDescription>
              <CardTitle className="text-4xl">8</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-primary flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 66% Save Rate
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Revenue at Risk</CardDescription>
              <CardTitle className="text-4xl">$42.5k</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Monthly recurring revenue
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Average Days to Resolve</CardDescription>
              <CardTitle className="text-4xl">14</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Target: &lt; 10 days
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Retention Cases</CardTitle>
            <CardDescription>Clients and qualifiers currently in the retention pipeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Client / Qualifier</TableHead>
                  <TableHead>Primary Issue</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retentionCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{caseItem.client}</div>
                      <div className="text-sm text-muted-foreground">{caseItem.qualifier}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {caseItem.issue.includes('disassociate') && <UserX className="w-4 h-4 text-orange-500" />}
                        {caseItem.issue.includes('Payment') && <ShieldAlert className="w-4 h-4 text-destructive" />}
                        {caseItem.issue}
                      </div>
                    </TableCell>
                    <TableCell>{caseItem.value}</TableCell>
                    <TableCell>
                      <Badge variant={caseItem.status === 'Critical' ? 'destructive' : caseItem.status === 'Saved' ? 'default' : 'secondary'} className={caseItem.status === 'Saved' ? 'bg-primary/20 text-primary hover:bg-primary/30' : ''}>
                        {caseItem.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {caseItem.daysLeft > 0 ? `${caseItem.daysLeft} days` : 'Resolved'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedCase(caseItem)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Log Call Dialog */}
        <Dialog open={isLogCallOpen} onOpenChange={setIsLogCallOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Retention Call</DialogTitle>
              <DialogDescription>Record notes from your recent conversation with an at-risk client.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Case</label>
                <select className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-sm text-white focus:ring-1 focus:ring-primary focus:outline-none">
                  <option value="">Select a case...</option>
                  {retentionCases.map(c => (
                    <option key={c.id} value={c.id}>{c.client} ({c.id})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Call Notes</label>
                <Textarea placeholder="Enter details discussed during the call..." className="h-32" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsLogCallOpen(false)}>Cancel</Button>
                <Button onClick={handleLogCall}>Save Notes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Case Details: {selectedCase?.id}</DialogTitle>
              <DialogDescription>Full overview of the retention case.</DialogDescription>
            </DialogHeader>
            {selectedCase && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{selectedCase.client}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Qualifier</p>
                    <p className="font-medium">{selectedCase.qualifier}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedCase.status === 'Critical' ? 'destructive' : selectedCase.status === 'Saved' ? 'default' : 'secondary'}>
                      {selectedCase.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Revenue at Risk</p>
                    <p className="font-medium">{selectedCase.value}</p>
                  </div>
                </div>
                <div className="space-y-2 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                  <h4 className="text-sm font-medium">Primary Issue</h4>
                  <p className="text-sm text-slate-300">{selectedCase.issue}</p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedCase(null)}>Close</Button>
                  <Button>Update Status</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </Layout>
  );
}
