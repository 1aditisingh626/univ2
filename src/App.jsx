import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Trophy,
  WalletCards,
  Library,
  BriefcaseBusiness,
  Megaphone,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Plus,
  Send,
  Moon,
  Sun,
  ShieldCheck,
  Building2,
  UserRound,
  Trash2,
  Upload,
  ChevronRight,
  TrendingUp,
  CircleDollarSign,
  Award,
  GraduationCap as GradIcon,
  UsersRound,
  School,
  Mail,
  ExternalLink,
  Download,
  RefreshCw,
  MoreHorizontal,
  Shield,
  UserPlus,
  UserMinus,
  Check,
  XCircle,
  UploadCloud,
  MapPin,
  CalendarClock,
  ChevronDown,
  Activity,
  Layers3,
  Database,
  Cpu,
  Laptop,
  Medal,
  Target,
  IndianRupee,
  FileSpreadsheet
} from "lucide-react";

const API =
  import.meta.env.VITE_API_URL ||
  (window.location.port === "5173" ? "http://127.0.0.1:8000" : "");


async function api(url, options = {}) {

  const response = await fetch(API + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {

    let message = "Something went wrong";

    try {
      const data = await response.json();
      message = data.detail || message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
}

// ============================================================
// LIVE DATE / TIME HELPERS
// ============================================================

function useLiveDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return now;
}

function getTodayName(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long"
  });
}

function getTodayDate(date = new Date()) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getLiveTime(date = new Date()) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
// ============================================================
// GLOBAL CSS
// ============================================================

const CSS = `
:root{
  --primary:#3157d5;--primary-2:#6b7cff;--primary-dark:#203aa7;--accent:#7c5cff;
  --bg:#f4f7fb;--card:rgba(255,255,255,.82);--card-solid:#fff;--text:#182033;--muted:#69758b;
  --border:rgba(28,44,82,.10);--success:#159a6c;--warning:#c98117;--danger:#d3485a;
  --sidebar:#0f172a;--shadow:0 14px 40px rgba(32,49,94,.09);--glass:blur(18px);
}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;width:100%}
body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:radial-gradient(circle at 10% 0%,#eaf0ff 0,#f4f7fb 32%,#f7f8fb 100%);}
button,input,select,textarea{font:inherit}button{cursor:pointer}
.app{min-height:100vh;display:flex;background:var(--bg);color:var(--text);transition:.25s}
.app.dark{--bg:#09111f;--card:rgba(16,25,43,.78);--card-solid:#10192b;--text:#eef3ff;--muted:#9ba9bf;--border:rgba(148,163,184,.15);--sidebar:#070d18;--shadow:0 18px 50px rgba(0,0,0,.25);background:radial-gradient(circle at 20% 0%,#142242 0,#09111f 38%,#070d16 100%)}
.sidebar{width:252px;background:linear-gradient(180deg,var(--sidebar),#17213a);color:white;position:fixed;inset:0 auto 0 0;z-index:50;padding:20px 13px;overflow-y:auto;box-shadow:10px 0 35px rgba(10,20,45,.13)}
.brand{display:flex;align-items:center;gap:11px;padding:8px 12px 24px}.brand-icon{width:40px;height:40px;border-radius:13px;background:linear-gradient(135deg,#4b6bff,#8b5cf6);display:grid;place-items:center;box-shadow:0 8px 22px rgba(78,98,255,.28)}.brand-title{font-size:18px;font-weight:850}.brand-sub{color:#9aa6bb;font-size:9px;margin-top:3px;letter-spacing:.11em}
.nav-section{color:#75829b;font-size:9px;text-transform:uppercase;letter-spacing:.14em;padding:14px 12px 8px}.nav-btn{width:100%;border:0;color:#aeb8cb;background:transparent;display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:11px;margin-bottom:4px;text-align:left;transition:.18s}.nav-btn svg{flex:none}.nav-btn:hover{background:rgba(255,255,255,.07);color:#fff;transform:translateX(2px)}.nav-btn.active{background:linear-gradient(135deg,#3557d9,#684fe5);color:#fff;box-shadow:0 9px 22px rgba(55,76,210,.22)}
.main{margin-left:252px;width:calc(100% - 252px);min-width:0}.topbar{height:72px;background:rgba(255,255,255,.78);backdrop-filter:var(--glass);-webkit-backdrop-filter:var(--glass);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 28px;position:sticky;top:0;z-index:30}.dark .topbar{background:rgba(8,15,28,.78)}.top-left{display:flex;align-items:center;gap:14px;min-width:0}.page-title{font-size:17px;font-weight:800;white-space:nowrap}.search{width:280px;border:1px solid var(--border);border-radius:12px;padding:9px 12px;outline:none;background:var(--card-solid);color:var(--text)}.top-actions{display:flex;align-items:center;gap:9px}.icon-btn{width:39px;height:39px;border:1px solid var(--border);border-radius:11px;background:var(--card-solid);color:var(--text);display:grid;place-items:center;transition:.18s}.icon-btn:hover{transform:translateY(-1px);box-shadow:0 7px 18px rgba(31,48,91,.10)}.profile-chip{display:flex;align-items:center;gap:9px;padding-left:5px}.avatar{width:37px;height:37px;border-radius:50%;background:linear-gradient(135deg,#dce5ff,#eee7ff);color:#3157d5;display:grid;place-items:center;font-weight:850}.content{padding:26px;max-width:1650px;margin:auto}.hero{border-radius:22px;background:linear-gradient(120deg,#1c2f79 0%,#3157d5 52%,#7259dc 100%);color:white;padding:30px;position:relative;overflow:hidden;box-shadow:0 18px 45px rgba(39,64,160,.22)}.hero:after{content:"";width:300px;height:300px;position:absolute;right:-90px;top:-120px;border-radius:50%;border:55px solid rgba(255,255,255,.08)}.hero:before{content:"";position:absolute;inset:auto -80px -130px auto;width:330px;height:220px;background:url('https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85') center/cover no-repeat;opacity:.26;transform:rotate(-5deg)}.hero h1{margin:0 0 7px;font-size:28px;position:relative;z-index:2}.hero p{margin:0;color:#dce5ff;position:relative;z-index:2}.hero-row{display:flex;justify-content:space-between;align-items:center;gap:20px}.hero-image{width:250px;height:130px;object-fit:cover;border-radius:18px;border:1px solid rgba(255,255,255,.2);box-shadow:0 14px 35px rgba(0,0,0,.16);position:relative;z-index:2}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-top:18px}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px}.grid-2{display:grid;grid-template-columns:1.3fr 1fr;gap:16px;margin-top:18px}.card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:var(--shadow);backdrop-filter:var(--glass);-webkit-backdrop-filter:var(--glass);transition:.2s}.card:hover{box-shadow:0 18px 48px rgba(31,48,91,.11);transform:translateY(-1px)}.dark .card:hover{box-shadow:0 18px 48px rgba(0,0,0,.25)}.metric{min-height:126px}.metric-top{display:flex;align-items:center;justify-content:space-between}.metric-icon{width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,#e8edff,#f0ebff);color:var(--primary);display:grid;place-items:center}.dark .metric-icon{background:rgba(89,110,255,.15)}.metric-value{font-size:27px;font-weight:850;margin-top:17px}.metric-label{color:var(--muted);font-size:12px}.section-title{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:15px}.section-title h2{font-size:16px;margin:0}.section-title span{color:var(--muted);font-size:12px}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;min-width:650px}th{text-align:left;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;padding:11px 8px;border-bottom:1px solid var(--border)}td{padding:12px 8px;border-bottom:1px solid var(--border);font-size:12px}.badge{display:inline-flex;align-items:center;gap:4px;border-radius:99px;padding:5px 9px;font-size:10px;font-weight:800}.badge.green{color:#126c4a;background:#e4f7ef}.badge.orange{color:#965d0a;background:#fff3dc}.badge.red{color:#a72e3d;background:#fde8eb}.badge.blue{color:#244dbf;background:#e8edff}.dark .badge.green{background:rgba(21,154,108,.15);color:#72e0b6}.dark .badge.blue{background:rgba(74,103,255,.15);color:#9eafff}.dark .badge.orange{background:rgba(201,129,23,.16);color:#ffc76e}.progress{height:8px;background:rgba(128,145,174,.14);border-radius:99px;overflow:hidden}.progress>div{height:100%;background:linear-gradient(90deg,#4a67ef,#7c5cff);border-radius:inherit}.notice{padding:13px 0;border-bottom:1px solid var(--border)}.notice:last-child{border-bottom:0}.notice-title{font-weight:750;font-size:13px}.notice-text{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.5}.btn{border:0;border-radius:10px;padding:9px 13px;font-weight:750;font-size:11px;display:inline-flex;align-items:center;justify-content:center;gap:7px;transition:.18s}.btn:hover{transform:translateY(-1px)}.btn.primary{background:linear-gradient(135deg,#3157d5,#6958df);color:white;box-shadow:0 8px 20px rgba(49,87,213,.18)}.btn.secondary{background:rgba(113,132,170,.12);color:var(--text)}.btn.danger{background:#fde9ed;color:#ad3041}.btn.success{background:#e4f7ef;color:#126c4a}.actions{display:flex;gap:7px;flex-wrap:wrap}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:13px}.field{display:flex;flex-direction:column;gap:6px}.field.full{grid-column:1/-1}.field label{font-size:10px;font-weight:800;color:var(--muted)}.field input,.field select,.field textarea{border:1px solid var(--border);border-radius:10px;padding:10px 11px;outline:none;background:var(--card-solid);color:var(--text)}.field textarea{min-height:90px;resize:vertical}.modal-backdrop{position:fixed;inset:0;background:rgba(6,12,25,.58);backdrop-filter:blur(6px);z-index:100;display:grid;place-items:center;padding:20px}.modal{width:min(680px,100%);max-height:90vh;overflow-y:auto;background:var(--card-solid);color:var(--text);border:1px solid var(--border);border-radius:20px;padding:22px;box-shadow:0 25px 80px rgba(0,0,0,.25)}.modal-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.modal-head h2{margin:0;font-size:18px}.close{border:0;background:rgba(113,132,170,.12);color:var(--text);width:34px;height:34px;border-radius:9px;display:grid;place-items:center}.chart{height:205px;display:flex;align-items:flex-end;gap:12px;padding-top:28px}.bar{flex:1;background:linear-gradient(180deg,#7587ff,#3157d5);border-radius:8px 8px 2px 2px;position:relative;min-width:18px;box-shadow:0 7px 16px rgba(49,87,213,.15)}.bar:nth-child(3n){background:linear-gradient(180deg,#9a82ff,#6958df)}.bar:nth-child(4n){background:linear-gradient(180deg,#62c7b1,#159a6c)}.bar span{position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:10px;color:var(--muted)}.chart-labels{display:flex;gap:12px}.chart-labels div{flex:1;text-align:center;color:var(--muted);font-size:10px}.login{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;background:radial-gradient(circle at 10% 10%,#dfe8ff,#f5f7fb 45%,#f7f8fb)}.login-brand{background:linear-gradient(145deg,#101a3b,#3157d5 56%,#7259dc);color:white;padding:65px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden}.login-brand:after{content:"";position:absolute;inset:auto -50px -100px auto;width:480px;height:300px;background:url('https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85') center/cover no-repeat;opacity:.28}.login-brand h1{font-size:52px;line-height:1.02;margin:20px 0 10px;position:relative;z-index:2}.login-brand p{max-width:560px;color:#dce4ff;line-height:1.7;position:relative;z-index:2}.login-campus{width:340px;height:160px;object-fit:cover;border-radius:20px;border:1px solid rgba(255,255,255,.18);margin-top:22px;box-shadow:0 20px 45px rgba(0,0,0,.16);position:relative;z-index:2}.login-card{display:flex;align-items:center;justify-content:center;padding:30px}.login-box{width:min(450px,100%);background:rgba(255,255,255,.86);border:1px solid rgba(255,255,255,.8);border-radius:22px;padding:30px;box-shadow:0 22px 70px rgba(20,30,60,.12);backdrop-filter:blur(18px)}.login-box h2{margin-top:0}.demo{display:grid;gap:7px;margin-top:18px}.demo button{border:1px solid var(--border);background:#fafbfe;color:#27324a;border-radius:10px;padding:9px;text-align:left;font-size:11px;transition:.18s}.demo button:hover{background:#eef2ff;transform:translateX(2px)}.gmail-pill{display:flex;align-items:center;gap:8px;padding:9px 11px;background:#fff5f3;border:1px solid #ffd8d0;border-radius:11px;color:#9c3b2d;font-size:11px}.toast{position:fixed;right:22px;bottom:22px;background:#172033;color:white;padding:12px 16px;border-radius:12px;z-index:200;box-shadow:0 10px 35px rgba(0,0,0,.2);display:flex;gap:8px;align-items:center}.mobile-menu{display:none}.empty{padding:30px;text-align:center;color:var(--muted)}.campus-card{display:flex;gap:16px;align-items:center}.campus-card img{width:150px;height:100px;object-fit:cover;border-radius:14px}.leader-row{display:grid;grid-template-columns:38px 1fr auto;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}.rank{width:30px;height:30px;border-radius:10px;background:linear-gradient(135deg,#eef2ff,#efe9ff);color:#3157d5;display:grid;place-items:center;font-weight:850}.small-muted{font-size:11px;color:var(--muted)}.stat-strip{display:flex;gap:9px;flex-wrap:wrap}.stat-pill{padding:8px 10px;border:1px solid var(--border);border-radius:11px;background:rgba(120,140,180,.06);font-size:11px}.clickable{cursor:pointer}.drive-card{position:relative;overflow:hidden}.drive-card:after{content:"";position:absolute;right:-45px;top:-45px;width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,rgba(80,100,255,.13),rgba(124,92,255,.08))}.icon-tile{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(135deg,#e9eeff,#f0ebff);color:#3157d5}.dark .icon-tile{background:rgba(88,105,255,.14)}
@media(max-width:1150px){.grid-4{grid-template-columns:repeat(2,1fr)}.grid-3{grid-template-columns:repeat(2,1fr)}.search{width:210px}}
@media(max-width:800px){.sidebar{transform:translateX(-100%);transition:.25s}.sidebar.open{transform:translateX(0)}.main{margin-left:0;width:100%}.mobile-menu{display:grid}.search{display:none}.content{padding:16px}.grid-4,.grid-3,.grid-2,.form-grid{grid-template-columns:1fr}.hero-row{align-items:flex-start}.hero-image{display:none}.login{grid-template-columns:1fr}.login-brand{display:none}.topbar{padding:0 13px}.page-title{font-size:14px}.top-actions{gap:5px}.profile-chip{display:none}.card{padding:16px}.campus-card{align-items:flex-start}.campus-card img{width:105px;height:80px}.login-box{padding:22px}}
`;



