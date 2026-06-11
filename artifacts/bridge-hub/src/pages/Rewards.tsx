import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Trophy,
  Star,
  Gift,
  ClipboardList,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Rule {
  id: string;
  text: string;
  category: string;
  points: number;
  completedDates: string[];
}

interface Reward {
  id: string;
  title: string;
  pointCost: number;
  redeemedAt: string | null;
}

interface Consequence {
  id: string;
  text: string;
  duration: string;
  active: boolean;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const TODAY = new Date().toISOString().split("T")[0];

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_RULES: Rule[] = [
  { id: "r1", text: "Complete homework before screen time", category: "Schoolwork", points: 10, completedDates: [] },
  { id: "r2", text: "Attend all classes on time", category: "Schoolwork", points: 15, completedDates: [] },
  { id: "r3", text: "Keep bedroom tidy", category: "Household", points: 5, completedDates: [] },
  { id: "r4", text: "Unload the dishwasher", category: "Household", points: 5, completedDates: [] },
  { id: "r5", text: "Take out the trash on collection day", category: "Household", points: 5, completedDates: [] },
  { id: "r6", text: "Check in when arriving somewhere new", category: "Safety & Communication", points: 10, completedDates: [] },
  { id: "r7", text: "Phone on charger in common area by 10pm", category: "Screens & Sleep", points: 10, completedDates: [] },
];

const DEFAULT_REWARDS: Reward[] = [
  { id: "rw1", title: "Choose family movie night", pointCost: 30, redeemedAt: null },
  { id: "rw2", title: "Extra 1 hour of screen time (weekend)", pointCost: 25, redeemedAt: null },
  { id: "rw3", title: "Choose Friday dinner", pointCost: 40, redeemedAt: null },
  { id: "rw4", title: "Sleep-over with a friend", pointCost: 60, redeemedAt: null },
  { id: "rw5", title: "$10 toward something you want", pointCost: 80, redeemedAt: null },
];

const DEFAULT_CONSEQUENCES: Consequence[] = [
  { id: "c1", text: "No screen time for the evening", duration: "1 evening", active: false },
  { id: "c2", text: "No social plans this weekend", duration: "1 weekend", active: false },
  { id: "c3", text: "Earlier curfew by 1 hour", duration: "1 week", active: false },
];

const CATEGORIES = ["Schoolwork", "Household", "Safety & Communication", "Screens & Sleep", "Other"];

const CATEGORY_COLORS: Record<string, string> = {
  "Schoolwork": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Household": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Safety & Communication": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "Screens & Sleep": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "Other": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((p) => !p)}
        data-testid={`section-toggle-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="font-serif text-lg font-medium text-foreground">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="px-6 pb-6 pt-1">{children}</div>}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Rewards() {
  const [rules, setRules] = useState<Rule[]>(() => load("bridge_rules", DEFAULT_RULES));
  const [rewards, setRewards] = useState<Reward[]>(() => load("bridge_rewards", DEFAULT_REWARDS));
  const [consequences, setConsequences] = useState<Consequence[]>(() =>
    load("bridge_consequences", DEFAULT_CONSEQUENCES)
  );

  // New rule form
  const [newRuleText, setNewRuleText] = useState("");
  const [newRuleCategory, setNewRuleCategory] = useState("Household");
  const [newRulePoints, setNewRulePoints] = useState("5");

  // New reward form
  const [newRewardTitle, setNewRewardTitle] = useState("");
  const [newRewardCost, setNewRewardCost] = useState("30");

  // New consequence form
  const [newConseqText, setNewConseqText] = useState("");
  const [newConseqDuration, setNewConseqDuration] = useState("1 day");

  // Persist on change
  useEffect(() => { save("bridge_rules", rules); }, [rules]);
  useEffect(() => { save("bridge_rewards", rewards); }, [rewards]);
  useEffect(() => { save("bridge_consequences", consequences); }, [consequences]);

  // ── Points math ──────────────────────────────────────────────────────────────

  const totalEarned = rules.reduce(
    (sum, r) => sum + r.completedDates.length * r.points,
    0
  );
  const totalSpent = rewards
    .filter((r) => r.redeemedAt !== null)
    .reduce((sum, r) => sum + r.pointCost, 0);
  const availablePoints = totalEarned - totalSpent;
  const todayEarned = rules
    .filter((r) => r.completedDates.includes(TODAY))
    .reduce((sum, r) => sum + r.points, 0);

  // ── Rule actions ─────────────────────────────────────────────────────────────

  function toggleRuleToday(id: string) {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const done = r.completedDates.includes(TODAY);
        return {
          ...r,
          completedDates: done
            ? r.completedDates.filter((d) => d !== TODAY)
            : [...r.completedDates, TODAY],
        };
      })
    );
  }

  function addRule() {
    const text = newRuleText.trim();
    if (!text) return;
    const rule: Rule = {
      id: `r${Date.now()}`,
      text,
      category: newRuleCategory,
      points: Math.max(1, parseInt(newRulePoints, 10) || 5),
      completedDates: [],
    };
    setRules((prev) => [...prev, rule]);
    setNewRuleText("");
  }

  function deleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
  }

  // ── Reward actions ────────────────────────────────────────────────────────────

  function addReward() {
    const title = newRewardTitle.trim();
    if (!title) return;
    const reward: Reward = {
      id: `rw${Date.now()}`,
      title,
      pointCost: Math.max(1, parseInt(newRewardCost, 10) || 30),
      redeemedAt: null,
    };
    setRewards((prev) => [...prev, reward]);
    setNewRewardTitle("");
  }

  function redeemReward(id: string) {
    setRewards((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, redeemedAt: r.redeemedAt ? null : new Date().toLocaleDateString() }
          : r
      )
    );
  }

  function deleteReward(id: string) {
    setRewards((prev) => prev.filter((r) => r.id !== id));
  }

  // ── Consequence actions ───────────────────────────────────────────────────────

  function addConsequence() {
    const text = newConseqText.trim();
    if (!text) return;
    const c: Consequence = {
      id: `c${Date.now()}`,
      text,
      duration: newConseqDuration,
      active: false,
    };
    setConsequences((prev) => [...prev, c]);
    setNewConseqText("");
  }

  function toggleConsequence(id: string) {
    setConsequences((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  }

  function deleteConsequence(id: string) {
    setConsequences((prev) => prev.filter((c) => c.id !== id));
  }

  // ── Grouped rules ─────────────────────────────────────────────────────────────

  const rulesByCategory = CATEGORIES.reduce<Record<string, Rule[]>>((acc, cat) => {
    const catRules = rules.filter((r) => r.category === cat);
    if (catRules.length > 0) acc[cat] = catRules;
    return acc;
  }, {});

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground">
            House Rules & Rewards
          </h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Track household expectations, earn points for following through, and exchange them for
          agreed-upon privileges. Clear rules. Visible progress. No guessing.
        </p>
      </div>

      {/* Points Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Available Points",
            value: availablePoints,
            sub: "ready to spend",
            icon: Coins,
            accent: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Earned Today",
            value: todayEarned,
            sub: "points so far today",
            icon: Star,
            accent: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-100 dark:bg-amber-900/30",
          },
          {
            label: "Total Earned",
            value: totalEarned,
            sub: "across all time",
            icon: Trophy,
            accent: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2"
            data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.accent}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold font-serif ${stat.accent}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              <p className="text-xs text-muted-foreground/70">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* House Rules */}
      <Section title="House Rules" icon={ClipboardList}>
        <div className="space-y-6 mt-2">
          {Object.entries(rulesByCategory).map(([cat, catRules]) => (
            <div key={cat} className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[cat] ?? CATEGORY_COLORS["Other"]}`}>
                  {cat}
                </span>
              </div>
              {catRules.map((rule) => {
                const doneToday = rule.completedDates.includes(TODAY);
                return (
                  <div
                    key={rule.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      doneToday
                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"
                        : "bg-muted/20 border-border hover:bg-muted/40"
                    }`}
                    data-testid={`rule-${rule.id}`}
                  >
                    <button
                      onClick={() => toggleRuleToday(rule.id)}
                      data-testid={`rule-check-${rule.id}`}
                      className="flex-shrink-0"
                    >
                      {doneToday ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground/50 hover:text-primary transition-colors" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-sm ${
                        doneToday ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {rule.text}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      +{rule.points} pts
                    </span>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      data-testid={`rule-delete-${rule.id}`}
                      className="text-muted-foreground/40 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          ))}

          {rules.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No rules yet. Add one below to get started.
            </p>
          )}

          {/* Add rule form */}
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Add a new rule</p>
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="e.g. Be home by curfew"
                value={newRuleText}
                onChange={(e) => setNewRuleText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRule()}
                className="flex-1 min-w-48"
                data-testid="input-new-rule"
              />
              <Select value={newRuleCategory} onValueChange={setNewRuleCategory}>
                <SelectTrigger className="w-44" data-testid="select-rule-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Points"
                value={newRulePoints}
                onChange={(e) => setNewRulePoints(e.target.value)}
                className="w-24"
                min={1}
                max={100}
                data-testid="input-rule-points"
              />
              <Button onClick={addRule} data-testid="button-add-rule" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Rule
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Rewards Marketplace */}
      <Section title="Rewards Marketplace" icon={Gift}>
        <div className="space-y-3 mt-2">
          {rewards.map((reward) => {
            const canAfford = availablePoints >= reward.pointCost && !reward.redeemedAt;
            return (
              <div
                key={reward.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  reward.redeemedAt
                    ? "bg-muted/30 border-border opacity-60"
                    : "bg-card border-border hover:bg-muted/20"
                }`}
                data-testid={`reward-${reward.id}`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      reward.redeemedAt ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {reward.title}
                  </p>
                  {reward.redeemedAt && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Redeemed on {reward.redeemedAt}
                    </p>
                  )}
                </div>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">
                  {reward.pointCost} pts
                </span>
                <Button
                  variant={reward.redeemedAt ? "outline" : "default"}
                  size="sm"
                  onClick={() => redeemReward(reward.id)}
                  disabled={!canAfford && !reward.redeemedAt}
                  data-testid={`button-redeem-${reward.id}`}
                  className="text-xs"
                >
                  {reward.redeemedAt ? "Undo" : canAfford ? "Redeem" : `Need ${reward.pointCost - availablePoints} more`}
                </Button>
                <button
                  onClick={() => deleteReward(reward.id)}
                  data-testid={`reward-delete-${reward.id}`}
                  className="text-muted-foreground/40 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {rewards.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No rewards yet. Add one below.
            </p>
          )}

          {/* Add reward form */}
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Add a new reward</p>
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="e.g. Choose Saturday's activity"
                value={newRewardTitle}
                onChange={(e) => setNewRewardTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addReward()}
                className="flex-1 min-w-48"
                data-testid="input-new-reward"
              />
              <Input
                type="number"
                placeholder="Cost"
                value={newRewardCost}
                onChange={(e) => setNewRewardCost(e.target.value)}
                className="w-24"
                min={1}
                data-testid="input-reward-cost"
              />
              <Button onClick={addReward} data-testid="button-add-reward" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Reward
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Consequences */}
      <Section title="Consequences & Timelines" icon={AlertCircle} defaultOpen={false}>
        <div className="space-y-3 mt-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pre-agreed consequences mean no one is surprised when a rule is broken. Activate one here
            to make it visible — and deactivate it when the period is over.
          </p>

