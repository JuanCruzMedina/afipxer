import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-3">
              <span className="text-default-600">
                Developed and designed by{" "}
                <Link
                  isExternal
                  className="text-current"
                  href="https://juanmedina.com.ar/"
                  title="juanmedina.com.ar homepage"
                >
                  <p className="text-primary">Juan Cruz Medina</p>.
                </Link>
              </span>
              <span className="text-default-600">
                Build with{" "}
                <Link
                  isExternal
                  className="text-current"
                  href="https://heroui.com/"
                  title="heroui.com homepage"
                >
                  <p className="text-primary">Hero UI</p>
                </Link>{" "}
                &{" "}
                <Link
                  isExternal
                  className="text-current"
                  href="https://nextjs.org/"
                  title="nextjs.com homepage"
                >
                  <p className="text-primary">Next.js</p>
                </Link>
                . Hosted on{" "}
                <Link
                  isExternal
                  className="text-current"
                  href="https://vercel.com/"
                  title="vercel.com homepage"
                >
                  <p className="text-primary">Vercel</p>
                </Link>
                .
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
