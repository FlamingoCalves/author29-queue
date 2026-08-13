export const STAGES = [
  "New inquiry",
  "Quote out",
  "In project",
  "Re-engage",
] as const;

export type RelationshipStage = (typeof STAGES)[number];
export type MessageChannel = "email" | "sms";
export type MessageStatus = "queued" | "sent" | "skipped";
export type DraftKind = "inquiry" | "quote" | "project" | "reengage";

export type Contact = {
  id: string;
  displayName: string;
  firstName: string;
  stage: RelationshipStage;
  /** Mailchimp segment this person already sits in. */
  segment: string;
  focus: string;
  /** The particular thing this draft is about — not a generic blast. */
  need: string;
  whyToday: string;
  lastTouch: string;
  dueToday: boolean;
};

export type DraftMessage = {
  id: string;
  contactId: string;
  kind: DraftKind;
  channel: MessageChannel;
  subject: string;
  body: string;
  status: MessageStatus;
  sendWindow: string;
};

export type DemoState = {
  contacts: Contact[];
  messages: DraftMessage[];
};
