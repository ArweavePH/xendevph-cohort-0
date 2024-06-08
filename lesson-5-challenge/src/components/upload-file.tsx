import { Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "./ui/use-toast";
import {
  ArconnectSigner,
  TurboAuthenticatedClient,
  TurboFactory,
} from "@ardrive/turbo-sdk/web";

import { createData } from "arbundles/web";
import { useConnection } from "arweave-wallet-kit";

const MAX_FILE_SIZE = 100 * 1024; // 100KB in bytes

const FileUpload = ({ onFileSelect, onUploading, onSendMessage }) => {
  const { connected } = useConnection();
  const fileInputRef = useRef(null);
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

  const getFileType = (type) => {
    const mimeType = type;

    if (mimeType.startsWith("image/")) {
      return "image";
    }
    if (mimeType === "application/pdf") {
      return "pdf";
    }
    if (mimeType.startsWith("video/")) {
      return "video";
    }
    if (mimeType.startsWith("audio/")) {
      return "audio";
    }

    return "unknown";
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger a click on the hidden file input
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];

      const date = Date.now();

      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "File size must be 100KB or smaller.",
          duration: 1000,
        });
        return;
      }

      if (onUploading) {
        onUploading({ id: date, data: file, status: true });
      }

      try {
        if (!signer || !turbo) return;
        const reader = new FileReader();
        reader.onload = async () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          const signedDataItem = createData(uint8Array, signer, {
            tags: [
              { name: "Content-Type", value: file.type },
              { name: "App-Name", value: "xendevph-weavetalk" },
              { name: "App-Version", value: "1.0.0" },
            ],
          });

          await signedDataItem.sign(signer);

          const uploadResult = await turbo.uploadSignedDataItem({
            dataItemStreamFactory: () => signedDataItem.getRaw(),
            dataItemSizeFactory: () => signedDataItem.getRaw().length,
            signal: AbortSignal.timeout(10_000),
          });

          await onSendMessage({
            type: getFileType(file.type),
            value: `https://arweave.net/${uploadResult.id}`,
          }).finally(() => {
            if (onUploading) {
              onUploading({ id: date, data: file, status: false });
            }
          });
        };
        reader.onerror = () => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Failed to read file.",
            duration: 1000,
          });

          if (onUploading) {
            onUploading({ id: date, data: file, status: false });
          }
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.message,
          duration: 1000,
        });

        console.error({ error });
        if (onFileSelect) {
          onFileSelect(null); // Call the callback with the selected files
        }

        if (onUploading) {
          onUploading({ id: date, data: file, status: false });
        }
      }
    }
  };

  useEffect(() => {
    if (connected) {
      init();
    } else {
      setSigner(undefined);
      setTurbo(undefined);
    }
  }, [connected]);

  return (
    <div>
      <Paperclip
        onClick={handleClick}
        size={20}
        className="text-muted-foreground cursor-pointer"
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*,video/mp4,audio/mpeg,.pdf"
      />
    </div>
  );
};

export default FileUpload;
