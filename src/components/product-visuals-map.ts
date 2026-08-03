import type { ComponentType } from "react";
import {
  CimmetriVisual,
  // EnclaveVisual, // Enclave hidden for now.
  GatewayVisual,
  OnboardingVisual,
  type VisualProps,
} from "@/components/product-visuals";

/**
 * Visual for each product slug, for layouts that iterate the product list.
 *
 * Deliberately kept out of product-visuals.tsx: that module is "use client", so
 * every one of its exports reaches a server component as an opaque client
 * reference, and `productVisuals[slug]` would come back undefined. Held here
 * instead, in a server module, the record is a plain object whose values are
 * client references, which is exactly what a server component can index and
 * render.
 */
export const productVisuals: Record<string, ComponentType<VisualProps>> = {
  cimmetri: CimmetriVisual,
  // enclave: EnclaveVisual, // Enclave hidden for now.
  "payment-gateway": GatewayVisual,
  "merchant-onboarding": OnboardingVisual,
};
