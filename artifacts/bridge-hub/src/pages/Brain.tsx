import { AlertTriangle, Brain as BrainIcon, Zap, Route } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Brain() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-12">
      
      {/* Hero Banner */}
      <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#f59e0b]"></div>
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-[#f59e0b] shrink-0 mt-1" />
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-2">
              ⚠️ Caution: Teen Brain Under Construction
            </h1>
            <h2 className="text-xl text-foreground/80 font-medium mb-3">
              Full Accelerator, Brakes Not Yet Installed
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Prefrontal Cortex — responsible for planning, impulse control, and consequences — doesn't fully mature until around age 25.
            </p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-serif font-medium mb-6">Three Pillars of Brain Development</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card shadow-sm border-border/50">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 text-primary">
                <Route className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-serif">1. Pruning</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              <strong>"Use It or Lose It"</strong> — Starting at 11 (girls) / 12 (boys), unused neural pathways are cut away. The pathways teens use most grow stronger and faster. This is why habits — good or bad — formed in adolescence are so powerful. Encouraging healthy choices now literally shapes the brain.
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm border-border/50">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-serif">2. White Matter</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              The myelin sheath (a white protective coating on neurons' axons) thickens during adolescence. This is like upgrading from a dirt path to a paved highway — signals travel faster and more efficiently. Healthy behaviors create faster, stronger neural highways.
            </CardContent>
          </Card>

          <Card className="bg-card shadow-sm border-border/50">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2 text-primary">
                <BrainIcon className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-serif">3. Gray Matter</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Un-myelinated cell bodies that process signals are still under construction. This explains why teens can hear your message but struggle to logically act on it — the processing center isn't finished being built yet.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-secondary/50 rounded-2xl p-6 md:p-8 border border-border/50">
        <h2 className="text-2xl font-serif font-medium mb-6 text-center">The Mid-Brain Triad</h2>
        <div className="space-y-6">
          <div className="bg-background p-5 rounded-xl shadow-sm border border-border/50">
            <h3 className="text-xl font-serif font-medium text-primary mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Hippocampus (Memory)
            </h3>
            <p className="text-muted-foreground">
              Highly active — teens form vivid, lasting memories during this period. Emotional memories especially. This is why moments of shame or pride in adolescence echo for decades.
            </p>
          </div>

          <div className="bg-background p-5 rounded-xl shadow-sm border border-border/50">
            <h3 className="text-xl font-serif font-medium text-destructive mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive"></span>
              Amygdala (Emotion)
            </h3>
            <p className="text-muted-foreground">
              Supercharged by puberty hormones. Interprets threats more intensely. This is why everything feels like a crisis to them — because neurologically, it is.
            </p>
          </div>

          <div className="bg-background p-5 rounded-xl shadow-sm border border-border/50">
            <h3 className="text-xl font-serif font-medium text-accent mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Nucleus Accumbens (Reward)
            </h3>
            <p className="text-muted-foreground">
              Drives peer motivation and risk-seeking. Reward circuits are heightened; the pull of social approval is neurologically real, not just immaturity.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-medium mb-6">Brain Maturation Timeline</h2>
        <div className="relative pt-8 pb-12">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted-foreground/20 -translate-y-1/2 rounded-full"></div>
          
          <div className="flex justify-between relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-muted-foreground/40 mb-2 ring-4 ring-background"></div>
              <span className="text-sm font-medium">Childhood</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-primary/60 mb-2 ring-4 ring-background"></div>
              <span className="text-sm font-medium text-primary">Age 11-12</span>
              <span className="text-xs text-muted-foreground absolute -bottom-6 whitespace-nowrap">Pruning begins</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-primary/80 mb-2 ring-4 ring-background"></div>
              <span className="text-sm font-medium text-primary">Age 15-17</span>
              <span className="text-xs text-muted-foreground absolute -bottom-6 whitespace-nowrap">Peak risk-seeking</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-primary mb-2 ring-4 ring-background shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
              <span className="text-sm font-bold text-primary">Age 25+</span>
              <span className="text-xs text-muted-foreground absolute -bottom-6 whitespace-nowrap">Prefrontal cortex matures</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-center text-muted-foreground italic mt-8">
          Note: Development can extend to age 29, especially in boys or individuals with mental health challenges.
        </p>
      </section>
    </div>
  );
}
