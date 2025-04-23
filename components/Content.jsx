import React from "react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
const Content = () => {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your files and uploads</p>
        </div>
        <Link
          href="/AccessInfo"
          className="flex items-center gap-1 px-3 py-2 text-sm border rounded-sm hover:bg-secondary transition-colors"
        >
          <Info className="h-4 w-4" />
          <span>Access Guide</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FileUploader />
        <FileList />
      </div>
    </main>
  );
};

export default Content;
