import { useConnection } from "arweave-wallet-kit";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { connected, connect, disconnect } = useConnection();

  return (
    <div className="sticky top-0 mx-auto w-full py-4 px-5 flex items-center justify-between z-50 bg-background/50 backdrop-blur-md">
      <Link to="/">
        <p className="text-2xl font-bold overflow-hidden text-foreground">
          Weavent
        </p>
      </Link>
      <Button
        className="ml-auto font-bold tracking-wider mr-2"
        onClick={() => {
          if (connected) {
            disconnect();
          } else {
            connect();
          }
        }}
      >
        {connected ? "Disconnect" : "Connect"}
      </Button>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
