import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { LuLoader, LuPlus, LuUpload } from "react-icons/lu";
import { Textarea } from "./ui/textarea";
import { DateTimePicker } from "./ui/date-time-picker";
import { toast } from "./ui/use-toast";
import {
  ArconnectSigner,
  TurboAuthenticatedClient,
  TurboFactory,
} from "@ardrive/turbo-sdk/web";

import { createData } from "arbundles/web";
import { useConnection } from "arweave-wallet-kit";
import slugify from "react-slugify";
import { imageToBase64 } from "@/lib/utils";
import PreviewEventModal from "./preview-event";
import { useNavigate } from "react-router-dom";

const CreateEventModal = ({ ...props }) => {
  const navigate = useNavigate();
  const { connected } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [signer, setSigner] = useState<ArconnectSigner>();
  const [turbo, setTurbo] = useState<TurboAuthenticatedClient>();

  const init = async () => {
    const signerInstance = new ArconnectSigner(window.arweaveWallet);
    if (!signerInstance.publicKey) {
      await signerInstance.setPublicKey();
    }
    const turboInstance = TurboFactory.authenticated({
      signer: signerInstance,
    });

    setSigner(signerInstance);
    setTurbo(turboInstance);
  };

  const [data, setData] = useState({
    name: "",
    start_at: new Date(),
    end_at: new Date(),
    description: "",
    location: "",
    organizer: "Weavent",
    banner: null,
  });

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let banner_url = null;

    const bannerResult = await imageToBase64(data?.banner);

    if (bannerResult) {
      banner_url = bannerResult.contents;
    }

    setIsLoading(true);

    try {
      if (!signer || !turbo) return;

      const signedDataItem = createData(
        JSON.stringify({
          ...data,
          slug: slugify(data?.name),
          banner: banner_url,
          start_at: data?.start_at.getTime(),
          end_at: data?.end_at.getTime(),
        }),
        signer,
        {
          tags: [
            { name: "Content-Type", value: "application/json" },
            { name: "App-Name", value: "xendevph-weavent" },
            { name: "App-Version", value: "1.0.0" },
            {
              name: "Slug",
              value: slugify(data.name) || "hello-world",
            },
          ],
        }
      );

      await signedDataItem.sign(signer);

      const uploadResult = await turbo.uploadSignedDataItem({
        dataItemStreamFactory: () => signedDataItem.getRaw(),
        dataItemSizeFactory: () => signedDataItem.getRaw().length,
        signal: AbortSignal.timeout(10_000),
      });

      toast({
        variant: "default",
        title: "Success",
        description: `TX ID: ${uploadResult.id}`,
        duration: 2000,
      });

      navigate(`/e?tx=${uploadResult.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
        duration: 1000,
      });

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (connected) {
      init();
    } else {
      setSigner(undefined);
      setTurbo(undefined);
    }
  }, [connected]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props} className="font-bold tracking-wider">
          <LuPlus className="h-4 w-4" />
          <span className="hidden md:block ml-2">Create Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-xl text-foreground"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Create your event now!</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-0.5">
            <p className="text-xs tracking-widest">Name</p>
            <Input
              type="text"
              placeholder="Weavent Party"
              id="name"
              name="name"
              value={data?.name}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <div className="flex gap-2 md:flex-row flex-col">
            <div className="space-y-0.5 flex-1">
              <p className="text-xs">From</p>
              <DateTimePicker
                className="w-full"
                id="start_at"
                name="start_at"
                disabled={isLoading}
                value={new Date(data?.start_at)}
                onChange={(date: Date) => {
                  updateData({
                    target: { name: "start_at", value: date },
                  });
                }}
              />
            </div>
            <div className="space-y-0.5 flex-1">
              <p className="text-xs">To</p>
              <DateTimePicker
                id="end_at"
                className="w-full"
                name="end_at"
                disabled={isLoading}
                value={new Date(data?.end_at)}
                onChange={(date: Date) => {
                  updateData({
                    target: { name: "end_at", value: date },
                  });
                }}
              />
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs">Organizer</p>
            <Input
              type="text"
              placeholder="organizer"
              id="organizer"
              name="organizer"
              value={data?.organizer}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs">Banner</p>
            <Input
              type="file"
              placeholder="Event Banner"
              id="banner"
              name="banner"
              disabled={isLoading}
              onChange={(e) => {
                updateData({
                  target: { name: e.target.name, value: e.target.files?.[0] },
                });
              }}
              required
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs">Description</p>
            <Textarea
              placeholder="Description"
              className="min-h-28"
              id="description"
              name="description"
              value={data?.description}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs">Location</p>
            <Input
              type="text"
              placeholder="Location"
              id="location"
              name="location"
              value={data?.location}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <DialogFooter className="mt-4">
            {!isLoading &&
              data?.name &&
              data?.start_at &&
              data?.end_at &&
              data?.description &&
              data?.organizer &&
              data?.banner &&
              data?.location && (
                <PreviewEventModal
                  name={data?.name}
                  start_at={data?.start_at}
                  end_at={data?.end_at}
                  description={data?.description}
                  location={data?.location}
                  organizer={data?.organizer}
                  banner={data?.banner}
                />
              )}
            {!isLoading && (
              <Button type="submit">
                <LuUpload className="h-4 w-4 mr-2" />
                Submit
              </Button>
            )}
            {isLoading && <LuLoader className="h-6 w-6 animate-spin" />}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
