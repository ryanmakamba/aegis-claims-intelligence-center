"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  ExternalLink,
  FileSearch,
  Gauge,
  LayoutDashboard,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Claim = {
  id: string;
  line: string;
  lossType: string;
  status: "Open" | "Investigation" | "Litigation" | "Settled";
  reported: string;
  days: number;
  incurred: number;
  paid: number;
  reserve: number;
  fraud: number;
  severity: "Low" | "Moderate" | "High" | "Severe";
  adjuster: string;
  action: string;
  leakage: number;
};

const claims: Claim[] = [
  {
    id: "CLM-260184",
    line: "Auto",
    lossType: "Collision",
    status: "Open",
    reported: "Sep 8, 2026",
    days: 2,
    incurred: 18400,
    paid: 3200,
    reserve: 15200,
    fraud: 18,
    severity: "Moderate",
    adjuster: "M. Chen",
    action: "Fast-track repair review",
    leakage: 0,
  },
  {
    id: "CLM-260177",
    line: "Home",
    lossType: "Water damage",
    status: "Investigation",
    reported: "Sep 6, 2026",
    days: 4,
    incurred: 42750,
    paid: 5000,
    reserve: 37750,
    fraud: 63,
    severity: "High",
    adjuster: "A. Williams",
    action: "Validate loss timeline and invoices",
    leakage: 4200,
  },
  {
    id: "CLM-260169",
    line: "Property",
    lossType: "Fire",
    status: "Open",
    reported: "Sep 3, 2026",
    days: 7,
    incurred: 485000,
    paid: 65000,
    reserve: 420000,
    fraud: 24,
    severity: "Severe",
    adjuster: "J. Patel",
    action: "Large-loss specialist review",
    leakage: 0,
  },
  {
    id: "CLM-260152",
    line: "Liability",
    lossType: "Slip and fall",
    status: "Litigation",
    reported: "Aug 28, 2026",
    days: 13,
    incurred: 128000,
    paid: 18000,
    reserve: 110000,
    fraud: 42,
    severity: "High",
    adjuster: "S. Rivera",
    action: "Counsel strategy and reserve review",
    leakage: 8500,
  },
  {
    id: "CLM-260143",
    line: "Workers' Compensation",
    lossType: "Back strain",
    status: "Open",
    reported: "Aug 25, 2026",
    days: 16,
    incurred: 73500,
    paid: 21400,
    reserve: 52100,
    fraud: 71,
    severity: "High",
    adjuster: "T. Brooks",
    action: "Clinical review and employer contact",
    leakage: 6900,
  },
  {
    id: "CLM-260131",
    line: "Auto",
    lossType: "Bodily injury",
    status: "Investigation",
    reported: "Aug 21, 2026",
    days: 20,
    incurred: 88500,
    paid: 12500,
    reserve: 76000,
    fraud: 78,
    severity: "High",
    adjuster: "M. Chen",
    action: "Escalate to SIU",
    leakage: 11000,
  },
  {
    id: "CLM-260118",
    line: "Home",
    lossType: "Windstorm",
    status: "Open",
    reported: "Aug 16, 2026",
    days: 25,
    incurred: 31900,
    paid: 8900,
    reserve: 23000,
    fraud: 12,
    severity: "Moderate",
    adjuster: "A. Williams",
    action: "Complete contractor estimate",
    leakage: 0,
  },
  {
    id: "CLM-260104",
    line: "Property",
    lossType: "Equipment breakdown",
    status: "Open",
    reported: "Aug 11, 2026",
    days: 30,
    incurred: 162000,
    paid: 42000,
    reserve: 120000,
    fraud: 38,
    severity: "High",
    adjuster: "J. Patel",
    action: "Verify maintenance records",
    leakage: 12500,
  },
  {
    id: "CLM-260089",
    line: "Liability",
    lossType: "Product injury",
    status: "Litigation",
    reported: "Aug 4, 2026",
    days: 37,
    incurred: 214000,
    paid: 34000,
    reserve: 180000,
    fraud: 29,
    severity: "Severe",
    adjuster: "S. Rivera",
    action: "Reassess litigation exposure",
    leakage: 18000,
  },
  {
    id: "CLM-260071",
    line: "Workers' Compensation",
    lossType: "Laceration",
    status: "Open",
    reported: "Jul 27, 2026",
    days: 45,
    incurred: 46800,
    paid: 19800,
    reserve: 27000,
    fraud: 56,
    severity: "Moderate",
    adjuster: "T. Brooks",
    action: "Confirm return-to-work plan",
    leakage: 3900,
  },
  {
    id: "CLM-260054",
    line: "Auto",
    lossType: "Theft",
    status: "Investigation",
    reported: "Jul 19, 2026",
    days: 53,
    incurred: 28700,
    paid: 0,
    reserve: 28700,
    fraud: 84,
    severity: "High",
    adjuster: "D. Foster",
    action: "Escalate theft indicators to SIU",
    leakage: 0,
  },
  {
    id: "CLM-260039",
    line: "Home",
    lossType: "Fire",
    status: "Settled",
    reported: "Jul 9, 2026",
    days: 63,
    incurred: 119000,
    paid: 116500,
    reserve: 2500,
    fraud: 16,
    severity: "High",
    adjuster: "A. Williams",
    action: "Close after recovery review",
    leakage: 2500,
  },
  {
    id: "CLM-260022",
    line: "Property",
    lossType: "Water damage",
    status: "Open",
    reported: "Jun 29, 2026",
    days: 73,
    incurred: 236000,
    paid: 92000,
    reserve: 144000,
    fraud: 47,
    severity: "Severe",
    adjuster: "J. Patel",
    action: "Diary overdue reserve review",
    leakage: 21400,
  },
  {
    id: "CLM-260008",
    line: "Liability",
    lossType: "Premises injury",
    status: "Open",
    reported: "Jun 18, 2026",
    days: 84,
    incurred: 96500,
    paid: 26500,
    reserve: 70000,
    fraud: 35,
    severity: "High",
    adjuster: "S. Rivera",
    action: "Obtain medical status update",
    leakage: 7200,
  },
  {
    id: "CLM-259984",
    line: "Workers' Compensation",
    lossType: "Shoulder injury",
    status: "Litigation",
    reported: "Jun 4, 2026",
    days: 98,
    incurred: 186000,
    paid: 74000,
    reserve: 112000,
    fraud: 68,
    severity: "Severe",
    adjuster: "T. Brooks",
    action: "Coordinate legal and clinical review",
    leakage: 16400,
  },
  {
    id: "CLM-259967",
    line: "Auto",
    lossType: "Glass",
    status: "Settled",
    reported: "May 24, 2026",
    days: 109,
    incurred: 1450,
    paid: 1450,
    reserve: 0,
    fraud: 4,
    severity: "Low",
    adjuster: "D. Foster",
    action: "Closed — no further action",
    leakage: 0,
  },
  {
    id: "CLM-259951",
    line: "Home",
    lossType: "Theft",
    status: "Open",
    reported: "May 12, 2026",
    days: 121,
    incurred: 26400,
    paid: 10400,
    reserve: 16000,
    fraud: 74,
    severity: "High",
    adjuster: "M. Chen",
    action: "Review inventory documentation",
    leakage: 3800,
  },
  {
    id: "CLM-259932",
    line: "Property",
    lossType: "Business interruption",
    status: "Litigation",
    reported: "Apr 28, 2026",
    days: 135,
    incurred: 342000,
    paid: 108000,
    reserve: 234000,
    fraud: 51,
    severity: "Severe",
    adjuster: "J. Patel",
    action: "Reconcile BI calculation",
    leakage: 32600,
  },
  {
    id: "CLM-259910",
    line: "Liability",
    lossType: "Property damage",
    status: "Settled",
    reported: "Apr 10, 2026",
    days: 153,
    incurred: 58900,
    paid: 58900,
    reserve: 0,
    fraud: 11,
    severity: "Moderate",
    adjuster: "S. Rivera",
    action: "Closed — subrogation complete",
    leakage: 0,
  },
  {
    id: "CLM-259887",
    line: "Workers' Compensation",
    lossType: "Repetitive strain",
    status: "Open",
    reported: "Mar 21, 2026",
    days: 173,
    incurred: 112000,
    paid: 67000,
    reserve: 45000,
    fraud: 59,
    severity: "High",
    adjuster: "T. Brooks",
    action: "Reassess permanency exposure",
    leakage: 9400,
  },
];

