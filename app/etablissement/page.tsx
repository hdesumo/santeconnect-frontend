import SidebarEtablissement from "@/components/SidebarEtablissement";
import Topbar from "@/components/Topbar";

export default function EtablissementDashboard() {
  return (
    <div className="flex">
      <SidebarEtablissement />
      <div className="flex-1">
        <Topbar title="Dashboard Établissement" />
        <section className="p-6">
          <h1 className="text-2xl font-bold mb-4">Bienvenue, Clinique Pasteur 👋</h1>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Offres actives</h2>
              <p className="text-3xl font-bold text-indigo-600">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Candidats en cours</h2>
              <p className="text-3xl font-bold text-pink-600">34</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">Missions complétées</h2>
              <p className="text-3xl font-bold text-green-600">87</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
