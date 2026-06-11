import { useState } from "react";
import { Moon, Clock, Brain, Zap, AlertTriangle, CheckCircle2, Smartphone, Coffee, Sun, ChevronDown, ChevronUp } from "lucide-react";

interface FactCard {
  icon: React.ElementType;
  title: string;
  body: string;
  accent: string;
  bg: string;
}

interface TipGroup {
  heading: string;
  tips: string[];
}

const AGE_SLEEP: { age: string; hours: string; note: string }[] = [
  { age: "6–12 years", hours: "9–12 hours", note: "Consistent bedtime routines still essential" },
  { age: "13–18 years (teens)", hours: "8–10 hours", note: "Most teens get only 6–7 hrs — a 2-3hr chronic deficit" },
  { age: "18–25 years", hours: "7–9 hours", note: "Brain finishes maturing; sleep debt still common" },
  { age: "Adults 26+", hours: "7–9 hours", note: "Baseline most adults aim for" },
];

const DEPRIVATION_SIGNS: { label: string; detail: string }[] = [
  { label: "Difficulty waking in the morning", detail: "Teens need social pressure (alarms, parents) because their body clock genuinely isn't ready to wake up." },
  { label: "Mood swings and irritability", detail: "Sleep loss amplifies emotional reactivity in the amygdala — the brain's alarm center already supercharged during adolescence." },
  { label: "Poor academic performance", detail: "Memory consolidation — moving learning from short-term to long-term — happens almost entirely during sleep." },
  { label: "Increased risk-taking", detail: "The prefrontal cortex (brakes) is further impaired by sleep loss, tipping the balance even further toward impulsive decisions." },
  { label: "Increased appetite for junk food", detail: "Sleep deprivation raises ghrelin (hunger hormone) and reduces leptin (fullness hormone), specifically craving high-sugar, high-fat foods." },
  { label: "Falling asleep in class", detail: "If your teen regularly dozes in school, this is a clinical sign — not laziness." },
  { label: "Heavy weekend 'catch-up' sleeping", detail: "Sleeping 3–4 extra hours on weekends is a hallmark of chronic weekday deprivation." },
];

