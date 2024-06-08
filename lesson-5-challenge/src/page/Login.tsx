import { toast } from "@/components/ui/use-toast";
import { aoRegister, aoUserInfo } from "@/lib/ao-utils";
import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import { LucideArrowRight, LucideLoader, LucideX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { connected, connect, disconnect } = useConnection();
  const address = useActiveAddress();
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrationLoading(true);
    const _data = await aoRegister(inputRef.current.value);
    if (_data?.status) {
      toast({
        variant: "default",
        title: "Success",
        description: _data?.message,
        duration: 3000,
      });

      navigate("/home");
    }

    setRegistrationLoading(false);
  };

  const fetchUserInfo = async () => {
    setAccountLoading(true);

    const _data = await aoUserInfo(address);

    if (_data?.status) {
      navigate("/home");
    }
    setAccountLoading(false);
  };

  useEffect(() => {
    if (!connected || !address) return;
    fetchUserInfo();
  }, [connected, address]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-500 h-screen flex flex-col items-center justify-center text-sm"
    >
      {!connected && !accountLoading && (
        <button
          type="button"
          onClick={() => {
            connect();
          }}
          className="rounded-full bg-white text-black text-sm uppercase tracking-widest font-bold text-center py-2 px-8 flex items-center h-12"
        >
          Connect Wallet
        </button>
      )}
      {connected && !accountLoading && (
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white p-2 flex items-center h-12">
            <input
              type="text"
              placeholder="Enter a nickname"
              ref={inputRef}
              disabled={registrationLoading}
              className="ml-2 w-full border-none bg-white text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={registrationLoading}
              className="flex items-center justify-center py-2 px-4 rounded-full bg-blue-500 transition duration-300 ease-in-out hover:opacity-85 hover:shadow-md"
            >
              {!registrationLoading ? (
                <LucideArrowRight color="#fff" size="1.2em" />
              ) : (
                <LucideLoader
                  color="#fff"
                  size="1.2em"
                  className="animate-spin"
                />
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              disconnect();
            }}
            className="rounded-full bg-white p-2 flex flex-col items-center justify-center h-12 w-12 transition duration-300 ease-in-out hover:opacity-85 hover:shadow-md"
          >
            <LucideX className="text-red-500" size="1.2em" />
          </button>
        </div>
      )}

      {connected && accountLoading && (
        <LucideLoader className="text-white h-10 w-10 animate-spin" />
      )}
    </form>
  );
};

export default Login;
