import type { Contact, DemoState, DraftMessage } from "./types";

/** Capture-only world. Live trial stays Cedar & Field / Elena Voss. */
export const CAPTURE_STUDIO = {
  name: "Northshore Clinic",
  short: "Northshore",
  line: "Cash-pay · two locations",
  vertical: "physical therapy",
} as const;

export const CAPTURE_OPERATOR = {
  name: "Reese Quinn",
  firstName: "Reese",
  role: "Practice manager",
} as const;

export const CAPTURE_MAIL = {
  name: "Mailchimp",
  listName: "Northshore Clinic — patients",
  listCount: 142,
  lastSync: "this morning",
  sendWindow: "Tue–Thu, 10am–2pm",
} as const;

const SIGN_OFF = `${CAPTURE_OPERATOR.name}\n${CAPTURE_STUDIO.name}`;

const CONTACT_OVERLAY: Record<string, Partial<Contact>> = {
  priya: {
    displayName: "Priya R.",
    focus: "Sport return · shoulder",
    need: "Home program sent — she went quiet after the plan",
    whyToday: "Plan has sat 11 days with no reply",
    lastTouch: "Home program emailed · 11 days ago",
  },
  marcus: {
    displayName: "Marcus B.",
    focus: "New consult · lower back",
    need: "Saturday walk-in — no first note yet",
    whyToday: "Walked in Saturday — no first note yet",
    lastTouch: "Front desk · Saturday",
  },
  camille: {
    displayName: "Camille W.",
    focus: "Follow-up check-in",
    need: "Finished a block last spring; life got busy; a check-in was the next thought",
    whyToday: "Re-engage — 3 weeks since last list activity",
    lastTouch: "Opened a clinic email · 3 weeks ago",
  },
  june: {
    displayName: "June O.",
    focus: "Active care · post-op",
    need: "Schedule slipped a week; she should hear the new window from Reese, not the front desk script",
    whyToday: "Mid-care check-in after the delay",
    lastTouch: "Visit note · 4 days ago",
  },
  theo: {
    displayName: "Theo R.",
    focus: "One year since last visit",
    need: "Anniversary window — how the shoulder is living, and he already referred Sam",
    whyToday: "One year since discharge",
    lastTouch: "Discharge · 12 months ago",
  },
  hannah: {
    displayName: "Hannah C.",
    focus: "Eval hold · scheduling",
    need: "She asked a specific start-date question; the opening moved (this week, not next month)",
    whyToday: "Warm question still unanswered",
    lastTouch: "Email from Hannah · 3 days ago",
  },
  sam: {
    displayName: "Sam F.",
    focus: "Referral from Theo R.",
    need: "Theo named him this week for a consult — intro still unsent",
    whyToday: "Referral intro still unsent",
    lastTouch: "Theo mentioned Sam · this week",
  },
  lila: {
    displayName: "Lila N.",
    focus: "Thursday eval",
    need: "Confirm Thursday at 10; what to wear and the one decision that changes the plan",
    whyToday: "Confirm time and send the agenda",
    lastTouch: "Intake shared · Monday",
  },
  sofia: {
    displayName: "Sofia T.",
    focus: "Plan pending · home program",
    need: "Asked for a revised home program; draft is ready",
    whyToday: "Revised plan sitting 6 days",
    lastTouch: "Revised PDF · 6 days ago",
  },
};

const MESSAGE_OVERLAY: Record<string, Partial<DraftMessage>> = {
  "msg-priya": {
    subject: "The home program — still here if you want to trim it",
    body: `Hi Priya — the plan has been sitting about a week and a half, and I didn’t want the home program to be the last word.\n\nIf the volume felt like too much, we can keep the two lifts that matter and drop the rest for two weeks. Same goal, smaller first ask.\n\nNo rush — I just didn’t want a quiet inbox to be the end of it.\n\n${SIGN_OFF}`,
  },
  "msg-marcus": {
    subject: "Notes from Saturday",
    body: `Hi Marcus — good to meet you at the front desk on Saturday. I wrote down the lower-back history so we can start from what you already tried.\n\nIf a 20-minute follow-up would help, I have Tuesday or Thursday late morning.\n\n${SIGN_OFF}`,
  },
  "msg-camille": {
    subject: "A check-in — whenever you’re ready",
    body: `Hi Camille — hope you’ve been doing well since we finished that last block.\n\nWe know life gets busy. You mentioned a follow-up when we wrapped, and I didn’t want that to just sit in the notes.\n\nIf a single visit would help you decide whether it’s worth another block, fall is a quieter slot for us.\n\n${SIGN_OFF}`,
  },
  "msg-hannah": {
    subject: "An opening this week — the short version",
    body: `Hi Hannah — the start date you asked about: we have a slot this week, not the month-out hold I mentioned in passing. If we lock it by Friday, you keep the original plan.\n\n${SIGN_OFF}`,
  },
  "msg-sam": {
    subject: "Theo thought we should meet",
    body: `Hi Sam — Theo suggested I reach out. We saw him last year; he mentioned you might want a consult.\n\nIf a short first visit is useful, I keep Thursday afternoons for those conversations.\n\n${SIGN_OFF}`,
  },
  "msg-june": {
    subject: "Schedule change — here’s the new window",
    body: `Hi June — the next visit is now the week of the 24th. Nothing else on your plan moves without you seeing it first.\n\nI’ll be on the floor Thursday if you want to walk the progress before then.\n\n${SIGN_OFF}`,
  },
  "msg-theo": {
    subject: "One year on — how is the shoulder living?",
    body: `Hi Theo — it’s been a year since we wrapped. Curious how it’s living: anything you’d change, anything the next block should steal.\n\nNo agenda other than that — and thank you for sending Sam our way.\n\n${SIGN_OFF}`,
  },
  "msg-sofia": {
    subject: "Home program — the revised version",
    body: `Hi Sofia — here’s the revised home program we talked about. It keeps the work that matters and drops the extra so it fits the week you actually have.\n\nIf it looks right, we can lock it this week and keep your start.\n\n${SIGN_OFF}`,
  },
  "msg-lila": {
    subject: "Thursday’s eval",
    body: `Hi Lila — confirming Thursday at 10. Wear something you can move in; we’ll walk what you want back and the one decision that actually changes the plan.\n\n${SIGN_OFF}`,
  },
};

export function applyNorthshoreOverlay(state: DemoState): DemoState {
  return {
    contacts: state.contacts.map((contact) => ({
      ...contact,
      ...CONTACT_OVERLAY[contact.id],
      segment: CAPTURE_STAGE_LABEL_FOR(contact.stage),
    })),
    messages: state.messages.map((message) => ({
      ...message,
      ...MESSAGE_OVERLAY[message.id],
      sendWindow: CAPTURE_MAIL.sendWindow,
    })),
  };
}

function CAPTURE_STAGE_LABEL_FOR(stage: Contact["stage"]): string {
  if (stage === "New inquiry") return "New consult";
  if (stage === "Quote out") return "Plan pending";
  if (stage === "In project") return "Active care";
  return "Re-engage";
}
