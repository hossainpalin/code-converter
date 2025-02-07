import EditorPanel from "@/components/editor/editor-panel";

export default function HTMLToJSXComponent() {
  return (
    <div>
      <EditorPanel
        editorTitle="HTML"
        resultTitle="JSX"
        editorLanguage="html"
        resultLanguage="javascript"
        editorValue={""}
        editorDefaultValue={""}
        resultValue={""}
      />
    </div>
  );
}
