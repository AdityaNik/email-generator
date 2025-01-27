import EmailComponent from "@/components/email-requirement";
import { ModeToggle } from "@/components/ui/toggle";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="flex justify-center m-2">
        <ModeToggle />
      </div>
      {/* <div className="max-w-2xl mx-auto text-center mb-12 animate-in">
        <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Email Generator
        </div>
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          Create Professional Emails
        </h1>
        <div className="text-muted-foreground text-lg">
          Generate polished email templates in seconds
        </div>
      </div> */}
      <EmailComponent />
    </div>
  );
}
