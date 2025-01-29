import type { Token } from "@/token";
import { Download } from "lucide-react";

export function Export({
  tokens,
  setExported,
}: {
  tokens: Token[];
  setExported: () => void;
}) {
  const handleExport = () => {
    const exportData = {
      tokens,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `2fa-kulcsok-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setExported();
  };

  return (
    <button
      onClick={handleExport}
      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
      title="Export tokens"
    >
      <Download className="w-5 h-5 mr-2" />
      Biztonsági mentés
    </button>
  );
}
