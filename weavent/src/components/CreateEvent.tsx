import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { LuLoader } from "react-icons/lu";

const CreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    email: null,
    username: null,
    name: null,
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

    if (!data.username) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Username is required!",
        duration: 1000,
      });
      setIsLoading(false);
      return;
    }

    if (!data.email) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Email is required!",
        duration: 1000,
      });
      setIsLoading(false);
      return;
    }

    if (!data.name) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Name is required!",
        duration: 1000,
      });
      setIsLoading(false);
      return;
    }

    try {
      //transaction here

      toast({
        variant: "default",
        title: "Success",
        // description: (response.data as any)?.message,
        duration: 2000,
      });

      //   console.log(response.data);
      setIsLoading(false);
      //   router.push("/home");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
        duration: 1000,
      });
      console.error({ error });
      setIsLoading(false);
    }

    console.log(data);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 px-[24px] pb-[20px] text-white"
    >
      <Input
        type="text"
        placeholder="Name"
        id="name"
        name="name"
        disabled={isLoading}
        onChange={updateData}
        required
      />
      <Input
        type="text"
        placeholder="Username"
        id="username"
        name="username"
        disabled={isLoading}
        onChange={updateData}
      />
      <Input
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        disabled={isLoading}
        onChange={updateData}
      />
      {!isLoading && (
        <Button className="mt-4" type="submit">
          Register
        </Button>
      )}
      {isLoading && (
        <LuLoader className="mx-auto mt-4 h-6 w-6 animate-spin text-white" />
      )}
    </form>
  );
};

export default CreateEvent;
