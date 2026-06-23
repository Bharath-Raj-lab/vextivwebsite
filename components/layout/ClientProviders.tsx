"use client";

import React from "react";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ExitIntentPopup />
    </>
  );
}
