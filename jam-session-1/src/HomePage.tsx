"use client";

import DiscoverEvent from "@/components/discover-event";
import MyEvent from "@/components/my-event";
import Navbar from "@/components/navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEvent from "@/hooks/useEvent";
import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import { useEffect } from "react";
import { LuCompass, LuTicket } from "react-icons/lu";
import CreateEventModal from "./components/create-event";

export default function HomePage() {
  const { connected } = useConnection();
  const address = useActiveAddress();
  const [eventState, eventFunction] = useEvent();

  useEffect(() => {
    eventFunction.fetchAllEvents?.();
  }, []);

  useEffect(() => {
    if (!connected) return;
    eventFunction.fetchMyEvents?.(address);
  }, [connected]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative min-h-screen w-full max-w-5xl mx-auto flex flex-col">
        <Navbar />
        <div className="flex flex-col w-full px-5">
          <Tabs defaultValue="discover">
            <div className="mb-[8px] flex w-full items-center justify-between">
              <TabsList className={`grid ${connected ? "grid-cols-2" : ""}`}>
                <TabsTrigger className="px-3" value="discover">
                  <LuCompass className="h-4 w-4 mr-2" />
                  Discover
                </TabsTrigger>
                {connected && (
                  <TabsTrigger className="px-3" value="myevent">
                    <LuTicket className="h-4 w-4 mr-2" />
                    My Events
                  </TabsTrigger>
                )}
              </TabsList>
              <CreateEventModal disabled={!connected} />
            </div>
            <DiscoverEvent eventState={eventState} />
            <MyEvent eventState={eventState} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
