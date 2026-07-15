import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsersRound, Shield, Edit, Plus, Check, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Roles = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Admin", email: "alice@iqs.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Bob Manager", email: "bob@iqs.com", role: "Compliance Manager", status: "Active" },
    { id: 3, name: "Charlie Vendor", email: "charlie@vendor.com", role: "Vendor", status: "Pending" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Compliance Manager" });
  const [inviteOpen, setInviteOpen] = useState(false);

  const handleInviteUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill out all fields.");
      return;
    }
    setUsers([...users, { id: users.length + 1, ...newUser, status: "Pending" }]);
    setInviteOpen(false);
    toast.success("User invited successfully!");
    setNewUser({ name: "", email: "", role: "Compliance Manager" });
  };

  const permissionModules = [
    "Qualifiers Directory",
    "License Verification",
    "Document Tracking",
    "Reports & Audits",
    "Billing & Invoices",
    "System Settings"
  ];

  return (
    <Layout>
      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Role Management</h1>
            <p className="text-muted-foreground">Manage user access and granular permissions across the platform.</p>
          </div>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Invite User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
                <DialogDescription>Send an invitation to join your platform.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="john@example.com" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={newUser.role} onValueChange={(v) => setNewUser({...newUser, role: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                <Button onClick={handleInviteUser}>Send Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-border/50 shadow-sm">
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Super Admin</h3>
            <p className="text-sm text-muted-foreground mb-4">Full access to all system features, settings, and billing.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">Edit Permissions</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Role: Super Admin</DialogTitle>
                  <DialogDescription>Configure granular permissions for this role.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead className="text-center">View</TableHead>
                          <TableHead className="text-center">Create</TableHead>
                          <TableHead className="text-center">Edit</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionModules.map((module, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{module}</TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked className="accent-primary" /></TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked className="accent-primary" /></TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked className="accent-primary" /></TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked className="accent-primary" /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Permissions</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border/50 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <UsersRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Compliance Manager</h3>
            <p className="text-sm text-muted-foreground mb-4">Can manage licenses, view reports, and approve documents.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">Edit Permissions</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Role: Compliance Manager</DialogTitle>
                  <DialogDescription>Configure granular permissions for this role.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow>
                          <TableHead>Module</TableHead>
                          <TableHead className="text-center">View</TableHead>
                          <TableHead className="text-center">Create</TableHead>
                          <TableHead className="text-center">Edit</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionModules.map((module, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{module}</TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked className="accent-primary" /></TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked={i < 4} className="accent-primary" /></TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked={i < 4} className="accent-primary" /></TableCell>
                            <TableCell className="text-center"><input type="checkbox" defaultChecked={i < 2} className="accent-primary" /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Permissions</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border/50 shadow-sm border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3 text-muted-foreground">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-semibold">Create Custom Role</h3>
            <p className="text-xs text-muted-foreground mt-1">Define granular permissions</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
          <div className="p-5 border-b border-border/50 bg-muted/20">
            <h3 className="font-semibold">Users Directory</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Roles;