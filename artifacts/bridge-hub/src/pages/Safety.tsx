import { useState } from "react";
import { ShieldAlert, FileText, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function Safety() {
  const [contractData, setContractData] = useState({
    limit: "",
    zones: [] as string[],
    social: [] as string[],
    consequence: "",
    parentCommitment: ""
  });
  const [showContract, setShowContract] = useState(false);

  const handleZone = (zone: string, checked: boolean) => {
    if (checked) setContractData(p => ({ ...p, zones: [...p.zones, zone] }));
    else setContractData(p => ({ ...p, zones: p.zones.filter(z => z !== zone) }));
  };

  const handleSocial = (app: string, checked: boolean) => {
    if (checked) setContractData(p => ({ ...p, social: [...p.social, app] }));
    else setContractData(p => ({ ...p, social: p.social.filter(a => a !== app) }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-medium text-foreground flex items-center gap-3">
          <ShieldAlert className="w-10 h-10 text-primary" />
          Online Safety & Bullying
        </h1>
        <p className="text-lg text-muted-foreground">
          Navigating the digital world requires boundaries, trust, and open communication.
        </p>
      </div>

      {/* Bullying Triage */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">Recognizing Bullying: Signs & Starters</h2>
          <p className="text-muted-foreground">How to notice the invisible hurt and start the conversation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg">Signs of Victimization</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-foreground/80 space-y-2">
              <p>• Sudden reluctance to use devices or avoiding school</p>
              <p>• Changes in mood immediately after online time</p>
              <p>• Unexplained withdrawal from friends</p>
              <p>• Vague complaints of "drama" without details</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-lg">Signs of Aggressive Behavior</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-foreground/80 space-y-2">
              <p>• Secretiveness about online activity</p>
              <p>• Laughing at content they won't show you</p>
              <p>• Sudden new "followers" or friend groups</p>
              <p>• Extreme emotional swings tied to device removal</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-primary">Conversation Starters (Copy-Ready)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-background p-4 rounded-md border border-border/50">
              <p className="italic font-serif">"Hey, I noticed you seemed off after being on your phone. I'm not trying to pry — I just want you to know I'm here if something's going on."</p>
            </div>
            <div className="bg-background p-4 rounded-md border border-border/50">
              <p className="italic font-serif">"Can we talk about something I noticed? I promise I'm not in trouble-mode, I just want to understand."</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contract Builder */}
      <section className="space-y-6 pt-8 border-t border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-2">Digital Behavioral Contract Builder</h2>
          <p className="text-muted-foreground">Collaborate on expectations so consequences aren't a surprise.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Screen time limits (e.g. "2 hours on weekdays")</Label>
                  <Input 
                    placeholder="Enter agreed limit..." 
                    value={contractData.limit}
                    onChange={(e) => setContractData({...contractData, limit: e.target.value})}
                    data-testid="input-contract-limit"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Phone-free zones</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Dining table", "Bedroom after 10pm", "Car rides", "Family time"].map(zone => (
                      <div key={zone} className="flex items-center gap-2">
                        <Checkbox 
                          id={`zone-${zone}`} 
                          onCheckedChange={(c) => handleZone(zone, c as boolean)}
                        />
                        <Label htmlFor={`zone-${zone}`} className="font-normal">{zone}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Allowed Platforms</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Instagram", "TikTok", "Snapchat", "YouTube", "Discord"].map(app => (
                      <div key={app} className="flex items-center gap-2">
                        <Checkbox 
                          id={`app-${app}`} 
                          onCheckedChange={(c) => handleSocial(app, c as boolean)}
                        />
                        <Label htmlFor={`app-${app}`} className="font-normal">{app}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Consequence for breaking rules</Label>
                  <Textarea 
                    placeholder="If rules are broken, then..." 
                    value={contractData.consequence}
                    onChange={(e) => setContractData({...contractData, consequence: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Parent's Commitment</Label>
                  <Input 
                    placeholder="e.g. I will also keep my phone off the dinner table" 
                    value={contractData.parentCommitment}
                    onChange={(e) => setContractData({...contractData, parentCommitment: e.target.value})}
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setShowContract(true)}
                  data-testid="button-generate-contract"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Contract
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {showContract ? (
              <Card className="sticky top-24 bg-card shadow-md border-border" id="printable-contract">
                <CardHeader className="text-center border-b border-border/50 pb-6">
                  <CardTitle className="text-2xl font-serif">Digital Agreement</CardTitle>
                  <CardDescription>A shared commitment to safety and balance.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-sm">
                  <div>
                    <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider text-xs">Time Limit</h4>
                    <p className="border-b border-dashed border-border/50 pb-1">{contractData.limit || "_________________"}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider text-xs">Phone-Free Zones</h4>
                    <ul className="list-disc pl-4 text-muted-foreground">
                      {contractData.zones.length > 0 ? contractData.zones.map(z => <li key={z}>{z}</li>) : <li>_________________</li>}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider text-xs">Platforms Allowed</h4>
                    <p className="text-muted-foreground">{contractData.social.length > 0 ? contractData.social.join(", ") : "_________________"}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider text-xs">Consequence</h4>
                    <p className="border-b border-dashed border-border/50 pb-1 italic">{contractData.consequence || "_________________"}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider text-xs">Parent Commitment</h4>
                    <p className="border-b border-dashed border-border/50 pb-1 italic">{contractData.parentCommitment || "_________________"}</p>
                  </div>
                  <div className="pt-8 space-y-6">
                    <div className="border-t border-foreground/30 pt-2 text-center w-3/4 mx-auto text-muted-foreground">Teen Signature</div>
                    <div className="border-t border-foreground/30 pt-2 text-center w-3/4 mx-auto text-muted-foreground">Parent Signature</div>
                  </div>
                  
                  <div className="pt-4 flex justify-center print:hidden">
                    <Button variant="outline" onClick={() => window.print()} data-testid="button-print">
                      <Printer className="w-4 h-4 mr-2" />
                      Print Contract
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="h-full border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center p-8 text-center text-muted-foreground">
                Fill out the fields to generate a printable family contract.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ed Cards */}
      <section className="space-y-6 pt-8 border-t border-border/50">
        <div>
          <h2 className="text-2xl font-serif font-medium mb-4">Digital Safety Education</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Digital Footprints</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              What you post at 14 can appear in a background check at 24. Help them think before they share.
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Cyberbullying</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              It doesn't turn off when they come home. Their phone brings it into their bedroom. Ask about their online social world regularly.
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Go through phone privacy settings together — not as surveillance, but as a shared safety ritual.
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Harmful Content</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              You can't prevent all exposure. But you can build the relationship where they come to you when they see something disturbing.
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
