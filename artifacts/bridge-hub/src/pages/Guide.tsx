import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function Guide() {
  const steps = [
    {
      title: "\"I Care\"",
      desc: "Build connection first.",
      example: "I care about you and I don't want you to get hurt."
    },
    {
      title: "\"I See\"",
      desc: "State objective facts, no blame.",
      example: "When you came in last night, you were 3 hours late."
    },
    {
      title: "\"I Feel\"",
      desc: "Share emotions without accusations.",
      example: "I felt scared and worried."
    },
    {
      title: "Listen",
      desc: "Stop talking. Give them space. Offer to talk later if they aren't ready.",
      example: "(Silence. Breathe.)"
    },
    {
      title: "\"I Want\"",
      desc: "State clear expectations.",
      example: "I want you to call me so I know you're safe."
    },
    {
      title: "\"I Will\"",
      desc: "Define what you will/won't do to support the situation moving forward.",
      example: "I will pick you up anytime, no questions asked, if you need a safe ride."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-medium text-foreground">Parent Guide & Communication</h1>
        <p className="text-lg text-muted-foreground">
          Practical frameworks for talking when it feels impossible. Connection always comes before correction.
        </p>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">The 6 Steps to Effective Communication</h2>
          <p className="text-muted-foreground mb-8">The MPower Framework for structured, de-escalated conversations.</p>
        </div>

        <div className="relative border-l-2 border-primary/30 ml-4 md:ml-6 space-y-8 pb-4">
          {steps.map((step, index) => (
            <div key={index} className="relative pl-8 md:pl-10">
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold text-sm shadow-sm">
                {index + 1}
              </div>
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <h3 className="text-xl font-serif font-medium text-primary mb-1">{step.title}</h3>
                  <p className="text-foreground/90 mb-3">{step.desc}</p>
                  <div className="bg-muted p-3 rounded-md border border-border/50">
                    <p className="text-sm font-medium italic text-muted-foreground">
                      Example: "{step.example}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 pt-6">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">Common Queries</h2>
          <p className="text-muted-foreground">Empathetic answers to the hardest moments.</p>
        </div>

        <Accordion type="single" collapsible className="w-full" data-testid="accordion-faqs">
          <AccordionItem value="item-1" className="border-border/50">
            <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
              My teen rolls their eyes and walks away. What do I do?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              Don't chase the conversation. Calmly say "I'd like to talk when you're ready — I'll be here." Walking away isn't rejection; it's overwhelm. Connection before correction.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-border/50">
            <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
              How do I enforce a curfew without a screaming match?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              Set the rule during a calm moment, not when they've already broken it. Include them in setting the consequence. When violated, respond from the rule, not the emotion: "We agreed on midnight. You came in at 2. Here's what we said would happen."
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-border/50">
            <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
              How do I balance independence and monitoring their safety?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              Teens need to practice autonomy with a safety net. Replace surveillance with check-ins. "You don't have to tell me everything, but I need to know you're safe." Build trust incrementally — as they demonstrate reliability, loosen the rope.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border-border/50">
            <AccordionTrigger className="text-left font-serif text-lg hover:text-primary">
              What if they refuse to talk to me at all?
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              Try side-by-side activities instead of face-to-face conversations. Car rides, cooking, walks. Adolescent brains open up when not under direct social pressure. Don't force it — plant seeds.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
