import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Download, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

const FileDetailsDialog = ({ file, open, onOpenChange }) => {
  //   const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  if (!file) return null;
  const handleDownload = async () => {
    if (!file) return;

    setIsDownloading(true);
    try {
      const ipfsUrl = `https://ipfs.io/ipfs/${file.ipfsHash}`;
      const response = await fetch(ipfsUrl);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create temporary anchor element
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      // Add toast notification here if needed
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
    // toast({
    //   title: "Copied!",
    //   description: `${item} copied to clipboard`,
    // });
  };

  const ipfsUrl = `https://ipfs.io/ipfs/${file.ipfsHash}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <File className="h-5 w-5" />
            {file.name}
          </DialogTitle>
          <DialogDescription>
            Uploaded on {formatDate(file.timestamp)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <h4 className="font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">{file.description}</p>
          </div>

          <div className="grid gap-2">
            <h4 className="font-medium">File Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
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

          <div className="grid gap-2">
            <h4 className="font-medium">Blockchain Info</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={file.ipfsHash}
                  className="flex-1 text-sm p-2 rounded-sm bg-muted"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(file.ipfsHash, "IPFS Hash")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={file.uploader}
                  className="flex-1 text-sm p-2 rounded-sm bg-muted"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(file.uploader, "Uploader Address")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2" />
                View on IPFS
              </a>
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
              <Download className="mr-2" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileDetailsDialog;
