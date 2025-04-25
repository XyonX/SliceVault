import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Download, ExternalLink, Copy } from "lucide-react";

const FileDetailsDialog = ({ file, open, onOpenChange }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!file) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const ipfsUrl = `https://ipfs.io/ipfs/${file.ipfsHash}`;
      const response = await fetch(ipfsUrl);
      if (!response.ok) throw new Error(`Download failed: ${response.status}`);

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      // TODO: Add toast notification
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const copyToClipboard = (text, item) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const ipfsUrl = `https://ipfs.io/ipfs/${file.ipfsHash}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg md:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-4 rounded-lg"
        aria-describedby="file-details-description"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
            <File className="h-5 w-5" />
            {file.name}
          </DialogTitle>
          <DialogDescription
            id="file-details-description"
            className="text-sm text-muted-foreground"
          >
            Uploaded on {formatDate(file.timestamp)}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground break-words">
              {file.description || "No description provided."}
            </p>
          </div>

          {/* File Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">File Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Size:</span>{" "}
                {formatFileSize(file.size)}
              </div>
              <div>
                <span className="text-muted-foreground">File ID:</span>{" "}
                {file.fileId}
              </div>
              {file.tag && (
                <div>
                  <span className="text-muted-foreground">Tag:</span> {file.tag}
                </div>
              )}
            </div>
          </div>

          {/* Blockchain Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Blockchain Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={file.ipfsHash}
                  className="flex-1 text-sm p-2 rounded-md bg-muted border border-input truncate"
                  aria-label="IPFS Hash"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(file.ipfsHash, "IPFS Hash")}
                  aria-label="Copy IPFS Hash"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={file.uploader}
                  className="flex-1 text-sm p-2 rounded-md bg-muted border border-input truncate"
                  aria-label="Uploader Address"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    copyToClipboard(file.uploader, "Uploader Address")
                  }
                  aria-label="Copy Uploader Address"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto min-h-[48px]"
            >
              <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on IPFS
              </a>
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full sm:w-auto min-h-[48px]"
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileDetailsDialog;