function Style() {
  return <style>{CSS}</style>;
}


// ============================================================
// LOGIN
// ============================================================

function Login({ onLogin }) {

  const [email, setEmail] = useState("nikki@unisphere.edu");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  async function submit(e) {

    e.preventDefault();

    try {

      const user = await api("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });

      onLogin(user);

    } catch (err) {

      setError(err.message);
    }
  }

  function demo(email) {
    setEmail(email);
    setPassword("1234");
    setError("");
  }

  return (
    <>
      <Style />

      <div className="login">

        <div className="login-brand">

          <div className="brand">

            <div className="brand-icon">
              <GraduationCap size={22} />
            </div>

            <div>
              <div className="brand-title">
                UniSphere
              </div>

              <div className="brand-sub">
                UNIVERSITY MANAGEMENT SYSTEM
              </div>
            </div>

          </div>

          <h1>
            One campus.
            <br />
            One connected system.
          </h1>

          <p>
            A realistic academic management platform connecting
            students, faculty and university administration through
            one shared database.
          </p>

          <img className="login-campus" src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85" alt="UniSphere campus" />

        </div>


        <div className="login-card">

          <form
            className="login-box"
            onSubmit={submit}
          >

            <h2>
              Sign in
            </h2>

            <p style={{
              color:"var(--muted)",
              fontSize:13
            }}>
              Access your UniSphere workspace.
            </p>

            <div className="gmail-pill">
              <Mail size={14} /> University accounts can use Gmail-style demo addresses too.
            </div>

            <div className="form-grid">

              <div className="field full">

                <label>
                  UNIVERSITY EMAIL
                </label>

                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@unisphere.edu"
                />

              </div>

              <div className="field full">

                <label>
                  PASSWORD
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

              </div>

            </div>

            {error && (
              <div style={{
                color:"var(--danger)",
                fontSize:12,
                margin:"12px 0"
              }}>
                {error}
              </div>
            )}

            <button
              className="btn primary"
              style={{
                width:"100%",
                marginTop:14,
                padding:12
              }}
            >
              Sign in
            </button>


            <div className="demo">

              <small style={{
                color:"var(--muted)"
              }}>
                Demo accounts
              </small>

              <button
                type="button"
                onClick={() => demo("nikki@unisphere.edu")}
              >
                👩‍🎓 Student — Nikki
              </button>

              <button
                type="button"
                onClick={() => demo("priya@unisphere.edu")}
              >
                👩‍🏫 Faculty — Prof. Priya
              </button>

              <button
                type="button"
                onClick={() => demo("admin@unisphere.edu")}
              >
                🛡 Admin — System Administrator
              </button>

            </div>

          </form>

        </div>

      </div>
    </>
  );
}


// ============================================================
// NAVIGATION
// ============================================================

const STUDENT_NAV = [
  ["Dashboard", LayoutDashboard],
  ["Academics", BookOpen],
  ["Attendance", ClipboardCheck],
  ["Assignments", FileText],
  ["Results", Trophy],
  ["Fees", WalletCards],
  ["Library", Library],
  ["Placements", BriefcaseBusiness],
  ["Timetable", CalendarDays],
  ["Notices", Megaphone],
  ["Leaderboard", Trophy],
  ["Campus", School]
];

const FACULTY_NAV = [
  ["Dashboard", LayoutDashboard],
  ["My Classes", Users],
  ["Attendance", ClipboardCheck],
  ["Assignments", FileText],
  ["Grading", Award],
  ["Students", GraduationCap],
  ["Timetable", CalendarDays],
  ["Notices", Megaphone],
  ["Leaderboard", Medal],
  ["Results", UploadCloud]
];

const ADMIN_NAV = [
  ["Dashboard", LayoutDashboard],
  ["Students", GraduationCap],
  ["Faculty", Users],
  ["Departments", Building2],
  ["Fees", WalletCards],
  ["Results", Trophy],
  ["Placements", BriefcaseBusiness],
  ["Notices", Megaphone],
  ["Reports", BarChart3],
  ["Settings", Settings],
  ["Attendance Control", ClipboardCheck],
  ["Leaderboard", Trophy],
  ["Campus & Departments", School]
];


function Sidebar({
  user,
  active,
  setActive,
  open,
  setOpen
}) {

  const nav =
    user.role === "student"
      ? STUDENT_NAV
      : user.role === "faculty"
      ? FACULTY_NAV
      : ADMIN_NAV;

  return (
    <aside className={"sidebar " + (open ? "open" : "")}>

      <div className="brand">

        <div className="brand-icon">
          <GraduationCap size={22} />
        </div>

        <div>
          <div className="brand-title">
            UniSphere
          </div>

          <div className="brand-sub">
            {user.role.toUpperCase()} PORTAL
          </div>
        </div>

      </div>


      <div className="nav-section">
        Workspace
      </div>

      {nav.map(([name, Icon]) => (

        <button
          key={name}
          className={
            "nav-btn " +
            (active === name ? "active" : "")
          }
          onClick={() => {
            setActive(name);
            setOpen(false);
          }}
        >

          <Icon size={17} />

          <span>{name}</span>

        </button>

      ))}

    </aside>
  );
}

// ============================================================
// TOPBAR
// ============================================================

function Topbar({
  user,
  onLogout,
  dark,
  setDark,
  setOpen,
  state,
  onNavigate
}) {

  const now = useLiveDateTime();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notices = state?.notices || [];
  const assignments = state?.assignments || [];

  const searchResults = useMemo(() => {

    const q = query.trim().toLowerCase();

    if (!q) return [];

    const results = [];

    notices.forEach(n => {

      const text =
        `${n.title || ""} ${n.body || ""} ${n.category || ""}`
          .toLowerCase();

      if (text.includes(q)) {
        results.push({
          type: "Notice",
          title: n.title,
          subtitle: n.category || "University notice",
          page: "Notices"
        });
      }

    });

    assignments.forEach(a => {

      const text =
        `${a.title || ""} ${a.subject || ""} ${a.description || ""}`
          .toLowerCase();

      if (text.includes(q)) {
        results.push({
          type: "Assignment",
          title: a.title,
          subtitle: `${a.subject || "Subject"} • Due ${a.due_date || "—"}`,
          page: "Assignments"
        });
      }

    });

    (state?.users || []).forEach(u => {

      const text =
        `${u.name || ""} ${u.email || ""} ${u.department || ""}`
          .toLowerCase();

      if (text.includes(q)) {

        results.push({
          type: u.role === "faculty" ? "Faculty" : "Student",
          title: u.name,
          subtitle: `${u.department || ""} • ${u.email || ""}`,
          page: u.role === "faculty"
            ? "My Classes"
            : "Students"
        });

      }

    });

    return results.slice(0, 8);

  }, [query, notices, assignments, state?.users]);

  const notifications = useMemo(() => {

    const list = [];

    notices.slice(0, 4).forEach(n => {

      list.push({
        id: `notice-${n.id}`,
        icon: <Megaphone size={15} />,
        title: n.title,
        text: n.body || "New university notice",
        page: "Notices"
      });

    });

    assignments.slice(0, 4).forEach(a => {

      list.push({
        id: `assignment-${a.id}`,
        icon: <FileText size={15} />,
        title: "Assignment",
        text: `${a.title} • Due ${a.due_date}`,
        page: "Assignments"
      });

    });

    return list.slice(0, 6);

  }, [notices, assignments]);

  function goTo(page) {

    setSearchOpen(false);
    setNotificationsOpen(false);
    setQuery("");

    if (onNavigate) {
      onNavigate(page);
    }
  }

  return (
    <header
      className="topbar"
      style={{
        position: "relative"
      }}
    >

      <div className="top-left">

        <button
          className="icon-btn mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          <Menu size={18} />
        </button>

        <div className="page-title">
          UniSphere University
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "var(--muted)",
            fontSize: 11
          }}
        >
          <CalendarDays size={14} />

          <span>
            {getTodayDate(now)}
          </span>

          <span>•</span>

          <span>
            {getLiveTime(now)}
          </span>
        </div>

      </div>


      <div className="top-actions">

        {/* SEARCH */}

        <div style={{ position: "relative" }}>

          {searchOpen && (

            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search portal..."
              style={{
                position: "absolute",
                right: 0,
                top: 47,
                width: 310,
                padding: "11px 13px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--card-solid)",
                color: "var(--text)",
                outline: "none",
                boxShadow: "0 15px 40px rgba(20,30,60,.16)",
                zIndex: 100
              }}
            />

          )}

          <button
            className="icon-btn"
            title="Search"
            onClick={() => {
              setSearchOpen(v => !v);
              setNotificationsOpen(false);
            }}
          >
            <Search size={17} />
          </button>

          {searchOpen && query && (

            <div
              style={{
                position: "absolute",
                right: 0,
                top: 92,
                width: 360,
                maxHeight: 390,
                overflowY: "auto",
                background: "var(--card-solid)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                boxShadow: "0 20px 50px rgba(20,30,60,.18)",
                zIndex: 100
              }}
            >

              {searchResults.length === 0 ? (

                <div className="empty">
                  No results found for "{query}"
                </div>

              ) : (

                searchResults.map((result, index) => (

                  <button
                    key={`${result.type}-${index}`}
                    onClick={() => goTo(result.page)}
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      color: "var(--text)",
                      padding: "12px 14px",
                      textAlign: "left",
                      borderBottom:
                        "1px solid var(--border)"
                    }}
                  >

                    <div
                      style={{
                        fontSize: 10,
                        color: "var(--primary)",
                        fontWeight: 800,
                        marginBottom: 3
                      }}
                    >
                      {result.type}
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 750
                      }}
                    >
                      {result.title}
                    </div>

                    <div className="small-muted">
                      {result.subtitle}
                    </div>

                  </button>

                ))

              )}

            </div>

          )}

        </div>


        {/* NOTIFICATIONS */}

        <div style={{ position: "relative" }}>

          <button
            className="icon-btn"
            title="Notifications"
            onClick={() => {
              setNotificationsOpen(v => !v);
              setSearchOpen(false);
            }}
          >

            <Bell size={17} />

            {notifications.length > 0 && (

              <span
                style={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  minWidth: 17,
                  height: 17,
                  padding: "0 4px",
                  borderRadius: 99,
                  background: "var(--danger)",
                  color: "white",
                  fontSize: 9,
                  fontWeight: 800,
                  display: "grid",
                  placeItems: "center"
                }}
              >
                {notifications.length}
              </span>

            )}

          </button>


          {notificationsOpen && (

            <div
              style={{
                position: "absolute",
                right: 0,
                top: 48,
                width: 360,
                maxHeight: 430,
                overflowY: "auto",
                background: "var(--card-solid)",
                border: "1px solid var(--border)",
                borderRadius: 15,
                boxShadow: "0 20px 50px rgba(20,30,60,.18)",
                zIndex: 100
              }}
            >

              <div
                style={{
                  padding: "15px 16px",
                  borderBottom: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >

                <b>Notifications</b>

                <span className="badge blue">
                  {notifications.length} new
                </span>

              </div>


              {notifications.length === 0 ? (

                <div className="empty">
                  You're all caught up 🎉
                </div>

              ) : (

                notifications.map(n => (

                  <button
                    key={n.id}
                    onClick={() => goTo(n.page)}
                    style={{
                      width: "100%",
                      border: 0,
                      background: "transparent",
                      color: "var(--text)",
                      padding: "13px 15px",
                      display: "flex",
                      gap: 11,
                      textAlign: "left",
                      borderBottom:
                        "1px solid var(--border)"
                    }}
                  >

                    <div className="icon-tile">
                      {n.icon}
                    </div>

                    <div>

                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800
                        }}
                      >
                        {n.title}
                      </div>

                      <div
                        className="small-muted"
                        style={{
                          marginTop: 3
                        }}
                      >
                        {n.text}
                      </div>

                    </div>

                  </button>

                ))

              )}

            </div>

          )}

        </div>


        {/* DARK MODE */}

        <button
          className="icon-btn"
          onClick={() => setDark(v => !v)}
        >
          {dark
            ? <Sun size={17} />
            : <Moon size={17} />
          }
        </button>


        {/* PROFILE */}

        <div className="profile-chip">

          <div className="avatar">
            {user.name
              .split(" ")
              .map(x => x[0])
              .slice(0, 2)
              .join("")
            }
          </div>

        </div>


        {/* LOGOUT */}

        <button
          className="icon-btn"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={17} />
        </button>

      </div>

    </header>
  );
}

