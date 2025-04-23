import { useState } from "react";
import { useAppContext } from "@/app/AppProvider";
// import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [fileDescription, setFileDescription] = useState("");
  const [fileTag, setFileTag] = useState("default");
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [controller, setController] = useState(null);

  const { userId, addFile, isOnline, backendReachable } = useAppContext();
  // const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!userId) {
    //   toast({
    //     title: "Not Connected",
    //     description: "Please connect your wallet before uploading",
    //     variant: "destructive"
    //   });
    //   return;
    // }

    // if (!file) {
    //   toast({
    //     title: "No File Selected",
    //     description: "Please select a file to upload",
    //     variant: "destructive"
    //   });
    //   return;
    // }

    const abortController = new AbortController();
    setController(abortController);

    setIsUploading(true);
    setIsSuccess(false);

    setTimeout(() => {
      if (abortController.signal.aborted) return;

      const mockCID =
        "Qm" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const newFile = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        description: fileDescription,
        tag: fileTag,
        uploadedAt: new Date().toISOString(),
        size: file.size,
        cid: mockCID,
        userId: userId,
      };

      addFile(newFile);
      setIsSuccess(true);
      setIsUploading(false);
      setController(null);

      // toast({
      //   title: "Upload Successful",
      //   description: `${file.name} has been uploaded to the network`,
      // });

      setTimeout(() => {
        setFile(null);
        setFileDescription("");
        setFileTag("default");
        setIsSuccess(false);
      }, 2000);
    }, 2000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const cancelUpload = () => {
    if (controller) {
      controller.abort();
      setIsUploading(false);
      setController(null);
      // toast({
      //   title: "Upload Canceled",
      //   description: "File upload has been canceled",
      // });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="border-box w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Upload File</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div
          className="border-2 border-dashed border-border rounded-sm p-6 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {file ? (
            <div>
              <p className="font-medium mb-1">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Click to select or drag a file here
              </p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="fileDescription" className="block text-sm mb-1">
            Description
          </label>
          <input
            id="fileDescription"
            type="text"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            placeholder="Enter file description..."
            className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="fileTag" className="block text-sm mb-1">
            Tag
          </label>
          <input
            id="fileTag"
            type="text"
            value={fileTag}
            onChange={(e) => setFileTag(e.target.value)}
            placeholder="Enter a tag (e.g. resume, doc)"
            className="w-full p-2 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex justify-center mt-2">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary rounded-sm">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                <span className="text-sm">Uploading...</span>
              </div>
              <button
                type="button"
                onClick={cancelUpload}
                className="text-sm text-destructive hover:underline mt-2"
              >
                Cancel Upload
              </button>
            </div>
          ) : isSuccess ? (
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-sm">
              <span className="text-sm">Uploaded Successfully</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : !isOnline || !backendReachable ? (
            <div className="flex flex-col items-center gap-3">
              <div className="px-4 py-2 bg-red-100 text-red-800 rounded-sm text-sm text-center">
                Backend is not reachable or internet not connected
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-sm"
                >
                  Refresh Page
                </button>
                <button
                  type="button"
                  onClick={handleSubmit} // Or a dedicated retry function
                  className="cursor-pointer px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-sm"
                  disabled={!file || !userId}
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="btn-primary"
              disabled={!file || !userId}
            >
              Upload to Network
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FileUploader;
