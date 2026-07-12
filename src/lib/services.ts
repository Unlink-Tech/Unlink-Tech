import {
  BrainCircuit,
  ClipboardCheck,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  overview: string;
  whatWeBuild: string[];
  platformCapabilities: string[];
  proof: { figure: string; label: string }[];
  approach: { title: string; text: string }[];
  signature: string;
};

export const services: Service[] = [
  {
    slug: "fintech-platform-engineering",
    name: "Fintech Platform Engineering",
    tagline:
      "Payment gateways, settlement engines, and merchant platforms, built for regulated environments and high-volume scale.",
    icon: Server,
    overview:
      "When you accept and move money at scale, standing up a gateway is the easy part. Surviving the traffic spike, the PCI-DSS audit, and the reconciliation dispute is the hard part. We design payment and settlement infrastructure for regulated environments where a dropped transaction or a missed cent is not an option, and where the architecture has to hold under both real volume and a real examiner.",
    whatWeBuild: [
      "Payment Gateways",
      "Settlement & Reconciliation Engines",
      "Merchant Management Platforms",
      "Payment Switching & Routing Systems",
      "Multi-Currency Payment Platforms",
      "Digital Wallet & QR Payment Solutions",
      "Payment APIs & SDKs",
      "Transaction Monitoring Systems",
      "Recurring Billing & Subscription Platforms",
      "Financial Reporting & Analytics",
    ],
    platformCapabilities: [
      "PCI-DSS Compliant Architecture",
      "High-Availability & Disaster Recovery",
      "Multi-Currency Processing",
      "Real-Time Settlement",
      "Secure Tokenization",
      "API-First Architecture",
      "Horizontal Scalability",
      "Smart Transaction Routing",
      "Audit Logs & Compliance Reporting",
      "99.99% Uptime Infrastructure",
    ],
    proof: [
      { figure: "10,000+ TPS", label: "Peak throughput" },
      { figure: "99.99%", label: "Uptime with failover & DR" },
      { figure: "100%", label: "Reconciliation on $50M+ daily" },
      { figure: "40+", label: "Currencies in production" },
      { figure: "PCI-DSS L1", label: "Payment-security scope" },
    ],
    approach: [
      {
        title: "Idempotent transaction ledger",
        text: "Exactly-once writes, so an acquirer timeout and a client retry never double-charge.",
      },
      {
        title: "Per-acquirer failover & routing",
        text: "Circuit breakers and cost / success-rate routing keep acceptance up when one processor degrades.",
      },
      {
        title: "Reconciliation-first design",
        text: "Every money movement is event-sourced and matchable; reconciliation is built in, not bolted on.",
      },
      {
        title: "Scale that survives the spike",
        text: "Stateless gateways behind a durable queue absorb 10× bursts without dropping a transaction.",
      },
    ],
    signature:
      "We know the architecture decision that determines whether a gateway survives 10× traffic, because we have made it.",
  },
  {
    slug: "ai-ml-product-development",
    name: "AI & ML Product Development",
    tagline:
      "Fraud detection, anomaly detection, and risk scoring, with model governance and explainability from day one.",
    icon: BrainCircuit,
    overview:
      "Production AI in fintech has to do two things at once: catch what matters in real time, and prove every decision to a regulator. We build fraud, risk, and anomaly systems that survive both the traffic and the audit: engineered for latency, governance, and explainability from the first commit, not retrofitted after a proof of concept.",
    whatWeBuild: [
      "Fraud Detection Platforms",
      "Risk Scoring Engines",
      "AML Monitoring Systems",
      "Transaction Anomaly Detection",
      "Predictive Analytics Platforms",
      "AI Decision Support Systems",
      "Customer Intelligence Platforms",
      "Recommendation Engines",
      "Intelligent Document Processing",
      "Custom Machine Learning Solutions",
    ],
    platformCapabilities: [
      "Real-Time AI Inference",
      "Explainable AI (XAI)",
      "Model Governance",
      "Auto-Retraining Pipelines",
      "MLOps Deployment",
      "Low-Latency Prediction APIs",
      "Feature Engineering Pipelines",
      "AI Model Monitoring",
      "Regulatory AI Compliance",
      "Cloud-Native ML Infrastructure",
    ],
    proof: [
      { figure: "98.7%", label: "Fraud detection rate" },
      { figure: "−60%", label: "False positives vs rules" },
      { figure: "<50ms", label: "Scoring latency" },
      { figure: "MAS FEAT", label: "Explainability compliant" },
    ],
    approach: [
      {
        title: "Explainability by design",
        text: "Per-decision reason codes captured at inference, not reconstructed after the fact.",
      },
      {
        title: "Shadow before switch",
        text: "New models run against the incumbent rules engine in production before they ever decide.",
      },
      {
        title: "Latency as a constraint",
        text: "A sub-50ms scoring budget shapes the feature store and model choice from the start.",
      },
      {
        title: "Governance, not afterthought",
        text: "Versioning, monitoring, and drift detection wired in so the system stays auditable.",
      },
    ],
    signature: "Not a proof of concept. Production AI that survives a regulatory audit.",
  },
  {
    slug: "enterprise-workflow-onboarding",
    name: "Enterprise Workflow & Onboarding Systems",
    tagline:
      "KYC/KYB automation, approval workflows, and ERP systems for regulated industries, where a workflow error is a compliance event.",
    icon: ClipboardCheck,
    overview:
      "In regulated operations, a workflow mistake is not an inconvenience. It is a compliance event with a paper trail. We automate onboarding and approval workflows that move fast and stay defensible: clearing the routine majority automatically, routing genuine edge cases to a reviewer with full context, and writing an evidence trail for every decision.",
    whatWeBuild: [
      "Digital KYC Platforms",
      "KYB Verification Systems",
      "Merchant Onboarding Portals",
      "Customer Onboarding Platforms",
      "Approval Workflow Automation",
      "Case Management Systems",
      "Document Verification Platforms",
      "Enterprise ERP Solutions",
      "Compliance Workflow Systems",
      "Internal Operations Portals",
    ],
    platformCapabilities: [
      "Workflow Automation",
      "Multi-Level Approval Processes",
      "Role-Based Access Control",
      "Digital Document Management",
      "Electronic Signatures",
      "Audit Trail Management",
      "Third-Party API Integrations",
      "Process Monitoring Dashboards",
      "Business Rules Engine",
      "Low-Code Workflow Configuration",
    ],
    proof: [
      { figure: "40 → 4", label: "Manual decisions per day" },
      { figure: "95%", label: "Cases auto-handled" },
      { figure: "−70%", label: "Onboarding time" },
      { figure: "Same day", label: "Merchant go-live" },
    ],
    approach: [
      {
        title: "Tiered automation",
        text: "Auto-clear the low-risk majority; route only genuine edge cases to a human.",
      },
      {
        title: "Context for the reviewer",
        text: "When a case needs judgment, the reviewer sees everything: no tab-hopping.",
      },
      {
        title: "Evidence for every decision",
        text: "Each outcome writes an immutable trail an examiner can follow.",
      },
      {
        title: "Built for jurisdictions",
        text: "KYC/KYB rules differ by market; the engine is configured per regime, not hard-coded.",
      },
    ],
    signature:
      "Where a workflow error is a compliance event, the audit trail is the product.",
  },
  {
    slug: "regulatory-compliance-technology",
    name: "Regulatory Compliance Technology (MAS TRM & Beyond)",
    tagline:
      "Gap assessment, implementation, and ongoing posture management across MAS TRM, RBI, SAMA, and CBUAE.",
    icon: ShieldCheck,
    overview:
      "Compliance is not a policy binder. It is a working control set that an examiner tests. We reach and hold defensible posture across the region's major regimes, because we have implemented these controls in a live regulated environment and watched them be tested. Findings close through engineering change, which is exactly why they stay closed.",
    whatWeBuild: [
      "Compliance Management Platforms",
      "MAS TRM Compliance Solutions",
      "Risk Assessment Systems",
      "Security Governance Platforms",
      "Cyber Hygiene Monitoring",
      "Compliance Audit Dashboards",
      "Policy Management Systems",
      "Regulatory Reporting Platforms",
      "Vendor Risk Management Solutions",
      "Security Control Management Systems",
    ],
    platformCapabilities: [
      "Continuous Compliance Monitoring",
      "Automated Risk Assessments",
      "Control Effectiveness Tracking",
      "Audit-Ready Reporting",
      "Policy Lifecycle Management",
      "Security Gap Analysis",
      "Compliance Dashboards",
      "Incident & Exception Management",
      "Multi-Regulation Support",
      "Evidence Collection & Documentation",
    ],
    proof: [
      { figure: "100%", label: "Compliance posture achieved" },
      { figure: "−85%", label: "Open TRM findings" },
      { figure: "Board-ready", label: "Attestation reporting" },
      { figure: "Quarterly", label: "Retainer on the compliance calendar" },
    ],
    approach: [
      {
        title: "Controls mapped to live systems",
        text: "Every control ties to a real system and its evidence, not a document.",
      },
      {
        title: "Implementation, not paperwork",
        text: "Findings close through engineering change, which is why they stay closed.",
      },
      {
        title: "The examiner's-eye view",
        text: "We prioritize what examiners test first, because we have been in the room.",
      },
      {
        title: "Posture on a calendar",
        text: "A quarterly retainer keeps posture aligned to the compliance cycle.",
      },
    ],
    signature:
      "We know what examiners actually check, because we have watched these controls be tested.",
  },
  {
    slug: "mobile-field-commerce",
    name: "Mobile & Field Commerce Platforms",
    tagline:
      "Consumer-grade mobile payment acceptance for field conditions: offline-first, QR and NFC, iOS and Android from one codebase.",
    icon: Smartphone,
    overview:
      "In the field, connectivity is not guaranteed, but transaction integrity has to be. We build mobile commerce platforms that keep taking payments when the network drops and never lose a transaction to it: offline-first as the primary design, deterministic sync when the connection returns, and a consumer-grade experience for merchants who are not sitting at a desk.",
    whatWeBuild: [
      "Mobile Payment Applications",
      "Merchant POS Applications",
      "Offline Payment Solutions",
      "QR Payment Platforms",
      "NFC Payment Applications",
      "Field Sales Applications",
      "Digital Wallet Solutions",
      "Merchant Management Apps",
      "Mobile Ordering Systems",
      "Cross-Platform Business Applications",
    ],
    platformCapabilities: [
      "Offline-First Architecture",
      "Cross-Platform Development",
      "QR & NFC Payments",
      "Secure Mobile Authentication",
      "Real-Time Synchronization",
      "Device Management",
      "Push Notifications",
      "Location-Based Services",
      "Mobile Analytics",
      "Enterprise-Grade Security",
    ],
    proof: [
      { figure: "4.8★", label: "App-store rating" },
      { figure: "1M+", label: "Production transactions" },
      { figure: "Zero", label: "Integrity loss on drops" },
      { figure: "1 codebase", label: "iOS + Android" },
    ],
    approach: [
      {
        title: "Offline as the primary path",
        text: "The happy path assumes no network; connectivity is an optimization, not a requirement.",
      },
      {
        title: "Idempotent replay",
        text: "Queued transactions sync deterministically with exactly-once semantics.",
      },
      {
        title: "One core, two platforms",
        text: "A shared cross-platform core keeps iOS and Android in lockstep.",
      },
      {
        title: "Consumer-grade in the field",
        text: "A 4.8-star experience for merchants who are not sitting at a desk.",
      },
    ],
    signature:
      "Handling connectivity loss without transaction-integrity failure, a million times over.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
