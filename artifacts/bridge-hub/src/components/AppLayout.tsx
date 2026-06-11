import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary/20">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-[100dvh] w-full lg:max-w-5xl mx-auto overflow-hidden">
          <div className="p-4 md:hidden border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-40 flex items-center gap-3">
            <SidebarTrigger />
            <span className="font-serif font-medium">Bridge</span>
          </div>
          <div className="flex-1 p-4 md:p-8 lg:p-10 w-full overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
