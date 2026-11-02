import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './styles.css';

type P = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  tracks: string[];
  stack: string[];
  role: string;
  system: string;
  built: string[];
  observed: string[];
  learned: string[];
  proof: string[];
  scope: string;
  signal: string;
  github?: string;
  accent: string;
};

const projects: P[] = [
  {
    slug: 'bincorp-enterprise-infrastructure',
    index: '01',
    title: 'BINCORP / ENTERPRISE INFRASTRUCTURE',
    kicker: 'network → identity → access → monitoring',
    description: 'An enterprise-style infrastructure lab that brings network segmentation, Active Directory, internal PKI, secure remote access, IDS and centralized logging into one environment.',
    tracks: ['Network Security', 'Identity', 'Infrastructure'],
    stack: ['pfSense', 'Windows Server / AD DS', 'AD CS / PKI', 'OpenVPN', 'Suricata', 'Splunk'],
    role: 'Infrastructure / Network Security',
    system: 'Network Zones → Identity → Secure Services → Telemetry',
    built: [
      'Designed WAN, Server, Client, DMZ and VPN zones with pfSense firewall rules and separate subnets.',
      'Deployed two Domain Controllers with DNS, AD Sites and Services, replication checks and domain-service redundancy validation.',
      'Implemented AD CS / Enterprise Root CA, internal HTTPS intranet, department-based file access using security groups and NTFS permissions.',
      'Configured OpenVPN with certificate-based access and least-privilege rules; deployed Suricata IDS and forwarded Windows / pfSense logs to Splunk.'
    ],
    observed: [
      'A failed domain logon generated Security Event 4625 on a Domain Controller and was searchable in Splunk.',
      'VPN authentication, proxy blocking, internal HTTPS trust and DC redundancy could each be validated through a specific test rather than assumed from configuration.'
    ],
    learned: [
      'Network segmentation and identity boundaries need to be designed together.',
      'A control is only meaningful when its expected behavior can be tested and its telemetry can be observed.'
    ],
    proof: [
      'Validated five use cases: failed-logon visibility, OpenVPN access logging, proxy web filtering, DC01 / DC02 failover, and HTTPS using an internally issued certificate.',
      'Centralized Windows Event Logs and pfSense / OpenVPN syslog in Splunk for investigation.'
    ],
    scope: 'This is a virtualized learning lab, not a production high-availability design. pfSense and Splunk are single instances; APP01 hosts multiple roles and file services do not use DFS redundancy.',
    signal: '5 VALIDATION USE CASES / 2 DOMAIN CONTROLLERS / 5 NETWORK ZONES',
    github: 'https://github.com/BinNguyen-Sec/bincorp-enterprise-infrastructure-lab',
    accent: 'blue'
  },
  {
    slug: 'soc-homelab-splunk',
    index: '02',
    title: 'SOC HOMELAB / SPLUNK',
    kicker: 'attack → telemetry → detection → alert',
    description: 'A controlled SOC lab that generates suspicious activity, centralizes host and network logs in Splunk, then turns repeated behavior into detections, alerts and dashboards.',
    tracks: ['SOC Operations', 'SIEM', 'Detection'],
    stack: ['Splunk Enterprise', 'Kali Linux', 'Nmap', 'Hydra', 'DVWA', 'SSH / Windows Logs'],
    role: 'SOC Monitoring / Detection',
    system: 'Kali → Linux / Windows → Log Ingestion → SPL → Triage',
    built: [
      'Connected Kali Linux, Linux SSH / web logs and Windows Security telemetry to Splunk for centralized analysis.',
      'Simulated network scanning with Nmap, SSH password guessing with Hydra, and SQL injection against DVWA.',
      'Created an SPL threshold search for repeated failed SSH logins, email alerting and dashboards for authentication activity.'
    ],
    observed: [
      'Repeated failed SSH logins become more actionable when grouped by source IP and a defined time window.',
      'A SIEM pipeline needs source, host and time context so an analyst can validate an alert instead of relying on a count alone.'
    ],
    learned: [
      'Detection logic should be explainable: identify the event source, grouping window, threshold and reason for escalation.',
      'An alert is a starting point for triage, not proof of a confirmed incident.'
    ],
    proof: [
      'The SPL search extracts the source IP, groups failed-password events into one-minute windows and triggers when the count exceeds five.',
      'The dashboard surfaces failed logins over time, top attacking IP addresses and suspicious authentication activity.'
    ],
    scope: 'All offensive actions were performed against controlled lab targets, including DVWA. This project demonstrates foundational SIEM monitoring and detection rather than production SOC operations.',
    signal: 'SPL THRESHOLD DETECTION / EMAIL ALERT / SIEM DASHBOARD',
    github: 'https://github.com/BinNguyen-Sec/SOC-Homelab-Splunk',
    accent: 'red'
  },
  {
    slug: 'threat-hunting-detection',
    index: '03',
    title: 'THREAT HUNTING / DETECTION ENGINEERING',
    kicker: 'telemetry → timeline → correlation → detection',
    description: 'A three-system threat-hunting lab using Wazuh and Windows telemetry to reconstruct a controlled attack chain, build behavioral hunts and derive reusable Sigma detections.',
    tracks: ['Threat Hunting', 'Detection Engineering', 'Incident Triage'],
    stack: ['Wazuh', 'Sysmon', 'Windows Security', 'PowerShell 4104', 'Sigma', 'MITRE ATT&CK'],
    role: 'Threat Hunting / Detection Engineering',
    system: 'Kali → Windows Telemetry → Wazuh → Hunt → Sigma',
    built: [
      'Connected Kali Linux, a monitored Windows 10 endpoint and Wazuh over a private Tailscale overlay.',
      'Collected Windows Security, Sysmon, PowerShell Script Block Logging (4104) and Wazuh File Integrity Monitoring telemetry.',
      'Simulated RDP password guessing, valid-account access, HTTP file delivery with certutil, PowerShell execution and a safe marker-based TCP callback.',
      'Created five saved behavioral hunts, three Sigma rules and one RDP 4625 → 4624 correlation design.'
    ],
    observed: [
      'Correlating identity, process, file and network events gives stronger context than treating a single event as an incident.',
      'Some endpoint events existed locally but were not present in the Wazuh alert index because only rule-matched events were indexed.',
      'A behavioral detection based on process and file activity is more resilient to changing lab IPs than a hard-coded IOC.'
    ],
    learned: [
      'An alert is not an incident: each finding needs supporting identity, process, file and network context.',
      'Missing SIEM data does not prove an event never occurred; validate the source endpoint and the ingestion path.',
      'MITRE ATT&CK helps organize observed behavior, but does not replace event-level evidence.'
    ],
    proof: [
      'Five saved hunts cover expected attack events, RDP authentication, process execution, file activity and network connections.',
      'Six observed techniques were mapped: T1110.001, T1021.001, T1078.003, T1105, T1059.001 and T1095.',
      'The repository includes sanitized evidence visuals, telemetry notes, Sigma rules, a triage matrix, response playbook and hardening plan.'
    ],
    scope: 'The verdict is a true positive within an authorized lab simulation. Scope was one Windows endpoint, with no confirmed lateral movement or exfiltration. The repository deliberately separates attack proof, telemetry validation and the correlation model rather than claiming one continuous timeline.',
    signal: '5 WAZUH HUNTS / 3 SIGMA RULES / 6 ATT&CK TECHNIQUES',
    github: 'https://github.com/BinNguyen-Sec/Threat-Hunting-Detection-Engineering',
    accent: 'violet'
  },
  {
    slug: 'cloud-assignment-system',
    index: '04',
    title: 'ASSIGNMENT MANAGEMENT PLATFORM',
    kicker: 'application → identity → workflow → audit',
    description: 'A modular course-management application with role-scoped access, enrollment workflows, spreadsheet import and auditability across administrative actions.',
    tracks: ['Application', 'Backend', 'API Engineering'],
    stack: ['.NET 10', 'PostgreSQL 16', 'JWT', 'Role-Based Access', 'Excel Import', 'Automated Tests'],
    role: 'Application / Backend Engineering',
    system: '.NET API → PostgreSQL → Role Access → Course Workflows → Audit',
    built: [
      'Developed a modular .NET 10 backend backed by PostgreSQL 16.',
      'Implemented JWT access tokens and rotating HttpOnly refresh tokens with Teacher, Student and Admin role-scoped navigation.',
      'Built course CRUD, archive / restore, search, sorting, filtering, pagination and manual student enrollment workflows.',
      'Added Excel import with template, preview, confirmation, history and result report, plus append-only audit events for course and enrollment workflows.'
    ],
    observed: [
      'Identity and role boundaries affect every application workflow, not only which navigation items are displayed.',
      'Import operations benefit from preview and explicit confirmation before records are changed.',
      'Append-only audit events improve traceability for administrative actions.'
    ],
    learned: [
      'Authentication, authorization and auditability should be treated as connected application controls.',
      'Workflow validation and tests are necessary to make administrative changes predictable.'
    ],
    proof: [
      'The repository documents unit tests, integration tests, frontend tests and runtime smoke tests.',
      'The current README identifies Phase 3 course management as complete and records remaining migration / regression follow-up work.'
    ],
    scope: 'This is a supporting software-engineering project, not a cybersecurity lab. The repository README still flags a generated CourseManagement migration as a follow-up and retains V2 as a rollback / demo backup until V3 passes complete regression.',
    signal: '.NET 10 / POSTGRESQL 16 / JWT / AUDIT EVENTS',
    github: 'https://github.com/BinNguyen-Sec/cloud-assignment-system-v3',
    accent: 'off'
  }
];

