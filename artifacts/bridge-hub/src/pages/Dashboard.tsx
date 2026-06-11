import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Activity, Heart, ShieldAlert, AlertTriangle, Coffee, Sparkles } from "lucide-react";

const TIPS = [
  "Instead of 'Why didn't you tell me?!' try 'I want to understand what happened — help me see it from your side.'",
  "Connection before correction: Spend 5 minutes just listening before bringing up the problem.",
  "When they push you away, they are often overwhelmed, not rejecting you. Say 'I'm here when you're ready.'",
  "Validate the feeling, even if you disagree with the behavior: 'I can see you are really angry right now.'",
  "Ask 'Do you want me to listen, help you problem-solve, or just give you a hug?'",
  "A calm nervous system regulates an anxious one. Take a deep breath before you respond.",
  "Instead of 'You always do this', try 'I noticed this happened today. Let's talk about it.'",
  "Look for the need beneath the behavior. Anger is often fear or embarrassment in disguise.",
  "Praise the effort, not just the outcome. 'I saw how hard you worked on that.'",
  "It's okay to say 'I need a minute to think about this before I respond.'"
];

export default function Dashboard() {
  const [streak, setStreak] = useState(1);
  const [tipOfTheDay, setTipOfTheDay] = useState(TIPS[0]);
  const today = format(new Date(), "EEEE, MMMM do");

  useEffect(() => {
    // Basic streak logic
    const lastVisit = localStorage.getItem("bridge_last_visit");
    const currentStreak = parseInt(localStorage.getItem("bridge_streak") || "0");
    const todayStr = new Date().toDateString();

    if (lastVisit !== todayStr) {
      const newStreak = lastVisit ? currentStreak + 1 : 1;
      localStorage.setItem("bridge_streak", newStreak.toString());
      localStorage.setItem("bridge_last_visit", todayStr);
      setStreak(newStreak);
      
      // Rotate tip
      const tipIndex = parseInt(localStorage.getItem("bridge_tip_index") || "0");
      const nextTip = (tipIndex + 1) % TIPS.length;
      localStorage.setItem("bridge_tip_index", nextTip.toString());
      setTipOfTheDay(TIPS[nextTip]);
    } else {
      setStreak(currentStreak || 1);
      const tipIndex = parseInt(localStorage.getItem("bridge_tip_index") || "0");
      setTipOfTheDay(TIPS[tipIndex]);
    }
  }, []);

  const tools = [
    { name: "Parent Guide", href: "/guide", icon: BookOpen, desc: "6-step communication framework & FAQs." },
    { name: "Teen Brain", href: "/brain", icon: Brain, desc: "Understanding the neuroscience of adolescence." },
    { name: "Behavioral Tools", href: "/tools", icon: Activity, desc: "Stress tracking & habit builders." },
    { name: "Mindfulness", href: "/mindfulness", icon: Heart, desc: "Quick calming exercises & strengths." },
    { name: "Online Safety", href: "/safety", icon: ShieldAlert, desc: "Bullying guides & digital contracts." },
    { name: "Crisis", href: "/crisis", icon: AlertTriangle, desc: "De-escalation & immediate resources.", danger: true },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{today}</p>
        <h1 className="text-4xl font-serif font-medium text-foreground">You're doing important work.</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Raising teenagers is exhausting, beautiful, and deeply challenging. You don't have to be perfect, you just have to keep showing up.
        </p>
      </div>

      <div className="flex items-center gap-2 text-primary font-medium bg-primary/10 w-fit px-4 py-2 rounded-full">
        <Sparkles className="w-5 h-5" />
        <span data-testid="text-streak">You've used Bridge {streak} {streak === 1 ? 'day' : 'days'} in a row.</span>
      </div>

      <Card className="bg-card border-none shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
        <CardHeader>
          <CardTitle className="text-lg font-serif text-primary">Daily Coaching Tip</CardTitle>
          <CardDescription>A gentle reframe for today</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium leading-relaxed" data-testid="text-daily-tip">
            "{tipOfTheDay}"
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-serif font-medium mb-4">Your Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="block group" data-testid={`link-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className={`h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${tool.danger ? 'hover:border-destructive/50' : 'hover:border-primary/50'}`}>
                <CardHeader>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${tool.danger ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Card className="bg-secondary border-none shadow-sm text-center p-6 mt-12">
        <CardContent className="space-y-4 pt-6">
          <Heart className="w-8 h-8 text-primary mx-auto opacity-80" />
          <h3 className="text-xl font-serif font-medium">Support This App</h3>
          <p className="text-secondary-foreground/80 max-w-md mx-auto">
            Bridge is free because parents deserve support without a paywall. If this has helped your family, a small gesture keeps it running.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            <a href="https://buy.stripe.com/bJedRa8Kt2oH46SfL0gjC00" target="_blank" rel="noopener noreferrer" data-testid="button-coffee">
              <Coffee className="w-4 h-4 mr-2" />
              Buy Me a Coffee ☕
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
