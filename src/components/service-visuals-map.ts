import type { ComponentType } from "react";
import {
  AiVisual,
  ComplianceVisual,
  MobileVisual,
  PlatformVisual,
  WorkflowVisual,
  type VisualProps,
} from "@/components/service-visuals";

/**
 * Visual for each service slug, for layouts that iterate the service list.
 *
 * Held here rather than in service-visuals.tsx for the same reason as the
 * product map: that module is "use client", so a server component importing
 * this record from it would get an opaque client reference and index it to
 * undefined. See product-visuals-map.ts.
 */
export const serviceVisuals: Record<string, ComponentType<VisualProps>> = {
  "fintech-platform-engineering": PlatformVisual,
  "ai-ml-product-development": AiVisual,
  "enterprise-workflow-onboarding": WorkflowVisual,
  "regulatory-compliance-technology": ComplianceVisual,
  "mobile-field-commerce": MobileVisual,
};
