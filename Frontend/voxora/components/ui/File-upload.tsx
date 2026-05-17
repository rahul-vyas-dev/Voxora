import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { Check, RefreshCcw, Upload } from "lucide-react";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

export const FileUpload = ({
  onChange,
  defaultValues,
}: {
  onChange: (files: File) => void;
  defaultValues: boolean;
}) => {
  const [files, setFiles] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resolveFile = (incomingFiles: File | File[] | FileList | null | undefined): File | null => {
    if (!incomingFiles) return null;
    if (incomingFiles instanceof File) return incomingFiles;
    if (incomingFiles instanceof FileList) return incomingFiles[0] ?? null;
    if (Array.isArray(incomingFiles)) return incomingFiles[0] ?? null;
    return null;
  };

  const handleFileChange = (newFiles: File | File[] | FileList | null | undefined) => {
    const updatedFiles = resolveFile(newFiles);
    setFiles(updatedFiles);

    if (updatedFiles) {
      onChange(updatedFiles);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFiles(null);
  }, [defaultValues]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles),
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-fit" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        className="group/file relative block h-fit w-fit cursor-pointer overflow-hidden rounded-lg"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
          name="UserImage"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="relative mx-auto w-fit max-w-xl p-1">
            {!files && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative z-40 flex h-fit w-full items-center justify-center rounded-md bg-transparent p-3 group-hover/file:shadow-2xl dark:bg-neutral-900",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-neutral-600"
                  >
                    Drop it
                    <Upload className="hover:-translate-x-0.5hover:shadow-[8px_8px_0px_#4f46e5] rounded-2xl border-2 border-white/10 bg-[#b8c0ff] px-5 py-2 font-semibold text-black shadow-[6px_6px_0px_#4f46e5] transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:shadow-[3px_3px_0px_#4f46e5]" />
                  </motion.p>
                ) : (
                  <div className="flex h-fit w-full flex-col items-center justify-center gap-1">
                    <Upload className="h-14 w-14 text-indigo-100" />
                    <span className="hover:-translate-x-0.5hover:shadow-[8px_8px_0px_#4f46e5] rounded-2xl border-2 border-white/10 bg-[#b8c0ff] px-5 py-2 font-semibold text-black shadow-[6px_6px_0px_#4f46e5] transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:shadow-[3px_3px_0px_#4f46e5]">
                      Browse File
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {files && (
              <motion.div
                layoutId="file-upload"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                }}
                className="relative z-40 flex h-fit w-full flex-col items-center justify-center gap-4 rounded-[30px] p-2"
              >
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_50%)]" />

                {/* success icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-[24px] border-[3px] border-emerald-300 bg-emerald-400 shadow-[8px_8px_0px_#065f46]">
                  <Check className="h-8 w-8 text-black" />
                </div>

                {/* title */}
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight text-white">Audio Ready</h3>

                  <button
                    type="button"
                    className="group relative rounded-2xl border-[3px] border-violet-300 bg-[#1a1a28] px-6 py-3 font-black tracking-tight text-violet-200 shadow-[6px_6px_0px_#7c3aed] transition-all duration-200 hover:-translate-y-1 hover:shadow-[10px_10px_0px_#7c3aed] active:translate-y-1 active:shadow-[3px_3px_0px_#7c3aed]"
                  >
                    <span className="flex items-center gap-2">
                      <RefreshCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      Select Another
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// const mainVariant = {
//   initial: {
//     x: 0,
//     y: 0,
//   },
//   animate: {
//     x: 20,
//     y: -20,
//     opacity: 0.9,
//   },
// };

// export const FileUpload = ({
//   onChange,
//   defaultValues,
// }: {
//   onChange: (files: File) => void;
//   defaultValues: boolean;
// }) => {
//   const [files, setFiles] = useState<File|null>();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const handleFileChange = (newFiles: File) => {
//     const updatedFiles = newFiles;
//     setFiles(updatedFiles);
//     onChange(updatedFiles);
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setFiles(null);
//   }, [defaultValues]);

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const { getRootProps, isDragActive } = useDropzone({
//     multiple: false,
//     noClick: true,
//     onDrop: handleFileChange,
//     onDropRejected: (error) => {
//       console.log(error);
//     },
//   });

//   return (
//     <div className="w-fit" {...getRootProps()}>
//       <motion.div
//         onClick={handleClick}
//         className="group/file block rounded-lg cursor-pointer w-fit relative overflow-hidden h-fit "
//       >
//         <input
//           ref={fileInputRef}
//           id="file-upload-handle"
//           type="file"
//           onChange={(e) => handleFileChange(e.target.files)}
//           className="hidden"
//           name="UserImage"
//         />
//         <div className="flex flex-col items-center justify-center">
//           <div className="relative w-fit max-w-xl mx-auto p-1">
//             {!files && (
//               <motion.div
//                 layoutId="file-upload"
//                 variants={mainVariant}
//                 transition={{
//                   type: "spring",
//                   stiffness: 300,
//                   damping: 20,
//                 }}
//                 className={cn(
//                   "relative group-hover/file:shadow-2xl z-40 bg-transparent dark:bg-neutral-900 flex items-center justify-center h-fit w-full rounded-md p-3",
//                   "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
//                 )}
//               >
//                 {isDragActive ? (
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="text-neutral-600 flex flex-col items-center"
//                   >
//                     Drop it
//                     <Upload className="h-14 w-14 text-indigo-100" />
//                   </motion.p>
//                 ) : (
//                   <div className="flex flex-col gap-1 items-center justify-center h-fit w-full">
//                     <Upload className="h-14 w-14 text-indigo-100" />
//                     <span className="rounded-2xl border-2 border-white/10 bg-[#b8c0ff] px-5 py-2 font-semibold text-black shadow-[6px_6px_0px_#4f46e5] transition-all duration-200 hover:-translate-y-1 hover:-translate-x-0.5hover:shadow-[8px_8px_0px_#4f46e5] active:translate-y-1 active:shadow-[3px_3px_0px_#4f46e5]">
//                       Browse File
//                     </span>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };
