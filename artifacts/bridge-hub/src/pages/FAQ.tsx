import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Step {
  label: string;
  color: string;
  script: string;
}

interface Scenario {
  id: number;
  category: string;
  question: string;
  context: string;
  steps: Step[];
}

const STEP_COLORS: Record<string, string> = {
  "I Care": "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300",
  "I See": "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-300",
  "I Feel": "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-300",
  "Listen": "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300",
  "I Want": "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300",
  "I Will": "bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-950/30 dark:border-teal-800 dark:text-teal-300",
};

const BADGE_COLORS: Record<string, string> = {
  "Curfew & Safety": "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "Respect & Attitude": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "School & Responsibility": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Phones & Screens": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "Honesty & Trust": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Friends & Peer Pressure": "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  "Withdrawal & Mood": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

const scenarios: Scenario[] = [
  {
    id: 1,
    category: "Curfew & Safety",
    question: "My teen came home 3 hours past curfew and won't explain why.",
    context: "Curfew violations spike parental anxiety — and trigger the teen's defensiveness at the same moment. The 6-step approach separates emotion from consequence, so the conversation doesn't become a shouting match.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I love you, and when you weren't home I was genuinely scared — not angry, scared. That's how much you matter to me.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"You agreed to be back by 10. It's now 1 in the morning. That's a fact — not a judgment, just what happened.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"I felt terrified when your phone went to voicemail. I kept imagining the worst. I need you to know that.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Pause here. Don't fill the silence. Look at them, not your phone. Let them explain without interrupting — even if it takes a minute for them to start." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want a quick text if plans change — 30 seconds is all I'm asking. That's the deal going forward.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will always answer when you call. And I will enforce the consequence we already agreed on — not to punish you, but because follow-through is how trust is built.\"" },
    ],
  },
  {
    id: 2,
    category: "Respect & Attitude",
    question: "My teenager rolls their eyes and walks away every time I try to talk.",
    context: "Eye-rolling and exit behavior are an overwhelmed nervous system's self-protection — not a personal attack on you. Chasing the conversation escalates; stepping back invites it.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I'm not coming at you with a lecture. I just want us to be able to talk — I miss that.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"I've noticed that when I bring something up, you tend to leave the room or go quiet. I'm not criticizing — I'm just naming what I see.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"When that happens, I feel shut out. It leaves me guessing what's going on with you, and I don't want to guess — I want to know.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "After you say this, don't ask a follow-up question. Leave space. Side-by-side activity (cooking, a car ride) often works better than face-to-face for teens who feel put on the spot." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want us to find a way to talk — even a few minutes — where you feel safe enough to stay in the room with me.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will not chase you or raise my voice. And I promise I'll listen more than I talk. I'm working on that.\"" },
    ],
  },
  {
    id: 3,
    category: "School & Responsibility",
    question: "My teen is failing classes and hiding progress reports from me.",
    context: "Hiding grades is shame behavior, not defiance. The teen already feels like a failure — your first move should close that gap, not widen it.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I'm not here to yell about grades. I'm here because school is hard right now and I want to help — not add pressure.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"I saw the progress report. You've got failing marks in two classes and a few missed assignments. That's what's in front of us.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"I felt worried — not about the grade itself, but about what might be going on underneath it. Are you overwhelmed? Is something happening at school?\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "This is the most important step here. Don't jump to solutions. Let them tell you what's hard before you offer a tutor, a schedule, or a consequence. They will only accept help they weren't forced to take." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want us to make a small, realistic plan together — not me dictating it to you. What's one class where we could start?\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will check in weekly — not to interrogate, just to see how it's going. And I'll get you help if you need it. All you have to do is tell me.\"" },
    ],
  },
  {
    id: 4,
    category: "Phones & Screens",
    question: "My teen is on their phone until 2am and is exhausted and irritable every day.",
    context: "Teen brains in the nighttime hours have naturally delayed melatonin release — and blue light makes it worse. This isn't pure willpower failure; it's neurobiology working against them. Rules work better when they're co-created.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I'm not trying to take away your phone or control your life. I'm talking about this because you seem really exhausted lately and I hate watching you struggle.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"I've noticed you're up past midnight most nights. In the morning you're drained, and I can see it affecting your mood by the afternoon.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"I feel helpless watching that. I know you're old enough to manage yourself — I just want to give you information that might help.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Ask: \"What would feel reasonable to you?\" Let them propose the boundary first. A teen who co-authors the rule is far more likely to follow it than one who had it imposed." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want to agree on a phone-off time — even 11pm — and I'll follow it too. This isn't a rule just for you.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will put my phone on the charger in the kitchen at the same time. We'll both try it for two weeks and see if either of us feels better.\"" },
    ],
  },
  {
    id: 5,
    category: "Honesty & Trust",
    question: "I found out my teen lied to me about where they were going.",
    context: "Teens lie to avoid consequences or conflict — not because they've stopped respecting you. The lie is a symptom. The relationship's trust and safety is the root issue to address.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"You're not in trouble for going somewhere different. I want to understand what made you feel you couldn't tell me the truth.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"You told me you were going to Jamie's house. I found out you went somewhere else. I'm not guessing — that's what happened.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"The lying itself is what hurt me. I can usually handle the thing you're hiding — what I can't handle is not knowing I can trust what you tell me.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Ask openly: \"What were you afraid would happen if you told me where you were really going?\" Their answer tells you everything you need to fix." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want you to feel like you can come to me with hard stuff — even if you know I won't love it. I'd rather hear the truth and be uncomfortable than be lied to.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will work on not overreacting when you tell me something I don't like. That's on me. And I will hold a consequence for the dishonesty — not for the destination.\"" },
    ],
  },
  {
    id: 6,
    category: "Respect & Attitude",
    question: "My teen screamed \"I hate you!\" and slammed their bedroom door.",
    context: "This is the amygdala flooding — not a considered statement of fact. Teen brains under emotional overload lose access to rational thought. The worst time to respond is when both of you are flooded. Wait for the kettle to cool.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "After a cool-down (at least 30 minutes), knock gently. \"Hey. I love you. I'm not here to fight — I just want to check in.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"Earlier you were really upset. You said some things and slammed your door. I'm not bringing that up to punish you — I just want to understand where that came from.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"When those words are said out loud, it stings — even if you didn't fully mean them. I want to be honest about that.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Ask: \"What was going on for you before that all happened?\" Usually there's a stressor underneath — something at school, with friends, or an old wound. Listen for it." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want us to find a signal — even just 'I need a minute' — that we both use before things escalate to that point.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will give you space when you ask for it. And I ask the same — when I need a minute, I'll say so instead of pushing through.\"" },
    ],
  },
  {
    id: 7,
    category: "Friends & Peer Pressure",
    question: "I don't like my teen's new friend group and I'm worried about their influence.",
    context: "The Nucleus Accumbens (the teen brain's reward center) is supercharged for peer approval. Directly attacking their friends triggers defensiveness and pushes them closer together. Curiosity opens more doors than criticism.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I'm bringing this up because I love you and I pay attention to who you're spending time with. That's always been my job.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"I've noticed you've been spending a lot of time with a new group lately. Your schedule and mood have shifted since then. I'm just observing — not accusing.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"I feel a little uneasy when I don't know who you're with. Not because I don't trust you — but because I'm your parent and that's my baseline.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Ask: \"What do you like about spending time with them?\" Listen genuinely. You'll learn more about your teen's unmet needs from this conversation than from any lecture." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want to meet them — informally, no interrogation. Could they come over sometime? I'll stay out of the way.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will trust you unless I see something specific that worries me. And if I do, I'll come to you directly rather than ban anything without talking first.\"" },
    ],
  },
  {
    id: 8,
    category: "School & Responsibility",
    question: "My teenager refuses to do household chores and expects everything done for them.",
    context: "The teen brain's white matter is still building the highways for responsibility, follow-through, and future-orientation. This isn't laziness — but boundaries and consistent follow-through build those highways. Explained expectations beat assumed ones.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I'm not raising this to nag you. I genuinely want us to work out something that feels fair to both of us.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"The dishwasher hasn't been unloaded in four days even though it was agreed that's your job. I'm not exaggerating — that's just what's been happening.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"When I do it myself every time, I feel like my time and the agreement we made don't matter. That's not a good feeling.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Ask: \"Is there something about this particular job that isn't working? Would you rather swap it for a different one?\" Sometimes the fight is about the chore; sometimes it's about something else entirely." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want a short, clear household agreement that we both helped create. Two or three things you own completely — not a long list.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will remind you once — not ten times. If it's not done, there's a consequence we'll agree on now, so it's never a surprise.\"" },
    ],
  },
  {
    id: 9,
    category: "Withdrawal & Mood",
    question: "My teen has become very withdrawn and quiet. I'm worried something is wrong.",
    context: "Adolescent withdrawal can range from normal introversion to early signs of depression. The first move is connection without pressure. Direct questions often close teens down; presence and patience open them up. If withdrawal persists beyond two weeks or is accompanied by sleep changes, appetite changes, or talk of hopelessness — seek professional support.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"I'm not asking because you're in trouble. I'm asking because I love you and I've missed you lately — even when you're right here.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"Over the past few weeks I've noticed you're spending a lot more time alone. You're quieter at meals. You seem tired in a different way than usual.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"I feel worried. Not about you doing something wrong — I just feel like something might be heavy for you and I wish I could help carry it.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Don't immediately ask \"What's wrong?\" — it can feel like a demand. Try: \"You don't have to tell me anything right now. But I'm here — today, tomorrow, whenever.\" Then just be near them. Watch something together. Sit in the same room." },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want you to know that nothing you could tell me would make me love you less or freak out. I'm trying to be a safe place for you.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will check in gently — not push. And if you ever want to talk to someone outside our family, I'll help find that person with zero judgment.\"" },
    ],
  },
  {
    id: 10,
    category: "Honesty & Trust",
    question: "I found out my teen has been drinking or using substances.",
    context: "This conversation often happens in the worst possible moment — fueled by fear, betrayal, and anger all at once. The teen brain's reward circuits are especially vulnerable to substance use during adolescence because pathways are still forming. This conversation is about safety and relationship, not punishment alone.",
    steps: [
      { label: "I Care", color: STEP_COLORS["I Care"], script: "\"Before anything else — you're not in danger, and I love you. I'm not going to explode. I want to actually talk about this.\"" },
      { label: "I See", color: STEP_COLORS["I See"], script: "\"I found out that you [had drinks / used something] on [night/situation]. I'm not going to pretend I don't know — that's where we are.\"" },
      { label: "I Feel", color: STEP_COLORS["I Feel"], script: "\"I feel scared — not because I think you're a bad person, but because I know what can happen, and I need you to understand that this matters to me on a deep level.\"" },
      { label: "Listen", color: STEP_COLORS["Listen"], script: "Ask: \"How did you end up in that situation? What was going on?\" Don't cut them off. The story behind the behavior is where the real conversation lives. Were they stressed? Trying to fit in? Already in a pattern?" },
      { label: "I Want", color: STEP_COLORS["I Want"], script: "\"I want us to talk honestly about what's going on in your life — not just this incident. And I want you to know you can always call me for a ride, no questions until the next day.\"" },
      { label: "I Will", color: STEP_COLORS["I Will"], script: "\"I will enforce a consequence — because that's part of being your parent. And I will also make sure we talk more, not less. This isn't the end of the conversation.\"" },
    ],
  },
];

