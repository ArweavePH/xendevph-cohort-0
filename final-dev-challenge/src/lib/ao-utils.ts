/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  message,
  createDataItemSigner,
  result,
  results,
  monitor,
  dryrun,
} from "@permaweb/aoconnect";
import { QUIZZAR_PROCESS_ID } from "./utils";

export const aoAnswer = async (room_code, answer) => {
  const _data = await message({
    process: QUIZZAR_PROCESS_ID,
    tags: [{ name: "Action", value: "Answer" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: JSON.stringify({ room_code, answer }),
  });

  return await aoGetRecord(_data);
};

export const aoCreateRoom = async (room_max_player, room_max_round) => {
  const _data = await message({
    process: QUIZZAR_PROCESS_ID,
    tags: [{ name: "Action", value: "CreateRoom" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: JSON.stringify({ room_max_player, room_max_round }),
  });

  return await aoGetRecord(_data);
};

export const aoJoinRoom = async (room_code) => {
  const _data = await message({
    process: QUIZZAR_PROCESS_ID,
    tags: [{ name: "Action", value: "JoinRoom" }],
    signer: createDataItemSigner(window.arweaveWallet),
    data: room_code,
  });
  return await aoGetRecord(_data);
};

export const aoRoomState = async (room_code) => {
  const { Messages } = await dryrun({
    process: QUIZZAR_PROCESS_ID,
    data: room_code,
    tags: [{ name: "Action", value: "GetGameState" }],
  });

  return JSON.parse(Messages?.[0]?.Data);
};

export const aoGetRecord = async (txId: string) => {
  try {
    const { Messages } = await result({
      process: QUIZZAR_PROCESS_ID,
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
      process: QUIZZAR_PROCESS_ID,
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
      process: QUIZZAR_PROCESS_ID,
      signer: createDataItemSigner(window.arweaveWallet),
    });

    return result;
  } catch (Error) {
    console.error("aoMonitor Error:", Error);
  }
};
// YNN61j3bina8ncFPHLHMHmi2uypZcKzTTvSSLgml2N4
