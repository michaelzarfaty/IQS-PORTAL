import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRole } from "@/lib/RoleContext";
import { Search, ChevronDown, User, MapPin, Mail, Phone, Hash, FileText, Calendar, Plus, Edit, Trash2, Briefcase, Upload, Download, LayoutGrid, List, BarChart as BarChartIcon, Map, Clock, Send, CalendarDays, MessageSquare, Activity, Workflow, Pause, Play, FileSignature, CheckCircle2, AlertCircle, Undo, ExternalLink, ShieldAlert, Landmark, Bell, PenTool, Highlighter, Type, UploadCloud, Kanban, ShieldCheck, Eye, CreditCard, Lock, CalendarClock, Receipt, Settings2, BookOpen, GraduationCap, Bookmark, LockKeyhole, Maximize, ChevronLeft, ChevronRight, Edit3, Sparkles, History, DollarSign, AlertTriangle, Link as LinkIcon, Key, Database, RefreshCw, ArrowRightLeft, GitMerge, TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Handshake, Save } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const stateAbbreviations: Record<string, string> = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
  "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
  "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
  "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
  "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
  "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
  "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
  "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};

const usTiles = [
  { id: "AK", r: 0, c: 0 }, { id: "ME", r: 0, c: 11 },
  { id: "WA", r: 1, c: 1 }, { id: "ID", r: 1, c: 2 }, { id: "MT", r: 1, c: 3 }, { id: "ND", r: 1, c: 4 }, { id: "MN", r: 1, c: 5 }, { id: "WI", r: 1, c: 6 }, { id: "MI", r: 1, c: 7 }, { id: "NY", r: 1, c: 9 }, { id: "VT", r: 1, c: 10 }, { id: "NH", r: 1, c: 11 },
  { id: "OR", r: 2, c: 1 }, { id: "NV", r: 2, c: 2 }, { id: "WY", r: 2, c: 3 }, { id: "SD", r: 2, c: 4 }, { id: "IA", r: 2, c: 5 }, { id: "IL", r: 2, c: 6 }, { id: "IN", r: 2, c: 7 }, { id: "OH", r: 2, c: 8 }, { id: "PA", r: 2, c: 9 }, { id: "NJ", r: 2, c: 10 }, { id: "MA", r: 2, c: 11 },
  { id: "CA", r: 3, c: 1 }, { id: "UT", r: 3, c: 2 }, { id: "CO", r: 3, c: 3 }, { id: "NE", r: 3, c: 4 }, { id: "MO", r: 3, c: 5 }, { id: "KY", r: 3, c: 6 }, { id: "WV", r: 3, c: 7 }, { id: "VA", r: 3, c: 8 }, { id: "MD", r: 3, c: 9 }, { id: "DE", r: 3, c: 10 }, { id: "CT", r: 3, c: 11 },
  { id: "AZ", r: 4, c: 2 }, { id: "NM", r: 4, c: 3 }, { id: "KS", r: 4, c: 4 }, { id: "AR", r: 4, c: 5 }, { id: "TN", r: 4, c: 6 }, { id: "NC", r: 4, c: 7 }, { id: "SC", r: 4, c: 8 }, { id: "DC", r: 4, c: 9 }, { id: "RI", r: 4, c: 11 },
  { id: "OK", r: 5, c: 4 }, { id: "LA", r: 5, c: 5 }, { id: "MS", r: 5, c: 6 }, { id: "AL", r: 5, c: 7 }, { id: "GA", r: 5, c: 8 },
  { id: "TX", r: 6, c: 4 }, { id: "FL", r: 6, c: 8 },
  { id: "HI", r: 7, c: 0 }
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.array(z.string()).min(1, "At least one state is required"),
  licenseNumber: z.string().min(2, "License number is required"),
  classification: z.string().min(2, "Classification is required"),
  renewalDate: z.string().min(2, "Renewal date is required"),
  status: z.string(),
  trades: z.string()
});

const initialContractors = [
  { id: 1, name: "Esteban A", initials: "EA", status: "Unavailable", location: ["Florida"], trades: ["HVAC"], renewalDate: "2024-05-15", licenseNumber: "FL-12345", classification: "HVAC Contractor", isVerified: true, email: "esteban@example.com", phone: "(555) 111-2222" },
  { id: 2, name: "T A", initials: "TA", status: "Available", location: ["Texas"], trades: ["Commercial Building", "Residential Building"], renewalDate: "2025-11-20", licenseNumber: "TX-98765", classification: "General Builder", isVerified: true, email: "ta@example.com", phone: "(555) 333-4444" },
  { id: 3, name: "Stephen Abila", initials: "SA", status: "Available", location: ["Texas"], trades: [], renewalDate: "2025-01-10", licenseNumber: "TX-55555", classification: "Specialty", isVerified: false, email: "stephen@example.com", phone: "(555) 555-6666" },
  { id: 4, name: "Shara Aboul-hosn", initials: "SA", status: "Available", location: ["California"], trades: ["Commercial Building", "Residential Building"], renewalDate: "2025-08-30", licenseNumber: "CA-11111", classification: "General Contractor", isVerified: true, email: "shara@example.com", phone: "(555) 777-8888" },
  { id: 5, name: "Drew Abrams", initials: "DA", status: "Available", location: ["Florida"], trades: [], renewalDate: "2026-02-14", licenseNumber: "FL-22222", classification: "Plumbing", isVerified: false, email: "drew@example.com", phone: "(555) 999-0000" },
  { id: 6, name: "Sergio Abreu", initials: "SA", status: "Available", location: ["Texas"], trades: [], isVerified: false, renewalDate: "2025-12-01", licenseNumber: "TX-66666", classification: "Specialty", email: "sergio@example.com", phone: "(555) 123-1111" },
  { id: 7, name: "Marco Acosta", initials: "MA", status: "Available", location: ["California"], trades: ["Commercial Building", "Residential Building"], isVerified: true, renewalDate: "2025-10-15", licenseNumber: "CA-77777", classification: "General Contractor", email: "marco@example.com", phone: "(555) 123-2222" },
  { id: 8, name: "Carl Adams", initials: "CA", status: "Available", location: ["Texas"], trades: ["Commercial Building"], isVerified: false, renewalDate: "2025-09-20", licenseNumber: "TX-88888", classification: "General Builder", email: "carl@example.com", phone: "(555) 123-3333" },
  { id: 9, name: "Robert Adams", initials: "RA", status: "Available", location: ["Florida"], trades: ["HVAC"], isVerified: false, renewalDate: "2025-08-10", licenseNumber: "FL-99999", classification: "HVAC Contractor", email: "robert@example.com", phone: "(555) 123-4444" },
  { id: 10, name: "Brandon Adkins", initials: "BA", status: "Available", location: ["California"], trades: ["Specialty Construction"], isVerified: false, renewalDate: "2025-07-05", licenseNumber: "CA-10101", classification: "Specialty", email: "brandon@example.com", phone: "(555) 123-5555" },
  { id: 11, name: "Djino Agenor", initials: "DA", status: "Available", location: ["Texas"], trades: ["Commercial Building", "Residential Building"], isVerified: false, renewalDate: "2025-06-15", licenseNumber: "TX-20202", classification: "General Builder", email: "djino@example.com", phone: "(555) 123-6666" },
  { id: 12, name: "Nico Aguayo", initials: "NA", status: "Available", location: ["Florida"], trades: ["Electrical", "Plumbing"], isVerified: true, renewalDate: "2025-05-20", licenseNumber: "FL-30303", classification: "Electrical Contractor", email: "nico@example.com", phone: "(555) 123-7777" },
];

const initialDocuments = [
  { id: 1, title: "Liability waiver", placement: "James Ortega → Lightning Electric", type: "Liability waiver", note: "Send after intro call confirmed", signer: "Qualifier signs", status: "Blocking", isSigned: false },
  { id: 2, title: "Qualifier agreement", placement: "James Ortega → Lightning Electric", type: "Agreement", signer: "Qualifier signs", status: "Blocking", isSigned: false },
  { id: 3, title: "Client service agreement", placement: "James Ortega → Lightning Electric", type: "Agreement", signer: "Client signs", status: "Blocking", isSigned: false },
  { id: 4, title: "Liability waiver", placement: "Angela Torres → Volt Masters", type: "Liability waiver", note: "Not yet initiated", signer: "Qualifier signs", status: "Blocking", isSigned: false },
  { id: 5, title: "Qualifier agreement", placement: "Angela Torres → Volt Masters", type: "Agreement", signer: "Qualifier signs", status: "Blocking", isSigned: false },
  { id: 6, title: "Client service agreement", placement: "Angela Torres → Volt Masters", type: "Agreement", signer: "Client signs", status: "Blocking", isSigned: false },
  { id: 7, title: "Disassociation notice", placement: "Diana Flores → Suncoast HVAC LLC", type: "Other", note: "Due at end of term", signer: "Qualifier signs", status: "Pending", isSigned: false },
  { id: 8, title: "Service fee invoice ($750)", placement: "Marcus Rivera → ProAir Services", type: "Invoice", note: "Awaiting client confirmation", signer: "Client signs", status: "Pending", isSigned: false },
  { id: 9, title: "Finder's fee invoice", placement: "Sandra Chen → CoolBreeze", type: "Invoice", note: "Due before application submitted", signer: "Client signs", status: "Pending", isSigned: false },
  { id: 10, title: "Service fee invoice ($750)", placement: "Sandra Chen → CoolBreeze", type: "Invoice", signer: "Client signs", status: "Pending", isSigned: false },
  { id: 11, title: "Liability waiver", placement: "Diana Flores → Suncoast HVAC LLC", type: "Liability waiver", note: "Signed Oct 18, 2025", signer: "Qualifier signs", status: "Blocking", isSigned: true },
  { id: 12, title: "Qualifier agreement", placement: "Diana Flores → Suncoast HVAC LLC", type: "Agreement", note: "Signed Oct 18, 2025", signer: "Qualifier signs", status: "Blocking", isSigned: true },
  { id: 13, title: "Client service agreement", placement: "Diana Flores → Suncoast HVAC LLC", type: "Agreement", note: "Signed Oct 18, 2025", signer: "Client signs", status: "Blocking", isSigned: true },
  { id: 14, title: "Finder's fee invoice", placement: "Diana Flores → Suncoast HVAC LLC", type: "Invoice", note: "Signed Oct 20, 2025", signer: "Client signs", status: "Pending", isSigned: true },
  { id: 15, title: "Service fee invoice ($750)", placement: "Diana Flores → Suncoast HVAC LLC", type: "Invoice", note: "Signed Oct 20, 2025", signer: "Client signs", status: "Pending", isSigned: true },
  { id: 16, title: "3rd party authorization", placement: "Diana Flores → Suncoast HVAC LLC", type: "Authorization", note: "Signed Oct 19, 2025", signer: "Client signs", status: "Pending", isSigned: true },
  { id: 17, title: "Liability waiver", placement: "Marcus Rivera → ProAir Services", type: "Liability waiver", note: "Signed Dec 10, 2025", signer: "Qualifier signs", status: "Blocking", isSigned: true },
  { id: 18, title: "Qualifier agreement", placement: "Marcus Rivera → ProAir Services", type: "Agreement", note: "Signed Dec 10, 2025", signer: "Qualifier signs", status: "Blocking", isSigned: true },
  { id: 19, title: "Client service agreement", placement: "Marcus Rivera → ProAir Services", type: "Agreement", note: "Signed Dec 10, 2025", signer: "Client signs", status: "Blocking", isSigned: true },
  { id: 20, title: "Finder's fee invoice", placement: "Marcus Rivera → ProAir Services", type: "Invoice", note: "Signed Dec 12, 2025", signer: "Client signs", status: "Pending", isSigned: true },
  { id: 21, title: "3rd party authorization", placement: "Marcus Rivera → ProAir Services", type: "Authorization", note: "Signed Dec 11, 2025", signer: "Client signs", status: "Pending", isSigned: true },
  { id: 22, title: "Liability waiver", placement: "Sandra Chen → CoolBreeze", type: "Liability waiver", note: "Signed Dec 28, 2025", signer: "Qualifier signs", status: "Blocking", isSigned: true },
  { id: 23, title: "Qualifier agreement", placement: "Sandra Chen → CoolBreeze", type: "Agreement", note: "Signed Dec 28, 2025", signer: "Qualifier signs", status: "Blocking", isSigned: true },
  { id: 24, title: "Client service agreement", placement: "Sandra Chen → CoolBreeze", type: "Agreement", note: "Signed Dec 28, 2025", signer: "Client signs", status: "Blocking", isSigned: true },
];

const getAvatarColor = (initials: string) => {
  const colors = [
    "bg-teal-600", "bg-emerald-600", "bg-green-600", "bg-rose-700", 
    "bg-blue-600", "bg-indigo-600", "bg-purple-600", "bg-orange-600",
    "bg-amber-600", "bg-cyan-600"
  ];
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
};

