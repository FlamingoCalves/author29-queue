import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata: Metadata = {
  title: "Queue — Author29 trial",
  description: "Interactive trial. Fictional sample data. Nothing sends.",
};

export default function TrialLayout({ children }: { children: React.ReactNode }) {
  return <DemoShell>{children}</DemoShell>;
}
