"use client";

import EditorPanel from "@/components/editor/editor-panel";
import { useEffect, useState } from "react";
import { HTMLTOJSX_DEFAULT_VALUE } from "@/constant/data";
import { useEditorStore } from "@/store/editor-store";

export default function HTMLToJSXComponent() {
  const [data, setData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const { sourceCode, setSourceCode } = useEditorStore((state) => state);

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
          setData(result?.jsx);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to convert, please try again");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sourceCode]);

  // Set initial default value
  useEffect(() => {
    setSourceCode(HTMLTOJSX_DEFAULT_VALUE);
  }, [setSourceCode]);

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
    </div>
  );
}
