/* eslint-disable @typescript-eslint/no-unused-vars */
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import { useEffect, useState } from "react";
import { aoRoomMessages } from "@/lib/ao-utils";

export function Chat({ selectedRoom }) {
  const [messageList, setMessageList] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchMessage = async (page: number) => {
    const _data = await aoRoomMessages(selectedRoom, page, pageSize);
    setCurrentPage(_data?.data?.currentPage);
    setTotalPages(_data?.data?.totalPages);
    return _data?.data?.messages;
  };

  const loadMessages = async () => {
    const newMessages = await fetchMessage(currentPage);
    setMessageList(newMessages);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [pageSize, selectedRoom]);

  return (
    <div className="flex flex-col justify-between w-full h-[calc(100dvh)]">
      <ChatTopbar selectedRoom={selectedRoom} />
      <ChatList
        setPageSize={setPageSize}
        hasNext={totalPages > currentPage}
        selectedRoom={selectedRoom}
        messages={messageList}
        pendingMessages={pendingMessages}
        setPendingMessages={setPendingMessages}
      />
    </div>
  );
}
