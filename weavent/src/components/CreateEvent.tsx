import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { LuLoader } from "react-icons/lu";
import { Textarea } from "./ui/textarea";
import { createData } from "arbundles/web";
import slugify from "react-slugify";

const CreateEvent = ({ signer, turbo }: { signer: any; turbo: any }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    name: null,
    start_at: null,
    end_at: null,
    description: null,
    banner: "https://i.imgur.com/zohV3Yf.png",
    location: null,
    capacity: null,
  });

  const updateData = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!signer || !turbo) return;

      const signedDataItem = createData(
        JSON.stringify({ ...data, slug: slugify(data?.name) }),
        signer,
        {
          tags: [
            { name: "Content-Type", value: "application/json" },
            { name: "App-Name", value: "xendevph-weavent" },
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

      console.log(JSON.stringify(uploadResult, null, 2));

      toast({
        variant: "default",
        title: "Success",
        description: `TX ID: ${uploadResult.id}`,
        duration: 2000,
      });
    } catch (error: any) {
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

  return (
    <form onSubmit={onSubmit} className="flex flex-col py-4 gap-2">
      <Input
        type="text"
        placeholder="Event Name"
        id="name"
        name="name"
        className="!bg-black/30 !none"
        disabled={isLoading}
        onChange={updateData}
        required
      />
      <Input
        type="datetime-local"
        placeholder="Start At"
        className="!bg-black/30 !none"
        id="start_at"
        name="start_at"
        disabled={isLoading}
        onChange={updateData}
      />
      <Input
        type="datetime-local"
        placeholder="End At"
        className="!bg-black/30 !none"
        id="end_at"
        name="end_at"
        disabled={isLoading}
        onChange={updateData}
      />
      <Input
        type="text"
        placeholder="Capacity"
        className="!bg-black/30 !none"
        id="capacity"
        name="capacity"
        disabled={isLoading}
        onChange={updateData}
      />
      <Textarea
        placeholder="Description"
        className="!bg-black/30 !none min-h-28"
        id="description"
        name="description"
        disabled={isLoading}
        onChange={updateData}
      />
      <Input
        type="text"
        placeholder="Location"
        className="!bg-black/30 !none"
        id="location"
        name="location"
        disabled={isLoading}
        onChange={updateData}
      />
      {!isLoading && (
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      )}
      {isLoading && (
        <LuLoader className="mx-auto mt-4 h-6 w-6 animate-spin text-white" />
      )}
    </form>
  );
};

export default CreateEvent;
