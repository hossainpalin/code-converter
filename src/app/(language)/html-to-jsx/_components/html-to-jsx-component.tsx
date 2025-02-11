"use client";

import EditorPanel from "@/components/editor/editor-panel";
import { ChangeEvent, useEffect, useState } from "react";
import { HTMLTOJSX_DEFAULT_VALUE } from "@/constant/data";
import { useEditorStore } from "@/store/editor-store";
import { useUploadStore } from "@/store/upload-store";
import UploadModal from "@/components/upload/modal";
import SettingsModal from "@/components/settings/modal";

export default function HTMLToJSXComponent() {
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

  // Convert html to jsx
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/html-to-jsx", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: sourceCode })
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
            // Apply function component template
            if (settings.createFunction) {
              setData(`export default function Foo() {
              return (
                ${result.jsx}
                );
              }`);
              return;
            }

            if (settings.createArrowFunction) {
              setData(`const Foo = () => {
              return (
                ${result.jsx}
                );
              }
              export default Foo`);
              return;
            }

            setData(result.jsx);
          }
        }
      } catch (error) {
        console.error(error);
        setError("Failed to convert, please try again");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sourceCode, settings]);

  // Set initial default value and upload content for editor
  useEffect(() => {
    const uploadedContent = uploadedFile || fetchedFile;
    setSourceCode(uploadedContent || HTMLTOJSX_DEFAULT_VALUE);
  }, [setSourceCode, uploadedFile, fetchedFile]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100%-50px)] w-full items-center justify-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100%-50px)] w-full items-center justify-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div>
      <EditorPanel
        editorTitle="HTML"
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
      <UploadModal acceptedFileTypes={"text/html"} />
    </div>
  );
}
