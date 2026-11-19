// Parses an Iris submission issue (from .github/ISSUE_TEMPLATE/submit-project.yml)
// and upserts it into data/projects.json. Used by .github/workflows/add-project.yml.
'use strict';

const fs = require('fs');
const path = require('path');

const FIELDS = {
  'Project title': 'title',
  'Description': 'description',
  'Designer(s)': 'designer',
  'Team / product area': 'team',
  'Type': 'type',
  'Status': 'status',
  'Figma link': 'figma',
  'Prototype / live link': 'prototype',
  'Source code link': 'repo',
  'Cover image': 'thumbnail',
  'Tags': 'tags',
};
const MAX_LEN = { title: 120, description: 4000, designer: 120, team: 80, type: 40, status: 40, tags: 300 };

function parseIssueBody(body) {
  const out = {};
  const sections = String(body || '').replace(/\r\n/g, '\n').split(/^###\s+/m).slice(1);
  for (const section of sections) {
    const nl = section.indexOf('\n');
    const label = (nl === -1 ? section : section.slice(0, nl)).trim();
    const key = FIELDS[label];
    if (!key) continue;
    let value = nl === -1 ? '' : section.slice(nl + 1).trim();
    if (value === '_No response_' || value === 'None') value = '';
    out[key] = value;
  }
  return out;
}

function cleanUrl(value) {
  if (!value) return '';
  const match = String(value).match(/https?:\/\/[^\s)<>"']+/);
  if (!match) return '';
  try {
    const url = new URL(match[0]);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'project';
}

function clip(key, v) {
  const s = String(v || '').trim();
  return MAX_LEN[key] ? s.slice(0, MAX_LEN[key]) : s;
}

function toProject(issue) {
  const f = parseIssueBody(issue.body);
  const title = clip('title', f.title || String(issue.title || '').replace(/^\[Iris\]\s*/i, ''));
  if (!title) throw new Error('Missing "Project title".');
  return {
    id: `${slugify(title)}-${issue.number}`,
    title,
    description: clip('description', f.description),
    designer: clip('designer', f.designer) || (issue.user && issue.user.login) || 'Unknown',
    team: clip('team', f.team),
    type: slugify(clip('type', f.type) || 'other'),
    status: clip('status', f.status),
    figma: cleanUrl(f.figma),
    prototype: cleanUrl(f.prototype),
    repo: cleanUrl(f.repo),
    thumbnail: cleanUrl(f.thumbnail),
    tags: clip('tags', f.tags).split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 10),
    createdAt: issue.created_at || new Date().toISOString(),
    issue: issue.html_url || '',
  };
}

function upsert(file, project) {
  const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  const idx = list.findIndex((p) => p.issue && p.issue === project.issue);
  if (idx >= 0) list[idx] = project; else list.push(project);
  fs.writeFileSync(file, JSON.stringify(list, null, 2) + '\n');
  return idx >= 0 ? 'updated' : 'added';
}

// Entry point for actions/github-script
module.exports = async ({ context }) => {
  const issue = context.payload.issue;
  const project = toProject(issue);
  const file = path.join(process.env.GITHUB_WORKSPACE || process.cwd(), 'data', 'projects.json');
  const action = upsert(file, project);
  return { action, id: project.id, title: project.title };
};

module.exports.parseIssueBody = parseIssueBody;
module.exports.toProject = toProject;
module.exports.upsert = upsert;
