"use client";

import { Check, Copy } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";

interface IResultHeaderProps {
  title?: string;
  contentToCopy?: string;
}

export default function ResultHeader({
  title,
  contentToCopy
}: IResultHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Copy content to clipboard
  const handleCopy = () => {
    navigator.clipboard
      .writeText(contentToCopy || "")
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Could not copy text: ", error);
      });
  };

  // isCopied false after 1.5 seconds
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 1500);
    }
  }, [isCopied]);

  return (
    <div className="editor-header">
      <div className="flex size-full items-center justify-between">
        <h1 className="editor-header-title">{title}</h1>

        <button
          onClick={handleCopy}
          data-tooltip-id="copy-tooltip"
          className="editor-header-button"
        >
          {isCopied ? (
            <Check className="size-[18px] text-green-500" />
          ) : (
            <Copy className="editor-header-button-text" />
          )}
        </button>

        <Tooltip
          id="copy-tooltip"
          place="bottom"
          content={isCopied ? "Copied" : "Copy"}
        />
      </div>
    </div>
  );
}
