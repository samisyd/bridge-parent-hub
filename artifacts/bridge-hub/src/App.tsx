import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Guide from "@/pages/Guide";
import Brain from "@/pages/Brain";
import Tools from "@/pages/Tools";
import Mindfulness from "@/pages/Mindfulness";
import Safety from "@/pages/Safety";
import Crisis from "@/pages/Crisis";
import FAQ from "@/pages/FAQ";

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/guide" component={Guide} />
        <Route path="/brain" component={Brain} />
        <Route path="/tools" component={Tools} />
        <Route path="/mindfulness" component={Mindfulness} />
        <Route path="/safety" component={Safety} />
        <Route path="/crisis" component={Crisis} />
        <Route path="/faq" component={FAQ} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