const WHAT_HAPPENS: FactCard[] = [
  {
    icon: Brain,
    title: "Memory Consolidation",
    body: "During deep sleep (NREM), the brain replays and archives the day's learning — moving information from the hippocampus into long-term cortical storage. Without adequate sleep, studying is significantly less effective. Teens who sleep 8+ hours retain 40% more than those who sleep 6.",
    accent: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Zap,
    title: "Emotional Reset",
    body: "REM sleep (the dreaming phase) strips the emotional charge from difficult memories. The amygdala — already hypersensitive in adolescence — gets recalibrated overnight. A teen who hasn't slept is emotionally running on a dead battery from the moment they wake up.",
    accent: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    icon: Zap,
    title: "Growth Hormone Release",
    body: "About 70% of daily growth hormone is released during the first few hours of deep sleep. This drives not only physical growth but also muscle repair, immune strengthening, and cellular maintenance. Adolescence is the peak demand period — sleep is literally how they grow.",
    accent: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: Brain,
    title: "Neural Pruning & Wiring",
    body: "The active pruning and myelination of neural pathways that defines adolescent brain development is accelerated during sleep. The brain rehearses and strengthens the connections used that day — making who your teen is literally shaped by what they do and how much they sleep.",
    accent: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
];

const TIP_GROUPS: TipGroup[] = [
  {
    heading: "Biological shifts to understand first",
    tips: [
      "Teen melatonin release is naturally delayed by 1–3 hours compared to adults. Their body genuinely isn't tired at 9pm — this is biology, not defiance.",
      "Because of this delay, teens fall asleep later and need to sleep later. Early school start times fight directly against their circadian biology.",
      "You can shift the clock slightly with morning light exposure — opening curtains or stepping outside within 30 minutes of waking helps anchor the body clock earlier over time.",
    ],
  },
  {
    heading: "Screen & device habits",
    tips: [
      "Blue light from phones and screens suppresses melatonin production for up to 3 hours after exposure. This isn't a myth — it's peer-reviewed physiology.",
      "A phone-free bedroom after a set time (or on a charger in a common area) is one of the highest-impact sleep interventions available.",
      "If a no-phone bedroom feels like too large a battle, start with: no phone for 30 minutes before sleep, screen brightness reduced, Night Shift/blue light filter on after 8pm.",
    ],
  },
  {
    heading: "Environment & routine",
    tips: [
      "The bedroom temperature for optimal sleep is 65–68°F (18–20°C). Many teens sleep in rooms that are too warm.",
      "Consistent wake-up time (even on weekends) is more powerful than a consistent bedtime for anchoring the circadian rhythm.",
      "Light exposure on waking — even just opening the blinds — is the single strongest signal to the body clock that the day has started.",
      "Avoid heavy meals, caffeine (including energy drinks, iced coffee, and sodas), and intense exercise in the 3 hours before bed.",
    ],
  },
  {
    heading: "Conversation approaches for parents",
    tips: [
      "Frame sleep as performance, not obedience. Teens are far more motivated by 'athletes who sleep 9 hours perform measurably better' than 'you need to be in bed by 10.'",
      "Involve them in setting a wind-down time rather than imposing one. A teen who co-creates the agreement is more likely to follow it.",
      "Avoid lecturing at night when they're already overtired. The most effective sleep conversations happen in the afternoon.",
      "Model it. Teens who see parents prioritizing their own sleep and putting phones down early are significantly more likely to do the same.",
    ],
  },
];

function DeprivationAccordion({ item, index }: { item: { label: string; detail: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((p) => !p)}
      className="w-full text-left rounded-lg border border-border hover:bg-muted/30 transition-colors overflow-hidden"
      data-testid={`deprivation-sign-${index}`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </div>
      {open && (
        <div className="px-4 pb-3 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/60">
          {item.detail}
        </div>
      )}
    </button>
  );
}

function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [hoursTarget, setHoursTarget] = useState(9);

  function calcBedtime() {
    const [h, m] = wakeTime.split(":").map(Number);
    const totalMins = h * 60 + m - hoursTarget * 60;
    const adjusted = ((totalMins % 1440) + 1440) % 1440;
    const bh = Math.floor(adjusted / 60);
    const bm = adjusted % 60;
    const period = bh < 12 ? "AM" : "PM";
    const displayH = bh === 0 ? 12 : bh > 12 ? bh - 12 : bh;
    return `${displayH}:${bm.toString().padStart(2, "0")} ${period}`;
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-medium text-foreground">Sleep Bedtime Calculator</h3>
          <p className="text-xs text-muted-foreground">Find the ideal bedtime for your teen's wake-up time</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground" htmlFor="wake-time">
            School wake-up time
          </label>
          <input
            id="wake-time"
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid="input-wake-time"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Target sleep hours
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={7}
              max={11}
              step={0.5}
              value={hoursTarget}
              onChange={(e) => setHoursTarget(parseFloat(e.target.value))}
              className="flex-1 accent-primary"
              data-testid="input-sleep-hours"
            />
            <span className="text-sm font-semibold text-foreground w-10 text-right">{hoursTarget}h</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-primary/10 border border-primary/20 px-5 py-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">Recommended bedtime for {hoursTarget}h of sleep</p>
        <p className="text-3xl font-serif font-medium text-primary" data-testid="text-bedtime-result">
          {calcBedtime()}
        </p>
        <p className="text-xs text-muted-foreground mt-1.5">
          {hoursTarget < 8
            ? "⚠ Below the recommended 8–10 hours for teens (AAP guidelines)"
            : hoursTarget >= 9
            ? "Excellent — in the optimal range for adolescent health"
            : "Good — meets the minimum AAP recommendation"}
        </p>
      </div>
    </div>
  );
}

export default function Sleep() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500 pb-16">

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground">Teen Sleep Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Sleep isn't passive rest — it's the most productive thing a teenage brain does. Understanding
          the biology makes it much easier to have the conversation without it turning into a fight.
        </p>
      </div>

      {/* Hero stat banner */}
      <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 px-6 py-5">
        <div className="grid grid-cols-3 divide-x divide-indigo-200 dark:divide-indigo-800 text-center">
          {[
            { value: "8–10", unit: "hours/night", label: "AAP recommendation for teens" },
            { value: "73%", unit: "of teens", label: "get less than recommended" },
            { value: "2–3 hrs", unit: "daily deficit", label: "most teens carry chronically" },
          ].map((s) => (
            <div key={s.label} className="px-4 first:pl-0 last:pr-0">
              <p className="text-2xl font-serif font-bold text-indigo-700 dark:text-indigo-300">{s.value}</p>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{s.unit}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why the body clock shifts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-medium text-foreground">Why Teens Stay Up Late (It's Not Attitude)</h2>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-1">
              <Moon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-foreground">The Circadian Phase Delay</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                At puberty, the body clock shifts back by <strong className="text-foreground">1 to 3 hours</strong> — driven by hormonal changes, not choice or bad habits. Melatonin (the sleep-onset hormone) is released later at night, and cortisol (the wake hormone) rises later in the morning. This is a universal biological phenomenon documented across all human cultures.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This means a teen whose body says "sleep time" at midnight is being asked to wake at 6am after just 6 hours — while experiencing the biological equivalent of an adult waking at 3am. The American Academy of Pediatrics recommends school start times of <strong className="text-foreground">8:30am or later</strong> for this reason.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 px-4 py-3">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>For parents:</strong> When your teen says they're "not tired" at 10pm, their body is telling the truth. Working with biology — gradual earlier bedtimes, morning light, consistent weekend wake times — is more effective than fighting it.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended hours by age */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-medium text-foreground">How Much Sleep by Age</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/40 px-5 py-2.5">
            <span>Age Group</span>
            <span>Recommended</span>
            <span>Key Note</span>
          </div>
          {AGE_SLEEP.map((row, i) => (
            <div
              key={row.age}
              className={`grid grid-cols-3 px-5 py-3.5 text-sm items-center ${
                i % 2 === 0 ? "bg-card" : "bg-muted/20"
              } ${row.age.includes("13") ? "bg-indigo-50 dark:bg-indigo-950/20 font-medium" : ""}`}
              data-testid={`sleep-row-${i}`}
            >
              <span className={row.age.includes("13") ? "text-indigo-700 dark:text-indigo-300 font-semibold" : "text-foreground"}>
                {row.age}
                {row.age.includes("13") && (
                  <span className="ml-2 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full font-normal">
                    your teen
                  </span>
                )}
              </span>
              <span className={`font-semibold ${row.age.includes("13") ? "text-indigo-700 dark:text-indigo-300" : "text-foreground"}`}>
                {row.hours}
              </span>
              <span className="text-muted-foreground text-xs leading-snug">{row.note}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Source: American Academy of Pediatrics (AAP) and American Academy of Sleep Medicine (AASM) consensus guidelines.
        </p>
      </div>

      {/* What happens during sleep */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-medium text-foreground">What the Brain Does While Your Teen Sleeps</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Sleep isn't downtime — it's the most neurologically active period of the day for a developing brain.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHAT_HAPPENS.map((card) => (
            <div key={card.title} className={`rounded-xl border border-border ${card.bg} p-5 space-y-2`} data-testid={`fact-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className={`w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.accent}`} />
              </div>
              <h3 className={`font-serif text-base font-semibold ${card.accent}`}>{card.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/80">{card.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep calculator */}
      <SleepCalculator />

      {/* Signs of deprivation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-medium text-foreground">Signs Your Teen Isn't Getting Enough Sleep</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Many of these overlap with "normal teen behavior" — which is exactly why chronic sleep deprivation is so easy to miss.
        </p>
        <div className="space-y-2">
          {DEPRIVATION_SIGNS.map((item, i) => (
            <DeprivationAccordion key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Practical tips */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-medium text-foreground">What Actually Helps</h2>
        {TIP_GROUPS.map((group) => (
          <div key={group.heading} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3.5 bg-muted/30 border-b border-border">
              <h3 className="font-serif text-base font-medium text-foreground">{group.heading}</h3>
            </div>
            <ul className="divide-y divide-border/50">
              {group.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3.5" data-testid={`tip-${group.heading.slice(0, 10).replace(/\s/g, "-")}-${i}`}>
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/90 leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Things to avoid */}
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20 p-6 space-y-4">
        <h2 className="font-serif text-lg font-medium text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <Coffee className="w-5 h-5" />
          The Sleep Disruptors to Watch For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: Coffee, label: "Energy drinks & caffeine", detail: "Half-life of caffeine is 5–7 hours. A 3pm coffee affects sleep at 10pm." },
            { icon: Smartphone, label: "Phones in the bedroom overnight", detail: "Notification sounds at 2am fragment sleep cycles even if they don't fully wake your teen." },
            { icon: Sun, label: "Bright overhead lighting at night", detail: "Dim lights 1–2 hours before bed signals the brain that night is coming." },
            { icon: Zap, label: "Intense exercise after 9pm", detail: "Raises core body temperature and cortisol — both of which delay sleep onset." },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 bg-white/60 dark:bg-white/5 rounded-lg p-3">
              <item.icon className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-rose-800 dark:text-rose-200">{item.label}</p>
                <p className="text-xs text-rose-700/80 dark:text-rose-400/80 mt-0.5 leading-snug">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick action reminder */}
      <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/20 px-5 py-4">
        <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
          <strong>One thing to try this week:</strong> Agree on a phone-off time together — even 30 minutes before bed makes a measurable difference. Do it alongside them. "We're both putting our phones on the kitchen counter at 10pm" is a completely different conversation than "you have to turn your phone off at 10pm."
        </p>
      </div>
    </div>
  );
}
