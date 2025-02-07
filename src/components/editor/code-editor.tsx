"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEditorStore } from "@/store/editor-store";

interface ICodeEditorProps {
  height?: string;
  language?: string;
  value?: string;
  defaultValue?: string;
}

export default function CodeEditor({
  height,
  language,
  value,
  defaultValue
}: ICodeEditorProps) {
  const { theme } = useTheme();
  const { setSourceCode } = useEditorStore((state) => state);

  const handleChange = (value: string | undefined) => {
    if (value) {
      setSourceCode(value);
    } else {
      setSourceCode("");
    }
  };

  return (
    <Editor
      className="bg-white pt-4 dark:bg-[#1E1E1E]"
      height={height}
      language={language}
      theme={theme === "dark" ? "vs-dark" : "vs-light"}
      defaultLanguage={language}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      options={{
        overviewRulerBorder: false,
        contextmenu: false,
        wordWrap: "on",
        fontSize: 16,
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
