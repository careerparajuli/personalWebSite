// ============================================
// SCHEMA DIAGRAM — domains pulled directly from resume "Skills" section
// ============================================

const HUB = { x: 450, y: 290, r: 44, label: 'PJ', sub: 'practice' };

const DOMAINS = [
  {
    id: 'platform',
    x: 450, y: 96, r: 66,
    label: 'Power Platform',
    sub: 'apps · automation · BI',
    desc: 'Designing and shipping enterprise applications on the Microsoft Power Platform — from canvas apps to governed Dataverse schemas.',
    skills: ['Power Apps (Canvas & Model-Driven)', 'Power Automate (Cloud Flows)', 'Power BI', 'Power Pages', 'Power Virtual Agents', 'Power Fx', 'AI Builder', 'Power Apps Component Framework (PCF)', 'Dataverse Schema Design']
  },
  {
    id: 'security',
    x: 762, y: 290, r: 66,
    label: 'SharePoint & Security',
    sub: 'access · compliance',
    desc: 'Governing who can see and do what — SharePoint architecture built to DoD security standards under an active Secret Clearance.',
    skills: ['SharePoint Online', 'SharePoint Lists & Libraries', 'SPFx', 'Role-Based Access Control (RBAC)', 'DoD Cybersecurity Compliance', 'Active Secret Clearance', 'CompTIA Security+ CE']
  },
  {
    id: 'automation',
    x: 450, y: 484, r: 66,
    label: 'Automation & Integration',
    sub: 'process · data',
    desc: 'Connecting systems and replacing manual steps with automated, auditable workflows.',
    skills: ['Business Process Automation', 'REST API Integration', 'Data Modeling', 'SQL']
  },
  {
    id: 'webdev',
    x: 138, y: 290, r: 66,
    label: 'Web & App Development',
    sub: 'full stack',
    desc: 'Full-stack build experience underlies every platform solution, from interface down to database.',
    skills: ['JavaScript (ES6+)', 'React.js', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Java', 'C++', 'R', 'Python']
  }
];

// secondary edges hinting at real cross-domain relationships (kept minimal)
const CROSS_EDGES = [
  ['platform', 'security'],   // RBAC/governance built into Power Platform apps
  ['automation', 'webdev']    // REST API integration ties automation to full-stack work
];

const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.getElementById('schemaSvg');
const edgesLayer = document.getElementById('edges');
const nodesLayer = document.getElementById('nodes');
const detailPanel = document.getElementById('schemaDetail');

function makeLine(x1, y1, x2, y2, extraClass) {
  const line = document.createElementNS(svgNS, 'path');
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  line.setAttribute('d', `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`);
  line.setAttribute('class', 'schema-edge' + (extraClass ? ' ' + extraClass : ''));
  return line;
}

function wrapLabel(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  words.forEach(w => {
    if ((current + ' ' + w).trim().length > maxChars) {
      lines.push(current.trim());
      current = w;
    } else {
      current += ' ' + w;
    }
  });
  if (current.trim()) lines.push(current.trim());
  return lines;
}

// draw hub-to-domain spokes
const edgeEls = {};
DOMAINS.forEach(d => {
  const el = makeLine(HUB.x, HUB.y, d.x, d.y);
  edgeEls[d.id] = edgeEls[d.id] || [];
  edgeEls[d.id].push(el);
  edgesLayer.appendChild(el);
});

// draw cross edges
CROSS_EDGES.forEach(([a, b]) => {
  const da = DOMAINS.find(d => d.id === a);
  const db = DOMAINS.find(d => d.id === b);
  const el = makeLine(da.x, da.y, db.x, db.y, 'cross');
  edgeEls[a].push(el);
  edgeEls[b].push(el);
  edgesLayer.appendChild(el);
});

// draw hub node
const hubGroup = document.createElementNS(svgNS, 'g');
hubGroup.setAttribute('class', 'schema-node hub');
hubGroup.innerHTML = `
  <circle cx="${HUB.x}" cy="${HUB.y}" r="${HUB.r}"></circle>
  <text x="${HUB.x}" y="${HUB.y - 2}" text-anchor="middle" font-weight="600">${HUB.label}</text>
  <text x="${HUB.x}" y="${HUB.y + 14}" text-anchor="middle" class="node-sub">${HUB.sub}</text>
`;
nodesLayer.appendChild(hubGroup);

// draw domain nodes
DOMAINS.forEach(d => {
  const g = document.createElementNS(svgNS, 'g');
  g.setAttribute('class', 'schema-node');
  g.setAttribute('data-id', d.id);
  g.setAttribute('tabindex', '0');
  g.setAttribute('role', 'button');
  g.setAttribute('aria-label', d.label);

  const lines = wrapLabel(d.label, 14);
  const lineHeight = 15;
  const startY = d.y - ((lines.length - 1) * lineHeight) / 2 - 4;

  let textEls = lines.map((line, i) =>
    `<text x="${d.x}" y="${startY + i * lineHeight}" text-anchor="middle" font-weight="600">${line}</text>`
  ).join('');

  g.innerHTML = `
    <circle cx="${d.x}" cy="${d.y}" r="${d.r}"></circle>
    ${textEls}
    <text x="${d.x}" y="${startY + lines.length * lineHeight + 4}" text-anchor="middle" class="node-sub">${d.sub}</text>
  `;

  function select() {
    document.querySelectorAll('.schema-node').forEach(n => n.classList.remove('selected'));
    document.querySelectorAll('.schema-edge').forEach(e => e.classList.remove('lit'));
    g.classList.add('selected');
    edgeEls[d.id].forEach(e => e.classList.add('lit'));
    renderDetail(d);
  }

  g.addEventListener('click', select);
  g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });

  nodesLayer.appendChild(g);
});

function renderDetail(d) {
  detailPanel.innerHTML = `
    <span class="mono eyebrow">${d.sub.toUpperCase()}</span>
    <h3>${d.label}</h3>
    <p class="schema__desc">${d.desc}</p>
    <div class="chiplist">
      ${d.skills.map(s => `<span class="chip">${s}</span>`).join('')}
    </div>
  `;
}

// select the first domain by default so the panel isn't empty on load
window.addEventListener('DOMContentLoaded', () => {
  const first = nodesLayer.querySelector('.schema-node[data-id]');
  if (first) first.dispatchEvent(new Event('click'));
});