// ============================================================
// METRIC
// ============================================================

function Metric({
  icon: Icon,
  label,
  value,
  note
}) {

  return (
    <div className="card metric">

      <div className="metric-top">

        <div className="metric-icon">
          <Icon size={19} />
        </div>

        {note && (
          <span className="badge green">
            {note}
          </span>
        )}

      </div>

      <div className="metric-value">
        {value}
      </div>

      <div className="metric-label">
        {label}
      </div>

    </div>
  );
}
// ============================================================
// STUDENT DASHBOARD
// ============================================================

function StudentDashboard({
  user,
  state,
  attendance
}) {

  // ------------------------------------------------------------
  // LIVE DATE / TIME
  // ------------------------------------------------------------

  const now = useLiveDateTime();

  const todayName =
    getTodayName(now);

  const todayDate =
    getTodayDate(now);


  // Local YYYY-MM-DD
  const todayISO =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;


  // ------------------------------------------------------------
  // SAFE DATA
  // ------------------------------------------------------------

  const myAssignments =
    state.assignments || [];


  const myResults =
    (state.results || []).filter(
      r =>
        Number(r.student_id) ===
        Number(user.id)
    );


  const mySubmissions =
    (state.submissions || []).filter(
      s =>
        Number(s.student_id) ===
        Number(user.id)
    );


  // ------------------------------------------------------------
  // AVERAGE MARKS
  // ------------------------------------------------------------

  const avg =
    myResults.length

      ? (
          myResults.reduce(
            (sum, r) =>
              sum +
              Number(r.total || 0),
            0
          ) /
          myResults.length
        ).toFixed(1)

      : "—";


  // ------------------------------------------------------------
  // OVERALL ATTENDANCE
  // ------------------------------------------------------------

  const overallAttendance =
    attendance && attendance.length

      ? (
          attendance.reduce(
            (sum, a) =>
              sum +
              Number(a.percentage || 0),
            0
          ) /
          attendance.length
        ).toFixed(1)

      : "—";


  // ------------------------------------------------------------
  // TODAY'S ATTENDANCE
  // ------------------------------------------------------------

  const todayAttendance =
    (state.attendance || []).filter(record => {

      return (
        Number(record.student_id) ===
          Number(user.id) &&

        String(record.date).slice(0, 10) ===
          todayISO
      );

    });


  const presentToday =
    todayAttendance.filter(
      record =>
        record.present === true
    ).length;


  const absentToday =
    todayAttendance.filter(
      record =>
        record.present === false
    ).length;


  const totalToday =
    todayAttendance.length;


  const todayAttendancePercentage =
    totalToday > 0

      ? Math.round(
          (presentToday /
            totalToday) *
            100
        )

      : null;


  // ------------------------------------------------------------
  // TODAY'S TIMETABLE
  // ------------------------------------------------------------

  const todayTimetable =
    (state.timetable || [])

      .filter(item => {

        const sameDay =
          String(item.day || "")
            .toLowerCase() ===
          todayName.toLowerCase();


        const sameClass =
          !item.class_year ||
          !user.class_year ||
          String(item.class_year)
            .trim() ===
          String(user.class_year)
            .trim();


        return (
          sameDay &&
          sameClass
        );

      })

      .sort((a, b) => {

        return String(
          a.start_time || ""
        ).localeCompare(
          String(
            b.start_time || ""
          )
        );

      })

      .slice(0, 4);


  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------

  return (

    <>

      {/* ======================================================
          HERO
      ====================================================== */}

      <div className="hero">

        <h1>
          Good morning,{" "}
          {user.name.split(" ")[0]} 👋
        </h1>

        <p>
          {user.class_year}
          {" "}
          {user.department}
          {" • "}
          Semester V
          {" • "}
          {user.roll_no}
        </p>


        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            color: "#dce5ff",
            fontSize: 12
          }}
        >

          <span>
            📅 {todayName}, {todayDate}
          </span>

          <span>
            •
          </span>

          <span>
            🕒 {getLiveTime(now)}
          </span>

        </div>

      </div>


      {/* ======================================================
          METRICS
      ====================================================== */}

      <div className="grid-4">

        <Metric
          icon={ClipboardCheck}
          label="Overall Attendance"
          value={
            overallAttendance === "—"
              ? "—"
              : `${overallAttendance}%`
          }
          note={
            overallAttendance === "—"
              ? "No data"
              : Number(overallAttendance) >= 75
                ? "Good"
                : "Low"
          }
        />


        <Metric
          icon={Trophy}
          label="Average Marks"
          value={
            avg === "—"
              ? "—"
              : `${avg}%`
          }
          note="Semester"
        />


        <Metric
          icon={BookOpen}
          label="Active Subjects"
          value="4"
          note="Current"
        />


        <Metric
          icon={WalletCards}
          label="Pending Fees"
          value="₹12,500"
          note="Due"
        />

      </div>


      {/* ======================================================
          TIMETABLE + NOTICES
      ====================================================== */}

      <div className="grid-2">

        {/* TODAY'S TIMETABLE */}

        <div className="card">

          <div className="section-title">

            <div>

              <h2>
                Today's Timetable
              </h2>

              <span
                style={{
                  display: "block",
                  marginTop: 4
                }}
              >
                {todayName}, {todayDate}
              </span>

            </div>

            <span>
              {user.class_year ||
                "Current Class"}
            </span>

          </div>


          {todayTimetable.length > 0 ? (

            todayTimetable.map(item => (

              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 13,
                  padding: "13px 0",
                  borderBottom:
                    "1px solid var(--border)"
                }}
              >

                <div
                  style={{
                    width: 70,
                    fontWeight: 800,
                    fontSize: 12
                  }}
                >

                  {item.start_time}

                  {item.end_time && (

                    <div
                      style={{
                        color:
                          "var(--muted)",
                        fontSize: 10,
                        marginTop: 3
                      }}
                    >
                      {item.end_time}
                    </div>

                  )}

                </div>


                <div>

                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13
                    }}
                  >
                    {item.subject}
                  </div>

                  <div
                    style={{
                      color:
                        "var(--muted)",
                      fontSize: 11,
                      marginTop: 3
                    }}
                  >
                    {item.faculty}
                    {" • "}
                    {item.room}
                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="empty">

              <div
                style={{
                  fontSize: 28,
                  marginBottom: 8
                }}
              >
                📚
              </div>

              <b>
                No classes today
              </b>

              <div
                style={{
                  fontSize: 11,
                  marginTop: 5
                }}
              >
                Enjoy your day! 🎉
              </div>

            </div>

          )}

        </div>


        {/* NOTICES */}

        <NoticeCard
          notices={
            (state.notices || [])
              .slice(0, 4)
          }
        />

      </div>


      {/* ======================================================
          TODAY'S ATTENDANCE + PERFORMANCE
      ====================================================== */}

      <div className="grid-2">

        {/* TODAY'S ATTENDANCE */}

        <div className="card">

          <div className="section-title">

            <div>

              <h2>
                Today's Attendance
              </h2>

              <span
                style={{
                  display: "block",
                  marginTop: 4
                }}
              >
                {todayName}, {todayDate}
              </span>

            </div>


            {todayAttendancePercentage !==
              null && (

              <span
                className={
                  todayAttendancePercentage >= 75
                    ? "badge green"
                    : "badge orange"
                }
              >
                {todayAttendancePercentage}%
              </span>

            )}

          </div>


          {totalToday > 0 ? (

            <>

              {/* SUMMARY */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3,1fr)",
                  gap: 10,
                  marginBottom: 15
                }}
              >

                <div
                  className="stat-pill"
                  style={{
                    textAlign: "center",
                    padding: 14
                  }}
                >
                  <b
                    style={{
                      display: "block",
                      fontSize: 22
                    }}
                  >
                    {presentToday}
                  </b>

                  Present
                </div>


                <div
                  className="stat-pill"
                  style={{
                    textAlign: "center",
                    padding: 14
                  }}
                >
                  <b
                    style={{
                      display: "block",
                      fontSize: 22
                    }}
                  >
                    {absentToday}
                  </b>

                  Absent
                </div>


                <div
                  className="stat-pill"
                  style={{
                    textAlign: "center",
                    padding: 14
                  }}
                >
                  <b
                    style={{
                      display: "block",
                      fontSize: 22
                    }}
                  >
                    {totalToday}
                  </b>

                  Classes
                </div>

              </div>


              {/* SUBJECT STATUS */}

              {todayAttendance.map(record => (

                <div
                  key={record.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    padding: "11px 0",
                    borderBottom:
                      "1px solid var(--border)"
                  }}
                >

                  <div>

                    <b
                      style={{
                        fontSize: 12
                      }}
                    >
                      {record.subject}
                    </b>

                    <div
                      className="small-muted"
                    >
                      {record.date}
                    </div>

                  </div>


                  <span
                    className={
                      record.present
                        ? "badge green"
                        : "badge red"
                    }
                  >

                    {record.present
                      ? "✓ Marked Present"
                      : "✕ Marked Absent"}

                  </span>

                </div>

              ))}

            </>

          ) : (

            <div className="empty">

              <div
                style={{
                  fontSize: 28,
                  marginBottom: 8
                }}
              >
                📝
              </div>

              <b>
                Attendance not marked yet
              </b>

              <div
                style={{
                  fontSize: 11,
                  marginTop: 5
                }}
              >
                Your attendance will appear
                here once faculty marks it.
              </div>

            </div>

          )}

        </div>


        {/* ACADEMIC PERFORMANCE */}

        <div className="card">

          <div className="section-title">

            <h2>
              Academic Performance
            </h2>

            <span>
              Current semester
            </span>

          </div>


          {myResults.length > 0 ? (

            <>

              <div className="chart">

                {myResults.map(result => (

                  <div
                    key={result.id}
                    className="bar"
                    style={{
                      height:
                        `${Math.max(
                          Number(
                            result.total || 0
                          ),
                          15
                        )}%`
                    }}
                  >

                    <span>
                      {result.total}
                    </span>

                  </div>

                ))}

              </div>


              <div className="chart-labels">

                {myResults.map(result => (

                  <div
                    key={result.id}
                  >
                    {String(
                      result.subject || ""
                    ).split(" ")[0]}
                  </div>

                ))}

              </div>

            </>

          ) : (

            <div className="empty">
              No academic results available yet.
            </div>

          )}

        </div>

      </div>


      {/* ======================================================
          ASSIGNMENT STATUS
      ====================================================== */}

      <div className="card">

        <div className="section-title">

          <h2>
            Assignment Status
          </h2>

          <span>
            {myAssignments.length} active
          </span>

        </div>


        {myAssignments.length > 0 ? (

          myAssignments
            .slice(0, 4)
            .map(assignment => {

              const submitted =
                mySubmissions.some(
                  submission =>
                    Number(
                      submission.assignment_id
                    ) ===
                    Number(assignment.id)
                );


              return (

                <div
                  key={assignment.id}
                  style={{
                    padding: "12px 0",
                    borderBottom:
                      "1px solid var(--border)"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: 10
                    }}
                  >

                    <div>

                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 13
                        }}
                      >
                        {assignment.title}
                      </div>

                      <div
                        className="small-muted"
                        style={{
                          marginTop: 3
                        }}
                      >
                        {assignment.subject}
                        {" • "}
                        Due{" "}
                        {assignment.due_date}
                      </div>

                    </div>


                    <span
                      className={
                        submitted
                          ? "badge green"
                          : "badge orange"
                      }
                    >

                      {submitted
                        ? "Submitted"
                        : "Pending"}

                    </span>

                  </div>

                </div>

              );

            })

        ) : (

          <div className="empty">
            No active assignments.
          </div>

        )}

      </div>

    </>
  );
}
// ============================================================
// NOTICE
// ============================================================