          {consequences.map((c) => (
            <div
              key={c.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                c.active
                  ? "bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-800"
                  : "bg-card border-border"
              }`}
              data-testid={`consequence-${c.id}`}
            >
              <button
                onClick={() => toggleConsequence(c.id)}
                data-testid={`consequence-toggle-${c.id}`}
                className="flex-shrink-0"
              >
                {c.active ? (
                  <CheckCircle2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/50 hover:text-rose-500 transition-colors" />
                )}
              </button>
              <div className="flex-1">
                <p className={`text-sm font-medium ${c.active ? "text-rose-800 dark:text-rose-200" : "text-foreground"}`}>
                  {c.text}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Duration: {c.duration}</p>
              </div>
              {c.active && (
                <Badge variant="destructive" className="text-xs">Active</Badge>
              )}
              <button
                onClick={() => deleteConsequence(c.id)}
                data-testid={`consequence-delete-${c.id}`}
                className="text-muted-foreground/40 hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {consequences.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No consequences set yet.
            </p>
          )}

          {/* Add consequence form */}
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Add a pre-agreed consequence</p>
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="e.g. No social plans this weekend"
                value={newConseqText}
                onChange={(e) => setNewConseqText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addConsequence()}
                className="flex-1 min-w-48"
                data-testid="input-new-consequence"
              />
              <Input
                placeholder="Duration (e.g. 1 week)"
                value={newConseqDuration}
                onChange={(e) => setNewConseqDuration(e.target.value)}
                className="w-36"
                data-testid="input-consequence-duration"
              />
              <Button onClick={addConsequence} data-testid="button-add-consequence" size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Tip */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 px-5 py-4">
        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
          <span className="font-semibold">Tip from the MPower framework:</span> Involve your teen in
          setting both the rules and the rewards — teenagers who help design the system are far more
          likely to participate in it. Review and adjust together every few weeks.
        </p>
      </div>
    </div>
  );
}
