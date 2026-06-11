import { Phone, MessageSquare, AlertTriangle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Crisis() {
  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-500">
      
      {/* Sticky Top Crisis Banner */}
      <div className="sticky top-0 z-50 -mx-4 md:-mx-8 lg:-mx-10 px-4 md:px-8 lg:px-10 py-4 bg-destructive text-destructive-foreground shadow-lg font-medium text-sm md:text-base leading-snug" data-testid="banner-crisis">
        <div className="max-w-4xl mx-auto flex items-start md:items-center gap-3">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 md:mt-0" />
          <p>
            If your teen is in immediate danger, call 911. For mental health crisis support: 
            <strong className="block md:inline mt-1 md:mt-0 md:ml-2">
               988 Suicide & Crisis Lifeline — call or text 988
            </strong>
             <span className="hidden md:inline mx-2">|</span>
             <strong className="block md:inline mt-1 md:mt-0">
               Crisis Text Line — text HOME to 741741
            </strong>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 pt-4">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-medium text-foreground">Crisis & De-escalation</h1>
          <p className="text-lg text-muted-foreground">
            When everything is falling apart, slow down. You do not have to fix it right now. You just have to make it safe.
          </p>
        </div>

        {/* De-escalation Protocol */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif font-medium mb-4">De-escalation Protocol</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { num: 1, title: "Stay calm first", desc: "Your nervous system regulates theirs. Take a breath before you speak." },
              { num: 2, title: "Lower the temperature", desc: "Soft voice, neutral face, no crossed arms. Sit down if they're standing." },
              { num: 3, title: "Validate before solving", desc: "\"I can see you're in a lot of pain right now.\"" },
              { num: 4, title: "Ask directly but gently", desc: "\"Are you having thoughts of hurting yourself?\" (Asking does NOT plant the idea — it opens the door.)" },
              { num: 5, title: "Listen without fixing", desc: "Resist the urge to immediately solve. Just be with them." },
              { num: 6, title: "Remove means", desc: "Medications, sharps. Do this quietly and without drama if necessary." },
              { num: 7, title: "Get help", desc: "You don't have to do this alone. 988 is for parents too." }
            ].map(step => (
              <div key={step.num} className="bg-card border border-border/50 rounded-xl p-5 flex gap-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-serif font-medium text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Directory */}
        <section className="space-y-6 pt-8 border-t border-border/50">
          <h2 className="text-2xl font-serif font-medium mb-4">Support Resources Directory</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-serif font-medium text-destructive mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" /> Mental Health Crisis
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">988 Lifeline</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p className="text-muted-foreground">Free, 24/7 confidential support for people in distress.</p>
                    <Button asChild variant="destructive" className="w-full" size="sm">
                      <a href="tel:988">Call or Text 988</a>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Crisis Text Line</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p className="text-muted-foreground">Text from anywhere in the US to connect with a crisis counselor.</p>
                    <Button asChild variant="destructive" className="w-full" size="sm">
                      <a href="sms:741741&body=HOME">Text HOME to 741741</a>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">SAMHSA Helpline</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p className="text-muted-foreground">Treatment referral and information service.</p>
                    <Button asChild variant="destructive" className="w-full" size="sm">
                      <a href="tel:1-800-662-4357">Call 1-800-662-4357</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-serif font-medium mb-3">Teen Mental Health</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://childmind.org" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md bg-card border border-border/50 hover:bg-muted transition-colors">
                      <span className="font-medium text-sm">Child Mind Institute</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </li>
                  <li>
                    <a href="https://nami.org" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md bg-card border border-border/50 hover:bg-muted transition-colors">
                      <span className="font-medium text-sm">NAMI</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </li>
                  <li>
                    <a href="https://aacap.org" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md bg-card border border-border/50 hover:bg-muted transition-colors">
                      <span className="font-medium text-sm">AACAP</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-serif font-medium mb-3">Substance Use</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://teens.drugabuse.gov" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md bg-card border border-border/50 hover:bg-muted transition-colors">
                      <span className="font-medium text-sm">NIDA for Teens</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </li>
                  <li>
                    <a href="https://drugfree.org" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md bg-card border border-border/50 hover:bg-muted transition-colors">
                      <span className="font-medium text-sm">Partnership to End Addiction</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </li>
                  <li>
                    <a href="https://findtreatment.gov" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-md bg-card border border-border/50 hover:bg-muted transition-colors">
                      <span className="font-medium text-sm">Treatment Locator</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-serif font-medium mb-3">Family Support Frameworks</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="bg-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-serif">Cal-Well Family Guide</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    WestEd-based evidence framework for K-12 families.
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-serif">MPower Program</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    University of Minnesota / Kaiser Permanente CASAR research-based parenting framework.
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-serif">Family Lives</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <a href="https://familylives.org.uk" target="_blank" rel="noreferrer" className="text-primary hover:underline">familylives.org.uk</a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
