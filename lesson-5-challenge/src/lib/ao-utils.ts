/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  message,
  createDataItemSigner,
  result,
  results,
  monitor,
  dryrun,
} from "@permaweb/aoconnect";
import { WEAVETALK_PROCESS_ID } from "./utils";

export const aoSendMessage = async (msg) => {
  await message({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "Broadcast" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: msg,
  })
    .then(console.log)
    .catch(console.error);
};

export const aoRegister = async (username) => {
  const _data = await message({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "Register" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: username,
  });

  return await aoGetRecord(_data);
};

export const aoCreateRoom = async (room_name) => {
  const _data = await message({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "CreateRoom" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: JSON.stringify({ room_name }),
  });

  return await aoGetRecord(_data);
};

export const aoJoinRoom = async (room_name) => {
  const _data = await message({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "JoinRoom" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: JSON.stringify({ room_name }),
  });
  return await aoGetRecord(_data);
};

export const aoRoomMessages = async (room_name, page = 1, pageSize = 10) => {
  const { Messages } = await dryrun({
    process: WEAVETALK_PROCESS_ID,
    data: JSON.stringify({ room_name, page, pageSize }),
    tags: [{ name: "Action", value: "GetMessages" }],
  });

  return JSON.parse(Messages?.[0]?.Data);
};

export const aoRoomList = async () => {
  const { Messages } = await dryrun({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "ListRooms" }],
  });

  return JSON.parse(Messages?.[0]?.Data);
};

export const aoMyRoomList = async (walletAddress) => {
  const { Messages } = await dryrun({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "MyListRooms" }],
    data: walletAddress,
  });

  return JSON.parse(Messages?.[0]?.Data);
};

export const aoUserInfo = async (walletAddress) => {
  const { Messages } = await dryrun({
    process: WEAVETALK_PROCESS_ID,
    tags: [{ name: "Action", value: "UserInfo" }],
    data: walletAddress,
  });

  return JSON.parse(Messages?.[0]?.Data);
};

export const aoGetRecord = async (txId: string) => {
  try {
    const { Messages } = await result({
      process: WEAVETALK_PROCESS_ID,
      message: txId,
    });

    return JSON.parse(Messages?.[0]?.Data);
  } catch (Error) {
    console.error("aoGetRecord Error:", Error);
  }
};

export const aoGetRecords = async () => {
  try {
    const resultsOut = await results({
      process: WEAVETALK_PROCESS_ID,
      sort: "DESC",
      limit: 25,
    });

    return resultsOut;
  } catch (Error) {
    console.error("aoGetRecords Error:", Error);
  }
};

export const aoMonitor = async () => {
  try {
    const result = await monitor({
      process: WEAVETALK_PROCESS_ID,
      signer: createDataItemSigner(window.arweaveWallet),
    });

    return result;
  } catch (Error) {
    console.error("aoMonitor Error:", Error);
  }
};
