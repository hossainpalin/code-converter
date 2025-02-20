"use client";

import EditorPanel from "@/components/editor/editor-panel";
import { ChangeEvent, useEffect, useState } from "react";
import { useEditorStore } from "@/store/editor-store";
import { useUploadStore } from "@/store/upload-store";
import UploadModal from "@/components/upload/modal";
import SettingsModal from "@/components/settings/modal";
import AlertModal from "@/components/alert/alert-modal";
import { SVGTOJSX_DEFAULT_VALUE } from "@/constant/data";

export default function SVGToJSXComponent() {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const [settings, setSettings] = useState({
    title: "HTML to JSX",
    createFunction: false,
    createArrowFunction: false
  });

  const { sourceCode, setSourceCode } = useEditorStore((state) => state);
  const { uploadedFile, fetchedFile } = useUploadStore((state) => state);

  // Handle settings
  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  // Convert svg to jsx
  useEffect(() => {
    if (sourceCode) {
      const fetchData = async () => {
        try {
          setError(null);
          const response = await fetch("/api/svg-to-jsx", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ svg: sourceCode })
          });

          if (!response.ok) {
            setError(response.statusText);
            setIsLoading(false);
            return;
          }

          const result = await response.json();

          if (!result?.error) {
            setIsLoading(false);
            if (result?.jsx) {
              let jsx = result.jsx;
              // Apply function component template
              if (settings.createFunction) {
                jsx = jsx.replace("<svg", "<svg {...props} ");
                setData(`import * as React from "react";
                
                export default function SvgComponent(props) {
              return (
                ${jsx}
                );
              }`);
                return;
              }

              if (settings.createArrowFunction) {
                jsx = jsx.replace("<svg", "<svg {...props} ");
                setData(`import * as React from "react";
                
                const SvgComponent = (props) => {
              return (
                ${jsx}
                );
              }
              
              export default SvgComponent`);
                return;
              }

              setData(jsx);
            }
          } else {
            setError(result.error);
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
          setError("Failed to convert, please try again");
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setError("Missing SVG code");
    }
  }, [sourceCode, settings]);

  // Set initial default value and upload content for editor
  useEffect(() => {
    const uploadedContent = uploadedFile || fetchedFile;
    setSourceCode(uploadedContent || SVGTOJSX_DEFAULT_VALUE);
  }, [setSourceCode, uploadedFile, fetchedFile]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100%-50px)] w-full items-center justify-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <EditorPanel
        editorTitle="SVG"
        resultTitle="JSX"
        editorLanguage="html"
        resultLanguage="javascript"
        editorValue={sourceCode}
        editorDefaultValue={sourceCode}
        resultValue={data}
      />
      <SettingsModal title={settings.title}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-x-2 rounded-md bg-gray-200 p-2 px-3 dark:bg-neutral-700/50">
            <label className="text-gray-700 dark:text-gray-300">
              Create function component
            </label>

            <input
              disabled={!sourceCode || settings.createArrowFunction}
              type="checkbox"
              className="size-[18px] cursor-pointer disabled:cursor-not-allowed"
              name="createFunction"
              checked={settings.createFunction}
              onChange={handleSettingsChange}
            />
          </div>

          <div className="flex items-center justify-between gap-x-2 rounded-md bg-gray-200 p-2 px-3 dark:bg-neutral-700/50">
            <label className="text-gray-700 dark:text-gray-300">
              Create arrow function component
            </label>

            <input
              disabled={!sourceCode || settings.createFunction}
              type="checkbox"
              className="size-[18px] cursor-pointer disabled:cursor-not-allowed"
              name="createArrowFunction"
              checked={settings.createArrowFunction}
              onChange={handleSettingsChange}
            />
          </div>
        </div>
      </SettingsModal>
      <UploadModal acceptedFileTypes={"text/svg"} />
      <AlertModal message={error} />
    </div>
  );
}
