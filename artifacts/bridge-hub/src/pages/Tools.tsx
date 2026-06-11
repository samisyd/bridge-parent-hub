import { useState, useEffect } from "react";
import { Check, Play, Square, Thermometer, AlertCircle, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Tools() {
  const [timers, setTimers] = useState<{ [key: string]: number }>({
    morning: 600,
    reunion: 600,
    bedtime: 600
  });
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [completedTimers, setCompletedTimers] = useState<{ [key: string]: boolean }>({
    morning: false,
    reunion: false,
    bedtime: false
  });
  
  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("bridge_timers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only load if it's the same day
        if (parsed.date === new Date().toDateString()) {
          setCompletedTimers(parsed.completed);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    localStorage.setItem("bridge_timers", JSON.stringify({
      date: new Date().toDateString(),
      completed: completedTimers
    }));
  }, [completedTimers]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimers(prev => {
          if (prev[activeTimer] <= 1) {
            clearInterval(interval);
            setActiveTimer(null);
            setCompletedTimers(c => ({ ...c, [activeTimer]: true }));
            return { ...prev, [activeTimer]: 0 };
          }
          return { ...prev, [activeTimer]: prev[activeTimer] - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const toggleTimer = (id: string) => {
    if (activeTimer === id) {
      setActiveTimer(null);
    } else {
      setActiveTimer(id);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleComplete = (id: string, checked: boolean) => {
    setCompletedTimers(prev => ({ ...prev, [id]: checked }));
  };

  const completedCount = Object.values(completedTimers).filter(Boolean).length;

  const [copingStrategy, setCopingStrategy] = useState<string>("");

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-medium text-foreground">Behavioral Tools</h1>
        <p className="text-lg text-muted-foreground">
          Practical exercises to rebuild connection and regulate your own nervous system.
        </p>
      </div>

      {/* 10:10:10 Tracker */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">The 10:10:10 Connection Habit</h2>
          <p className="text-muted-foreground max-w-2xl">
            Backed by research on oxytocin (the bonding hormone) — consistent micro-connections reduce baseline family stress and make teens more cooperative during hard conversations.
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center justify-between">
          <span className="font-medium text-primary">Today's Connection Moments</span>
          <span className="font-bold text-xl text-primary">{completedCount} / 3</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'morning', title: 'Morning 10', subtitle: 'After Wake-Up', desc: "Presence over pressure. No phones, no nagging. Quiet chats, gentle rituals. You're setting the emotional tone for their whole day." },
            { id: 'reunion', title: 'Reunion 10', subtitle: 'After School/Work', desc: "Look them in the eye. Ask about their day. Really listen. You're saying: You matter. I missed you." },
            { id: 'bedtime', title: 'Bedtime 10', subtitle: 'Wind-Down', desc: "Teens naturally seek reassurance at night. Share affirmations, read quietly together, or just be present. The bond you build here opens doors." }
          ].map(block => (
            <Card key={block.id} className={`border ${completedTimers[block.id] ? 'border-primary bg-primary/5' : 'border-border'} shadow-sm transition-colors`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif">{block.title}</CardTitle>
                <CardDescription>{block.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground h-24">{block.desc}</p>
                
                <div className="flex flex-col items-center gap-3 pt-2">
                  <div className="text-3xl font-mono tracking-wider font-light tabular-nums">
                    {formatTime(timers[block.id])}
                  </div>
                  
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant={activeTimer === block.id ? "secondary" : "default"} 
                      className="flex-1"
                      onClick={() => toggleTimer(block.id)}
                      disabled={completedTimers[block.id] && timers[block.id] === 0}
                      data-testid={`button-timer-${block.id}`}
                    >
                      {activeTimer === block.id ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {activeTimer === block.id ? 'Pause' : (timers[block.id] < 600 ? 'Resume' : 'Start')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 w-full pt-2 border-t border-border/50">
                    <Checkbox 
                      id={`check-${block.id}`} 
                      checked={completedTimers[block.id]}
                      onCheckedChange={(c) => toggleComplete(block.id, c as boolean)}
                      data-testid={`checkbox-complete-${block.id}`}
                    />
                    <Label htmlFor={`check-${block.id}`} className="text-sm cursor-pointer">Mark completed</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tea Kettle */}
      <section className="space-y-6 pt-12 border-t border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">The Tea Kettle Stress Tracker</h2>
          <p className="text-muted-foreground">Recognize the build-up before the explosion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-orange-200 bg-orange-50/30 dark:bg-orange-950/20 dark:border-orange-900/50">
            <CardHeader>
              <CardTitle className="text-orange-700 dark:text-orange-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                The Fire (Triggers)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Homework avoidance", "Disrespectful tone", "Coming home late", "Silent treatment", "Being lied to", "Social media conflicts"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox id={`fire-${t}`} />
                  <Label htmlFor={`fire-${t}`} className="text-sm font-normal cursor-pointer">{t}</Label>
                </div>
              ))}
              <Input placeholder="Custom trigger..." className="mt-2 h-8 text-sm bg-background" />
            </CardContent>
          </Card>

          <Card className="shadow-sm border-blue-200 bg-blue-50/30 dark:bg-blue-950/20 dark:border-blue-900/50">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                The Water (Body)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Jaw clenching", "Shallow breathing", "Racing heartbeat", "Tight chest", "Hot face/neck", "Raising my voice"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <Checkbox id={`water-${t}`} />
                  <Label htmlFor={`water-${t}`} className="text-sm font-normal cursor-pointer">{t}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-emerald-200 bg-emerald-50/30 dark:bg-emerald-950/20 dark:border-emerald-900/50">
            <CardHeader>
              <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Wind className="w-5 h-5" />
                The Whistle (Response)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <Label className="text-sm text-emerald-800/80 dark:text-emerald-300/80">Choose your coping strategy:</Label>
              <Select onValueChange={setCopingStrategy} data-testid="select-coping">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select strategy..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breath">3 slow belly breaths</SelectItem>
                  <SelectItem value="jaw">Relax jaw, drop shoulders</SelectItem>
                  <SelectItem value="count">Count to 10 slowly</SelectItem>
                  <SelectItem value="excuse">"I need a minute"</SelectItem>
                  <SelectItem value="water">Splash cold water</SelectItem>
                  <SelectItem value="affirm">"I am safe. This is manageable."</SelectItem>
                </SelectContent>
              </Select>
              
              {copingStrategy && (
                <div className="mt-auto p-3 bg-emerald-100/50 dark:bg-emerald-900/40 rounded-md border border-emerald-200 dark:border-emerald-800 animate-in fade-in zoom-in duration-300">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    You recognized the kettle before it whistled. That's the skill.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cognitive Distortions */}
      <section className="space-y-6 pt-12 border-t border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">Cognitive Distortions Matrix</h2>
          <p className="text-muted-foreground">8 common thinking traps parents fall into.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/50 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-4 font-medium border-b border-border/50 w-1/4">Distortion</th>
                <th className="p-4 font-medium border-b border-border/50 w-1/3">What it sounds like</th>
                <th className="p-4 font-medium border-b border-border/50">Reframe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 bg-card">
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">Catastrophizing</td>
                <td className="p-4 text-muted-foreground">"If they fail this class, their life is ruined."</td>
                <td className="p-4 text-primary">"This is a setback, not a life sentence."</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">Mental Filtering</td>
                <td className="p-4 text-muted-foreground">"They disrespected me once — that's all I can focus on."</td>
                <td className="p-4 text-primary">"What else happened today that was positive?"</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">Mind Reading</td>
                <td className="p-4 text-muted-foreground">"I know they don't care about what I say."</td>
                <td className="p-4 text-primary">"I'm assuming. Have I actually asked?"</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">Emotional Reasoning</td>
                <td className="p-4 text-muted-foreground">"I feel so frustrated, so they must be doing this on purpose."</td>
                <td className="p-4 text-primary">"My feelings are real, but they're not facts."</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">"Should" Statements</td>
                <td className="p-4 text-muted-foreground">"They should just know better by now."</td>
                <td className="p-4 text-primary">"What do they actually know, and what do I need to teach?"</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">All-or-Nothing</td>
                <td className="p-4 text-muted-foreground">"They never listen to me."</td>
                <td className="p-4 text-primary">"When did they listen? What was different then?"</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">Personalization</td>
                <td className="p-4 text-muted-foreground">"Their behavior is a reflection of my failure as a parent."</td>
                <td className="p-4 text-primary">"Their struggle is their growth. I'm their guide, not their author."</td>
              </tr>
              <tr className="hover:bg-muted/50 transition-colors">
                <td className="p-4 font-medium text-foreground">Overgeneralization</td>
                <td className="p-4 text-muted-foreground">"This always happens with us."</td>
                <td className="p-4 text-primary">"Always? Let me think of a time it didn't."</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
