import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
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
} from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";
import roulette from "../../assets/images/rolette.png";
import watch from "../../assets/images/watch.png";
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
import win_cap from "../../assets/images/pwin.png";
function Home() {
  const audioRefMusic = useRef(null);
  const audioRefMusicPlaceBet = useRef(null);
  const client = useQueryClient();
  const socket = useSocket();
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
  const navigate = useNavigate();
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
  console.log(bet_history_Data);
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
    const obj = {
      id: id,
      number: number,
      amount: amount,
    };
    let isContainsPre = bet?.find((i) => i?.id === id);
    if (isContainsPre) {
      const updatedArray = bet.map((item) => {
        if (item.id === id) {
          return { ...item, amount: amount };
        }
        return item;
      });
      setBet(updatedArray);
    } else {
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

  function removeBetFunctonAll() {
    bet?.forEach((ele) => {
      let element = document.getElementById(`${ele?.id}`);
      let span = element.querySelector("span");
      if (span) {
        element.removeChild(span);
      }
    });
    setBet([]);
  }

  async function confirmBet() {
    if (bet?.length <= 0) return toast("Please Select Your Bet First.");

    let updatedBet = [...bet]; // Create a copy of the current bet state

    updatedBet.forEach((element) => {
      let idInString = String(element?.id);
      let array = element?.number;

      if (array?.length > 1) {
        let d_amount = Number(element?.amount) / array?.length;

        array.forEach((newelement) => {
          let isContainsPre = updatedBet.find(
            (i) => String(i?.id) === String(newelement)
          );

          if (isContainsPre) {
            updatedBet = updatedBet.map((item) => {
              if (String(item.id) === String(newelement)) {
                return { ...item, amount: item.amount + d_amount };
              }
              return item;
            });
          } else {
            const obj = {
              id: Number(newelement),
              number: [Number(newelement)],
              amount: d_amount,
            };
            updatedBet.push(obj);
          }
        });

        updatedBet = updatedBet.filter((i) => String(i?.id) !== idInString);
      }
    });
    // console.log(updatedBet);
    // setBet(updatedBet);

    const reqbody = {
      number: updatedBet,
      userid: user_id,
      amount: 10,
    };
    console.log(updatedBet);
    try {
      const res = await axios.post(endpoint?.rollet?.bet_now, reqbody);
      toast(
        <span className="!bg-blue-800 !py-2 !px-4 !text-white !border-2 !border-red-800 !rounded-full" style={{ display: "inline-block", transform: "rotate(90deg)" }}>
          {res?.data?.msg}
        </span>
      );
      // if (res?.data?.error === "200") removeBetFunctonAll();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);

      if (onemin === 10) {
        let id = localStorage.getItem("result_rollet");
        let element = document.getElementById(`${String(id)}_rotate`);

        element?.classList.add("hidden");
        setresult_rollet(0);
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

      localStorage.setItem("result_rollet", onemin);
      setTimeout(() => {
        setresult_rollet(onemin);
        client.refetchQueries("history_rollet_result");
        client.refetchQueries("history_rollet");
        speakMessage(onemin);
        addWinCap(onemin)
        setTimeout(() => {
          if (bet_history_Data?.[0]?.win) {
            setOpenDialogBox(true);
            setTimeout(() => {
              setOpenDialogBox(false);
            }, 2000);
          }
        }, 2000);
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

  function addWinCap(id) {
    let element = document.getElementById(`${String(id)}`);
    if (element) {
      element.style.position = "relative";
      let newelement = document.createElement("span");
      let imgElement = document.createElement("img");
      imgElement.src = win_cap;
      imgElement.style.width = "100%";
      imgElement.style.height = "100%";
      newelement.style.position = "absolute"; // Make the span position absolute
      newelement.style.top = "50%"; // Center vertically
      newelement.style.left = "50%"; // Center horizontally
      newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
      newelement.style.display = "flex"; // Use flexbox for centering content
      newelement.style.alignItems = "center"; // Center content vertically
      newelement.style.justifyContent = "center"; // Center content horizontally
      newelement.style.textAlign = "center";
      newelement.style.height = "40px"; // Ensure height is sufficient
      newelement.style.width = "30px"; // Ensure width is sufficient
      imgElement.style.transform = "rotate(180deg)"; // Rotate the image
      newelement.appendChild(imgElement);
      element.appendChild(newelement);
  
      // Use setTimeout to remove the elements after 2 seconds
      setTimeout(() => {
        if (element.contains(newelement)) {
          element.removeChild(newelement);
        }
      }, 4000);
    }
  }
  

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  function spinFunction(id) {
    let element = document.getElementById(`${String(id)}_rotate`);
    element.classList.remove("hidden");
    element.classList.add("animation_image_30");
    setTimeout(() => {
      element.classList.remove("animation_image_30");
      // element.classList.add("hidden");
      // setresult_rollet(0);
    }, 50 * 1000);
  }

  const speakMessage = (message) => {
    console.log(message, "function is called now"); // Check if the browser supports speech synthesis
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

  return (
    <Box className="home" sx={style.root}>
      {/* {useMemo(() => {
        return (
          <>
            <audio ref={audioRefMusic} hidden>
              <source src={`${countdownfirst}`} type="audio/mp3" />
            </audio>
            <audio ref={audioRefMusicPlaceBet} hidden>
              <source src={`${place_your_bet}`} type="audio/mp3" />
            </audio>
          </>
        );
      }, [audioRefMusic, audioRefMusicPlaceBet])} */}
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
          open={isOpenPreRoundDialogBox}
          // onClose={() => {
          //   setopenDialogBoxhistory(!openDialogBoxhistory);
          // }}
        >
          <Box
          className ="!text-yellow-500 !font-extrabold  "
          
          sx={{
              // width: "100%",
              // height: "50%",
              background: "black !important ",
              transform: "rotate(90deg)",
              borderRadius: "10px",
              padding: "10px",
              
            }}
          >
           PLEASE &nbsp; WAIT&nbsp; TO &nbsp;COMPLETE &nbsp; LAST &nbsp; GAME
          </Box>
        </Drawer>
        <Box direction={"row"} sx={style.winnerlooserouter}>
          <Box sx={style.winnerLooserList2}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              Min-Play
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              in 1 0 out 10
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              Max-play
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              in 5000 out 50000
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <Box direction={"row"} sx={style.wunningamount}>
          <Box sx={style.winnerLooserList4}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              Total bet amount - ₹{" "}
              <span style={{ color: "red" }}>
                {bet_history_Data?.reduce((a, b) => a + Number(b?.amount), 0) ||
                  0}
              </span>
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              You Win - ₹{" "}
              <span style={{ color: "#15158F !important" }}>
                {bet_history_Data?.reduce(
                  (a, b) => a + Number(b?.win || 0),
                  0
                ) || 0}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <Box direction={"row"} sx={style.winnerlooserouter2}>
          {[5, 4, 3, 2, 1, 0]?.map((ele) => {
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
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {result_rollet}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={style.bettable} className={""}>
        <Stack className={"!w-[100%]"} direction="row" justifyContent="end">
          <span className="!grid !grid-cols-3  !w-[71%]">
            <IconButton sx={style.btn1}>
              <p
                id="336"
                onClick={(e) => {
                  if (isSelectedDropBet) {
                    removeSingleBetFunction(336);
                    return;
                  }
                  if (amount < 10 || amount > 50000)
                    return toast("Please select amount grater than 10");
                  let isContainsPre = bet?.find((i) => i?.id === 336);
                  if (isContainsPre) {
                    // setOpenDialogBox(336);
                    if (
                      isContainsPre?.amount + amount > 50000 ||
                      isContainsPre?.amount < 10
                    ) {
                      return toast(
                        "Bet must be grater than 10 and less that 50000 Rupees"
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
                    return toast("Please select amount grater than 10");
                  let isContainsPre = bet?.find((i) => i?.id === 235);
                  if (isContainsPre) {
                    // setOpenDialogBox(235);
                    if (
                      isContainsPre?.amount + amount > 50000 ||
                      isContainsPre?.amount < 10
                    ) {
                      return toast(
                        "Bet must be grater than 10 and less that 50000 Rupees"
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
                    return toast("Please select amount grater than 10");
                  let isContainsPre = bet?.find((i) => i?.id === 134);
                  if (isContainsPre) {
                    // setOpenDialogBox(134);
                    if (
                      isContainsPre?.amount + amount > 50000 ||
                      isContainsPre?.amount < 10
                    ) {
                      return toast(
                        "Bet must be grater than 10 and less that 50000 Rupees"
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
          setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
        <Second12
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
        <First12
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
        <Zero
          isSelectedDropBet={isSelectedDropBet}
          removeSingleBetFunction={removeSingleBetFunction}
          setOpenDialogBox={setOpenDialogBox}
          bet={bet}
          setBetFuncton={setBetFuncton}
          amount={amount}
        />
      </Box>

      {useMemo(() => {
        return (
          <div
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              // borderRadius: "50%",
              bottom: "1%",
              right: "1%",
            }}
            className=" !flex !justify-center !items-center animation_image"
          >
            {/* animation_image */}
            <img src={roulette} className="!h-full !w-full !bg-no-repeat " />

            <Rolletball />
          </div>
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
            one_min_time > 10 && setOpen(true);
          }}
        >
          <Typography variant="body1" color="initial">
            NEIGHTBOUR BET
          </Typography>
        </Box>
        <Box sx={style.naiming}>
          <Typography variant="body1" color="initial">
            POINT BALANCE
          </Typography>
          <Typography variant="body1" color="initial">
            0.08
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
          setAmount={setAmount}
          amount={amount}
          setisSelectedDropBet={setisSelectedDropBet}
        />
        <Box sx={style.naiming3}>
          <Typography
            variant="body1"
            color="initial"
            onClick={() => one_min_time > 10 && setopenDialogBoxhistory(true)}
          >
            GAME HISTORY
          </Typography>
        </Box>
        <Box
          sx={style.naiming4}
          onClick={() => {
            // sessionStorage.clear();
            // localStorage.clear();
            navigate("/dashboard");
          }}
        >
          <Typography variant="body1" color="initial">
            LEAVE TABLE
          </Typography>
        </Box>
        {one_min_time > 10 && (
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
              onClick={() => confirmBet()}
              variant="body1"
              color="initial"
            >
              CONFIRM
            </Typography>
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
              DROP
            </Typography>
          </Box>
        )}
        <Box sx={style.naiming7} className={"!flex "}>
          <Typography
            onClick={() => removeBetFunctonAll()}
            variant="body1"
            color="initial"
          >
            CLEAR BET
          </Typography>
        </Box>
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
      <Drawer
        sx={{
          "&>div": { background: "#0000009e", width: "400px", height: "85vh" },
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
      </Drawer>

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
  );
}
export default Home;
