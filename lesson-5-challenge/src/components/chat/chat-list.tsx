import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useActiveAddress } from "arweave-wallet-kit";
import { Button, buttonVariants } from "../ui/button";
import {
  LucideArrowDown,
  LucideArrowUpRight,
  LucideFile,
  LucideLoader,
} from "lucide-react";
import ChatBottombar from "./chat-bottombar";

export function ChatList({
  selectedRoom,
  messages,
  setPageSize,
  hasNext,
  pendingMessages,
  setPendingMessages,
}) {
  const address = useActiveAddress();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialscroll, setInitialscroll] = useState(true);
  const [initialOpen, setInitialOpen] = useState(true);
  const threshold = 120;

  useEffect(() => {
    setInitialOpen(false);
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;

      const isUserNearBottom = () => {
        return (
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <=
          threshold
        );
      };

      if (initialscroll && messages) {
        container.scrollTop = container.scrollHeight;
        setInitialscroll(false);
      } else if (isUserNearBottom()) {
        container.scrollTop = container.scrollHeight;
      }

      setLoadingMore(false);
    }
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [pendingMessages]);

  const scrollToBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    setPageSize(10);
    setInitialscroll(true);
    setInitialOpen(true);
  }, [selectedRoom]);

  const renderContent = (content, user, id) => {
    if (content.type === "text") {
      return (
        <div
          id={id}
          className="bg-accent px-3 py-3 space-y-1 rounded-md max-w-[250px] md:max-w-xs"
        >
          {user?.address !== address && (
            <p className="text-xs font-bold">{user?.nickname}</p>
          )}
          {content.value}
        </div>
      );
    }
    if (content.type === "image") {
      return (
        <div id={id} className="bg-accent px-3 py-3 space-y-1 rounded-md">
          {user?.address !== address && (
            <p className="text-xs font-bold">{user?.nickname}</p>
          )}
          <img
            src={content.value}
            alt="Image"
            className="rounded-md max-w-[250px] md:max-w-xs"
          />
        </div>
      );
    }
    if (content.type === "video") {
      return (
        <div id={id} className="bg-accent px-3 py-3 space-y-1 rounded-md">
          {user?.address !== address && (
            <p className="text-xs font-bold">{user?.nickname}</p>
          )}
          <video controls className="rounded-md max-w-[250px] md:max-w-xs">
            <source src={content.value} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    if (content.type === "audio") {
      return (
        <div id={id} className="bg-accent px-3 py-3 space-y-1 rounded-md">
          {user?.address !== address && (
            <p className="text-xs font-bold">{user?.nickname}</p>
          )}
          <audio controls className="max-w-[250px] md:max-w-xs">
            <source src={content.value} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    if (content.type === "pdf") {
      return (
        <div id={id} className="bg-accent px-3 py-3 space-y-1 rounded-md">
          {user?.address !== address && (
            <p className="text-xs font-bold">{user?.nickname}</p>
          )}
          <a href={content.value} target="_blank">
            <div className="max-w-[250px] md:max-w-xs rounded-md border border-dashed border-gray-600 p-3 bg-gray-200 text-sm">
              <LucideFile className="inline-block" /> View PDF{" "}
              <LucideArrowUpRight className="inline-block" />
            </div>
          </a>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div className="relative h-full flex flex-col flex-1 overflow-hidden">
        {messagesContainerRef?.current?.scrollHeight -
          messagesContainerRef?.current?.scrollTop -
          messagesContainerRef?.current?.clientHeight >
          threshold && (
          <motion.div
            onClick={() => {
              scrollToBottom();
            }}
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            className={cn(
              buttonVariants({ variant: "default" }),
              "absolute bottom-0 rounded-full text-xs mx-auto mt-4 left-1/2 !-translate-x-1/2 cursor-pointer z-[999]"
            )}
          >
            <LucideArrowDown className="h-4 w-4 text-white" />
          </motion.div>
        )}

        {initialOpen && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center">
            <LucideLoader className="h-6 w-6 mt-4 animate-spin text-black" />
          </div>
        )}

        <div
          ref={messagesContainerRef}
          className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col flex-1 scroll-smooth"
        >
          <AnimatePresence>
            {hasNext && (
              <Button
                onClick={() => {
                  setLoadingMore(true);
                  setPageSize((prev) => prev + 10);
                }}
                variant="default"
                className="rounded-full text-xs mx-auto mt-4"
              >
                {loadingMore && (
                  <LucideLoader className="h-4 w-4 animate-spin text-white" />
                )}
                {!loadingMore && <span className="mx-2">Load More</span>}
              </Button>
            )}
            {messages?.map((message, index) => (
              <motion.div
                key={`message-${index}`}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: messages?.indexOf(message) * 0.05 + 0.2,
                  },
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                className={cn(
                  "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                  message?.user?.address === address
                    ? "items-end"
                    : "items-start"
                )}
              >
                <div className="flex gap-3 items-center">
                  {message?.user?.address !== address && (
                    <img
                      alt={message?.user?.address}
                      className="h-10 w-10 rounded-full"
                      src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${message?.user?.address}`}
                    />
                  )}
                  {renderContent(message.content, message?.user, index)}
                  {message?.user?.address === address && (
                    <img
                      alt={message?.user?.address}
                      className="h-10 w-10 rounded-full"
                      src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${message?.user?.address}`}
                    />
                  )}
                </div>
              </motion.div>
            ))}
            {pendingMessages
              ?.filter((item) => item.room === selectedRoom)
              ?.map((message, index) => (
                <motion.div
                  key={`pending-${message.content.id}`}
                  layout
                  initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: "spring",
                      bounce: 0.3,
                      duration: messages?.indexOf(message) * 0.05 + 0.2,
                    },
                  }}
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  className={cn(
                    "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                    "items-end"
                  )}
                >
                  <div className="flex flex-row-reverse gap-3 items-center">
                    <img
                      alt={message?.user?.address}
                      className="h-10 w-10 rounded-full"
                      src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${message?.user?.address}`}
                    />
                    <div className="flex gap-2 items-center !text-gray-500">
                      <LucideLoader className="h-4 w-4 animate-spin inline-block" />{" "}
                      {renderContent(
                        message.content,
                        message?.user,
                        `pending-${index}`
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
      <ChatBottombar
        setPendingMessages={setPendingMessages}
        selectedRoom={selectedRoom}
      />
    </div>
  );
}
