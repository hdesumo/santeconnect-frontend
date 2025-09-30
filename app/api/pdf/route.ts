import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || "soignant";

  const doc = new PDFDocument({ margin: 50 });
  const chunks: any[] = [];

  return new Promise((resolve) => {
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);

      resolve(
        new NextResponse(pdfBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${role}-mission.pdf`,
          },
        })
      );
    });

    // ───────────────────────────────
    // PDF : Version Soignant
    // ───────────────────────────────
    if (role === "soignant") {
      doc.fontSize(20).text("Confirmation de mission", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text("Mission : Infirmier(e) de nuit – Bloc opératoire");
      doc.text("Établissement : CHU Nantes – Service chirurgie");
      doc.text("Lieu : CHU Nantes, Bâtiment A, 44000 Nantes");
      doc.text("Dates : 12/10/2025 → 18/10/2025");
      doc.text("Horaires : 20h – 6h (6 nuits)");
      doc.text("Rémunération : 240 € / nuit (paiement garanti sous 5 jours)");
      doc.text("Contact : Dr. Marie Dubois – 06 00 00 00 00 – marie.dubois@chu-nantes.fr");
      doc.text("Rendez-vous : 12/10 à 19h30 – accueil principal");
      doc.text("Documents requis : Carte pro santé, justificatif vaccination");

      doc.moveDown();
      doc.text("Conditions d’annulation : 72h avant la mission.", { align: "left" });
      doc.text("Document généré et validé par Santé Connect ✅", { align: "center" });
    }

    // ───────────────────────────────
    // PDF : Version Établissement
    // ───────────────────────────────
    if (role === "etablissement") {
      doc.fontSize(20).text("Contrat de mission validée", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text("Établissement : Clinique Pasteur, 75000 Paris");
      doc.text("SIRET : 123 456 789 00012");
      doc.text("Responsable RH : Mme Sophie Martin – rh@clinique-pasteur.fr");
      doc.moveDown();

      doc.text("Soignant affecté : Pierre Leclerc – Infirmier diplômé d’État");
      doc.text("Mission : Bloc opératoire – Nuit");
      doc.text("Dates : 12/10/2025 → 18/10/2025");
      doc.text("Horaires : 20h – 6h");
      doc.text("Rémunération : 240 € / nuit (facturation sous 30 jours)");

      doc.moveDown();
      doc.text("Conditions contractuelles :", { underline: true });
      doc.text("- Respect du code de déontologie médicale.");
      doc.text("- Présence obligatoire aux horaires indiqués.");
      doc.text("- Assurances couvertes par Santé Connect.");
      doc.moveDown();

      doc.text("Signature électronique :", { align: "right" });
      doc.text("Santé Connect ✅", { align: "right" });
    }

    doc.end();
  });
}
