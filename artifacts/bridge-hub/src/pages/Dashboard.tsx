import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen, Brain, Activity, Heart, ShieldAlert, AlertTriangle,
  Coffee, Sparkles, HelpCircle, Trophy, Moon, Coins, CheckCircle2
} from "lucide-react";

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

const TODAY_STR = new Date().toISOString().split("T")[0];

function getRulesStats() {
  try {
    const rules = JSON.parse(localStorage.getItem("bridge_rules") || "[]");
    const rewards = JSON.parse(localStorage.getItem("bridge_rewards") || "[]");
    const totalEarned = rules.reduce((sum: number, r: { completedDates: string[]; points: number }) =>
      sum + r.completedDates.length * r.points, 0);
    const totalSpent = rewards
      .filter((r: { redeemedAt: string | null }) => r.redeemedAt !== null)
      .reduce((sum: number, r: { pointCost: number }) => sum + r.pointCost, 0);
    const todayDone = rules.filter((r: { completedDates: string[] }) => r.completedDates.includes(TODAY_STR)).length;
    return { available: totalEarned - totalSpent, todayDone, total: rules.length };
  } catch { return { available: 0, todayDone: 0, total: 0 }; }
}

function get1010Stats() {
  try {
    const raw = localStorage.getItem("bridge_1010_completions");
    if (!raw) return { week: 0, todayDone: 0 };
    const completions: Record<string, boolean[]> = JSON.parse(raw);
    const weekTotal = Object.values(completions).flat().filter(Boolean).length;
    const todayDone = (completions[TODAY_STR] || []).filter(Boolean).length;
    return { week: weekTotal, todayDone };
  } catch { return { week: 0, todayDone: 0 }; }
}

const TOOL_GROUPS = [
  {
    heading: "Understanding & Communication",
    tools: [
      { name: "Parent Guide", href: "/guide", icon: BookOpen, desc: "6-step communication framework from the MPower Program." },
      { name: "Teen Brain", href: "/brain", icon: Brain, desc: "The neuroscience behind why teens act the way they do." },
      { name: "What to Say", href: "/faq", icon: HelpCircle, desc: "10 common scenarios with word-for-word scripts." },
    ],
  },
  {
    heading: "Daily Tools & Tracking",
    tools: [
      { name: "Behavioral Tools", href: "/tools", icon: Activity, desc: "10:10:10 timer, Tea Kettle stress tracker & cognitive distortions." },
      { name: "Rules & Rewards", href: "/rewards", icon: Trophy, desc: "House rules, point system & rewards marketplace." },
      { name: "Mindfulness", href: "/mindfulness", icon: Heart, desc: "2-minute breathing guide & strengths explorer." },
    ],
  },
  {
    heading: "Health & Safety",
    tools: [
      { name: "Teen Sleep Guide", href: "/sleep", icon: Moon, desc: "Why sleep matters, how much teens need & bedtime calculator." },
      { name: "Online Safety", href: "/safety", icon: ShieldAlert, desc: "Bullying triage guide & digital behavioral contract builder." },
      { name: "Crisis & Resources", href: "/crisis", icon: AlertTriangle, desc: "De-escalation steps, 988 lifeline & support directory.", danger: true },
    ],
  },
];

