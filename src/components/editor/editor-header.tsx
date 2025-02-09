"use client";

import { Settings, Share2, Trash2, Upload } from "lucide-react";
import { useEditorStore } from "@/store/editor-store";
import { Tooltip } from "react-tooltip";
import { useUploadStore } from "@/store/upload-store";

interface IEditorHeaderProps {
  title?: string;
}

export default function EditorHeader({ title }: IEditorHeaderProps) {
  const { sourceCode, setSourceCode } = useEditorStore((state) => state);
  const { setIsUploadModalOpen, isUploadModalOpen } = useUploadStore(
    (state) => state
  );

  // Clear editor
  const clearEditor = () => {
    if (sourceCode) {
      setSourceCode("");
    }
  };

  // Handle upload modal
  const handleUpload = () => {
    if (!isUploadModalOpen) {
      setIsUploadModalOpen(true);
    }
  };

  return (
    <div className="editor-header">
      <div className="flex size-full items-center justify-between">
        <h1 className="editor-header-title">{title}</h1>

        <div className="flex items-center justify-center gap-x-3">
          <button
            data-tooltip-id="settings-tooltip"
            className="editor-header-button"
          >
            <Settings className="editor-header-button-text" />
          </button>

          <button
            onClick={handleUpload}
            data-tooltip-id="upload-tooltip"
            className="editor-header-button"
          >
            <Upload className="editor-header-button-text" />
          </button>

          <button
            data-tooltip-id="share-tooltip"
            className="editor-header-button"
          >
            <Share2 className="editor-header-button-text" />
          </button>

          <button
            data-tooltip-id="trash-tooltip"
            onClick={clearEditor}
            className="editor-header-button"
          >
            <Trash2 className="size-[20px] text-red-500" />
          </button>

          <Tooltip
            className="z-50"
            id="settings-tooltip"
            place="bottom"
            content="Settings"
          />

          <Tooltip
            className="z-50"
            id="upload-tooltip"
            place="bottom"
            content="Upload"
          />

          <Tooltip
            className="z-50"
            id="share-tooltip"
            place="bottom"
            content="Share"
          />

          <Tooltip
            className="z-50"
            id="trash-tooltip"
            place="bottom"
            content="Clear"
          />
        </div>
      </div>
    </div>
  );
}
