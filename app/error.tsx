"use client";

import React, { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

import { siteConfig } from "@/config/site";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture(siteConfig.posthog.errorEventName, {
      message: error.message,
    });
  }, [error, posthog]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h2 className="text-2xl font-semibold text-danger-500">
        Oops! Algo salió mal.
      </h2>
      <p className="text-default-600 mt-1">Por favor, intenta nuevamente.</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => reset()}
      >
        Reintentar
      </button>
    </div>
  );
}
