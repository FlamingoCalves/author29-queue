"use client";

import { MAIL_SERVICE, OPERATOR, STUDIO } from "./brand";
import { stageLabel } from "./capture";
import { useCaptureMode } from "./capture-context";
import { CAPTURE_MAIL, CAPTURE_OPERATOR, CAPTURE_STUDIO } from "./capture-seed";
import type { RelationshipStage } from "./types";

export function usePresented() {
  const capture = useCaptureMode();
  const capturing = capture.enabled;
  return {
    capturing,
    capture,
    studio: capturing ? CAPTURE_STUDIO : STUDIO,
    operator: capturing ? CAPTURE_OPERATOR : OPERATOR,
    mail: capturing ? CAPTURE_MAIL : MAIL_SERVICE,
    stageLabel: (stage: RelationshipStage) => stageLabel(stage, capturing),
  };
}
