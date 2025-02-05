"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@heroui/button";
import { CircularProgress } from "@heroui/progress";
import { Alert } from "@heroui/alert";
import { Textarea } from "@heroui/input";

import { ClipBoardIcon, DownloadIcon } from "@/components/icons";

interface FileDropZoneProps {
}

export default function FileDropZone({}: FileDropZoneProps) {
  const [text, setText] = useState<string>("");
  const [normalizedText, setNormalizedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setLoading(true);
    try {
      const file = acceptedFiles[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            const content = event.target.result as string;

            setText(content);
            setNormalizedText(normalizeText(content));
          }
          setLoading(false);
        };
        reader.readAsText(file);
      } else {
        setLoading(false);
      }
    } catch {
      setError("Ocurrió un error al procesar el archivo. Inténtalo de nuevo.");
      setLoading(false);
    }
  }, []);

  const normalizeText = (input: string): string => {
    return input.trim().replace(/\s+/g, " ").toLowerCase();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(normalizedText);
    alert("Texto copiado al portapapeles");
  };

  const downloadFile = () => {
    const blob = new Blob([normalizedText], { type: "text/plain" });
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "afipxer.txt";
    a.click();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/plain": [".txt"] }
  });

  return (
    <div className="flex flex-col items-center p-6 max-w-2xl mx-auto mt-10 rounded-xl shadow-lg">
      <div
        {...getRootProps()}
        className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-600">
          Arrastra y suelta un archivo de texto aquí o haz clic para seleccionar
          uno
        </p>
      </div>
      {loading && <CircularProgress className="mt-4" />}
      {error && (
        <div className="w-full flex items-center my-3">
          <Alert color="danger" title={error} />
        </div>
      )}
      {text && !loading && (
        <div className="flex flex-col mt-4 w-full items-center">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Textarea
              isReadOnly
              className="max-w-screen-xl flex-grow resize-none w-full h-full p-2 rounded-md mt-2"
              label="Previsualización"
              labelPlacement="outside"
              minRows={12}
              placeholder="Enter your description"
              value={text}
              variant="bordered"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <Button
              className="bg-gradient-to-tr from-blue-500 to-blue-800 text-white shadow-lg"
              startContent={<ClipBoardIcon />}
              onPress={copyToClipboard}
            >
              Copiar
            </Button>
            <Button
              className="bg-gradient-to-tr from-green-600 to-green-800 text-white shadow-lg"
              startContent={<DownloadIcon />}
              onPress={downloadFile}
            >
              Descargar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
