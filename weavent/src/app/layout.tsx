import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ArweaveWalletKit
          config={{
            permissions: [
              "ACCESS_ADDRESS",
              "ACCESS_PUBLIC_KEY",
              "SIGNATURE",
              "SIGN_TRANSACTION",
            ],
          }}
        >
          {children}
        </ArweaveWalletKit>
        <Toaster />
      </body>
    </html>
  );
}