export default function Dashboard() {
  const [streak, setStreak] = useState(1);
  const [tipOfTheDay, setTipOfTheDay] = useState(TIPS[0]);
  const [rulesStats, setRulesStats] = useState({ available: 0, todayDone: 0, total: 0 });
  const [connectionStats, setConnectionStats] = useState({ week: 0, todayDone: 0 });
  const today = format(new Date(), "EEEE, MMMM do");

  useEffect(() => {
    const lastVisit = localStorage.getItem("bridge_last_visit");
    const currentStreak = parseInt(localStorage.getItem("bridge_streak") || "0");
    const todayStr = new Date().toDateString();

    if (lastVisit !== todayStr) {
      const newStreak = lastVisit ? currentStreak + 1 : 1;
      localStorage.setItem("bridge_streak", newStreak.toString());
      localStorage.setItem("bridge_last_visit", todayStr);
      setStreak(newStreak);
      const tipIndex = parseInt(localStorage.getItem("bridge_tip_index") || "0");
      const nextTip = (tipIndex + 1) % TIPS.length;
      localStorage.setItem("bridge_tip_index", nextTip.toString());
      setTipOfTheDay(TIPS[nextTip]);
    } else {
      setStreak(currentStreak || 1);
      const tipIndex = parseInt(localStorage.getItem("bridge_tip_index") || "0");
      setTipOfTheDay(TIPS[tipIndex]);
    }

    setRulesStats(getRulesStats());
    setConnectionStats(get1010Stats());
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12">

      {/* Hero */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{today}</p>
        <h1 className="text-4xl font-serif font-medium text-foreground">You're doing important work.</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Raising teenagers is exhausting, beautiful, and deeply challenging. You don't have to be perfect, you just have to keep showing up.
        </p>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2 text-primary font-medium bg-primary/10 w-fit px-4 py-2 rounded-full">
        <Sparkles className="w-5 h-5" />
        <span data-testid="text-streak">You've used Bridge {streak} {streak === 1 ? "day" : "days"} in a row.</span>
      </div>

      {/* Daily tip */}
      <Card className="bg-card border-none shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-xl"></div>
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

      {/* At-a-glance stats */}
      <div>
        <h2 className="text-xl font-serif font-medium text-foreground mb-3">Today at a Glance</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-4 space-y-2" data-testid="stat-points">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Coins className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold font-serif text-primary">{rulesStats.available}</p>
            <p className="text-xs text-muted-foreground">Points available</p>
            <p className="text-xs text-muted-foreground/70">
              {rulesStats.todayDone}/{rulesStats.total} rules done today
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2" data-testid="stat-connections">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <Heart className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-2xl font-bold font-serif text-teal-600 dark:text-teal-400">
              {connectionStats.todayDone}/3
            </p>
            <p className="text-xs text-muted-foreground">10:10:10 moments</p>
            <p className="text-xs text-muted-foreground/70">{connectionStats.week} this week</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-2" data-testid="stat-streak">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-400">{streak}</p>
            <p className="text-xs text-muted-foreground">Day streak</p>
            <p className="text-xs text-muted-foreground/70">keep it going</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-serif font-medium text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Log a 10-min connection", href: "/tools", icon: CheckCircle2, color: "text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30" },
            { label: "Check off house rules", href: "/rewards", icon: Trophy, color: "text-primary bg-primary/10" },
            { label: "Find what to say", href: "/faq", icon: HelpCircle, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30" },
          ].map((a) => (
            <Link key={a.label} href={a.href}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-primary/30 transition-all cursor-pointer group" data-testid={`quick-action-${a.label.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
                  <a.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All tools grouped */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-medium text-foreground">Your Tools</h2>
        {TOOL_GROUPS.map((group) => (
          <div key={group.heading} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {group.heading}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="block group"
                  data-testid={`link-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Card className={`h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                    tool.danger ? "hover:border-destructive/40" : "hover:border-primary/40"
                  }`}>
                    <CardHeader className="pb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                        tool.danger ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                      }`}>
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base font-serif">{tool.name}</CardTitle>
                      <CardDescription className="text-xs leading-relaxed">{tool.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Support CTA */}
      <Card className="bg-secondary border-none shadow-sm text-center p-6 mt-4">
        <CardContent className="space-y-4 pt-6">
          <Heart className="w-8 h-8 text-primary mx-auto opacity-80" />
          <h3 className="text-xl font-serif font-medium">Support This App</h3>
          <p className="text-secondary-foreground/80 max-w-md mx-auto">
            Bridge is free because parents deserve support without a paywall. If this has helped your family, a small gesture keeps it running.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            <a
              href="https://buy.stripe.com/bJedRa8Kt2oH46SfL0gjC00"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-coffee"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Buy Me a Coffee ☕
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
