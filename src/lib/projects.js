/** @typedef {import('@profile').Project} Project */

/**
 * @param {Project[]} projects
 * @returns {Project[]}
 */
export function projectsForSite(projects) {
  return [...projects]
    .filter((p) => p.visible)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return a.name.localeCompare(b.name)
    })
}

/**
 * @param {Project[]} projects
 * @returns {Project[]}
 */
export function featuredProjectsForSite(projects) {
  return projectsForSite(projects).filter((p) => p.featured)
}

/** @param {Project} project */
export function hasLiveUrl(project) {
  return Boolean(project.live_url)
}

/** @param {Project} project */
export function repoUrlForDisplay(project) {
  if (project.private) return null
  return project.repo_url
}

/** @param {Project} project */
export function showPrivateBadge(project) {
  return project.private && !hasLiveUrl(project)
}

/** @param {Project['status']} status */
export function statusBadgeLabel(status) {
  const labels = {
    live: 'Live',
    'in-progress': 'In progress',
    planned: 'Planned'
  }
  return labels[status] ?? status
}

/** @param {Project['status']} status */
export function statusBadgeClass(status) {
  const classes = {
    live: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'in-progress': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    planned: 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200'
  }
  return classes[status] ?? classes.planned
}

export const defaultProjectImage = './images/default-project-thumbnail.svg'

/** @param {string|null} image */
export function projectImageSrc(image) {
  return image || defaultProjectImage
}
