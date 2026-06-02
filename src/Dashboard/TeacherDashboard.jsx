import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const MY_SUBJECTS = [
  { code: "CSE-101", name: "Data Structures",    sem: "Sem 6", section: "B", students: 62 },
  { code: "CSE-103", name: "Operating Systems",  sem: "Sem 6", section: "B", students: 62 },
  { code: "CSE-201", name: "Algorithm Design",   sem: "Sem 4", section: "A", students: 58 },
];

const SCHEDULE = [
  { day: "Monday",    time: "8:30 AM",  subject: "Data Structures",  section: "6-B", room: "CS-201" },
  { day: "Monday",    time: "10:30 AM", subject: "Operating Systems", section: "6-B", room: "CS-202" },
  { day: "Tuesday",   time: "9:20 AM",  subject: "Algorithm Design",  section: "4-A", room: "CS-301" },
  { day: "Wednesday", time: "8:30 AM",  subject: "Data Structures",  section: "6-B", room: "CS-201" },
  { day: "Wednesday", time: "11:20 AM", subject: "Algorithm Design",  section: "4-A", room: "CS-301" },
  { day: "Thursday",  time: "10:30 AM", subject: "Operating Systems", section: "6-B", room: "CS-202" },
  { day: "Friday",    time: "9:20 AM",  subject: "Data Structures",  section: "6-B", room: "CS-201" },
];

const initialStudents = [
  { id: "2022CSE031", name: "Harry Potter",        attend: true,  ct1: 26, ct2: 28 },
  { id: "2022CSE032", name: "Hermione Granger",    attend: true,  ct1: 30, ct2: 30 },
  { id: "2022CSE033", name: "Ron Weasley",         attend: false, ct1: 18, ct2: 20 },
  { id: "2022CSE034", name: "Neville Longbottom",  attend: true,  ct1: 22, ct2: 24 },
  { id: "2022CSE035", name: "Luna Lovegood",       attend: true,  ct1: 28, ct2: 27 },
  { id: "2022CSE036", name: "Ginny Weasley",       attend: false, ct1: 24, ct2: 22 },
];

const ANNOUNCEMENTS = [
  { date: "01 Jun 2026", text: "Internal Assessment II result upload deadline: 05 June 2026." },
  { date: "28 May 2026", text: "Faculty Development Programme on AI in Education — 10 June 2026." },
  { date: "20 May 2026", text: "End-semester exam duty allotment published. Check the examination cell notice." },
  { date: "15 May 2026", text: "Research paper submission window for National Conference open till 30 May." },
];

const TABS = ["Overview", "My Subjects", "Schedule", "Attendance", "Marks Entry", "Announcements"];

