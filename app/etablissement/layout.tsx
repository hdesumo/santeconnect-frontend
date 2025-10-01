import SidebarEtablissement from "@/components/SidebarEtablissement";

export default function EtablissementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar établissement */}
      <SidebarEtablissement />

      {/* Contenu principal */}
      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  );
}