function NoticeCard({ notices }) {

  return (
    <div className="card">

      <div className="section-title">

        <h2>
          Announcements
        </h2>

        <span>
          Live
        </span>

      </div>

      {notices.map(n => (

        <div
          className="notice"
          key={n.id}
        >

          <div className="notice-title">
            {n.title}
          </div>

          <div className="notice-text">
            {n.body}
          </div>

          <div style={{
            marginTop:7
          }}>
            <span className="badge blue">
              {n.category}
            </span>
          </div>

        </div>

      ))}

    </div>
  );
}


// ============================================================
// STUDENT ACADEMICS
// ============================================================

function Academics({ state, user }) {

  const subjects = [
    ["CS501","Database Management Systems","Prof. Priya Mehta"],
    ["CS502","Java Programming","Prof. Rajesh Sharma"],
    ["CS503","Data Structures","Prof. Priya Mehta"],
    ["CS504","Web Technology","Prof. Rajesh Sharma"]
  ];

  return (
    <>

      <div className="hero">

        <h1>
          Academics
        </h1>

        <p>
          Semester V • {user?.department || "University Academics"}
        </p>

      </div>


      <div className="card" style={{marginTop:18}}>
        <div className="section-title">
          <div>
            <h2>Department Faculty</h2>
            <span>Faculty members from your department</span>
          </div>
          <span className="badge blue">{state.users.filter(u => u.role === "faculty" && u.department === user?.department).length} faculty</span>
        </div>
        <div className="grid-3">
          {state.users.filter(u => u.role === "faculty" && u.department === user?.department).map(f => (
            <div className="card" key={f.id} style={{padding:15}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div className="avatar">{(f.name || "F").replace("Prof. ","").slice(0,1)}</div>
                <div>
                  <b>{f.name}</b>
                  <div className="small-muted">{f.employee_id} • {f.email}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">

        {subjects.map(s => (

          <div className="card" key={s[0]}>

            <div style={{
              display:"flex",
              justifyContent:"space-between"
            }}>

              <div>

                <div style={{
                  color:"var(--primary)",
                  fontSize:11,
                  fontWeight:800
                }}>
                  {s[0]}
                </div>

                <h3 style={{
                  margin:"7px 0"
                }}>
                  {s[1]}
                </h3>

                <div style={{
                  color:"var(--muted)",
                  fontSize:12
                }}>
                  {s[2]}
                </div>

              </div>

              <BookOpen size={22} />

            </div>

            <div style={{
              marginTop:18
            }}>

              <div style={{
                display:"flex",
                justifyContent:"space-between",
                fontSize:11,
                marginBottom:6
              }}>
                <span>Syllabus progress</span>
                <b>72%</b>
              </div>

              <div className="progress">
                <div style={{
                  width:"72%"
                }} />
              </div>

            </div>

          </div>

        ))}

      </div>

    </>
  );
}

function AttendancePage({
  user,
  attendance,
  refresh
}) {

  async function mark(subject, present) {
    try {
      await api("/api/attendance", {
        method: "POST",
        body: JSON.stringify({
          student_id: Number(user.id),
          subject,
          present,
          date:
            `${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
            ).padStart(2, "0")}-${String(
            new Date().getDate()
            ).padStart(2, "0")}`
        })
      });

      await refresh();
    } catch (err) {
      alert(err.message || "Unable to update attendance.");
    }
  }

  return (
    <>
      <div className="hero">
        <h1>Attendance</h1>
        <p>
          View your attendance and simulate today's class attendance.
        </p>
      </div>

      <div className="grid-2">

        {(attendance || []).map(a => (

          <div className="card" key={a.subject}>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 15
            }}>

              <div>
                <div style={{
                  fontWeight: 800
                }}>
                  {a.subject}
                </div>

                <div className="small-muted" style={{
                  marginTop: 5
                }}>
                  {a.present_classes} / {a.total_classes} classes attended
                </div>
              </div>

              <strong style={{
                color:
                  Number(a.percentage) >= 75
                    ? "var(--success)"
                    : "var(--danger)",
                fontSize: 22
              }}>
                {a.percentage}%
              </strong>

            </div>

            <div style={{
              margin: "15px 0"
            }}>
              <div className="progress">
                <div style={{
                  width: `${Math.min(100, Number(a.percentage) || 0)}%`
                }} />
              </div>
            </div>

            <div className="actions">

              <button
                className="btn success"
                onClick={() => mark(a.subject, true)}
              >
                <Check size={13} />
                Simulate Present
              </button>

              <button
                className="btn danger"
                onClick={() => mark(a.subject, false)}
              >
                <XCircle size={13} />
                Simulate Absent
              </button>

            </div>

          </div>

        ))}

      </div>

      {!attendance?.length && (
        <div className="card" style={{ marginTop: 18 }}>
          <div className="empty">
            No attendance records available.
          </div>
        </div>
      )}
    </>
  );
}
function Assignments({
  user,
  state,
  refresh
}) {

  const myAssignments = state.assignments || [];

  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploading, setUploading] = useState(null);

  function selectFile(assignmentId, file) {

    if (!file) return;

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be 5 MB or less.");
      return;
    }

    setSelectedFiles(prev => ({
      ...prev,
      [assignmentId]: file
    }));
  }


  async function submit(id) {

    const file = selectedFiles[id];

    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    try {

      setUploading(id);

      const formData = new FormData();

      formData.append(
        "student_id",
        String(user.id)
      );

      formData.append(
        "file",
        file
      );

      formData.append(
        "student_notes",
        ""
      );


      const response = await fetch(
        `/api/assignments/${id}/submit`,
        {
          method: "POST",
          body: formData
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.detail ||
          "Unable to submit assignment."
        );
      }


      // Remove selected file after successful upload
      setSelectedFiles(prev => {

        const copy = { ...prev };

        delete copy[id];

        return copy;

      });


      await refresh();

      alert(
        "Assignment submitted successfully."
      );

    } catch (err) {

      alert(
        err.message ||
        "Unable to submit assignment."
      );

    } finally {

      setUploading(null);

    }

  }


  return (

    <div className="card">

      <div className="section-title">

        <div>

          <h2>
            Assignments
          </h2>

          <span>
            {myAssignments.length} assignments available
          </span>

        </div>

      </div>


      {!myAssignments.length ? (

        <div className="empty">

          No assignments have been posted yet.

        </div>

      ) : (

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>
                  Assignment
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Due
                </th>

                <th>
                  Marks
                </th>

                <th>
                  Status
                </th>

                <th>
                  Upload
                </th>

              </tr>

            </thead>


            <tbody>

              {myAssignments.map(a => {

                const submission =
                  (state.submissions || []).find(
                    s =>
                      Number(s.assignment_id) ===
                        Number(a.id) &&
                      Number(s.student_id) ===
                        Number(user.id)
                  );


                const selectedFile =
                  selectedFiles[a.id];


                return (

                  <tr key={a.id}>

                    <td>

                      <b>
                        {a.title}
                      </b>

                      {a.description && (

                        <div className="small-muted">

                          {a.description}

                        </div>

                      )}

                    </td>


                    <td>
                      {a.subject}
                    </td>


                    <td>
                      {a.due_date}
                    </td>


                    <td>
                      {a.max_marks}
                    </td>


                    <td>

                      {submission ? (

                        <span
                          className={
                            "badge " +
                            (
                              submission.status ===
                              "Graded"
                                ? "green"
                                : "blue"
                            )
                          }
                        >

                          {submission.status}

                          {submission.marks != null
                            ? ` • ${submission.marks}/${a.max_marks}`
                            : ""}

                        </span>

                      ) : (

                        <span className="badge orange">

                          Pending

                        </span>

                      )}

                    </td>


                    <td>

                      {submission ? (

                        <div>

                          <div className="small-muted">

                            ✓ {submission.file_name}

                          </div>

                          {submission.file_size && (

                            <div className="small-muted">

                              {(
                                submission.file_size /
                                1024
                              ).toFixed(1)} KB

                            </div>

                          )}

                        </div>

                      ) : (

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            minWidth: 220
                          }}
                        >

                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,.jpg,.jpeg,.png"
                            onChange={e =>
                              selectFile(
                                a.id,
                                e.target.files?.[0]
                              )
                            }
                          />


                          {selectedFile && (

                            <div className="small-muted">

                              Selected:
                              {" "}
                              <b>
                                {selectedFile.name}
                              </b>

                            </div>

                          )}


                          <button
                            className="btn primary"
                            disabled={
                              uploading === a.id ||
                              !selectedFile
                            }
                            onClick={() =>
                              submit(a.id)
                            }
                          >

                            <Upload size={13} />

                            {uploading === a.id
                              ? "Uploading..."
                              : "Submit Assignment"}

                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}
// ============================================================
// RESULTS
// ============================================================

function Results({user,state,refresh,canManage=false}){
  if(canManage) return <ResultManager state={state} refresh={refresh} role={user?.role} user={user}/>;
  const results=state.results.filter(r=>r.student_id===user?.id);
  return <div><div className="hero"><h1>Semester Results</h1><p>Published academic results and grade history.</p></div><div className="card" style={{marginTop:18}}><div className="section-title"><h2>Published Results</h2><span>{results.length} subjects</span></div><div className="table-wrap"><table><thead><tr><th>Subject</th><th>Internal</th><th>External</th><th>Total</th><th>Grade</th></tr></thead><tbody>{results.map(r=><tr key={r.id}><td><b>{r.subject}</b></td><td>{r.internal}</td><td>{r.external}</td><td><b>{r.total}/100</b></td><td><span className="badge green">{r.grade}</span></td></tr>)}</tbody></table></div></div></div>;
}

// ============================================================
// FEES
// ============================================================

function Fees({ user }) {

  const [fee,setFee] = useState(null);

  async function load() {
    setFee(
      await api(`/api/fees/${user.id}`)
    );
  }

  useEffect(() => {
    load();
  }, [user.id]);

  async function pay() {

    await api("/api/fees/pay", {
      method:"POST",
      body:JSON.stringify({
        student_id:user.id,
        amount:5000
      })
    });

    load();
  }

  if (!fee) {
    return <div className="card">Loading fees...</div>;
  }

  const pending =
    fee.semester_fee - fee.paid;

  return (
    <>

      <div className="grid-3">

        <Metric
          icon={CircleDollarSign}
          label="Semester Fee"
          value={`₹${fee.semester_fee.toLocaleString()}`}
        />

        <Metric
          icon={CheckCircle2}
          label="Paid"
          value={`₹${fee.paid.toLocaleString()}`}
          note="Paid"
        />

        <Metric
          icon={AlertCircle}
          label="Pending"
          value={`₹${pending.toLocaleString()}`}
          note={pending ? "Due" : "Clear"}
        />

      </div>


      <div className="card" style={{
        marginTop:16
      }}>

        <div className="section-title">

          <h2>
            Fee Payment
          </h2>

          <span>
            Semester V
          </span>

        </div>

        <div className="progress">

          <div style={{
            width:
              `${(fee.paid / fee.semester_fee)*100}%`
          }} />

        </div>

        <div style={{marginTop:18,padding:13,borderRadius:12,background:"rgba(113,132,170,.08)",border:"1px solid var(--border)"}}>
          <b>Online payment</b>
          <div className="small-muted" style={{marginTop:4}}>Payment gateway is not connected in this demo portal. Students cannot mark fees as paid themselves.</div>
        </div>

      </div>

    </>
  );
}


// ============================================================
// PLACEMENTS
// ============================================================

function Placements({state}){
  const [drive,setDrive]=useState(null);
  return <div><div className="hero"><h1>Placement & Career Centre</h1><p>Live drives, eligibility, deadlines and career resources.</p></div><div className="grid-3">{state.placements.map(p=><div className="card drive-card" key={p.id}><div className="section-title"><div><h2>{p.company}</h2><span>{p.role}</span></div><span className="badge green">{p.status}</span></div><div className="stat-strip"><div className="stat-pill"><b>{p.package}</b></div><div className="stat-pill">Deadline <b>{p.deadline}</b></div></div><p className="small-muted" style={{lineHeight:1.6}}>Eligibility: {p.eligibility}</p><button className="btn primary" onClick={()=>setDrive(p)}>View drive <ExternalLink size={13}/></button></div>)}</div>{drive&&<Modal title={`${drive.company} — ${drive.role}`} onClose={()=>setDrive(null)}><div className="campus-card"><img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85" alt="placement"/><div><h3 style={{marginTop:0}}>{drive.package}</h3><div className="small-muted">Application deadline: {drive.deadline}</div><div className="small-muted" style={{marginTop:7}}>Eligibility: {drive.eligibility}</div></div></div><div className="stat-strip" style={{marginTop:18}}><div className="stat-pill">Resume screening</div><div className="stat-pill">Aptitude test</div><div className="stat-pill">Technical interview</div><div className="stat-pill">HR interview</div></div><button className="btn primary" style={{marginTop:18}} onClick={()=>setDrive(null)}><Check size={13}/> Mark interest</button></Modal>}</div>;
}

function Timetable({
  state,
  user,
  role
}) {

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];

  const [day, setDay] = useState("Monday");

  const timetable = (state.timetable || []).filter(x => {

    if (role === "faculty") {
      return x.faculty === user?.name;
    }

    if (role === "student") {
      return (
        (!x.class_year || x.class_year === user?.class_year)
      );
    }

    return true;
  });

  const dayClasses = timetable.filter(
    x => x.day === day
  );

  return (
    <>

      <div className="hero">
        <h1>
          {role === "faculty"
            ? "My Teaching Timetable"
            : "My Timetable"}
        </h1>

        <p>
          {role === "faculty"
            ? `${dayClasses.length} classes scheduled on ${day}`
            : `${dayClasses.length} classes scheduled on ${day}`}
        </p>
      </div>

      <div className="card">

        <div className="actions">

          {days.map(d => (
            <button
              key={d}
              className={
                "btn " +
                (day === d
                  ? "primary"
                  : "secondary")
              }
              onClick={() => setDay(d)}
            >
              {d}
            </button>
          ))}

        </div>

      </div>

      <div className="stat-strip" style={{
        marginTop: 18
      }}>

        <div className="stat-pill">
          <b>{timetable.length}</b> total classes
        </div>

        <div className="stat-pill">
          <b>{dayClasses.length}</b> on {day}
        </div>

      </div>

      <div className="grid-2" style={{
        marginTop: 18
      }}>

        {dayClasses.map(x => (

          <div
            className="card"
            key={x.id}
          >

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 15
            }}>

              <div>
                <div style={{
                  color: "var(--primary)",
                  fontWeight: 800
                }}>
                  {x.start_time} – {x.end_time}
                </div>

                <h3>
                  {x.subject}
                </h3>
              </div>

              <CalendarClock size={20} />
            </div>

            <div className="small-muted">
              {role === "faculty"
                ? `${x.class_year || "Class"} • ${x.room}`
                : `${x.faculty} • ${x.room}`}
            </div>

          </div>

        ))}

      </div>

      {!dayClasses.length && (
        <div className="card" style={{
          marginTop: 18
        }}>
          <div className="empty">
            No classes scheduled for {day}.
          </div>
        </div>
      )}

    </>
  );
}

// ============================================================
// FACULTY DASHBOARD
// ============================================================

function FacultyDashboard({
  user,
  state
}) {

  const ownAssignments =
    state.assignments.filter(
      a => a.created_by === user.id
    );

  const pending =
    state.submissions.filter(
      s => s.status !== "Graded"
    ).length;

  return (
    <>

      <div className="hero">

        <h1>
          Welcome, {user.name.split(" ")[1] || user.name} 👋
        </h1>

        <p>
          Faculty Workspace • {user.department}
        </p>

      </div>


      <div className="grid-4">

        <Metric
          icon={Users}
          label="Students Assigned"
          value={state.users.filter(u => u.role === "student" && u.department === user.department).length}
        />

        <Metric
          icon={BookOpen}
          label="Active Classes"
          value="4"
        />

        <Metric
          icon={FileText}
          label="Assignments"
          value={ownAssignments.length}
        />

        <Metric
          icon={ClipboardCheck}
          label="Pending Evaluation"
          value={pending}
          note="Action"
        />

      </div>


      <div className="grid-2">

        <div className="card">

          <div className="section-title">

            <h2>
              Today's Lectures
            </h2>

            <span>
              Faculty schedule
            </span>

          </div>

          {state.timetable
            .filter(x =>
              x.faculty === user.name
            )
            .map(x => (

              <div
                className="notice"
                key={x.id}
              >

                <div className="notice-title">
                  {x.start_time} — {x.subject}
                </div>

                <div className="notice-text">
                  {x.room} • TY Computer Engineering
                </div>

              </div>

            ))
          }

        </div>


        <div className="card">

          <div className="section-title">

            <h2>
              Class Performance
            </h2>

          </div>

          <div style={{
            display:"grid",
            gap:14
          }}>

            {[
              ["Attendance","87%"],
              ["Average Internal Marks","81%"],
              ["Assignment Completion","76%"],
              ["Students At Risk","8"]
            ].map(x => (

              <div key={x[0]}>

                <div style={{
                  display:"flex",
                  justifyContent:"space-between",
                  fontSize:12,
                  marginBottom:6
                }}>
                  <span>{x[0]}</span>
                  <b>{x[1]}</b>
                </div>

                <div className="progress">
                  <div style={{
                    width:
                      x[1].includes("%")
                        ? x[1]
                        : "15%"
                  }} />
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>
  );
}

// ============================================================
// FACULTY ATTENDANCE
// ============================================================

function FacultyAttendance({
  state,
  refresh,
  user
}) {

  // ------------------------------------------------------------
  // CURRENT LOCAL DATE
  // ------------------------------------------------------------

  const now = new Date();

  const todayName = now.toLocaleDateString("en-US", {
    weekday: "long"
  });

  const todayDate = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  // Local YYYY-MM-DD
  const todayISO =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;


  // ------------------------------------------------------------
  // STUDENTS OF FACULTY DEPARTMENT
  // ------------------------------------------------------------

  const students =
    (state.users || []).filter(
      u =>
        u.role === "student" &&
        u.department === user?.department
    );


  // ------------------------------------------------------------
  // SUBJECT
  // ------------------------------------------------------------

  const [subject, setSubject] =
    useState("Database Management Systems");


  // ------------------------------------------------------------
  // ATTENDANCE RECORDS
  // ------------------------------------------------------------

  const attendanceRecords =
    state.attendance || [];


  // ------------------------------------------------------------
  // GET TODAY'S ATTENDANCE FOR A STUDENT
  // ------------------------------------------------------------

  function getStudentAttendance(studentId) {

    return attendanceRecords.find(record => {

      return (
        Number(record.student_id) === Number(studentId) &&
        String(record.subject) === String(subject) &&
        String(record.date).slice(0, 10) === todayISO
      );

    });

  }


  // ------------------------------------------------------------
  // MARK ATTENDANCE
  // ------------------------------------------------------------

  async function mark(studentId, present) {

    try {

      await api("/api/attendance", {
        method: "POST",

        body: JSON.stringify({

          student_id: Number(studentId),

          subject: subject,

          present: present,

          // IMPORTANT:
          // Send today's actual local date.
          date: todayISO

        })
      });


      // Immediately refresh the UI
      await refresh();


    } catch (err) {

      alert(
        err.message ||
        "Unable to update attendance."
      );

    }
  }


  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------

  return (

    <div className="card">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="section-title">

        <div>

          <h2>
            Attendance Register
          </h2>

          <span
            style={{
              display: "block",
              marginTop: 4
            }}
          >
            {todayName}, {todayDate}
          </span>

        </div>


        {/* SUBJECT */}

        <select
          value={subject}
          onChange={e =>
            setSubject(e.target.value)
          }
        >

          <option>
            Database Management Systems
          </option>

          <option>
            Java Programming
          </option>

          <option>
            Data Structures
          </option>

          <option>
            Web Technology
          </option>

        </select>

      </div>


      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="table-wrap">

        <table>

          <thead>

            <tr>

              <th>
                Student
              </th>

              <th>
                Roll No
              </th>

              <th>
                Department
              </th>

              <th>
                Today's Attendance
              </th>

            </tr>

          </thead>


          <tbody>

            {students.map(student => {

              const record =
                getStudentAttendance(student.id);


              const isMarked =
                !!record;


              const isPresent =
                record?.present === true;


              const isAbsent =
                record?.present === false;


              return (

                <tr key={student.id}>

                  {/* STUDENT */}

                  <td>

                    <b>
                      {student.name}
                    </b>

                    <div className="small-muted">
                      {student.email}
                    </div>

                  </td>


                  {/* ROLL NUMBER */}

                  <td>
                    {student.roll_no || "—"}
                  </td>


                  {/* DEPARTMENT */}

                  <td>
                    {student.department || "—"}
                  </td>


                  {/* ATTENDANCE */}

                  <td>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap"
                      }}
                    >

                      {/* --------------------------------------
                          PRESENT
                      -------------------------------------- */}

                      <button
                        className="btn success"
                        onClick={() =>
                          mark(student.id, true)
                        }
                      >

                        <Check size={13} />

                        {isPresent
                          ? "Marked Present"
                          : "Present"}

                      </button>


                      {/* --------------------------------------
                          ABSENT
                      -------------------------------------- */}

                      <button
                        className="btn danger"
                        onClick={() =>
                          mark(student.id, false)
                        }
                      >

                        <XCircle size={13} />

                        {isAbsent
                          ? "Marked Absent"
                          : "Absent"}

                      </button>


                      {/* --------------------------------------
                          STATUS
                      -------------------------------------- */}

                      {isMarked && (

                        <span
                          className={
                            isPresent
                              ? "badge green"
                              : "badge red"
                          }
                        >

                          {isPresent
                            ? "✓ Marked Present"
                            : "✕ Marked Absent"}

                        </span>

                      )}

                      {!isMarked && (

                        <span className="badge orange">

                          Not Marked

                        </span>

                      )}

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>


      {/* ======================================================
          EMPTY STATE
      ====================================================== */}

      {students.length === 0 && (

        <div className="empty">

          No students found for your department.

        </div>

      )}

    </div>

  );
}

function FacultyAssignments({
  user,
  state,
  refresh
}) {

  const [show, setShow] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedAssignment, setSelectedAssignment] =
    useState(null);


  const [form, setForm] = useState({
    title: "",
    subject: "Database Management Systems",
    description: "",
    due_date: "2026-10-15",
    max_marks: 20
  });


  const assignments =
    (state.assignments || [])
      .filter(
        a =>
          Number(a.created_by) ===
          Number(user.id)
      )
      .filter(a =>
        `${a.title || ""} ${a.subject || ""} ${a.description || ""}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );


  async function create() {

    if (!form.title.trim()) {

      alert(
        "Please enter an assignment title."
      );

      return;

    }


    try {

      await api(
        "/api/assignments",
        {
          method: "POST",

          body: JSON.stringify({
            ...form,

            max_marks:
              Number(form.max_marks),

            created_by:
              Number(user.id)
          })
        }
      );


      setShow(false);


      setForm({
        title: "",
        subject:
          "Database Management Systems",
        description: "",
        due_date: "2026-10-15",
        max_marks: 20
      });


      await refresh();


    } catch (err) {

      alert(
        err.message ||
        "Unable to create assignment."
      );

    }

  }


  function getSubmissions(assignmentId) {

    return (
      state.submissions || []
    ).filter(
      s =>
        Number(s.assignment_id) ===
        Number(assignmentId)
    );

  }


  function downloadSubmission(submissionId) {

    window.open(
      `/api/submissions/${submissionId}/file`,
      "_blank"
    );

  }


  const currentSubmissions =
    selectedAssignment
      ? getSubmissions(
          selectedAssignment.id
        )
      : [];


  return (

    <>

      {/* =====================================================
          ASSIGNMENT MANAGEMENT
      ===================================================== */}

      <div className="card">

        <div className="section-title">

          <h2>
            Assignment Management
          </h2>


          <div
            className="actions"
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 10,
              alignItems: "center"
            }}
          >

            <input
              style={{
                padding: "9px 11px",
                minWidth: 220,
                border:
                  "1px solid var(--border)",
                borderRadius: 10,
                background:
                  "var(--card-solid)",
                color:
                  "var(--text)"
              }}

              placeholder=
                "Search assignments..."

              value={query}

              onChange={e =>
                setQuery(
                  e.target.value
                )
              }
            />


            <button
              className="btn primary"

              onClick={() =>
                setShow(true)
              }
            >

              <Plus size={14} />

              Create Assignment

            </button>

          </div>

        </div>


        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>
                  Title
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Due Date
                </th>

                <th>
                  Marks
                </th>

                <th>
                  Submissions
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {assignments.map(a => {

                const submissions =
                  getSubmissions(a.id);


                return (

                  <tr key={a.id}>

                    <td>

                      <b>
                        {a.title}
                      </b>

                      {a.description && (

                        <div className="small-muted">

                          {a.description}

                        </div>

                      )}

                    </td>


                    <td>
                      {a.subject}
                    </td>


                    <td>
                      {a.due_date}
                    </td>


                    <td>
                      {a.max_marks}
                    </td>


                    <td>

                      {submissions.length === 0 ? (

                        <span className="badge orange">

                          No submissions

                        </span>

                      ) : (

                        <span className="badge blue">

                          {submissions.length}
                          {" "}
                          submitted

                        </span>

                      )}

                    </td>


                    <td>

                      <button
                        className="btn secondary"

                        onClick={() =>
                          setSelectedAssignment(a)
                        }
                      >

                        <FileText size={14} />

                        View Submissions

                      </button>

                    </td>

                  </tr>

                );

              })}


              {assignments.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: 30
                    }}
                  >

                    {query
                      ? "No assignments match your search."
                      : "No assignments created yet."}

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================================
          CREATE ASSIGNMENT MODAL
      ===================================================== */}

      {show && (

        <Modal
          title="Create Assignment"
          onClose={() =>
            setShow(false)
          }
        >

          <div className="form-grid">

            <div className="field full">

              <label>
                Title
              </label>

              <input
                value={form.title}

                onChange={e =>
                  setForm({
                    ...form,
                    title:
                      e.target.value
                  })
                }

                placeholder=
                  "e.g. SQL Database Design"
              />

            </div>


            <div className="field">

              <label>
                Subject
              </label>

              <select
                value={form.subject}

                onChange={e =>
                  setForm({
                    ...form,
                    subject:
                      e.target.value
                  })
                }
              >

                <option>
                  Database Management Systems
                </option>

                <option>
                  Java Programming
                </option>

                <option>
                  Data Structures
                </option>

                <option>
                  Web Technology
                </option>

              </select>

            </div>


            <div className="field">

              <label>
                Maximum Marks
              </label>

              <input
                type="number"
                min="1"

                value={
                  form.max_marks
                }

                onChange={e =>
                  setForm({
                    ...form,
                    max_marks:
                      e.target.value
                  })
                }

              />

            </div>


            <div className="field">

              <label>
                Due Date
              </label>

              <input
                type="date"

                value={
                  form.due_date
                }

                onChange={e =>
                  setForm({
                    ...form,
                    due_date:
                      e.target.value
                  })
                }

              />

            </div>


            <div className="field full">

              <label>
                Description
              </label>

              <textarea
                rows="5"

                value={
                  form.description
                }

                onChange={e =>
                  setForm({
                    ...form,
                    description:
                      e.target.value
                  })
                }

                placeholder=
                  "Describe the assignment requirements..."
              />

            </div>

          </div>


          <button
            className="btn primary"

            style={{
              marginTop: 15
            }}

            onClick={create}
          >

            <Plus size={14} />

            Publish Assignment

          </button>

        </Modal>

      )}


      {/* =====================================================
          STUDENT SUBMISSIONS MODAL
      ===================================================== */}

      {selectedAssignment && (

        <Modal
          title={
            `Submissions — ${selectedAssignment.title}`
          }

          onClose={() =>
            setSelectedAssignment(null)
          }
        >

          <div
            style={{
              marginBottom: 15
            }}
          >

            <div>

              <b>
                {selectedAssignment.subject}
              </b>

            </div>

            <div className="small-muted">

              Due:
              {" "}
              {selectedAssignment.due_date}
              {" • "}
              Maximum marks:
              {" "}
              {selectedAssignment.max_marks}

            </div>

          </div>


          {currentSubmissions.length === 0 ? (

            <div className="empty">

              No students have submitted
              this assignment yet.

            </div>

          ) : (

            <div className="table-wrap">

              <table>

                <thead>

                  <tr>

                    <th>
                      Student
                    </th>

                    <th>
                      Roll No.
                    </th>

                    <th>
                      Submitted
                    </th>

                    <th>
                      File
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {currentSubmissions.map(
                    submission => (

                      <tr
                        key={
                          submission.id
                        }
                      >

                        <td>

                          <b>

                            {
                              submission.student_name ||
                              `Student #${submission.student_id}`
                            }

                          </b>

                        </td>


                        <td>

                          {
                            submission.roll_no ||
                            "—"
                          }

                        </td>


                        <td>

                          {
                            submission.submitted_at
                              ? new Date(
                                  submission.submitted_at
                                ).toLocaleString()
                              : "—"
                          }

                        </td>


                        <td>

                          <div>

                            <b>

                              {
                                submission.file_name ||
                                "No file"
                              }

                            </b>


                            {submission.file_size && (

                              <div className="small-muted">

                                {(
                                  submission.file_size /
                                  1024
                                ).toFixed(1)}
                                {" KB"}

                              </div>

                            )}

                          </div>

                        </td>


                        <td>

                          <span
                            className={
                              "badge " +
                              (
                                submission.status ===
                                "Graded"
                                  ? "green"
                                  : "blue"
                              )
                            }
                          >

                            {
                              submission.status ||
                              "Submitted"
                            }

                          </span>

                        </td>


                        <td>

                          <button
                            className="btn secondary"

                            onClick={() =>
                              downloadSubmission(
                                submission.id
                              )
                            }
                          >

                            <Download
                              size={14}
                            />

                            Download

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </Modal>

      )}

    </>

  );

}
// ============================================================
// GRADING
// ============================================================

function Grading({
  state,
  refresh
}) {

  const [selected,setSelected] =
    useState(null);

  const [marks,setMarks] =
    useState("");

  const [feedback,setFeedback] =
    useState("");

  async function grade() {

    await api(
      `/api/submissions/${selected.id}/grade`,
      {
        method:"PUT",
        body:JSON.stringify({
          marks:Number(marks),
          feedback
        })
      }
    );

    setSelected(null);
    refresh();
  }

  return (
    <>

      <div className="card">

        <div className="section-title">

          <h2>
            Submission Evaluation
          </h2>

          <span>
            {state.submissions.length} submissions
          </span>

        </div>

        <table>

          <thead>

            <tr>
              <th>Student</th>
              <th>Assignment</th>
              <th>Submitted</th>
              <th>Status</th>
              <th></th>
            </tr>

          </thead>

          <tbody>

            {state.submissions.map(s => (

              <tr key={s.id}>

                <td>
                  <b>{s.student_name}</b>
                  <div style={{
                    color:"var(--muted)",
                    fontSize:10
                  }}>
                    {s.roll_no}
                  </div>
                </td>

                <td>
                  {s.assignment_title}
                </td>

                <td>
                  {s.submitted_at?.slice(0,10)}
                </td>

                <td>

                  <span className={
                    "badge " +
                    (s.status === "Graded"
                      ? "green"
                      : "orange")
                  }>
                    {s.status}
                  </span>

                </td>

                <td>

                  <button
                    className="btn primary"
                    onClick={() => {
                      setSelected(s);
                      setMarks(s.marks || "");
                      setFeedback(s.feedback || "");
                    }}
                  >
                    {s.status === "Graded"
                      ? "Edit Grade"
                      : "Grade"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {selected && (

        <Modal
          title="Evaluate Submission"
          onClose={() => setSelected(null)}
        >

          <div className="card" style={{
            marginBottom:15,
            background:"#f8f9fc"
          }}>

            <b>
              {selected.student_name}
            </b>

            <div style={{
              color:"var(--muted)",
              fontSize:12,
              marginTop:5
            }}>
              {selected.assignment_title}
            </div>

          </div>

          <div className="form-grid">

            <div className="field">

              <label>
                Marks / {selected.max_marks}
              </label>

              <input
                type="number"
                max={selected.max_marks}
                value={marks}
                onChange={e =>
                  setMarks(e.target.value)
                }
              />

            </div>

            <div className="field">

              <label>
                Submission
              </label>

              <input
                value={selected.file_name || ""}
                readOnly
              />

            </div>

            <div className="field full">

              <label>
                Faculty Feedback
              </label>

              <textarea
                value={feedback}
                onChange={e =>
                  setFeedback(e.target.value)
                }
              />

            </div>

          </div>

          <button
            className="btn primary"
            style={{
              marginTop:15
            }}
            onClick={grade}
          >
            Save Grade
          </button>

        </Modal>

      )}

    </>
  );
}


// ============================================================
// FACULTY STUDENTS
// ============================================================

function FacultyStudents({ state, user }) {

  const students =
    state.users.filter(
      u => u.role === "student" && u.department === user?.department
    );

  return (
    <div className="card">

      <div className="section-title">

        <h2>
          Students
        </h2>

        <span>
          Academic roster
        </span>

      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {students.map(s => (

            <tr key={s.id}>

              <td>
                <b>{s.name}</b>
              </td>

              <td>{s.roll_no}</td>

              <td>{s.department}</td>

              <td>{s.class_year}</td>

              <td>
                <span className="badge green">
                  {s.status}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// ============================================================
// ADMIN DASHBOARD
// ============================================================

function AdminDashboard({ state }) {

  const students =
    state.users.filter(
      u => u.role === "student"
    ).length;

  const faculty =
    state.users.filter(
      u => u.role === "faculty"
    ).length;

  return (
    <>

      <div className="hero">

        <h1>
          University Administration
        </h1>

        <div className="hero-row"><div><p>Institution-wide academic and operational overview.</p></div><img className="hero-image" src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85" alt="University administration"/></div>

      </div>


      <div className="grid-4">

        <Metric
          icon={GraduationCap}
          label="Total Students"
          value={students}
        />

        <Metric
          icon={Users}
          label="Faculty Members"
          value={faculty}
        />

        <Metric
          icon={ClipboardCheck}
          label="Attendance"
          value="92%"
          note="Healthy"
        />

        <Metric
          icon={CircleDollarSign}
          label="Fee Collection"
          value="85.3%"
          note="Current"
        />

      </div>


      <div className="grid-3">

        <Metric
          icon={BriefcaseBusiness}
          label="Placement Drives"
          value={state.placements.length}
        />

        <Metric
          icon={FileText}
          label="Assignments"
          value={state.assignments.length}
        />

        <Metric
          icon={Megaphone}
          label="Active Notices"
          value={state.notices.length}
        />

      </div>


      <div className="grid-2">

        <div className="card">

          <div className="section-title">

            <h2>
              Institution Analytics
            </h2>

          </div>

          <div className="chart">

            {[72,81,76,88,92,85,94].map(
              (v,i) => (

                <div
                  key={i}
                  className="bar"
                  style={{
                    height:`${v}%`
                  }}
                >

                  <span>{v}%</span>
                </div>

              )
            )}

          </div>

          <div className="chart-labels">

            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul"
            ].map(x => (
              <div key={x}>{x}</div>
            ))}

          </div>

        </div>


        <NoticeCard
          notices={state.notices.slice(0,5)}
        />

      </div>

    </>
  );
}

// ============================================================
// ADMIN USERS
// ============================================================

function AdminUsers({
  state,
  refresh,
  role
}) {

  const users = state.users.filter(
    u => u.role === role
  );

  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 25;

  const filteredUsers = users.filter(u =>
    `${u.name || ""} ${u.email || ""} ${u.department || ""} ${u.roll_no || ""} ${u.employee_id || ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / pageSize)
  );

  const safePage = Math.min(page, totalPages);

  const pageUsers = filteredUsers.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "1234",
    role,
    department: "Computer Engineering",
    class_year: "TY",
    roll_no: "",
    employee_id: ""
  });

  async function create() {

    if (!form.name.trim()) {
      alert("Please enter the name.");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter the email.");
      return;
    }

    try {

      await api("/api/users", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          role
        })
      });

      setShow(false);

      setForm({
        name: "",
        email: "",
        password: "1234",
        role,
        department: "Computer Engineering",
        class_year: "TY",
        roll_no: "",
        employee_id: ""
      });

      setPage(1);

      refresh();

    } catch (error) {

      alert(
        error?.message ||
        "Unable to create account."
      );

    }
  }

  async function remove(id) {

    if (!confirm("Delete this user?")) {
      return;
    }

    try {

      await api(`/api/users/${id}`, {
        method: "DELETE"
      });

      refresh();

    } catch (error) {

      alert(
        error?.message ||
        "Unable to delete user."
      );

    }
  }

  return (
    <>

      {/* =====================================================
          USERS TABLE
      ===================================================== */}

      <div className="card">

        <div
          className="section-title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap"
          }}
        >

          <div>

            <h2>
              {role === "student"
                ? "Student Management"
                : "Faculty Management"}
            </h2>

            <div className="small-muted">
              {filteredUsers.length}{" "}
              {role === "student"
                ? "students"
                : "faculty members"}
            </div>

          </div>

          <div
            className="actions"
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >

            {/* SEARCH */}

            <input
              className="field"
              style={{
                padding: "9px 11px",
                minWidth: 220,
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "var(--card-solid)",
                color: "var(--text)"
              }}
              placeholder={
                role === "student"
                  ? "Search students..."
                  : "Search faculty..."
              }
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />

            {/* ADD USER */}

            <button
              className="btn primary"
              onClick={() => setShow(true)}
            >
              <Plus size={14} />
              Add {role}
            </button>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div
          style={{
            overflowX: "auto",
            marginTop: 16
          }}
        >

          <table>

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Department</th>

                <th>
                  {role === "student"
                    ? "Roll Number"
                    : "Employee ID"}
                </th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {pageUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: 35
                    }}
                  >

                    <div className="small-muted">
                      No {role === "student"
                        ? "students"
                        : "faculty members"}{" "}
                      found.
                    </div>

                  </td>

                </tr>

              ) : (

                pageUsers.map(u => (

                  <tr key={u.id}>

                    <td>
                      <b>{u.name}</b>
                    </td>

                    <td>
                      {u.email}
                    </td>

                    <td>
                      {u.department || "—"}
                    </td>

                    <td>

                      {role === "student"
                        ? (
                          <span className="badge">
                            {u.roll_no || "Auto"}
                          </span>
                        )
                        : (
                          <span className="badge">
                            {u.employee_id || "Auto"}
                          </span>
                        )}

                    </td>

                    <td>

                      <span className="badge green">
                        {u.status || "Active"}
                      </span>

                    </td>

                    <td>

                      <button
                        className="btn danger"
                        onClick={() =>
                          remove(u.id)
                        }
                        title="Delete user"
                      >

                        <Trash2 size={13} />

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
        ================================================= */}

        {filteredUsers.length > pageSize && (

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 18,
              flexWrap: "wrap"
            }}
          >

            <div className="small-muted">

              Showing{" "}
              {(safePage - 1) * pageSize + 1}
              {" – "}
              {Math.min(
                safePage * pageSize,
                filteredUsers.length
              )}
              {" of "}
              {filteredUsers.length}

            </div>

            <div
              style={{
                display: "flex",
                gap: 8
              }}
            >

              <button
                className="btn"
                disabled={safePage <= 1}
                onClick={() =>
                  setPage(p => Math.max(1, p - 1))
                }
              >
                Previous
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  fontWeight: 700
                }}
              >
                {safePage} / {totalPages}
              </div>

              <button
                className="btn"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setPage(p =>
                    Math.min(totalPages, p + 1)
                  )
                }
              >
                Next
              </button>

            </div>

          </div>

        )}

      </div>


      {/* =====================================================
          ADD USER MODAL
      ===================================================== */}

      {show && (

        <Modal
          title={`Add ${role}`}
          onClose={() => setShow(false)}
        >

          <div className="form-grid">

            {/* NAME */}

            <div className="field full">

              <label>Name</label>

              <input
                value={form.name}
                placeholder={
                  role === "student"
                    ? "Student full name"
                    : "Faculty full name"
                }
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />

            </div>


            {/* EMAIL */}

            <div className="field">

              <label>Email / Gmail</label>

              <input
                type="email"
                placeholder="name@gmail.com"
                value={form.email}
                onChange={e =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
              />

            </div>


            {/* PASSWORD */}

            <div className="field">

              <label>Password</label>

              <input
                type="text"
                value={form.password}
                onChange={e =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
              />

            </div>


            {/* DEPARTMENT */}

            <div className="field">

              <label>Department</label>

              <select
                value={form.department}
                onChange={e =>
                  setForm({
                    ...form,
                    department: e.target.value
                  })
                }
              >

                <option>
                  Computer Engineering
                </option>

                <option>
                  Information Technology
                </option>

                <option>
                  Data Science & AI
                </option>

                <option>
                  Electronics & Telecommunication
                </option>

                <option>
                  Mechanical Engineering
                </option>

                <option>
                  Civil Engineering
                </option>

                <option>
                  Electrical Engineering
                </option>

                <option>
                  Artificial Intelligence
                </option>

                <option>
                  Cyber Security
                </option>

                <option>
                  Cloud Computing
                </option>

                <option>
                  Computer Science
                </option>

                <option>
                  Information Systems
                </option>

                <option>
                  Robotics & Automation
                </option>

                <option>
                  Chemical Engineering
                </option>

                <option>
                  Biotechnology
                </option>

                <option>
                  Biomedical Engineering
                </option>

                <option>
                  Business Administration
                </option>

                <option>
                  Commerce & Finance
                </option>

                <option>
                  Design & Media
                </option>

                <option>
                  Mathematics & Statistics
                </option>

              </select>

            </div>


            {/* AUTO ID */}

            <div className="field">

              <label>
                {role === "student"
                  ? "Roll Number"
                  : "Employee ID"}
              </label>

              <div
                style={{
                  padding: "10px 11px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  background: "rgba(113,132,170,.08)"
                }}
              >

                <b>Auto-assigned</b>

                <div
                  className="small-muted"
                  style={{
                    marginTop: 3
                  }}
                >

                  The system will automatically
                  generate the next unique{" "}
                  {role === "student"
                    ? "roll number"
                    : "employee ID"}{" "}
                  after account creation.

                </div>

              </div>

            </div>


            {/* CLASS YEAR — STUDENTS ONLY */}

            {role === "student" && (

              <div className="field">

                <label>
                  Class Year
                </label>

                <select
                  value={form.class_year}
                  onChange={e =>
                    setForm({
                      ...form,
                      class_year: e.target.value
                    })
                  }
                >

                  <option>FY</option>
                  <option>SY</option>
                  <option>TY</option>
                  <option>B.Tech Final Year</option>

                </select>

              </div>

            )}

          </div>


          {/* CREATE BUTTON */}

          <button
            className="btn primary"
            style={{
              marginTop: 16,
              width: "100%"
            }}
            onClick={create}
          >

            <Plus size={14} />

            Create Account

          </button>

        </Modal>

      )}

    </>

  );

}
// ============================================================
// ADMIN FEES
// ============================================================

function AdminFees({ state, refresh }) {
  const [fees, setFees] = useState([]);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All Departments");

  async function loadFees() {
    try {
      setFees(await api("/api/fees"));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadFees();
  }, [state.users.length]);

  async function recordPayment(studentId, amount) {
    if (!amount || Number(amount) <= 0) return;
    try {
      await api("/api/fees/pay", {
        method: "POST",
        body: JSON.stringify({ student_id: studentId, amount: Number(amount) })
      });
      await loadFees();
      refresh();
    } catch (err) {
      alert(err.message || "Unable to record payment");
    }
  }

  const departments = ["All Departments", ...new Set(state.users.filter(u => u.role === "student").map(u => u.department).filter(Boolean))];
  const visible = fees.filter(f => {
    const text = `${f.student_name || ""} ${f.email || ""} ${f.roll_no || ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (department === "All Departments" || f.department === department);
  });
  const total = visible.reduce((a, f) => a + Number(f.semester_fee || 0), 0);
  const paid = visible.reduce((a, f) => a + Number(f.paid || 0), 0);
  const pending = Math.max(0, total - paid);

  return (
    <>
      <div className="hero">
        <h1>Fee Management</h1>
        <p>University-wide fee records, outstanding balances and payment recording.</p>
      </div>

      <div className="grid-3">
        <Metric icon={CircleDollarSign} label="Total Fees" value={`₹${total.toLocaleString()}`} />
        <Metric icon={CheckCircle2} label="Collected" value={`₹${paid.toLocaleString()}`} note={total ? `${Math.round(paid / total * 100)}%` : "0%"} />
        <Metric icon={AlertCircle} label="Outstanding" value={`₹${pending.toLocaleString()}`} note={pending ? "Due" : "Clear"} />
      </div>

      <div className="card" style={{marginTop:18}}>
        <div className="section-title">
          <h2>Student Fee Accounts</h2>
          <span>{visible.length} students</span>
        </div>
        <div className="actions" style={{marginBottom:16}}>
          <input
            style={{flex:1,minWidth:220,border:"1px solid var(--border)",borderRadius:10,padding:"10px 12px",background:"var(--card-solid)",color:"var(--text)"}}
            placeholder="Search student, email or roll number..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select value={department} onChange={e => setDepartment(e.target.value)} style={{border:"1px solid var(--border)",borderRadius:10,padding:"10px 12px",background:"var(--card-solid)",color:"var(--text)"}}>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Department</th><th>Fee</th><th>Paid</th><th>Pending</th><th>Status</th><th>Admin Action</th></tr></thead>
            <tbody>
              {visible.map(f => {
                const due = Math.max(0, Number(f.semester_fee) - Number(f.paid));
                return (
                  <tr key={f.student_id}>
                    <td><b>{f.student_name}</b><div className="small-muted">{f.roll_no} • {f.email}</div></td>
                    <td>{f.department}</td>
                    <td>₹{Number(f.semester_fee).toLocaleString()}</td>
                    <td>₹{Number(f.paid).toLocaleString()}</td>
                    <td>₹{due.toLocaleString()}</td>
                    <td><span className={`badge ${due === 0 ? "green" : "orange"}`}>{due === 0 ? "Paid" : "Pending"}</span></td>
                    <td>
                      {due > 0 ? (
                        <button className="btn primary" onClick={() => recordPayment(f.student_id, due)}>Mark ₹{due.toLocaleString()} Paid</button>
                      ) : <span className="small-muted">Account clear</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============================================================
// ADMIN NOTICES
// ============================================================

function AdminNotices({
  user,
  refresh
}) {

  const [form,setForm] = useState({
    title:"",
    body:"",
    category:"General"
  });

  async function publish() {

    if (!form.title || !form.body) {
      return;
    }

    await api("/api/notices", {
      method:"POST",
      body:JSON.stringify({
        ...form,
        author:user.name
      })
    });

    setForm({
      title:"",
      body:"",
      category:"General"
    });

    refresh();
  }

  return (
    <div className="card">

      <div className="section-title">

        <h2>
          Publish University Notice
        </h2>

      </div>

      <div className="form-grid">

        <div className="field full">

          <label>
            Notice Title
          </label>

          <input
            value={form.title}
            onChange={e =>
              setForm({
                ...form,
                title:e.target.value
              })
            }
          />

        </div>

        <div className="field">

          <label>
            Category
          </label>

          <select
            value={form.category}
            onChange={e =>
              setForm({
                ...form,
                category:e.target.value
              })
            }
          >
            <option>General</option>
            <option>Examination</option>
            <option>Placement</option>
            <option>Fee</option>
            <option>Academic</option>
            <option>Urgent</option>
          </select>

        </div>

        <div className="field full">

          <label>
            Notice
          </label>

          <textarea
            value={form.body}
            onChange={e =>
              setForm({
                ...form,
                body:e.target.value
              })
            }
          />

        </div>

      </div>

      <button
        className="btn primary"
        style={{
          marginTop:15
        }}
        onClick={publish}
      >
        <Send size={14} />
        Publish Notice
      </button>

    </div>
  );
}


// ============================================================
// MODAL
// ============================================================

function Modal({
  title,
  onClose,
  children
}) {

  return (
    <div className="modal-backdrop">

      <div className="modal">

        <div className="modal-head">

          <h2>
            {title}
          </h2>

          <button
            className="close"
            onClick={onClose}
          >
            <X size={16} />
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}



// ============================================================
// PREMIUM SHARED MODULES
// ============================================================

function CampusShowcase(){
  return <div className="grid-3">
    {[
      ["Main Campus","Smart classrooms, central quad and student services","https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85",School],
      ["Digital Library","24×7 e-library, journals and reading zones","https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=85",Library],
      ["Innovation Lab","Project studios, coding labs and research spaces","https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",Cpu] 
    ].map(([title,text,img,Icon])=><div className="card campus-card" key={title}> 
      <img src={img} alt={title}/><div><div className="icon-tile"><Icon size={17}/></div><h3 style={{margin:"10px 0 5px"}}>{title}</h3><div className="small-muted">{text}</div></div> 
    </div>)} 
  </div>; 
} 
 
function Leaderboard({state, role="admin", user}){ 
  const students = state.users.filter(u=>u.role==="student"); 
  const rows = students.map(s=>{ 
    const rs = state.results.filter(r=>r.student_id===s.id); 
    const avg = rs.length ? rs.reduce((a,r)=>a+Number(r.total||0),0)/rs.length : 0; 
    return {...s, avg}; 
  }).sort((a,b)=>b.avg-a.avg); 
  const facultySubjects = role==="faculty" ? ["Database Management Systems","Java Programming","Data Structures","Web Technology"] : []; 
  const subject = role==="faculty" ? (user?.department==="Information Technology" ? "Web Technology" : "Database Management Systems") : null; 
  const filtered = role === "faculty" 
    ? rows.filter(r => r.department === user?.department && state.results.some(x=>x.student_id===r.id && x.subject===subject)) 
    : rows; 
  return <div className="grid-2"> 
    <div className="card"> 
      <div className="section-title"><h2>{role==="faculty" ? `${subject} Leaderboard` : "University Leaderboard"}</h2><span>{role==="faculty"?"Your subject":"Overall academic performance"}</span></div> 
      {filtered.slice(0,10).map((s,i)=><div className="leader-row" key={s.id}><div className="rank">{i+1}</div><div><b>{s.name}</b><div className="small-muted">{s.roll_no} • {s.department}</div></div><strong>{s.avg.toFixed(1)}%</strong></div>)} 
      {!filtered.length && <div className="empty">No ranked students yet.</div>} 
    </div> 
    <div className="card"> 
      <div className="section-title"><h2>Performance Snapshot</h2><span>Live from results</span></div> 
      <div className="stat-strip"><div className="stat-pill"><b>{rows.length}</b> students</div><div className="stat-pill"><b>{rows.filter(x=>x.avg>=75).length}</b> above 75%</div><div className="stat-pill"><b>{rows.length?Math.round(rows.reduce((a,x)=>a+x.avg,0)/rows.length):0}%</b> average</div></div> 
      <div className="chart" style={{marginTop:18}}>{rows.slice(0,7).map(s=><div key={s.id} className="bar" style={{height:`${Math.max(s.avg,10)}%`}}><span>{Math.round(s.avg)}</span></div>)}</div> 
    </div> 
  </div>; 
} 
 
function AdminAttendance({state,refresh}){ 
  const [tab,setTab]=useState("students"); 
  const students=state.users.filter(u=>u.role==="student"); 
  const faculty=state.users.filter(u=>u.role==="faculty"); 
  const [subject,setSubject]=useState("Database Management Systems"); 
  const [date,setDate]=useState(new Date().toISOString().slice(0,10)); 
  const [present,setPresent]=useState(true); 
  async function markStudent(id){await api("/api/attendance",{method:"POST",body:JSON.stringify({student_id:id,subject,present,date})});refresh()} 
  async function markFaculty(id){await api("/api/faculty-attendance",{method:"POST",body:JSON.stringify({faculty_id:id,date,present})});refresh()} 
  return <div className="card"> 
    <div className="section-title"><div><h2>Attendance Control Centre</h2><span>Central oversight for student and faculty attendance</span></div><div className="actions"><button className={"btn "+(tab==="students"?"primary":"secondary")} onClick={()=>setTab("students")}>Students</button><button className={"btn "+(tab==="faculty"?"primary":"secondary")} onClick={()=>setTab("faculty")}>Faculty</button></div></div> 
    <div className="form-grid" style={{marginBottom:16}}><div className="field"><label>DATE</label><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></div>{tab==="students"&&<div className="field"><label>SUBJECT</label><select value={subject} onChange={e=>setSubject(e.target.value)}>{["Database Management Systems","Java Programming","Data Structures","Web Technology"].map(x=><option key={x}>{x}</option>)}</select></div>}</div> 
    <div className="table-wrap"><table><thead><tr><th>Name</th><th>Department</th><th>ID</th><th>Status</th><th>Action</th></tr></thead><tbody>{(tab==="students"?students:faculty).map(u=><tr key={u.id}><td><b>{u.name}</b><div className="small-muted">{u.email}</div></td><td>{u.department}</td><td>{u.roll_no||u.employee_id}</td><td><span className="badge green">Active</span></td><td><div className="actions"><button className="btn success" onClick={()=>tab==="students"?markStudent(u.id):markFaculty(u.id)}><Check size={13}/>Present</button><button className="btn danger" onClick={async()=>{setPresent(false);if(tab==="students")await api("/api/attendance",{method:"POST",body:JSON.stringify({student_id:u.id,subject,present:false,date})});else await api("/api/faculty-attendance",{method:"POST",body:JSON.stringify({faculty_id:u.id,date,present:false})});refresh()}}><XCircle size={13}/>Absent</button></div></td></tr>)}</tbody></table></div> 
  </div>; 
} 
 
function ResultManager({state,refresh,role,user}){ 
  const students=state.users.filter(u=>u.role==="student" && (role!=="faculty" || u.department===user?.department)); 
  const [form,setForm]=useState({student_id:students[0]?.id||"",subject:"Database Management Systems",internal:30,external:60}); 
  const total=Number(form.internal||0)+Number(form.external||0); 
  const grade=total>=85?"A+":total>=75?"A":total>=65?"B+":total>=55?"B":"C"; 
  async function publish(){await api("/api/results",{method:"POST",body:JSON.stringify({...form,student_id:Number(form.student_id),internal:Number(form.internal),external:Number(form.external),total,grade,published:1,published_by:user?.id||0})});refresh()} 
  const visible=role==="faculty"?state.results.filter(r=>r.subject===form.subject):state.results; 
  return <div className="grid-2"><div className="card"><div className="section-title"><h2>Publish Student Result</h2><span>{role==="admin"?"Admin authority":"Faculty authority"}</span></div><div className="form-grid"><div className="field full"><label>STUDENT</label><select value={form.student_id} onChange={e=>setForm({...form,student_id:e.target.value})}>{students.map(s=><option key={s.id} value={s.id}>{s.name} — {s.roll_no}</option>)}</select></div><div className="field"><label>SUBJECT</label><select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>{["Database Management Systems","Java Programming","Data Structures","Web Technology"].map(x=><option key={x}>{x}</option>)}</select></div><div className="field"><label>INTERNAL / 30</label><input type="number" min="0" max="30" value={form.internal} onChange={e=>setForm({...form,internal:e.target.value})}/></div><div className="field"><label>EXTERNAL / 70</label><input type="number" min="0" max="70" value={form.external} onChange={e=>setForm({...form,external:e.target.value})}/></div></div><div className="stat-strip" style={{marginTop:16}}><div className="stat-pill"><b>{total}</b>/100</div><div className="stat-pill">Grade <b>{grade}</b></div></div><button className="btn primary" style={{marginTop:16}} onClick={publish}><UploadCloud size={14}/>Publish Result</button></div><div className="card"><div className="section-title"><h2>Recent Results</h2><span>{visible.length} records</span></div><div className="table-wrap"><table><thead><tr><th>Student</th><th>Subject</th><th>Total</th><th>Grade</th></tr></thead><tbody>{visible.slice(0,12).map(r=><tr key={r.id}><td><b>{r.student_name}</b><div className="small-muted">{r.roll_no}</div></td><td>{r.subject}</td><td><b>{r.total}</b>/100</td><td><span className="badge green">{r.grade}</span></td></tr>)}</tbody></table></div></div></div>; 
} 
 
function DepartmentsPage({state}){ 
  const deps=[...new Set(state.users.map(u=>u.department).filter(Boolean))]; 
  return <div><div className="hero"><h1>Departments & Schools</h1><p>Institution structure, faculty strength and student population.</p></div><div className="grid-3">{deps.map(d=>{const ss=state.users.filter(u=>u.department===d&&u.role==='student').length;const ff=state.users.filter(u=>u.department===d&&u.role==='faculty').length;return <div className="card" key={d}><div className="icon-tile"><School size={18}/></div><h3 style={{margin:"12px 0 6px"}}>{d}</h3><div className="stat-strip"><div className="stat-pill"><b>{ss}</b> students</div><div className="stat-pill"><b>{ff}</b> faculty</div></div><div className="progress" style={{marginTop:15}}><div style={{width:`${Math.min(100,ff*18+25)}%`}}/></div></div>})}</div><CampusShowcase/></div>; 
} 
 
// ============================================================ 
// MAIN APP 
// ============================================================ 
 
export default function App() { 
 
  const [user,setUser] = useState(null); 
 
  const [state,setState] = useState({ 
    users:[], 
    assignments:[], 
    submissions:[], 
    notices:[], 
    results:[], 
    placements:[], 
    timetable:[], 
    facultyAttendance:[] 
  }); 
 
  const [attendance,setAttendance] = 
    useState([]); 
 
  const [active,setActive] = 
    useState("Dashboard"); 
 
  const [menu,setMenu] = 
    useState(false); 
 
  const [dark,setDark] = 
    useState(false); 
 
  const [toast,setToast] = 
    useState(""); 
 
  async function refresh() { 
 
    try { 
 
      const data = 
        await api("/api/state"); 
 
      setState(data); 
 
      if (user?.role === "student") { 
        const a = await api(`/api/attendance/${user.id}`); 
        setAttendance(a); 
      } 
 
    } catch(err) { 
 
      console.error(err); 
 
    } 
  } 
 
  useEffect(() => { 
 
    if (!user) { 
      return; 
    } 
 
    refresh(); 
 
    const interval = 
      setInterval( 
        refresh, 
        3000 
      ); 
 
    return () => 
      clearInterval(interval); 
 
  }, [user?.id]); 
 
 
  useEffect(() => { 
 
    if (toast) { 
 
      const timer = 
        setTimeout( 
          () => setToast(""), 
          2500 
        ); 
 
      return () => 
        clearTimeout(timer); 
    } 
 
  }, [toast]); 
 
 
  function logout() { 
 
    setUser(null); 
    setActive("Dashboard"); 
  } 
 
 
  if (!user) { 
 
    return ( 
      <Login 
        onLogin={u => { 
          setUser(u); 
          setActive("Dashboard"); 
        }} 
      /> 
    ); 
  } 
 
 
  function renderPage() { 
 
    if (user.role === "student") { 
 
      switch(active) { 
 
        case "Dashboard": 
          return ( 
            <StudentDashboard 
              user={user} 
              state={state} 
              attendance={attendance} 
            /> 
          ); 
 
        case "Academics": 
          return <Academics state={state} user={user} />; 
 
        case "Attendance": 
          return ( 
            <AttendancePage 
              user={user} 
              attendance={attendance} 
              refresh={refresh} 
            /> 
          ); 
 
        case "Assignments": 
          return ( 
            <Assignments 
              user={user} 
              state={state} 
              refresh={refresh} 
            /> 
          ); 
 
        case "Results": 
          return ( 
            <Results 
              user={user} 
              state={state} 
            /> 
          ); 
 
        case "Fees": 
          return <Fees user={user} />; 
 
        case "Placements": 
          return <Placements state={state} />; 
 
        case "Timetable": 
          return (<Timetable state={state} user={user} role="student"/>); 
         
        case "Notices": 
          return <NoticeCard notices={state.notices}/>; 
        case "Leaderboard": 
          return <Leaderboard state={state} role="student" user={user}/>; 
        case "Campus": 
          return <DepartmentsPage state={state}/>; 
 
        default: 
          return <Academics state={state} user={user} />; 
      } 
 
    } 
 
 
    if (user.role === "faculty") { 
 
      switch(active) { 
 
        case "Dashboard": 
          return ( 
            <FacultyDashboard 
              user={user} 
              state={state} 
            /> 
          ); 
 
        case "My Classes": 
          return ( 
            <FacultyStudents 
              state={state} 
              user={user} 
            /> 
          ); 
 
        case "Attendance": 
          return ( 
            <FacultyAttendance 
              state={state} 
              refresh={refresh} 
              user={user} 
            /> 
          ); 
 
        case "Assignments": 
          return ( 
            <FacultyAssignments 
              user={user} 
              state={state} 
              refresh={refresh} 
            /> 
          ); 
 
        case "Grading": 
          return ( 
            <Grading 
              state={state} 
              refresh={refresh} 
            /> 
          ); 
 
        case "Students": 
          return ( 
            <FacultyStudents 
              state={state} 
              user={user} 
            /> 
          ); 
 
         
        case "Timetable": 
          return ( 
             <Timetable state={state}  user={user}  role="faculty"  />  );   
 
        case "Notices": 
          return <NoticeCard notices={state.notices}/>; 
        case "Leaderboard": 
          return <Leaderboard state={state} role="faculty" user={user}/>; 
        case "Results": 
          return <Results user={user} state={state} refresh={refresh} canManage/>; 
 
        default: 
          return ( 
            <FacultyDashboard 
              user={user} 
              state={state} 
            /> 
          ); 
      } 
 
    } 
 
 
    switch(active) { 
 
      case "Dashboard": 
        return ( 
          <AdminDashboard 
            state={state} 
          /> 
        ); 
 
      case "Students": 
        return ( 
          <AdminUsers 
            state={state} 
            refresh={refresh} 
            role="student" 
          /> 
        ); 
 
      case "Faculty": 
        return ( 
          <AdminUsers 
            state={state} 
            refresh={refresh} 
            role="faculty" 
          /> 
        ); 
 
      case "Departments": 
        return <DepartmentsPage state={state}/>; 
 
      case "Attendance Control": 
        return <AdminAttendance state={state} refresh={refresh}/>; 
 
      case "Leaderboard": 
        return <Leaderboard state={state} role="admin" user={user}/>; 
 
      case "Campus & Departments": 
        return <DepartmentsPage state={state}/>; 
 
      case "Fees": 
        return <AdminFees state={state} refresh={refresh} />; 
 
      case "Results": 
        return <Results user={user} state={state} refresh={refresh} canManage/>; 
 
      case "Placements": 
        return ( 
          <Placements state={state} /> 
        ); 
 
      case "Notices": 
        return ( 
          <AdminNotices 
            user={user} 
            refresh={refresh} 
          /> 
        ); 
 
      case "Reports": 
        return ( 
          <AdminDashboard 
            state={state} 
          /> 
        ); 
 
      case "Settings": 
        return ( 
          <div className="card"> 
 
            <h2> 
              System Settings 
            </h2> 
 
            <p style={{ 
              color:"var(--muted)" 
            }}> 
              UniSphere administration settings, 
              academic year configuration and 
              system preferences. 
            </p> 
 
          </div> 
        ); 
 
      default: 
        return ( 
          <AdminDashboard 
            state={state} 
          /> 
        ); 
    } 
  } 
 
 
  return ( 
    <> 
      <Style /> 
 
      <div className={"app " + (dark ? "dark" : "")}> 
 
        <Sidebar 
          user={user} 
          active={active} 
          setActive={setActive} 
          open={menu} 
          setOpen={setMenu} 
        /> 
 
        <main className="main"> 
 
          <Topbar 
            user={user} 
            onLogout={logout} 
            dark={dark} 
            setDark={setDark} 
            setOpen={setMenu} 
          /> 
 
          <div className="content"> 
 
            {renderPage()} 
 
          </div> 
 
        </main> 
 
      </div> 
 
      {toast && ( 
        <div className="toast"> 
          {toast} 
        </div> 
      )} 
 
    </> 
  ); 
} 
