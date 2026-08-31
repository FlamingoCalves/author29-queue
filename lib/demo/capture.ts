import type { DemoState, RelationshipStage } from "./types";
import { createSeedState } from "./seed";
import { applyNorthshoreOverlay } from "./capture-seed";

export const ALLOWED_SCENES = ["today", "stages", "draft", "approve"] as const;
export type CaptureScene = (typeof ALLOWED_SCENES)[number];

export const ALLOWED_MESSAGE_IDS = [
  "msg-priya",
  "msg-marcus",
  "msg-camille",
  "msg-hannah",
  "msg-sam",
  "msg-june",
  "msg-theo",
  "msg-sofia",
  "msg-lila",
] as const;
export type CaptureMessageId = (typeof ALLOWED_MESSAGE_IDS)[number];

export type CaptureRequest = {
  enabled: boolean;
  scene: CaptureScene | null;
  messageId: CaptureMessageId | null;
};

const DISABLED: CaptureRequest = { enabled: false, scene: null, messageId: null };

export const CAPTURE_STAGE_LABEL: Record<RelationshipStage, string> = {
  "New inquiry": "New consult",
  "Quote out": "Plan pending",
  "In project": "Active care",
  "Re-engage": "Re-engage",
};

export const CAPTURE_DATE_LABEL = "Tuesday, Dec 9";

export function isAllowedScene(value: string | null): value is CaptureScene {
  return value !== null && (ALLOWED_SCENES as readonly string[]).includes(value);
}

export function isAllowedMessageId(value: string | null): value is CaptureMessageId {
  return value !== null && (ALLOWED_MESSAGE_IDS as readonly string[]).includes(value);
}

export function parseCaptureParams(
  searchParams: Pick<URLSearchParams, "get">,
): CaptureRequest {
  const raw = searchParams.get("capture");
  const enabled = raw === "1" || raw === "true";
  if (!enabled) return DISABLED;

  const sceneRaw = searchParams.get("scene");
  const idRaw = searchParams.get("id");

  return {
    enabled: true,
    scene: isAllowedScene(sceneRaw) ? sceneRaw : null,
    messageId: isAllowedMessageId(idRaw) ? idRaw : null,
  };
}

export function shouldRecordAnalytics(capture: CaptureRequest): boolean {
  return !capture.enabled;
}

export function stageLabel(stage: RelationshipStage, capture: boolean): string {
  return capture ? CAPTURE_STAGE_LABEL[stage] : stage;
}

export function captureHref(href: string, capture: boolean): string {
  if (!capture) return href;
  const url = new URL(href, "https://portfolio.local");
  url.searchParams.set("capture", "1");
  return `${url.pathname}${url.search}`;
}

export function createCaptureState(_capture: CaptureRequest): DemoState {
  return applyNorthshoreOverlay(createSeedState());
}
