import { PlusIcon } from "lucide-react";
import React from "react";

const dashboard = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome,Joe Doe
        </p>
        <div className="flex gap-4">
          <button className="w-full">
            <PlusIcon className="siz-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
          </button>
          <p className=" text-sm group-hover:text-indigo-600 transition-all duration-300">Create Resume</p>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
