import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Roles from "./pages/Roles";
import Onboarding from "./pages/Onboarding";
import Retention from "./pages/Retention";
import Login from "./pages/Login";
import Export from "./pages/Export";
import Settings from "./pages/Settings";
import { RoleProvider } from "./lib/RoleContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/retention" element={<Retention />} />
            <Route path="/login" element={<Login />} />
            <Route path="/export" element={<Export />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
