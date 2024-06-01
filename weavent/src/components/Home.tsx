"use client";

import React, { useEffect, useState } from "react";
import { ConnectButton, useConnection } from "arweave-wallet-kit";
import {
  ArconnectSigner,
  TurboAuthenticatedClient,
  TurboFactory,
} from "@ardrive/turbo-sdk/web";

import { createData } from "arbundles/web";

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

  const handleSubmit = async () => {
    if (!signer || !turbo) return;

    const signedDataItem = createData(
      // The data to be signed is a JSON string
      JSON.stringify({ hello: "World" }),
      // The signer to be used to sign the data
      signer,
      {
        tags: [
          { name: "Content-Type", value: "audio/mpeg" },
          { name: "App-Name", value: "XendevPH-Cohort-0" },
          { name: "App-Version", value: "0.1.0" },
          {
            name: "Title",
            value: "Rickroll",
          },
        ],
      }
    );

    await signedDataItem.sign(signer);

    const uploadResult = await turbo.uploadSignedDataItem({
      dataItemStreamFactory: () => signedDataItem.getRaw(),
      dataItemSizeFactory: () => signedDataItem.getRaw().length,
      signal: AbortSignal.timeout(10_000),
    });

    console.log(JSON.stringify(uploadResult, null, 2));
  };

  useEffect(() => {
    init();
  }, [connected]);

  return (
    <div>
      <ConnectButton showBalance={true} showProfilePicture={true} />
      <button onClick={handleSubmit}>Test Submit</button>
    </div>
  );
};

export default Home;
