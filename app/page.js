"use client";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "./AppProvider";
import Content from "@/components/Content";
import LandingSection from "@/components/LandingSection";
import FileUploader from "@/components/FileUploader";
import FileList from "@/components/FileList";

export default function Home() {
  const [file, setFile] = useState(null);
  const { userId, userFiles } = useAppContext();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [controller, setController] = useState(null);

  //TODO IMPLEMNT IN FRONEND UI
  const [fileDescription, setFileDescription] = useState("");
  const [fileTag, setFileTag] = useState("default");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please connect your wallet before uploading.");
      return;
    }

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const abortController = new AbortController();
    setController(abortController);

    setIsUploading(true);
    setIsSuccess(false); // reset success

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("description", fileDescription);
    formData.append("tag", fileTag);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "post",
        body: formData,
        signal: abortController.signal,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Upload successful:", data);
        setIsSuccess(true);
        setFile(null); // reset file
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Upload canceled by user.");
      } else {
        console.error("Upload error:", err);
        alert("Something went wrong.");
      }
    } finally {
      setIsUploading(false);
      setController(null); // reset controller
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  if (!userId) {
    return (
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <LandingSection />
      </main>
    );
  }
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <FileUploader />
        <FileList />
      </div>
    </main>
  );
}
// <div className="h-screen w-screen   ">
//   <div className="flex items-center justify-center h-full w-full ">
//     <div className="w-[900px] h-[600px] bg-gray-100 rounded-md shadow-2xl">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center gap-2 justify-center h-full p-4"
//       >
//         <input
//           onChange={handleFileChange}
//           type="file"
//           className="border px-2 py-1"
//         />
//         {file && <div className="text-sm text-gray-600">{file.name}</div>}

//         {/* Description Input */}
//         <input
//           type="text"
//           value={fileDescription}
//           onChange={(e) => setFileDescription(e.target.value)}
//           placeholder="Enter file description..."
//           className="border px-2 py-1 w-[300px] rounded"
//         />

//         {/* Tag Input */}
//         <input
//           type="text"
//           value={fileTag}
//           onChange={(e) => setFileTag(e.target.value)}
//           placeholder="Enter a tag (e.g. resume, doc)"
//           className="border px-2 py-1 w-[300px] rounded"
//         />

//         {/* Upload Button or Status */}
//         <div className="h-10">
//           {isUploading ? (
//             <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 rounded">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black" />
//               <span className="text-sm">Uploading...</span>
//             </div>
//           ) : isSuccess ? (
//             <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded">
//               <span className="text-sm">Uploaded</span>
//               <svg
//                 className="w-4 h-4 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//           ) : (
//             <button
//               className="bg-black text-amber-50 px-4 py-2 rounded"
//               disabled={!userId}
//             >
//               Submit
//             </button>
//           )}
//         </div>

//         {/* Cancel Upload */}
//         {isUploading && controller ? (
//           <button
//             onClick={() => controller.abort()}
//             className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//           >
//             Cancel Upload
//           </button>
//         ) : null}
//       </form>
//     </div>
//     {/* <div className="h-full w-[300px] bg-amber-300">
//       {userFiles.map((file) => {
//         return <div></div>;
//       })}
//     </div> */}
//   </div>
// </div>
