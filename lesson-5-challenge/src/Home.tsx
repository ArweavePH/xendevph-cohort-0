import { useActiveAddress } from "arweave-wallet-kit";
import { ChatLayout } from "./components/chat/chat-layout";
import { aoUserInfo } from "./lib/ao-utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LucideLoader } from "lucide-react";

const Home = () => {
  const address = useActiveAddress();
  const navigate = useNavigate();
  const [initialize, setInitialize] = useState(false);

  const fetchUserInfo = async () => {
    const _data = await aoUserInfo(address);
    if (!_data?.status) {
      navigate("/");
    }
    setInitialize(true);
  };

  useEffect(() => {
    fetchUserInfo();
  }, [address]);

  if (!initialize) {
    return (
      <div className="bg-blue-500 h-screen flex flex-col items-center justify-center text-sm">
        <LucideLoader className="text-white h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <ChatLayout defaultLayout={[150, 250]} navCollapsedSize={6} />;
};

export default Home;