type Award = {
  title: string;
  subtitle: string;
  date: string;
  image: string;
  uploadPath: string;
  alt: string;
  details: string[];
  accent: string;
};

const awards: Award[] = [
  {
    title: 'GOOGLE SECOPS CHRONICLE CTF',
    subtitle: 'Cymbal Investigation',
    date: '29 OCT – 01 NOV 2026',
    image: '/certificates/Certificate-Khysdns.pdf',
    uploadPath: 'public/certificates/Certificate-Khysdns.pdf',
    alt: 'Google SecOps Chronicle Cymbal Investigation certificate',
    details: ['18 / 18 CHALLENGES', '2,075 POINTS', 'TEAM RANK 584 / 1,716'],
    accent: 'blue'
  },
  {
    title: 'POINTER OVERFLOW CTF 2026',
    subtitle: 'Participant & Solver',
    date: 'OCT 2026',
    image: '/certificates/pointer-overflow-ctf.png',
    uploadPath: 'public/certificates/pointer-overflow-ctf.png',
    alt: 'Pointer Overflow CTF 2026 certificate',
    details: ['PARTICIPANT', 'CHALLENGE SOLVER'],
    accent: 'violet'
  }
];

const CertificateSlot = ({ award }: { award: Award }) => (
  <div className="certificate-visual">
    <img
      src={award.image}
      alt={award.alt}
      onLoad={(event) => event.currentTarget.parentElement?.classList.add('has-image')}
    />
    <div className="certificate-placeholder">
      <span>IMAGE SLOT / CERTIFICATE</span>
      <strong>UPLOAD CERTIFICATE IMAGE</strong>
      <small>{award.uploadPath}</small>
      <em>PNG · The image will appear here after upload.</em>
    </div>
  </div>
);

