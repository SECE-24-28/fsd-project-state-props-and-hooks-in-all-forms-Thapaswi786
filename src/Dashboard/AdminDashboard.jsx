import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const STUDENTS = [
  { id: "2022CSE031", name: "Harry Potter",        dept: "CSE", sem: 6, status: "Active" },
  { id: "2022CSE032", name: "Hermione Granger",    dept: "CSE", sem: 6, status: "Active" },
  { id: "2022CSE033", name: "Ron Weasley",         dept: "CSE", sem: 6, status: "Active" },
  { id: "2022ECE041", name: "Draco Malfoy",        dept: "ECE", sem: 4, status: "Active" },
  { id: "2022EEE021", name: "Neville Longbottom",  dept: "EEE", sem: 4, status: "Inactive" },
  { id: "2021MECH11", name: "Luna Lovegood",       dept: "MECH",sem: 6, status: "Active" },
  { id: "2023IT001",  name: "Ginny Weasley",       dept: "IT",  sem: 2, status: "Active" },
];

const FACULTY = [
  { id: "FAC-2018-047", name: "Prof. Remus Lupin",        dept: "CSE",  designation: "Associate Professor", status: "Active" },
  { id: "FAC-2015-022", name: "Prof. Pomona Sprout",      dept: "EEE",  designation: "Professor",           status: "Active" },
  { id: "FAC-2020-063", name: "Prof. Filius Flitwick",    dept: "ECE",  designation: "Assistant Professor", status: "Active" },
  { id: "FAC-2019-034", name: "Dr. Sybill Trelawney",     dept: "MECH", designation: "Associate Professor", status: "On Leave" },
  { id: "FAC-2021-078", name: "Prof. Rubeus Hagrid",      dept: "IT",   designation: "Assistant Professor", status: "Active" },
];

const FEES_REPORT = [
  { dept: "CSE",  collected: "₹48,60,000", pending: "₹12,60,000", total: "₹61,20,000" },
  { dept: "ECE",  collected: "₹22,50,000", pending: "₹8,10,000",  total: "₹30,60,000" },
  { dept: "EEE",  collected: "₹20,70,000", pending: "₹9,00,000",  total: "₹29,70,000" },
  { dept: "MECH", collected: "₹19,80,000", pending: "₹7,20,000",  total: "₹27,00,000" },
  { dept: "IT",   collected: "₹21,60,000", pending: "₹8,40,000",  total: "₹30,00,000" },
];

const NOTICES = [
  { id: 1, title: "End-Semester Exam Timetable Published",  date: "01 Jun 2026", audience: "All" },
  { id: 2, title: "Fee Payment Deadline — Semester 6",      date: "28 May 2026", audience: "Students" },
  { id: 3, title: "Faculty Development Programme — June 10",date: "25 May 2026", audience: "Faculty" },
  { id: 4, title: "Anti-Ragging Committee Meeting",         date: "20 May 2026", audience: "Admin" },
  { id: 5, title: "NAAC Peer Team Visit — Preparation Note",date: "15 May 2026", audience: "Faculty" },
];

const TABS = ["Overview", "Students", "Faculty", "Fees Report", "Notice Board", "System"];

