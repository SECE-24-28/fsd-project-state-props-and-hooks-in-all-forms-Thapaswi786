import React, { useState } from "react";
import "../assets/css/StudentDashboardcss.css";

function StudentDashboard({ studentName = "Student" }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { key: "overview", label: "Overview" },
    { key: "attendance", label: "Attendance" },
    { key: "courses", label: "Courses" },
    { key: "assignments", label: "Assignments" },
    { key: "timetable", label: "Timetable" },
    { key: "results", label: "Results" },
    { key: "fees", label: "Fees" },
    { key: "notices", label: "Notices" },
    { key: "profile", label: "Profile" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Attendance</h3>
                <p>91%</p>
                <span>Overall attendance this semester</span>
              </div>

              <div className="stat-card">
                <h3>CGPA</h3>
                <p>8.7</p>
                <span>Current academic performance</span>
              </div>

              <div className="stat-card">
                <h3>Pending Tasks</h3>
                <p>4</p>
                <span>Assignments and submissions</span>
              </div>

              <div className="stat-card">
                <h3>Fee Status</h3>
                <p>Paid</p>
                <span>Semester fee updated</span>
              </div>
            </div>

            <div className="content-grid">
              <div className="dashboard-card">
                <h3>Today’s Schedule</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Subject</th>
                      <th>Faculty</th>
                      <th>Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>09:00 AM</td>
                      <td>Data Structures</td>
                      <td>Dr. Kumar</td>
                      <td>CSE Lab 2</td>
                    </tr>
                    <tr>
                      <td>11:00 AM</td>
                      <td>Database Management</td>
                      <td>Prof. Devi</td>
                      <td>Room 204</td>
                    </tr>
                    <tr>
                      <td>02:00 PM</td>
                      <td>Operating Systems</td>
                      <td>Dr. Rajan</td>
                      <td>Room 307</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="dashboard-card">
                <h3>Recent Notices</h3>
                <ul>
                  <li>Mid-semester exams begin on 12 June.</li>
                  <li>Project review schedule has been published.</li>
                  <li>Library renewal deadline extended to Friday.</li>
                  <li>Internship orientation starts this week.</li>
                </ul>
              </div>
            </div>
          </>
        );

      case "attendance":
        return (
          <div className="dashboard-card">
            <h3>Attendance Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Classes Held</th>
                  <th>Present</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Structures</td>
                  <td>42</td>
                  <td>39</td>
                  <td>93%</td>
                </tr>
                <tr>
                  <td>DBMS</td>
                  <td>38</td>
                  <td>34</td>
                  <td>89%</td>
                </tr>
                <tr>
                  <td>Operating Systems</td>
                  <td>40</td>
                  <td>36</td>
                  <td>90%</td>
                </tr>
                <tr>
                  <td>Web Technology</td>
                  <td>35</td>
                  <td>31</td>
                  <td>88%</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "courses":
        return (
          <div className="dashboard-card">
            <h3>Registered Courses</h3>
            <div className="course-grid">
              <div className="course-card">
                <h4>Data Structures</h4>
                <p>Core algorithms, trees, graphs, and problem-solving methods.</p>
              </div>
              <div className="course-card">
                <h4>Database Management Systems</h4>
                <p>SQL, normalization, indexing, and transaction management.</p>
              </div>
              <div className="course-card">
                <h4>Operating Systems</h4>
                <p>Processes, memory management, scheduling, and file systems.</p>
              </div>
              <div className="course-card">
                <h4>Web Technology</h4>
                <p>Frontend, backend, and full-stack application fundamentals.</p>
              </div>
            </div>
          </div>
        );

      case "assignments":
        return (
          <div className="dashboard-card">
            <h3>Assignments</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Assignment</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DBMS</td>
                  <td>SQL Query Exercises</td>
                  <td>05 Jun 2026</td>
                  <td className="status pending">Pending</td>
                </tr>
                <tr>
                  <td>Operating Systems</td>
                  <td>CPU Scheduling Analysis</td>
                  <td>08 Jun 2026</td>
                  <td className="status pending">Pending</td>
                </tr>
                <tr>
                  <td>Web Technology</td>
                  <td>React Mini Project</td>
                  <td>12 Jun 2026</td>
                  <td className="status submitted">Submitted</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "timetable":
        return (
          <div className="dashboard-card">
            <h3>Weekly Timetable</h3>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>9-10</th>
                  <th>10-11</th>
                  <th>11-12</th>
                  <th>1-2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td>DS</td>
                  <td>DBMS</td>
                  <td>OS</td>
                  <td>Lab</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>WT</td>
                  <td>DS</td>
                  <td>Maths</td>
                  <td>Seminar</td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>DBMS</td>
                  <td>OS</td>
                  <td>WT</td>
                  <td>Lab</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>Maths</td>
                  <td>WT</td>
                  <td>DBMS</td>
                  <td>Project</td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>OS</td>
                  <td>DS</td>
                  <td>Seminar</td>
                  <td>Lab</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "results":
        return (
          <div className="dashboard-card">
            <h3>Results</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Internal</th>
                  <th>External</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data Structures</td>
                  <td>46/50</td>
                  <td>82/100</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>DBMS</td>
                  <td>44/50</td>
                  <td>79/100</td>
                  <td>A</td>
                </tr>
                <tr>
                  <td>Operating Systems</td>
                  <td>42/50</td>
                  <td>75/100</td>
                  <td>B+</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "fees":
        return (
          <div className="dashboard-card">
            <h3>Fee Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>Total Fee</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Semester 5</td>
                  <td>₹45,000</td>
                  <td>₹45,000</td>
                  <td>₹0</td>
                  <td className="status submitted">Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "notices":
        return (
          <div className="dashboard-card">
            <h3>Notices</h3>
            <ul>
              <li>Campus placement training starts next Monday.</li>
              <li>Semester hall ticket will be available from 10 June.</li>
              <li>Technical symposium paper submission closes this week.</li>
              <li>Department meeting scheduled for final-year students.</li>
            </ul>
          </div>
        );

      case "profile":
        return (
          <div className="dashboard-card">
            <h3>Student Profile</h3>
            <div className="profile-grid">
              <div className="profile-item">
                <span>Name</span>
                <strong>{studentName}</strong>
              </div>
              <div className="profile-item">
                <span>Register Number</span>
                <strong>HU2026CSE101</strong>
              </div>
              <div className="profile-item">
                <span>Department</span>
                <strong>Computer Science and Engineering</strong>
              </div>
              <div className="profile-item">
                <span>Year</span>
                <strong>III Year</strong>
              </div>
              <div className="profile-item">
                <span>Email</span>
                <strong>student@hogwartsuniversity.edu</strong>
              </div>
              <div className="profile-item">
                <span>Mentor</span>
                <strong>Faculty Advisor</strong>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="dashboard-card">
            <h3>No Data</h3>
            <p>No content available for this section.</p>
          </div>
        );
    }
  };

  return (
    <div className="student-dashboard">
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <aside className={`dashboard-sidebar ${sidebarOpen ? "show" : ""}`}>
        <div className="sidebar-header">
          <h2>Student Portal</h2>
          <p>Hogwarts University</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={activeTab === item.key ? "active" : ""}
              onClick={() => {
                setActiveTab(item.key);
                setSidebarOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <h1>Student Dashboard</h1>
            <p>Welcome back, {studentName}</p>
          </div>

          <div className="topbar-right">
            <input type="text" placeholder="Search..." />
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        <section className="dashboard-content">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;