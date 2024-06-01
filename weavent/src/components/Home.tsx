"use client";

import React, { useEffect, useState } from "react";
import { ConnectButton, useConnection } from "arweave-wallet-kit";
import {
  ArconnectSigner,
  TurboAuthenticatedClient,
  TurboFactory,
} from "@ardrive/turbo-sdk/web";

import { createData } from "arbundles/web";
import CreateEvent from "./CreateEvent";

const Home = () => {
  const { connected, connect, disconnect } = useConnection();
  const [signer, setSigner] = useState<ArconnectSigner>();
  const [turbo, setTurbo] = useState<TurboAuthenticatedClient>();

  const init = async () => {
    const signerInstance = new ArconnectSigner(window.arweaveWallet);
    if (!signerInstance.publicKey) {
      await signerInstance.setPublicKey();
    }
    const turboInstance = TurboFactory.authenticated({
      signer: signerInstance,
    });

    setSigner(signerInstance);
    setTurbo(turboInstance);
  };

  useEffect(() => {
    init();
  }, [connected]);

  return (
    <div className="min-h-screen bg-gradient-radial from-gray-500 to-gray-900">
      <div className="max-w-7xl mx-auto w-full p-4 flex items-center justify-between">
        <p className="text-3xl font-bold tracking-wider overflow-hidden bg-clip-text text-transparent bg-gradient-to-tr from-violet-500 to-yellow-500">
          Weavent
        </p>
        <ConnectButton showBalance={true} showProfilePicture={true} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 flex gap-4">
        <div className="flex-1 border border-dashed border-white/20 gap-4"></div>
        <div className="w-1/3 border border-white/10 py-6 px-8 rounded-2xl backdrop-blur-sm bg-black/30">
          <p className="text-2xl font-bold">Create Event</p>
          <p className="text-sm">Fill up form below.</p>
          <CreateEvent signer={signer} turbo={turbo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
