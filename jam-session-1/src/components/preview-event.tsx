import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { LuEye, LuMapPin } from "react-icons/lu";
import Markdown from "react-markdown";

const PreviewEventModal = ({
  name,
  start_at,
  end_at,
  description,
  location,
  organizer,
  banner,
}: {
  name: string;
  start_at: Date;
  end_at: Date;
  description: string;
  location: string;
  organizer: string;
  banner: File | null;
}) => {
  const bannerImage = banner
    ? URL.createObjectURL(banner!)
    : "https://i.imgur.com/XkHp9zo.png";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">
          <LuEye className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-screen text-foreground overflow-y-auto bg-background"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <section className="mx-auto flex max-w-5xl flex-col-reverse md:flex-row w-full md:gap-8">
          <div className="flex h-full flex-col gap-10 md:gap-4">
            <img
              className="hidden bg-muted-foreground/20 aspect-[1/1] h-[358px] flex-col items-center justify-center rounded-xl md:flex md:h-[280px] lg:h-[330px]"
              src={bannerImage}
              alt=""
            />

            <div className="hidden md:flex max-w-[362px] flex-col gap-2">
              <div className="flex w-full items-center gap-2">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <p className="text-[12px]">Presented by</p>
                    <h1 className="line-clamp-1">{organizer}</h1>
                  </div>
                  <img
                    className="h-9 w-9 rounded-full"
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${organizer}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 w-full flex-col gap-4">
            <img
              className="flex aspect-[1/1] h-[358px] flex-col items-center justify-center rounded-xl md:hidden md:h-[280px] lg:h-[330px]"
              src={bannerImage}
              alt=""
            />
            <div className="flex flex-col gap-6 md:gap-8 text-left">
              <div className="flex flex-col gap-4 pt-2">
                <h3 className="text-[24px] md:text-[38px] font-semibold leading-tight">
                  {name}
                </h3>
              </div>
              <div className="flex md:hidden w-full flex-col gap-2">
                <div className="flex w-full items-center gap-2">
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                      <p className="text-[12px]">Presented by</p>
                      <h1 className="line-clamp-1">{organizer}</h1>
                    </div>
                    <img
                      className="h-9 w-9 rounded-full"
                      src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${organizer}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <div className="h-[50px] w-[50px] rounded-lg border border-foreground/30 text-center">
                    <div className="rounded-t-md bg-foreground py-1 text-[9px] font-medium uppercase text-background">
                      {formatDate(start_at?.getTime()).monthLongName}
                    </div>
                    <div className="flex flex-1 items-center justify-center rounded-b-md p-0.5 text-[16px] font-medium uppercase text-muted-foreground">
                      {formatDate(start_at?.getTime()).day}
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col justify-center gap-0.5">
                    <div className="text-[16px] font-medium">
                      {formatDate(start_at?.getTime()).dayName},{" "}
                      {formatDate(start_at?.getTime()).monthLongName}{" "}
                      {formatDate(start_at?.getTime()).day}
                    </div>
                    <div className="text-[14px] font-medium text-muted-foreground">
                      {formatDate(start_at?.getTime()).time}
                      {" - "}
                      {end_at?.getTime() - start_at?.getTime() >=
                      24 * 60 * 60 * 1000
                        ? `${formatDate(end_at?.getTime()).monthLongName} ${
                            formatDate(end_at?.getTime()).day
                          }, `
                        : ""}
                      {formatDate(end_at?.getTime()).time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-foreground/30 text-center">
                    <LuMapPin className="text-xl text-muted-foreground" />
                  </div>
                  <div className="ml-4 font-medium flex gap-1 text-[16px]">
                    {location}{" "}
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
                  {description}
                </Markdown>
              </div>

              <div>
                <h3 className="mb-[16px] border-b border-foreground/30 pb-[8px] text-[14px] font-medium text-muted-foreground">
                  Location
                </h3>
                <h3 className="text-[18px] leading-6">{location}</h3>
              </div>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewEventModal;
