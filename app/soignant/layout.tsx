import SidebarSoignant from "@/components/SidebarSoignant";

export default function SoignantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar soignant */}
      <SidebarSoignant />

      {/* Contenu principal */}
      <main className="flex-grow p-6 bg-gray-50">{children}</main>
    </div>
  );
}
