import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { TiClipboard } from "react-icons/ti";
import { toast } from "sonner";

interface LogDocument {
  id?: string;
  time: string | number;
  level: string;
  message: string;
}

interface ILogRow {
  log: LogDocument;
}

const resetCopyMS = 2000;

export default function LogRow({ log }: ILogRow) {
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [copiedURL, setCopiedURL] = useState<boolean>(false);

  useEffect(() => {
    if (!copiedMessage) return;
    const to = setTimeout(() => {
      setCopiedMessage(false);
    }, resetCopyMS);
    return () => clearTimeout(to);
  }, [copiedMessage]);

  useEffect(() => {
    if (!copiedURL) return;
    const to = setTimeout(() => {
      setCopiedURL(false);
    }, resetCopyMS);
    return () => clearTimeout(to);
  }, [copiedURL]);

  const handleCopyMessage = async (e?: React.MouseEvent) => {
    await navigator.clipboard.writeText(log.message);
    toast.success("Copied log message to clipboard.", {
      className: "bg-green-500 text-white",
      duration: resetCopyMS,
    });
    setCopiedMessage(true);
  };

  const handleCopyURL = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the event from bubbling up
    await navigator.clipboard.writeText(window.location.href + "/" + log.id);
    toast.success("Copied log shareable URL to clipboard.", {
      className: "bg-green-500 text-white",
      duration: resetCopyMS,
    });
    setCopiedURL(true);
  };

  // Separate handler for the button click
  const handleMessageButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the event from bubbling up
    await handleCopyMessage();
  };

  return (
    <div
      key={log.id}
      className="group relative cursor-pointer rounded-md p-2 hover:bg-zinc-900"
      onClick={handleCopyMessage}
    >
      <menu className="absolute right-2 -top-3 z-10 hidden items-center gap-2 group-hover:flex">
        <li>
          <button
            className="rounded-xl bg-zinc-800 p-2 border-[1px] ease-in-out duration-100 active:scale-[0.9] border-zinc-900 text-gray-200 hover:bg-zinc-700"
            data-copied={copiedMessage}
            onClick={handleMessageButtonClick}
          >
            {copiedMessage ? <FaCheck /> : <TiClipboard />}
          </button>
        </li>
        <li>
          <button
            className="rounded-xl bg-zinc-800 p-2 border-[1px] ease-in-out duration-100 active:scale-[0.9] border-zinc-900 text-gray-200 hover:bg-zinc-700"
            data-copied={copiedURL}
            onClick={handleCopyURL}
          >
            {copiedURL ? <FaCheck /> : <IoLinkOutline />}
          </button>
        </li>
      </menu>

      <span className="mr-4 text-gray-200">
        {new Date(log.time).toLocaleString("he-IL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </span>
      <span className={getLevelColor(log.level)}>
        {" "}
        [{log.level.toUpperCase()}]{" "}
      </span>
      <span>{log.message}</span>
    </div>
  );
}

function getLevelColor(level: string) {
  switch (level) {
    case "info":
      return "text-cyan-400";
    case "warn":
      return "text-yellow-400";
    case "error":
      return "text-red-400";
    default:
      return "text-gray-300";
  }
}
