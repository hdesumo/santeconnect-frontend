import SidebarSoignant from "@/components/SidebarSoignant";
import Topbar from "@/components/Topbar";

export default function SoignantDashboard() {
  return (
    <div className="flex">
      <SidebarSoignant />
      <div className="flex-1">
        <Topbar title="Dashboard Soignant" />
        <section className="p-6">
          <h1 className="text-2xl font-bold mb-4">Bienvenue, Pierre 👋</h1>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Missions disponibles</h2>
              <p className="text-3xl font-bold text-indigo-600">5</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Candidatures envoyées</h2>
              <p className="text-3xl font-bold text-pink-600">2</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Missions confirmées</h2>
              <p className="text-3xl font-bold text-green-600">1</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
