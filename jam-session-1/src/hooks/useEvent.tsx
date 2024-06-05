import { useState } from "react";

import { toast } from "@/components/ui/use-toast";
import Query from "@irys/query";

export default function useEvent() {
  const [loading, setLoading] = useState(true);
  const [loadingMyEvent, setLoadingMyEvent] = useState(true);
  const [allEvent, setAllEvent] = useState([]);
  const [myEvent, setMyEvent] = useState([]);

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      const _allEvent = [];

      const myQuery = new Query({ network: "arweave" });
      const results = await myQuery
        .search("arweave:transactions")
        .tags([
          { name: "Content-Type", values: ["application/json"] },
          {
            name: "App-Name",
            values: ["xendevph-weavent"],
          },
          {
            name: "App-Version",
            values: ["1.0.0"],
          },
        ])
        .sort("DESC")
        .limit(10);

      for (let index = 0; index < results.length; index++) {
        const item = results[index];
        const fetchItem = await fetch(`https://arweave.net/${item.id}`).then(
          (res) => res.json()
        );

        const _data = {
          id: item.id,
          ...fetchItem,
        };
        _allEvent.push(_data);
      }

      setAllEvent(_allEvent?.sort((a, b) => b.start_at - a.start_at));
    } catch (e) {
      const error = e?.data?.message || e.message;

      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEvents = async (address) => {
    if (!address) return;
    setLoadingMyEvent(true);
    try {
      const _myEvent = [];

      const myQuery = new Query({ network: "arweave" });
      const results = await myQuery
        .search("arweave:transactions")
        .tags([
          { name: "Content-Type", values: ["application/json"] },
          {
            name: "App-Name",
            values: ["xendevph-weavent"],
          },
          {
            name: "App-Version",
            values: ["1.0.0"],
          },
        ])
        .from([address!])
        .sort("DESC")
        .limit(10);

      for (let index = 0; index < results.length; index++) {
        const item = results[index];
        const fetchItem = await fetch(`https://arweave.net/${item.id}`).then(
          (res) => res.json()
        );

        const _data = {
          id: item.id,
          ...fetchItem,
        };
        _myEvent.push(_data);
      }

      setMyEvent(_myEvent);
    } catch (e) {
      const error = e?.data?.message || e.message;

      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
        duration: 1000,
      });
    } finally {
      setLoadingMyEvent(false);
    }
  };

  return [
    {
      loading,
      allEvent,
      myEvent,
      loadingMyEvent,
    },
    {
      setLoading,
      fetchAllEvents,
      fetchMyEvents,
    },
  ];
}
