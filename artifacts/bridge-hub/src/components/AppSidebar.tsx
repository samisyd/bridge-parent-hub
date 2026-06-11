import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, BookOpen, Brain, Activity, Heart, ShieldAlert, AlertTriangle, HelpCircle, Trophy, Moon } from "lucide-react";

export function AppSidebar() {
  const [location] = useLocation();
  const { setOpenMobile } = useSidebar();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Parent Guide", href: "/guide", icon: BookOpen },
    { name: "Teen Brain", href: "/brain", icon: Brain },
    { name: "Behavioral Tools", href: "/tools", icon: Activity },
    { name: "Mindfulness", href: "/mindfulness", icon: Heart },
    { name: "Teen Sleep Guide", href: "/sleep", icon: Moon },
    { name: "Online Safety", href: "/safety", icon: ShieldAlert },
    { name: "Crisis & Resources", href: "/crisis", icon: AlertTriangle },
    { name: "What to Say", href: "/faq", icon: HelpCircle },
    { name: "Rules & Rewards", href: "/rewards", icon: Trophy },
  ];

  return (
    <Sidebar variant="inset" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4 pt-6">
        <h2 className="text-xl font-serif font-medium text-sidebar-primary-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Bridge
        </h2>
        <p className="text-xs text-sidebar-foreground/70 mt-1">Parent Support Hub</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-3 gap-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`w-full justify-start rounded-md transition-colors ${
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  onClick={() => setOpenMobile(false)}
                >
                  <Link href={item.href} className="flex items-center gap-3 w-full p-2" data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-sidebar-foreground/50">
        You're doing important work.
      </SidebarFooter>
    </Sidebar>
  );
}
