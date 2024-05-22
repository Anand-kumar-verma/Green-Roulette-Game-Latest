import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../../Shared/CookieStorage";
import { useSocket } from "../../../Shared/SocketContext";
import {
  getHistoryRollet,
  getProfileRollet,
} from "../../../services/apicalling";
import { endpoint } from "../../../services/urls";
import roulette from "../../assets/images/rolette.png";
import watch from "../../assets/images/watch.png";
import Coin from "./Coin";
import { style } from "./CommonCss";
import First12 from "./First12";
import NeighbourHoodBet from "./NeighbourHoodBet";
import Second12 from "./Second12";
import SvgCircle from "./SvgCircle";
import Third12 from "./Third12";
import Zero from "./Zero";
import Rolletball from "../Rolletball";
function Home() {
  const socket = useSocket();
  const value =
    (localStorage.getItem("logindataen") &&
      CryptoJS.AES.decrypt(
        localStorage.getItem("logindataen"),
        "anand"
      )?.toString(CryptoJS.enc.Utf8)) ||
    null;
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

  const bet_history_Data = bet_history?.data?.data || 0;
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
    console.log(id, number, amount);
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
      newelement.innerHTML = `${amount >= 1000 ? String(amount / 1000) + "k" : amount
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

  function increaseFunction(id) {
    const updatedArray = bet.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setBet(updatedArray);

    let element = document.getElementById(`${id}`);
    let span = element.querySelector("span");
    if (span) {
      span.innerHTML = `${bet?.find((i) => i?.id === openDialogBox)?.amount + 1
        }`;
    } else {
      let newelement = document.createElement("span");
      newelement.innerHTML = `${bet?.find((i) => i?.id === openDialogBox)?.amount
        }`;
      newelement.style.height = "10px";
      newelement.style.width = "10px";
      newelement.style.backgroundColor = "white";
      newelement.style.color = "black";
      newelement.style.border = "1px solid blue";
      newelement.style.borderRadius = "50%";
      newelement.style.padding = "2px";
      newelement.style.fontSize = "8px";
      element.append(newelement);
    }
  }
  function decreaseFunction(id) {
    const updatedArray = bet.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          amount: item.amount - 1 > 0 ? item.amount - 1 : item.amount,
        };
      }
      return item;
    });
    setBet(updatedArray);
    let element = document.getElementById(`${id}`);
    let span = element.querySelector("span");
    let amount = bet?.find((i) => i?.id === openDialogBox)?.amount;
    if (span) {
      span.innerHTML = `${amount - 1 > 0 ? amount - 1 : amount}`;
    } else {
      let newelement = document.createElement("span");
      newelement.innerHTML = `${amount - 1 > 0 ? amount - 1 : amount}`;
      newelement.style.height = "10px";
      newelement.style.width = "10px";
      newelement.style.backgroundColor = "white";
      newelement.style.color = "black";
      newelement.style.border = "1px solid blue";
      newelement.style.borderRadius = "50%";
      newelement.style.padding = "2px";
      newelement.style.fontSize = "8px";
      element.append(newelement);
    }
  }

  function removeBetFuncton(id) {
    setBet(bet?.filter((i) => i?.id !== id));
    let element = document.getElementById(`${id}`);
    let span = element.querySelector("span");
    if (span) {
      element.removeChild(span);
    }
    setOpenDialogBox("");
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
      toast(res?.data?.msg);
      // if (res?.data?.error === "200") removeBetFunctonAll();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const handleOneMin = (onemin) => {
      setOne_min_time(onemin);
    };
    const handleOneMinrolletresult = (onemin) => {
      console.log("Hiii anand",onemin)
      spinFunction(onemin);
      setTimeout(() => {
        setresult_rollet(onemin);
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
    if (!checkTokenValidity()) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/"; // Redirect to login page
    }
  }, []);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  function spinFunction(id) {
    let element = document.getElementById(`${String(id)}_rotate`);
    element.classList.remove("hidden");
    element.classList.add("animation_image_30");
    setTimeout(() => {
      element.classList.remove("animation_image_30");
      element.classList.add("hidden");
    }, 50 * 1000);
  }

  return (
    <Box className="home" sx={style.root}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
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
        <Box direction={"row"} sx={style.winnerlooserouter2}>
          <Box sx={style.winnerLooserList}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {bet_history_Data?.data?.[4]?.win
                ? bet_history_Data?.data?.[4]?.win
                : "L"}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
          </Box>
          <Box sx={style.winnerLooserList}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {bet_history_Data?.data?.[4]?.win
                ? bet_history_Data?.data?.[3]?.win
                : "L"}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
          </Box>
          <Box sx={style.winnerLooserList}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {bet_history_Data?.data?.[4]?.win
                ? bet_history_Data?.data?.[3]?.win
                : "L"}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
          </Box>
          <Box sx={style.winnerLooserList}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {bet_history_Data?.data?.[4]?.win
                ? bet_history_Data?.data?.[1]?.win
                : "L"}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
          </Box>
          <Box sx={style.winnerLooserList}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {bet_history_Data?.data?.[4]?.win
                ? bet_history_Data?.data?.[1]?.win
                : "L"}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
          </Box>
          <Box sx={style.winnerLooserList}>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              {bet_history_Data?.data?.[4]?.win
                ? bet_history_Data?.data?.[1]?.win
                : "L"}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
            </Typography>
            <Typography variant="body1" color="initial" sx={{ color: "red" }}>
              99
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
                        336, [336],
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
                    removeSingleBetFunction(235)
                    return
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
                        235, [235],
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
                    removeSingleBetFunction(134)
                    return
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
                        134, [134],
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
            setOpen(!open);
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
            onClick={() => setopenDialogBoxhistory(true)}
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
        <Box sx={style.naiming5} className={"!flex "}>
          <Typography
            onClick={() => confirmBet()}
            variant="body1"
            color="initial"
          >
            BET CONFIRM
          </Typography>
          {/* <Typography
            onClick={() => {
              setisSelectedDropBet(true);
            }}
            variant="body1"
            color="initial"
            className="!bg-red-800"
          >
            Clear
          </Typography> */}
        </Box>
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
        sx={{ ...style.countdownOuter, backgroundImage: `url(${watch})`, backgroundSize: '100%' }}
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
            background: "#0000009e",
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
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">Fat&nbsp;(g)</TableCell>
                  <TableCell align="center">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="center">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{ my: 2 }}
          />
        </Box>
      </Drawer>

      {/* 
    <span>Number:1,2,3,</span>
          <div className="flex justify-between w-full">
            <span onClick={() => increaseFunction(openDialogBox)}>INC</span>
            <p>{bet?.find((i) => i?.id === openDialogBox)?.amount}</p>
            <span onClick={() => decreaseFunction(openDialogBox)}>DEC</span>
          </div>
          <Button onClick={() => removeBetFuncton(openDialogBox)}>
            Remove Bet
          </Button> 
          */}
    </Box>
  );
}
export default Home;