const monthly = [
  { month: "Oct", reported: 118, closed: 102 },
  { month: "Nov", reported: 126, closed: 111 },
  { month: "Dec", reported: 109, closed: 104 },
  { month: "Jan", reported: 132, closed: 116 },
  { month: "Feb", reported: 128, closed: 121 },
  { month: "Mar", reported: 141, closed: 124 },
  { month: "Apr", reported: 149, closed: 132 },
  { month: "May", reported: 144, closed: 139 },
  { month: "Jun", reported: 158, closed: 141 },
  { month: "Jul", reported: 166, closed: 148 },
  { month: "Aug", reported: 173, closed: 154 },
  { month: "Sep", reported: 151, closed: 147 },
];
const lineOrder = [
  "Auto",
  "Home",
  "Property",
  "Liability",
  "Workers' Compensation",
];
const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: value >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: value >= 1_000_000 ? 2 : 0,
  }).format(value);
const pct = (value: number) => `${value.toFixed(1)}%`;

export default function Home() {
  const [view, setView] = useState<"dashboard" | "register" | "triage">(
    "dashboard",
  );
  const [line, setLine] = useState("All Lines");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      claims.filter(
        (c) =>
          (line === "All Lines" || c.line === line) &&
          `${c.id} ${c.line} ${c.lossType} ${c.adjuster} ${c.status}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [line, query],
  );
  const totals = useMemo(
    () =>
      filtered.reduce(
        (a, c) => ({
          incurred: a.incurred + c.incurred,
          paid: a.paid + c.paid,
          reserve: a.reserve + c.reserve,
          leakage: a.leakage + c.leakage,
        }),
        { incurred: 0, paid: 0, reserve: 0, leakage: 0 },
      ),
    [filtered],
  );
  const open = filtered.filter((c) => c.status !== "Settled"),
    highFraud = filtered.filter((c) => c.fraud >= 60);
  const lineData = lineOrder.map((name) => {
    const rows = claims.filter((c) => c.line === name);
    return {
      name: name === "Workers' Compensation" ? "Workers' Comp" : name,
      incurred: rows.reduce((s, c) => s + c.incurred, 0),
      paid: rows.reduce((s, c) => s + c.paid, 0),
      reserve: rows.reduce((s, c) => s + c.reserve, 0),
    };
  });
  const statusData = ["Open", "Investigation", "Litigation", "Settled"].map(
    (name, i) => ({
      name,
      value: filtered.filter((c) => c.status === name).length,
      color: ["#274f75", "#c9822e", "#a94f4b", "#438568"][i],
    }),
  );
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src="/aegis-logo.png" alt="" />
          <div>
            <b>Aegis</b>
            <small>Claims Intelligence Center</small>
          </div>
        </div>
        <nav>
          <button
            className={view === "dashboard" ? "active" : ""}
            onClick={() => setView("dashboard")}
          >
            <LayoutDashboard />
            Executive Dashboard
          </button>
          <button
            className={view === "register" ? "active" : ""}
            onClick={() => setView("register")}
          >
            <ClipboardList />
            Claims Register
          </button>
          <button
            className={view === "triage" ? "active" : ""}
            onClick={() => setView("triage")}
          >
            <ShieldAlert />
            Triage & Leakage
          </button>
          <a
            href="https://aegis-underwriting-command-center.vercel.app"
            target="_blank"
          >
            <ExternalLink />
            Command Center
          </a>
          <a
            href="https://aegis-evidence-studio-tppi.vercel.app"
            target="_blank"
          >
            <ExternalLink />
            Evidence Studio
          </a>
        </nav>
        <div className="engine-note">
          <Gauge />
          <div>
            <b>5 Claims Models Active</b>
            <span>Personal & Commercial P&C</span>
          </div>
        </div>
        <footer>
          <span>Claims System</span>
          <b>Ryan Makamba</b>
        </footer>
      </aside>
      <main className="workspace">
        <header className="topbar">
          <div>
            <p>CLAIMS OPERATIONS</p>
            <h1>
              {view === "dashboard"
                ? "Claims Intelligence"
                : view === "register"
                  ? "Claims Register"
                  : "Triage & Leakage Review"}
            </h1>
          </div>
          <label>
            Portfolio
            <select value={line} onChange={(e) => setLine(e.target.value)}>
              <option>All Lines</option>
              {lineOrder.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
        </header>
        {view === "dashboard" && (
          <>
            <section className="scope">
              <div>
                <BarChart3 />
                <span>
                  <b>Enterprise Claims View</b>
                </span>
              </div>
              <button onClick={() => setView("register")}>
                Open Claims Register <ChevronRight />
              </button>
            </section>
            <section className="metrics">
              <Metric
                icon={<ClipboardList />}
                label="Open Claims"
                value={String(open.length)}
                note={`${filtered.filter((c) => c.days > 90 && c.status !== "Settled").length} older than 90 days`}
              />
              <Metric
                icon={<CircleDollarSign />}
                label="Total Incurred"
                value={money(totals.incurred)}
                note={`${pct((totals.paid / totals.incurred) * 100)} paid to date`}
              />
              <Metric
                icon={<Gauge />}
                label="Outstanding Reserve"
                value={money(totals.reserve)}
                note="Case reserves across selected claims"
              />
              <Metric
                icon={<ShieldAlert />}
                label="Fraud Alerts"
                value={String(highFraud.length)}
                note="Score of 60 or greater"
                tone="orange"
              />
              <Metric
                icon={<AlertTriangle />}
                label="Leakage Exposure"
                value={money(totals.leakage)}
                note="Recoverable or avoidable estimate"
                tone="red"
              />
            </section>
            <section className="charts">
              <Panel
                kicker="FINANCIAL POSITION"
                title="Incurred, Paid and Reserve by Line"
              >
                <div className="chart">
                  <ResponsiveContainer>
                    <BarChart
                      data={lineData}
                      margin={{ top: 20, right: 16, left: 16, bottom: 8 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="4 4"
                        stroke="#d8e0e7"
                      />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis
                        tickFormatter={(v) => money(v)}
                        width={68}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip formatter={(v) => money(Number(v || 0))} />
                      <Bar
                        dataKey="incurred"
                        name="Incurred"
                        fill="#183f64"
                        radius={[5, 5, 0, 0]}
                      />
                      <Bar
                        dataKey="paid"
                        name="Paid"
                        fill="#62a5a0"
                        radius={[5, 5, 0, 0]}
                      />
                      <Bar
                        dataKey="reserve"
                        name="Reserve"
                        fill="#c9822e"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel kicker="OPERATING FLOW" title="Reported versus Closed">
                <div className="chart">
                  <ResponsiveContainer>
                    <LineChart data={monthly}>
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="4 4"
                        stroke="#d8e0e7"
                      />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="reported"
                        stroke="#183f64"
                        strokeWidth={3}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="closed"
                        stroke="#c9822e"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
              <Panel kicker="CLAIM STATUS" title="Current Disposition">
                <div className="donut">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        innerRadius={62}
                        outerRadius={92}
                        paddingAngle={3}
                      >
                        {statusData.map((s) => (
                          <Cell key={s.name} fill={s.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="legend">
                    {statusData.map((s) => (
                      <div key={s.name}>
                        <i style={{ background: s.color }} />
                        <span>{s.name}</span>
                        <b>{s.value}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
              <Panel
                kicker="EXPLAINABLE CLAIMS ANALYTICS"
                title="Management Signals"
              >
                <div className="signals">
                  <Signal
                    label="Reserve adequacy"
                    value="Within tolerance"
                    text="Selected case reserves align with current incurred estimates."
                    good
                  />
                  <Signal
                    label="Aging pressure"
                    value={`${open.filter((c) => c.days > 90).length} priority files`}
                    text="Claims beyond 90 days require a documented action plan."
                  />
                  <Signal
                    label="Fraud concentration"
                    value={`${highFraud.length} elevated alerts`}
                    text="Behavioral and documentation indicators require validation."
                  />
                  <Signal
                    label="Leakage opportunity"
                    value={money(totals.leakage)}
                    text="Estimated savings from recovery, reserve and vendor review."
                  />
                </div>
              </Panel>
            </section>
          </>
        )}
        {view === "register" && (
          <ClaimsTable rows={filtered} query={query} setQuery={setQuery} />
        )}
        {view === "triage" && (
          <section className="triage-layout">
            <div className="queue">
              <div className="section-head">
                <div>
                  <p>PRIORITY WORK QUEUE</p>
                  <h2>Claims Requiring Intervention</h2>
                </div>
                <span>
                  {
                    filtered.filter(
                      (c) => c.fraud >= 60 || c.leakage > 5000 || c.days > 90,
                    ).length
                  }{" "}
                  flagged
                </span>
              </div>
              {filtered
                .filter((c) => c.fraud >= 60 || c.leakage > 5000 || c.days > 90)
                .sort(
                  (a, b) =>
                    b.fraud +
                    b.days +
                    b.leakage / 1000 -
                    (a.fraud + a.days + a.leakage / 1000),
                )
                .map((c) => (
                  <article key={c.id}>
                    <div
                      className={`priority ${c.fraud >= 70 ? "critical" : "review"}`}
                    >
                      {c.fraud >= 70 ? "Priority" : "Review"}
                    </div>
                    <div>
                      <b>
                        {c.id} · {c.line}
                      </b>
                      <span>
                        {c.lossType} · {c.days} days open · {money(c.incurred)}{" "}
                        incurred
                      </span>
                      <p>
                        <Sparkles /> {c.action}
                      </p>
                    </div>
                    <div className="risk-score">
                      <small>Fraud signal</small>
                      <b>{c.fraud}/100</b>
                      <small>Leakage {money(c.leakage)}</small>
                    </div>
                  </article>
                ))}
            </div>
            <aside className="method">
              <FileSearch />
              <h2>Explainable Claims Triage</h2>
              <p>
                Each recommendation uses transparent operational indicators
                rather than a black-box decision.
              </p>
              <div>
                <span>01</span>
                <b>Severity and reserve movement</b>
                <small>
                  Large-loss exposure, paid development and remaining case
                  reserve.
                </small>
              </div>
              <div>
                <span>02</span>
                <b>Fraud and documentation signals</b>
                <small>
                  Reporting delays, invoice patterns, coverage history and loss
                  circumstances.
                </small>
              </div>
              <div>
                <span>03</span>
                <b>Aging and recovery opportunity</b>
                <small>
                  Diary compliance, subrogation potential, vendor variance and
                  return-to-work progress.
                </small>
              </div>
            </aside>
          </section>
        )}
        <footer className="site-footer">
          © 2026 Aegis Group by Ryan Makamba. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  note,
  tone = "blue",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  tone?: string;
}) {
  return (
    <article className={`metric ${tone}`}>
      <div>
        {icon}
        <span>{label}</span>
      </div>
      <b>{value}</b>
      <small>{note}</small>
    </article>
  );
}
function Panel({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="panel">
      <header>
        <p>{kicker}</p>
        <h2>{title}</h2>
      </header>
      {children}
    </article>
  );
}
function Signal({
  label,
  value,
  text,
  good = false,
}: {
  label: string;
  value: string;
  text: string;
  good?: boolean;
}) {
  return (
    <div>
      <span className={good ? "ok" : "watch"}>
        {good ? <CheckCircle2 /> : <AlertTriangle />}
      </span>
      <div>
        <b>{label}</b>
        <p>{text}</p>
      </div>
      <strong>{value}</strong>
    </div>
  );
}
function ClaimsTable({
  rows,
  query,
  setQuery,
}: {
  rows: Claim[];
  query: string;
  setQuery: (v: string) => void;
}) {
  return (
    <section className="table-card">
      <div className="section-head">
        <div>
          <p>SEARCHABLE CLAIMS REGISTER</p>
          <h2>{rows.length} Claims in Current View</h2>
        </div>
        <label className="search">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search claim, loss type or adjuster"
          />
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Line / Loss</th>
              <th>Status</th>
              <th>Age</th>
              <th>Financials</th>
              <th>Fraud Signal</th>
              <th>Adjuster</th>
              <th>Recommended Next Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>
                  <b>{c.id}</b>
                  <small>Reported {c.reported}</small>
                </td>
                <td>
                  <b>{c.line}</b>
                  <small>{c.lossType}</small>
                </td>
                <td>
                  <span className={`status ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <b>{c.days} days</b>
                  <small>
                    {c.days > 90 ? "Aging priority" : "Within diary range"}
                  </small>
                </td>
                <td>
                  <b>{money(c.incurred)} incurred</b>
                  <small>
                    {money(c.paid)} paid · {money(c.reserve)} reserve
                  </small>
                </td>
                <td>
                  <span
                    className={`fraud ${c.fraud >= 70 ? "high" : c.fraud >= 40 ? "medium" : "low"}`}
                  >
                    {c.fraud}/100
                  </span>
                </td>
                <td>{c.adjuster}</td>
                <td>
                  <b>{c.action}</b>
                  <small>
                    {c.leakage
                      ? `${money(c.leakage)} leakage opportunity`
                      : "No leakage identified"}
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
