import type { Token } from "@/token";
import { AlertCircle, Check, Clock3, Copy, Key, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function Code({
  token,
  code,
  setTokens,
  timeRemaining,
}: {
  token: Token;
  code: string;
  setTokens: Dispatch<SetStateAction<Token[]>>;
  timeRemaining: number;
}) {
  const [copied, setCopied] = useState<boolean>(false);
  const [tokenToRemove, setTokenToRemove] = useState<Token | null>(null);

  const formatCode = (code: string) => {
    return code?.replace(/(\d{3})/, "$1 ") || "";
  };

  const handleRemoveToken = () => {
    if (tokenToRemove) {
      setTokens((prev) =>
        prev.filter((token) => token.id !== tokenToRemove.id)
      );
      setTokenToRemove(null);
    }
  };

  const handleCopyCode = async () => {
    const rawCode = code.replace(/\s/g, "");
    if (rawCode) {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const progressColor = () => {
    if (timeRemaining > 9) {
      return "bg-indigo-600";
    }
    if (timeRemaining > 4) {
      return "bg-yellow-400";
    }
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-indigo-50 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">{token.name}</h2>
        <button
          onClick={() => setTokenToRemove(token)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Key className="w-5 h-5 mr-2" />
            <span className="text-sm">Jelenlegi kód</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock3 className="w-5 h-5 mr-2" />
            <span className="text-sm">{timeRemaining} mp</span>
          </div>
        </div>

        <div className="text-center mb-4 relative group">
          <div className="text-4xl font-mono font-bold tracking-wider text-gray-800">
            {formatCode(code)}
          </div>
          <button
            onClick={() => handleCopyCode()}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg 
          ${
            copied
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600 opacity-0 group-hover:opacity-100"
          } 
          transition-all duration-200 hover:bg-gray-200`}
            title="Copy code"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${progressColor()} h-2 rounded-full transition-all duration-1000 ease-linear`}
            style={{ width: `${(timeRemaining / 30) * 100}%` }}
          />
        </div>
        {tokenToRemove && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center mb-4 text-red-600">
                <AlertCircle className="w-6 h-6 mr-2" />
                <h2 className="text-2xl font-bold">Szolgáltatás törlése</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Biztos benne, hogy törölni szeretné{" "}
                <strong>{tokenToRemove.name}</strong> szolgáltatáshoz a kód
                generálást?
              </p>
              <p className="text-gray-600 mb-6">
                Ezt nem lehet visszavonni és ha továbbra is engedélyezve van a
                több faktoros bejelentkezés a szolgáltatásnál a fiókjához,
                lehetséges, hogy nem tud majd bejelentkezni.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setTokenToRemove(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Mégsem
                </button>
                <button
                  onClick={handleRemoveToken}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Törlés
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
