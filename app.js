const form = document.getElementById('planner-form');
const result = document.getElementById('result');
const matrixContainer = document.getElementById('matrix');
const timelineContainer = document.getElementById('timeline');
const summaryTitle = document.getElementById('summary-title');
const summarySubtitle = document.getElementById('summary-subtitle');
const template = document.getElementById('task-card-template');

const quadrants = [
  {
    key: 'q1',
    label: 'Do first (Urgent + Important)',
    desc: 'Critical deadlines and must-do legal items.',
  },
  {
    key: 'q2',
    label: 'Schedule (Important, less urgent)',
    desc: 'High impact planning tasks.',
  },
  {
    key: 'q3',
    label: 'Delegate / automate (Urgent, less important)',
    desc: 'Fast admin tasks; automate where possible.',
  },
  {
    key: 'q4',
    label: 'Limit / optional (Lower urgency + impact)',
    desc: 'Nice-to-have if time allows.',
  },
];

const taskTemplates = [
  {
    id: 'visa-check',
    title: 'Verify visa and entry eligibility',
    description: 'Confirm visa type, entry rules, and required documents for your passport.',
    stage: 'leave-origin',
    when: 'pre14',
    urgency: 5,
    importance: 5,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'travel-insurance',
    title: 'Buy travel or relocation insurance',
    description: 'Cover emergency care, trip changes, and liability based on your purpose.',
    stage: 'leave-origin',
    when: 'pre7',
    urgency: 4,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'copy-docs',
    title: 'Digitize key documents',
    description: 'Store passport, visa, IDs, and contracts securely in cloud backup.',
    stage: 'leave-origin',
    when: 'pre7',
    urgency: 3,
    importance: 5,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'notify-banks',
    title: 'Notify banks and set spending controls',
    description: 'Enable international usage and prevent transaction blocks.',
    stage: 'leave-origin',
    when: 'pre3',
    urgency: 4,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
    bundles: ['banking'],
  },
  {
    id: 'pet-permit',
    title: 'Prepare pet entry paperwork',
    description: 'Arrange vaccinations, certificates, and import permits for pets.',
    stage: 'leave-origin',
    when: 'pre14',
    urgency: 5,
    importance: 5,
    purpose: ['work', 'study', 'move', 'tourism'],
    bundles: ['pets'],
  },
  {
    id: 'medication',
    title: 'Carry medication letter and refill plan',
    description: 'Bring prescriptions and doctor letter for customs and local refill support.',
    stage: 'leave-origin',
    when: 'pre7',
    urgency: 4,
    importance: 5,
    purpose: ['tourism', 'work', 'study', 'move'],
    bundles: ['medication'],
  },
  {
    id: 'arrival-sim',
    title: 'Get local SIM/eSIM and data plan',
    description: 'Set communication on day one for maps, banking, and emergency contacts.',
    stage: 'arrive-destination',
    when: 'day1',
    urgency: 5,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'arrival-register',
    title: 'Complete local address/arrival registration',
    description: 'Finish legal registration obligations required by local authorities.',
    stage: 'arrive-destination',
    when: 'day1',
    urgency: 5,
    importance: 5,
    purpose: ['work', 'study', 'move'],
  },
  {
    id: 'transport-card',
    title: 'Set up transit card and airport-to-home route',
    description: 'Secure local mobility to avoid day-one disruption.',
    stage: 'arrive-destination',
    when: 'day1',
    urgency: 4,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'housing-checkin',
    title: 'Confirm housing check-in and utility access',
    description: 'Collect keys, inspect conditions, and activate essential services.',
    stage: 'arrive-destination',
    when: 'day2',
    urgency: 4,
    importance: 5,
    purpose: ['work', 'study', 'move'],
    bundles: ['housing'],
  },
  {
    id: 'tax-id',
    title: 'Apply for tax ID / social number',
    description: 'Needed for payroll, banking, healthcare, and contracts in many countries.',
    stage: 'arrive-destination',
    when: 'week1',
    urgency: 4,
    importance: 5,
    purpose: ['work', 'study', 'move'],
  },
  {
    id: 'bank-account',
    title: 'Open local bank account',
    description: 'Set salary deposits, recurring payments, and daily spending.',
    stage: 'arrive-destination',
    when: 'week1',
    urgency: 3,
    importance: 5,
    purpose: ['work', 'study', 'move'],
    bundles: ['banking'],
  },
  {
    id: 'driving-license',
    title: 'Check local driving permit conversion',
    description: 'Confirm if you need an IDP, translation, or local test.',
    stage: 'arrive-destination',
    when: 'week1',
    urgency: 3,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
    bundles: ['driving'],
  },
  {
    id: 'family-school',
    title: 'Enroll dependents in school/childcare',
    description: 'Finalize required records, local address proof, and enrollment dates.',
    stage: 'arrive-destination',
    when: 'week2',
    urgency: 4,
    importance: 5,
    purpose: ['work', 'study', 'move'],
    bundles: ['family'],
  },
  {
    id: 'build-routine',
    title: 'Create local routine (groceries, clinic, emergency contacts)',
    description: 'Reduce risk and improve daily stability in the first weeks.',
    stage: 'settle',
    when: 'week2',
    urgency: 2,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'work-compliance',
    title: 'Confirm work compliance and payroll setup',
    description: 'Validate contract, tax withholding, and labor requirements.',
    stage: 'settle',
    when: 'week2',
    urgency: 4,
    importance: 5,
    purpose: ['work', 'move'],
  },
  {
    id: 'return-exit-rules',
    title: 'Review exit rules and overstay limits',
    description: 'Check departure documents, overstays, and final obligations.',
    stage: 'leave-destination',
    when: 'beforeExit7',
    urgency: 4,
    importance: 5,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
  {
    id: 'close-bills',
    title: 'Close local bills/subscriptions',
    description: 'Terminate utilities, rental obligations, and recurring charges.',
    stage: 'leave-destination',
    when: 'beforeExit7',
    urgency: 4,
    importance: 4,
    purpose: ['work', 'study', 'move'],
  },
  {
    id: 'pack-customs',
    title: 'Pack with customs declaration plan',
    description: 'Separate restricted goods, receipts, and high-value items.',
    stage: 'leave-destination',
    when: 'beforeExit2',
    urgency: 4,
    importance: 3,
    purpose: ['tourism', 'work', 'study', 'move'],
    bundles: ['high-value'],
  },
  {
    id: 'final-day',
    title: 'Final departure checklist',
    description: 'Airport timing, transport booking, keys return, and records backup.',
    stage: 'leave-destination',
    when: 'departure',
    urgency: 5,
    importance: 4,
    purpose: ['tourism', 'work', 'study', 'move'],
  },
];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const country = document.getElementById('country').value.trim();
  const days = Number(document.getElementById('days').value);
  const nationality = document.getElementById('nationality').value.trim();
  const age = Number(document.getElementById('age').value);
  const purpose = document.getElementById('purpose').value;
  const bundleValues = Array.from(form.querySelectorAll('.bundle-grid input:checked')).map((i) => i.value);

  const plan = buildPlan({ country, days, purpose, bundles: new Set(bundleValues), age, nationality });
  renderPlan(plan, { country, days, purpose, age, nationality });
  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function buildPlan({ country, days, purpose, bundles, age, nationality }) {
  const filtered = taskTemplates
    .filter((task) => task.purpose.includes(purpose))
    .filter((task) => !task.bundles || task.bundles.some((bundle) => bundles.has(bundle)))
    .map((task) => {
      const day = mapDay(task.when, days, purpose);
      const quadrant = pickQuadrant(task.urgency, task.importance);
      const priority = task.importance * 2 + task.urgency + urgencyBonus(day);
      return {
        ...task,
        day,
        country,
        quadrant,
        priority,
      };
    })
    .sort((a, b) => b.priority - a.priority);

  if (Number.isFinite(age) && age < 18) {
    filtered.unshift({
      id: 'guardian-docs',
      title: 'Prepare guardian consent and minor travel documents',
      description:
        'Carry notarized parental/guardian consent and destination-specific entry forms for minors.',
      stage: 'leave-origin',
      when: 'pre14',
      urgency: 5,
      importance: 5,
      day: mapDay('pre14', days, purpose),
      country,
      quadrant: 'q1',
      priority: 99,
    });
  }

  if (nationality) {
    filtered.unshift({
      id: 'passport-rules',
      title: `Check ${nationality} passport validity and entry rules`,
      description:
        'Verify minimum passport validity, visa waivers, and any nationality-specific arrival paperwork.',
      stage: 'leave-origin',
      when: 'pre14',
      urgency: 5,
      importance: 5,
      day: mapDay('pre14', days, purpose),
      country,
      quadrant: 'q1',
      priority: 98,
    });
  }

  return {
    tasks: filtered,
    timeline: groupByTimelineDay(filtered),
  };
}

function mapDay(when, days, purpose) {
  const day1 = 1;
  const cap = Math.max(2, days);

  const preLead = Math.min(21, Math.max(7, Math.ceil(days * 0.3)));

  switch (when) {
    case 'pre14':
      return -Math.max(14, preLead);
    case 'pre7':
      return -7;
    case 'pre3':
      return -3;
    case 'day1':
      return day1;
    case 'day2':
      return Math.min(2, cap);
    case 'week1':
      return Math.min(7, cap);
    case 'week2':
      return purpose === 'move' ? Math.min(14, cap) : Math.min(Math.max(3, Math.ceil(days * 0.4)), cap);
    case 'beforeExit7':
      return Math.max(1, cap - 7);
    case 'beforeExit2':
      return Math.max(1, cap - 2);
    case 'departure':
      return cap;
    default:
      return Math.max(1, Math.ceil(days / 2));
  }
}

function pickQuadrant(urgency, importance) {
  if (urgency >= 4 && importance >= 4) return 'q1';
  if (urgency <= 3 && importance >= 4) return 'q2';
  if (urgency >= 4 && importance <= 3) return 'q3';
  return 'q4';
}

function urgencyBonus(day) {
  if (day <= 1) return 3;
  if (day <= 3) return 2;
  if (day <= 7) return 1;
  return 0;
}

function groupByTimelineDay(tasks) {
  const groups = new Map();

  tasks.forEach((task) => {
    const label = formatDay(task.day);
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label).push(task);
  });

  return [...groups.entries()]
    .map(([label, items]) => ({
      label,
      sortKey: items[0].day,
      items: items.sort((a, b) => b.priority - a.priority),
    }))
    .sort((a, b) => a.sortKey - b.sortKey);
}

