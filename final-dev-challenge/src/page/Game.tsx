/* eslint-disable @typescript-eslint/no-explicit-any */
import { aoAnswer, aoRoomState } from "@/lib/ao-utils";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Game = () => {
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get("code");
  const navigate = useNavigate();

  const [gameState, setGameState] = useState(null);

  const [roomState, setRoomState] = useState("WAITING");
  const [roundState, setRoundState] = useState<any>("STARTED");
  const [roundTimer, setRoundTimer] = useState(0);
  const [roundQuestion, setRoundQuestion] = useState(null);
  const [roundAnswers, setRoundAnswers] = useState([]);
  const [roundCount, setRoundCount] = useState(1);

  const [myAnswer, setMyAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const fetchGameState = async () => {
    const _data = await aoRoomState(roomCode);
    console.log(_data);
    setGameState(_data.data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchGameState();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [roomCode]);

  useEffect(() => {
    if (!gameState) return;
    setRoomState(gameState?.room_state);
    setRoundState(gameState?.round_state?.state);
    setRoundTimer(gameState?.round_state?.timer);
    setRoundQuestion(gameState?.round_state?.question?.question);
    setRoundAnswers(gameState?.round_state?.question?.answers);
    setRoundCount(gameState?.room_max_round + 1 - gameState?.round);

    if (gameState?.round_state?.state === "ENDED") {
      setCorrectAnswer(null);
      setMyAnswer(null);
    }

    if (gameState?.room_state === "DONE") {
      if (gameState?.close_timer <= 5) {
        navigate("/");
      }
    }
  }, [gameState]);

  const sendAnswer = async (answer) => {
    setMyAnswer(answer);
    const _data = await aoAnswer(roomCode, answer);
    setCorrectAnswer(_data?.data?.answer);
    console.log("answer: ", _data);
  };

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    const ellipsis = "..";
    const charsToShow = maxLength - ellipsis.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return (
      text.substr(0, frontChars) +
      ellipsis +
      text.substr(text.length - backChars)
    );
  }

  return (
    // <div>
    //   Game Screen
    //   <p>Room Code: {roomCode}</p>
    //   <p>Room State: {roomState}</p>
    //   <p>Closing Timer: {gameState?.close_timer}</p>
    //   <p>Players: {JSON.stringify(gameState?.players)}</p>
    //   <p>Round: {roundCount}</p>
    //   <p>Round State: {roundState}</p>
    //   <p>Round Timer: {roundTimer}</p>
    //   <p>Round Question: {roundQuestion}</p>
    //   <p>Round Choices: {JSON.stringify(roundAnswers)}</p>
    //   {roundAnswers && (
    //     <div className="grid grid-cols-2 max-w-xs">
    //       {roundAnswers?.map((item, index) => (
    //         <button
    //           key={index}
    //           className={`${
    //             correctAnswer
    //               ? myAnswer == item
    //                 ? myAnswer == correctAnswer
    //                   ? "bg-green-500"
    //                   : "bg-red-500"
    //                 : correctAnswer == item
    //                 ? "bg-green-500"
    //                 : "bg-gray-200"
    //               : myAnswer == item
    //               ? "bg-gray-500"
    //               : "bg-gray-200"
    //           }`}
    //           onClick={() => {
    //             sendAnswer(item);
    //           }}
    //         >
    //           {item}
    //         </button>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="h-screen bg-blue-500 grid grid-cols-4 text-white">
      <div className="bg-black/40 col-span-1 flex flex-col p-6 gap-6">
        <p className="text-2xl font-bold tracking-widest">PLAYERS</p>
        {gameState?.scores && (
          <div className="flex flex-col gap-2">
            {Object.keys(gameState?.scores)
              .sort((a, b) => gameState?.scores[b] - gameState?.scores[a])
              .map((key) => (
                <div className="flex gap-2 items-center">
                  <img
                    alt={key}
                    className="h-10 w-10 rounded-2xl"
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${key}`}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="leading-none font-bold text-sm tracking-wider">
                      {truncateText(key, 18)}
                    </p>
                    <p className="leading-none text-sm tracking-widest font-bold">
                      Score: {gameState?.scores[key]}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="col-span-2 flex flex-col items-center p-6">
        {roomState === "DONE" && (
          <>
            <p className="text-6xl tracking-widest font-bold">GAME OVER</p>
            <div className="relative p-0.5 bg-black/40 rounded-md w-full h-10 mt-4">
              <div
                className="bg-blue-500 rounded-md w-[0%] h-full flex flex-col items-center justify-center font-bold tracking-widest"
                style={{
                  width: `${(Number(gameState?.close_timer) / 60) * 100}%`,
                  transition: "all 1000ms ease",
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center uppercase tracking-widest font-bold">
                Redirect in home in {gameState?.close_timer}s
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center pt-6">
              <p className="text-4xl tracking-widest font-bold">RANKINGS</p>
              {gameState?.scores && (
                <div className="flex flex-col gap-2 mt-4">
                  {Object.keys(gameState?.scores)
                    .sort((a, b) => gameState?.scores[b] - gameState?.scores[a])
                    .map((key, index) => (
                      <div className="flex gap-2 items-center">
                        <p className="text-2xl font-bold">{index + 1}</p>
                        <img
                          alt={key}
                          className="h-10 w-10 rounded-2xl"
                          src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${key}`}
                        />
                        <div className="flex flex-col gap-1">
                          <p className="leading-none font-bold text-sm tracking-wider">
                            {truncateText(key, 18)}
                          </p>
                          <p className="leading-none text-sm tracking-widest font-bold">
                            Score: {gameState?.scores[key]}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
        {roomState === "WAITING" && (
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-6xl tracking-widest font-bold">WAITING</p>
              <p className="text-lg tracking-widest font-bold">
                FOR OTHER PLAYER {gameState?.players?.length}/
                {gameState?.room_max_player}
              </p>
              <p className="mt-10 text-2xl tracking-widest font-bold">
                CODE: {roomCode}
              </p>
            </div>
          </>
        )}
        {roundState === "ENDED" && roomState === "PLAYING" && (
          <>
            <p className="text-6xl tracking-widest font-bold">
              ROUND {roundCount}
            </p>
            <div className="relative p-0.5 bg-black/40 rounded-md w-full h-10 mt-4">
              <div
                className="bg-blue-500 rounded-md w-[0%] h-full flex flex-col items-center justify-center font-bold tracking-widest"
                style={{
                  width: `${(Number(roundTimer) / 10) * 100}%`,
                  transition: "all 1000ms ease",
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center uppercase tracking-widest font-bold">
                Next round in {roundTimer}s
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              {gameState?.round_state?.answered && (
                <div className="flex flex-col gap-2">
                  {gameState?.round_state?.answered
                    ?.sort((a, b) => b.score - a.score)
                    .map((item) => (
                      <div className="flex gap-2 items-center">
                        <p className="leading-none text-xl tracking-widest font-bold">
                          + {item.score}
                        </p>
                        <img
                          alt={item.player}
                          className="h-10 w-10 rounded-2xl"
                          src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${item.player}`}
                        />
                        <div className="flex flex-col gap-1">
                          <p className="leading-none font-bold text-sm tracking-wider">
                            {truncateText(item.player, 18)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
        {roundState === "STARTED" && roomState === "PLAYING" && (
          <>
            <p className="text-6xl tracking-widest font-bold">
              ROUND {roundCount}
            </p>
            <div className="relative p-0.5 bg-black/40 rounded-md w-full h-10 mt-4">
              <div
                className="bg-blue-500 rounded-md w-[0%] h-full flex flex-col items-center justify-center font-bold tracking-widest"
                style={{
                  width: `${(Number(roundTimer) / 20) * 100}%`,
                  transition: "all 1000ms ease",
                }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {roundTimer}s
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <p className="text-2xl">Q: {roundQuestion}</p>
            </div>
            {roundAnswers && (
              <div className="grid grid-cols-2 gap-2 w-full">
                {roundAnswers?.map((item, index) => (
                  <button
                    key={index}
                    disabled={
                      roundState === "ENDED" ||
                      roomState !== "PLAYING" ||
                      myAnswer
                    }
                    className={`rounded-2xl text-xl font-bold p-2 h-32 ${
                      correctAnswer
                        ? myAnswer == item
                          ? myAnswer == correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : correctAnswer == item
                          ? "bg-green-500 text-white"
                          : "bg-white text-black"
                        : myAnswer == item
                        ? "bg-gray-500"
                        : "bg-white text-black disabled:bg-gray-300"
                    }`}
                    onClick={() => {
                      sendAnswer(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="bg-white col-span-1"></div>
    </div>
  );
};

export default Game;
