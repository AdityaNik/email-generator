'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react";
import axios from 'axios';

const EmailComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [purpose, setPurpose] = useState('');
    const [keyPoints, setKeyPoints] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedEmail, setGeneratedEmail] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('api/generate-email-gemini', {
                name,
                email,
                purpose,
                keypoints: keyPoints
            });

            if (!response.data.content) {
                setLoading(false);
                toast({
                    title: "Ahhhh, AI failed",
                    description: "I gusse AI doesn't want to help you at this movement.",
                });
            }

            console.log(response.data.content);
            setGeneratedEmail(response.data.content)
            setLoading(false);
            toast({
                title: "Email generated successfully",
                description: "Your professional email template is ready.",
            });
        } catch (err) {
            setLoading(false);
            toast({
                title: "Ahhhh, AI failed",
                description: "I gusse AI doesn't want to help you at this movement.",
            });
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedEmail);
        toast({
            title: "Copied to clipboard",
            description: "Email template has been copied to your clipboard.",
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 animate-in">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Name</Label>
                    <Input
                        id="recipient"
                        placeholder="John Doe"
                        className="w-full"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Recipient Email</Label>
                    <Input
                        id="email"
                        placeholder="john@gmail.com"
                        className="w-full"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="purpose">Email Purpose</Label>
                    <Select 
                        required
                        value={purpose}
                        onValueChange={(value) => {
                            setPurpose(value)
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="meeting">Meeting Request</SelectItem>
                            <SelectItem value="followup">Follow Up</SelectItem>
                            <SelectItem value="thankyou">Thank You</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="points">Key Points</Label>
                    <Textarea
                        id="points"
                        placeholder="Enter the main points to include in your email..."
                        className="min-h-[100px]"
                        onChange={(e) => {
                            setKeyPoints(e.target.value)
                        }}
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating Email...
                        </>
                    ) : (
                        "Generate Email"
                    )}
                </Button>
            </form>

            {generatedEmail && (
                <div className="space-y-4 animate-in">
                    <div className="rounded-lg border bg-card p-4">
                        <pre className="whitespace-pre-wrap font-inter text-sm">
                            {generatedEmail}
                        </pre>
                    </div>
                    <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="w-full"
                    >
                        Copy to Clipboard
                    </Button>
                </div>
            )}
        </div>
    );
}

export default EmailComponent;