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
import { LucideLoader } from "lucide-react";
import { aoJoinRoom } from "@/lib/ao-utils";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const JoinRoomModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    const _data = await aoJoinRoom(data?.name);
    if (_data?.status) {
      toast({
        variant: "default",
        title: "Success",
        description: _data?.message,
        duration: 1000,
      });
      navigate(`/game?code=${_data.data}`);
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
        <button className="rounded-full bg-white text-black text-sm uppercase tracking-widest font-bold text-center py-2 px-8 h-12 min-w-64">
          Join Room
        </button>
      </DialogTrigger>
      <DialogContent
        className="!max-w-xl text-foreground"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="space-y-0.5">
            <Input
              className="rounded-full"
              type="text"
              placeholder="Room Code"
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
                <Button className="rounded-full flex-1" type="submit">
                  Join
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

export default JoinRoomModal;
