import type { Token } from "@/token";
import { Upload } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";

export function Import({
  setTokens,
}: {
  setTokens: Dispatch<SetStateAction<Token[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importData: { tokens: Token[] } = JSON.parse(
            event.target?.result as string
          );
          if (Array.isArray(importData.tokens)) {
            setTokens((prev) => {
              const existingSecrets = new Set(prev.map((t) => t.secret));
              const newTokens = importData.tokens.filter(
                (t) => !existingSecrets.has(t.secret)
              );
              return [...prev, ...newTokens];
            });
          }
        } catch (error) {
          alert(
            "Invalid file format. Please select a valid 2FA tokens export file."
          );
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <label className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center transition-colors cursor-pointer">
      <Upload className="w-5 h-5 mr-2" />
      Mentett fájl betöltése
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </label>
  );
}
