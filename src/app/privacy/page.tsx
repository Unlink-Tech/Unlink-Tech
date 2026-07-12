import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Unlink Technologies Private Limited collects, uses, stores, and protects your information.",
};

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";
const inset =
  "shadow-[inset_5px_5px_10px_var(--neu-dark),inset_-5px_-5px_10px_var(--neu-light)]";

const intro = [
  `The terms "We" / "Us" / "Our" / "Company" refer to Unlink Technologies Private Limited, and the terms "You" / "Your" / "Yourself" refer to you, the user of the Website.`,
  "This Privacy Policy is an electronic record in accordance with the provisions of the Information Technology Act, 2000. It does not require any physical, electronic, or digital signature.",
  "This Privacy Policy is a legally binding document between you and the Company. By using the Website or any associated services, you agree to the terms outlined below. If you do not agree with this Privacy Policy, please do not use our Website or services.",
  "This document complies with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, under the Information Technology Act, 2000, and addresses the collection, use, storage, and transfer of sensitive personal data or information.",
];

type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[]; cols?: 2 }
  | {
      kind: "contact";
      name: string;
      company: string;
      email: string;
      phone: string;
    };

const sections: { title: string; blocks: Block[] }[] = [
  {
    title: "User Information",
    blocks: [
      {
        kind: "p",
        text: "When you register for services on our Website, we may collect the following details:",
      },
      {
        kind: "list",
        cols: 2,
        items: [
          "Name",
          "Email Address",
          "Gender",
          "Age",
          "PIN code",
          "Credit/Debit card details",
          "Medical records and history",
          "Sexual orientation",
          "Biometric data",
          "Password",
          "Occupation and interests",
        ],
      },
      {
        kind: "p",
        text: "The information you provide helps us improve our services and give you a better experience. It will only be used to maintain, protect, and improve those services.",
      },
    ],
  },
  {
    title: "Cookies",
    blocks: [
      {
        kind: "p",
        text: "To enhance user experience, we may use cookies or similar tools to collect information. Cookies are small files assigned to your device to uniquely identify your user session and provide personalized content.",
      },
      {
        kind: "p",
        text: "Cookies do not collect personal data unless you voluntarily provide it (for example, during registration).",
      },
    ],
  },
  {
    title: "Links to Other Sites",
    blocks: [
      {
        kind: "p",
        text: "Our website may contain links to third-party websites. These sites operate independently of us, and we are not responsible for their privacy practices.",
      },
    ],
  },
  {
    title: "Information Sharing",
    blocks: [
      {
        kind: "p",
        text: "We do not share sensitive personal information with third parties without your consent, except in the following situations: when required by law or government authorities.",
      },
    ],
  },
  {
    title: "Information Security",
    blocks: [
      {
        kind: "p",
        text: "We take security seriously and implement appropriate measures to protect your data from unauthorized access, alteration, or disclosure.",
      },
    ],
  },
  {
    title: "Changes to the Privacy Policy",
    blocks: [
      {
        kind: "p",
        text: "We may update this Privacy Policy as the internet and regulations evolve. Any changes will not affect the use of information collected under the prior policy.",
      },
    ],
  },
  {
    title: "Grievance Redressal",
    blocks: [
      {
        kind: "p",
        text: "If you have any complaints or concerns regarding the handling of your data, please reach out to our designated Grievance Officer.",
      },
      {
        kind: "contact",
        name: "Mrs. Honey",
        company: "Unlink Technologies Private Limited",
        email: "hr@unlink-technologies.com",
        phone: "+91-9650583832",
      },
    ],
  },
];

function renderBlock(block: Block, i: number) {
  if (block.kind === "list") {
    return (
      <ul
        key={i}
        className={
          block.cols === 2
            ? "mt-4 grid gap-2.5 sm:grid-cols-2"
            : "mt-4 space-y-2.5"
        }
      >
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
          >
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (block.kind === "contact") {
    return (
      <div key={i} className={`mt-5 rounded-2xl bg-background p-6 ${inset}`}>
        <p className="text-sm text-foreground">
          <span className="font-semibold">Grievance Officer:</span> {block.name}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{block.company}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Email:{" "}
          <a
            href={`mailto:${block.email}`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {block.email}
          </a>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Phone:{" "}
          <a
            href={`tel:${block.phone.replace(/[^+\d]/g, "")}`}
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {block.phone}
          </a>
        </p>
      </div>
    );
  }
  return (
    <p key={i} className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
      {block.text}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Unlink Technologies collects, uses, stores, and protects your information."
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <div className={`rounded-3xl bg-background p-8 sm:p-10 ${raised}`}>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Last updated: 9 July 2026
            </p>
            <div className="mt-5 space-y-4">
              {intro.map((p) => (
                <p
                  key={p}
                  className="text-base leading-relaxed text-foreground/90"
                >
                  {p}
                </p>
              ))}
            </div>

            {sections.map((section) => (
              <section
                key={section.title}
                className="mt-10 border-t border-border/60 pt-8"
              >
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {section.title}
                </h2>
                {section.blocks.map(renderBlock)}
              </section>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
