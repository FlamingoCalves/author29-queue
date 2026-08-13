/** Queue trial identity — not a client brand. */

export const PRODUCT = {
  id: "queue",
  name: "Queue",
  tagline: "Who needs a touch today — on the list you already have.",
} as const;

export const STUDIO = {
  name: "Cedar & Field",
  short: "Cedar & Field",
  line: "Kitchen + bath · design studio",
  vertical: "kitchen and bath design",
} as const;

export const OPERATOR = {
  name: "Elena Voss",
  firstName: "Elena",
  role: "Principal designer",
} as const;

/** Mocked existing mail service — Queue sits on top of it. Nothing live. */
export const MAIL_SERVICE = {
  name: "Mailchimp",
  listName: "Cedar & Field — homeowners",
  listCount: 142,
  lastSync: "this morning · mocked",
  sendWindow: "Tue–Thu, 10am–2pm",
} as const;

export const PALETTE = {
  ink: "#241c18",
  accent: "#b54a32",
  accentBright: "#c96248",
  accentLight: "#f6e4dc",
  accentDark: "#8c3523",
  paper: "#f7f1e8",
  surface: "#f3ebe1",
  muted: "#6f645c",
} as const;

/** Same motion, different seats — interactive callout on the start screen. */
export const USE_CASES = [
  {
    id: "clinic",
    label: "Clinic / practice",
    example: "Who hasn’t been seen — who needs a check-in",
    how: "Queue reads the list you already keep (Mailchimp, in this sample). Today’s touches, stages, and a draft that names what they actually need — then a person approves send.",
    value:
      "The book stays warm without blasting everyone. The right people hear from you today, in a voice you’d send.",
  },
  {
    id: "sales",
    label: "Sales",
    example: "Pipeline that needs a human note today",
    how: "Leads, quotes going quiet, and accounts that stalled surface from the existing list. The draft is particular to the deal — not a sequence blast. You still send.",
    value:
      "Follow-ups happen while the window is open — not after the quote goes cold and the book goes silent.",
  },
  {
    id: "advisory",
    label: "Advisory",
    example: "Households due for a note",
    how: "Review-due and quiet households land in today’s queue with a draft written from their last touch. Mailchimp (or the list you already run) stays the send path.",
    value:
      "Continuity feels personal. The firm reaches out on time, in a voice the household would recognize.",
  },
  {
    id: "agency",
    label: "Agency / CS",
    example: "Accounts going quiet",
    how: "CSMs see who hasn’t been touched, why it matters, and a draft standing by — sitting on the list you already have, not a second CRM to feed.",
    value:
      "Portfolios don’t go silent between QBR dates. The touch is timely and still human.",
  },
] as const;

export type UseCaseId = (typeof USE_CASES)[number]["id"];
