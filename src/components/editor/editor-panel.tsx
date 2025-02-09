"use client";

import CodeEditor from "@/components/editor/code-editor";
import ResultHeader from "@/components/editor/result-header";
import EditorHeader from "@/components/editor/editor-header";
import ResultEditor from "@/components/editor/result-editor";

interface IEditorPanelProps {
  editorTitle?: string;
  resultTitle?: string;
  editorLanguage?: string;
  resultLanguage?: string;
  editorValue?: string;
  editorDefaultValue?: string;
  resultValue?: string;
}

export default function EditorPanel({
  editorTitle,
  resultTitle,
  editorLanguage,
  resultLanguage,
  editorValue,
  editorDefaultValue,
  resultValue
}: IEditorPanelProps) {
  return (
    <section className="flex size-full flex-col justify-between sm:flex-row sm:items-center">
      <div className="hidden size-full sm:block sm:w-1/2">
        <EditorHeader title={editorTitle} />
        <CodeEditor
          language={editorLanguage}
          value={editorValue}
          defaultValue={editorDefaultValue}
          height="calc(100vh - 6.23rem)"
        />
      </div>

      <div className="hidden size-full border-l border-gray-200 dark:border-neutral-700 sm:block sm:w-1/2">
        <ResultHeader contentToCopy={resultValue} title={resultTitle} />
        <ResultEditor
          language={resultLanguage}
          content={resultValue}
          height="calc(100vh - 6.23rem)"
        />
      </div>

      {/* Mobile */}
      <div className="size-full sm:hidden sm:w-1/2">
        <EditorHeader title={editorTitle} />
        <CodeEditor
          language={editorLanguage}
          value={editorValue}
          defaultValue={editorDefaultValue}
          height="calc(50vh - 6.23rem)"
        />
      </div>

      <div className="size-full border-l border-gray-200 dark:border-neutral-700 sm:hidden sm:w-1/2">
        <ResultHeader contentToCopy={resultValue} title={resultTitle} />
        <ResultEditor
          language={resultLanguage}
          content={resultValue}
          height="calc(50vh - 6.23rem)"
        />
      </div>
    </section>
  );
}
