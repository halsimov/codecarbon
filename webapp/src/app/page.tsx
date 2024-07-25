import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto text-center">
                <h1 className="text-4xl font-semi-bold tracking-tight text-foreground sm:text-5xl">
                    Welcome to Code Carbon!
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Get started by signing in with your preferred service.
                </p>
                <div className="mt-6">
                    <Link href="/login?redirect=/home?auth=true" passHref>
                        <Button className="w-full max-w-[300px]">
                            <LogIn className="mr-2 h-5 w-5" />
                            Sign in or create an account
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}