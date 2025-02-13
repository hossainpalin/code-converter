"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useEditorStore } from "@/store/editor-store";
import { useUploadStore } from "@/store/upload-store";
import { HTMLTOPUG_DEFAULT_VALUE } from "@/constant/data";
import AlertModal from "@/components/alert/alert-modal";
import UploadModal from "@/components/upload/modal";
import EditorPanel from "@/components/editor/editor-panel";
import SettingsModal from "@/components/settings/modal";

export default function HTMLToPUGComponent() {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const [settings, setSettings] = useState({
    title: "HTML to Pug",
    options: {
      tabs: false,
      commas: true,
      doubleQuotes: false,
      fragment: false
    }
  });

  const { sourceCode, setSourceCode } = useEditorStore((state) => state);
  const { uploadedFile, fetchedFile } = useUploadStore((state) => state);

  const optionsFields = [
    {
      label: "Use Tabs",
      name: "tabs",
      type: "checkbox",
      value: settings.options.tabs
    },
    {
      label: "Use Commas",
      name: "commas",
      type: "checkbox",
      value: settings.options.commas
    },
    {
      label: "Use Double Quotes",
      name: "doubleQuotes",
      type: "checkbox",
      value: settings.options.doubleQuotes
    },
    {
      label: "Use Fragment",
      name: "fragment",
      type: "checkbox",
      value: settings.options.fragment
    }
  ];

  // Handle settings
  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      options: { ...prev.options, [name]: checked }
    }));
  };

  // Convert html to pug
  useEffect(() => {
    if (sourceCode) {
      const fetchData = async () => {
        try {
          setError(null);
          const response = await fetch("https://html-to-pug.vercel.app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              html: sourceCode,
              settings: settings.options
            })
          });

          const result = await response.json();
          setIsLoading(false);

          if (response.status === 420) {
            setError(result.error);
            return;
          }

          setData(result.pug);
        } catch (error) {
          console.error(error);
          setError("Failed to fetch content, please try again");
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setError("Missing HTML code");
    }
  }, [sourceCode, settings.options]);

  // Set initial default value and upload content for editor
  useEffect(() => {
    const uploadedContent = uploadedFile || fetchedFile;
    setSourceCode(uploadedContent || HTMLTOPUG_DEFAULT_VALUE);
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
        editorTitle="HTML"
        resultTitle="Pug"
        editorLanguage="html"
        resultLanguage={"pug"}
        editorValue={sourceCode}
        editorDefaultValue={sourceCode}
        resultValue={data}
      />

      <SettingsModal title={settings.title}>
        <div className="flex flex-col space-y-4">
          {optionsFields.map((option) => (
            <div
              key={option.name}
              className="flex items-center justify-between gap-x-2 rounded-md bg-gray-200 p-2 px-3 dark:bg-neutral-700/50"
            >
              <label className="text-gray-700 dark:text-gray-300">
                {option.label}
              </label>

              <input
                disabled={!sourceCode}
                type={option.type}
                className="size-[18px] cursor-pointer disabled:cursor-not-allowed"
                name={option.name}
                checked={option.value}
                onChange={handleSettingsChange}
              />
            </div>
          ))}
        </div>
      </SettingsModal>
      <UploadModal acceptedFileTypes={"text/html"} />
      <AlertModal message={error} />
    </div>
  );
}