function AdminDashboard() {
  const [tab, setTab]         = useState("Overview");
  const [search, setSearch]   = useState("");
  const [noticeForm, setNoticeForm] = useState({ title: "", audience: "All", message: "" });
  const [notices, setNotices] = useState(NOTICES);
  const [msg, setMsg]         = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "admin@hogwarts.edu";

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const filteredStudents = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.dept.toLowerCase().includes(search.toLowerCase())
  );

  const handlePublish = (e) => {
    e.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.message.trim()) { setMsg("error"); return; }
    const newNotice = {
      id: notices.length + 1,
      title: noticeForm.title,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      audience: noticeForm.audience,
    };
    setNotices([newNotice, ...notices]);
    setNoticeForm({ title: "", audience: "All", message: "" });
    setMsg("success");
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <main className="page">
      <PageTitle title="Admin Dashboard" />

      <div className="dashboard-top">
        <div>
          <h2>🛡️ Admin Dashboard</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
            Welcome, <strong style={{ color: "var(--secondary)" }}>Admin</strong> — {email}
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "9px 18px", borderRadius: "99px", border: "1px solid var(--border)",
            background: tab === t ? "linear-gradient(135deg,var(--secondary-light),var(--secondary))" : "transparent",
            color: tab === t ? "#111827" : "var(--muted)", cursor: "pointer",
            fontWeight: tab === t ? "700" : "400", transition: "0.2s"
          }}>{t}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === "Overview" && (
        <div>
          <div className="dashboard-grid" style={{ marginBottom: "22px" }}>
            {[
              { label: "Total Students",    value: "3,840", icon: "🎓" },
              { label: "Total Faculty",     value: "148",   icon: "👨‍🏫" },
              { label: "Departments",       value: "10",    icon: "🏫" },
              { label: "Active Courses",    value: "9",     icon: "📚" },
              { label: "Fees Collected",    value: "₹1.33 Cr", icon: "💰" },
              { label: "Pending Fees",      value: "₹45.3 L",  icon: "⚠️" },
            ].map(({ label, value, icon }) => (
              <div className="dashboard-card" key={label}>
                <p style={{ fontSize: "1.6rem" }}>{icon}</p>
                <div className="stat-number" style={{ fontSize: "1.8rem" }}>{value}</div>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>{label}</p>
              </div>
            ))}
          </div>

          <div className="grid-2">
            <div className="dashboard-card">
              <h3 style={{ marginBottom: "14px" }}>🏫 Dept-wise Strength</h3>
              {[
                { dept: "CSE",  count: 960, pct: 25 },
                { dept: "ECE",  count: 720, pct: 19 },
                { dept: "EEE",  count: 600, pct: 16 },
                { dept: "MECH", count: 600, pct: 16 },
                { dept: "IT",   count: 480, pct: 13 },
                { dept: "Other",count: 480, pct: 11 },
              ].map((d) => (
                <div key={d.dept} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--muted)", marginBottom: "4px" }}>
                    <span>{d.dept}</span><span>{d.count} students</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "99px", height: "7px" }}>
                    <div style={{ width: `${d.pct * 4}%`, height: "100%", borderRadius: "99px", background: "linear-gradient(90deg,var(--secondary-light),var(--secondary))" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="dashboard-card">
              <h3 style={{ marginBottom: "14px" }}>📢 Recent Notices</h3>
              {notices.slice(0, 4).map((n, i) => (
                <div key={n.id} style={{ paddingBottom: "11px", marginBottom: "11px", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ color: "var(--secondary)", fontSize: "0.78rem", fontWeight: "600" }}>{n.date} • {n.audience}</span>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: "2px" }}>{n.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students */}
      {tab === "Students" && (
        <div className="dashboard-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
            <h3>🎓 Student Management</h3>
            <input
              type="text" placeholder="Search by name, ID, or dept…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "9px 14px", borderRadius: "12px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.07)", color: "var(--white)", outline: "none", minWidth: "240px" }}
            />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Reg. No.", "Name", "Department", "Semester", "Status", "Action"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{s.id}</td>
                    <td style={{ ...tdStyle, color: "var(--white)" }}>{s.name}</td>
                    <td style={tdStyle}>{s.dept}</td>
                    <td style={tdStyle}>{s.sem}</td>
                    <td style={{ ...tdStyle, color: s.status === "Active" ? "var(--success)" : "var(--danger)", fontWeight: "600" }}>
                      {s.status === "Active" ? "● Active" : "● Inactive"}
                    </td>
                    <td style={tdStyle}>
                      <button style={{ padding: "5px 12px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--secondary)", cursor: "pointer", fontSize: "0.82rem" }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginTop: "14px" }}>
            Showing {filteredStudents.length} of {STUDENTS.length} records.
          </p>
        </div>
      )}

      {/* Faculty */}
      {tab === "Faculty" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "20px" }}>👨‍🏫 Faculty Management</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Emp. ID", "Name", "Department", "Designation", "Status"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {FACULTY.map((f) => (
                  <tr key={f.id}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{f.id}</td>
                    <td style={{ ...tdStyle, color: "var(--white)" }}>{f.name}</td>
                    <td style={tdStyle}>{f.dept}</td>
                    <td style={tdStyle}>{f.designation}</td>
                    <td style={{ ...tdStyle, color: f.status === "Active" ? "var(--success)" : "var(--secondary)", fontWeight: "600" }}>
                      {f.status === "Active" ? "● Active" : "● " + f.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fees Report */}
      {tab === "Fees Report" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "20px" }}>💰 Fee Collection Report — AY 2025–26</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Department", "Collected", "Pending", "Total"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {FEES_REPORT.map((row) => (
                  <tr key={row.dept}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{row.dept}</td>
                    <td style={{ ...tdStyle, color: "var(--success)", fontWeight: "600" }}>{row.collected}</td>
                    <td style={{ ...tdStyle, color: "var(--danger)",  fontWeight: "600" }}>{row.pending}</td>
                    <td style={{ ...tdStyle, color: "var(--white)",   fontWeight: "700" }}>{row.total}</td>
                  </tr>
                ))}
                <tr style={{ background: "rgba(212,175,55,0.08)" }}>
                  <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "800" }}>TOTAL</td>
                  <td style={{ ...tdStyle, color: "var(--success)", fontWeight: "800" }}>₹1,33,20,000</td>
                  <td style={{ ...tdStyle, color: "var(--danger)",  fontWeight: "800" }}>₹45,30,000</td>
                  <td style={{ ...tdStyle, color: "var(--white)",   fontWeight: "800" }}>₹1,78,50,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notice Board */}
      {tab === "Notice Board" && (
        <div className="grid-2">
          <div className="dashboard-card">
            <h3 style={{ marginBottom: "20px" }}>📋 Published Notices</h3>
            {notices.map((n, i) => (
              <div key={n.id} style={{ paddingBottom: "14px", marginBottom: "14px", borderBottom: i < notices.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                  <div>
                    <span style={{ color: "var(--secondary)", fontSize: "0.78rem", fontWeight: "600" }}>{n.date} • {n.audience}</span>
                    <p style={{ color: "var(--white)", marginTop: "3px", fontWeight: "600", fontSize: "0.93rem" }}>{n.title}</p>
                  </div>
                  <button
                    onClick={() => setNotices(notices.filter((x) => x.id !== n.id))}
                    style={{ padding: "4px 10px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.4)", background: "transparent", color: "#fca5a5", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-card">
            <h3 style={{ marginBottom: "20px" }}>✏️ Publish New Notice</h3>
            {msg === "success" && <div className="alert alert-success">✅ Notice published successfully!</div>}
            {msg === "error"   && <div className="alert alert-error">❌ Title and message are required.</div>}
            <form onSubmit={handlePublish} noValidate>
              <div className="form-group">
                <label>Notice Title</label>
                <input type="text" value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} placeholder="Enter notice title" />
              </div>
              <div className="form-group">
                <label>Audience</label>
                <select value={noticeForm.audience} onChange={(e) => setNoticeForm({ ...noticeForm, audience: e.target.value })}>
                  <option>All</option>
                  <option>Students</option>
                  <option>Faculty</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea value={noticeForm.message} onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })} rows="4" placeholder="Enter notice content…"
                  style={{ width:"100%", padding:"13px 15px", borderRadius:"14px", border:"1px solid var(--border)", background:"rgba(255,255,255,0.07)", color:"var(--white)", outline:"none", resize:"vertical" }} />
              </div>
              <button type="submit" className="main-btn">Publish Notice</button>
            </form>
          </div>
        </div>
      )}

      {/* System */}
      {tab === "System" && (
        <div className="grid-2">
          {[
            { title: "🖥️ Portal Status", items: [
              { label: "Application Server",  val: "✅ Online" },
              { label: "Database Server",     val: "✅ Online" },
              { label: "Email Service",       val: "✅ Online" },
              { label: "Backup Service",      val: "✅ Online" },
              { label: "Last Backup",         val: "02 Jun 2026, 02:00 AM" },
              { label: "SSL Certificate",     val: "Valid till Dec 2026" },
            ]},
            { title: "📊 System Usage", items: [
              { label: "Active Sessions",    val: "247" },
              { label: "DB Queries / Hour",  val: "18,420" },
              { label: "Storage Used",       val: "48 GB / 200 GB" },
              { label: "Bandwidth Today",    val: "12.4 GB" },
              { label: "Uptime",             val: "99.97%" },
              { label: "Portal Version",     val: "v2.4.1" },
            ]},
          ].map((card) => (
            <div className="dashboard-card" key={card.title}>
              <h3 style={{ marginBottom: "18px" }}>{card.title}</h3>
              {card.items.map(({ label, val }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{label}</span>
                  <span style={{ color: "var(--white)", fontWeight: "600", fontSize: "0.9rem" }}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const thStyle = {
  padding: "11px 14px", textAlign: "left",
  borderBottom: "2px solid var(--border)", color: "var(--secondary)",
  fontSize: "0.82rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px"
};
const tdStyle = {
  padding: "11px 14px", color: "var(--muted)",
  borderBottom: "1px solid rgba(255,255,255,0.05)"
};

export default AdminDashboard;
