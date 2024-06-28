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
import { aoCreateRoom } from "@/lib/ao-utils";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const CreateRoomModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    room_max_player: 2,
    room_max_round: 5,
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
    const _data = await aoCreateRoom(
      Number(data?.room_max_player),
      Number(data?.room_max_round)
    );
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
          Create Room
        </button>
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
            <p className="text-xs">Max Player</p>
            <Input
              className="rounded-full"
              type="number"
              placeholder="Max Player"
              id="room_max_player"
              name="room_max_player"
              value={data?.room_max_player}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs">Max Round</p>
            <Input
              className="rounded-full"
              type="number"
              placeholder="Max Round"
              id="room_max_round"
              name="room_max_round"
              value={data?.room_max_round}
              disabled={isLoading}
              onChange={updateData}
              required
            />
          </div>
          <DialogFooter>
            {!isLoading && (
              <div className="flex gap-2">
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
