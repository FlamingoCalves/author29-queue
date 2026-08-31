"use client";

import { createContext, useContext } from "react";
import type { CaptureRequest } from "./capture";

const DISABLED: CaptureRequest = { enabled: false, scene: null, messageId: null };

export const CaptureContext = createContext<CaptureRequest>(DISABLED);

export function useCaptureMode(): CaptureRequest {
  return useContext(CaptureContext);
}
