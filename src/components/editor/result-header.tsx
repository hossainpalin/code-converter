"use client";

import { Copy } from "lucide-react";
import { Tooltip } from "react-tooltip";

interface IResultHeaderProps {
  title?: string;
}

export default function ResultHeader({ title }: IResultHeaderProps) {
  return (
    <div className="editor-header">
      <div className="flex size-full items-center justify-between">
        <h1 className="editor-header-title">{title}</h1>

        <button data-tooltip-id="copy-tooltip" className="editor-header-button">
          <Copy className="editor-header-button-text" />
        </button>

        <Tooltip id="copy-tooltip" place="bottom" content="Copy" />
      </div>
    </div>
  );
}