const Reveal = ({ children }: { children: React.ReactNode }) => {
  const reduced = useReducedMotion();
  return reduced
    ? <>{children}</>
    : <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>{children}</motion.div>;
};

const Resume = () => (
  <a className="resume" href="/resume/Nguyen-Ngoc-Khai-Resume-English.pdf" download>
    <b>↓</b><span>DOWNLOAD RESUME<small>ENGLISH / PDF</small></span>
  </a>
);

const Header = () => {
  const navigate = useNavigate();
  const go = (id: string) => {
    navigate('/');
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
  };
  return (
    <header>
      <Link to="/" className="brand">BINNGUYEN-SEC</Link>
      <nav>
        <button onClick={() => go('work')}>WORK</button>
        <button onClick={() => go('achievements')}>AWARDS</button>
        <button onClick={() => go('system')}>SYSTEM</button>
        <button onClick={() => go('contact')}>CONTACT</button>
      </nav>
    </header>
  );
};

const Signal = () => (
  <div className="signal">
    <span>TRACE / LIVE</span><i><b className="p1" /><b className="p2" /><b className="p3" /></i><span>AUTH / 4769</span>
  </div>
);

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">BIN / NGUYEN — HCMC / VN</div>
            <h1>CYBERSECURITY<span>NETWORK SECURITY / SOC OPERATIONS / THREAT HUNTING</span></h1>
            <p className="statement">I build systems to understand<br />how they fail —<br /><em>and what they leave behind.</em></p>
            <div className="actions">
              <Resume />
              <button className="textlink" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>VIEW SELECTED WORK ↓</button>
            </div>
          </div>
          <aside className="readout">
            <p><span>AVAILABILITY</span><strong>ENTRY-LEVEL / FRESHER</strong></p>
            <p><span>TRACK</span><strong>NETWORK / SOC / THREAT HUNTING</strong></p>
            <p><span>LOCATION</span><strong>HCMC / VN</strong></p>
            <p><span>AUTH</span><strong className="red">4769</strong></p>
            <p><span>TRACE</span><strong className="blue">ACTIVE</strong></p>
            <p><span>STATUS</span><strong className="violet">INVESTIGATING_</strong></p>
          </aside>
        </section>
        <Signal />

        <section className="section">
          <Reveal>
            <div className="eyebrow">01 / ABOUT</div>
            <div className="about">
              <h2>I build and validate enterprise-style environments, then use telemetry to understand security behavior — from network and identity controls to SIEM investigation and detection engineering.</h2>
              <div className="readout">
                <p><span>FOCUS</span><strong>Network Security / SOC</strong></p>
                <p><span>FOUNDATION</span><strong>TCP/IP / Windows / Linux</strong></p>
                <p><span>METHOD</span><strong>build → validate → observe → investigate</strong></p>
                <p><span>LOCATION</span><strong>Ho Chi Minh City</strong></p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="work" className="section">
          <div className="eyebrow">02 / SELECTED WORK</div>
          <h2 className="mega">PROJECTS THAT LEFT<br />USEFUL EVIDENCE.</h2>
          {projects.map((p) => (
            <Reveal key={p.slug}>
              <article className={'project ' + p.accent}>
                <div className="projectmeta"><span>{p.index} / SELECTED WORK</span><span>{p.tracks.join(' / ')}</span></div>
                <div className="projectbody">
                  <div>
                    <h3>{p.title}</h3>
                    <p className="kicker">{p.kicker}</p>
                    <p className="desc">{p.description}</p>
                    <div className="tags">{p.stack.map((x) => <span key={x}>{x}</span>)}</div>
                    <p className="project-signal">{p.signal}</p>
                  </div>
                  <div className="visual"><div className="bigindex">{p.index}</div><div className="trace">TRACE <strong>{p.index === '01' ? '4625' : p.index === '02' ? 'SSH / SPL' : p.index === '03' ? 'SYSMON' : 'AUDIT'}</strong></div></div>
                </div>
                <Link className="case" to={'/work/' + p.slug}>VIEW CASE STUDY ↗</Link>
              </article>
            </Reveal>
          ))}
        </section>

        <section id="achievements" className="section">
          <Reveal>
            <div className="eyebrow">03 / COMPETITIONS & CERTIFICATES</div>
            <h2 className="mega">CHALLENGES.<br />INVESTIGATIONS.<br />PROOF.</h2>
            <p className="section-intro">Selected competition achievements. Certificate images are reserved below and will appear once uploaded.</p>
            <div className="achievement-grid">
              {awards.map((award) => (
                <article className={'achievement ' + award.accent} key={award.title}>
                  <CertificateSlot award={award} />
                  <div className="achievement-meta">
                    <span className="achievement-date">{award.date}</span>
                    <h3>{award.title}</h3>
                    <p>{award.subtitle}</p>
                    <div className="achievement-details">{award.details.map((detail) => <span key={detail}>{detail}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="system" className="section">
          <Reveal>
            <div className="eyebrow">04 / SYSTEMS & TECHNICAL SKILLS</div>
            <div className="systems">
              {[
                ['NETWORK', 'TCP/IP / VLAN / STP / OSPF / VPN / pfSense / OpenVPN'],
                ['IDENTITY', 'Active Directory / Kerberos / AD CS / PKI / DNS / GPO'],
                ['DETECTION', 'Splunk / Wazuh / Sysmon / Windows Events / Sigma / Suricata'],
                ['INFRASTRUCTURE', 'Windows Server / VMware / Linux / AWS'],
                ['SCRIPTING & QUERY', 'PowerShell / SPL / Python / C#']
              ].map(([a, b]) => <article key={a}><span>{a}</span><p>{b}</p></article>)}
            </div>
          </Reveal>
        </section>

        <section className="section">
          <Reveal>
            <div className="eyebrow">05 / CURRENT SIGNAL</div>
            <div className="current">
              {[
                ['LEARNING', 'CCNA / Active Directory Security'],
                ['BUILDING', 'Threat Hunting / Detection Engineering'],
                ['CERTIFICATION', 'CCNA 200-301 — In Progress'],
                ['FOCUS', 'Network Security / SOC Operations']
              ].map(([a, b]) => <div key={a}><span>{a}</span><strong>{b}</strong></div>)}
            </div>
          </Reveal>
        </section>

        <section className="section cta">
          <Reveal>
            <div className="eyebrow">06 / RESUME</div>
            <h2 className="mega">OPEN TO<br />CYBERSECURITY ROLES.</h2>
            <p>Focused on Network Security, SOC Operations and Threat Hunting. Download the English resume for a concise overview.</p>
            <Resume />
          </Reveal>
        </section>
      </main>

      <footer id="contact" className="section">
        <div className="eyebrow">07 / CONTACT</div>
        <h2 className="mega">LET'S TRACE<br />SOMETHING.</h2>
        <Resume />
        <div className="footerlinks">
          <a href="https://github.com/BinNguyen-Sec" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/ngockhai-sec/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:ngockhai.sec@gmail.com">Email ↗</a>
        </div>
        <div className="footbottom"><span>SYSTEMS / IDENTITY / DETECTION</span><span>build things. break things. understand why.</span></div>
      </footer>
    </>
  );
}

function Detail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/404" />;

  return (
    <>
      <Header />
      <main className="detail section">
        <Link className="back" to="/">← BACK / SELECTED WORK</Link>
        <div className="eyebrow">{p.index} / CASE STUDY</div>
        <h1>{p.title}</h1>
        <p className="kicker">{p.kicker}</p>
        <p className="detail-intro">{p.description}</p>
        <div className="detailmeta">
          <p><span>ROLE</span><strong>{p.role}</strong></p>
          <p><span>SYSTEM</span><strong>{p.system}</strong></p>
          <p><span>TRACK</span><strong>{p.tracks.join(' / ')}</strong></p>
        </div>
        <div className="casegrid">
          {[
            ['WHAT I BUILT', p.built],
            ['WHAT I OBSERVED', p.observed],
            ['WHAT I LEARNED', p.learned]
          ].map(([title, items]) => (
            <Reveal key={title as string}>
              <div className="eyebrow">{title as string}</div>
              <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
            </Reveal>
          ))}
        </div>
        <section className="proof-scope">
          <div>
            <div className="eyebrow">EVIDENCE / VALIDATION</div>
            <ul>{p.proof.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <div className="eyebrow">SCOPE / LIMITATIONS</div>
            <p>{p.scope}</p>
          </div>
        </section>
        <div className="eyebrow">SYSTEM TRACE</div>
        <div className="arch">
          {p.system.split(' → ').map((step, i, all) => (
            <div key={step}><span>{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong>{i < all.length - 1 && <i>→</i>}</div>
          ))}
        </div>
        <section className="caseend">
          <h2 className="mega">PROOF OVER CLAIMS.</h2>
          {p.github && <a className="resume compact" href={p.github} target="_blank" rel="noreferrer">VIEW SOURCE ↗</a>}
        </section>
      </main>
    </>
  );
}

function NotFound() {
  return (
    <>
      <Header />
      <main className="nf">
        <div className="eyebrow">404 / TRACE LOST</div>
        <h1>NOTHING<br />RESPONDED.</h1>
        <p>The path exists only in theory.</p>
        <Link className="resume compact" to="/">RETURN HOME ←</Link>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:slug" element={<Detail />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>
);