function TeacherDashboard() {
  const [tab, setTab] = useState("Overview");
  const [students, setStudents] = useState(initialStudents);
  const [saved, setSaved] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "teacher@hogwarts.edu";

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const toggleAttend = (id) => setStudents(students.map((s) => s.id === id ? { ...s, attend: !s.attend } : s));

  const handleSave = (type) => {
    setSaved(`${type} saved successfully!`);
    setTimeout(() => setSaved(""), 2500);
  };

  return (
    <main className="page">
      <PageTitle title="Teacher Dashboard" />

      <div className="dashboard-top">
        <div>
          <h2>👨‍🏫 Teacher Dashboard</h2>
          <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
            Welcome, <strong style={{ color: "var(--secondary)" }}>Prof. Remus Lupin</strong> — {email}
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
      </div>

      {/* Profile bar */}
      <div className="dashboard-card" style={{ marginBottom: "24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
        {[
          { label: "Employee ID",  value: "FAC-2018-047" },
          { label: "Department",   value: "Computer Science" },
          { label: "Designation",  value: "Associate Professor" },
          { label: "Experience",   value: "8 Years" },
        ].map(({ label, value }) => (
          <div key={label}>
            <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginBottom: "4px" }}>{label}</p>
            <p style={{ color: "var(--white)", fontWeight: "700" }}>{value}</p>
          </div>
        ))}
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

      {saved && <div className="alert alert-success" style={{ marginBottom: "18px" }}>✅ {saved}</div>}

      {/* Overview */}
      {tab === "Overview" && (
        <div>
          <div className="dashboard-grid" style={{ marginBottom: "22px" }}>
            {[
              { label: "Subjects Handling", value: "3",   icon: "📚" },
              { label: "Total Students",    value: "182", icon: "🎓" },
              { label: "Classes Today",     value: "2",   icon: "📅" },
              { label: "Avg. Attendance",   value: "72%", icon: "📊" },
              { label: "Marks Pending",     value: "1",   icon: "✏️" },
              { label: "Leave Balance",     value: "12",  icon: "🗓️" },
            ].map(({ label, value, icon }) => (
              <div className="dashboard-card" key={label}>
                <p style={{ fontSize: "1.6rem" }}>{icon}</p>
                <div className="stat-number">{value}</div>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>{label}</p>
              </div>
            ))}
          </div>
          <div className="dashboard-card">
            <h3 style={{ marginBottom: "14px" }}>📢 Announcements</h3>
            {ANNOUNCEMENTS.slice(0, 3).map((a, i) => (
              <div key={i} style={{ paddingBottom: "12px", marginBottom: "12px", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                <span style={{ color: "var(--secondary)", fontSize: "0.8rem", fontWeight: "600" }}>{a.date} — </span>
                <span style={{ color: "var(--muted)", fontSize: "0.92rem" }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Subjects */}
      {tab === "My Subjects" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "20px" }}>📚 Subjects Assigned — 2025–26 (Even Sem)</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Code", "Subject Name", "Semester", "Section", "Students"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {MY_SUBJECTS.map((s) => (
                  <tr key={s.code}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{s.code}</td>
                    <td style={{ ...tdStyle, color: "var(--white)" }}>{s.name}</td>
                    <td style={tdStyle}>{s.sem}</td>
                    <td style={tdStyle}>{s.section}</td>
                    <td style={tdStyle}>{s.students}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule */}
      {tab === "Schedule" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "20px" }}>🗓️ Weekly Teaching Schedule</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Day", "Time", "Subject", "Section", "Room"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row, i) => (
                  <tr key={i}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{row.day}</td>
                    <td style={{ ...tdStyle, color: "var(--white)" }}>{row.time}</td>
                    <td style={tdStyle}>{row.subject}</td>
                    <td style={tdStyle}>{row.section}</td>
                    <td style={tdStyle}>{row.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance */}
      {tab === "Attendance" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "6px" }}>📋 Mark Attendance</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "20px" }}>
            Data Structures — Sem 6 / Section B — {new Date().toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Reg. No.", "Student Name", "Status", "Toggle"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{s.id}</td>
                    <td style={{ ...tdStyle, color: "var(--white)" }}>{s.name}</td>
                    <td style={{ ...tdStyle, color: s.attend ? "var(--success)" : "var(--danger)", fontWeight: "700" }}>
                      {s.attend ? "✅ Present" : "❌ Absent"}
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => toggleAttend(s.id)} style={{
                        padding: "6px 14px", borderRadius: "99px", border: "1px solid var(--border)",
                        background: "transparent", color: "var(--muted)", cursor: "pointer", fontSize: "0.84rem"
                      }}>
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="main-btn" style={{ marginTop: "18px", maxWidth: "220px" }} onClick={() => handleSave("Attendance")}>
            Save Attendance
          </button>
        </div>
      )}

      {/* Marks Entry */}
      {tab === "Marks Entry" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "6px" }}>✏️ Internal Marks Entry</h3>
          <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "20px" }}>
            Data Structures — Sem 6 / Section B
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>{["Reg. No.", "Student Name", "CT 1 (/30)", "CT 2 (/30)"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td style={{ ...tdStyle, color: "var(--secondary)", fontWeight: "700" }}>{s.id}</td>
                    <td style={{ ...tdStyle, color: "var(--white)" }}>{s.name}</td>
                    {["ct1", "ct2"].map((key) => (
                      <td key={key} style={tdStyle}>
                        <input
                          type="number" min="0" max="30" value={s[key]}
                          onChange={(e) => setStudents(students.map((st) => st.id === s.id ? { ...st, [key]: Number(e.target.value) } : st))}
                          style={{
                            width: "70px", padding: "6px 10px", borderRadius: "10px",
                            border: "1px solid var(--border)", background: "rgba(255,255,255,0.07)",
                            color: "var(--white)", outline: "none"
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="main-btn" style={{ marginTop: "18px", maxWidth: "220px" }} onClick={() => handleSave("Marks")}>
            Save Marks
          </button>
        </div>
      )}

      {/* Announcements */}
      {tab === "Announcements" && (
        <div className="dashboard-card">
          <h3 style={{ marginBottom: "20px" }}>📢 Department Announcements</h3>
          {ANNOUNCEMENTS.map((a, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: i < ANNOUNCEMENTS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <span style={{ color: "var(--secondary)", fontSize: "0.82rem", fontWeight: "700" }}>{a.date}</span>
              <p style={{ color: "var(--muted)", marginTop: "4px", lineHeight: "1.65" }}>{a.text}</p>
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

export default TeacherDashboard;
