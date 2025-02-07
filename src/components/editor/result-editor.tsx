"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  return (
    <Editor
      className="bg-white pt-4 dark:bg-[#1E1E1E]"
      height={height}
      language={language}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      defaultLanguage={language}
      value={content}
      defaultValue={content}
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