const references = [
  {
    title: "MPower Program Parent Manual",
    source: "University of Minnesota & Kaiser Permanente",
    url: "https://www.thenationalcouncil.org/wp-content/uploads/2022/06/UniversityofMinnesota_ParentManual.pdf",
  },
  {
    title: "Hearts & Minds: A Parent Guide to SEL",
    source: "Allstate Foundation & CASEL",
    url: "https://static1.squarespace.com/static/5903612f5016e1c4bcbe8282/t/623b96d6a78c614f4c62d2ee/1648072409351/Allstate+SEL+Parent+Guide+v1.pdf",
  },
  {
    title: "Family Guide to Supporting Young People's Mental Health",
    source: "Project Cal-Well / WestEd",
    url: "https://ca-safe-supportive-schools.wested.org/wp-content/uploads/2023/09/Cal-Well-Family-Guide-to-Supporting-Young-Peoples-Mental-Health-and-Well-Being_FINAL_Accessible.pdf",
  },
];

const STEP_LABELS = ["I Care", "I See", "I Feel", "Listen", "I Want", "I Will"];
const STEP_BADGE = [
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
];

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-200"
      data-testid={`faq-card-${scenario.id}`}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-muted/40 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
        data-testid={`faq-toggle-${scenario.id}`}
        aria-expanded={open}
      >
        <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center font-serif">
          {scenario.id}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${BADGE_COLORS[scenario.category] ?? "bg-muted text-muted-foreground"}`}
            >
              {scenario.category}
            </span>
          </div>
          <p className="font-serif text-base font-medium text-foreground leading-snug">
            {scenario.question}
          </p>
        </div>
        <span className="flex-shrink-0 mt-1 text-muted-foreground">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-border/60 pt-5">
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            {scenario.context}
          </p>

          <div className="space-y-3">
            {scenario.steps.map((step, i) => (
              <div
                key={i}
                className={`rounded-lg border px-4 py-3 ${step.color}`}
                data-testid={`faq-step-${scenario.id}-${i}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STEP_BADGE[i]}`}
                  >
                    Step {i + 1}: {STEP_LABELS[i]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{step.script}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const categories = [...new Set(scenarios.map((s) => s.category))];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? scenarios.filter((s) => s.category === activeCategory)
    : scenarios;

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-500 pb-16">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-4xl font-serif font-medium text-foreground">
            Common Situations & What to Say
          </h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Ten real scenarios parents face with teenagers — each answered using the{" "}
          <span className="font-medium text-foreground">6-Step Communication Framework</span> from the
          MPower Program. Expand any card to see the step-by-step script you can use at home.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card/60 px-5 py-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          The 6 Steps — Quick Reference
        </p>
        <div className="flex flex-wrap gap-2">
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className={`text-xs font-medium px-3 py-1 rounded-full border ${STEP_BADGE[i]}`}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Filter by topic:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            data-testid="filter-all"
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              activeCategory === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:bg-muted/50"
            }`}
          >
            All ({scenarios.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {cat} ({scenarios.filter((s) => s.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card/60 p-6 space-y-4">
        <h2 className="font-serif text-lg font-medium text-foreground">
          Sources & Further Reading
        </h2>
        <p className="text-sm text-muted-foreground">
          The communication framework and scenario guidance in this section are drawn from the following
          evidence-based resources:
        </p>
        <div className="space-y-3">
          {references.map((ref) => (
            <a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`ref-link-${ref.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/40 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {ref.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{ref.source}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
