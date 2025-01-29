import { Token } from "@/token";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function Add({
  setTokens,
}: {
  setTokens: Dispatch<SetStateAction<Token[]>>;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTokenName, setNewTokenName] = useState("");
  const [newTokenSecret, setNewTokenSecret] = useState("");

  const handleAddToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTokenName && newTokenSecret) {
      setTokens((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newTokenName,
          secret: newTokenSecret.toUpperCase().replace(/\s/g, ""),
        },
      ]);

      setNewTokenName("");
      setNewTokenSecret("");
      setShowAddForm(false);
    }
  };
  return (
    <>
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Új kód hozzáadása
            </h2>
            <form onSubmit={handleAddToken}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Szolgáltatás neve
                </label>
                <input
                  type="text"
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="pl. Google, Facebook"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titkos kulcs
                </label>
                <input
                  type="text"
                  value={newTokenSecret}
                  onChange={(e) => setNewTokenSecret(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Másolja be ide a titkos kulcsot"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Mégsem
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Mentés
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setShowAddForm(true)}
        className="bg-pink-400/50 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        Új hozzáadása
      </button>
    </>
  );
}
