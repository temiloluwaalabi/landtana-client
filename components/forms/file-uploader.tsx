// import { Upload, File, X, Check, AlertCircle } from "lucide-react";
// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";

// import { Alert, AlertDescription } from "@/components/ui/alert";

// export const FileUploader = ({
//   id,
//   accept,
//   onFileUploaded,
//   error,
//   maxSize = 5242880,
// }) => {
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [uploadError, setUploadError] = useState(null);

//   const onDrop = useCallback(
//     (acceptedFiles, rejectedFiles) => {
//       // Handle rejected files (too large or wrong type)
//       if (rejectedFiles.length > 0) {
//         const rejection = rejectedFiles[0];
//         if (rejection.errors[0].code === "file-too-large") {
//           setUploadError(
//             `File is too large. Max size is ${formatFileSize(maxSize)}`
//           );
//         } else if (rejection.errors[0].code === "file-invalid-type") {
//           setUploadError("File type not supported");
//         } else {
//           setUploadError("Invalid file");
//         }
//         return;
//       }

//       // Clear any previous errors
//       setUploadError(null);

//       // Process the accepted file
//       const selectedFile = acceptedFiles[0];
//       if (!selectedFile) return;

//       setFile(selectedFile);
//       simulateUpload(selectedFile);
//     },
//     [maxSize]
//   );

//   // Convert accept string like ".pdf,.doc" to object format for react-dropzone
//   const getAcceptObject = () => {
//     if (!accept) return undefined;

//     const acceptObject = {};
//     const acceptTypes = accept.split(",");

//     acceptTypes.forEach((type) => {
//       type = type.trim();
//       if (type.startsWith(".")) {
//         // File extension
//         acceptObject[`application/${type.substring(1)}`] = [];
//       } else {
//         // MIME type
//         acceptObject[type] = [];
//       }
//     });

//     return acceptObject;
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     maxSize,
//     accept: getAcceptObject(),
//     multiple: false,
//   });

//   const simulateUpload = (selectedFile) => {
//     // In a real app, this would be an actual file upload
//     setIsUploading(true);
//     setUploadProgress(0);
//     setUploadComplete(false);

//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setIsUploading(false);
//           setUploadComplete(true);
//           onFileUploaded(selectedFile);
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 100);
//   };

//   const removeFile = (e) => {
//     e.stopPropagation();
//     setFile(null);
//     setUploadProgress(0);
//     setIsUploading(false);
//     setUploadComplete(false);
//     setUploadError(null);
//     onFileUploaded(null);
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + " bytes";
//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
//     return (bytes / (1024 * 1024)).toFixed(1) + " MB";
//   };

//   const getAcceptDescription = () => {
//     if (!accept) return "All files";
//     return accept
//       .split(",")
//       .map((type) => type.trim().replace(".", "").toUpperCase())
//       .join(", ");
//   };

//   return (
//     <div className="space-y-2">
//       <div
//         {...getRootProps()}
//         className={`rounded-md border-2 border-dashed p-4 transition-colors ${
//           isDragActive
//             ? "border-blue-400 bg-blue-50"
//             : error || uploadError
//               ? "border-red-300 bg-red-50"
//               : "border-slate-200 hover:bg-slate-50"
//         } cursor-pointer`}
//       >
//         <input {...getInputProps()} id={id} />

//         {!file ? (
//           <div className="flex flex-col items-center justify-center space-y-2 text-center">
//             <Upload className="size-8 text-slate-400" />
//             <div>
//               <p className="text-sm font-medium">
//                 {isDragActive
//                   ? "Drop the file here"
//                   : "Drag and drop or browse"}
//               </p>
//               <p className="text-xs text-slate-500">
//                 Supported formats: {getAcceptDescription()}
//               </p>
//               <p className="text-xs text-slate-500">
//                 Maximum size: {formatFileSize(maxSize)}
//               </p>
//             </div>
//             <Button type="button" variant="outline" size="sm" className="mt-2">
//               Select File
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <File className="size-6 text-slate-400" />
//                 <div>
//                   <p className="max-w-xs truncate text-sm font-medium">
//                     {file.name}
//                   </p>
//                   <p className="text-xs text-slate-500">
//                     {formatFileSize(file.size)}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={removeFile}
//                 className="rounded-full p-1 text-slate-500 hover:bg-slate-200 hover:text-red-600"
//                 aria-label="Remove file"
//               >
//                 <X className="size-5" />
//               </button>
//             </div>

//             {isUploading && (
//               <div className="space-y-1">
//                 <Progress value={uploadProgress} className="h-2" />
//                 <p className="text-right text-xs text-slate-500">
//                   {uploadProgress}%
//                 </p>
//               </div>
//             )}

//             {uploadComplete && (
//               <div className="flex items-center text-sm text-green-600">
//                 <Check className="mr-1 size-4" />
//                 <span>File uploaded successfully</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {(error || uploadError) && (
//         <Alert variant="destructive" className="py-2">
//           <AlertCircle className="size-4" />
//           <AlertDescription>{error || uploadError}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default FileUploader;
