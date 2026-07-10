import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that govern your use of the Unlink Technologies website.",
};

const raised =
  "shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)]";

const intro =
  "Welcome to Unlink Technologies! By accessing or using our website, you agree to the following terms and conditions. Please read them carefully, as they govern your use of our services. If you do not agree with these terms, we request that you discontinue using our website. Unlink Technologies Private Limited (hereby called Unlink Technologies) reserves the right to update or modify these terms at any time, so we encourage you to review this page regularly.";

type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] };

const sections: { title: string; blocks: Block[] }[] = [
  {
    title: "Ownership and Use of Content",
    blocks: [
      {
        kind: "p",
        text: "All logos, designs, trademarks, and other content on this website are either owned by Unlink Technologies or used with permission. While you're free to browse and view this content, any commercial use, modification, copying, or distribution of it without our written consent is prohibited.",
      },
    ],
  },
  {
    title: "Acceptable Use",
    blocks: [
      {
        kind: "p",
        text: "We aim to maintain a safe and secure experience for all users. As a user, you agree to follow these rules:",
      },
      { kind: "h3", text: "Security Rules" },
      {
        kind: "p",
        text: "You are prohibited from attempting to compromise the security of the website. This includes, but is not limited to:",
      },
      {
        kind: "list",
        items: [
          "Accessing data or logging into accounts that you are not authorized to access.",
          "Attempting to probe, scan, or test the website's security measures without authorization.",
          "Disrupting the website's functionality through actions like sending viruses, overloading the server, or any other malicious activity.",
          "Sending unsolicited promotional emails or advertisements (spam) using our website.",
        ],
      },
      {
        kind: "p",
        text: "Violations of the website's security may lead to legal action. We will fully cooperate with law enforcement agencies to investigate and prosecute offenders.",
      },
      { kind: "h3", text: "General Conduct" },
      { kind: "p", text: "When using our website, you agree not to:" },
      {
        kind: "list",
        items: [
          "Post or share any content that is illegal, abusive, defamatory, obscene, or otherwise harmful.",
          "Violate intellectual property rights, such as copyrights or trademarks, or privacy rights of others.",
          "Use the website to promote criminal activities or violate any applicable laws.",
        ],
      },
      { kind: "h3", text: "Unauthorized Email Use" },
      {
        kind: "p",
        text: "You may not use the website to send unsolicited emails or spam, including promotions or advertisements, without the prior consent of Unlink Technologies.",
      },
    ],
  },
  {
    title: "Third-Party Liability",
    blocks: [
      {
        kind: "p",
        text: "Unlink Technologies is not responsible for the conduct, statements, or actions of third-party service providers or users. While we aim to provide a secure platform, we cannot be held accountable for any damages or issues arising from third-party interactions or content.",
      },
    ],
  },
  {
    title: "Indemnity",
    blocks: [
      {
        kind: "p",
        text: "You agree to indemnify and hold Unlink Technologies, its officers, employees, and partners harmless from any claims, damages, liabilities, or expenses that arise due to your use of the website or violation of these terms.",
      },
    ],
  },
  {
    title: "Limitation of Liability",
    blocks: [
      {
        kind: "p",
        text: "Unlink Technologies strives to provide a reliable and secure service, but we cannot guarantee that the website will always be free of errors, disruptions, or vulnerabilities. By using our services, you agree that:",
      },
      {
        kind: "list",
        items: [
          "Unlink Technologies will not be held responsible for any direct or indirect damages resulting from your use of the website, including but not limited to data loss, loss of profits, or hardware damage.",
          "Our liability for any claims related to the use of our services is limited to the amount you paid, if any, for those services.",
        ],
      },
    ],
  },
  {
    title: "No Guarantee of Uninterrupted Service",
    blocks: [
      {
        kind: "p",
        text: "We make every effort to maintain our services, but we do not guarantee uninterrupted access. There may be times when we need to temporarily suspend or terminate services, either for maintenance or due to unforeseen issues. In such cases, Unlink Technologies will not be liable for any loss or inconvenience caused.",
      },
    ],
  },
  {
    title: "Changes to These Terms",
    blocks: [
      {
        kind: "p",
        text: "Unlink Technologies reserves the right to revise these Terms and Conditions at any time. Continued use of the website after any changes implies your acceptance of the updated terms. We will do our best to inform users of significant changes, but it is your responsibility to periodically review these Terms and Conditions.",
      },
    ],
  },
];

function renderBlock(block: Block, i: number) {
  if (block.kind === "h3") {
    return (
      <h3 key={i} className="mt-6 text-lg font-semibold text-foreground">
        {block.text}
      </h3>
    );
  }
  if (block.kind === "list") {
    return (
      <ul key={i} className="mt-4 space-y-2.5">
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
  return (
    <p key={i} className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
      {block.text}
    </p>
  );
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully — by accessing or using the Unlink Technologies website, you agree to them."
      />

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <div className={`rounded-3xl bg-background p-8 sm:p-10 ${raised}`}>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Last updated: 9 July 2026
            </p>
            <p className="mt-5 text-base leading-relaxed text-foreground/90">
              {intro}
            </p>

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
