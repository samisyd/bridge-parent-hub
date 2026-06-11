import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Square, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const STRENGTHS = [
  { id: "calm", label: "I stay calm in a crisis", effect: "When your teen escalates, your calm literally regulates their nervous system. You are the thermostat, not the thermometer." },
  { id: "flexible", label: "I'm flexible and adapt well", effect: "You can pivot when a conversation isn't working, preventing unnecessary power struggles." },
  { id: "intuition", label: "I read people well / have good emotional intuition", effect: "You can sense when your teen is overwhelmed before they have the words to tell you." },
  { id: "listener", label: "I'm a good listener (when I slow down)", effect: "You provide a safe container for them to process complex emotions without immediate judgment." },
  { id: "commit", label: "I keep commitments — even when it's hard", effect: "This builds foundational trust. They know that even when angry, you are reliable." },
  { id: "bounce", label: "I bounce back from setbacks", effect: "You model resilience. You show them that making a mistake doesn't break the relationship." },
  { id: "humor", label: "I find humor in difficult situations", effect: "A shared laugh can instantly diffuse tension and reset the emotional tone." },
  { id: "help", label: "I ask for help when I need it", effect: "You teach them that nobody has to suffer alone, and seeking support is a strength." },
  { id: "consistent", label: "I'm consistent — my kids know what to expect", effect: "Predictability creates neurological safety for an adolescent brain." },
  { id: "showup", label: "I show up even when I don't know what to say", effect: "Your presence is more powerful than perfect words." }
];

export default function Mindfulness() {
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Inhale");
  const [timeLeft, setTimeLeft] = useState(120);
  
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathing && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setBreathing(false);
    }
    return () => clearInterval(interval);
  }, [breathing, timeLeft]);

  useEffect(() => {
    let phaseInterval: NodeJS.Timeout;
    if (breathing) {
      // Very simple phase cycle: 4s Inhale, 2s Hold, 6s Exhale
      let cycle = 0;
      phaseInterval = setInterval(() => {
        cycle = (cycle + 1) % 12;
        if (cycle < 4) setBreathPhase("Inhale...");
        else if (cycle < 6) setBreathPhase("Hold...");
        else setBreathPhase("Exhale slowly...");
      }, 1000);
    } else {
      setBreathPhase("Ready");
    }
    return () => clearInterval(phaseInterval);
  }, [breathing]);

  const toggleStrength = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedStrengths(prev => [...prev, id]);
    } else {
      setSelectedStrengths(prev => prev.filter(s => s !== id));
    }
  };

  const activeStrengthDetails = STRENGTHS.filter(s => selectedStrengths.includes(s.id));

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-medium text-foreground">Mindfulness & Calming</h1>
        <p className="text-lg text-muted-foreground">
          You cannot pour from an empty cup. These tools are for you.
        </p>
      </div>

      {/* Breathing App */}
      <section>
        <Card className="bg-card overflow-hidden border-border/50 relative">
          {breathing && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0 pointer-events-none transition-all duration-1000"></div>
          )}
          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-medium mb-2">The 2-Minute Vacation</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  A sensory grounding exercise to reset your nervous system.
                </p>
              </div>

              <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <motion.div 
                  className="absolute w-full h-full rounded-full bg-primary/20 blur-xl"
                  animate={{
                    scale: breathing ? (breathPhase.includes("Inhale") ? 1.5 : breathPhase.includes("Hold") ? 1.5 : 1) : 1,
                    opacity: breathing ? 0.8 : 0.3
                  }}
                  transition={{ duration: breathPhase.includes("Inhale") ? 4 : breathPhase.includes("Hold") ? 2 : 6, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute w-3/4 h-3/4 rounded-full bg-primary/40 blur-md"
                  animate={{
                    scale: breathing ? (breathPhase.includes("Inhale") ? 1.3 : breathPhase.includes("Hold") ? 1.3 : 1) : 1
                  }}
                  transition={{ duration: breathPhase.includes("Inhale") ? 4 : breathPhase.includes("Hold") ? 2 : 6, ease: "easeInOut" }}
                />
                <div className="relative z-10 w-1/2 h-1/2 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif text-xl shadow-lg">
                  {breathing ? breathPhase : "Breathe"}
                </div>
              </div>

              <div className="space-y-4">
                {breathing ? (
                  <div className="h-16 text-lg font-serif italic text-primary/80 animate-pulse">
                    {breathPhase.includes("Inhale") && "Close your eyes... Feel the weight of your body..."}
                    {breathPhase.includes("Hold") && "What sounds do you hear around you?"}
                    {breathPhase.includes("Exhale") && "Release the tension in your jaw and shoulders..."}
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center">
                    {timeLeft === 0 && <span className="text-primary font-medium italic">"That was for you. You deserve moments like this."</span>}
                  </div>
                )}
                
                <div className="flex items-center gap-4 justify-center">
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                  <Button 
                    variant={breathing ? "secondary" : "default"} 
                    size="lg" 
                    className="rounded-full w-32"
                    onClick={() => {
                      if (timeLeft === 0) setTimeLeft(120);
                      setBreathing(!breathing);
                    }}
                    data-testid="button-breath-toggle"
                  >
                    {breathing ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {breathing ? "Stop" : (timeLeft === 0 ? "Restart" : "Start")}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Strengths Explorer */}
      <section className="space-y-6 pt-6">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">Strengths Explorer</h2>
          <p className="text-muted-foreground">Recognizing what you already do well. Check the ones that feel true to you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-4">
              {STRENGTHS.map(s => (
                <div key={s.id} className="flex items-start gap-3">
                  <Checkbox 
                    id={`strength-${s.id}`} 
                    className="mt-1"
                    checked={selectedStrengths.includes(s.id)}
                    onCheckedChange={(c) => toggleStrength(s.id, c as boolean)}
                    data-testid={`checkbox-strength-${s.id}`}
                  />
                  <Label htmlFor={`strength-${s.id}`} className="text-base font-normal cursor-pointer leading-tight">
                    {s.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            {selectedStrengths.length > 0 ? (
              <Card className="bg-primary/5 border-primary/20 shadow-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-primary font-serif flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Your Strength Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {activeStrengthDetails.map(s => (
                      <div key={s.id} className="bg-background p-4 rounded-lg border border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <h4 className="font-medium text-foreground mb-1">{s.label}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">→ {s.effect}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center p-8 text-center text-muted-foreground">
                <p>Select your strengths on the left to see how they uniquely support your parenting.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Support */}
      <section className="space-y-6 pt-8 border-t border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-4">Social & Emotional Support Tips</h2>
        </div>
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-foreground/90"><strong>Encourage pro-social activity:</strong> Support at least one activity your teen is genuinely interested in (sports, music, art, coding).</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-foreground/90"><strong>Limit caffeine:</strong> It physiologically mimics anxiety and makes teens more reactive.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-foreground/90"><strong>Build a network:</strong> Find other parents you trust for honest, non-judgmental conversation.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-foreground/90"><strong>Model emotional regulation out loud:</strong> "I'm feeling frustrated right now, so I'm going to take a walk before I respond."</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
            <p className="text-foreground/90"><strong>Protect sleep:</strong> Teen brain consolidation requires 8-10 hours. Sleep deprivation amplifies every emotional response.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
