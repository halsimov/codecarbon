"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { FiefAuthProvider } from "@fief/fief/nextjs/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "../helpers/swr";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* suppressHydrationWarning is a Next theme recommendation */}
            <body className={inter.className}>
                <SWRProvider>
                    <FiefAuthProvider
                        currentUserPath={`${process.env.NEXT_PUBLIC_API_URL}/auth/check`}
                        state={{
                            userinfo: null,
                            accessTokenInfo: null,
                        }}
                    >
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </ThemeProvider>
                    </FiefAuthProvider>
                </SWRProvider>
            </body>
        </html>
    );
}
