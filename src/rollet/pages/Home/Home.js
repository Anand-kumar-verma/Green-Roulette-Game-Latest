import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CryptoJS from "crypto-js";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../../Shared/CookieStorage";
import { useSocket } from "../../../Shared/SocketContext";
import {
  getHistoryRollet,
  getProfileRollet,
  getResultOfRollet,
  walletamount,
} from "../../../services/apicalling";
// import roulette from "../../assets/images/rolette.png";
import mouse_click from "../../assets/images/mouse_click.mp3";
import wheel_roulette from "../../assets/images/rotate_wheel_ball_music.mp3";
import stop_ball_music from "../../assets/images/stop_ball_music.mp3";
import watch from "../../assets/images/watch.png";
import { addWinCap, confirmBet, spinFunction } from "../../sharedFunction";
import Rolletball from "../Rolletball";
import Coin from "./Coin";
import { style } from "./CommonCss";
import First12 from "./First12";
import NeighbourHoodBet from "./NeighbourHoodBet";
import Second12 from "./Second12";
import SvgCircle from "./SvgCircle";
import MyTableComponent from "./Tablehistory";
import Third12 from "./Third12";
import Zero from "./Zero";
import roulette from "../../assets/images/roulette-wheel-vector-89242.png";
import roulettebg from "../../assets/images/roulettebg.png";
import table2 from "../../assets/images/table2.png";
import table from "../../assets/images/table.png";
import axios from "axios";
import { endpoint } from "../../../services/urls";
import placebetmusic from "../../assets/images/applybet_music.mp3";
function Home() {
  let interval_music;
  let isPreBet = localStorage.getItem("isPreBet");
  let total_amount_bet = localStorage.getItem("total_amount_bet") || 0;
  const client = useQueryClient();
  const socket = useSocket();
  const audioRefMusic = useRef();
  const audioRefMusicStopBall = useRef();
  const mouseClickSoundref = useRef();
  const placeBetMusic = useRef();
  const value =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
  const red_array = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  const black_array = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
  ];

  const [open1, setOpen1] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpenPreRoundDialogBox, setisOpenPreRoundDialogBox] = useState(false);
  const [isSelectedDropBet, setisSelectedDropBet] = useState(false);
  const user_id = value && JSON.parse(value)?.UserID;
  const [openDialogBoxhistory, setopenDialogBoxhistory] = useState(false);
  const [one_min_time, setOne_min_time] = useState(0);
  const [result_rollet, setresult_rollet] = useState(0);
  const show_this_one_min_time = String(one_min_time).padStart(2, "0");
  const [open, setOpen] = useState(false);
  const [bet, setBet] = useState([]);
  const [openDialogBox, setOpenDialogBox] = useState("");
  const [amount, setAmount] = useState(10);
  const [rebet, setrebet] = useState([]);
  const [preBetHandle, setIsPreBetHandle] = useState(false);
  useEffect(() => {
    localStorage?.setItem("isPreBet", false);
  }, []);
  const { isLoading: wallet_amont_lodin, data: wallet_amount } = useQuery(
    ["walletamount"],
    () => walletamount(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const wallet_amount_data = wallet_amount?.data?.data || 0;
  useMemo(()=>{console.log(wallet_amount_data)},[wallet_amount?.data?.data])
  const { isLoading, data } = useQuery(
    ["profile_rollet"],
    () => getProfileRollet(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const profileData = data?.data?.data || 0;

  const { isLoading: bet_history_loding, data: bet_history } = useQuery(
    ["history_rollet"],
    () => getHistoryRollet(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const bet_history_Data = bet_history?.data?.data || [];
  const { isLoading: bet_result_history_loding, data: bet_result_history } =
    useQuery(["history_rollet_result"], () => getResultOfRollet(), {
      refetchOnMount: false,
      refetchOnReconnect: true,
    });

  const bet_result_history_Data = useMemo(() => {
    return bet_result_history?.data?.data?.slice(0, 10) || [];
  }, [bet_result_history]);

  function removeSingleBetFunction(id) {
    let filterArray = bet?.filter((i) => i?.id !== id);
    setBet(filterArray);
    let element = document.getElementById(`${id}`);
    let span = element.querySelector("span");
    if (span) {
      element.removeChild(span);
    }
  }

  function setBetFuncton(id, number, amount) {
    if (one_min_time <= 10) return;
    handlePlaySoundPlacebet();
    const obj = {
      id: id,
      number: number,
      amount: amount,
    };
    let isContainsPre = bet?.find((i) => i?.id === id);
    if (isContainsPre) {
      console.log("inside if");
      const updatedArray = bet.map((item) => {
        if (item.id === id) {
          return { ...item, amount: amount };
        }
        return item;
      });
      setBet(updatedArray);
    } else {
      console.log("inside else");
      setBet([...bet, obj]);
    }

    let element = document.getElementById(`${id}`);
    element.style.position = "relative"; // Ensure the parent is positioned relatively
    let newelement = element.querySelector("span");

    if (newelement) {
      newelement.innerHTML = `${
        amount >= 1000 ? String(amount / 1000) + "k" : amount
      }`;
    } else {
      newelement = document.createElement("span");
      let vlaue = `${amount >= 1000 ? String(amount / 1000) + "k" : amount}`;
      newelement.innerHTML = `${vlaue}`;
      newelement.style.position = "absolute"; // Make the span position absolute
      newelement.style.top = "50%"; // Center vertically
      newelement.style.left = "50%"; // Center horizontally
      newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
      newelement.style.display = "flex"; // Use flexbox for centering content
      newelement.style.alignItems = "center"; // Center content vertically
      newelement.style.justifyContent = "center"; // Center content horizontally
      newelement.style.textAlign = "center";
      newelement.style.height = "15px"; // Ensure height is sufficient
      newelement.style.width = "15px"; // Ensure width is sufficient
      newelement.style.backgroundColor = "white";
      newelement.style.color = "black";
      newelement.style.border = "1px solid blue";
      newelement.style.borderRadius = "50%";
      newelement.style.padding = "3px";
      newelement.style.fontSize = "8px"; // Adjust font size for better visibility
    }

    element.appendChild(newelement);
  }

  useEffect(() => {
    if (one_min_time <= 10 && bet?.length > 0) removeBetFunctonAll();
  }, [one_min_time]);

  function removeBetFunctonAll() {
    console.log(bet, "before 10 sec");
    bet?.forEach((ele) => {
      let element = document.getElementById(`${ele?.id}`);
      let span = element.querySelector("span");
      if (span) {
        element.removeChild(span);
      }
    });
    setBet([]);
  }

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  const speakMessage = (message) => {
    if ("speechSynthesis" in window) {
      let newMessage = "hii";
      if (red_array?.includes(message)) {
        newMessage = String(message) + " " + "Red Wins";
      } else if (black_array?.includes(message)) {
        newMessage = String(message) + " " + "Black Wins";
      } else {
        newMessage = String(message) + " " + "Special";
      }

      const speech = new SpeechSynthesisUtterance(newMessage);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else {
      console.error("Speech Synthesis is not supported in this browser.");
    }
  };

  const handlePlaySound = async () => {

    try {
      if (audioRefMusic?.current?.pause) {
        await audioRefMusic?.current?.play();
      } else {
        await audioRefMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  const handlePlaySoundStopBall = async () => {
    try {
      if (audioRefMusicStopBall?.current?.pause) {
        await audioRefMusicStopBall?.current?.play();
      } else {
        await audioRefMusicStopBall?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  const mouseClickSound = async () => {
    try {
      if (mouseClickSoundref?.current?.pause) {
        await mouseClickSoundref?.current?.play();
      } else {
        await mouseClickSoundref?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };

  useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);

      if (onemin === 58 || onemin === 57) {
        setIsPreBetHandle(true);
        localStorage.setItem("total_amount_bet", 0);
        localStorage?.setItem("rollet_bet_placed", false);
      }
      if (onemin === 0) {
        handlePlaySound();
      }

      if (onemin === 10) {
        let id = localStorage.getItem("result_rollet");
        let element = document.getElementById(`${String(id)}_rotate`);

        element?.classList.add("hidden");
        setresult_rollet("");
      }
      if (onemin > 10) {
        setisOpenPreRoundDialogBox(false);
      }
      if (onemin <= 10) {
        setopenDialogBoxhistory(false);
        setOpen(false);
        setOpenDialogBox(false);
      }
    };
    const handleOneMinrolletresult = (onemin) => {
      spinFunction(onemin);
      // this is latest

      localStorage.setItem("result_rollet", onemin);
      setTimeout(() => {
        // interval_music && clearInterval(interval_music);
        handlePlaySound();
        
      }, 9000);

      setTimeout(() => {
        handlePlaySoundStopBall();
        setresult_rollet(onemin);
        client.refetchQueries("history_rollet");
        client.refetchQueries("walletamount");
        client.refetchQueries("history_rollet_result");
        speakMessage(onemin);
        addWinCap(onemin);
        getWinPopup();
      }, 10000);
    };
    socket.on("oneminrollet", handleOneMin);
    socket.on("rolletresult", handleOneMinrolletresult);
    return () => {
      socket.off("oneminrollet", handleOneMin);
      socket.off("rolletresult", handleOneMinrolletresult);
    };
  }, []);

  useEffect(() => {
    if (one_min_time <= 10) setisOpenPreRoundDialogBox(true);
  }, []);

  async function getWinPopup() {
    let isPlaced = localStorage.getItem("rollet_bet_placed");
    let betlen = localStorage.getItem("betlen");
    let win_amount = 0;
    try {
      const response = await axios.get(
        endpoint?.rollet?.history + `?userid=${user_id}&limit=0`
      );

      const newupdatedArray = response?.data?.data?.slice(0, betlen) || [];
      // console.log(betlen, newupdatedArray, "This is updated array");
      win_amount =
        newupdatedArray?.reduce((a, b) => a + Number(b?.win || 0), 0) || 0;

      // console.log(isPlaced, win_amount, "THis is win ammount");
      if (win_amount > 0 && isPlaced === "true") {
        setOpenDialogBox(win_amount);
        setTimeout(() => {
          // setOpenDialogBox(false);
          localStorage?.setItem("rollet_bet_placed", false);
          localStorage?.setItem("betlen", 0);
        }, 2000);
      }
    } catch (e) {
      toast(e?.message);
      console.log(e);
    }
  }

  const handleConfirm = () => {
    setOpen1(false);
    localStorage.setItem("isPreBet", false);
    window.location.href = "/dashboard";
  };

  const handleCancel = () => {
    setOpen1(false);
  };

  function rebetFuncton() {
    // setBet([]);
    bet?.forEach((ele) => {
      let element = document.getElementById(`${ele?.id}`);
      let span = element.querySelector("span");
      if (span) {
        element.removeChild(span);
      }
    });
    console.log(rebet, "his is");
    rebet?.forEach((ele) => {
      forPlaceCoin(ele?.id, ele?.amount);
    });
    setBet(rebet);
    // setrebet
  }

  function forPlaceCoin(id, amount) {
    let element = document.getElementById(`${id}`);
    element.style.position = "relative"; // Ensure the parent is positioned relatively
    let newelement = element.querySelector("span");

    if (newelement) {
      newelement.innerHTML = `${
        amount >= 1000 ? String(amount / 1000) + "k" : amount
      }`;
    } else {
      newelement = document.createElement("span");
      let vlaue = `${amount >= 1000 ? String(amount / 1000) + "k" : amount}`;
      newelement.innerHTML = `${vlaue}`;
      newelement.style.position = "absolute"; // Make the span position absolute
      newelement.style.top = "50%"; // Center vertically
      newelement.style.left = "50%"; // Center horizontally
      newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
      newelement.style.display = "flex"; // Use flexbox for centering content
      newelement.style.alignItems = "center"; // Center content vertically
      newelement.style.justifyContent = "center"; // Center content horizontally
      newelement.style.textAlign = "center";
      newelement.style.height = "15px"; // Ensure height is sufficient
      newelement.style.width = "15px"; // Ensure width is sufficient
      newelement.style.backgroundColor = "white";
      newelement.style.color = "black";
      newelement.style.border = "1px solid blue";
      newelement.style.borderRadius = "50%";
      newelement.style.padding = "3px";
      newelement.style.fontSize = "8px"; // Adjust font size for better visibility
    }

    element.appendChild(newelement);
  }

  function justDouble() {
    bet?.forEach((ele) => {
      let element = document.getElementById(`${ele?.id}`);
      let span = element.querySelector("span");
      if (span) {
        element.removeChild(span);
      }
    });

    let newUpdateAmountArray = bet?.map((ele) => {
      return {
        ...ele,
        amount: [...black_array, ...red_array]?.includes(Number(ele?.id))
          ? Number(ele?.amount) * 2 > 5000
            ? ele?.amount
            : Number(ele?.amount) * 2
          : Number(ele?.amount) * 2 > 50000
          ? ele?.amount
          : Number(ele?.amount) * 2,
      };
    });
    console.log(newUpdateAmountArray, "update array");
    newUpdateAmountArray?.forEach((ele) => {
      forPlaceCoin(ele?.id, ele?.amount);
    });
    setBet(newUpdateAmountArray);
  }

  const handlePlaySoundPlacebet = async () => {
    try {
      if (placeBetMusic?.current?.pause) {
        await placeBetMusic?.current?.play();
      } else {
        await placeBetMusic?.current?.pause();
      }
    } catch (error) {
      // Handle any errors during play
      console.error("Error during play:", error);
    }
  };
  return (
    <Box className="home" sx={style.root}>
      {useMemo(() => {
        return (
          <>
            <audio ref={placeBetMusic} hidden>
              <source src={`${placebetmusic}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [placeBetMusic])}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${table})`,
          backgroundSize: "100%",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${table2})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {useMemo(() => {
            return (
              <>
                <audio ref={audioRefMusic} hidden>
                  <source src={`${wheel_roulette}`} type="audio/mp3" />
                </audio>
              </>
            );
          }, [audioRefMusic])}
          {useMemo(() => {
            return (
              <>
                <audio ref={audioRefMusicStopBall} hidden>
                  <source src={`${stop_ball_music}`} type="audio/mp3" />
                </audio>
              </>
            );
          }, [audioRefMusicStopBall])}
          {useMemo(() => {
            return (
              <>
                <audio ref={mouseClickSoundref} hidden>
                  <source src={`${mouse_click}`} type="audio/mp3" />
                </audio>
              </>
            );
          }, [mouseClickSoundref])}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Drawer
              sx={{
                "&>div": {
                  background: "transparent",
                  width: "400px",
                  height: "85vh",
                  ...style.flex,
                },
              }}
              anchor="top"
              open={open1}
              onClose={() => {
                setOpen1(open1);
              }}
            >
              <Box
                sx={{
                  width: "350px",
                  height: "150px",
                  background: "black",
                  transform: "rotate(90deg)",
                  borderRadius: "10px",
                  padding: "20px",
                  color: "yellow",
                  borderColor: "yellow  !important",
                }}
              >
                <div className=" !flex flex-col !justify-center !items-center mt-4">
                  <div>
                    <p className="text-2xl font-bold ">
                      Are you sure want to exit
                    </p>
                  </div>
                  <div className="!flex !justify-center gap-12 mt-4">
                    <button
                      onClick={handleConfirm}
                      className="font-bold text-xl rounded border border-yellow-300 px-4"
                    >
                      OK
                    </button>
                    <button
                      onClick={handleCancel}
                      className="font-bold text-xl rounded border border-yellow-300 px-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Box>
            </Drawer>
            <Drawer
              sx={{
                "&>div": {
                  background: "transparent",
                  width: "400px",
                  height: "85vh",
                  ...style.flex,
                },
              }}
              anchor="top"
              open={isOpenPreRoundDialogBox}
              // onClose={() => {
              //   setopenDialogBoxhistory(!openDialogBoxhistory);
              // }}
            >
              <Box
                className="!text-yellow-500 !font-extrabold  "
                sx={{
                  // width: "100%",
                  // height: "50%",
                  background: "black !important ",
                  transform: "rotate(90deg)",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                PLEASE &nbsp; WAIT&nbsp; TO &nbsp;COMPLETE &nbsp; LAST &nbsp;
                GAME
              </Box>
            </Drawer>
            <Box direction={"row"} sx={style.winnerlooserouter}>
              <Box sx={style.winnerLooserList2}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  Bet amount:{" "}
                  <span style={{ color: "red" }}>
                    {total_amount_bet
                      ? Number(total_amount_bet || 0)?.toFixed(2)
                      : 0}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  You Win :{" "}
                  <span style={{ color: "#15158F !important" }}>
                    {openDialogBox ? Number(openDialogBox || 0)?.toFixed(2) : 0}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Box direction={"row"} sx={style.wunningamount}>
              <Box sx={style.winnerLooserList4}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  Total bet amount:{" "}
                  <span style={{ color: "red" }}>
                    {total_amount_bet ? total_amount_bet || 0 : 0}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  You Win :{" "}
                  <span style={{ color: "#15158F !important" }}>
                    {openDialogBox ? openDialogBox : 0}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box> */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Box direction={"row"} sx={style.winnerlooserouter2}>
              {[7, 6, 5, 4, 3, 2, 1, 0]?.map((ele) => {
                return (
                  <Box key={ele} sx={style.winnerLooserList}>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ color: "red" }}
                    >
                      {black_array?.includes(
                        Number(bet_result_history_Data?.[ele]?.number)
                      ) && Number(bet_result_history_Data?.[ele]?.number)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ color: "red" }}
                      className="!mx-2"
                    >
                      {0 === Number(bet_result_history_Data?.[ele]?.number) &&
                        Number(bet_result_history_Data?.[ele]?.number)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{ color: "red" }}
                    >
                      {red_array?.includes(
                        Number(bet_result_history_Data?.[ele]?.number)
                      ) && Number(bet_result_history_Data?.[ele]?.number)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          >
            <Box direction={"row"} sx={style.winnerlooserouter3}>
              <Box sx={style.winnerLooserList3}>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ color: "red" }}
                >
                  {result_rollet}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box sx={style.bettable} className={""}>
              <Stack
                className={"!w-[100%]"}
                direction="row"
                justifyContent="end"
              >
                <span
                  className="!grid !grid-cols-3  !w-[64%] !h-[30px]"
                  style={{ border: "3px solid white" }}
                >
                  <IconButton sx={style.btn1}>
                    <p
                      id="336"
                      onClick={(e) => {
                        if (isSelectedDropBet) {
                          removeSingleBetFunction(336);
                          return;
                        }
                        if (amount < 10 || amount > 50000)
                          return toast(
                            <span
                              style={{
                                marginTop: "100% ",
                                transform: "rotate(90deg)",
                                backgroundColor: "black",
                              }}
                            >
                              Please select amount greater than 10
                            </span>
                          );
                        let isContainsPre = bet?.find((i) => i?.id === 336);
                        if (isContainsPre) {
                          // setOpenDialogBox(336);
                          if (
                            isContainsPre?.amount + amount > 50000 ||
                            isContainsPre?.amount < 10
                          ) {
                            return toast(
                              <span
                                className="p-2"
                                style={{
                                  marginTop: "100% ",
                                  transform: "rotate(90deg)",
                                  backgroundColor: "black",
                                }}
                              >
                                Bet must be greater than 10 and less that 50000
                                Rupees
                              </span>
                            );
                          } else {
                            setBetFuncton(
                              336,
                              [336],
                              Number(isContainsPre?.amount) + amount
                            );
                          }
                        } else {
                          setBetFuncton(336, [336], amount);
                        }
                        e.stopPropagation();
                      }}
                    >
                      2 to 1
                    </p>
                  </IconButton>
                  <IconButton sx={style.btn1}>
                    <p
                      id="235"
                      onClick={(e) => {
                        if (isSelectedDropBet) {
                          removeSingleBetFunction(235);
                          return;
                        }
                        if (amount < 10 || amount > 50000)
                          return toast(
                            <span
                              className="p-2"
                              style={{
                                marginTop: "100%",
                                transform: "rotate(90deg)",
                                backgroundColor: "black",
                              }}
                            >
                              Please select amount greater than 10
                            </span>
                          );
                        let isContainsPre = bet?.find((i) => i?.id === 235);
                        if (isContainsPre) {
                          // setOpenDialogBox(235);
                          if (
                            isContainsPre?.amount + amount > 50000 ||
                            isContainsPre?.amount < 10
                          ) {
                            return toast(
                              <span
                                className="p-2"
                                style={{
                                  marginTop: "100% ",
                                  transform: "rotate(90deg)",
                                  backgroundColor: "black",
                                }}
                              >
                                Bet must be greater than 10 and less that 50000
                                Rupees
                              </span>
                            );
                          } else {
                            setBetFuncton(
                              235,
                              [235],
                              Number(isContainsPre?.amount) + amount
                            );
                          }
                        } else {
                          setBetFuncton(235, [235], amount);
                        }
                        e.stopPropagation();
                      }}
                    >
                      2 to 1
                    </p>
                  </IconButton>
                  <IconButton sx={style.btn1}>
                    <p
                      id="134"
                      onClick={(e) => {
                        if (isSelectedDropBet) {
                          removeSingleBetFunction(134);
                          return;
                        }
                        if (amount < 10 || amount > 50000)
                          return toast(
                            <span
                              className="p-2"
                              style={{
                                marginTop: "100% ",
                                transform: "rotate(90deg)",
                                backgroundColor: "black",
                              }}
                            >
                              Please select amount greater than 10
                            </span>
                          );
                        let isContainsPre = bet?.find((i) => i?.id === 134);
                        if (isContainsPre) {
                          // setOpenDialogBox(134);
                          if (
                            isContainsPre?.amount + amount > 50000 ||
                            isContainsPre?.amount < 10
                          ) {
                            return toast(
                              <span
                                className="!p-2"
                                style={{
                                  marginTop: "100% ",
                                  alignItems: "center",
                                  transform: "rotate(90deg)",
                                  backgroundColor: "black",
                                }}
                              >
                                Bet must be greater than 10 and less that 50000
                                Rupees
                              </span>
                            );
                          } else {
                            setBetFuncton(
                              134,
                              [134],
                              Number(isContainsPre?.amount) + amount
                            );
                          }
                        } else {
                          setBetFuncton(134, [134], amount);
                        }
                        e.stopPropagation();
                      }}
                    >
                      2 to 1
                    </p>
                  </IconButton>
                </span>
              </Stack>
              <Third12
                isSelectedDropBet={isSelectedDropBet}
                removeSingleBetFunction={removeSingleBetFunction}
                // setOpenDialogBox={setOpenDialogBox}
                bet={bet}
                setBetFuncton={setBetFuncton}
                amount={amount}
              />
              <Second12
                isSelectedDropBet={isSelectedDropBet}
                removeSingleBetFunction={removeSingleBetFunction}
                // setOpenDialogBox={setOpenDialogBox}
                bet={bet}
                setBetFuncton={setBetFuncton}
                amount={amount}
              />
              <First12
                isSelectedDropBet={isSelectedDropBet}
                removeSingleBetFunction={removeSingleBetFunction}
                // setOpenDialogBox={setOpenDialogBox}
                bet={bet}
                setBetFuncton={setBetFuncton}
                amount={amount}
              />
              <Zero
                isSelectedDropBet={isSelectedDropBet}
                removeSingleBetFunction={removeSingleBetFunction}
                // setOpenDialogBox={setOpenDialogBox}
                bet={bet}
                setBetFuncton={setBetFuncton}
                amount={amount}
              />
            </Box>
          </Box>

          {useMemo(() => {
            return (
              <Box
                sx={{
                  width: "181px",
                  height: "224px",
                  position: "absolute",
                  bottom: "-2px",
                  right: "-3px",
                  backgroundImage: `url(${roulettebg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "14%",
                      left: "34%",
                      transform: "rotateY(45deg)",
                    }}
                  >
                    <div
                      style={{
                        width: "156px",
                        height: "165px",
                        position: "absolute",
                      }}
                      className=" !flex !justify-center !items-center animation_image"
                    >
                      <img
                        src={roulette}
                        className="!h-full !w-full !bg-no-repeat "
                      />
                      <Rolletball />
                    </div>
                  </Box>
                </Box>
              </Box>
            );
          }, [])}
          <Box
            sx={{
              width: "25px",
              height: "100%",
            }}
          >
            <Box
              sx={style.naiming6}
              component={NavLink}
              onClick={() => {
                one_min_time > 10 && setOpen(!open);
              }}
            >
              <Typography variant="body1" color="initial">
                NEIGHTBOUR BET
              </Typography>
            </Box>
            {preBetHandle && isPreBet === "true" && one_min_time > 10 && (
              <>
                <Box
                  sx={style.naiming10}
                  component={NavLink}
                  className={"!ml-10"}
                >
                  <Typography
                    onClick={() => justDouble()}
                    variant="body1"
                    color="initial"
                  >
                    Double
                  </Typography>
                </Box>
                <Box
                  sx={style.naiming11}
                  component={NavLink}
                  className={"!ml-16"}
                >
                  <Typography
                    onClick={() => rebetFuncton()}
                    variant="body1"
                    color="initial"
                  >
                    Re - bet
                  </Typography>
                </Box>
              </>
            )}
            <Box sx={style.naiming}>
              <Typography variant="body1" color="initial">
                POINT BALANCE
              </Typography>
              <Typography variant="body1" color="initial">
                {Number(
                  Number(wallet_amount_data?.wallet || 0) +
                    Number(wallet_amount_data?.winning || 0)
                )?.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={style.naiming2}>
              <Typography variant="body1" color="initial">
                Name
              </Typography>
              <Typography variant="body1" color="initial">
                {isLoading ? (
                  <CircularProgress className="!text-red-600" size={"small"} />
                ) : profileData?.full_name ? (
                  profileData?.full_name?.substring(0, 15)
                ) : (
                  "*****"
                )}
              </Typography>
            </Box>
            <Coin
              mouseClickSound={mouseClickSound}
              setAmount={setAmount}
              amount={amount}
              setisSelectedDropBet={setisSelectedDropBet}
            />
            <Box sx={style.naiming3}>
              <Typography
                variant="body1"
                color="initial"
                onClick={() => {
                  mouseClickSound();
                  one_min_time > 10 && setopenDialogBoxhistory(true);
                }}
              >
                GAME HISTORY
              </Typography>
            </Box>

            <Box
              sx={style.naiming4}
              onClick={() => {
                mouseClickSound();
                setOpen1(true);
              }}
            >
              <Typography variant="body1" color="initial">
                LEAVE TABLE
              </Typography>
            </Box>
            {one_min_time > 10 && (
              <>
                <Box sx={style.naiming5} className={"!flex !gap-3"}>
                  <Typography
                    className="!bg-[#15158f] !p-1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      mouseClickSound();
                      confirmBet(
                        rebet,
                        setrebet,
                        bet,
                        setBet,
                        user_id,
                        wallet_amount_data,
                        client
                      );
                    }}
                    variant="body1"
                    color="initial"
                  >
                    CONFIRM
                  </Typography>
                </Box>
                {bet?.length > 0 && (
                  <>
                    <Box sx={style.naiming12} className={"!flex !gap-3"}>
                      <Typography
                        className="!bg-[#FF0000] !p-1 !text-white"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          setisSelectedDropBet(true);
                        }}
                        variant="body1"
                        color="initial"
                      >
                        Remove
                      </Typography>
                    </Box>
                    <Box sx={style.naiming13} className={"!flex "}>
                      <Typography
                        onClick={() => removeBetFunctonAll()}
                        variant="body1"
                        color="initial"
                      >
                        CLEAR BET
                      </Typography>
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>

          <Box
            // countdown
            sx={{
              ...style.countdownOuter,
              backgroundImage: `url(${watch})`,
              backgroundSize: "100%",
            }}
            className=" !flex !justify-center !items-center"
          >
            <div
              className="!text-white absolute right-[-40px] !text-[10px] transform rotate-90"
              style={{
                background: "#15158F",
                padding: "5px",
                marginRight: "-15px",
                borderRadius: "2px",
              }}
            >
              Time Left: {show_this_one_min_time}
            </div>

            {/* <Box className="wrapper">
      <Box className="pie spinner"></Box>
      <Box className="pie filler"></Box>
      <Box className="mask"></Box>
    </Box> */}
            <SvgCircle />
          </Box>
          {/* <Drawer
            sx={{
              "&>div": {
                background: "#0000009e",
                width: "400px",
                height: "85vh",
              },
            }}
            anchor="top"
            open={open}
            onClose={() => {
              setOpen(!open);
            }}
          >
            <NeighbourHoodBet
              isSelectedDropBet={isSelectedDropBet}
              removeSingleBetFunction={removeSingleBetFunction}
              setOpenDialogBox={setOpenDialogBox}
              bet={bet}
              setBetFuncton={setBetFuncton}
              amount={amount}
              open={open}
              setOpen={setOpen}
            />
          </Drawer> */}
          <div
            className={`${
              open ? "!z-50" : "!-z-50"
            } !absolute !bg-red-900 !top-[25%] !-left-[32%] `}
          >
            <NeighbourHoodBet
              isSelectedDropBet={isSelectedDropBet}
              removeSingleBetFunction={removeSingleBetFunction}
              setOpenDialogBox={setOpenDialogBox}
              bet={bet}
              setBetFuncton={setBetFuncton}
              amount={amount}
              open={open}
              setOpen={setOpen}
            />
          </div>
          {/* <Drawer
            sx={{
              "&>div": {
                background: "transparent",
                width: "400px",
                height: "85vh",
                ...style.flex,
              },
            }}
            anchor="top"
            open={openDialogBox}
            onClose={() => {
              setOpenDialogBox(!openDialogBox);
            }}
          >
            <Box
              sx={{
                width: "350px",
                height: "200px",
                background: "white",
                transform: "rotate(90deg)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <Stack direction="row" sx={{ float: "right" }}>
                <CloseIcon onClick={() => setOpenDialogBox("")} />
              </Stack>
              <div className="!mt-4 !w-full !h-full !flex !justify-center !items-center">
                {"You Have Win"}
              </div>
            </Box>
          </Drawer> */}

          <Drawer
            sx={{
              "&>div": {
                background: "#0000009e",
                width: "400px",
                height: "85vh",
                ...style.flex,
              },
            }}
            anchor="top"
            open={openDialogBoxhistory}
            onClose={() => {
              setopenDialogBoxhistory(!openDialogBoxhistory);
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50%",
                background: "white",
                transform: "rotate(90deg)",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <Stack direction="row" sx={{ float: "right", my: 1 }}>
                <CloseIcon onClick={() => setopenDialogBoxhistory("")} />
              </Stack>
              <MyTableComponent bet_history_Data={bet_history_Data} />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}
export default Home;
