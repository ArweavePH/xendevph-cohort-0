import CreateRoomModal from "@/components/create-room";
import JoinRoomModal from "@/components/join-room";
import { useConnection } from "arweave-wallet-kit";

const Login = () => {
  const { connected, connect, disconnect } = useConnection();

  return (
    <div className="bg-blue-500 h-screen flex flex-col items-center justify-center text-sm gap-4">
      {!connected && (
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
      {connected && (
        <>
          <p className="text-8xl font-bold tracking-widest text-white">
            Quizz<span className="text-yellow-500">AR</span>
          </p>
          <CreateRoomModal />
          <JoinRoomModal />
          <button
            onClick={() => {
              disconnect();
            }}
            className="rounded-full bg-white text-black text-sm uppercase tracking-widest font-bold text-center py-2 px-8 h-12 min-w-64"
          >
            DISCONNECT WALLET
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
