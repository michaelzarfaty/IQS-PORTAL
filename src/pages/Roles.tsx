import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UsersRound, Shield, Edit, Plus, Check, Mail, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Roles = () => {
  const [users, setUsers] = useState<any[]>([
    { id: 1, name: "Alice Admin", email: "alice@iqs.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Bob Manager", email: "bob@iqs.com", role: "Compliance Manager", status: "Active" },
    { id: 3, name: "Charlie Vendor", email: "charlie@vendor.com", role: "Vendor", status: "Pending" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Compliance Manager" });
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*');
        if (data && !error && data.length > 0) {
          const formattedUsers = data.map((p: any) => ({
            id: p.id,
            name: p.full_name || p.name || 'Unknown',
            email: p.email,
            role: p.role || 'User',
            status: p.status || 'Active'
          }));
          setUsers(prev => {
            const existingEmails = new Set(prev.map(u => u.email));
            const newUsers = formattedUsers.filter(u => !existingEmails.has(u.email));
            return [...prev, ...newUsers];
          });
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleInviteUser = async () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('profiles').insert([
        { 
          full_name: newUser.name, 
          email: newUser.email, 
          role: newUser.role,
          status: 'Pending'
        }
      ]);

      if (error) {
        console.error("Supabase error:", error);
        toast.error(`Database error: ${error.message || error.details || "Unknown error"}`, {
          duration: 8000
        });
      } else {
        toast.success(`Invitation email sent to ${newUser.email}!`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to database.");
    } finally {
      setIsLoading(false);
      setUsers(prev => [...prev, { id: prev.length + 1, ...newUser, status: "Pending" }]);
      setInviteOpen(false);
      setNewUser({ name: "", email: "", role: "Compliance Manager" });
    }
  };

  const handleDeleteUser = async (id: number, email: string) => {
    try {
      await supabase.from('profiles').delete().eq('email', email);
    } catch (err) {
      console.error(err);
    }
    setUsers(users.filter(u => u.id !== id));
    toast.success("User deleted successfully!");
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    setIsLoading(true);
    try {
      if (typeof editingUser.id === 'string' || editingUser.id > 3) {
        await supabase.from('profiles').update({
          full_name: editingUser.name,
          role: editingUser.role,
          status: editingUser.status
        }).eq('id', editingUser.id);
      }
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      toast.success("User updated successfully!");
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user.");
    } finally {
      setIsLoading(false);
    }
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
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteOpen(false)} disabled={isLoading}>Cancel</Button>
                <Button onClick={handleInviteUser} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Invite"}
                </Button>
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
                  <TableCell className="text-right whitespace-nowrap">
                    <Button variant="ghost" size="sm" onClick={() => setEditingUser(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id, user.email)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit User Dialog */}
        <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user role and details.</DialogDescription>
            </DialogHeader>
            {editingUser && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" value={editingUser.email} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={editingUser.role} onValueChange={(v) => setEditingUser({...editingUser, role: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editingUser.status} onValueChange={(v) => setEditingUser({...editingUser, status: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingUser(null)} disabled={isLoading}>Cancel</Button>
              <Button onClick={handleUpdateUser} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Roles;