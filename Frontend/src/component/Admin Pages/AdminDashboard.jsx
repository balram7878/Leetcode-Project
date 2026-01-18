import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../utils/authSlice";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const initials = user?.firstName ? user.firstName[0].toUpperCase() : "A";

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 flex flex-col">
      {/* HEADER */}
      <header className="bg-[#161616] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">CodeTree</h1>
        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center font-bold cursor-pointer">
            {initials}
          </div>
          <div className="absolute right-0 mt-2 bg-[#161616] border border-gray-800 rounded-lg w-44 hidden group-hover:block">
            <button onClick={() => navigate("/admin/profile")} className="w-full text-left px-4 py-2 hover:bg-gray-800">Profile</button>
            <button onClick={() => navigate("/admin/settings")} className="w-full text-left px-4 py-2 hover:bg-gray-800">Settings</button>
            <button onClick={() => dispatch(logout())} className="w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400">Logout</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-1 max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight">Welcome back, {user?.firstName}</h2>
          <p className="text-gray-400 text-lg">You run the platform. Shape the problems. Build the future of CodeTree.</p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <BigCard
            title="Create Problem"
            subtitle="Design new challenges"
            desc="Author high quality problems with constraints, test cases and reference solutions. This is where the platform grows."
            onClick={() => navigate("/admin/problems/create")}
            accent="from-indigo-600/20 to-indigo-600/5"
          />
          <BigCard
            title="Update Problems"
            subtitle="Refine and improve"
            desc="Edit statements, improve test cases and keep problems accurate as the platform evolves."
            onClick={() => navigate("/admin/problems")}
            accent="from-emerald-600/20 to-emerald-600/5"
          />
          <BigCard
            title="Delete Problems"
            subtitle="Maintain quality"
            desc="Safely remove outdated or broken problems using a protected deletion workflow."
            onClick={() => navigate("/admin/problems")}
            accent="from-rose-600/20 to-rose-600/5"
          />
          <BigCard
            title="All Problems"
            subtitle="Full control"
            desc="Search, sort and manage the entire problem library with pagination and filters."
            onClick={() => navigate("/admin/problems")}
            accent="from-sky-600/20 to-sky-600/5"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#161616] border-t border-gray-800 px-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CodeTree. Built for builders.
      </footer>
    </div>
  );
}

function BigCard({ title, subtitle, desc, onClick, accent }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-gradient-to-br ${accent} border border-gray-800 rounded-2xl p-6 hover:scale-[1.01] transition-transform`}
    >
      <div className="space-y-3">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-indigo-300 font-medium">{subtitle}</p>
        <p className="text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
