import EmailComponent from "@/components/email-requirement";
import { ModeToggle } from "@/components/ui/toggle";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-background px-4 py-16">
      <div className="flex justify-center m-2">
        <ModeToggle />
      </div>
      <EmailComponent />
    </div>
  );
}
