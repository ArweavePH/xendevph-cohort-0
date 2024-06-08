"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { aoMyRoomList } from "@/lib/ao-utils";
import CreateRoomModal from "./add-room";
import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import { useNavigate } from "react-router-dom";
import { LucideLogOut } from "lucide-react";

export function Sidebar({
  isCollapsed,
  isMobile,
  setSelectedRoom,
  selectedRoom,
}) {
  const address = useActiveAddress();
  const navigate = useNavigate();
  const { disconnect } = useConnection();
  const [rooms, setRooms] = useState([]);

  const fetchRoomList = async () => {
    if (!address) return;

    const _data = await aoMyRoomList(address);

    if (_data?.status) {
      setRooms(_data?.data);
    }
  };

  useEffect(() => {
    if (!address) return;
    fetchRoomList();

    const intervalId = setInterval(() => {
      fetchRoomList();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [address]);

  return (
    <div
      data-collapsed={isCollapsed || isMobile}
      className="relative group flex flex-col h-full gap-2 py-2 bg-blue-500 text-white"
    >
      {!isCollapsed && (
        <div className="flex justify-between py-2 px-4 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-bold text-lg tracking-widest">ROOMS</p>
            <span className="font-bold text-lg tracking-widest">
              ({rooms.length})
            </span>
          </div>

          <div>
            <CreateRoomModal refetchRoomList={fetchRoomList} />
          </div>
        </div>
      )}
      <nav className="flex-1 flex flex-col gap-1 md:px-4 items-center">
        {isCollapsed && (
          <div className="flex flex-col items-center justify-center">
            <CreateRoomModal refetchRoomList={fetchRoomList} />
          </div>
        )}
        {rooms.map((item, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedRoom(item.room_name);
                    }}
                    className={`${
                      item.room_name === selectedRoom
                        ? "bg-black/20"
                        : "hover:bg-black/10"
                    } flex items-center gap-4 rounded-md`}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={`https://api.dicebear.com/8.x/rings/svg?seed=${item.room_name}`}
                        alt={item.room_name}
                        width={6}
                        height={6}
                        className="w-10 h-10"
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{item.room_name}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {item.room_name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <button
              key={index}
              onClick={() => {
                setSelectedRoom(item.room_name);
              }}
              className={`${
                item.room_name === selectedRoom
                  ? "bg-black/20"
                  : "hover:bg-black/10"
              } flex items-center gap-4 py-2 px-4 rounded-2xl w-full`}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={`https://api.dicebear.com/8.x/rings/svg?seed=${item.room_name}`}
                  alt={item.room_name}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-base">{item.room_name}</span>
                <span className="text-xs truncate ">
                  {item.members > 1
                    ? `${item.members} Members`
                    : "Invite a member"}
                </span>
              </div>
            </button>
          )
        )}
      </nav>
      {!isCollapsed && (
        <div className="px-4 w-full">
          <button
            type="button"
            onClick={async () => {
              await disconnect();
              navigate("/");
            }}
            className="w-full shrink-0 text-black text-sm uppercase tracking-widest font-bold text-center rounded-full bg-white py-2 px-8 h-12"
          >
            Logout
          </button>
        </div>
      )}
      {isCollapsed && (
        <button
          type="button"
          onClick={() => {
            disconnect();
            navigate("/");
          }}
          className="h-10 w-10 rounded-full bg-white p-2 flex flex-col items-center justify-center self-center transition duration-300 ease-in-out hover:opacity-85 hover:shadow-md"
        >
          <LucideLogOut className="text-red-500" size="1.2em" />
        </button>
      )}
    </div>
  );
}
