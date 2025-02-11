"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { prettierFormatter } from "@/utils/prettier-formatter";

interface IResultEditorProps {
  height?: string;
  language?: string;
  content?: string;
}

export default function ResultEditor({
  height,
  language,
  content
}: IResultEditorProps) {
  const [formattedCode, setFormattedCode] = useState<string>("");
  const { theme } = useTheme();

  // Format code using prettier
  useEffect(() => {
    const formattedCode = async () => {
      const response = await prettierFormatter({
        code: content!,
        language: language!
      });

      if (response?.success) {
        setFormattedCode(response.formattedCode!);
      } else {
        // TODO: Handle error
      }
    };

    formattedCode();
  }, [content, language]);

  return (
    <Editor
      className="bg-white pt-4 dark:bg-[#1E1E1E]"
      height={height}
      language={language}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      defaultLanguage={language}
      value={formattedCode || content}
      defaultValue={formattedCode || content}
      options={{
        overviewRulerBorder: false,
        automaticLayout: true,
        contextmenu: false,
        wordWrap: "on",
        fontSize: 16,
        readOnly: true,
        codeLens: false,
        fontFamily: "Menlo, Consolas, monospace, sans-serif",
        minimap: {
          enabled: false
        },
        quickSuggestions: false,
        renderValidationDecorations: "off"
      }}
    />
  );
}
