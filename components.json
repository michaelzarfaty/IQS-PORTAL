import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Plus, Filter, Settings, FileWarning, CalendarClock, FileSpreadsheet } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Reports = () => {
  const [reports] = useState([
    { id: 1, name: "Florida Compliance Audit Q3", type: "State Audit", date: "2026-07-01", status: "Ready" },
    { id: 2, name: "Texas HVAC Renewals 2026", type: "Renewals", date: "2026-07-10", status: "Generating" },
    { id: 3, name: "California Bond Expirations", type: "Compliance", date: "2026-07-12", status: "Ready" },
  ]);

  return (
    <Layout>
      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Report Builder</h1>
            <p className="text-muted-foreground">Generate and manage custom compliance reports for state audits.</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CalendarClock className="w-4 h-4 mr-2" /> Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Report</DialogTitle>
                  <DialogDescription>Automate report generation and delivery.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <select className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option>State Compliance Audit</option>
                      <option>Upcoming Renewals</option>
                      <option>Placement Activity</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frequency</label>
                    <select className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option>Weekly on Monday</option>
                      <option>Monthly on 1st</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Delivery Emails</label>
                    <Input placeholder="admin@iqs.com, compliance@iqs.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Schedule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-border/50">
              <h3 className="font-semibold mb-4 flex items-center"><Filter className="w-4 h-4 mr-2" /> Report Filters</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <select className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>All States</option>
                    <option>Florida</option>
                    <option>Texas</option>
                    <option>California</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Points</label>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> License Status</label>
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Renewal Dates</label>
                    <label className="flex items-center gap-2"><input type="checkbox" /> Insurance/Bond Info</label>
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Placements</label>
                  </div>
                </div>
                <Button className="w-full mt-2" variant="outline"><Settings className="w-4 h-4 mr-2" /> Advanced Configuration</Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              <div className="p-5 border-b border-border/50 flex justify-between items-center bg-muted/20">
                <h3 className="font-semibold">Recent Reports</h3>
                <Input placeholder="Search reports..." className="max-w-xs bg-white" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileWarning className="w-4 h-4 text-primary" /> {report.name}
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={report.status !== "Ready"}>
                              <Download className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><FileText className="w-4 h-4 mr-2" /> Export as PDF</DropdownMenuItem>
                            <DropdownMenuItem><FileSpreadsheet className="w-4 h-4 mr-2" /> Export as CSV</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;