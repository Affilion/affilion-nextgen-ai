import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Impresszum from "./pages/Impresszum";
import Adatvedelem from "./pages/Adatvedelem";
import PaymentSuccess from "./pages/PaymentSuccess";
import AiClubSuccess from "./pages/AiClubSuccess";
import AiClubDiscordCallback from "./pages/AiClubDiscordCallback";
import Csatlakozas from "./pages/Csatlakozas";
import WebGyarTutorial from "@/pages/WebGyarTutorial";
import Eszkoztarak from "@/pages/Eszkoztarak";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <GlobalAudioPlayer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tartalmaim" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/impresszum" element={<Impresszum />} />
            <Route path="/adatvedelem" element={<Adatvedelem />} />
            <Route path="/fizetes-sikeres" element={<PaymentSuccess />} />
            <Route path="/ai-club/success" element={<AiClubSuccess />} />
            <Route path="/ai-club/discord-callback" element={<AiClubDiscordCallback />} />
            <Route path="/csatlakozas" element={<Csatlakozas />} />
            <Route path="/sajat-weboldal-kurzus" element={<WebGyarTutorial />} />
            <Route path="/eszkoztarak" element={<Eszkoztarak />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
