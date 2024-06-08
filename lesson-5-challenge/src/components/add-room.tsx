import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { LucideLoader, LucidePlus } from "lucide-react";
import { aoCreateRoom, aoJoinRoom } from "@/lib/ao-utils";
import { toast } from "./ui/use-toast";

const CreateRoomModal = ({ refetchRoomList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
  });

  const dialogClose = () => {
    document.getElementById("closeDialog")?.click();
  };

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const _data = await aoCreateRoom(data?.name);
    if (_data?.status) {
      toast({
        variant: "default",
        title: "Success",
        description: _data?.message,
        duration: 1000,
      });

      refetchRoomList();
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: _data?.message,
        duration: 1000,
      });
    }
    dialogClose();
    setIsLoading(false);
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const _data = await aoJoinRoom(data?.name);
    if (_data?.status) {
      toast({
        variant: "default",
        title: "Success",
        description: _data?.message,
        duration: 1000,
      });

      refetchRoomList();
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: _data?.message,
        duration: 1000,
      });
    }
    dialogClose();
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucidePlus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-xl text-foreground"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Create Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-0.5">
            <Input
              className="rounded-full"
              type="text"
              placeholder="Room Name"
              id="name"
              name="name"
              value={data?.name}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <DialogFooter>
            {!isLoading && (
              <div className="flex gap-2">
                <Button
                  onClick={handleJoinRoom}
                  className="rounded-full flex-1"
                  type="button"
                  variant="secondary"
                >
                  Join
                </Button>
                <Button className="rounded-full flex-1" type="submit">
                  Create
                </Button>
              </div>
            )}
            {isLoading && (
              <LucideLoader className="h-6 w-6 animate-spin ml-auto mr-auto md:ml-auto md:mr-0" />
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomModal;
