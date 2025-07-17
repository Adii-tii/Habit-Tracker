import React from "react";
import { Search } from "lucide-react";

function SearchComp() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        className="w-full border border-gray-300 rounded-full px-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        placeholder="Watcha looking for?"
        type="text"
      />
    </div>
  );
}

export default SearchComp;