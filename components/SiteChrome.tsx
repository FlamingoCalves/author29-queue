"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Author29Bar } from "@/components/Author29Bar";
import { parseCaptureParams } from "@/lib/demo/capture";

export function SiteChrome() {
  const searchParams = useSearchParams();
  const capture = parseCaptureParams(searchParams).enabled;

  useEffect(() => {
    if (capture) {
      document.documentElement.setAttribute("data-portfolio-capture", "1");
      return () => document.documentElement.removeAttribute("data-portfolio-capture");
    }
    document.documentElement.removeAttribute("data-portfolio-capture");
    return undefined;
  }, [capture]);

  return (
    <>
      {capture ? <meta name="robots" content="noindex, nofollow" /> : null}
      {capture ? null : <Author29Bar />}
    </>
  );
}