const Index = () => {
  const location = useLocation();
  const { role } = useRole();
  const [contractorsList, setContractorsList] = useState(initialContractors);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState("All states");
  const [selectedTrade, setSelectedTrade] = useState("All trades");
  const [licenseStatus, setLicenseStatus] = useState("All statuses");
  const [vettingFilter, setVettingFilter] = useState("All");
  const [sequenceStatusFilter, setSequenceStatusFilter] = useState("All statuses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkStatusModalOpen, setIsBulkStatusModalOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState("Available");
  const [isBulkTradeModalOpen, setIsBulkTradeModalOpen] = useState(false);
  const [bulkTrades, setBulkTrades] = useState("");
  const [bulkTradeAction, setBulkTradeAction] = useState<"add" | "remove">("add");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "table" | "analytics" | "map" | "timeline" | "calendar" | "activity" | "automation" | "documents" | "fees" | "pipeline" | "scheduling" | "library" | "exams" | "flashcards" | "exam_analytics" | "invoices" | "work-orders" | "active-placements" | "partners" | "deficiencies" | "clients-crm" | "finance" | "verifications" | "handoffs">("grid");
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);
  const [selectedHandoff, setSelectedHandoff] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view");
    if (view && ["grid", "table", "analytics", "map", "timeline", "calendar", "activity", "automation", "documents", "fees", "pipeline", "scheduling", "library", "exams", "flashcards", "exam_analytics", "invoices", "work-orders", "active-placements", "partners", "deficiencies", "clients-crm", "finance", "verifications", "handoffs"].includes(view)) {
      setViewMode(view as any);
    } else if (!view && location.pathname === "/") {
      // Default view when just /
      setViewMode("grid");
    }
  }, [location.search, location.pathname]);

  const pipelineStages = ["New Applicants", "Screening", "Interview", "Offer", "Placed"];
  const [applicantsList, setApplicantsList] = useState([
    { id: 101, name: "Alex Mercer", initials: "AM", trade: "Electrical", location: "Florida", stage: "New Applicants", appliedDate: "2026-07-10" },
    { id: 102, name: "Sam Fisher", initials: "SF", trade: "HVAC", location: "Texas", stage: "Screening", appliedDate: "2026-07-11" },
    { id: 103, name: "Isaac Clarke", initials: "IC", trade: "Plumbing", location: "California", stage: "Interview", appliedDate: "2026-07-12" },
    { id: 104, name: "Gordon Freeman", initials: "GF", trade: "General Building", location: "New York", stage: "Offer", appliedDate: "2026-07-13" },
  ]);
  const [documentsList, setDocumentsList] = useState(initialDocuments);
  const [documentFilter, setDocumentFilter] = useState("All");
  const [documentTab, setDocumentTab] = useState("All documents");
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [sequenceSteps, setSequenceSteps] = useState<any[]>([
    { id: 1, type: "email", timing: 30, timingType: "before", subject: "Upcoming License Renewal: {{licenseNumber}}", body: "Hi {{name}},\n\nThis is a reminder that your license ({{classification}} - {{licenseNumber}}) is scheduled to renew in 30 days on {{renewalDate}}.\n\nPlease ensure all necessary paperwork is submitted." },
    { id: 2, type: "sms", timing: 7, timingType: "before", subject: "", body: "Hi {{name}}, reminder: your license ({{licenseNumber}}) renews in 7 days on {{renewalDate}}. Please submit paperwork. - Qualifier Network" },
    { id: 3, type: "email", timing: 0, timingType: "on", subject: "Your License Renews Today", body: "Hi {{name}},\n\nYour license ({{licenseNumber}}) renews today! Please confirm your renewal status with us." }
  ]);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<any>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>(new Date());
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState({
    subject: "Upcoming License Renewal: {{licenseNumber}}",
    body: "Hi {{name}},\n\nThis is a reminder that your license ({{classification}} - {{licenseNumber}}) is scheduled to renew on {{renewalDate}}.\n\nPlease ensure all necessary paperwork is submitted.\n\nThank you,\nQualifier Network"
  });
  const [smsTemplate, setSmsTemplate] = useState("Hi {{name}}, reminder: your license ({{licenseNumber}}) renews on {{renewalDate}}. Please submit paperwork. - Qualifier Network");
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [currentCompose, setCurrentCompose] = useState({ type: "email", to: "", subject: "", body: "", contractorName: "" });
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", placement: "", type: "Liability waiver", signer: "Qualifier signs", status: "Blocking", file: null as File | null });
  const [isExtracting, setIsExtracting] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    clientName: "Lightning Electric LLC",
    dueDate: "2026-08-01",
    notes: "Thank you for choosing International Qualifier Search.",
    monthlyPrice: 3500,
    serviceFee: 1000,
    additionalItems: [] as { id: number, description: string, amount: number }[]
  });
  const [isInvoiceHistoryOpen, setIsInvoiceHistoryOpen] = useState(false);
  const [invoiceHistory, setInvoiceHistory] = useState([
    { id: "INV-1041", client: "Volt Masters", amount: 8000, date: "2026-07-10", status: "Sent" },
    { id: "INV-1040", client: "ProAir Services", amount: 7500, date: "2026-07-05", status: "Paid" }
  ]);
  
  const [workOrders, setWorkOrders] = useState([
    { id: "WO-1042", client: "Lightning Electric LLC", type: "New Placement", status: "Pending", date: "2026-07-14", assignedTo: "Unassigned", termsAccepted: false, messages: [], attachments: [], smsNotifications: true },
    { id: "WO-1043", client: "Volt Masters", type: "Renewal", status: "In Progress", date: "2026-07-13", assignedTo: "Tanner", termsAccepted: false, messages: [], attachments: [], smsNotifications: false },
    { id: "WO-1044", client: "ProAir Services", type: "State Application", status: "Accepted", date: "2026-07-12", assignedTo: "Sarah", termsAccepted: true, messages: [{ sender: "Tanner", text: "I've started working on this application.", time: "10:30 AM" }], attachments: [{ name: "Application_Draft.pdf" }], smsNotifications: true }
  ]);

  const [crmApiKey, setCrmApiKey] = useState("avoco-live-xxxxxxxxxxxxxxx");
  const [isCrmSyncing, setIsCrmSyncing] = useState(false);
  const [lastCrmSync, setLastCrmSync] = useState("Just now");
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<any>(null);
  const [isWorkOrderModalOpen, setIsWorkOrderModalOpen] = useState(false);
  const [workOrderView, setWorkOrderView] = useState<"list" | "kanban">("kanban");
  const [workOrderGroupBy, setWorkOrderGroupBy] = useState<"status" | "assignee">("status");
  const [workOrderSearch, setWorkOrderSearch] = useState("");
  const [workOrderFilterStatus, setWorkOrderFilterStatus] = useState("All");
  const [newMessage, setNewMessage] = useState("");
  const [isTannerTyping, setIsTannerTyping] = useState(false);
  const [signature, setSignature] = useState("");
  const [isWorkOrderSignModalOpen, setIsWorkOrderSignModalOpen] = useState(false);
  const [extractedData, setExtractedData] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [feesList, setFeesList] = useState([
    { id: 1, state: "Florida", trade: "General Contractor", appFee: "$249.00", examFee: "$135.00", renewalFee: "$209.00 (Biennial)", notes: "Requires fingerprinting" },
    { id: 2, state: "Texas", trade: "HVAC (Class A)", appFee: "$115.00", examFee: "$60.00", renewalFee: "$65.00 (Annual)", notes: "Must provide insurance certificate" },
    { id: 3, state: "California", trade: "General Building (B)", appFee: "$450.00", examFee: "Included", renewalFee: "$450.00 (Biennial)", notes: "Bond required ($25,000)" },
    { id: 4, state: "New York", trade: "Electrical", appFee: "$200.00", examFee: "$150.00", renewalFee: "$100.00 (Annual)", notes: "Varies by municipality/county" },
  ]);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [annotationTool, setAnnotationTool] = useState<"draw" | "highlight" | "text" | "signature_field">("draw");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signatureFields, setSignatureFields] = useState<{id: number, x: number, y: number, assignee: string}[]>([]);
  const [draggingField, setDraggingField] = useState<number | null>(null);
  const ITEMS_PER_PAGE = 8;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [docToSign, setDocToSign] = useState<any>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [docToPreview, setDocToPreview] = useState<any>(null);
  const [isNotesSidebarOpen, setIsNotesSidebarOpen] = useState(false);
  const [bookNotes, setBookNotes] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Document Signed', message: 'Liability waiver for Diana Flores was signed.', time: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
    { id: 2, title: 'Document Signed', message: 'Qualifier agreement for Marcus Rivera was signed.', time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: true },
    { id: 3, title: 'Insurance Expiring', message: 'Your General Liability Insurance expires in 30 days. Please upload a new certificate.', time: new Date().toISOString(), read: false }
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const [isCheckingBackground, setIsCheckingBackground] = useState(false);
  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState("Valid until Dec 2026");
  const [isAutoInvoiceModalOpen, setIsAutoInvoiceModalOpen] = useState(false);
  const [autoInvoiceData, setAutoInvoiceData] = useState({ placement: "", amount: "", description: "" });
  const [scheduledCalls, setScheduledCalls] = useState([
    { id: 1, title: "Intro Call - James Ortega", date: new Date(Date.now() + 86400000), type: "Intro Call" },
    { id: 2, title: "Interview - Angela Torres", date: new Date(Date.now() + 172800000), type: "Interview" }
  ]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({ title: "", date: "", type: "Intro Call" });
  const [pinnedWidgets, setPinnedWidgets] = useState(['total_network', 'verified_qualifiers', 'upcoming_renewals', 'recent_work_orders']);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [libraryBooks, setLibraryBooks] = useState<any[]>([
    { id: 1, title: "International Building Code (IBC) 2021", category: "Code Books", image: "https://vibe.filesafe.space/1783701563732099364/assets/fc623ffd-9fca-4d31-b99f-bb1c9f42c91a.png", status: "Active", expires: "Oct 15, 2026", file: null },
    { id: 2, title: "National Electrical Code (NEC) 2023", category: "Code Books", image: "https://vibe.filesafe.space/1783701563732099364/assets/72a58e31-0aa5-454c-9333-9c70f399b10e.png", status: "Inactive", price: "$49/mo", file: null },
    { id: 3, title: "Florida Contractor Manual 2024", category: "State Specific", image: "https://vibe.filesafe.space/1783701563732099364/assets/dd0ff40e-e446-40cb-b42e-75c021faccef.png", status: "Inactive", price: "$29/mo", file: null },
  ]);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", category: "Code Books", price: "$29/mo", file: null as File | null });
  const [examTab, setExamTab] = useState("available");
  const [examProgressData] = useState([
    { date: 'Week 1', score: 45 },
    { date: 'Week 2', score: 62 },
    { date: 'Week 3', score: 75 },
    { date: 'Week 4', score: 85 },
  ]);
  const [flashcards] = useState([
    { id: 1, front: "What is the minimum clear width for a single wheelchair passage?", back: "32 inches at a point and 36 inches continuously." },
    { id: 2, front: "What is the maximum slope for a ramp in new construction?", back: "1:12 (8.33%)" },
    { id: 3, front: "How many exits are required for an occupant load of 501 to 1000?", back: "3 exits." },
  ]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  
  const [mapStateFilter, setMapStateFilter] = useState("All");
  const [mapTradeFilter, setMapTradeFilter] = useState("All");
  const [mapYear, setMapYear] = useState([2026]);
  const [mapLayer, setMapLayer] = useState("density");
  const [mapTheme, setMapTheme] = useState("iqs");
  const [selectedDrilldownState, setSelectedDrilldownState] = useState<string | null>(null);
  const [compareState, setCompareState] = useState<string | "None">("None");

  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const [pdfBookmarks, setPdfBookmarks] = useState<number[]>([]);
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [librarySearchQuery, setLibrarySearchQuery] = useState("");
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isAiExamModalOpen, setIsAiExamModalOpen] = useState(false);
  const [isDeckBuilderOpen, setIsDeckBuilderOpen] = useState(false);
  const [isComplianceMapOpen, setIsComplianceMapOpen] = useState(false);
  
  const [affiliates, setAffiliates] = useState([
    { id: "AFF-001", name: "Global Consulting Inc.", contact: "Jane Doe", email: "jane@global.com", commission: 15, paymentStatus: "Connected", status: "Active", referrals: 12, revenue: 45000 },
    { id: "AFF-002", name: "BuildTech Solutions", contact: "Mark Smith", email: "mark@buildtech.com", commission: 10, paymentStatus: "Pending Setup", status: "Active", referrals: 3, revenue: 10500 },
  ]);
  const [isAffiliateChatOpen, setIsAffiliateChatOpen] = useState(false);
  const [selectedAffiliateForChat, setSelectedAffiliateForChat] = useState<any>(null);
  const [affiliateChatMessages, setAffiliateChatMessages] = useState<{sender: string, text: string, time: string}[]>([
    { sender: "Admin", text: "Welcome to the affiliate program! Let me know if you need any help.", time: "10:00 AM" }
  ]);
  const [newAffiliateMessage, setNewAffiliateMessage] = useState("");

  const [isPayoutHistoryOpen, setIsPayoutHistoryOpen] = useState(false);
  const [selectedAffiliateForPayouts, setSelectedAffiliateForPayouts] = useState<any>(null);
  const [payoutHistory, setPayoutHistory] = useState([
    { id: "PAY-101", date: "2026-06-01", amount: "$1,250.00", status: "Paid", method: "Direct Deposit" },
    { id: "PAY-102", date: "2026-05-01", amount: "$850.00", status: "Paid", method: "Direct Deposit" },
    { id: "PAY-103", date: "2026-04-01", amount: "$1,100.00", status: "Paid", method: "Direct Deposit" },
  ]);

  const [deficiencies, setDeficiencies] = useState([
    { id: "DEF-001", contractor: "Lightning Electric LLC", license: "ELEC-99821", state: "FL", issue: "Missing updated General Liability Insurance", status: "Open", daysActive: 12 },
    { id: "DEF-002", contractor: "Volt Masters", license: "HVAC-11234", state: "TX", issue: "Background check expired", status: "Pending Review", daysActive: 3 },
    { id: "DEF-003", contractor: "ProAir Services", license: "MECH-77421", state: "CA", issue: "Failed to report address change", status: "Open", daysActive: 8 },
  ]);
  const [isResolveDeficiencyOpen, setIsResolveDeficiencyOpen] = useState(false);
  const [selectedDeficiency, setSelectedDeficiency] = useState<any>(null);
  const [deficiencyFile, setDeficiencyFile] = useState<File | null>(null);
  const [isAddAffiliateOpen, setIsAddAffiliateOpen] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState<any>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

  const availableWidgets = [
    { id: 'total_network', title: 'Total Network', getValue: () => filteredContractors.length },
    { id: 'verified_qualifiers', title: 'Verified Qualifiers', getValue: () => filteredContractors.filter(c => c.isVerified).length },
    { id: 'upcoming_renewals', title: 'Upcoming Renewals (30d)', getValue: () => timelineData.filter(c => (new Date(c.renewalDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24) <= 30).length },
    { id: 'active_placements', title: 'Active Placements', getValue: () => 5 },
    { id: 'pending_docs', title: 'Blocking Documents', getValue: () => documentsList.filter(d => !d.isSigned && d.status === "Blocking").length },
    { id: 'recent_work_orders', title: 'Recent Work Orders', getValue: () => workOrders.filter(w => w.status === 'Pending').length, subtitle: 'Pending Approval' },
    { id: 'affiliate_performance', title: 'Total Referrals', getValue: () => affiliates.reduce((acc, curr) => acc + (curr.referrals || 0), 0), subtitle: 'From Active Affiliates' }
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedState, selectedTrade, licenseStatus, searchQuery, sequenceStatusFilter]);

  const [taxState, setTaxState] = useState("");
  const [taxCounty, setTaxCounty] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null);
  const stateTaxRates: Record<string, number> = {
    "CA": 0.0725, "TX": 0.0625, "FL": 0.06, "NY": 0.04, "NV": 0.0685, "WA": 0.065, "IL": 0.0625
  };
  const countyTaxRates: Record<string, Record<string, number>> = {
    "CA": { "Los Angeles": 0.095, "San Francisco": 0.08625, "San Diego": 0.0775 },
    "TX": { "Harris": 0.0825, "Dallas": 0.0825, "Travis": 0.0825 },
    "FL": { "Miami-Dade": 0.07, "Broward": 0.07, "Palm Beach": 0.07 },
    "NY": { "New York City": 0.08875, "Kings": 0.08875, "Queens": 0.08875 },
  };
  
  const handleCalculateTax = () => {
    if (taxState && taxAmount) {
      let rate = stateTaxRates[taxState] || 0.05;
      if (taxCounty && countyTaxRates[taxState]?.[taxCounty]) {
        rate = countyTaxRates[taxState][taxCounty];
      }
      setCalculatedTax(parseFloat(taxAmount) * rate);
    }
  };

  const handleExportFinanceCSV = () => {
    const financeTransactions = [
      { date: "2026-07-10", description: "Placement Fee - James Ortega", amount: "$7,000.00", status: "Paid" },
      { date: "2026-07-08", description: "Service Fee - Lightning Electric", amount: "$1,000.00", status: "Paid" },
      { date: "2026-07-05", description: "Affiliate Payout - TechRecruiters", amount: "-$1,400.00", status: "Processed" },
      { date: "2026-07-01", description: "Monthly Retainer - Volt Masters", amount: "$3,500.00", status: "Pending" }
    ];
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Description,Amount,Status\n"
      + financeTransactions.map(t => `${t.date},${t.description},${t.amount},${t.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finance_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Finance data exported to CSV");
  };

const handleGenerateTaxReport = () => {
    toast.success("Automated Tax Report generated and sent to your email.");
  };

  const handleExportMapData = () => {
    if (!selectedDrilldownState) return;
    const stateName = Object.keys(stateAbbreviations).find(k => stateAbbreviations[k] === selectedDrilldownState) || selectedDrilldownState;
    const stateContractors = filteredContractors.filter(c => c.location && c.location.some((loc: string) => stateAbbreviations[loc] === selectedDrilldownState));
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Trade,Classification,Status\n"
      + stateContractors.map((c: any) => `${c.name},${c.trades.join("; ")},${c.classification},${c.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${stateName}_contractors.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${stateName} analytics exported to CSV`);
  };

  const handleExportMapPdf = () => {
    if (!selectedDrilldownState) return;
    const stateName = Object.keys(stateAbbreviations).find(k => stateAbbreviations[k] === selectedDrilldownState) || selectedDrilldownState;
    toast.success(`${stateName} analytics exported to PDF`);
  };

  const handleSaveTheme = () => {
    localStorage.setItem('iqs_map_theme', mapTheme);
    toast.success("Map theme saved as default!");
  };

  const handleLoadTheme = () => {
    const savedTheme = localStorage.getItem('iqs_map_theme');
    if (savedTheme) {
        setMapTheme(savedTheme);
        toast.success("Saved map theme loaded!");
    } else {
        toast.error("No saved theme found.");
    }
  };

  const revenueProjectionData = [
    { month: 'Aug', actual: 45000, projected: 45000 },
    { month: 'Sep', actual: 52000, projected: 52000 },
    { month: 'Oct', actual: null, projected: 58000 },
    { month: 'Nov', actual: null, projected: 65000 },
    { month: 'Dec', actual: null, projected: 71000 },
    { month: 'Jan', actual: null, projected: 80000 },
  ];

  const handleFileUpload = (file: File | null) => {
    setNewDoc({...newDoc, file});
    if (file) {
      setIsExtracting(true);
      setExtractedData(false);
      setTimeout(() => {
        setIsExtracting(false);
        setExtractedData(true);
        setNewDoc(prev => ({
          ...prev,
          title: prev.title || file.name.replace('.pdf', ''),
          placement: prev.placement || "John Doe → Example Corp",
        }));
        toast.success("Document data extracted via OCR");
      }, 2000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file && (file.type === "application/pdf" || file.type.startsWith("image/"))) {
      handleFileUpload(file);
    } else if (file) {
      toast.error("Please upload a PDF or image file");
    }
  };

  useEffect(() => {
    if (isAnnotating && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, [isAnnotating, isPreviewModalOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (annotationTool === 'signature_field') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 75; // center of 150px
      const y = e.clientY - rect.top - 25; // center of 50px
      setSignatureFields(prev => [...prev, { id: Date.now(), x, y, assignee: "Qualifier" }]);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (annotationTool === "highlight") {
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
    } else {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (draggingField !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 75;
      const y = e.clientY - rect.top - 25;
      setSignatureFields(prev => prev.map(f => f.id === draggingField ? { ...f, x, y } : f));
    }
  };

  const handleContainerMouseUp = () => {
    setDraggingField(null);
  };

  const handleExportCSV = () => {
    const headers = ['name', 'email', 'phone', 'location', 'licenseNumber', 'classification', 'renewalDate', 'status', 'trades'];
    const csvContent = [
      headers.join(','),
      ...contractorsList.map(c => headers.map(h => {
        let val = (c as any)[h] || '';
        if (Array.isArray(val)) val = val.join(';');
        return `"${val}"`;
      }).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contractors.csv';
    link.click();
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      if (lines.length < 2) return;
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const newContractors = lines.slice(1).filter(l => l.trim()).map((line, idx) => {
        const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ""));
        const c: any = { id: Date.now() + idx, status: "Available", trades: [] };
        headers.forEach((h, i) => {
          if (h === 'trades') {
            c[h] = values[i] ? values[i].split(';').map(t => t.trim()).filter(Boolean) : [];
          } else {
            c[h] = values[i];
          }
        });
        c.initials = (c.name || "U K").split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
        return c;
      });
      setContractorsList([...contractorsList, ...newContractors]);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: [],
      licenseNumber: "",
      classification: "General Contractor",
      renewalDate: "",
      status: "Available",
      trades: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const contractorData = {
      name: values.name,
      initials: values.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      status: values.status,
      location: values.location,
      trades: values.trades.split(',').map(t => t.trim()).filter(Boolean),
      email: values.email || "",
      phone: values.phone || "",
      licenseNumber: values.licenseNumber,
      classification: values.classification,
      renewalDate: values.renewalDate,
      isVerified: false
    };

    if (editingId) {
      setContractorsList(contractorsList.map(c => 
        c.id === editingId ? { ...c, ...contractorData } : c
      ));
      setEditingId(null);
    } else {
      setContractorsList([...contractorsList, { ...contractorData, id: contractorsList.length + 1 }]);
    }
    setIsFormModalOpen(false);
    form.reset();
  };

  const handleDeleteContractor = (id: number) => {
    if (confirm("Are you sure you want to delete this qualifier?")) {
      setContractorsList(prev => prev.filter(c => c.id !== id));
      setSelectedContractor(null);
      toast.success("Qualifier deleted successfully");
    }
  };

  const handleBlacklistContractor = (id: number) => {
    if (confirm("Are you sure you want to blacklist this qualifier?")) {
      setContractorsList(prev => prev.map(c => c.id === id ? { ...c, status: "Blacklisted" } : c));
      setSelectedContractor(null);
      toast.success("Qualifier blacklisted successfully");
    }
  };

  const handleEditClick = (contractor: any) => {
    setEditingId(contractor.id);
    form.reset({
      name: contractor.name,
      email: contractor.email || "",
      phone: contractor.phone || "",
      location: Array.isArray(contractor.location) ? contractor.location : (contractor.location ? [contractor.location] : []),
      licenseNumber: contractor.licenseNumber || "",
      classification: contractor.classification || "General Contractor",
      renewalDate: contractor.renewalDate || "",
      status: contractor.status,
      trades: contractor.trades.join(", ")
    });
    setSelectedContractor(null);
    setIsFormModalOpen(true);
  };



  const handleAddClick = () => {
    setEditingId(null);
    form.reset({
      name: "", email: "", phone: "", location: [], licenseNumber: "", classification: "General Contractor", renewalDate: "", status: "Available", trades: ""
    });
    setIsFormModalOpen(true);
  };

  const maxDaysBefore = Math.max(0, ...sequenceSteps.filter(s => s.timingType === 'before').map(s => s.timing));
  const maxDaysAfter = Math.max(0, ...sequenceSteps.filter(s => s.timingType === 'after').map(s => s.timing));

  const getSequenceStatus = (contractor: any) => {
    if (!contractor.renewalDate || sequenceSteps.length === 0) return 'none';
    const date = new Date(contractor.renewalDate);
    const today = new Date();
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= maxDaysBefore && diffDays >= -maxDaysAfter) {
      return contractor.sequencePaused ? 'paused' : 'active';
    }
    return 'none';
  };

  const filteredContractors = contractorsList.filter(c => {
    const matchState = selectedState === "All states" || (Array.isArray(c.location) ? c.location.includes(selectedState) : c.location === selectedState);
    const matchTrade = selectedTrade === "All trades" || c.trades.includes(selectedTrade);
    const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchLicense = true;
    if (licenseStatus === "Overdue") {
      matchLicense = c.renewalDate ? new Date(c.renewalDate) < new Date() : false;
    } else if (licenseStatus === "Active") {
      matchLicense = c.renewalDate ? new Date(c.renewalDate) >= new Date() : true;
    }

    let matchSequence = true;
    if (sequenceStatusFilter !== "All statuses") {
      const status = getSequenceStatus(c);
      if (sequenceStatusFilter === "Active") matchSequence = status === 'active';
      else if (sequenceStatusFilter === "Paused") matchSequence = status === 'paused';
      else if (sequenceStatusFilter === "None") matchSequence = status === 'none';
    }

    let matchVetting = true;
    if (vettingFilter === "Verified") matchVetting = c.isVerified;
    if (vettingFilter === "Unverified") matchVetting = !c.isVerified;
    
    return matchState && matchTrade && matchSearch && matchLicense && matchSequence && matchVetting;
  }).sort((a, b) => {
    if (a.isVerified === b.isVerified) return 0;
    return a.isVerified ? -1 : 1;
  });

  const totalPages = Math.ceil(filteredContractors.length / ITEMS_PER_PAGE);
  const paginatedContractors = filteredContractors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const stateData = Object.entries(
    filteredContractors.reduce((acc, c) => {
      const loc = Array.isArray(c.location) ? c.location.join(", ") : (c.location || 'Unknown');
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);

  const tradeData = Object.entries(
    filteredContractors.reduce((acc, c) => {
      if (c.trades.length === 0) {
        acc['No Trade'] = (acc['No Trade'] || 0) + 1;
      }
      c.trades.forEach((t: string) => {
        acc[t] = (acc[t] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  const statusData = Object.entries(
    filteredContractors.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const PIE_COLORS = ['#6FD9EB', '#2F8198', '#f59e0b', '#ef4444', '#64748b'];

  const mapData = filteredContractors.reduce((acc, c) => {
    const locations = Array.isArray(c.location) ? c.location : (c.location ? [c.location] : []);
    locations.forEach(loc => {
      const stateCode = stateAbbreviations[loc] || loc;
      if (stateCode) {
        acc[stateCode] = (acc[stateCode] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const maxMapCount = Math.max(...Object.values(mapData), 1);

  const timelineData = [...filteredContractors]
    .filter(c => c.renewalDate)
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredContractors.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} contractors?`)) {
      setContractorsList(prev => prev.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  const handleBulkStatusUpdate = () => {
    setContractorsList(prev => prev.map(c => selectedIds.includes(c.id) ? { ...c, status: bulkStatus } : c));
    setIsBulkStatusModalOpen(false);
    setSelectedIds([]);
  };

  const handleBulkTradeUpdate = () => {
    const tradesList = bulkTrades.split(',').map(t => t.trim()).filter(Boolean);
    if (tradesList.length === 0) return;

    setContractorsList(prev => prev.map(c => {
      if (!selectedIds.includes(c.id)) return c;
      
      let newTrades = [...c.trades];
      if (bulkTradeAction === "add") {
        tradesList.forEach(t => {
          if (!newTrades.includes(t)) newTrades.push(t);
        });
      } else if (bulkTradeAction === "remove") {
        newTrades = newTrades.filter(t => !tradesList.includes(t));
      }
      
      return { ...c, trades: newTrades };
    }));
    
    setIsBulkTradeModalOpen(false);
    setSelectedIds([]);
    setBulkTrades("");
  };

  const handleSendReminder = (e: React.MouseEvent, contractor: any, type: "email" | "sms" = "email") => {
    e.stopPropagation();
    const replaceVars = (text: string) => {
      return text
        .replace(/\{\{name\}\}/g, contractor.name || '')
        .replace(/\{\{email\}\}/g, contractor.email || '')
        .replace(/\{\{licenseNumber\}\}/g, contractor.licenseNumber || '')
        .replace(/\{\{classification\}\}/g, contractor.classification || '')
        .replace(/\{\{renewalDate\}\}/g, contractor.renewalDate || '');
    };
    
    if (type === "email") {
      setCurrentCompose({
        type: "email",
        to: contractor.email || `${contractor.name.toLowerCase().replace(' ', '.')}@example.com`,
        subject: replaceVars(emailTemplate.subject),
        body: replaceVars(emailTemplate.body),
        contractorName: contractor.name
      });
    } else {
      setCurrentCompose({
        type: "sms",
        to: contractor.phone || "(555) 123-4567",
        subject: "",
        body: replaceVars(smsTemplate),
        contractorName: contractor.name
      });
    }
    setIsComposeModalOpen(true);
  };

  const handleSendAllReminders = () => {
    const upcoming = timelineData.filter(c => {
      const date = new Date(c.renewalDate);
      const daysUntil = (date.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
      return daysUntil <= 30;
    });
    
    if (upcoming.length === 0) {
      toast.info("No upcoming or overdue renewals within 30 days to send reminders for.");
      return;
    }
    
    const newLogs = upcoming.map((c, i) => ({
      id: Date.now() + i,
      date: new Date().toISOString(),
      action: "Sent Automated Email Reminder",
      contractorName: c.name,
      details: `Sent to ${(c as any).email || `${c.name.toLowerCase().replace(' ', '.')}@example.com`}`
    }));
    
    setActivityLogs(prev => [...newLogs, ...prev]);
    toast.success(`Sent automated reminders to ${upcoming.length} contractors using your template.`);
  };

  const handleSaveStep = () => {
    if (editingStep.id) {
      setSequenceSteps(prev => prev.map(s => s.id === editingStep.id ? editingStep : s));
    } else {
      setSequenceSteps(prev => [...prev, { ...editingStep, id: Date.now() }]);
    }
    setIsStepModalOpen(false);
  };

  const handleDeleteStep = (id: number) => {
    setSequenceSteps(prev => prev.filter(s => s.id !== id));
  };

  const sortedSteps = [...sequenceSteps].sort((a, b) => {
    const getVal = (s: any) => s.timingType === 'before' ? -s.timing : (s.timingType === 'after' ? s.timing : 0);
    return getVal(a) - getVal(b);
  });

  const renewalDates = filteredContractors
    .filter(c => c.renewalDate)
    .map(c => {
      const [y, m, d] = c.renewalDate.split('-');
      return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    });

  const contractorsOnSelectedDate = selectedCalendarDate
    ? filteredContractors.filter(c => {
        if (!c.renewalDate) return false;
        const [y, m, d] = c.renewalDate.split('-');
        return parseInt(y) === selectedCalendarDate.getFullYear() &&
               parseInt(m) - 1 === selectedCalendarDate.getMonth() &&
               parseInt(d) === selectedCalendarDate.getDate();
      })
    : [];

  const toggleSequencePause = (id: number) => {
    setContractorsList(prev => prev.map(c => 
      c.id === id ? { ...c, sequencePaused: !(c as any).sequencePaused } : c
    ));
    if (selectedContractor && selectedContractor.id === id) {
      const isPaused = !selectedContractor.sequencePaused;
      setSelectedContractor({ ...selectedContractor, sequencePaused: isPaused });
      toast.success(isPaused ? "Sequence paused" : "Sequence resumed");
    } else {
      // Find contractor to know current state for toast if not selected
      const c = contractorsList.find(c => c.id === id);
      if (c) toast.success(!(c as any).sequencePaused ? "Sequence paused" : "Sequence resumed");
    }
  };

  return (
    <Layout>
      {role === 'Client' ? (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
            <h1 className="text-3xl font-bold text-foreground mb-2">My License Progress</h1>
            <p className="text-muted-foreground">Track the status of your license application and required documents.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <h3 className="text-lg font-semibold mb-4">Application Milestones</h3>
                <div className="relative border-l border-muted-foreground/30 ml-3 space-y-8 pb-4">
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-emerald-50"></div>
                    <h4 className="font-semibold text-foreground">Qualifier Matched</h4>
                    <p className="text-sm text-muted-foreground mt-1">James Ortega has been matched to your placement.</p>
                    <span className="text-xs text-muted-foreground mt-2 block">Completed: Oct 12, 2025</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-emerald-50"></div>
                    <h4 className="font-semibold text-foreground">Agreements Signed</h4>
                    <p className="text-sm text-muted-foreground mt-1">All initial agreements signed by both parties.</p>
                    <span className="text-xs text-muted-foreground mt-2 block">Completed: Oct 18, 2025</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-primary/20"></div>
                    <h4 className="font-semibold text-primary">State Application Submitted</h4>
                    <p className="text-sm text-muted-foreground mt-1">Awaiting state board review and approval.</p>
                    <span className="text-xs text-primary font-medium mt-2 block">In Progress (Expected ~3-4 weeks)</span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-muted rounded-full -left-[6.5px] top-1.5"></div>
                    <h4 className="font-semibold text-muted-foreground">License Issued</h4>
                    <p className="text-sm text-muted-foreground mt-1">Final license number issued by the state.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <h3 className="text-lg font-semibold mb-4">Action Required</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <FileSignature className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 text-sm">Sign Authorization Form</h4>
                        <p className="text-xs text-amber-700 mt-1">Required before we can submit your application to the state board.</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">Review & Sign</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <h3 className="text-lg font-semibold mb-4">Your Qualifier</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                    JO
                  </div>
                  <div>
                    <h4 className="font-bold">James Ortega</h4>
                    <p className="text-sm text-muted-foreground">Electrical Contractor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : role === 'Vendor' && viewMode !== 'map' ? (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Vendor Portal</h1>
              <p className="text-muted-foreground">Manage your placements, licenses, and renewals.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsAddDocModalOpen(true)}>
                <Upload className="w-4 h-4 mr-2" /> Upload License
              </Button>
              <Button onClick={() => setIsAddDocModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> Request Document
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/50 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">My Active Licenses</h3>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">3 Active</Badge>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>State</TableHead>
                      <TableHead>Classification</TableHead>
                      <TableHead>License #</TableHead>
                      <TableHead>Renewal Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">FL</div>
                          Florida
                        </div>
                      </TableCell>
                      <TableCell>Electrical Contractor</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">EC13008455</TableCell>
                      <TableCell>Aug 31, 2026</TableCell>
                      <TableCell><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold">TX</div>
                          Texas
                        </div>
                      </TableCell>
                      <TableCell>Master Electrician</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">ME44219</TableCell>
                      <TableCell>Dec 15, 2026</TableCell>
                      <TableCell><Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs font-bold">CA</div>
                          California
                        </div>
                      </TableCell>
                      <TableCell>C-10 Electrical</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">C10-998211</TableCell>
                      <TableCell className="text-rose-600 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Oct 15, 2025</TableCell>
                      <TableCell><Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">Expiring Soon</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                <div className="p-6 border-b border-border/50">
                  <h3 className="text-lg font-semibold">Active Placements</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Placement</TableHead>
                      <TableHead>Qualifier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pending Docs</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Lightning Electric</TableCell>
                      <TableCell>James Ortega</TableCell>
                      <TableCell><Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Processing</Badge></TableCell>
                      <TableCell><span className="text-amber-600 font-medium">1 pending</span></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Volt Masters</TableCell>
                      <TableCell>Angela Torres</TableCell>
                      <TableCell><Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none">Onboarding</Badge></TableCell>
                      <TableCell><span className="text-red-600 font-medium">3 blocking</span></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-primary" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-md bg-rose-50 border border-rose-100">
                    <div className="mt-0.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-rose-900">CA License Renewal</p>
                      <p className="text-xs text-rose-700 mt-1">Due in 30 days. CE credits required.</p>
                      <Button size="sm" variant="outline" className="mt-3 bg-white text-rose-700 border-rose-200 hover:bg-rose-50 w-full h-8 text-xs">Start Renewal</Button>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-md border border-border/50">
                    <div className="mt-0.5">
                      <ShieldAlert className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">General Liability Insurance</p>
                      <p className="text-xs text-muted-foreground mt-1">Expires Dec 31, 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileSignature className="w-4 h-4 text-primary" />
                    Pending Signatures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Liability Waiver</p>
                        <p className="text-xs text-muted-foreground">Lightning Electric</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Sign</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="relative bg-white rounded-xl shadow-sm border border-border/50 p-8 overflow-hidden min-h-[500px] flex items-center justify-center mt-8">
             {/* Blurred Map Background */}
             <div className="absolute inset-0 filter blur-md opacity-50 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                <div className="w-full h-full bg-slate-100 dark:bg-slate-900 grid grid-cols-12 gap-4 p-8">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-slate-300 dark:bg-slate-700 rounded-md h-16 opacity-20"></div>
                  ))}
                </div>
             </div>
             
             {/* Paywall Overlay */}
             <div className="relative z-10 flex flex-col items-center justify-center text-center py-10 px-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                   <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Unlock the Reciprocity Map</h3>
                <p className="text-lg text-muted-foreground max-w-lg mb-8">
                  Discover licensing reciprocity across all 50 states, analyze contractor density, and identify high-potential expansion markets.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full text-left">
                   <Card className="border-border/50 bg-white dark:bg-slate-950 shadow-sm">
                      <CardHeader>
                         <CardTitle>Monthly Pass</CardTitle>
                         <div className="text-3xl font-bold mt-2">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                      </CardHeader>
                      <CardContent>
                         <ul className="text-sm space-y-3 mb-6">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Full 50-state reciprocity data</span></li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Contractor density heatmaps</span></li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>State-by-state requirements</span></li>
                         </ul>
                         <Button className="w-full" onClick={() => setIsSubscribeModalOpen(true)}>Subscribe Monthly</Button>
                      </CardContent>
                   </Card>
                   
                   <Card className="border-primary bg-primary/5 dark:bg-primary/10 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                        BEST VALUE
                      </div>
                      <CardHeader>
                         <CardTitle>Annual Pass</CardTitle>
                         <div className="text-3xl font-bold mt-2">$470<span className="text-sm text-muted-foreground font-normal">/yr</span></div>
                         <p className="text-sm text-primary font-medium mt-1">Save 20%</p>
                      </CardHeader>
                      <CardContent>
                         <ul className="text-sm space-y-3 mb-6">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Everything in Monthly</span></li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Priority PDF exports</span></li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Early access to new states</span></li>
                         </ul>
                         <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsSubscribeModalOpen(true)}>Subscribe Annually</Button>
                      </CardContent>
                   </Card>
                </div>
             </div>
          </div>
        </div>
      ) : role === 'Qualifier' ? (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Qualifier Profile</h1>
              <p className="text-muted-foreground">Manage your availability, licenses, and verification status.</p>
            </div>
            <Button variant="outline" onClick={() => toast.success("Profile saved successfully")}>
              Save Changes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1">
                    <ShieldCheck className="w-4 h-4" /> Verified Qualifier
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="James Ortega" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Availability Status</label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue="Available"
                    >
                      <option value="Available">Available for Placement</option>
                      <option value="Unavailable">Unavailable (Currently Placed)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="james.ortega@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input defaultValue="(555) 123-4567" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">License Classifications</h3>
                  <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" /> Add License</Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex justify-between items-center bg-muted/10">
                    <div>
                      <h4 className="font-semibold">Electrical Contractor (Unlimited)</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3" /> Florida
                        <span className="mx-1">•</span>
                        <Hash className="w-3 h-3" /> LIC-998877
                      </p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Active</Badge>
                  </div>
                  <div className="p-4 border rounded-lg flex justify-between items-center bg-muted/10">
                    <div>
                      <h4 className="font-semibold">General Building</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3" /> Texas
                        <span className="mx-1">•</span>
                        <Hash className="w-3 h-3" /> TX-554433
                      </p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Document Vault</h3>
                  <Button size="sm" variant="outline"><Upload className="w-4 h-4 mr-2" /> Upload</Button>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Securely store your certifications, insurance, and identification documents.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">General Liability Insurance <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200 text-[10px]">Expiring Soon</Badge></p>
                        <p className="text-xs text-muted-foreground">Expires: Next Month</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setDocToPreview({ title: "General Liability Insurance", placement: "Vault Document" }); setIsPreviewModalOpen(true); }}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">State ID / Driver's License</p>
                        <p className="text-xs text-muted-foreground">Uploaded: Jan 2025</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setDocToPreview({ title: "State ID / Driver's License", placement: "Vault Document" }); setIsPreviewModalOpen(true); }}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/10">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">OSHA 30 Certification</p>
                        <p className="text-xs text-muted-foreground">Never expires</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setDocToPreview({ title: "OSHA 30 Certification", placement: "Vault Document" }); setIsPreviewModalOpen(true); }}><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Verified qualifiers appear at the top of search results and are placed faster. Requirements must be renewed every 6 months.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-emerald-50/50 border-emerald-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-sm">Background Check</p>
                        <p className="text-xs text-muted-foreground">{backgroundCheckStatus}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => setIsBackgroundModalOpen(true)}>Renew</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-emerald-50/50 border-emerald-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-sm">Credit Report</p>
                        <p className="text-xs text-muted-foreground">Valid until Dec 2026</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-emerald-50/50 border-emerald-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-sm">Payment Method</p>
                        <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => setIsPaymentModalOpen(true)}>Update</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8">

        {/* Compliance Alerts (Compliance Manager Only) */}
        {role === 'Compliance Manager' && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 shadow-sm mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-rose-900 mb-1">Compliance Action Required</h3>
                  <p className="text-sm text-rose-700 mb-4">You have 3 licenses expiring within 30 days and 2 missing insurance certificates.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-white text-rose-700 border-rose-200 hover:bg-rose-100 cursor-pointer">
                      Review Expiring (3)
                    </Badge>
                    <Badge variant="outline" className="bg-white text-rose-700 border-rose-200 hover:bg-rose-100 cursor-pointer">
                      Missing Docs (2)
                    </Badge>
                  </div>
                </div>
              </div>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white shadow-sm">
                Take Action
              </Button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-4 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                [NETWORK]
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Qualifier network</h1>
              <p className="text-muted-foreground">Browse, filter, and place qualifiers across state and trade.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative h-9 w-9">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
                    <span className="font-semibold text-sm">Notifications</span>
                    <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}>
                      Mark all read
                    </Button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-border/50 last:border-0 hover:bg-muted/50 cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`} onClick={() => setNotifications(prev => prev.map(notif => notif.id === n.id ? {...notif, read: true} : notif))}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-sm">{n.title}</span>
                          <span className="text-xs text-muted-foreground">{new Date(n.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{n.message}</p>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-muted-foreground text-sm">No notifications</div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleImportCSV} />
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" /> Import
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsTemplateModalOpen(true)}>
                <Mail className="w-4 h-4 mr-2" /> Templates
              </Button>
              <Button size="sm" onClick={handleAddClick}>
                <Plus className="w-4 h-4 mr-2" /> Add Contractor
              </Button>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            {filteredContractors.length} IN NETWORK
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-border/50 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">State</label>
              <div className="relative">
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>All states</option>
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                  <option>Kentucky</option>
                  <option>Louisiana</option>
                  <option>Maine</option>
                  <option>Maryland</option>
                  <option>Massachusetts</option>
                  <option>Michigan</option>
                  <option>Minnesota</option>
                  <option>Mississippi</option>
                  <option>Missouri</option>
                  <option>Montana</option>
                  <option>Nebraska</option>
                  <option>Nevada</option>
                  <option>New Hampshire</option>
                  <option>New Jersey</option>
                  <option>New Mexico</option>
                  <option>New York</option>
                  <option>North Carolina</option>
                  <option>North Dakota</option>
                  <option>Ohio</option>
                  <option>Oklahoma</option>
                  <option>Oregon</option>
                  <option>Pennsylvania</option>
                  <option>Rhode Island</option>
                  <option>South Carolina</option>
                  <option>South Dakota</option>
                  <option>Tennessee</option>
                  <option>Texas</option>
                  <option>Utah</option>
                  <option>Vermont</option>
                  <option>Virginia</option>
                  <option>Washington</option>
                  <option>West Virginia</option>
                  <option>Wisconsin</option>
                  <option>Wyoming</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Trade</label>
              <div className="relative">
                <select 
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>All trades</option>
                  <option>Construction</option>
                  <option>HVAC</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">License Status</label>
              <div className="relative">
                <select 
                  value={licenseStatus}
                  onChange={(e) => setLicenseStatus(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>All statuses</option>
                  <option>Active</option>
                  <option>Overdue</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Sequence Status</label>
              <div className="relative">
                <select 
                  value={sequenceStatusFilter}
                  onChange={(e) => setSequenceStatusFilter(e.target.value)}
                  className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>All statuses</option>
                  <option>Active</option>
                  <option>Paused</option>
                  <option>None</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Search</label>
              <Input 
                placeholder="Name or email" 
                className="bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AVAILABILITY</span>
              <div className="flex bg-muted/50 p-1 rounded-full">
                <button className="px-4 py-1.5 text-sm font-medium rounded-full bg-primary text-primary-foreground shadow-sm">All</button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground">Available</button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground">Unavailable</button>
                <button className="px-4 py-1.5 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground">Blacklisted</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">VETTING</span>
              <div className="flex bg-muted/50 p-1 rounded-full">
                <button className={`px-4 py-1.5 text-sm font-medium rounded-full ${vettingFilter === 'All' ? 'bg-sidebar-bg text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setVettingFilter('All')}>All</button>
                <button className={`px-4 py-1.5 text-sm font-medium rounded-full ${vettingFilter === 'Verified' ? 'bg-sidebar-bg text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setVettingFilter('Verified')}>Verified</button>
                <button className={`px-4 py-1.5 text-sm font-medium rounded-full ${vettingFilter === 'Unverified' ? 'bg-sidebar-bg text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setVettingFilter('Unverified')}>Unverified</button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Tag & View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              [RESULTS]
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer" onClick={() => handleSelectAll(selectedIds.length !== filteredContractors.length || filteredContractors.length === 0)}>
              <Checkbox 
                checked={filteredContractors.length > 0 && selectedIds.length === filteredContractors.length}
                onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              />
              <label className="cursor-pointer select-none">Select All</label>
            </div>
          </div>
          <div className="flex items-center bg-muted/50 p-1 rounded-md">
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('table')}
            >
              <List className="w-4 h-4" />
            </button>
            {['Super Admin', 'Admin', 'Employee', 'Sales', 'Vendor'].includes(role) && (
              <button 
                className={`p-1.5 rounded-sm transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setViewMode('map')}
              >
                <Map className="w-4 h-4" />
              </button>
            )}
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'pipeline' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('pipeline')}
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'calendar' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarDays className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'scheduling' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('scheduling')}
            >
              <CalendarClock className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'activity' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('activity')}
            >
              <Activity className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'automation' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('automation')}
            >
              <Workflow className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'analytics' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('analytics')}
            >
              <BarChartIcon className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'timeline' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('timeline')}
            >
              <Clock className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'documents' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('documents')}
            >
              <FileSignature className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'fees' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('fees')}
            >
              <Landmark className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'library' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('library')}
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-sm transition-colors ${viewMode === 'invoices' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setViewMode('invoices')}
            >
              <Receipt className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'library' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> IQS Master Library</h3>
                <p className="text-sm text-muted-foreground mt-1">Rent digital books, manage notes, and take practice exams.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddBookModalOpen(true)}><Plus className="w-4 h-4 mr-2" /> Add Book</Button>
                <Button variant="outline" onClick={() => toast.info("Your notes will appear here.")}><Bookmark className="w-4 h-4 mr-2" /> My Notes</Button>
                <Button variant="outline" onClick={() => setViewMode('flashcards')}><BookOpen className="w-4 h-4 mr-2" /> Flashcards</Button>
                <Button onClick={() => setViewMode('exams')}><GraduationCap className="w-4 h-4 mr-2" /> Practice Exams</Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-border/50 shadow-sm max-w-md">
              <Search className="w-5 h-5 text-muted-foreground ml-2" />
              <input 
                type="text" 
                placeholder="Search books by title or category..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                value={librarySearchQuery}
                onChange={(e) => setLibrarySearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {libraryBooks.filter(book => book.title.toLowerCase().includes(librarySearchQuery.toLowerCase()) || book.category.toLowerCase().includes(librarySearchQuery.toLowerCase())).map(book => (
                <div key={book.id} className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden flex flex-col">
                  <div className="h-48 relative overflow-hidden bg-slate-100 flex items-center justify-center">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900 border-none">{book.category}</Badge>
                    {book.status === "Inactive" && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                        <LockKeyhole className="w-10 h-10 text-white/50" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h4>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      {book.status === "Active" ? (
                        <>
                          <div className="text-xs text-muted-foreground">
                            <span className="block text-emerald-600 font-medium mb-0.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Rented</span>
                            Renews {book.expires}
                          </div>
                          <Button size="sm" onClick={() => {
                            setDocToPreview({ title: book.title, placement: "IQS Master Library", file: book.file });
                            setIsPreviewModalOpen(true);
                          }}>Read & Annotate</Button>
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-bold">{book.price}</div>
                          <Button size="sm" variant="outline" onClick={() => setIsPaymentModalOpen(true)}><LockKeyhole className="w-3 h-3 mr-2" /> Rent Access</Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : viewMode === 'flashcards' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Flashcards</h3>
                <p className="text-sm text-muted-foreground mt-1">Review key concepts and definitions.</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsDeckBuilderOpen(true)} className="bg-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" /> Create Deck
                </Button>
                <Button variant="outline" onClick={() => setViewMode('library')}><BookOpen className="w-4 h-4 mr-2" /> Back to Library</Button>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <div className="mb-4 text-sm text-muted-foreground font-medium">Card {currentFlashcardIndex + 1} of {flashcards.length}</div>
              
              <div 
                className="w-full h-80 perspective-1000 cursor-pointer" 
                onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
              >
                <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlashcardFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden bg-white border border-border/50 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center ${isFlashcardFlipped ? 'opacity-0' : 'opacity-100'}`}>
                    <h4 className="text-2xl font-semibold text-foreground">{flashcards[currentFlashcardIndex].front}</h4>
                    <p className="absolute bottom-6 text-sm text-muted-foreground">Click to flip</p>
                  </div>
                  {/* Back */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden bg-primary/10 border border-primary/20 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center rotate-y-180 ${!isFlashcardFlipped ? 'opacity-0' : 'opacity-100'}`}>
                    <h4 className="text-xl font-medium text-foreground">{flashcards[currentFlashcardIndex].back}</h4>
                    <p className="absolute bottom-6 text-sm text-primary">Click to flip back</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 w-full max-w-md justify-center">
                {!isFlashcardFlipped ? (
                  <Button 
                    className="w-full"
                    onClick={() => setIsFlashcardFlipped(true)}
                  >
                    Show Answer
                  </Button>
                ) : (
                  <div className="flex gap-3 w-full animate-in slide-in-from-bottom-2 fade-in">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => {
                        toast.success("Scheduled for sooner review");
                        setIsFlashcardFlipped(false);
                        setTimeout(() => setCurrentFlashcardIndex(prev => Math.min(flashcards.length - 1, prev + 1)), 150);
                      }}
                    >
                      Hard <span className="text-xs ml-1 opacity-50">(1m)</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => {
                        toast.success("Scheduled for normal review");
                        setIsFlashcardFlipped(false);
                        setTimeout(() => setCurrentFlashcardIndex(prev => Math.min(flashcards.length - 1, prev + 1)), 150);
                      }}
                    >
                      Good <span className="text-xs ml-1 opacity-50">(10m)</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => {
                        toast.success("Scheduled for later review");
                        setIsFlashcardFlipped(false);
                        setTimeout(() => setCurrentFlashcardIndex(prev => Math.min(flashcards.length - 1, prev + 1)), 150);
                      }}
                    >
                      Easy <span className="text-xs ml-1 opacity-50">(4d)</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : viewMode === 'invoices' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-border/50">
              <div>
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Receipt className="w-6 h-6 text-primary" /> Invoice Builder</h2>
                <p className="text-muted-foreground mt-1">Create and manage branded IQS invoices.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsInvoiceHistoryOpen(true)}>
                  <History className="w-4 h-4 mr-2" /> History
                </Button>
                <Button variant="outline" onClick={() => {
                  toast.success(`Invoice sent to ${invoiceData.clientName}`);
                  const newHistory = [{
                    id: `INV-${Date.now().toString().slice(-4)}`,
                    client: invoiceData.clientName,
                    amount: (invoiceData.monthlyPrice * 2) + invoiceData.serviceFee + invoiceData.additionalItems.reduce((acc, item) => acc + item.amount, 0),
                    date: new Date().toISOString().split('T')[0],
                    status: 'Sent'
                  }, ...invoiceHistory];
                  setInvoiceHistory(newHistory);
                }}>
                  <Send className="w-4 h-4 mr-2" /> Send Invoice
                </Button>
                <Button className="bg-primary text-primary-foreground" onClick={() => {
                  toast.success("Invoice saved as PDF");
                  const newHistory = [{
                    id: `INV-${Date.now().toString().slice(-4)}`,
                    client: invoiceData.clientName,
                    amount: (invoiceData.monthlyPrice * 2) + invoiceData.serviceFee + invoiceData.additionalItems.reduce((acc, item) => acc + item.amount, 0),
                    date: new Date().toISOString().split('T')[0],
                    status: 'Downloaded'
                  }, ...invoiceHistory];
                  setInvoiceHistory(newHistory);
                }}>
                  <Download className="w-4 h-4 mr-2" /> Save PDF
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Controls */}
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 space-y-6 col-span-1 h-fit">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Invoice Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Client Name</Label>
                      <Input 
                        value={invoiceData.clientName} 
                        onChange={e => setInvoiceData({...invoiceData, clientName: e.target.value})} 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Monthly Agreed Price ($)</Label>
                        <Input 
                          type="number" 
                          value={invoiceData.monthlyPrice} 
                          onChange={e => setInvoiceData({...invoiceData, monthlyPrice: parseFloat(e.target.value) || 0})} 
                        />
                        <p className="text-xs text-muted-foreground">Placement fee = 2x Monthly</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Service Fee ($)</Label>
                        <Input 
                          type="number" 
                          value={invoiceData.serviceFee} 
                          onChange={e => setInvoiceData({...invoiceData, serviceFee: parseFloat(e.target.value) || 0})} 
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border/50">
                      <div className="flex justify-between items-center">
                        <Label>Additional Line Items</Label>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs"
                          onClick={() => setInvoiceData({
                            ...invoiceData, 
                            additionalItems: [...invoiceData.additionalItems, { id: Date.now(), description: "New Item", amount: 0 }]
                          })}
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add Item
                        </Button>
                      </div>
                      
                      {invoiceData.additionalItems.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-start mt-2">
                          <div className="flex-1 space-y-2">
                            <Input 
                              placeholder="Description" 
                              value={item.description}
                              onChange={e => {
                                const newItems = [...invoiceData.additionalItems];
                                newItems[index].description = e.target.value;
                                setInvoiceData({...invoiceData, additionalItems: newItems});
                              }}
                            />
                          </div>
                          <div className="w-24 space-y-2">
                            <Input 
                              type="number" 
                              placeholder="Amount" 
                              value={item.amount}
                              onChange={e => {
                                const newItems = [...invoiceData.additionalItems];
                                newItems[index].amount = parseFloat(e.target.value) || 0;
                                setInvoiceData({...invoiceData, additionalItems: newItems});
                              }}
                            />
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              const newItems = invoiceData.additionalItems.filter(i => i.id !== item.id);
                              setInvoiceData({...invoiceData, additionalItems: newItems});
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border/50">
                      <Label>Due Date</Label>
                      <Input 
                        type="date" 
                        value={invoiceData.dueDate} 
                        onChange={e => setInvoiceData({...invoiceData, dueDate: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea 
                        value={invoiceData.notes}
                        onChange={e => setInvoiceData({...invoiceData, notes: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-border/50 p-0 col-span-1 xl:col-span-2 overflow-hidden">
                <div className="p-10 text-slate-900 min-h-[600px] flex flex-col bg-white">
                  {/* Header */}
                  <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
                    <div>
                      <div className="mb-4">
                        <img src="https://vibe.filesafe.space/1783350442961167380/attachments/e73efa72-5bce-4447-8a3d-493aafd0ecec.png" alt="IQS Logo" className="h-12 object-contain" />
                      </div>
                      <p className="text-slate-500 text-sm">International Qualifier Search</p>
                      <p className="text-slate-500 text-sm">123 Compliance Way, Suite 100</p>
                      <p className="text-slate-500 text-sm">contact@internationalqualifiersearch.com</p>
                      <p className="text-[#2F8198] text-xs mt-2 max-w-xs italic font-medium">Mission: To seamlessly connect qualified professionals with companies needing licensure, ensuring compliance and operational success.</p>
                    </div>
                    <div className="text-right">
                      <h1 className="text-4xl font-light text-slate-300 mb-2">INVOICE</h1>
                      <p className="font-medium text-slate-900">INV-2026-089</p>
                      <p className="text-slate-500 text-sm mt-2">Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-slate-500 text-sm">Due: {new Date(invoiceData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  {/* Bill To */}
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Bill To</p>
                    <p className="font-medium text-lg">{invoiceData.clientName || "Client Name"}</p>
                    <p className="text-slate-500 text-sm">Attn: Accounts Payable</p>
                  </div>

                  {/* Table */}
                  <div className="flex-1">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-800 text-sm">
                          <th className="py-3 font-semibold text-slate-800">Description</th>
                          <th className="py-3 font-semibold text-slate-800 text-right">Qty</th>
                          <th className="py-3 font-semibold text-slate-800 text-right">Rate</th>
                          <th className="py-3 font-semibold text-slate-800 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="py-4">
                            <p className="font-medium">Qualifier Placement Fee</p>
                            <p className="text-sm text-slate-500 mt-1">Initial matching and compliance verification (2x Monthly)</p>
                          </td>
                          <td className="py-4 text-right">1</td>
                          <td className="py-4 text-right">${(invoiceData.monthlyPrice * 2).toFixed(2)}</td>
                          <td className="py-4 text-right font-medium">${(invoiceData.monthlyPrice * 2).toFixed(2)}</td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-4">
                            <p className="font-medium">Service Fee</p>
                            <p className="text-sm text-slate-500 mt-1">Standard placement service fee</p>
                          </td>
                          <td className="py-4 text-right">1</td>
                          <td className="py-4 text-right">${invoiceData.serviceFee.toFixed(2)}</td>
                          <td className="py-4 text-right font-medium">${invoiceData.serviceFee.toFixed(2)}</td>
                        </tr>
                        {invoiceData.additionalItems.map((item) => (
                          <tr key={item.id} className="border-b border-slate-200">
                            <td className="py-4">
                              <p className="font-medium">{item.description || "Item Description"}</p>
                            </td>
                            <td className="py-4 text-right">1</td>
                            <td className="py-4 text-right">${item.amount.toFixed(2)}</td>
                            <td className="py-4 text-right font-medium">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="w-1/2 ml-auto mt-8">
                    <div className="flex justify-between py-2 text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span>${(
                        (invoiceData.monthlyPrice * 2) + 
                        invoiceData.serviceFee + 
                        invoiceData.additionalItems.reduce((acc, curr) => acc + curr.amount, 0)
                      ).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm border-b border-slate-200">
                      <span className="text-slate-500">Tax (0%)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between py-4 text-lg font-bold text-[#2F8198]">
                      <span>Total Due</span>
                      <span>${(
                        (invoiceData.monthlyPrice * 2) + 
                        invoiceData.serviceFee + 
                        invoiceData.additionalItems.reduce((acc, curr) => acc + curr.amount, 0)
                      ).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500 whitespace-pre-line">
                    <p className="mb-2">{invoiceData.notes}</p>
                    <p>Please make payments payable to IQS LLC.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : viewMode === 'exams' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary" /> Practice Exams</h3>
                <p className="text-sm text-muted-foreground mt-1">Test your knowledge before the real state exam.</p>
              </div>
              <Button variant="outline" onClick={() => setViewMode('library')}><BookOpen className="w-4 h-4 mr-2" /> Back to Library</Button>
            </div>

            <Tabs value={examTab} onValueChange={setExamTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="available">Available Exams</TabsTrigger>
                <TabsTrigger value="progress">My Progress</TabsTrigger>
                <TabsTrigger value="groups">Study Groups</TabsTrigger>
                <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="mt-0">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">Select a practice exam below or generate a custom one.</p>
                  <Button onClick={() => setIsAiExamModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Sparkles className="w-4 h-4 mr-2" /> Generate with AI
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 1, title: "IBC General Knowledge Test", questions: 50, duration: "60 mins", score: "85%", date: "Last taken 2 days ago", icon: BookOpen },
                    { id: 2, title: "Florida Business & Finance", questions: 120, duration: "180 mins", score: null, date: "Not started", icon: Landmark },
                    { id: 3, title: "NEC Master Electrician Mock", questions: 100, duration: "150 mins", score: "62%", date: "Needs review", icon: Briefcase },
                    { id: 4, title: "OSHA Safety Standards", questions: 30, duration: "45 mins", score: "100%", date: "Passed", icon: ShieldCheck },
                  ].map(exam => (
                    <div key={exam.id} className="bg-white p-5 rounded-xl border border-border/50 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-colors">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <exam.icon className="w-5 h-5" />
                          </div>
                          {exam.score ? (
                            <Badge variant="outline" className={parseInt(exam.score) >= 75 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}>
                              {exam.score}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600">New</Badge>
                          )}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{exam.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-3">
                          <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {exam.questions} Questions</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.duration}</span>
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{exam.date}</span>
                        <Button size="sm" onClick={() => toast.info("Starting practice exam...")}>
                          {exam.score ? "Retake Exam" : "Start Exam"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="progress" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Average Score</p>
                    <h3 className="text-2xl font-bold mt-1">82%</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Exams Taken</p>
                    <h3 className="text-2xl font-bold mt-1">12</h3>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Study Time</p>
                    <h3 className="text-2xl font-bold mt-1">14h 30m</h3>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-border/50 shadow-sm">
                  <h4 className="font-semibold mb-4">Score Progression</h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={examProgressData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="score" stroke="#2F8198" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="groups" className="mt-0 space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border/50 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-lg">Collaborative Study Groups</h4>
                    <p className="text-sm text-muted-foreground">Join a group to study together, share notes, and take team mock exams.</p>
                  </div>
                  <Button onClick={() => toast.success("Create new group modal opened")}>
                    <Plus className="w-4 h-4 mr-2" /> Create Group
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 1, name: "Florida GC Prep 2026", members: 12, topic: "Business & Finance", nextSession: "Tomorrow, 6:00 PM EST", active: true },
                    { id: 2, name: "Master Electricians Network", members: 45, topic: "NEC 2023", nextSession: "Saturday, 10:00 AM EST", active: false },
                    { id: 3, name: "OSHA Safety Circle", members: 8, topic: "Safety Standards", nextSession: "Today, 8:00 PM EST", active: true },
                  ].map(group => (
                    <div key={group.id} className="bg-white p-5 rounded-xl border border-border/50 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                                U{i}
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center text-xs font-medium text-primary">
                              +{group.members - 3}
                            </div>
                          </div>
                          {group.active && (
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live Now
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-bold text-lg mb-1">{group.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                          <BookOpen className="w-3.5 h-3.5" /> {group.topic}
                        </p>
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {group.nextSession}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border/50 flex gap-2">
                        <Button className="flex-1" variant={group.active ? "default" : "outline"} onClick={() => toast.success(`Joined ${group.name}`)}>
                          {group.active ? "Join Session" : "View Group"}
                        </Button>
                        {group.active && (
                          <Button variant="outline" size="icon" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" onClick={() => setIsWhiteboardOpen(true)}>
                            <PenTool className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0 space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border/50 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-lg">Exam Performance Analytics</h4>
                    <p className="text-sm text-muted-foreground">Deep dive into your strengths and weaknesses across all subjects.</p>
                  </div>
                  <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Overall Readiness</p>
                    <h3 className="text-2xl font-bold mt-1 text-emerald-600">88%</h3>
                    <p className="text-xs text-muted-foreground mt-2">↑ 5% from last month</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Strongest Subject</p>
                    <h3 className="text-xl font-bold mt-1">OSHA Safety</h3>
                    <p className="text-xs text-muted-foreground mt-2">100% Avg Score</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Needs Improvement</p>
                    <h3 className="text-xl font-bold mt-1">NEC 2023</h3>
                    <p className="text-xs text-muted-foreground mt-2">62% Avg Score</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm">
                    <p className="text-sm text-muted-foreground font-medium">Total Questions Answered</p>
                    <h3 className="text-2xl font-bold mt-1">1,450</h3>
                    <p className="text-xs text-muted-foreground mt-2">Top 15% of users</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-border/50 shadow-sm">
                    <h4 className="font-semibold mb-4">Performance by Category</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Business & Finance', score: 85 },
                          { name: 'OSHA Safety', score: 100 },
                          { name: 'NEC Code', score: 62 },
                          { name: 'IBC General', score: 85 },
                          { name: 'State Specific', score: 78 }
                        ]} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                          <RechartsTooltip cursor={{fill: 'transparent'}} />
                          <Bar dataKey="score" fill="#2F8198" radius={[0, 4, 4, 0]}>
                            {
                              [85, 100, 62, 85, 78].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry >= 80 ? '#10b981' : entry >= 70 ? '#f59e0b' : '#ef4444'} />
                              ))
                            }
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-border/50 shadow-sm">
                    <h4 className="font-semibold mb-4">Time Spent Studying</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { day: 'Mon', hours: 2.5 },
                          { day: 'Tue', hours: 3.0 },
                          { day: 'Wed', hours: 1.5 },
                          { day: 'Thu', hours: 4.0 },
                          { day: 'Fri', hours: 2.0 },
                          { day: 'Sat', hours: 5.5 },
                          { day: 'Sun', hours: 6.0 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <RechartsTooltip />
                          <Line type="monotone" dataKey="hours" stroke="#6FD9EB" strokeWidth={3} dot={{r: 4, fill: '#6FD9EB'}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : viewMode === 'pipeline' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8 h-[calc(100vh-250px)] min-h-[600px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">Applicant Pipeline</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage qualifier applicants through the vetting process.</p>
              </div>
              <Button><Plus className="w-4 h-4 mr-2" /> Add Applicant</Button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-6 h-full min-w-max pb-4">
                {pipelineStages.map(stage => {
                  const stageApplicants = applicantsList.filter(a => a.stage === stage);
                  return (
                    <div key={stage} className="w-80 flex flex-col bg-muted/20 rounded-xl border border-border/50 overflow-hidden">
                      <div className="p-4 border-b border-border/50 bg-muted/30 flex justify-between items-center">
                        <h4 className="font-semibold text-sm">{stage}</h4>
                        <Badge variant="secondary">{stageApplicants.length}</Badge>
                      </div>
                      <div className="p-4 flex-1 overflow-y-auto space-y-3">
                        {stageApplicants.map(applicant => (
                          <div key={applicant.id} className="bg-white p-4 rounded-lg border border-border/50 shadow-sm hover:border-primary/50 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full ${getAvatarColor(applicant.initials)} text-white flex items-center justify-center font-medium text-xs`}>
                                  {applicant.initials}
                                </div>
                                <h5 className="font-semibold text-sm">{applicant.name}</h5>
                              </div>
                            </div>
                            <div className="space-y-1.5 mt-3">
                              <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                                <Briefcase className="w-3.5 h-3.5" /> {applicant.trade}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> {applicant.location}
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> Applied {applicant.appliedDate}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div>
            {pinnedWidgets.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Dashboard Metrics</h3>
                  <Button variant="ghost" size="sm" className="h-8" onClick={() => setIsWidgetModalOpen(true)}>
                    <Settings2 className="w-4 h-4 mr-2" /> Customize
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {pinnedWidgets.map(wId => {
                    const widget = availableWidgets.find(w => w.id === wId);
                    if (!widget) return null;
                    return (
                      <div key={wId} className="bg-white p-4 rounded-xl border border-border/50 shadow-sm">
                        <p className="text-xs text-muted-foreground font-medium">{widget.title}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <h4 className="text-2xl font-bold text-foreground">{widget.getValue()}</h4>
                          {widget.subtitle && <span className="text-xs text-muted-foreground">{widget.subtitle}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedContractors.map((c) => (
              <div 
                key={c.id} 
                className={`bg-white rounded-xl p-5 shadow-sm border ${selectedIds.includes(c.id) ? 'border-primary ring-1 ring-primary' : 'border-border/50'} flex flex-col items-start relative overflow-hidden group hover:border-primary/30 transition-colors cursor-pointer`}
                onClick={() => setSelectedContractor(c)}
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-primary rounded-t-xl" />
                
                <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedIds.includes(c.id)} 
                    onCheckedChange={(checked) => {
                      setSelectedIds(prev => checked ? [...prev, c.id] : prev.filter(i => i !== c.id));
                    }}
                  />
                </div>
                
                <div className="flex items-start justify-between w-full mb-3 mt-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(c.initials)} text-white flex items-center justify-center font-medium text-sm`}>
                      {c.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{c.name}</h3>
                      {c.location && <p className="text-xs text-muted-foreground">{Array.isArray(c.location) ? c.location.join(", ") : c.location}</p>}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5 mt-1 mr-6">
                    {c.isVerified && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1 px-1.5 py-0 text-[10px]">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </Badge>
                    )}
                    {c.status === "Available" ? (
                      <Badge variant="secondary" className="bg-primary/10 text-primary-foreground hover:bg-primary/20 text-emerald-700 border-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Available
                      </Badge>
                    ) : c.status === "Blacklisted" ? (
                      <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                        Blacklisted
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                        {c.status}
                      </Badge>
                    )}
                    {getSequenceStatus(c) === 'active' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1 px-1.5 py-0 text-[10px]">
                        <Workflow className="w-3 h-3" /> In Sequence
                      </Badge>
                    )}
                    {getSequenceStatus(c) === 'paused' && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1 px-1.5 py-0 text-[10px]">
                        <Pause className="w-3 h-3" /> Paused
                      </Badge>
                    )}
                  </div>
                </div>

                {c.trades.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {c.trades.map((trade: string) => (
                      <span key={trade} className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary/20 text-secondary-foreground border border-secondary/30">
                        {trade}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
        ) : viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Contractor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Trades</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContractors.map((c) => (
                  <TableRow 
                    key={c.id} 
                    className={`cursor-pointer hover:bg-muted/30 ${selectedIds.includes(c.id) ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelectedContractor(c)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedIds.includes(c.id)} 
                        onCheckedChange={(checked) => {
                          setSelectedIds(prev => checked ? [...prev, c.id] : prev.filter(i => i !== c.id));
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${getAvatarColor(c.initials)} text-white flex items-center justify-center font-medium text-xs`}>
                          {c.initials}
                        </div>
                        <span className="font-semibold text-sm">{c.name}</span>
                        {c.isVerified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1 px-1.5 py-0 text-[10px] ml-2">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start gap-1.5">
                        {c.status === "Available" ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary-foreground hover:bg-primary/20 text-emerald-700 border-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                            Available
                          </Badge>
                        ) : c.status === "Blacklisted" ? (
                          <Badge variant="secondary" className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                            Blacklisted
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                            {c.status}
                          </Badge>
                        )}
                        {getSequenceStatus(c) === 'active' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1 px-1.5 py-0 text-[10px]">
                            <Workflow className="w-3 h-3" /> In Sequence
                          </Badge>
                        )}
                        {getSequenceStatus(c) === 'paused' && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1 px-1.5 py-0 text-[10px]">
                            <Pause className="w-3 h-3" /> Paused
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{Array.isArray(c.location) ? c.location.join(", ") : (c.location || "-")}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {c.trades.slice(0, 3).map((trade: string) => (
                          <span key={trade} className="px-2 py-0.5 rounded text-[10px] font-medium bg-secondary/20 text-secondary-foreground border border-secondary/30">
                            {trade}
                          </span>
                        ))}
                        {c.trades.length > 3 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                            +{c.trades.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : viewMode === 'map' ? (
          ['Super Admin', 'Admin', 'Employee', 'Sales', 'Compliance Manager'].includes(role) ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8 overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold">Interactive Contractor Map</h3>
                <p className="text-sm text-muted-foreground">Select a state to view local contractors</p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={mapStateFilter} onValueChange={setMapStateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All States</SelectItem>
                    {Object.keys(stateAbbreviations).map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={mapTradeFilter} onValueChange={setMapTradeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Trade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Trades</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="General Building">General Building</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setIsComplianceMapOpen(true)} className="bg-primary text-primary-foreground">
                  <Map className="w-4 h-4 mr-2" /> Compliance Tracker
                </Button>
              </div>
            </div>

            {/* Summary Dashboard for reciprocity insights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground font-medium">Total Covered States</p>
                  <h4 className="text-2xl font-bold mt-1 text-primary">{Object.keys(mapData).length}</h4>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground font-medium">Most Dense State</p>
                  <h4 className="text-2xl font-bold mt-1">{Object.entries(mapData).sort((a,b) => b[1] - a[1])[0]?.[0] || 'N/A'}</h4>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground font-medium">Total Contractors</p>
                  <h4 className="text-2xl font-bold mt-1">{filteredContractors.length}</h4>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col justify-center">
                  <p className="text-sm text-muted-foreground font-medium">High Reciprocity Potential</p>
                  <h4 className="text-2xl font-bold mt-1 text-emerald-600">14 States</h4>
                </CardContent>
              </Card>
            </div>

            {/* The HTML map embedded via iframe */}
            <iframe 
              src="/reciprocity-finder.html" 
              style={{ width: "100%", height: "950px", border: 0 }}
              className="rounded-lg bg-slate-50 shadow-inner"
              title="License Reciprocity Finder"
            />
            {/* Advanced React Map Controls */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
<div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Advanced Map Analysis</h4>
                  <div className="flex gap-4 items-center">
                    <Tabs value={mapLayer} onValueChange={setMapLayer} className="w-[400px]">
                      <TabsList>
                        <TabsTrigger value="density">Contractor Density</TabsTrigger>
                        <TabsTrigger value="reciprocity">Reciprocity Heat Map</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <div className="flex items-center gap-2">
                      <Select value={mapTheme} onValueChange={setMapTheme}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Color Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iqs">IQS Cyan</SelectItem>
                          <SelectItem value="emerald">Emerald</SelectItem>
                          <SelectItem value="coral">Coral</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={handleSaveTheme} title="Save Theme">
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleLoadTheme} title="Load Theme">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Historical Timeline</span>
                    <span className="font-bold text-primary">{mapYear[0]}</span>
                  </div>
                  <Slider 
                    value={mapYear} 
                    onValueChange={setMapYear} 
                    max={2026} 
                    min={2015} 
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {mapLayer === 'density' ? 'Density View' : 'Reciprocity Potential'}
                </h4>
                {/* Visual Legend */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Low</span>
                  <div className="flex h-3 w-32 rounded overflow-hidden border border-border/50">
                    <div className="flex-1 bg-transparent"></div>
                    <div className="flex-1" style={{ backgroundColor: `rgba(${mapTheme === 'emerald' ? '16, 185, 129' : mapTheme === 'coral' ? '244, 63, 94' : mapTheme === 'purple' ? '168, 85, 247' : '111, 217, 235'}, 0.2)` }}></div>
                    <div className="flex-1" style={{ backgroundColor: `rgba(${mapTheme === 'emerald' ? '16, 185, 129' : mapTheme === 'coral' ? '244, 63, 94' : mapTheme === 'purple' ? '168, 85, 247' : '111, 217, 235'}, 0.5)` }}></div>
                    <div className="flex-1" style={{ backgroundColor: `rgba(${mapTheme === 'emerald' ? '16, 185, 129' : mapTheme === 'coral' ? '244, 63, 94' : mapTheme === 'purple' ? '168, 85, 247' : '111, 217, 235'}, 0.8)` }}></div>
                    <div className="flex-1" style={{ backgroundColor: `rgba(${mapTheme === 'emerald' ? '16, 185, 129' : mapTheme === 'coral' ? '244, 63, 94' : mapTheme === 'purple' ? '168, 85, 247' : '111, 217, 235'}, 1.0)` }}></div>
                  </div>
                  <span>High</span>
                </div>
              </div>

              <div className="min-w-[800px] grid gap-2" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', gridTemplateRows: 'repeat(8, minmax(0, 1fr))' }}>
              {usTiles.map(tile => {
                // Adjust count based on timeline (mock historical data)
                const baseCount = mapData[tile.id] || 0;
                const yearFactor = 1 - ((2026 - mapYear[0]) * 0.08); // drops 8% per year back
                const count = Math.max(0, Math.floor(baseCount * yearFactor));
                
                // Heatmap layer logic
                let intensity = 0;
                if (mapLayer === 'density') {
                  intensity = count > 0 ? 0.2 + (0.8 * count / maxMapCount) : 0;
                } else {
                  // Mock reciprocity score based on state name length/vowels just for visual variance
                  const mockScore = (tile.id.charCodeAt(0) + tile.id.charCodeAt(1)) % 10;
                  intensity = mockScore > 0 ? 0.2 + (0.8 * mockScore / 10) : 0;
                }

                const themeRgb = mapTheme === 'emerald' ? '16, 185, 129' : mapTheme === 'coral' ? '244, 63, 94' : mapTheme === 'purple' ? '168, 85, 247' : '111, 217, 235';

                return (
                  <div 
                    key={tile.id}
                    onClick={() => setSelectedDrilldownState(tile.id)}
                    className={`aspect-square rounded-md border flex flex-col items-center justify-center p-2 transition-all hover:scale-105 cursor-pointer relative group ${mapStateFilter !== 'All' && stateAbbreviations[mapStateFilter] !== tile.id ? 'opacity-30 grayscale' : 'border-border/50'}`}
                    style={{ 
                      gridColumn: tile.c + 1, 
                      gridRow: tile.r + 1,
                      backgroundColor: intensity > 0 ? `rgba(${themeRgb}, ${intensity})` : 'transparent',
                      borderColor: intensity > 0 ? `rgba(${themeRgb}, 0.5)` : undefined
                    }}
                  >
                    <span className={`font-bold text-sm ${count > 0 && intensity > 0.5 ? 'text-white' : 'text-foreground'}`}>{tile.id}</span>
                    {count > 0 && (
                      <span className={`text-xs font-medium ${count > 0 && intensity > 0.5 ? 'text-white/90' : 'text-muted-foreground'}`}>{count}</span>
                    )}
                    
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                      {Object.keys(stateAbbreviations).find(k => stateAbbreviations[k] === tile.id) || tile.id}: {count} contractors
                    </div>
                  </div>
                );
              })}
            </div>

            <Dialog open={!!selectedDrilldownState} onOpenChange={(open) => !open && setSelectedDrilldownState(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader className="flex flex-row justify-between items-start">
                  <div>
                    <DialogTitle className="flex items-center gap-2">
                      <Map className="w-5 h-5 text-primary" />
                      {Object.keys(stateAbbreviations).find(k => stateAbbreviations[k] === selectedDrilldownState) || selectedDrilldownState} State Drill-down
                    </DialogTitle>
                    <DialogDescription>Detailed reciprocity and contractor analytics for this state.</DialogDescription>
                  </div>
<div className="flex gap-2">
                    <Select value={compareState} onValueChange={setCompareState}>
                      <SelectTrigger className="w-[160px] h-9">
                        <SelectValue placeholder="Compare with..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        {Object.keys(stateAbbreviations).map(state => (
                          <SelectItem key={state} value={stateAbbreviations[state]}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleExportMapData}>
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExportMapPdf}>
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </DialogHeader>
<Tabs defaultValue="overview" className="mt-4">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements & Compliance</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className={`grid ${compareState !== "None" ? 'grid-cols-4' : 'grid-cols-2'} gap-4 py-4`}>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Active Contractors</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {filteredContractors.filter(c => c.location && c.location.some(loc => stateAbbreviations[loc] === selectedDrilldownState)).length}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Reciprocity Agreements</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-primary">
                            {((selectedDrilldownState?.charCodeAt(0) || 0) % 5) + 2} States
                          </div>
                        </CardContent>
                      </Card>
                      {compareState !== "None" && (
                        <>
                          <Card className="bg-slate-50 dark:bg-slate-900/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Active ({compareState})</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {filteredContractors.filter(c => c.location && c.location.some(loc => stateAbbreviations[loc] === compareState)).length}
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-slate-50 dark:bg-slate-900/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Reciprocity ({compareState})</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold text-primary">
                                {((compareState?.charCodeAt(0) || 0) % 5) + 2} States
                              </div>
                            </CardContent>
                          </Card>
                        </>
                      )}
                    </div>
                    <div className={`grid ${compareState !== "None" ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                      <div className="space-y-4">
                        <h4 className="font-medium">Contractors in {selectedDrilldownState}</h4>
                        <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                          {filteredContractors.filter(c => c.location && c.location.some(loc => stateAbbreviations[loc] === selectedDrilldownState)).length === 0 && (
                            <div className="p-4 text-center text-muted-foreground text-sm">No contractors found in this state.</div>
                          )}
                          {filteredContractors.filter(c => c.location && c.location.some(loc => stateAbbreviations[loc] === selectedDrilldownState)).map(c => (
                            <div key={c.id} className="p-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <div>
                                <div className="font-medium text-sm">{c.name}</div>
                                <div className="text-xs text-muted-foreground">{c.trades.join(", ")} - {c.classification}</div>
                              </div>
                              <Badge variant={c.status === 'Available' ? 'default' : c.status === 'Blacklisted' ? 'destructive' : 'secondary'}>{c.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      {compareState !== "None" && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Contractors in {compareState}</h4>
                          <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto bg-slate-50 dark:bg-slate-900/20">
                            {filteredContractors.filter(c => c.location && c.location.some(loc => stateAbbreviations[loc] === compareState)).length === 0 && (
                              <div className="p-4 text-center text-muted-foreground text-sm">No contractors found in this state.</div>
                            )}
                            {filteredContractors.filter(c => c.location && c.location.some(loc => stateAbbreviations[loc] === compareState)).map(c => (
                              <div key={c.id} className="p-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div>
                                  <div className="font-medium text-sm">{c.name}</div>
                                  <div className="text-xs text-muted-foreground">{c.trades.join(", ")} - {c.classification}</div>
                                </div>
                                <Badge variant={c.status === 'Available' ? 'default' : c.status === 'Blacklisted' ? 'destructive' : 'secondary'}>{c.status}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="requirements">
                    <Card className="p-6 mt-4">
                      <h3 className="text-lg font-bold mb-4">{Object.keys(stateAbbreviations).find(k => stateAbbreviations[k] === selectedDrilldownState)} Compliance Requirements</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">General Requirements</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Business Registration with Secretary of State</li>
                            <li>Minimum General Liability Insurance: $300,000</li>
                            <li>Workers' Compensation Insurance (if employees &gt; 0)</li>
                            <li>Surety Bond: $10,000 - $25,000 based on volume</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Qualifier Requirements</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Passing score on Business & Law Exam</li>
                            <li>Passing score on Trade Exam (or verifiable reciprocity)</li>
                            <li>Minimum 4 years of verifiable experience in the trade</li>
                            <li>Background check and fingerprinting</li>
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Reciprocity Details</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            This state accepts trade exam waivers from select states provided the license has been active and in good standing for at least 3 out of the last 5 years. The Business & Law exam is still required for all out-of-state applicants.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
          </div>
          ) : (
            <div className="relative bg-white rounded-xl shadow-sm border border-border/50 p-8 overflow-hidden min-h-[800px] flex items-center justify-center">
               {/* Blurred Map Background */}
               <div className="absolute inset-0 filter blur-md opacity-50 pointer-events-none select-none overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-900 grid grid-cols-12 gap-4 p-8">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="bg-slate-300 dark:bg-slate-700 rounded-md h-24 opacity-20"></div>
                    ))}
                  </div>
               </div>
               
               {/* Paywall Overlay */}
               <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-4">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                     <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Unlock the Reciprocity Map</h3>
                  <p className="text-lg text-muted-foreground max-w-lg mb-8">
                    Discover licensing reciprocity across all 50 states, analyze contractor density, and identify high-potential expansion markets.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full mb-10 text-left">
                     <Card className="border-border/50 bg-white dark:bg-slate-950 shadow-sm">
                        <CardHeader>
                           <CardTitle>Monthly Pass</CardTitle>
                           <div className="text-3xl font-bold mt-2">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                        </CardHeader>
                        <CardContent>
                           <ul className="text-sm space-y-3 mb-6">
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Full 50-state reciprocity data</span></li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Contractor density heatmaps</span></li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>State-by-state requirements</span></li>
                           </ul>
                           <Button className="w-full" onClick={() => setIsSubscribeModalOpen(true)}>Subscribe Monthly</Button>
                        </CardContent>
                     </Card>
                     
                     <Card className="border-primary bg-primary/5 relative overflow-hidden shadow-sm">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">Save 20%</div>
                        <CardHeader>
                           <CardTitle>Annual Pass</CardTitle>
                           <div className="text-3xl font-bold mt-2">$470<span className="text-sm text-muted-foreground font-normal">/yr</span></div>
                        </CardHeader>
                        <CardContent>
                           <ul className="text-sm space-y-3 mb-6">
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Everything in Monthly</span></li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>PDF Export Capabilities</span></li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> <span>Priority support</span></li>
                           </ul>
                           <Button className="w-full" onClick={() => setIsSubscribeModalOpen(true)}>Subscribe Annually</Button>
                        </CardContent>
                     </Card>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">Already have a subscription? <a href="#" className="text-primary hover:underline transition-all">Contact Support</a></p>
               </div>
            </div>
          )
        ) : viewMode === 'calendar' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <h3 className="text-xl font-semibold mb-6">Renewal Calendar</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={selectedCalendarDate}
                  onSelect={setSelectedCalendarDate}
                  modifiers={{ hasRenewal: renewalDates }}
                  modifiersClassNames={{ hasRenewal: "bg-primary/20 text-primary font-bold hover:bg-primary/30" }}
                  className="rounded-md border border-border/50 p-3 pointer-events-auto"
                />
              </div>
              <div className="flex-grow space-y-4">
                <h4 className="font-medium text-lg border-b pb-2">
                  {selectedCalendarDate ? selectedCalendarDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
                </h4>
                {contractorsOnSelectedDate.length > 0 ? (
                  <div className="grid gap-4">
                    {contractorsOnSelectedDate.map(c => (
                      <div key={c.id} className="p-4 rounded-xl border border-border/50 flex items-center justify-between hover:border-primary/30 cursor-pointer transition-colors" onClick={() => setSelectedContractor(c)}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(c.initials)} text-white flex items-center justify-center font-medium text-sm`}>
                            {c.initials}
                          </div>
                          <div>
                            <h5 className="font-semibold">{c.name}</h5>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Hash className="w-3 h-3" /> {c.licenseNumber}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          Renewing
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm py-8 text-center bg-muted/20 rounded-lg border border-dashed border-border/50">
                    No renewals scheduled for this date.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : viewMode === 'scheduling' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Intro Calls & Interviews</h3>
              <Button onClick={() => setIsScheduleModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> Schedule Call
              </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={selectedCalendarDate}
                  onSelect={setSelectedCalendarDate}
                  modifiers={{ hasCall: scheduledCalls.map(c => c.date) }}
                  modifiersClassNames={{ hasCall: "bg-primary/20 text-primary font-bold hover:bg-primary/30" }}
                  className="rounded-md border border-border/50 p-3 pointer-events-auto"
                />
              </div>
              <div className="flex-grow space-y-4">
                <h4 className="font-medium text-lg border-b pb-2">
                  {selectedCalendarDate ? selectedCalendarDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date"}
                </h4>
                {(() => {
                  if (!selectedCalendarDate) return null;
                  const callsOnDate = scheduledCalls.filter(c => 
                    c.date.getFullYear() === selectedCalendarDate.getFullYear() &&
                    c.date.getMonth() === selectedCalendarDate.getMonth() &&
                    c.date.getDate() === selectedCalendarDate.getDate()
                  );
                  return callsOnDate.length > 0 ? (
                    <div className="grid gap-4">
                      {callsOnDate.map(call => (
                        <div key={call.id} className="p-4 rounded-xl border border-border/50 flex items-center justify-between hover:border-primary/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                              <CalendarClock className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-semibold">{call.title}</h5>
                              <p className="text-xs text-muted-foreground mt-0.5">{call.type}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Join Call</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm py-8 text-center bg-muted/20 rounded-lg border border-dashed border-border/50">
                      No calls scheduled for this date.
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        ) : viewMode === 'timeline' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 max-w-3xl mx-auto gap-4">
              <h3 className="text-xl font-semibold">Upcoming License Renewals</h3>
              <Button onClick={handleSendAllReminders}>
                <Send className="w-4 h-4 mr-2" /> Remind All (30 Days)
              </Button>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/80 -translate-x-1/2"></div>
              <div className="space-y-8">
                {timelineData.length > 0 ? timelineData.map((c, idx) => {
                  const date = new Date(c.renewalDate);
                  const isPast = date < new Date();
                  return (
                    <div key={c.id} className={`relative flex flex-col md:flex-row items-center justify-between group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center shadow-sm -translate-x-1/2 z-10">
                        <Calendar className="w-3 h-3" />
                      </div>
                      <div className={`w-full md:w-[calc(50%-2.5rem)] pl-20 md:pl-0 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                        <div className="p-5 rounded-xl border border-border/50 bg-white shadow-sm hover:border-primary/30 transition-colors cursor-pointer" onClick={() => setSelectedContractor(c)}>
                          <div className={`text-sm font-bold mb-1 ${isPast ? 'text-red-500' : 'text-primary'}`}>
                            {date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            {isPast && " (Overdue)"}
                          </div>
                          <h4 className="font-bold text-lg text-foreground">{c.name}</h4>
                          <div className={`text-sm text-muted-foreground mt-1 flex flex-col gap-1 ${idx % 2 === 0 ? 'items-start' : 'md:items-end items-start'}`}>
                            <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" /> {c.licenseNumber || "No license #"}</span>
                            <span className="flex items-center gap-1.5"><FileText className="w-3 h-3" /> {c.classification || "General"}</span>
                          </div>
                          <div className={`mt-4 flex ${idx % 2 === 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                                  <Send className="w-3 h-3 mr-2" /> Send Reminder
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                                <DropdownMenuItem onClick={(e) => handleSendReminder(e, c, 'email')}>
                                  <Mail className="w-4 h-4 mr-2" /> Email Reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => handleSendReminder(e, c, 'sms')}>
                                  <MessageSquare className="w-4 h-4 mr-2" /> SMS Reminder
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center text-muted-foreground py-12 bg-muted/20 rounded-xl border border-dashed border-border">
                    No contractors with renewal dates found.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : viewMode === 'activity' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <h3 className="text-xl font-semibold mb-6">Activity Log</h3>
            {activityLogs.length > 0 ? (
              <div className="space-y-4">
                {activityLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-white hover:border-primary/30 transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{log.action} {log.contractorName ? <span className="font-bold text-primary">{log.contractorName}</span> : ''}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{log.details}</p>
                      <p className="text-xs text-muted-foreground mt-2 font-medium">{new Date(log.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12 bg-muted/20 rounded-xl border border-dashed border-border">
                No activity recorded yet. Send a reminder to see it here.
              </div>
            )}
          </div>
        ) : viewMode === 'automation' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 max-w-3xl mx-auto gap-4">
              <div>
                <h3 className="text-xl font-semibold">Automated Renewal Sequence</h3>
                <p className="text-sm text-muted-foreground mt-1">Set up automated emails and SMS based on renewal dates.</p>
              </div>
              <Button onClick={() => { setEditingStep({ type: 'email', timing: 14, timingType: 'before', subject: '', body: '' }); setIsStepModalOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Step
              </Button>
            </div>
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-border/80"></div>
              <div className="space-y-6">
                {sortedSteps.map((step) => (
                  <div key={step.id} className="relative flex items-start gap-6 group">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0 z-10 ${step.type === 'email' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary-foreground'}`}>
                      {step.type === 'email' ? <Mail className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 bg-white border border-border/50 rounded-xl p-5 shadow-sm hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Badge variant="outline" className="mb-2 bg-slate-50">
                            <Clock className="w-3 h-3 mr-1.5" />
                            {step.timingType === 'on' ? 'On Renewal Date' : `${step.timing} Days ${step.timingType === 'before' ? 'Before' : 'After'}`}
                          </Badge>
                          <h4 className="font-semibold text-lg text-foreground flex items-center gap-2">
                            {step.type === 'email' ? 'Send Email' : 'Send SMS'}
                          </h4>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditingStep(step); setIsStepModalOpen(true); }}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteStep(step.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {step.type === 'email' && <p className="text-sm font-medium mb-1.5 text-foreground">Subject: {step.subject}</p>}
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{step.body}</p>
                    </div>
                  </div>
                ))}
                {sortedSteps.length === 0 && (
                  <div className="text-center text-muted-foreground py-12 bg-muted/20 rounded-xl border border-dashed border-border ml-12">
                    No automation steps defined. Click "Add Step" to build your sequence.
                  </div>
                )}
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border/50">
              <h3 className="text-xl font-semibold mb-6">System Automations & Monitoring</h3>
              <div className="grid gap-4">
                <div className="bg-white border border-border/50 rounded-xl p-5 shadow-sm flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">6-Month License Attachment Check</h4>
                      <p className="text-sm text-muted-foreground mt-1">Automatically verifies if the qualifier's license is still attached to the business 6 months after the placement date.</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">Trigger: 6 Months Post-Placement</Badge>
                        <Badge variant="outline">Action: Alert Admin</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Active</span>
                    <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer" onClick={() => toast.success("Automation settings updated")}>
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-border/50 rounded-xl p-5 shadow-sm flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Daily API Deficiency Check</h4>
                      <p className="text-sm text-muted-foreground mt-1">Runs a daily background API check on all active licenses to ensure no new deficiencies, complaints, or expirations have occurred.</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700">Trigger: Every 24 Hours</Badge>
                        <Badge variant="outline">Action: Create Dashboard Alert</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Active</span>
                    <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer" onClick={() => toast.success("API Check settings updated")}>
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : viewMode === 'documents' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Docs signed</p>
                  <h3 className="text-2xl font-bold mt-1">{documentsList.filter(d => d.isSigned).length}/{documentsList.length}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FileSignature className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Blocking unsigned</p>
                  <h3 className="text-2xl font-bold mt-1 text-red-600">{documentsList.filter(d => !d.isSigned && d.status === "Blocking").length}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Completion rate</p>
                  <h3 className="text-2xl font-bold mt-1">{Math.round((documentsList.filter(d => d.isSigned).length / documentsList.length) * 100) || 0}%</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-border/50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Placements compliant</p>
                  <h3 className="text-2xl font-bold mt-1">3/5</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border/50 shadow-sm overflow-hidden">
              <div className="border-b border-border/50 px-6 pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                  <h3 className="text-lg font-semibold">Document & waiver tracker</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsAutoInvoiceModalOpen(true)}>
                      <Receipt className="w-4 h-4 mr-2" /> Auto-Generate Invoice
                    </Button>
                    <Button size="sm" onClick={() => setIsAddDocModalOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" /> Add document
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-6">
                  {["By placement", "All documents", "Overview", "Templates"].map(tab => (
                    <button
                      key={tab}
                      className={`pb-3 text-sm font-medium border-b-2 transition-colors ${documentTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setDocumentTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              {documentTab === "All documents" && (
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["All", "Liability waiver", "Agreement", "Invoice", "Authorization", "State application", "Other"].map(filter => (
                      <Badge 
                        key={filter}
                        variant={documentFilter === filter ? "default" : "outline"}
                        className={`cursor-pointer ${documentFilter === filter ? '' : 'hover:bg-muted'}`}
                        onClick={() => setDocumentFilter(filter)}
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-8">
                    {/* Groups will go here */}
                    {(() => {
                      const filtered = documentsList.filter(d => documentFilter === "All" || d.type === documentFilter);
                      const blocking = filtered.filter(d => !d.isSigned && d.status === "Blocking");
                      const pending = filtered.filter(d => !d.isSigned && d.status === "Pending");
                      const signed = filtered.filter(d => d.isSigned);

                      const renderDoc = (doc: any) => (
                        <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors bg-white gap-4">
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${doc.isSigned ? 'bg-emerald-100 text-emerald-600' : doc.status === 'Blocking' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                              {doc.isSigned ? <CheckCircle2 className="w-4 h-4" /> : doc.status === 'Blocking' ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{doc.title}</h4>
                              <p className="text-sm font-medium text-primary mt-0.5">{doc.placement}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-[10px] bg-muted/50">{doc.type}</Badge>
                                <span className="text-xs text-muted-foreground flex items-center"><User className="w-3 h-3 mr-1" /> {doc.signer}</span>
                                {doc.note && <span className="text-xs text-muted-foreground flex items-center"><FileText className="w-3 h-3 mr-1" /> {doc.note}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {!doc.isSigned ? (
                              <>
                                <Button size="sm" variant="default" className="h-8 bg-primary hover:bg-primary/90" onClick={() => {
                                  setDocToSign(doc);
                                  setIsSignModalOpen(true);
                                }}>Sign Now</Button>
                                <Button size="sm" variant="outline" className="h-8" onClick={() => {
                                  setDocumentsList(prev => prev.map(d => d.id === doc.id ? {...d, isSigned: true, note: `Signed ${new Date().toLocaleDateString()}`} : d));
                                  toast.success(`${doc.title} marked as signed`);
                                  setNotifications(prev => [{ id: Date.now(), title: 'Document Signed', message: `${doc.title} for ${doc.placement.split('→')[0].trim()} was signed.`, time: new Date().toISOString(), read: false }, ...prev]);
                                }}>Mark signed</Button>
                                <Button size="sm" variant="outline" className="h-8" onClick={() => toast.success(`Reminder sent for ${doc.title}`)}>Send reminder</Button>
                              </>
                            ) : (
                              <>
                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none mr-2">Signed</Badge>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => {
                                  setDocumentsList(prev => prev.map(d => d.id === doc.id ? {...d, isSigned: false, note: ""} : d));
                                }}><Undo className="w-4 h-4" /></Button>
                                <Button size="sm" variant="outline" className="h-8"><Download className="w-4 h-4 mr-2" /> Download</Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => {
                              setDocToPreview(doc);
                              setIsPreviewModalOpen(true);
                            }}><FileText className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      );

                      return (
                        <>
                          {blocking.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-semibold text-red-600 flex items-center gap-2">
                                Blocking — pending signature <Badge variant="secondary" className="bg-red-100 text-red-700">{blocking.length}</Badge>
                              </h4>
                              <div className="space-y-2">{blocking.map(renderDoc)}</div>
                            </div>
                          )}
                          {pending.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-semibold text-amber-600 flex items-center gap-2">
                                Pending — non-blocking <Badge variant="secondary" className="bg-amber-100 text-amber-700">{pending.length}</Badge>
                              </h4>
                              <div className="space-y-2">{pending.map(renderDoc)}</div>
                            </div>
                          )}
                          {signed.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-semibold text-emerald-600 flex items-center gap-2">
                                Signed <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">{signed.length}</Badge>
                              </h4>
                              <div className="space-y-2">{signed.map(renderDoc)}</div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
              {documentTab === "By placement" && (
                <div className="p-6 space-y-6">
                  {Array.from(new Set(documentsList.map(d => d.placement))).map(placement => {
                    const placementDocs = documentsList.filter(d => d.placement === placement);
                    const signedCount = placementDocs.filter(d => d.isSigned).length;
                    const totalCount = placementDocs.length;
                    return (
                      <div key={placement} className="border border-border/50 rounded-xl overflow-hidden bg-white">
                        <div className="bg-muted/30 px-6 py-4 flex justify-between items-center border-b border-border/50">
                          <div>
                            <h4 className="font-semibold text-lg">{placement}</h4>
                            <p className="text-sm text-muted-foreground">{signedCount} of {totalCount} documents signed</p>
                          </div>
                          <Badge variant={signedCount === totalCount ? "default" : "secondary"}>
                            {signedCount === totalCount ? "Compliant" : "Pending Docs"}
                          </Badge>
                        </div>
                        <div className="divide-y divide-border/50">
                          {placementDocs.map(doc => (
                            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-muted/10">
                              <div className="flex items-center gap-3">
                                {doc.isSigned ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Clock className="w-5 h-5 text-amber-500" />}
                                <div>
                                  <p className="font-medium text-sm">{doc.title}</p>
                                  <p className="text-xs text-muted-foreground">{doc.type} • {doc.signer}</p>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => {
                                if (doc.isSigned) {
                                  setDocToPreview(doc);
                                  setIsPreviewModalOpen(true);
                                } else {
                                  setDocToSign(doc);
                                  setIsSignModalOpen(true);
                                }
                              }}>
                                {doc.isSigned ? "View" : "Sign Now"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {documentTab !== "All documents" && documentTab !== "By placement" && (
                <div className="p-12 text-center text-muted-foreground bg-muted/10">
                  <FileSignature className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Content for {documentTab} is under construction.</p>
                </div>
              )}
            </div>
          </div>
        ) : viewMode === 'fees' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <h3 className="text-xl font-semibold mb-6">State Application Fees Tracker</h3>
            <div className="overflow-hidden rounded-lg border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>Trade / Classification</TableHead>
                    <TableHead>Application Fee</TableHead>
                    <TableHead>Exam Fee</TableHead>
                    <TableHead>Renewal Fee</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feesList.map(fee => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.state}</TableCell>
                      <TableCell>{fee.trade}</TableCell>
                      <TableCell>{fee.appFee}</TableCell>
                      <TableCell>{fee.examFee}</TableCell>
                      <TableCell>{fee.renewalFee}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{fee.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCsvModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" /> Import CSV
              </Button>
              <Button><Download className="w-4 h-4 mr-2" /> Export Schedule</Button>
            </div>
          </div>
        ) : viewMode === 'work-orders' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Work Orders</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search work orders..." 
                    className="pl-8 w-64"
                    value={workOrderSearch}
                    onChange={(e) => setWorkOrderSearch(e.target.value)}
                  />
                </div>
                <Select value={workOrderFilterStatus} onValueChange={setWorkOrderFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center bg-muted p-1 rounded-md">
                  <button onClick={() => setWorkOrderView('list')} className={`px-3 py-1 text-sm rounded-sm transition-colors ${workOrderView === 'list' ? 'bg-white shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}>List</button>
                  <button onClick={() => setWorkOrderView('kanban')} className={`px-3 py-1 text-sm rounded-sm transition-colors ${workOrderView === 'kanban' ? 'bg-white shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}>Kanban</button>
                </div>
                {workOrderView === 'kanban' && (
                  <Select value={workOrderGroupBy} onValueChange={(v: any) => setWorkOrderGroupBy(v)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Group By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="status">Group by Status</SelectItem>
                      <SelectItem value="assignee">Group by Assignee</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <Button><Plus className="w-4 h-4 mr-2" /> New Work Order</Button>
              </div>
            </div>
            
            {workOrderView === 'list' ? (
              <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workOrders
                      .filter(wo => workOrderFilterStatus === "All" || wo.status === workOrderFilterStatus)
                      .filter(wo => wo.client.toLowerCase().includes(workOrderSearch.toLowerCase()) || wo.id.toLowerCase().includes(workOrderSearch.toLowerCase()))
                      .map((wo) => (
                      <TableRow key={wo.id}>
                        <TableCell className="font-medium">{wo.id}</TableCell>
                        <TableCell>{wo.client}</TableCell>
                        <TableCell>{wo.type}</TableCell>
                        <TableCell>{wo.date}</TableCell>
                        <TableCell>{wo.assignedTo}</TableCell>
                        <TableCell>
                          <Badge variant={wo.status === 'Accepted' ? 'default' : 'secondary'} className={wo.status === 'Accepted' ? 'bg-primary text-primary-foreground' : ''}>
                            {wo.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-2">
                          {wo.status === 'Pending' ? (
                            <Button 
                              size="sm" 
                              onClick={() => {
                                const updated = workOrders.map(w => w.id === wo.id ? { ...w, status: 'Accepted' } : w);
                                setWorkOrders(updated);
                                toast.success(`Work Order Accepted: Automated email sent to team.`);
                                setActivityLogs(prev => [{ id: Date.now(), date: new Date().toISOString(), action: "Workflow Triggered", contractorName: wo.client, details: `Tanner accepted Work Order ${wo.id}. Email sent to team.` }, ...prev]);
                              }}
                            >
                              Accept Order
                            </Button>
                          ) : null}
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedWorkOrder(wo);
                            setIsWorkOrderModalOpen(true);
                          }}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {(workOrderGroupBy === 'status' ? ['Pending', 'Accepted', 'In Progress', 'Completed'] : ['Unassigned', 'Tanner', 'Sarah', 'Alex']).map(groupKey => (
                  <div 
                    key={groupKey} 
                    className="bg-slate-50/50 rounded-xl border border-border/50 p-4"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('bg-slate-100');
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('bg-slate-100');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('bg-slate-100');
                      const id = e.dataTransfer.getData('text/plain');
                      const updated = workOrders.map(w => {
                        if (w.id === id) {
                          if (workOrderGroupBy === 'status') {
                            return { ...w, status: groupKey };
                          } else {
                            return { ...w, assignedTo: groupKey };
                          }
                        }
                        return w;
                      });
                      setWorkOrders(updated);
                      
                      const wo = workOrders.find(w => w.id === id);
                      if (workOrderGroupBy === 'status' && groupKey === 'Accepted') {
                        toast.success(`Work Order Accepted: Automated email sent to team.`);
                        setActivityLogs(prev => [{ id: Date.now(), date: new Date().toISOString(), action: "Workflow Triggered", contractorName: wo?.client || "Unknown", details: `Work Order ${id} moved to Accepted. Email sent to team.` }, ...prev]);
                      } else if (workOrderGroupBy === 'assignee') {
                        toast.success(`Work order assigned to ${groupKey}`);
                        if (wo?.smsNotifications) {
                          toast.info(`SMS Notification sent to ${groupKey}`);
                        }
                      } else {
                        toast.success(`Work order moved to ${groupKey}`);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-sm">{groupKey}</h4>
                      <Badge variant="secondary">{workOrders.filter(w => (workOrderGroupBy === 'status' ? w.status : w.assignedTo) === groupKey).length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {workOrders
                        .filter(wo => workOrderFilterStatus === "All" || wo.status === workOrderFilterStatus)
                        .filter(wo => wo.client.toLowerCase().includes(workOrderSearch.toLowerCase()) || wo.id.toLowerCase().includes(workOrderSearch.toLowerCase()))
                        .filter(w => (workOrderGroupBy === 'status' ? w.status : w.assignedTo) === groupKey)
                        .map(wo => (
                        <div 
                          key={wo.id} 
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData('text/plain', wo.id)}
                          className="bg-white p-4 rounded-lg shadow-sm border border-border/50 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors"
                          onClick={() => {
                            setSelectedWorkOrder(wo);
                            setIsWorkOrderModalOpen(true);
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">{wo.id}</span>
                            <span className="text-xs text-muted-foreground">{wo.date}</span>
                          </div>
                          <h5 className="font-medium text-sm mb-1">{wo.client}</h5>
                          <p className="text-xs text-muted-foreground mb-3">{wo.type}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                                {wo.assignedTo[0]}
                              </div>
                              <span className="text-xs font-medium">{wo.assignedTo}</span>
                            </div>
                            {wo.messages?.length > 0 && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {wo.messages.length}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : viewMode === 'active-placements' ? (
          <div className="bg-white rounded-xl shadow-sm border border-border/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Active Placements</h3>
              <div className="text-sm text-muted-foreground">Closed placements with active licenses</div>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Qualifier</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>License Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Lightning Electric LLC</TableCell>
                    <TableCell>James Ortega</TableCell>
                    <TableCell>Electrical</TableCell>
                    <TableCell>Florida</TableCell>
                    <TableCell><Badge className="bg-emerald-500">Closed</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="border-emerald-500 text-emerald-600">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Volt Masters</TableCell>
                    <TableCell>Angela Torres</TableCell>
                    <TableCell>Electrical</TableCell>
                    <TableCell>Texas</TableCell>
                    <TableCell><Badge className="bg-emerald-500">Closed</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="border-emerald-500 text-emerald-600">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Suncoast HVAC LLC</TableCell>
                    <TableCell>Diana Flores</TableCell>
                    <TableCell>HVAC</TableCell>
                    <TableCell>California</TableCell>
                    <TableCell><Badge className="bg-emerald-500">Closed</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="border-emerald-500 text-emerald-600">Active</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ) : viewMode === 'partners' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Affiliate Partners</h3>
                <p className="text-sm text-muted-foreground">Manage your affiliate network, commission rates, and payment statuses.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => toast.success("Automated Email Sequence for Onboarding is Active")}>
                  <Mail className="w-4 h-4 mr-2" /> Onboarding Sequence
                </Button>
                <Button onClick={() => setIsAddAffiliateOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Add Affiliate
                </Button>
              </div>
            </div>

<Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="tiers">Commission Tiers</TabsTrigger>
                <TabsTrigger value="onboarding">Onboarding Checklist</TabsTrigger>
                <TabsTrigger value="reports">Custom Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm flex flex-col justify-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Affiliates</div>
                    <div className="text-3xl font-bold">{affiliates.length}</div>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> +3 this month
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm flex flex-col justify-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Referrals</div>
                    <div className="text-3xl font-bold">{affiliates.reduce((acc, curr) => acc + (curr.referrals || 0), 0)}</div>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> +12 this month
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm flex flex-col justify-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Revenue Generated</div>
                    <div className="text-3xl font-bold text-primary">${affiliates.reduce((acc, curr) => acc + (curr.revenue || 0), 0).toLocaleString()}</div>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> +$8,400 this month
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm flex flex-col justify-center">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Avg Conversion</div>
                    <div className="text-3xl font-bold">18.5%</div>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" /> +2.1% this month
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-border/50 p-6">
                    <h3 className="text-lg font-semibold mb-6">Conversion Trends</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'Jan', clicks: 400, conversions: 24, rate: 6 },
                          { name: 'Feb', clicks: 300, conversions: 18, rate: 6 },
                          { name: 'Mar', clicks: 550, conversions: 45, rate: 8.1 },
                          { name: 'Apr', clicks: 450, conversions: 38, rate: 8.4 },
                          { name: 'May', clicks: 700, conversions: 85, rate: 12.1 },
                          { name: 'Jun', clicks: 850, conversions: 125, rate: 14.7 },
                          { name: 'Jul', clicks: 920, conversions: 156, rate: 16.9 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} />
                          <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                          <RechartsTooltip />
                          <Area yAxisId="left" type="monotone" dataKey="conversions" stroke="#2F8198" fill="#2F8198" fillOpacity={0.2} name="Conversions" />
                          <Area yAxisId="right" type="monotone" dataKey="rate" stroke="#6FD9EB" fill="#6FD9EB" fillOpacity={0.1} name="Conv. Rate %" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6">
                    <h3 className="text-lg font-semibold mb-6">Top Converting Channels</h3>
                    <div className="space-y-4">
                      {[
                        { channel: "YouTube Reviews", rate: "24.5%", color: "bg-red-500", width: "w-[85%]" },
                        { channel: "Email Newsletters", rate: "18.2%", color: "bg-blue-500", width: "w-[65%]" },
                        { channel: "Blog Posts", rate: "12.8%", color: "bg-green-500", width: "w-[45%]" },
                        { channel: "Social Media", rate: "8.4%", color: "bg-purple-500", width: "w-[30%]" },
                        { channel: "Direct Links", rate: "5.1%", color: "bg-gray-500", width: "w-[15%]" },
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.channel}</span>
                            <span className="text-muted-foreground">{item.rate}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} ${item.width}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partner Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Commission (%)</TableHead>
                        <TableHead>Referrals</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Payment Setup</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {affiliates.map((affiliate) => (
                        <TableRow key={affiliate.id}>
                          <TableCell className="font-medium">
                            <div>{affiliate.name}</div>
                            <div className="text-xs text-muted-foreground">{affiliate.id}</div>
                          </TableCell>
                          <TableCell>
                            <div>{affiliate.contact}</div>
                            <div className="text-xs text-muted-foreground">{affiliate.email}</div>
                          </TableCell>
                          <TableCell>{affiliate.commission}%</TableCell>
                          <TableCell>{affiliate.referrals || 0}</TableCell>
                          <TableCell>${(affiliate.revenue || 0).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={affiliate.paymentStatus === 'Connected' ? 'default' : 'secondary'} className={affiliate.paymentStatus === 'Connected' ? 'bg-primary text-primary-foreground' : ''}>
                              {affiliate.paymentStatus}
                            </Badge>
                            {affiliate.paymentStatus !== 'Connected' && (
                               <div className="text-xs text-muted-foreground mt-1">Pending Setup</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{affiliate.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" onClick={() => {
                                navigator.clipboard.writeText(`https://iqs.com/ref/${affiliate.id.toLowerCase()}`);
                                toast.success("Referral link copied to clipboard!");
                              }}>
                                <LinkIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedAffiliateForChat(affiliate);
                              setIsAffiliateChatOpen(true);
                            }}>
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedAffiliateForPayouts(affiliate);
                              setIsPayoutHistoryOpen(true);
                            }}>
                              <DollarSign className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => {
                              setSelectedAffiliate(affiliate);
                              setIsAffiliateModalOpen(true);
                            }}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => {
                              setAffiliates(affiliates.filter(a => a.id !== affiliate.id));
                              toast.success("Affiliate removed successfully");
                            }}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {affiliates.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No affiliate partners found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6 mt-0">
                <Card>
<CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Performance Leaderboard</CardTitle>
                        <CardDescription>Top performing affiliates this month based on generated revenue.</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," 
                          + "Rank,Partner Name,Referrals,Revenue\n"
                          + [...affiliates].sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
                              .map((a, i) => `${i + 1},${a.name},${a.referrals || 0},${a.revenue || 0}`)
                              .join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "affiliate_leaderboard.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        toast.success("Leaderboard exported to CSV!");
                      }}>
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...affiliates].sort((a, b) => (b.revenue || 0) - (a.revenue || 0)).map((affiliate, index) => (
                        <div key={affiliate.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-amber-100 text-amber-600' : index === 1 ? 'bg-slate-200 text-slate-600' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-muted text-muted-foreground'}`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{affiliate.name}</p>
                              <p className="text-sm text-muted-foreground">{affiliate.referrals || 0} Referrals</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-600">${(affiliate.revenue || 0).toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tiers" className="space-y-6 mt-0">
<div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-lg font-medium">Commission Tiers</h4>
                    <p className="text-sm text-muted-foreground">Automatically upgrade affiliates as they reach volume milestones.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2 mr-4">
                      <Switch id="auto-upgrade" defaultChecked onCheckedChange={(checked) => {
                        if (checked) toast.success("Automated tier upgrade notifications enabled");
                      }} />
                      <Label htmlFor="auto-upgrade">Auto-Upgrade Notifications</Label>
                    </div>
                    <Button variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Tier</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-slate-200">
                    <CardHeader className="bg-slate-50 border-b pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Standard</CardTitle>
                        <Badge variant="secondary">Default</Badge>
                      </div>
                      <CardDescription>Starting tier for all new affiliates</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm text-muted-foreground">Commission Rate</span>
                        <span className="font-bold text-xl">10%</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm text-muted-foreground">Required Volume</span>
                        <span className="font-medium">$0 / month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Affiliates</span>
                        <span className="font-medium">12</span>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Edit Tier</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                    <CardHeader className="bg-teal-50 border-b border-teal-100 pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-teal-800">Pro</CardTitle>
                        <Badge className="bg-teal-500">Popular</Badge>
                      </div>
                      <CardDescription className="text-teal-600/80">For consistent performers</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm text-muted-foreground">Commission Rate</span>
                        <span className="font-bold text-xl text-teal-600">12.5%</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm text-muted-foreground">Required Volume</span>
                        <span className="font-medium">$10,000 / month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Affiliates</span>
                        <span className="font-medium">5</span>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Edit Tier</Button>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8"></div>
                    <CardHeader className="bg-amber-50 border-b border-amber-100 pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-amber-800">Elite</CardTitle>
                        <Badge className="bg-amber-500">Top Tier</Badge>
                      </div>
                      <CardDescription className="text-amber-600/80">Maximum rewards for top partners</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm text-muted-foreground">Commission Rate</span>
                        <span className="font-bold text-xl text-amber-600">15%</span>
                      </div>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-sm text-muted-foreground">Required Volume</span>
                        <span className="font-medium">$50,000 / month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Affiliates</span>
                        <span className="font-medium">2</span>
                      </div>
                      <Button variant="outline" className="w-full mt-4">Edit Tier</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="onboarding" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Affiliate Onboarding Checklist</CardTitle>
                        <CardDescription>Standardized process for bringing new partners onto the platform.</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-emails" defaultChecked onCheckedChange={(checked) => {
                          if (checked) toast.success("Automated onboarding emails enabled");
                        }} />
                        <Label htmlFor="auto-emails">Auto-Emails</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                        <Checkbox id="check-1" defaultChecked />
                        <div className="grid gap-1.5 leading-none">
                          <label htmlFor="check-1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Signed Affiliate Agreement
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Ensure the partner has signed the standard NDA and commission agreement.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                        <Checkbox id="check-2" defaultChecked />
                        <div className="grid gap-1.5 leading-none">
                          <label htmlFor="check-2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            W-9 / Tax Information Collected
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Required for processing end-of-year tax documents and payouts.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                        <Checkbox id="check-3" defaultChecked />
                        <div className="grid gap-1.5 leading-none">
                          <label htmlFor="check-3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Stripe Connect Setup
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Partner has connected their bank account to receive automated payouts.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                        <Checkbox id="check-4" />
                        <div className="grid gap-1.5 leading-none">
                          <label htmlFor="check-4" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Platform Walkthrough Complete
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Partner knows how to submit leads, track status, and view their commissions.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                        <Checkbox id="check-5" />
                        <div className="grid gap-1.5 leading-none">
                          <label htmlFor="check-5" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Marketing Materials Provided
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Brand assets, email templates, and tracking links sent to partner.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
</TabsContent>

              <TabsContent value="reports" className="space-y-6 mt-0">
                <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Custom Affiliate Reports</h3>
                      <p className="text-sm text-muted-foreground">Generate and export detailed performance data.</p>
                    </div>
                    <Button onClick={() => toast.success("Report generation started")}>
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Report Type</Label>
                        <Select defaultValue="performance">
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="performance">Performance Overview</SelectItem>
                            <SelectItem value="commissions">Commission Payouts</SelectItem>
                            <SelectItem value="referrals">Referral Sources</SelectItem>
                            <SelectItem value="conversion">Conversion Rates</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <Select defaultValue="30d">
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="90d">Last 90 Days</SelectItem>
                            <SelectItem value="ytd">Year to Date</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Filter by Tier</Label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Tiers</SelectItem>
                            <SelectItem value="standard">Standard (10%)</SelectItem>
                            <SelectItem value="pro">Pro (12.5%)</SelectItem>
                            <SelectItem value="elite">Elite (15%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Include Metrics</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="metric-rev" defaultChecked />
                            <Label htmlFor="metric-rev" className="text-sm font-normal">Revenue</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="metric-ref" defaultChecked />
                            <Label htmlFor="metric-ref" className="text-sm font-normal">Referrals</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="metric-com" defaultChecked />
                            <Label htmlFor="metric-com" className="text-sm font-normal">Commissions</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="metric-conv" defaultChecked />
                            <Label htmlFor="metric-conv" className="text-sm font-normal">Conversion Rate</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : viewMode === 'clients-crm' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">CRM Integration</h3>
                <p className="text-sm text-muted-foreground">Manage your AvocoLab CRM connection, sync records, and view the embedded dashboard.</p>
              </div>
              <div className="flex items-center gap-3">
                {isCrmSyncing ? (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1 px-3 py-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing...
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1 px-3 py-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                  </Badge>
                )}
                <Button 
                  onClick={() => {
                    setIsCrmSyncing(true);
                    toast.info("Starting two-way sync with AvocoLab...");
                    setTimeout(() => {
                      setIsCrmSyncing(false);
                      setLastCrmSync(new Date().toLocaleTimeString());
                      toast.success("Client records synced successfully!");
                    }, 2000);
                  }}
                  disabled={isCrmSyncing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isCrmSyncing ? "animate-spin" : ""}`} /> Sync Now
                </Button>
              </div>
            </div>

            <Tabs defaultValue="embedded" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="embedded">Embedded CRM</TabsTrigger>
                <TabsTrigger value="settings">Settings & API</TabsTrigger>
                <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
                <TabsTrigger value="conflicts">Sync Conflicts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="embedded" className="mt-0">
                <Card className="border shadow-sm overflow-hidden bg-background">
                  <div className="w-full h-[800px] bg-muted/20 relative">
                    <iframe 
                      src="https://www.avocolab.com/" 
                      className="w-full h-full border-0 absolute inset-0"
                      title="AvocoLab CRM"
                    />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Key className="w-5 h-5 text-primary" /> API Key Management
                      </CardTitle>
                      <CardDescription>Configure your secure connection to AvocoLab</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>AvocoLab API Key</Label>
                        <div className="flex gap-2">
                          <Input 
                            type="password" 
                            value={crmApiKey}
                            onChange={(e) => setCrmApiKey(e.target.value)}
                            placeholder="Enter your API key"
                          />
                          <Button onClick={() => {
                            toast.success("API Key saved securely.");
                          }}>Save Key</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Your API key is encrypted and stored securely. Do not share it.
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Webhook URL (For Real-time Updates)</Label>
                        <div className="flex gap-2">
                          <Input 
                            readOnly 
                            value="https://api.iqs-network.com/webhooks/avocolab"
                            className="bg-muted/50"
                          />
                          <Button variant="outline" onClick={() => {
                            navigator.clipboard.writeText("https://api.iqs-network.com/webhooks/avocolab");
                            toast.success("Webhook URL copied to clipboard");
                          }}>Copy</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Database className="w-5 h-5 text-primary" /> Two-Way Sync Status
                      </CardTitle>
                      <CardDescription>Monitor your data synchronization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30 border">
                        <div>
                          <p className="font-medium">Last Successful Sync</p>
                          <p className="text-sm text-muted-foreground">{lastCrmSync}</p>
                        </div>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          Healthy
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">Sync Preferences</h4>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-clients" className="cursor-pointer">Sync Client Profiles</Label>
                          <Switch id="sync-clients" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-notes" className="cursor-pointer">Sync Notes & Activity</Label>
                          <Switch id="sync-notes" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-placements" className="cursor-pointer">Push Placements to CRM</Label>
                          <Switch id="sync-placements" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sync-dedup" className="cursor-pointer">Automated Client Deduplication</Label>
                          <Switch id="sync-dedup" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="mapping" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ArrowRightLeft className="w-5 h-5 text-primary" /> Custom Field Mapping
                    </CardTitle>
                    <CardDescription>Map your local application fields to AvocoLab CRM properties</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-4 items-center bg-muted/30 p-3 rounded-lg border font-medium text-sm">
                        <div>Local Field</div>
                        <div className="w-8"></div>
                        <div>CRM Property</div>
                        <div className="w-10"></div>
                      </div>
                      
                      {[
                        { local: "License Number", crm: "license_number_custom" },
                        { local: "State", crm: "operating_state" },
                        { local: "Trade Classification", crm: "trade_class" },
                        { local: "Renewal Date", crm: "renewal_deadline" }
                      ].map((field, i) => (
                        <div key={i} className="grid grid-cols-[1fr_auto_1fr_auto] gap-4 items-center">
                          <Input value={field.local} readOnly className="bg-muted/30" />
                          <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                          <Select defaultValue={field.crm}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="license_number_custom">license_number_custom</SelectItem>
                              <SelectItem value="operating_state">operating_state</SelectItem>
                              <SelectItem value="trade_class">trade_class</SelectItem>
                              <SelectItem value="renewal_deadline">renewal_deadline</SelectItem>
                              <SelectItem value="notes">notes</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full mt-4 border-dashed">
                        <Plus className="w-4 h-4 mr-2" /> Add Field Mapping
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conflicts" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <GitMerge className="w-5 h-5 text-primary" /> Sync Conflicts
                        </CardTitle>
                        <CardDescription>Resolve data mismatches between local records and CRM</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast.success("All conflicts resolved using local values.")}>Keep All Local</Button>
                        <Button size="sm" onClick={() => toast.success("All conflicts resolved using CRM values.")}>Use All CRM</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Client</TableHead>
                              <TableHead>Field</TableHead>
                              <TableHead>Local Value</TableHead>
                              <TableHead>CRM Value</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Lightning Electric LLC</TableCell>
                              <TableCell>Phone Number</TableCell>
                              <TableCell className="text-red-500">555-123-4567</TableCell>
                              <TableCell className="text-emerald-500">(555) 123-4567</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="outline" onClick={() => toast.success("Kept local value")}>Keep Local</Button>
                                  <Button size="sm" onClick={() => toast.success("Updated with CRM value")}>Use CRM</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Volt Masters</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell className="text-red-500">info@voltmasters.com</TableCell>
                              <TableCell className="text-emerald-500">contact@voltmasters.com</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button size="sm" variant="outline" onClick={() => toast.success("Kept local value")}>Keep Local</Button>
                                  <Button size="sm" onClick={() => toast.success("Updated with CRM value")}>Use CRM</Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : viewMode === 'finance' ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Finance & Revenue</h3>
              <p className="text-sm text-muted-foreground">Manage your platform revenue, outstanding receivables, and payments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">Monthly Recurring Revenue</p>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3" /> +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Placement Fees (YTD)</p>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">$124,500.00</div>
                  <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3" /> +15% from last year
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">Outstanding Invoices</p>
                    <Wallet className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold">$12,450.00</div>
                  <p className="text-xs text-orange-500 flex items-center gap-1 mt-1">
                    4 invoices pending
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-muted-foreground">Affiliate Payouts Due</p>
                    <ArrowRightLeft className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-bold">$3,240.00</div>
                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                    <ArrowDownRight className="w-3 h-3" /> Due in 5 days
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Projection (6 Months)</CardTitle>
                  <CardDescription>Estimated MRR growth based on active placements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueProjectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(val: any) => `$${val/1000}k`} />
                        <RechartsTooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']} />
                        <Area type="monotone" dataKey="projected" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProjected)" />
                        <Area type="monotone" dataKey="actual" stroke="#0ea5e9" strokeWidth={2} fill="none" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>State Tax Calculator</CardTitle>
                  <CardDescription>Estimate sales/service tax for different operating states & counties</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Operating State</Label>
                      <Select value={taxState} onValueChange={(val) => { setTaxState(val); setTaxCounty(""); }}>
                        <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California (7.25%)</SelectItem>
                          <SelectItem value="TX">Texas (6.25%)</SelectItem>
                          <SelectItem value="FL">Florida (6.00%)</SelectItem>
                          <SelectItem value="NY">New York (4.00%)</SelectItem>
                          <SelectItem value="NV">Nevada (6.85%)</SelectItem>
                          <SelectItem value="WA">Washington (6.50%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>County Override (Optional)</Label>
                      <Select value={taxCounty} onValueChange={setTaxCounty} disabled={!taxState || !countyTaxRates[taxState]}>
                        <SelectTrigger><SelectValue placeholder={!taxState || !countyTaxRates[taxState] ? "N/A" : "Select County"} /></SelectTrigger>
                        <SelectContent>
                          {taxState && countyTaxRates[taxState] && Object.keys(countyTaxRates[taxState]).map(county => (
                            <SelectItem key={county} value={county}>{county} ({(countyTaxRates[taxState][county] * 100).toFixed(2)}%)</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount ($)</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 5000" 
                        value={taxAmount}
                        onChange={(e) => setTaxAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleCalculateTax}>Calculate Tax</Button>
                  
                  {calculatedTax !== null && (
                    <div className="mt-4 p-4 bg-muted/30 border rounded-lg flex items-center justify-between">
                      <span className="font-medium">Estimated Tax:</span>
                      <span className="text-xl font-bold text-primary">${calculatedTax.toFixed(2)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest payments received</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { client: "Lightning Electric", amount: "$3,500.00", date: "Today", status: "Paid" },
                      { client: "Volt Masters", amount: "$7,000.00", date: "Yesterday", status: "Paid" },
                      { client: "ProAir Services", amount: "$1,200.00", date: "Jul 12", status: "Paid" },
                      { client: "Suncoast HVAC", amount: "$3,500.00", date: "Jul 10", status: "Pending" }
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{tx.client}</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{tx.amount}</p>
                          <Badge variant="outline" className={tx.status === "Paid" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-orange-500 border-orange-500/20 bg-orange-500/10"}>
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway Settings</CardTitle>
                  <CardDescription>Manage your Stripe integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#635BFF] flex items-center justify-center text-white font-bold text-lg">S</div>
                      <div>
                        <p className="font-medium">Stripe Connected</p>
                        <p className="text-sm text-muted-foreground">Live Mode</p>
                      </div>
                    </div>
                    <Button variant="outline">Manage in Stripe <ExternalLink className="w-4 h-4 ml-2" /></Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="cad">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Auto-charge Saved Cards</p>
                      <p className="text-sm text-muted-foreground">For monthly recurring placements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Send Payment Receipts</p>
                      <p className="text-sm text-muted-foreground">Automatically email clients</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : viewMode === 'deficiencies' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">License Deficiencies</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch id="auto-alerts" defaultChecked onCheckedChange={(c) => toast.success(c ? "Automated email alerts enabled" : "Automated email alerts disabled")} />
                  <Label htmlFor="auto-alerts">Automated Email Alerts</Label>
                </div>
                <Button><Plus className="w-4 h-4 mr-2" /> Report Deficiency</Button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Days Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deficiencies.map((def) => (
                    <TableRow key={def.id}>
                      <TableCell className="font-medium">{def.id}</TableCell>
                      <TableCell>{def.contractor}</TableCell>
                      <TableCell>{def.license}</TableCell>
                      <TableCell>{def.state}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{def.issue}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${def.daysActive > 10 ? 'text-destructive' : 'text-amber-500'}`}>{def.daysActive} days</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={def.status === 'Open' ? 'destructive' : 'secondary'}>
                          {def.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedDeficiency(def);
                          setIsResolveDeficiencyOpen(true);
                        }}>Resolve</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : viewMode === 'verifications' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">License Verifications</h3>
              <Button><Plus className="w-4 h-4 mr-2" /> New Verification</Button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contractor</TableHead>
                    <TableHead>License Number</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">James Ortega</TableCell>
                    <TableCell>EL-928374</TableCell>
                    <TableCell>Florida</TableCell>
                    <TableCell><Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">Verified</Badge></TableCell>
                    <TableCell>Oct 15, 2025</TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">View Report</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Jenkins</TableCell>
                    <TableCell>GC-102938</TableCell>
                    <TableCell>Texas</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20">Pending</Badge></TableCell>
                    <TableCell>—</TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">Check Now</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marcus Rivera</TableCell>
                    <TableCell>HVAC-55432</TableCell>
                    <TableCell>California</TableCell>
                    <TableCell><Badge variant="destructive" className="bg-red-500/10 text-red-600 hover:bg-red-500/20 border-red-500/20">Expired</Badge></TableCell>
                    <TableCell>Sep 01, 2025</TableCell>
                    <TableCell className="text-right"><Button size="sm" variant="outline">View Report</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ) : viewMode === 'handoffs' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Affiliate Handoffs</h3>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => {
                  toast.success("Link copied: https://iqs.com/submit-handoff?ref=custom");
                }}>
                  <LinkIcon className="w-4 h-4 mr-2" /> Generate Link
                </Button>
                <Button><Plus className="w-4 h-4 mr-2" /> Log New Handoff</Button>
              </div>
            </div>
            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="leads">Lead Tracking</TabsTrigger>
                <TabsTrigger value="analytics">Sequence Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="leads" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Handoffs</p>
                        <h4 className="text-2xl font-bold">142</h4>
                      </div>
                      <div className="p-3 bg-teal-500/10 rounded-lg text-teal-600"><Handshake className="w-5 h-5" /></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Pending Review</p>
                        <h4 className="text-2xl font-bold">18</h4>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-lg text-amber-600"><Clock className="w-5 h-5" /></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Converted</p>
                        <h4 className="text-2xl font-bold">84</h4>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-600"><CheckCircle2 className="w-5 h-5" /></div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <h4 className="text-2xl font-bold">59%</h4>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600"><TrendingUp className="w-5 h-5" /></div>
                    </CardContent>
                  </Card>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                  <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
                <div className="flex gap-2">
                  <Input placeholder="Search handoffs..." className="w-64 bg-white" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 bg-white"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Referred By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service Needed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Apex Construction</TableCell>
                    <TableCell>LegalZoom Partners</TableCell>
                    <TableCell>Oct 24, 2025</TableCell>
                    <TableCell>GC License (FL)</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20">Pending Review</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setSelectedHandoff({ name: "Apex Construction", affiliate: "LegalZoom Partners", date: "Oct 24, 2025", service: "GC License (FL)", status: "Pending Review", commission: "$500", sequence: "Initial Contact" }); setIsHandoffModalOpen(true); }}>Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">BlueSky Builders</TableCell>
                    <TableCell>ProCore Affiliates</TableCell>
                    <TableCell>Oct 22, 2025</TableCell>
                    <TableCell>Electrical (TX)</TableCell>
                    <TableCell><Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">Contacted</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setSelectedHandoff({ name: "BlueSky Builders", affiliate: "ProCore Affiliates", date: "Oct 22, 2025", service: "Electrical (TX)", status: "Contacted", commission: "$350", sequence: "Follow-up 1" }); setIsHandoffModalOpen(true); }}>Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Elite HVAC Services</TableCell>
                    <TableCell>TradeNet Solutions</TableCell>
                    <TableCell>Oct 18, 2025</TableCell>
                    <TableCell>HVAC (CA)</TableCell>
                    <TableCell><Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">Converted</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setSelectedHandoff({ name: "Elite HVAC Services", affiliate: "TradeNet Solutions", date: "Oct 18, 2025", service: "HVAC (CA)", status: "Converted", commission: "$750", sequence: "Onboarding" }); setIsHandoffModalOpen(true); }}>Manage</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Initial Contact</CardTitle>
                    <CardDescription>3-step email sequence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Open Rate</span>
                      <span className="font-medium text-emerald-600">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Click Rate</span>
                      <span className="font-medium text-blue-600">24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Conversion</span>
                      <span className="font-bold">12%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Follow-up Nurture</CardTitle>
                    <CardDescription>5-step email sequence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Open Rate</span>
                      <span className="font-medium text-emerald-600">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Click Rate</span>
                      <span className="font-medium text-blue-600">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Conversion</span>
                      <span className="font-bold">8%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Re-engagement</CardTitle>
                    <CardDescription>2-step email sequence</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Open Rate</span>
                      <span className="font-medium text-emerald-600">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Click Rate</span>
                      <span className="font-medium text-blue-600">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Conversion</span>
                      <span className="font-bold">2%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Availability Status</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
                <h3 className="text-lg font-semibold mb-4">Top States</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <RechartsTooltip />
                      <Bar dataKey="count" fill="#2F8198" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Trades Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tradeData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="count" fill="#6FD9EB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pt-6 pb-20">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  // Simple pagination logic for small number of pages
                  if (totalPages <= 5 || i === 0 || i === totalPages - 1 || Math.abs(currentPage - 1 - i) <= 1) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                          className="cursor-pointer"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  
                  // Show ellipsis for gaps
                  if (i === 1 && currentPage > 3) {
                    return <PaginationItem key={i}><PaginationEllipsis /></PaginationItem>;
                  }
                  if (i === totalPages - 2 && currentPage < totalPages - 2) {
                    return <PaginationItem key={i}><PaginationEllipsis /></PaginationItem>;
                  }
                  
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    )}

      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4 z-50 animate-in slide-in-from-bottom-10">
          <span className="text-sm font-medium">{selectedIds.length} selected</span>
          <div className="w-px h-4 bg-slate-700"></div>
          <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-slate-800" onClick={() => setIsBulkStatusModalOpen(true)}>
            <Edit className="w-4 h-4 mr-2" /> Change Status
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:text-white hover:bg-slate-800" onClick={() => setIsBulkTradeModalOpen(true)}>
            <Briefcase className="w-4 h-4 mr-2" /> Manage Trades
          </Button>
          <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-slate-800" onClick={handleBulkDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800" onClick={() => setSelectedIds([])}>
            Cancel
          </Button>
        </div>
      )}

      <Dialog open={isBulkStatusModalOpen} onOpenChange={setIsBulkStatusModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <label className="text-sm font-medium">New Status</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={bulkStatus}
              onChange={(e) => setBulkStatus(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkStatusModalOpen(false)}>Cancel</Button>
            <Button onClick={handleBulkStatusUpdate}>Update {selectedIds.length} Contractors</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBulkTradeModalOpen} onOpenChange={setIsBulkTradeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Trades</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="tradeAction" 
                    checked={bulkTradeAction === "add"} 
                    onChange={() => setBulkTradeAction("add")}
                    className="text-primary focus:ring-primary"
                  />
                  Add Trades
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="tradeAction" 
                    checked={bulkTradeAction === "remove"} 
                    onChange={() => setBulkTradeAction("remove")}
                    className="text-primary focus:ring-primary"
                  />
                  Remove Trades
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Trades (comma separated)</label>
              <Input 
                placeholder="e.g. HVAC, Plumbing" 
                value={bulkTrades}
                onChange={(e) => setBulkTrades(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkTradeModalOpen(false)}>Cancel</Button>
            <Button onClick={handleBulkTradeUpdate}>
              {bulkTradeAction === "add" ? "Add" : "Remove"} Trades
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Contractor" : "Add New Contractor"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>States</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          {field.value && field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {field.value.map((state: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                                  {state}
                                  <button type="button" onClick={() => field.onChange(field.value.filter((_: string, i: number) => i !== idx))} className="text-muted-foreground hover:text-foreground ml-1">
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Select onValueChange={(val) => {
                              const current = Array.isArray(field.value) ? field.value : [];
                              if (!current.includes(val)) {
                                field.onChange([...current, val]);
                              }
                            }}>
                              <SelectTrigger>
                                <SelectValue placeholder="Add a state..." />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(stateAbbreviations).map(state => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="LIC-12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="classification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classification</FormLabel>
                      <FormControl>
                        <Input placeholder="General Contractor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="renewalDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Renewal Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                          <option value="Blacklisted">Blacklisted</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="trades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trades (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="HVAC, Plumbing, Electrical" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsFormModalOpen(false)}>Cancel</Button>
                <Button type="submit">{editingId ? "Save Changes" : "Add Contractor"}</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedContractor} onOpenChange={(open) => !open && setSelectedContractor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contractor Details</DialogTitle>
          </DialogHeader>
          {selectedContractor && (
            <div className="space-y-6 mt-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${getAvatarColor(selectedContractor.initials)} text-white flex items-center justify-center font-medium text-xl`}>
                    {selectedContractor.initials}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedContractor.name}</h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      {selectedContractor.status === "Available" ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary-foreground text-emerald-700 border-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                          Available
                        </Badge>
                      ) : selectedContractor.status === "Blacklisted" ? (
                        <Badge variant="secondary" className="bg-rose-100 text-rose-700 border-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                          Blacklisted
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                          {selectedContractor.status}
                        </Badge>
                      )}
                      {getSequenceStatus(selectedContractor) === 'active' && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 gap-1">
                          <Workflow className="w-3 h-3" /> Active in Sequence
                        </Badge>
                      )}
                      {getSequenceStatus(selectedContractor) === 'paused' && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
                          <Pause className="w-3 h-3" /> Sequence Paused
                        </Badge>
                      )}
                      {selectedContractor.location && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1 ml-2">
                          <MapPin className="w-3 h-3" /> {Array.isArray(selectedContractor.location) ? selectedContractor.location.join(", ") : selectedContractor.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {getSequenceStatus(selectedContractor) !== 'none' && (
                    <Button variant="outline" size="sm" onClick={() => toggleSequencePause(selectedContractor.id)}>
                      {selectedContractor.sequencePaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                      {selectedContractor.sequencePaused ? "Resume Sequence" : "Pause Sequence"}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleBlacklistContractor(selectedContractor.id)} className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    Blacklist
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(selectedContractor)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteContractor(selectedContractor.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {selectedContractor.email || `${selectedContractor.name.toLowerCase().replace(' ', '.')}@example.com`}
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {selectedContractor.phone || "(555) 123-4567"}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">License Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                      <span className="text-muted-foreground flex items-center gap-2"><Hash className="w-4 h-4" /> License Number</span>
                      <span className="font-medium">{selectedContractor.licenseNumber || `LIC-${Math.floor(Math.random() * 90000) + 10000}`}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                      <span className="text-muted-foreground flex items-center gap-2"><FileText className="w-4 h-4" /> Classification</span>
                      <span className="font-medium">{selectedContractor.classification || "General Contractor"}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                      <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Renewal Date</span>
                      <span className="font-medium">{selectedContractor.renewalDate || "12/31/2025"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedContractor.trades.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Trades</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContractor.trades.map((trade: string) => (
                      <span key={trade} className="px-3 py-1 rounded-md text-xs font-medium bg-secondary/20 text-secondary-foreground border border-secondary/30">
                        {trade}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isTemplateModalOpen} onOpenChange={setIsTemplateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Templates</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  value={emailTemplate.subject} 
                  onChange={(e) => setEmailTemplate({...emailTemplate, subject: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Body</label>
                <Textarea 
                  value={emailTemplate.body} 
                  onChange={(e) => setEmailTemplate({...emailTemplate, body: e.target.value})} 
                  rows={8}
                />
              </div>
            </TabsContent>
            <TabsContent value="sms" className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Body</label>
                <Textarea 
                  value={smsTemplate} 
                  onChange={(e) => setSmsTemplate(e.target.value)} 
                  rows={5}
                />
              </div>
            </TabsContent>
          </Tabs>
          <div className="bg-muted/50 p-3 rounded-md border border-border/50 mt-2">
            <p className="text-xs font-semibold mb-1">Available Variables:</p>
            <p className="text-xs text-muted-foreground font-mono">
              {`{{name}}, {{email}}, {{licenseNumber}}, {{classification}}, {{renewalDate}}`}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTemplateModalOpen(false)}>Save Templates</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isComposeModalOpen} onOpenChange={setIsComposeModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send {currentCompose.type === "email" ? "Email" : "SMS"} Reminder to {currentCompose.contractorName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">To ({currentCompose.type === "email" ? "Email" : "Phone"})</label>
              <Input 
                value={currentCompose.to} 
                onChange={(e) => setCurrentCompose({...currentCompose, to: e.target.value})} 
              />
            </div>
            {currentCompose.type === "email" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  value={currentCompose.subject} 
                  onChange={(e) => setCurrentCompose({...currentCompose, subject: e.target.value})} 
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                value={currentCompose.body} 
                onChange={(e) => setCurrentCompose({...currentCompose, body: e.target.value})} 
                rows={currentCompose.type === "email" ? 8 : 4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsComposeModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              const newLog = {
                id: Date.now(),
                date: new Date().toISOString(),
                action: `Sent ${currentCompose.type.toUpperCase()} Reminder`,
                contractorName: currentCompose.contractorName,
                details: `Sent to ${currentCompose.to}`
              };
              setActivityLogs(prev => [newLog, ...prev]);
              toast.success(`${currentCompose.type === "email" ? "Email" : "SMS"} reminder sent to ${currentCompose.to}`);
              setIsComposeModalOpen(false);
            }}>
              <Send className="w-4 h-4 mr-2" /> Send {currentCompose.type === "email" ? "Email" : "SMS"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStepModalOpen} onOpenChange={setIsStepModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingStep?.id ? 'Edit Sequence Step' : 'Add Sequence Step'}</DialogTitle>
          </DialogHeader>
          {editingStep && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Type</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={editingStep.type}
                    onChange={(e) => setEditingStep({...editingStep, type: e.target.value})}
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timing</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={editingStep.timingType}
                    onChange={(e) => setEditingStep({...editingStep, timingType: e.target.value})}
                  >
                    <option value="before">Before Renewal</option>
                    <option value="on">On Renewal Date</option>
                    <option value="after">After Renewal</option>
                  </select>
                </div>
              </div>
              {editingStep.timingType !== 'on' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Days {editingStep.timingType === 'before' ? 'Before' : 'After'}</label>
                  <Input 
                    type="number" 
                    min="1"
                    value={editingStep.timing} 
                    onChange={(e) => setEditingStep({...editingStep, timing: parseInt(e.target.value) || 0})} 
                  />
                </div>
              )}
              {editingStep.type === 'email' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    value={editingStep.subject} 
                    onChange={(e) => setEditingStep({...editingStep, subject: e.target.value})} 
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Body</label>
                <Textarea 
                  value={editingStep.body} 
                  onChange={(e) => setEditingStep({...editingStep, body: e.target.value})} 
                  rows={editingStep.type === 'email' ? 5 : 3}
                />
              </div>
              <div className="bg-muted/50 p-3 rounded-md border border-border/50">
                <p className="text-xs font-semibold mb-1">Available Variables:</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {`{{name}}, {{email}}, {{licenseNumber}}, {{classification}}, {{renewalDate}}`}
                </p>
              </div>

              <div className="border rounded-md overflow-hidden mt-4">
                <div className="bg-muted/50 px-3 py-2 border-b text-xs font-semibold flex items-center justify-between">
                  <span>Message Preview</span>
                  <Badge variant="outline" className="text-[10px] bg-white">Example Data</Badge>
                </div>
                <div className="p-4 bg-white text-sm space-y-3">
                  {editingStep.type === 'email' && (
                    <div className="border-b border-border/50 pb-2">
                      <span className="text-muted-foreground font-medium mr-2">Subject:</span>
                      <span className="font-semibold text-foreground">
                        {(editingStep.subject || "").replace(/\{\{name\}\}/g, "John Doe").replace(/\{\{email\}\}/g, "john@example.com").replace(/\{\{licenseNumber\}\}/g, "LIC-12345").replace(/\{\{classification\}\}/g, "General Contractor").replace(/\{\{renewalDate\}\}/g, "2025-12-31") || "No subject"}
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-foreground">
                    {(editingStep.body || "").replace(/\{\{name\}\}/g, "John Doe").replace(/\{\{email\}\}/g, "john@example.com").replace(/\{\{licenseNumber\}\}/g, "LIC-12345").replace(/\{\{classification\}\}/g, "General Contractor").replace(/\{\{renewalDate\}\}/g, "2025-12-31") || <span className="text-muted-foreground italic">Start typing to see preview...</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStepModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveStep}>Save Step</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isInvoiceHistoryOpen} onOpenChange={setIsInvoiceHistoryOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice History</DialogTitle>
          </DialogHeader>
          <div className="py-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceHistory.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell>{inv.client}</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell>${inv.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast.success(`Resent invoice ${inv.id} to ${inv.client}`);
                      }}>
                        <Send className="w-4 h-4 mr-2" /> Resend
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast.success(`Downloaded ${inv.id}`);
                      }}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvoiceHistoryOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isWorkOrderModalOpen} onOpenChange={setIsWorkOrderModalOpen}>
        <DialogContent className="sm:max-w-3xl h-[85vh] flex flex-col p-0 overflow-hidden">
          {selectedWorkOrder && (
            <>
              <DialogHeader className="px-6 py-4 border-b shrink-0 bg-muted/20">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-xl">Work Order {selectedWorkOrder.id}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedWorkOrder.client} • {selectedWorkOrder.type} • Assigned to {selectedWorkOrder.assignedTo}
                    </DialogDescription>
                  </div>
                  <Badge variant={selectedWorkOrder.status === 'Accepted' ? 'default' : 'secondary'} className={selectedWorkOrder.status === 'Accepted' ? 'bg-primary text-primary-foreground' : ''}>
                    {selectedWorkOrder.status}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Visual Progress Timeline */}
                <div className="bg-slate-50 border rounded-xl p-6">
                  <h4 className="font-semibold text-sm mb-4">Order Progress</h4>
                  <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(0, ['Pending', 'Accepted', 'In Progress', 'Completed'].indexOf(selectedWorkOrder.status)) * 33.33}%` }}
                    ></div>
                    <div className="relative flex justify-between">
                      {['Pending', 'Accepted', 'In Progress', 'Completed'].map((step, index) => {
                        const stepIndex = ['Pending', 'Accepted', 'In Progress', 'Completed'].indexOf(selectedWorkOrder.status);
                        const isCompleted = index <= stepIndex;
                        const isCurrent = index === stepIndex;
                        return (
                          <div key={step} className="flex flex-col items-center gap-2 z-10 w-24">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'bg-white border-slate-300 text-slate-400'}`}>
                              {isCompleted && !isCurrent ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
                            </div>
                            <span className={`text-xs font-medium text-center ${isCurrent ? 'text-primary' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Client Terms Agreement */}
                <div className="bg-slate-50 border rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Terms & Conditions</h4>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms-agree" 
                      checked={selectedWorkOrder.termsAccepted}
                      onCheckedChange={(checked) => {
                        const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, termsAccepted: !!checked } : w);
                        setWorkOrders(updated);
                        setSelectedWorkOrder({...selectedWorkOrder, termsAccepted: !!checked});
                      }}
                      disabled={role !== 'Client' && role !== 'Admin'}
                    />
                    <div className="space-y-1 leading-none flex-1">
                      <label htmlFor="terms-agree" className="text-sm font-medium leading-none cursor-pointer">
                        Client Agreement
                      </label>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed mb-3">
                        By checking this box, the client agrees to the <a href="#" className="text-primary hover:underline">IQS Terms and Conditions</a> regarding placement fees, timelines, and responsibilities.
                      </p>
                      {selectedWorkOrder.termsAccepted ? (
                        <div className="mt-2 p-3 bg-white border rounded-lg inline-block">
                          <p className="text-xs text-muted-foreground mb-1">Electronically Signed By:</p>
                          <p className="font-signature text-lg text-slate-800">{selectedWorkOrder.signature || "Client Representative"}</p>
                          <p className="text-[10px] text-slate-400 mt-1">IP: 192.168.1.1 • {selectedWorkOrder.date}</p>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setIsWorkOrderSignModalOpen(true)} className="mt-2">
                          <PenTool className="w-3 h-3 mr-2" /> Sign Agreement
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* File Attachments */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm flex items-center gap-2"><FileText className="w-4 h-4" /> Attachments</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        toast.success("Downloading all attachments...");
                      }}>
                        <Download className="w-3 h-3 mr-2" /> Download All
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            // Check if file with same name exists to increment version
                            const existingDocs = selectedWorkOrder.attachments || [];
                            const sameNameDocs = existingDocs.filter((a: any) => a.name === file.name);
                            const version = sameNameDocs.length > 0 ? `1.${sameNameDocs.length}` : "1.0";
                            
                            const newAttachment = { 
                              name: file.name, 
                              version: version,
                              date: new Date().toLocaleDateString()
                            };
                            const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, attachments: [...(w.attachments || []), newAttachment] } : w);
                            setWorkOrders(updated);
                            setSelectedWorkOrder({...selectedWorkOrder, attachments: [...(selectedWorkOrder.attachments || []), newAttachment]});
                            toast.success(`Attached ${file.name} (v${version})`);
                          }
                        };
                        input.click();
                      }}>
                        <UploadCloud className="w-3 h-3 mr-2" /> Upload File
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedWorkOrder.attachments?.length > 0 ? selectedWorkOrder.attachments.map((att: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 border rounded-lg bg-white group">
                        <div className="p-2 bg-primary/10 rounded text-primary"><FileText className="w-4 h-4" /></div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <span className="text-sm font-medium truncate">{att.name}</span>
                          <span className="text-xs text-muted-foreground">Version {att.version || "1.0"} • {att.date || "Today"}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"><Download className="w-3 h-3" /></Button>
                      </div>
                    )) : (
                      <div className="col-span-2 text-sm text-muted-foreground italic p-4 border border-dashed rounded-lg text-center bg-muted/10">No attachments yet.</div>
                    )}
                  </div>
                </div>

                {/* Messaging System */}
                <div className="space-y-3 flex-1 flex flex-col">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Communication</h4>
                  <div className="border rounded-xl flex flex-col h-[300px] bg-slate-50 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedWorkOrder.messages?.length > 0 ? selectedWorkOrder.messages.map((msg: any, i: number) => (
                        <div key={i} className={`flex flex-col ${msg.sender === role || (msg.sender === 'Admin' && role === 'Admin') ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xs font-semibold text-slate-700">{msg.sender}</span>
                            <span className="text-[10px] text-slate-400">{msg.time}</span>
                          </div>
                          <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.sender === role || (msg.sender === 'Admin' && role === 'Admin') ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-white border shadow-sm rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                        </div>
                      )) : (
                        <div className="h-full flex items-center justify-center text-sm text-muted-foreground italic">No messages yet. Start the conversation.</div>
                      )}
                      {isTannerTyping && (
                        <div className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-2">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-xs font-semibold text-slate-700">Tanner</span>
                          </div>
                          <div className="px-3 py-3 rounded-lg bg-white border shadow-sm rounded-tl-none flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white border-t flex gap-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newMessage.trim()) {
                            const newMsg = { sender: role, text: newMessage.trim(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
                            const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, messages: [...(w.messages || []), newMsg] } : w);
                            setWorkOrders(updated);
                            setSelectedWorkOrder({...selectedWorkOrder, messages: [...(selectedWorkOrder.messages || []), newMsg]});
                            setNewMessage("");
                            
                            // Mock typing indicator
                            if (role !== 'Vendor') {
                              setIsTannerTyping(true);
                              setTimeout(() => {
                                setIsTannerTyping(false);
                                const replyMsg = { sender: 'Tanner', text: 'I received your message and will look into this.', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
                                const updatedWithReply = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, messages: [...(w.messages || []), newMsg, replyMsg] } : w);
                                setWorkOrders(updatedWithReply);
                                setSelectedWorkOrder({...selectedWorkOrder, messages: [...(selectedWorkOrder.messages || []), newMsg, replyMsg]});
                                
                                // Real-time notification
                                toast("New message from Tanner", {
                                  description: replyMsg.text,
                                  icon: <MessageSquare className="w-4 h-4 text-primary" />,
                                });
                                // Add to global notifications
                                setNotifications(prev => [{ id: Date.now(), title: 'New Message', message: `Tanner: ${replyMsg.text}`, time: new Date().toISOString(), read: false }, ...prev]);
                              }, 2000);
                            }
                          }
                        }}
                      />
                      <Button onClick={() => {
                        if (newMessage.trim()) {
                          const newMsg = { sender: role, text: newMessage.trim(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
                          const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, messages: [...(w.messages || []), newMsg] } : w);
                          setWorkOrders(updated);
                          setSelectedWorkOrder({...selectedWorkOrder, messages: [...(selectedWorkOrder.messages || []), newMsg]});
                          setNewMessage("");
                          
                          // Mock typing indicator
                          if (role !== 'Vendor') {
                            setIsTannerTyping(true);
                            setTimeout(() => {
                              setIsTannerTyping(false);
                              const replyMsg = { sender: 'Tanner', text: 'I received your message and will look into this.', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
                              const updatedWithReply = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, messages: [...(w.messages || []), newMsg, replyMsg] } : w);
                              setWorkOrders(updatedWithReply);
                              setSelectedWorkOrder({...selectedWorkOrder, messages: [...(selectedWorkOrder.messages || []), newMsg, replyMsg]});
                              
                              // Real-time notification
                              toast("New message from Tanner", {
                                description: replyMsg.text,
                                icon: <MessageSquare className="w-4 h-4 text-primary" />,
                              });
                              setNotifications(prev => [{ id: Date.now(), title: 'New Message', message: `Tanner: ${replyMsg.text}`, time: new Date().toISOString(), read: false }, ...prev]);
                            }, 2000);
                          }
                        }
                      }}>Send</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedWorkOrder.status === 'Pending' && (
                <DialogFooter className="px-6 py-4 border-t bg-muted/20 shrink-0">
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => {
                    const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, status: 'Rejected' } : w);
                    setWorkOrders(updated);
                    setIsWorkOrderModalOpen(false);
                    toast.error(`Work Order Rejected`);
                    setActivityLogs(prev => [{ id: Date.now(), date: new Date().toISOString(), action: "Workflow Triggered", contractorName: selectedWorkOrder.client, details: `Work Order ${selectedWorkOrder.id} rejected.` }, ...prev]);
                  }}>Reject Order</Button>
                  <Button onClick={() => {
                    const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, status: 'Accepted' } : w);
                    setWorkOrders(updated);
                    setIsWorkOrderModalOpen(false);
                    toast.success(`Work Order Approved: Automated email sent to team.`);
                    setActivityLogs(prev => [{ id: Date.now(), date: new Date().toISOString(), action: "Workflow Triggered", contractorName: selectedWorkOrder.client, details: `Work Order ${selectedWorkOrder.id} approved. Email sent to team.` }, ...prev]);
                  }}>Approve Order</Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isWorkOrderSignModalOpen} onOpenChange={setIsWorkOrderSignModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Sign Agreement</DialogTitle>
            <DialogDescription>
              Please enter your full name to electronically sign this agreement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={signature} 
                onChange={(e) => setSignature(e.target.value)} 
                placeholder="John Doe"
              />
            </div>
            <div className="p-4 bg-slate-50 border rounded-lg flex items-center justify-center min-h-[100px]">
              <span className="font-signature text-3xl text-slate-800">{signature || "Preview..."}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWorkOrderSignModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (signature.trim() && selectedWorkOrder) {
                const updated = workOrders.map(w => w.id === selectedWorkOrder.id ? { ...w, termsAccepted: true, signature: signature, date: new Date().toISOString().split('T')[0] } : w);
                setWorkOrders(updated);
                setSelectedWorkOrder({...selectedWorkOrder, termsAccepted: true, signature: signature, date: new Date().toISOString().split('T')[0]});
                setIsWorkOrderSignModalOpen(false);
                toast.success("Agreement signed successfully");
              } else {
                toast.error("Please enter your name to sign");
              }
            }}>Sign Document</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCsvModalOpen} onOpenChange={setIsCsvModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Import Data (CSV)</DialogTitle>
            <DialogDescription>
              Paste your raw CSV text here. It should have columns like State, Trade, App Fee, Exam Fee, Renewal Fee, Notes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea 
              className="min-h-[200px] font-mono text-xs" 
              placeholder="State,Trade,App Fee,Exam Fee,Renewal Fee,Notes&#10;Nevada,Electrical,$300,$150,$200,None"
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCsvModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!csvText.trim()) return;
              const lines = csvText.trim().split('\n');
              const newFees = [];
              for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(',');
                if (parts.length >= 2) {
                  newFees.push({
                    id: Date.now() + i,
                    state: parts[0] || "",
                    trade: parts[1] || "",
                    appFee: parts[2] || "",
                    examFee: parts[3] || "",
                    renewalFee: parts[4] || "",
                    notes: parts[5] || ""
                  });
                }
              }
              if (newFees.length > 0) {
                setFeesList([...feesList, ...newFees]);
                toast(`Import Successful: Added ${newFees.length} new fees.`);
              }
              setCsvText("");
              setIsCsvModalOpen(false);
            }}>Parse & Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDocModalOpen} onOpenChange={setIsAddDocModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Document Title</label>
              <Input 
                placeholder="e.g. Liability Waiver - 2026" 
                value={newDoc.title}
                onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Placement / Contractor</label>
              <Input 
                placeholder="e.g. James Ortega → Lightning Electric" 
                value={newDoc.placement}
                onChange={(e) => setNewDoc({...newDoc, placement: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Document Type</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={newDoc.type}
                  onChange={(e) => setNewDoc({...newDoc, type: e.target.value})}
                >
                  <option value="Liability waiver">Liability waiver</option>
                  <option value="Agreement">Agreement</option>
                  <option value="Invoice">Invoice</option>
                  <option value="Authorization">Authorization</option>
                  <option value="State application">State application</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={newDoc.status}
                  onChange={(e) => setNewDoc({...newDoc, status: e.target.value})}
                >
                  <option value="Blocking">Blocking</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Signer</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newDoc.signer}
                onChange={(e) => setNewDoc({...newDoc, signer: e.target.value})}
              >
                <option value="Qualifier signs">Qualifier signs</option>
                <option value="Client signs">Client signs</option>
                <option value="Both sign">Both sign</option>
              </select>
            </div>
              <div className="space-y-2 col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Upload PDF</label>
                {isExtracting && <span className="text-xs text-primary flex items-center gap-1"><div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin"></div> Extracting data...</span>}
                {extractedData && !isExtracting && <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">OCR Extracted</Badge>}
              </div>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${isDragging ? 'border-primary bg-primary/5' : 'border-border/60 bg-muted/10 hover:bg-muted/30'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0] || null;
                    handleFileUpload(file);
                  };
                  input.click();
                }}
              >
                <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-sm font-medium text-foreground mb-1">
                  {isDragging ? "Drop file here" : "Click or drag PDF/Image to upload"}
                </p>
                <p className="text-xs text-muted-foreground">Maximum file size 50MB</p>
              </div>
              {newDoc.file && (
                <div className="mt-2 h-48 border rounded-md overflow-hidden bg-muted/10 relative group">
                  {newDoc.file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(newDoc.file)} className="w-full h-full object-contain" alt="Preview" />
                  ) : (
                    <iframe src={URL.createObjectURL(newDoc.file)} className="w-full h-full" title="Upload Preview" />
                  )}
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors pointer-events-none"></div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddDocModalOpen(false); setExtractedData(false); setIsExtracting(false); }}>Cancel</Button>
            <Button onClick={() => {
              if (!newDoc.title || !newDoc.placement) {
                toast.error("Please fill in required fields");
                return;
              }
              const docEntry = {
                id: Date.now(),
                title: newDoc.title,
                placement: newDoc.placement,
                type: newDoc.type,
                signer: newDoc.signer,
                status: newDoc.status,
                isSigned: false,
                note: newDoc.file ? `Attached: ${newDoc.file.name}` : "Pending signature"
              };
              setDocumentsList(prev => [docEntry, ...prev]);
              toast.success("Document added successfully");
              setIsAddDocModalOpen(false);
              setNewDoc({ title: "", placement: "", type: "Liability waiver", signer: "Qualifier signs", status: "Blocking", file: null });
              setExtractedData(false);
              setIsExtracting(false);
            }}>
              Add Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isSignModalOpen} onOpenChange={setIsSignModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>E-Signature Required</DialogTitle>
          </DialogHeader>
          {docToSign && (
            <div className="space-y-6 py-4">
              <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                <h3 className="font-semibold">{docToSign.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{docToSign.placement}</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-slate-50 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                  <FileSignature className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm">Document preview would appear here.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type your full name to sign</label>
                  <Input placeholder="John Doe" />
                </div>
                
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight">
                    I agree that this electronic signature is the legally binding equivalent to my handwritten signature.
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSignModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (docToSign) {
                setDocumentsList(prev => prev.map(d => d.id === docToSign.id ? {...d, isSigned: true, note: `E-Signed ${new Date().toLocaleDateString()}`} : d));
                toast.success(`${docToSign.title} has been electronically signed`);
                setNotifications(prev => [{ id: Date.now(), title: 'Document Signed', message: `${docToSign.title} for ${docToSign.placement.split('→')[0].trim()} was signed.`, time: new Date().toISOString(), read: false }, ...prev]);
                setIsSignModalOpen(false);
              }
            }}>
              <FileSignature className="w-4 h-4 mr-2" /> Sign Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewModalOpen} onOpenChange={(open) => {
        setIsPreviewModalOpen(open);
        if (!open) setIsPdfFullscreen(false);
      }}>
        <DialogContent className={`${isPdfFullscreen ? 'max-w-[100vw] w-screen h-screen rounded-none' : 'sm:max-w-4xl h-[85vh]'} flex flex-col p-0 overflow-hidden transition-all duration-300`}>
          <DialogHeader className="px-6 py-4 border-b border-border/50 shrink-0 flex flex-row items-center justify-between">
            <div>
              <DialogTitle>{docToPreview?.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{docToPreview?.placement} {docToPreview?.placement === "IQS Master Library" && `- Page ${currentPdfPage}`}</p>
            </div>
            <div className="flex items-center gap-2">
              {docToPreview?.placement === "IQS Master Library" && (
                <>
                  <Button variant="outline" size="sm" onClick={() => {
                    if (pdfBookmarks.includes(currentPdfPage)) {
                      setPdfBookmarks(prev => prev.filter(p => p !== currentPdfPage));
                      toast.success(`Removed bookmark for page ${currentPdfPage}`);
                    } else {
                      setPdfBookmarks(prev => [...prev, currentPdfPage]);
                      toast.success(`Bookmarked page ${currentPdfPage}`);
                    }
                  }}>
                    <Bookmark className={`w-4 h-4 mr-2 ${pdfBookmarks.includes(currentPdfPage) ? 'fill-primary text-primary' : ''}`} />
                    {pdfBookmarks.includes(currentPdfPage) ? 'Bookmarked' : 'Bookmark Page'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast.success("Highlights extracted to notes!");
                    setBookNotes(prev => prev + (prev ? "\n\n" : "") + `[Page ${currentPdfPage} Highlight]: Important section regarding compliance...`);
                    setIsNotesSidebarOpen(true);
                  }}>
                    <Highlighter className="w-4 h-4 mr-2" /> Extract Highlights
                  </Button>
                  <Button variant={isNotesSidebarOpen ? "default" : "outline"} size="sm" onClick={() => setIsNotesSidebarOpen(!isNotesSidebarOpen)}>
                    <Bookmark className="w-4 h-4 mr-2" /> Notes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsPdfFullscreen(!isPdfFullscreen)}>
                    <Maximize className="w-4 h-4 mr-2" /> {isPdfFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    setIsPreviewModalOpen(false);
                    setIsCompareModalOpen(true);
                  }}>
                    <Eye className="w-4 h-4 mr-2" /> Compare
                  </Button>
                </>
              )}
              {isAnnotating && (
                <div className="flex items-center gap-1 bg-muted p-1 rounded-md mr-2 animate-in fade-in zoom-in-95">
                  <Button variant={annotationTool === "draw" ? "secondary" : "ghost"} size="sm" className="h-8 px-3" onClick={() => setAnnotationTool("draw")}>
                    <PenTool className="w-3.5 h-3.5 mr-1.5" /> Draw
                  </Button>
                  <Button variant={annotationTool === "highlight" ? "secondary" : "ghost"} size="sm" className="h-8 px-3" onClick={() => setAnnotationTool("highlight")}>
                    <Highlighter className="w-3.5 h-3.5 mr-1.5" /> Highlight
                  </Button>
                  <Button variant={annotationTool === "signature_field" ? "secondary" : "ghost"} size="sm" className="h-8 px-3" onClick={() => setAnnotationTool("signature_field")}>
                    <Type className="w-3.5 h-3.5 mr-1.5" /> Signature Field
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => {
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      ctx?.clearRect(0, 0, canvas.width, canvas.height);
                    }
                    setSignatureFields([]);
                  }}>
                    Clear
                  </Button>
                </div>
              )}
              <Button variant={isAnnotating ? "default" : "outline"} size="sm" onClick={() => setIsAnnotating(!isAnnotating)}>
                <PenTool className="w-4 h-4 mr-2" /> {isAnnotating ? "Done Annotating" : "Prepare Document"}
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 flex overflow-hidden">
            <div 
              className="flex-1 bg-muted/30 relative flex items-center justify-center overflow-hidden"
              onMouseMove={handleContainerMouseMove}
              onMouseUp={handleContainerMouseUp}
              onMouseLeave={handleContainerMouseUp}
            >
            {docToPreview?.file ? (
              <>
                {docToPreview.file.type?.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(docToPreview.file)} 
                    className="max-w-full max-h-full object-contain pointer-events-none" 
                    alt="Document Preview" 
                  />
                ) : (
                  <iframe 
                    src={URL.createObjectURL(docToPreview.file)} 
                    className="w-full h-full border-0"
                    title="Document Preview"
                    style={{ pointerEvents: isAnnotating ? 'none' : 'auto' }}
                  />
                )}
                {isAnnotating && (
                  <>
                    <canvas 
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseOut={stopDrawing}
                    />
                    {signatureFields.map(field => (
                      <div 
                        key={field.id}
                        className="absolute border-2 border-dashed border-primary bg-primary/10 text-primary font-medium text-sm p-2 cursor-move flex flex-col items-center justify-center rounded shadow-sm z-20"
                        style={{ left: field.x, top: field.y, width: 150, height: 50 }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setDraggingField(field.id);
                        }}
                      >
                        Sign Here
                        <span className="text-[10px] opacity-80">({field.assignee})</span>
                        <button 
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-30"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSignatureFields(prev => prev.filter(f => f.id !== field.id));
                          }}
                        >×</button>
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div className="text-center space-y-4 p-8">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">{docToPreview?.title}</p>
                  <p className="text-sm mt-1">Preview not available for sample documents.</p>
                  <p className="text-xs mt-2">In a real app, this would load the PDF from your storage bucket.</p>
                </div>
              </div>
            )}
            {docToPreview?.placement === "IQS Master Library" && (
              <div className="absolute bottom-6 bg-white/90 backdrop-blur-sm border border-border/50 shadow-sm rounded-full px-4 py-2 flex items-center gap-4 z-50">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setCurrentPdfPage(Math.max(1, currentPdfPage - 1))} disabled={currentPdfPage === 1}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-20 text-center">Page {currentPdfPage}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setCurrentPdfPage(currentPdfPage + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
            </div>
            {isNotesSidebarOpen && docToPreview?.placement === "IQS Master Library" && (
              <div className="w-80 border-l border-border/50 bg-white flex flex-col shrink-0 animate-in slide-in-from-right-4">
                <div className="p-4 border-b border-border/50 bg-muted/10">
                  <h4 className="font-semibold flex items-center gap-2"><Bookmark className="w-4 h-4 text-primary" /> My Notes</h4>
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <Textarea 
                    className="flex-1 resize-none border-none shadow-none focus-visible:ring-0 p-0 text-sm leading-relaxed" 
                    placeholder="Type your notes here... They will be saved automatically."
                    value={bookNotes}
                    onChange={(e) => setBookNotes(e.target.value)}
                  />
                </div>
                <div className="p-4 border-t border-border/50 bg-muted/10 text-xs text-muted-foreground flex justify-between items-center">
                  <span>{bookNotes.length} characters</span>
                  <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-3 h-3" /> Saved</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="px-6 py-4 border-t border-border/50 shrink-0 bg-white dark:bg-slate-950 flex justify-between items-center w-full">
            <div className="text-xs text-muted-foreground">
              {isAnnotating ? "Annotations are saved locally for this session." : "Viewing document securely."}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsPreviewModalOpen(false)}>Close</Button>
              {isAnnotating ? (
                <Button onClick={() => {
                  toast.success("Annotations saved to document");
                  setIsAnnotating(false);
                }}>Save Annotations</Button>
              ) : (
                <Button><Download className="w-4 h-4 mr-2" /> Download Document</Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 border border-border/50 rounded-lg bg-muted/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Credit Card Details</span>
                <div className="flex gap-1">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                  <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold">MC</div>
                  <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold">AMEX</div>
                </div>
              </div>
              <div className="space-y-4 bg-white p-4 rounded-md border border-border shadow-sm">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Card Information</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Card number" className="pl-9 rounded-b-none border-b-0 focus-visible:z-10" />
                  </div>
                  <div className="grid grid-cols-2">
                    <Input placeholder="MM / YY" className="rounded-t-none rounded-br-none focus-visible:z-10" />
                    <div className="relative">
                      <Input placeholder="CVC" className="rounded-t-none rounded-bl-none border-l-0 focus-visible:z-10" type="password" />
                      <Lock className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Payments are processed securely via Stripe.</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Payment method updated securely via Stripe integration");
              setIsPaymentModalOpen(false);
            }}>Save Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubscribeModalOpen} onOpenChange={setIsSubscribeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subscribe to Reciprocity Map</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 border border-border/50 rounded-lg bg-muted/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Payment Details</span>
                <div className="flex gap-1">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                  <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] text-white font-bold">MC</div>
                  <div className="w-8 h-5 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold">AMEX</div>
                </div>
              </div>
              <div className="space-y-4 bg-white dark:bg-slate-950 p-4 rounded-md border border-border shadow-sm">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Card Information</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Card number" className="pl-9 rounded-b-none border-b-0 focus-visible:z-10" />
                  </div>
                  <div className="grid grid-cols-2">
                    <Input placeholder="MM / YY" className="rounded-t-none rounded-br-none focus-visible:z-10" />
                    <div className="relative">
                      <Input placeholder="CVC" className="rounded-t-none rounded-bl-none border-l-0 focus-visible:z-10" type="password" />
                      <Lock className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Cardholder Name</label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Payments are processed securely via Stripe.</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubscribeModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Subscription activated securely via Stripe integration!");
              setIsSubscribeModalOpen(false);
            }}>Confirm Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBackgroundModalOpen} onOpenChange={setIsBackgroundModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Automated Background Check</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 border border-border/50 rounded-lg bg-muted/10 text-sm text-muted-foreground">
              By initiating this check, you consent to a comprehensive background check through our API partner Checkr. The system listens for asynchronous webhooks to update your status upon completion.
            </div>
            {isCheckingBackground ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="text-sm font-medium animate-pulse text-center">
                  Check initiated.<br/>
                  <span className="text-xs text-muted-foreground font-normal">Awaiting webhook callback from background check provider...</span>
                </p>
                <Button variant="outline" size="sm" className="mt-4 text-xs" onClick={() => {
                  setIsCheckingBackground(false);
                  setBackgroundCheckStatus("Valid until " + new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }));
                  toast.success("Webhook received: Background check cleared.");
                  setIsBackgroundModalOpen(false);
                }}>
                  Simulate Webhook Delivery
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Checkbox id="consent" />
                  <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I authorize the background check
                  </label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBackgroundModalOpen(false)} disabled={isCheckingBackground}>Cancel</Button>
            {!isCheckingBackground && (
              <Button 
                onClick={() => {
                  setIsCheckingBackground(true);
                  toast.info("API Request sent. Waiting for webhook response.");
                }}
              >
                Initiate Check
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isWidgetModalOpen} onOpenChange={setIsWidgetModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Dashboard Widgets</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {availableWidgets.map(widget => (
              <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
                <span className="text-sm font-medium">{widget.title}</span>
                <Checkbox 
                  checked={pinnedWidgets.includes(widget.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPinnedWidgets([...pinnedWidgets, widget.id]);
                    } else {
                      setPinnedWidgets(pinnedWidgets.filter(id => id !== widget.id));
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsWidgetModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAutoInvoiceModalOpen} onOpenChange={setIsAutoInvoiceModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Auto-Generate Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Placement</label>
              <Input 
                placeholder="e.g. James Ortega → Lightning Electric" 
                value={autoInvoiceData.placement}
                onChange={(e) => setAutoInvoiceData({...autoInvoiceData, placement: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee Amount ($)</label>
              <Input 
                type="number"
                placeholder="e.g. 750" 
                value={autoInvoiceData.amount}
                onChange={(e) => setAutoInvoiceData({...autoInvoiceData, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                placeholder="e.g. Service Fee" 
                value={autoInvoiceData.description}
                onChange={(e) => setAutoInvoiceData({...autoInvoiceData, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAutoInvoiceModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!autoInvoiceData.placement || !autoInvoiceData.amount) {
                toast.error("Please fill in placement and amount");
                return;
              }
              const newInvoice = {
                id: Date.now(),
                title: `${autoInvoiceData.description || 'Invoice'} ($${autoInvoiceData.amount})`,
                placement: autoInvoiceData.placement,
                type: "Invoice",
                signer: "Client signs",
                status: "Pending",
                isSigned: false,
                note: "Auto-generated"
              };
              setDocumentsList(prev => [newInvoice, ...prev]);
              toast.success("Invoice generated and added to tracker");
              setIsAutoInvoiceModalOpen(false);
              setAutoInvoiceData({ placement: "", amount: "", description: "" });
            }}>Generate Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Call</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                placeholder="e.g. Intro Call - John Doe" 
                value={scheduleData.title}
                onChange={(e) => setScheduleData({...scheduleData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <Input 
                type="datetime-local"
                value={scheduleData.date}
                onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Call Type</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={scheduleData.type}
                onChange={(e) => setScheduleData({...scheduleData, type: e.target.value})}
              >
                <option value="Intro Call">Intro Call</option>
                <option value="Interview">Interview</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!scheduleData.title || !scheduleData.date) {
                toast.error("Please fill in title and date");
                return;
              }
              const newCall = {
                id: Date.now(),
                title: scheduleData.title,
                date: new Date(scheduleData.date),
                type: scheduleData.type
              };
              setScheduledCalls(prev => [...prev, newCall]);
              toast.success("Call scheduled successfully");
              setIsScheduleModalOpen(false);
              setScheduleData({ title: "", date: "", type: "Intro Call" });
            }}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddBookModalOpen} onOpenChange={setIsAddBookModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Book to Library</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Book Title</label>
              <Input 
                placeholder="e.g. 2024 International Plumbing Code" 
                value={newBook.title}
                onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={newBook.category}
                onChange={(e) => setNewBook({...newBook, category: e.target.value})}
              >
                <option value="Code Books">Code Books</option>
                <option value="State Specific">State Specific</option>
                <option value="Safety">Safety</option>
                <option value="Business & Finance">Business & Finance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Rental Price</label>
              <Input 
                placeholder="e.g. $29/mo" 
                value={newBook.price}
                onChange={(e) => setNewBook({...newBook, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload PDF</label>
              <div 
                className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer border-border/60 bg-muted/10 hover:bg-muted/30"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0] || null;
                    if (file) {
                      setNewBook({...newBook, file, title: newBook.title || file.name.replace('.pdf', '')});
                    }
                  };
                  input.click();
                }}
              >
                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">
                  {newBook.file ? newBook.file.name : "Click to select PDF"}
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddBookModalOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!newBook.title || !newBook.file) {
                toast.error("Please provide a title and upload a file");
                return;
              }
              const newEntry = {
                id: Date.now(),
                title: newBook.title,
                category: newBook.category,
                image: "https://vibe.filesafe.space/1783701563732099364/assets/fc623ffd-9fca-4d31-b99f-bb1c9f42c91a.png", // placeholder
                status: "Active",
                expires: "Never",
                price: newBook.price,
                file: newBook.file
              };
              setLibraryBooks(prev => [newEntry, ...prev]);
              toast.success("Book added to library successfully");
              setIsAddBookModalOpen(false);
              setNewBook({ title: "", category: "Code Books", price: "$29/mo", file: null });
            }}>Add Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Live Whiteboard Modal */}
      <Dialog open={isWhiteboardOpen} onOpenChange={setIsWhiteboardOpen}>
        <DialogContent className="max-w-[90vw] w-[1200px] max-h-[90vh] h-[800px] flex flex-col p-0 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-slate-50">
            <div className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Live Collaborative Whiteboard</h3>
              <Badge className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span> Live Session
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 mr-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                    U{i}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsWhiteboardOpen(false)}>Leave</Button>
            </div>
          </div>
          <div className="flex-1 flex bg-slate-100 relative">
            <div className="w-16 bg-white border-r border-border/50 flex flex-col items-center py-4 gap-4">
              <Button variant="ghost" size="icon" className="bg-primary/10 text-primary hover:bg-primary/20"><PenTool className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Highlighter className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Type className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Undo className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><Trash2 className="w-5 h-5 text-red-500" /></Button>
            </div>
            <div className="flex-1 relative overflow-hidden bg-white cursor-crosshair">
              {/* Decorative grid background for whiteboard */}
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground pointer-events-none">
                <PenTool className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="opacity-50 text-lg">Interactive Whiteboard Active</p>
                <p className="opacity-40 text-sm">Draw, type, and collaborate in real-time</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Comparison Modal */}
      <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
        <DialogContent className="max-w-[95vw] w-[1400px] max-h-[95vh] h-[900px] flex flex-col p-0 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-slate-50">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Document Comparison</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsCompareModalOpen(false)}>Close</Button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 border-r border-border/50 flex flex-col">
              <div className="p-3 bg-white border-b border-border/50 flex items-center justify-between">
                <span className="font-medium text-sm truncate">Original Document.pdf</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
                  <span className="text-xs">Page 1</span>
                  <Button variant="outline" size="icon" className="w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 p-8 overflow-auto flex justify-center">
                <div className="w-full max-w-2xl bg-white shadow-md h-[1000px] p-12">
                  <div className="h-6 w-3/4 bg-slate-200 rounded mb-6"></div>
                  <div className="h-4 w-full bg-slate-100 rounded mb-3"></div>
                  <div className="h-4 w-full bg-slate-100 rounded mb-3"></div>
                  <div className="h-4 w-5/6 bg-slate-100 rounded mb-8"></div>
                  <div className="h-32 w-full bg-slate-50 border border-slate-200 rounded mb-8"></div>
                  <div className="h-4 w-full bg-slate-100 rounded mb-3"></div>
                  <div className="h-4 w-4/5 bg-slate-100 rounded mb-3"></div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col relative">
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-white border border-border/50 rounded-full shadow-lg flex items-center justify-center z-10 text-primary">
                <Eye className="w-4 h-4" />
              </div>
              <div className="p-3 bg-white border-b border-border/50 flex items-center justify-between">
                <span className="font-medium text-sm truncate">Revised Document.pdf</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="w-8 h-8"><ChevronLeft className="w-4 h-4" /></Button>
                  <span className="text-xs">Page 1</span>
                  <Button variant="outline" size="icon" className="w-8 h-8"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex-1 bg-slate-100 p-8 overflow-auto flex justify-center">
                <div className="w-full max-w-2xl bg-white shadow-md h-[1000px] p-12">
                  <div className="h-6 w-3/4 bg-slate-200 rounded mb-6"></div>
                  <div className="h-4 w-full bg-slate-100 rounded mb-3"></div>
                  <div className="h-4 w-full bg-emerald-100 rounded mb-3 relative">
                    <span className="absolute -left-6 top-0 text-emerald-500 text-xs font-bold">+</span>
                  </div>
                  <div className="h-4 w-5/6 bg-slate-100 rounded mb-8"></div>
                  <div className="h-32 w-full bg-slate-50 border border-slate-200 rounded mb-8"></div>
                  <div className="h-4 w-full bg-red-100 rounded mb-3 relative">
                    <span className="absolute -left-6 top-0 text-red-500 text-xs font-bold">-</span>
                  </div>
                  <div className="h-4 w-4/5 bg-slate-100 rounded mb-3"></div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Exam Generator Modal */}
      <Dialog open={isAiExamModalOpen} onOpenChange={setIsAiExamModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              AI Practice Exam Generator
            </DialogTitle>
            <DialogDescription>
              Select a source book from the Master Library to generate a practice exam.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Source Material</Label>
              <Select defaultValue="ibc">
                <SelectTrigger>
                  <SelectValue placeholder="Select book..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ibc">International Building Code (IBC) 2021</SelectItem>
                  <SelectItem value="nec">National Electrical Code (NEC) 2023</SelectItem>
                  <SelectItem value="osha">OSHA Safety Standards</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Number of Questions</Label>
              <Select defaultValue="25">
                <SelectTrigger>
                  <SelectValue placeholder="Select amount..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 Questions (Quick Quiz)</SelectItem>
                  <SelectItem value="25">25 Questions (Standard)</SelectItem>
                  <SelectItem value="50">50 Questions (Full Exam)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Focus Areas (Optional)</Label>
              <Input placeholder="e.g. Electrical Safety, Accessibility" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAiExamModalOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => {
              toast.success("AI is generating your exam! This may take a moment.");
              setIsAiExamModalOpen(false);
            }}>
              Generate Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deck Builder Modal */}
      <Dialog open={isDeckBuilderOpen} onOpenChange={setIsDeckBuilderOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Flashcard Deck</DialogTitle>
            <DialogDescription>
              Build a custom flashcard deck with tags and categories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Deck Name</Label>
                <Input placeholder="e.g. Code Review Basics" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="general">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Knowledge</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tags (Comma separated)</Label>
              <Input placeholder="e.g. hard, review, chapter-1" />
            </div>
            <div className="border border-border/50 rounded-lg p-4 bg-slate-50">
              <h4 className="font-medium text-sm mb-4">Cards</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Front</Label>
                    <Input placeholder="Question or term" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Back</Label>
                    <Input placeholder="Answer or definition" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-dashed">
                  <Plus className="w-4 h-4 mr-2" /> Add Card
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeckBuilderOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Deck created successfully!");
              setIsDeckBuilderOpen(false);
            }}>
              Save Deck
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compliance Tracker Map Modal */}
      <Dialog open={isComplianceMapOpen} onOpenChange={setIsComplianceMapOpen}>
        <DialogContent className="max-w-[90vw] w-[1200px] max-h-[90vh] h-[800px] flex flex-col p-0 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-slate-50">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Compliance Tracker Map</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsComplianceMapOpen(false)}>Close</Button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-80 border-r border-border/50 bg-white p-4 flex flex-col gap-4 overflow-y-auto">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">State Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="req-background" defaultChecked />
                    <label htmlFor="req-background" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requires Background Check</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="req-credit" defaultChecked />
                    <label htmlFor="req-credit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requires Credit Report</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="req-exam" />
                    <label htmlFor="req-exam" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Requires State Exam</label>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Selected State Details</Label>
                <div className="bg-slate-50 p-3 rounded-lg border border-border/50">
                  <h4 className="font-bold text-lg text-primary mb-2">Florida</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">App Fee:</span>
                      <span className="font-medium">$249.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Renewal:</span>
                      <span className="font-medium">Every 2 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CE Required:</span>
                      <span className="font-medium">14 hours</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">View Full Requirements</Button>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center relative">
              <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm border border-border/50 flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Fully Compliant</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Action Needed</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Non-Compliant</div>
              </div>
              <div className="w-full max-w-4xl opacity-50 pointer-events-none">
                <Map className="w-full h-full text-slate-300" />
                <p className="text-center mt-4 text-muted-foreground font-medium">Interactive SVG Map Rendered Here</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Affiliate Modal */}
      <Dialog open={isAddAffiliateOpen} onOpenChange={setIsAddAffiliateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Affiliate Partner</DialogTitle>
            <DialogDescription>
              Create a new affiliate partner profile. They will receive an email to set up their own payment processor.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Partner / Company Name</Label>
              <Input id="affiliate-name" placeholder="e.g. BuildTech Solutions" />
            </div>
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input id="affiliate-contact" placeholder="e.g. Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input id="affiliate-email" type="email" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Commission Rate (%)</Label>
              <Input id="affiliate-commission" type="number" placeholder="10" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAffiliateOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              const name = (document.getElementById('affiliate-name') as HTMLInputElement)?.value || 'New Affiliate';
              const contact = (document.getElementById('affiliate-contact') as HTMLInputElement)?.value || 'N/A';
              const email = (document.getElementById('affiliate-email') as HTMLInputElement)?.value || 'email@example.com';
              const commission = parseInt((document.getElementById('affiliate-commission') as HTMLInputElement)?.value || '10');
              
              setAffiliates(prev => [...prev, {
                id: `AFF-00${prev.length + 1}`,
                name,
                contact,
                email,
                commission,
                paymentStatus: "Pending Setup",
                status: "Active",
                referrals: 0,
                revenue: 0
              }]);
              toast.success("Affiliate added! Invitation sent to setup payment processor.");
              setIsAddAffiliateOpen(false);
            }}>
              Add Partner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Affiliate Details Modal */}
      <Dialog open={isAffiliateModalOpen} onOpenChange={setIsAffiliateModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Affiliate Details: {selectedAffiliate?.name}</DialogTitle>
            <DialogDescription>
              Detailed view of referrals and performance for {selectedAffiliate?.contact}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Commission Rate</div>
                <div className="text-xl font-semibold">{selectedAffiliate?.commission}%</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Total Referrals</div>
                <div className="text-xl font-semibold">{selectedAffiliate?.referrals || 0}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-border/50">
                <div className="text-sm text-muted-foreground mb-1">Revenue Generated</div>
                <div className="text-xl font-semibold text-primary">${(selectedAffiliate?.revenue || 0).toLocaleString()}</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Recent Referrals</h4>
              <div className="border border-border/50 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Commission Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Acme Corp</TableCell>
                      <TableCell>2026-06-15</TableCell>
                      <TableCell><Badge>Placed</Badge></TableCell>
                      <TableCell className="text-right">$1,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>BuildRight LLC</TableCell>
                      <TableCell>2026-07-02</TableCell>
                      <TableCell><Badge variant="secondary">In Progress</Badge></TableCell>
                      <TableCell className="text-right">--</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAffiliateModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Affiliate Chat Modal */}
      <Dialog open={isAffiliateChatOpen} onOpenChange={setIsAffiliateChatOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Chat with {selectedAffiliateForChat?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 rounded-md border border-border/50">
            {affiliateChatMessages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'Admin' ? 'bg-primary text-primary-foreground' : 'bg-white border border-border/50'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">{msg.sender} • {msg.time}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Input 
              value={newAffiliateMessage} 
              onChange={(e) => setNewAffiliateMessage(e.target.value)} 
              placeholder="Type a message..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newAffiliateMessage.trim()) {
                  setAffiliateChatMessages([...affiliateChatMessages, { sender: "Admin", text: newAffiliateMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
                  setNewAffiliateMessage("");
                }
              }}
            />
            <Button onClick={() => {
              if (newAffiliateMessage.trim()) {
                setAffiliateChatMessages([...affiliateChatMessages, { sender: "Admin", text: newAffiliateMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
                setNewAffiliateMessage("");
              }
            }}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Affiliate Payout History Modal */}
      <Dialog open={isPayoutHistoryOpen} onOpenChange={setIsPayoutHistoryOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payout History - {selectedAffiliateForPayouts?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.id}</TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>{payout.amount}</TableCell>
                    <TableCell>{payout.method}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">{payout.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => {
              toast.success(`PDF Export started for ${selectedAffiliateForPayouts?.name}'s payment history`);
              setTimeout(() => {
                const link = document.createElement("a");
                link.href = "data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAwALJMLU31jBQsTAz1LBSK0xPzS1JzU4uL83N0FTILC4oSSzLz81wVshLzUvVclXLy0xWKEvPSU4tKkiv1DA0UjBQsLAAhpxYqCmVuZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKMzEwCmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3ggWzAgMCA1OTUgODQyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgMSAwIFI+Pj4+L0NvbnRlbnRzIDIgMCBSL1BhcmVudCA1IDAgUj4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKCjUgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbNCAwIFJdPj4KZW5kb2JqCgo2IDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA1IDAgUj4+CmVuZG9iagoKNyAwIG9iago8PC9Qcm9kdWNlcihpVGV4dCByNS41LjEwIChjKTIwMDAtMjAxNiBpVGV4dCBHcm91cCBOViBcKGh0dHA6Ly9pdGV4dHBkZi5jb21cKSk+PgplbmRvYmoKCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDI1MiAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxMjUgMDAwMDAgbiAKMDAwMDAwMDE0NCAwMDAwMCBuIAowMDAwMDAwMzQwIDAwMDAwIG4gCjAwMDAwMDAzOTkgMDAwMDAgbiAKMDAwMDAwMDQ0NCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgOC9Sb290IDYgMCBSL0luZm8gNyAwIFIvSUQgWzwxZWEzMjQ0OWI5ZTMyMmE3YzBhNDQyNjhmMzFjMzJmYz48ZmFlODRmNTI5MmYzNmJjYzBhNGQyNjhmMzFjMzJmYz5dPj4Kc3RhcnR4cmVmCjU2MQolJUVPRgo=";
                link.download = `${selectedAffiliateForPayouts?.name?.replace(/\s+/g, '_')}_Payment_History.pdf`;
                link.click();
              }, 1000);
            }}>
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
            <Button variant="outline" onClick={() => setIsPayoutHistoryOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Resolve Deficiency Modal */}
      <Dialog open={isResolveDeficiencyOpen} onOpenChange={setIsResolveDeficiencyOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Resolve Deficiency</DialogTitle>
            <DialogDescription>
              Upload required documentation to resolve the issue for {selectedDeficiency?.contractor}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <h4 className="font-semibold text-amber-700 dark:text-amber-500 mb-1">Issue Details</h4>
              <p className="text-sm text-amber-600 dark:text-amber-400">{selectedDeficiency?.issue}</p>
            </div>
            
            <div className="space-y-2">
              <Label>Upload Documentation</Label>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setDeficiencyFile(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => {
                  // Simulate file picker
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = (e: any) => {
                    if (e.target.files && e.target.files[0]) {
                      setDeficiencyFile(e.target.files[0]);
                    }
                  };
                  input.click();
                }}
              >
                {deficiencyFile ? (
                  <div className="flex flex-col items-center">
                    <FileText className="w-8 h-8 text-primary mb-2" />
                    <span className="text-sm font-medium">{deficiencyFile.name}</span>
                    <Button variant="link" size="sm" className="text-destructive mt-2" onClick={(e) => { e.stopPropagation(); setDeficiencyFile(null); }}>Remove</Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Upload className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm font-medium">Drag & drop file here</p>
                    <p className="text-xs mt-1">or click to browse</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Resolution Notes</Label>
              <Textarea placeholder="Add any notes about this resolution..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResolveDeficiencyOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Deficiency marked as pending review!");
              setDeficiencies(deficiencies.map(d => d.id === selectedDeficiency?.id ? {...d, status: "Pending Review"} : d));
              setIsResolveDeficiencyOpen(false);
              setDeficiencyFile(null);
            }}>Submit Resolution</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Handoff Modal */}
      <Dialog open={isHandoffModalOpen} onOpenChange={setIsHandoffModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Handoff</DialogTitle>
            <DialogDescription>Review lead details, manage notes, and track commissions.</DialogDescription>
          </DialogHeader>
          {selectedHandoff && (
            <Tabs defaultValue="details" className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Lead Details</TabsTrigger>
                <TabsTrigger value="sequence">Follow-up Sequence</TabsTrigger>
                <TabsTrigger value="commission">Commission</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Client Name</Label>
                    <p className="font-medium">{selectedHandoff.name}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Referred By</Label>
                    <p className="font-medium">{selectedHandoff.affiliate}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Service Needed</Label>
                    <p className="font-medium">{selectedHandoff.service}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    <p className="font-medium">{selectedHandoff.status}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lead Notes</Label>
                  <Textarea placeholder="Add notes from initial contact or review..." className="min-h-[100px]" defaultValue="Left a voicemail on Tuesday. Waiting for a callback regarding specific state requirements." />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => { toast.success("Notes saved!"); setIsHandoffModalOpen(false); }}>Save Notes</Button>
                </div>
              </TabsContent>

              <TabsContent value="sequence" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                    <div>
                      <p className="font-medium text-sm">Active Sequence</p>
                      <p className="text-xs text-muted-foreground">Currently running: {selectedHandoff.sequence}</p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Change Sequence</Label>
                    <Select defaultValue="initial">
                      <SelectTrigger>
                        <SelectValue placeholder="Select sequence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="initial">Initial Contact (3 emails)</SelectItem>
                        <SelectItem value="followup">Follow-up Nurture (5 emails)</SelectItem>
                        <SelectItem value="re-engage">Re-engagement (2 emails)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Sequence paused")}><Pause className="w-4 h-4 mr-2" /> Pause Sequence</Button>
                    <Button size="sm" onClick={() => toast.success("Sequence updated")}>Update Sequence</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="commission" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex flex-col gap-1">
                      <p className="text-sm text-muted-foreground">Expected Commission</p>
                      <p className="text-2xl font-bold">{selectedHandoff.commission}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex flex-col gap-1">
                      <p className="text-sm text-muted-foreground">Commission Rate</p>
                      <p className="text-2xl font-bold">12.5%</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <Label>Payout Status</Label>
                  <Select defaultValue={selectedHandoff.status === 'Converted' ? 'pending_payout' : 'pending_conversion'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending_conversion">Pending Conversion</SelectItem>
                      <SelectItem value="pending_payout">Pending Payout</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between items-center pt-4 border-t mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-slate-50">
                      <CreditCard className="w-3 h-3 mr-1" /> Stripe Auto-Payout Ready
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => { toast.success("Status updated!"); setIsHandoffModalOpen(false); }}>Save Status</Button>
                    <Button onClick={() => { 
                      toast.success(`Processing ${selectedHandoff.commission} payout via Stripe...`); 
                      setTimeout(() => {
                        toast.success("Payout processed successfully!");
                        setIsHandoffModalOpen(false);
                      }, 1500);
                    }}>
                      Process Payout
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

    </Layout>
  );
};
export default Index;
