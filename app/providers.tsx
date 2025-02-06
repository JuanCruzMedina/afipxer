"use client";

import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import { useEffect } from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !posthog.__loaded) {
      const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;

      if (!token) {
        throw new Error(
          "PostHog key is required. Please set NEXT_PUBLIC_POSTHOG_KEY in your environment variables.",
        );
      }
      posthog.init(token, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        // loaded: (posthog) => {
        //   if (process.env.NODE_ENV === "development") posthog.debug();
        // },
        person_profiles: "identified_only",
      });
      posthog.__loaded = true;
    }
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </PostHogProvider>
  );
}
