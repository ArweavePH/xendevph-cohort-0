"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { LuHome, LuLoader, LuMapPin } from "react-icons/lu";
import Markdown from "react-markdown";
import { useNavigate, useSearchParams } from "react-router-dom";

const EventPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const txid = searchParams.get("tx");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const fetchItem = await fetch(`https://arweave.net/${txid}`).then((res) =>
        res.json()
      );
      setData({ id: txid, ...fetchItem });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!txid) return;
    fetchEvent();
  }, [txid]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative min-h-screen w-full max-w-5xl mx-auto flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col w-full px-5">
          {loading && <LuLoader className="mx-auto h-10 w-10 animate-spin" />}
          {!loading && !data && (
            <section className="mx-auto flex-1 gap-4 flex max-w-5xl flex-col w-full pb-10 items-center justify-center">
              <p className="text-3xl">Event not found! :(</p>
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                <LuHome className="h-4 w-4 mr-4" />
                Go to Home
              </Button>
            </section>
          )}

          {data && (
            <section className="mx-auto flex max-w-5xl flex-col-reverse md:flex-row w-full md:gap-8 pb-10">
              <div className="flex h-full flex-col gap-10 md:gap-4">
                <img
                  className="hidden bg-muted-foreground/20 aspect-[1/1] h-[358px] flex-col items-center justify-center rounded-xl md:flex md:h-[280px] lg:h-[330px]"
                  src={data?.banner}
                  alt=""
                />

                <div className="hidden md:flex max-w-[362px] flex-col gap-2">
                  <div className="flex w-full items-center gap-2">
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col">
                        <p className="text-[12px]">Presented by</p>
                        <h1 className="line-clamp-1">{data?.organizer}</h1>
                      </div>
                      <img
                        className="h-9 w-9 rounded-full"
                        src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${data?.organizer}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 w-full flex-col gap-4">
                <img
                  className="flex aspect-[1/1] h-[358px] flex-col items-center justify-center rounded-xl md:hidden md:h-[280px] lg:h-[330px]"
                  src={data?.banner}
                  alt=""
                />
                <div className="flex flex-col gap-6 md:gap-8 text-left">
                  <div className="flex flex-col gap-4 pt-2">
                    <h3 className="text-[24px] md:text-[38px] font-semibold leading-tight">
                      {data?.name}
                    </h3>
                  </div>
                  <div className="flex md:hidden w-full flex-col gap-2">
                    <div className="flex w-full items-center gap-2">
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <p className="text-[12px]">Presented by</p>
                          <h1 className="line-clamp-1">{data?.organizer}</h1>
                        </div>
                        <img
                          className="h-9 w-9 rounded-full"
                          src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${data?.organizer}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex">
                      <div className="h-[50px] w-[50px] rounded-lg border border-foreground/30 text-center">
                        <div className="rounded-t-md bg-foreground py-1 text-[9px] font-medium uppercase text-background">
                          {formatDate(data?.start_at).monthLongName}
                        </div>
                        <div className="flex flex-1 items-center justify-center rounded-b-md p-0.5 text-[16px] font-medium uppercase text-muted-foreground">
                          {formatDate(data?.start_at).day}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col justify-center gap-0.5">
                        <div className="text-[16px] font-medium">
                          {formatDate(data?.start_at).dayName},{" "}
                          {formatDate(data?.start_at).monthLongName}{" "}
                          {formatDate(data?.start_at).day}
                        </div>
                        <div className="text-[14px] font-medium text-muted-foreground">
                          {formatDate(data?.start_at).time}
                          {" - "}
                          {data?.end_at - data?.start_at >= 24 * 60 * 60 * 1000
                            ? `${formatDate(data?.end_at).monthLongName} ${
                                formatDate(data?.end_at).day
                              }, `
                            : ""}
                          {formatDate(data?.end_at).time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-foreground/30 text-center">
                        <LuMapPin className="text-xl text-muted-foreground" />
                      </div>
                      <div className="ml-4 font-medium flex gap-1 text-[16px]">
                        {data?.location}{" "}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-[16px] border-b border-foreground/30 pb-[8px] text-[14px] font-medium text-muted-foreground">
                      About Event
                    </h3>
                    <Markdown
                      className={
                        "prose prose-sm prose-headings:text-foreground prose-p:text-foreground prose-a:text-foreground"
                      }
                    >
                      {data?.description}
                    </Markdown>
                  </div>

                  <div>
                    <h3 className="mb-[16px] border-b border-foreground/30 pb-[8px] text-[14px] font-medium text-muted-foreground">
                      Location
                    </h3>
                    <h3 className="text-[18px] leading-6">{data?.location}</h3>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
