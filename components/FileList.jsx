import { useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import { File, Search } from "lucide-react";

const FileList = () => {
  const { userFiles, userId } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!userId) {
    return (
      <div className="border-box h-full flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-center mb-2">
          Connect your wallet to see your files
        </p>
      </div>
    );
  }

  if (!userFiles || userFiles.length === 0) {
    return (
      <div className="border-box h-full flex flex-col items-center justify-center">
        <p className="text-muted-foreground text-center mb-2">
          No files found. Upload your first file to get started.
        </p>
      </div>
    );
  }

  const filteredFiles = userFiles.filter((file) => {
    return (
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="border-box h-full flex flex-col">
      <div className="mb-4 flex items-center border border-border rounded-sm">
        <Search className="h-4 w-4 ml-2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full bg-transparent focus:outline-none text-sm"
        />
      </div>

      <h2 className="text-lg font-semibold mb-3">Your Files</h2>

      <div className="overflow-y-auto flex-1">
        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="border border-border rounded-sm p-3 hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-sm">
                    <File className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {file.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-sm">
                        {file.tag}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(file.uploadedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No matching files found
          </p>
        )}
      </div>
    </div>
  );
};

export default FileList;
