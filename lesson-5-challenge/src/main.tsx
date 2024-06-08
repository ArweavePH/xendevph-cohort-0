import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "ACCESS_ALL_ADDRESSES",
          "ACCESS_PUBLIC_KEY",
          "SIGNATURE",
          "SIGN_TRANSACTION",
        ],
      }}
    >
      <App />
      <Toaster />
    </ArweaveWalletKit>
  </React.StrictMode>
);
