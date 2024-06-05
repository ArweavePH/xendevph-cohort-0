import { TabsContent } from "@/components/ui/tabs";
import { LuLoader, LuMapPin } from "react-icons/lu";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

const MyEvent = ({ eventState }) => {
  return (
    <TabsContent className="pt-[32px] text-foreground" value="myevent">
      {eventState?.loadingMyEvent && (
        <div className="mb-[48px] mt-[64px] flex h-[348px] flex-col items-center justify-center">
          <LuLoader className="h-10 w-10 animate-spin" />
        </div>
      )}
      {eventState?.myEvent?.length === 0 && !eventState?.loadingMyEvent && (
        <div className="mb-[48px] mt-[64px] flex h-[348px] flex-col items-center justify-center">
          <div className="text-[24px] font-semibold text-[#FFFFFFC9]">
            No Events
          </div>
          <div className="text-[16px] font-semibold text-[#FFFFFF80]">
            Why not host one?
          </div>
        </div>
      )}
      {eventState?.myEvent?.length > 0 && !eventState?.loadingMyEvent && (
        <div className="w-full mx-auto py-4">
          <div className="relative border-l-[2px] border-dashed border-muted-foreground md:ml-[200px]">
            {eventState?.myEvent?.map((event, index: number) => (
              <div key={index} className="mb-[30px] md:mb-10 md:ml-4">
                <div className="absolute -left-[7.5px] h-3 w-3 rounded-full bg-primary"></div>
                <div className="mb-[10px] ml-6 flex items-left gap-2 md:absolute md:-left-[200px] md:ml-0 md:flex-col md:gap-0">
                  <h3 className="text-[17px] text-foreground">
                    {formatDate(event?.start_at).monthLongName}{" "}
                    {formatDate(event?.start_at).day}
                  </h3>
                  <h3 className="text-[16px] text-muted-foreground">
                    {formatDate(event?.start_at).dayName}
                  </h3>
                </div>
                <Link to={`/e?tx=${event?.id}`}>
                  <div className="cursor-pointer hover:scale-[1.01] transition-all duration-500 ml-6 flex flex-row justify-between gap-1 rounded-md border border-foreground/10 bg-foreground/5 px-5 py-3 backdrop-blur-md">
                    <div className="flex flex-col items-start text-left">
                      <h3 className="text-[16px] font-medium text-muted-foreground md:text-[18px] flex items-center gap-3">
                        {formatDate(event?.start_at).time}{" "}
                        {event?.end_at < Date.now() ? (
                          <span className="px-1 py-0.5 rounded-md bg-gray-500/40 text-gray-500 tracking-widest text-xs">
                            Past
                          </span>
                        ) : (
                          <span className="px-1 py-0.5 rounded-md bg-green-500/40 text-green-500 tracking-widest text-xs">
                            Upcoming
                          </span>
                        )}
                      </h3>
                      <h3 className="text-[18px] font-semibold text-foreground md:text-[18px]">
                        {event?.name}
                      </h3>
                      <div className="my-1 flex items-center gap-2">
                        By
                        <img
                          className="h-4 rounded-full"
                          src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${event?.organizer}`}
                          alt=""
                        />
                        <p className="text-foreground">{event?.organizer}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuMapPin className="h-7" />
                        <h3 className="line-clamp-1 text-[16px] font-semibold text-muted-foreground">
                          {event?.location}
                        </h3>
                      </div>
                    </div>
                    <img
                      className="aspect-[1/1] h-[90px] rounded-md md:h-[120px]"
                      src={event?.banner}
                      alt=""
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </TabsContent>
  );
};

export default MyEvent;
