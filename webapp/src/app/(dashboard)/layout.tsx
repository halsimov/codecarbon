"use client";

import AutoBreadcrumb from "@/components/breadcrumb";
import NavBar from "@/components/navbar";
import { fetcher } from "../../helpers/swr";
import { Organization } from "@/types/organization";
// import { getUserOrganizations } from "@/server-functions/organizations";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Suspense, useState } from "react";
import Loader from "@/components/loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

// export async function getUserOrganizations(): Promise<Organization[]> {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
//         next: {
//             revalidate: 3600,
//         },
//     });

//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         console.error("Failed to fetch data", res.statusText);
//         throw new Error("Failed to fetch data");
//     }
//     return res.json();
// }

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSheetOpen, setSheetOpened] = useState(false);
    const { data } = useSWR<Organization[]>("/api/organizations", fetcher, {
        refreshInterval: 1000 * 60, // Refresh every minute
    });
    return (
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr]">
            {/* Side bar that shows only on screens larger than 768px */}
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center px-4 lg:h-[80px] lg:px-6">
                        <Link
                            href="/home"
                            className="flex flex-1 justify-center items-center gap-2 pt-6 font-semibold"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={95}
                                height={89}
                                priority
                            />
                        </Link>
                    </div>
                    <NavBar orgs={data} setSheetOpened={setSheetOpened} />
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col overflow-hidden">
                <div className="overflow-auto">
                    <header className="flex items-center justify-between h-14 px-4 lg:h-[60px] lg:px-6">
                        {/* Drawer that shows only on small screens */}
                        <Sheet open={isSheetOpen} onOpenChange={setSheetOpened}>
                            <SheetTrigger
                                asChild
                                onClick={() => setSheetOpened(true)}
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">
                                        Toggle navigation menu
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex flex-col w-[220px] p-0"
                            >
                                <div className="flex h-14 items-center px-4 lg:h-[80px] lg:px-6">
                                    <Link
                                        href="/home"
                                        onClick={() => setSheetOpened(false)}
                                        className="flex flex-1 justify-center items-center gap-2 pt-6 font-semibold"
                                    >
                                        <Image
                                            src="/logo.svg"
                                            alt="Logo"
                                            width={95}
                                            height={89}
                                            priority
                                        />
                                    </Link>
                                </div>
                                <NavBar
                                    orgs={data}
                                    setSheetOpened={setSheetOpened}
                                />
                            </SheetContent>
                        </Sheet>
                        <AutoBreadcrumb />
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}