function formatDay(day) {
  if (day < 0) return `Before departure (D${day})`;
  if (day === 0) return 'Departure prep day';
  return `Day ${day}`;
}

function renderPlan(plan, context) {
  const purposeName = {
    tourism: 'tourism',
    work: 'work',
    study: 'study',
    move: 'a permanent move',
  };

  summaryTitle.textContent = `Plan for ${context.country} (${context.days} days)`;
  summarySubtitle.textContent = `Purpose: ${purposeName[context.purpose]} • Nationality: ${context.nationality} • Age: ${context.age}. The app ranks what to do first using urgency + importance and maps your exact timeline.`;

  matrixContainer.innerHTML = '';
  quadrants.forEach((q) => {
    const box = document.createElement('section');
    box.className = 'quadrant';

    const title = document.createElement('h3');
    title.textContent = q.label;
    const desc = document.createElement('p');
    desc.className = 'hint';
    desc.textContent = q.desc;

    box.appendChild(title);
    box.appendChild(desc);

    const entries = plan.tasks.filter((task) => task.quadrant === q.key).slice(0, 5);
    if (entries.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'hint';
      empty.textContent = 'No tasks in this quadrant for your profile.';
      box.appendChild(empty);
    } else {
      entries.forEach((task) => box.appendChild(renderTaskCard(task)));
    }

    matrixContainer.appendChild(box);
  });

  timelineContainer.innerHTML = '';
  plan.timeline.forEach((bucket) => {
    const wrapper = document.createElement('section');
    wrapper.className = 'day-group';

    const heading = document.createElement('h4');
    heading.className = 'day-title';
    heading.textContent = bucket.label;

    const list = document.createElement('ol');
    list.className = 'day-list';

    bucket.items.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `${task.title} <span class="priority-pill">${task.stage}</span><br><small>${task.description}</small>`;
      list.appendChild(li);
    });

    wrapper.appendChild(heading);
    wrapper.appendChild(list);
    timelineContainer.appendChild(wrapper);
  });
}

function renderTaskCard(task) {
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector('h4').textContent = task.title;
  node.querySelector('.meta').textContent = `${formatDay(task.day)} • Priority ${task.priority}`;
  node.querySelector('.desc').textContent = task.description;
  return node;
}
