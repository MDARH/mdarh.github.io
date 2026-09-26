/**
 * @param {import('@profile').Certification[] | undefined} certifications
 */
export function certificationsForSite(certifications) {
  if (!certifications?.length) return []
  return [...certifications]
    .filter((c) => c.visible)
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
}
