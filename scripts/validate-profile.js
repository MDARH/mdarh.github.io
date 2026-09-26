const fs = require('fs')
const path = require('path')

const profilePath = path.join(__dirname, '..', 'profile.json')
const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'))

const requiredRoot = ['name', 'title', 'bio', 'email', 'links', 'skills', 'projects']
const statuses = new Set(['live', 'in-progress', 'planned'])

function fail(msg) {
  console.error('profile.json validation failed:', msg)
  process.exit(1)
}

for (const key of requiredRoot) {
  if (!(key in profile)) fail(`missing root field "${key}"`)
}
if (profile.links?.github == null) fail('links.github is required')
if (!Array.isArray(profile.skills)) fail('skills must be an array')
if (!Array.isArray(profile.projects)) fail('projects must be an array')

for (const [i, s] of profile.skills.entries()) {
  for (const f of ['name', 'category', 'level']) {
    if (!(f in s)) fail(`skills[${i}] missing "${f}"`)
  }
  if (typeof s.level !== 'number' || s.level < 0 || s.level > 100) {
    fail(`skills[${i}].level must be 0-100`)
  }
}

for (const [i, p] of profile.projects.entries()) {
  for (const f of [
    'name',
    'description',
    'tech',
    'repo_url',
    'live_url',
    'private',
    'status',
    'featured',
    'visible',
    'image'
  ]) {
    if (!(f in p)) fail(`projects[${i}] missing "${f}"`)
  }
  if (!statuses.has(p.status)) fail(`projects[${i}].status invalid`)
  if (p.private && p.repo_url != null) {
    fail(`projects[${i}] "${p.name}": private projects must have repo_url null`)
  }
}

if (profile.certifications != null) {
  if (!Array.isArray(profile.certifications)) fail('certifications must be an array when present')
  for (const [i, c] of profile.certifications.entries()) {
    for (const f of [
      'name',
      'issuer',
      'description',
      'skills',
      'credential_id',
      'batch',
      'issued',
      'image_url',
      'file_url',
      'featured',
      'visible'
    ]) {
      if (!(f in c)) fail(`certifications[${i}] missing "${f}"`)
    }
    if (c.issued !== null && typeof c.issued !== 'string') {
      fail(`certifications[${i}].issued must be null or an ISO date string`)
    }
  }
}

const certCount = profile.certifications?.length ?? 0
console.log(
  `profile.json OK (${profile.projects.length} projects, ${profile.skills.length} skills, ${certCount} certifications)`
)
