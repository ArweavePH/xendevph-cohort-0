import { FileImage, Paperclip, SendHorizontal, ThumbsUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "../ui/textarea";
import { aoSendMessage } from "@/lib/ao-utils";
import { useActiveAddress } from "arweave-wallet-kit";
import FileUpload from "../upload-file";
import { toast } from "../ui/use-toast";

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({ setPendingMessages, selectedRoom }) {
  const address = useActiveAddress();
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = async () => {
    const date = Date.now();
    setPendingMessages((item) => [
      ...item,
      {
        content: { type: "text", value: "👍" },
        user: { address: address },
        room: selectedRoom,
      },
    ]);
    setMessage("");
    await aoSendMessage(
      JSON.stringify({
        id: date,
        content: { type: "text", value: "👍" },
        room_name: selectedRoom,
      })
    ).finally(() => {
      setPendingMessages((item) =>
        item.filter(
          (msg) => msg.content.value !== "👍" && msg.room !== selectedRoom
        )
      );
    });
  };

  const handleSend = async () => {
    const date = Date.now();

    if (message.trim()) {
      setPendingMessages((item) => [
        ...item,
        {
          content: {
            id: date,
            value: message.trim(),
            type: "text",
          },
          user: { address: address },
          room: selectedRoom,
        },
      ]);
      setMessage("");
      await aoSendMessage(
        JSON.stringify({
          content: {
            value: message.trim(),
            type: "text",
          },
          room_name: selectedRoom,
        })
      ).finally(() => {
        setPendingMessages((item) =>
          item.filter(
            (msg) =>
              msg.content.value !== message.trim() && msg.room !== selectedRoom
          )
        );
      });

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  const handleFileSelect = async (data) => {
    console.log("handleFileSelect: txid: ", data);
    try {
      //
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: error?.message,
        duration: 1000,
      });
    }
  };

  const getFileType = (type) => {
    const mimeType = type;

    if (mimeType.startsWith("image/")) {
      return "image";
    }
    if (mimeType === "application/pdf") {
      return "pdf";
    }
    if (mimeType.startsWith("video/")) {
      return "video";
    }
    if (mimeType.startsWith("audio/")) {
      return "audio";
    }

    return "unknown";
  };

  return (
    <div className="py-2 px-4 flex justify-between w-full items-center gap-2 shrink-0">
      <AnimatePresence initial={false}>
        <FileUpload
          key={"fileuploader"}
          onFileSelect={handleFileSelect}
          onSendMessage={async (data) => {
            return await aoSendMessage(
              JSON.stringify({
                content: { value: data.value, type: data.type },
                room_name: selectedRoom,
              })
            );
          }}
          onUploading={(data) => {
            if (data?.status === null || undefined || !data.data) return;

            if (data?.status === true) {
              const reader = new FileReader();
              reader.onload = async () => {
                const arrayBuffer = reader.result;
                setPendingMessages((item) => [
                  ...item,
                  {
                    content: {
                      id: data?.id,
                      value: arrayBuffer,
                      type: getFileType(data.data?.type),
                    },
                    user: { address: address },
                    room: selectedRoom,
                  },
                ]);
                setMessage("");
              };
              reader.onerror = () => {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description: "Failed to read file.",
                  duration: 1000,
                });
              };
              reader.readAsDataURL(data?.data);
            }

            if (data?.status === false) {
              setPendingMessages((item) =>
                item.filter(
                  (msg) =>
                    msg.content.id !== data.id && msg.room !== selectedRoom
                )
              );
            }
          }}
        />
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
          ></Textarea>
        </motion.div>

        {message.trim() ? (
          <button
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </button>
        ) : (
          <button
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
