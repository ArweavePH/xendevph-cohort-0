import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ArweaveWalletKit } from "arweave-wallet-kit";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
      </ArweaveWalletKit>
    </ThemeProvider>
  </React.StrictMode>
);
