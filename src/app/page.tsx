"use client";

import { Add } from "@/components/Add";
import { Code } from "@/components/Code";
import { Export } from "@/components/Export";
import { Import } from "@/components/Import";
import { useTokens } from "@/hooks/useTokens";
import { AlertCircle, RefreshCw, Shield } from "lucide-react";

export default function App() {
  const {
    tokens,
    setTokens,
    codes,
    timeRemaining,
    showWarning,
    setExportedTokens,
  } = useTokens();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-col lg:flex-row">
          <div className="flex items-center mb-3 lg:mb-0">
            <Shield className="w-12 h-12 text-white" />
            <h1 className="text-3xl font-bold text-white ml-3">
              Kód Generátor
            </h1>
          </div>
          <div className="flex gap-3 flex-col sm:flex-row">
            <Export tokens={tokens} setExported={setExportedTokens} />
            <Import setTokens={setTokens} />
            <Add setTokens={setTokens} />
          </div>
        </div>

        {showWarning && (
          <div className="my-6 bg-yellow-300/80 rounded-lg p-4 text-yellow-800">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-bold">
                Még nem készített biztonsági mentést
              </span>
            </div>
            <p>
              Van olyan szolgálatatás, amihez itt generál kódot, de még nem
              készített róla biztonsági mentést.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <Code
              key={token.id}
              token={token}
              code={codes[token.id]}
              timeRemaining={timeRemaining}
              setTokens={setTokens}
            />
          ))}
        </div>

        <div className="mt-6 bg-white/10 rounded-lg p-4 text-white/80 text-sm">
          <div className="flex items-center mb-2">
            <RefreshCw className="w-5 h-5 mr-2" />
            <span className="font-medium">
              Kódok automatikusan generálódnak
            </span>
          </div>
          <ul className="list-disc pl-4">
            <li>
              Minden hozzáadott szolgálatáshoz 30 másodpercenként egy új kód
              generálódik.
            </li>
            <li>
              Ez a program csak a böngészőjében tárolja a kód generáláshoz
              szükséges adatokat a saját számítógépén.
            </li>
            <li>
              Ez azt jelenti, hogy ha kiüríti a böngésző sütiket és adatokat,
              akkor az itt tárolt titkos kulcsok is törlődnek.
            </li>
            <li>
              Van lehetősége lementeni (ajánlott) a titkos kulcsokat, amit
              eltárolhat a számítógépén vagy a felhőben, hogy később
              visszaállítsa a már korábban felvett adatokat a kód generáláshoz.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
