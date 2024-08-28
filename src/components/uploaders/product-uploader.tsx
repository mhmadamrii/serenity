// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import ShineBorder from "../magicui/shine-border";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "~/lib/utils/useUploadThing";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { CloudUpload } from "lucide-react";
import { cn } from "~/lib/utils";

export function ProductUploader({
  isClickedUpload,
  isStillHasErrors,
}: {
  isClickedUpload: boolean;
  isStillHasErrors: boolean;
}) {
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      toast.success("Upload success!");
      setIsLoadingUpload(false);
      setFiles([]);
    },
    onUploadError: () => {
      toast.success("Upload failed!");
      setIsLoadingUpload(false);
    },
    onUploadBegin: () => {
      setIsLoadingUpload(true);
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    if (isClickedUpload && !isStillHasErrors) {
      startUpload(files);
    }
  }, [isClickedUpload, isStillHasErrors]);

  return (
    <section className="flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 p-4 text-center",
          {
            hidden: files.length > 0,
          },
        )}
      >
        {files.length !== 0 ? (
          <>
            <h1>Choosen</h1>
            <h1>{files[0]?.name}</h1>
          </>
        ) : (
          <>
            <input {...getInputProps()} />
            <CloudUpload className="mr-2 h-10 w-10" />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Drag 'n' drop some files here, or click to select files
            </p>
          </>
        )}
      </div>

      <div className="w-full">
        {files.length > 0 && (
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-blue-500"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <h1>Choosen</h1>
            <h1>{files[0]?.name}</h1>
            {/* <Button
              className={cn("absolute h-full w-full hover:bg-transparent", {
                "bg-white hover:bg-white": isLoadingUpload,
              })}
              variant="ghost"
              type="button"
              onClick={() => startUpload(files)}
            >
              {isLoadingUpload ? <LoaderImage /> : "Upload Image"}
            </Button> */}
          </ShineBorder>
        )}
      </div>
    </section>
  );
}
