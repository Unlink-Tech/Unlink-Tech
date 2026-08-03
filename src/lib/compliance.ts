/**
 * What we have actually been audited against, and what we merely build to.
 *
 * Held here rather than inside a component because more than one section states
 * this now: the compliance bar under the hero and the proof band below the
 * services. Two copies of this list is how a site ends up claiming ISO 27001 in
 * one place and "aligned to ISO 27001" in another, on the same page, to a buyer
 * whose job is to notice exactly that.
 *
 * The split is the point, and it is not cosmetic. Fintech buyers verify, so a
 * single overstated badge costs more trust than the whole list earns.
 */

/**
 * Audited or reviewed against, with evidence we can produce on request.
 *
 * VERIFY BEFORE LAUNCH: everything here reads as a claim a buyer can ask us to
 * substantiate. Anything we cannot produce evidence for belongs in `alignedTo`.
 */
export const held = ["PCI-DSS Level 1", "SOC 2", "Bank security review-ready"];

/**
 * Built and operated to, but not certified.
 *
 * MAS TRM, FEAT and the central-bank regimes are supervisory frameworks rather
 * than certificates, so they sit here permanently: there is no such thing as
 * being "certified in MAS TRM", and claiming to have cleared one is the kind of
 * error an examiner-facing buyer spots immediately.
 *
 * ISO 27001 moves up to `held` on the day the certificate is issued, and not
 * before.
 */
export const alignedTo = [
  "ISO 27001",
  "MAS TRM",
  "MAS FEAT",
  "RBI",
  "SAMA",
  "CBUAE",
];
