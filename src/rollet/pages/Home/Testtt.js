// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Box,
//   CircularProgress,
//   Drawer,
//   IconButton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import CryptoJS from "crypto-js";
// import { useEffect, useMemo, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useQuery, useQueryClient } from "react-query";
// import { NavLink, useNavigate } from "react-router-dom";
// import { checkTokenValidity } from "../../../Shared/CookieStorage";
// import { useSocket } from "../../../Shared/SocketContext";
// import {
//   getHistoryRollet,
//   getProfileRollet,
//   getResultOfRollet,
//   walletamount,
// } from "../../../services/apicalling";
// import roulette from "../../assets/images/rolette.png";
// import wheel_roulette from "../../assets/images/roulettewheel.mp3";
// import watch from "../../assets/images/watch.png";
// import { addWinCap, confirmBet, spinFunction } from "../../sharedFunction";
// import Rolletball from "../Rolletball";
// import Coin from "./Coin";
// import { style } from "./CommonCss";
// import First12 from "./First12";
// import NeighbourHoodBet from "./NeighbourHoodBet";
// import Second12 from "./Second12";
// import SvgCircle from "./SvgCircle";
// import MyTableComponent from "./Tablehistory";
// import Third12 from "./Third12";
// import Zero from "./Zero";
// function Testt() {
//   let interval_music;
//   const client = useQueryClient();
//   const socket = useSocket();
//   const audioRefMusic = useRef();
//   const value =
//     (localStorage.getItem("logindataen") &&
//       CryptoJS.AES.decrypt(
//         localStorage.getItem("logindataen"),
//         "anand"
//       )?.toString(CryptoJS.enc.Utf8)) ||
//     null;
//   const red_array = [
//     1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
//   ];
//   const black_array = [
//     2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
//   ];

//   const [open1, setOpen1] = useState();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isOpenPreRoundDialogBox, setisOpenPreRoundDialogBox] = useState(false);
//   const [isSelectedDropBet, setisSelectedDropBet] = useState(false);
//   const user_id = value && JSON.parse(value)?.UserID;
//   const [openDialogBoxhistory, setopenDialogBoxhistory] = useState(false);
//   const [one_min_time, setOne_min_time] = useState(0);
//   const [result_rollet, setresult_rollet] = useState(0);
//   const show_this_one_min_time = String(one_min_time).padStart(2, "0");
//   const [open, setOpen] = useState(false);
//   const [bet, setBet] = useState([]);
//   const [openDialogBox, setOpenDialogBox] = useState("");
//   const [amount, setAmount] = useState(10);
//   const [rebet, setrebet] = useState([]);
//   const [preBetHandle, setIsPreBetHandle] = useState(false);

//   useEffect(() => {
//     localStorage?.setItem("isPreBet", false);
//   }, []);
//   const { isLoading: wallet_amont_lodin, data: wallet_amount } = useQuery(
//     ["walletamount"],
//     () => walletamount(),
//     {
//       refetchOnMount: false,
//       refetchOnReconnect: true,
//     }
//   );

//   const wallet_amount_data = wallet_amount?.data?.data || 0;
//   const { isLoading, data } = useQuery(
//     ["profile_rollet"],
//     () => getProfileRollet(),
//     {
//       refetchOnMount: false,
//       refetchOnReconnect: true,
//     }
//   );

//   const profileData = data?.data?.data || 0;

//   const { isLoading: bet_history_loding, data: bet_history } = useQuery(
//     ["history_rollet"],
//     () => getHistoryRollet(),
//     {
//       refetchOnMount: false,
//       refetchOnReconnect: true,
//     }
//   );

//   const bet_history_Data = bet_history?.data?.data || [];
//   const { isLoading: bet_result_history_loding, data: bet_result_history } =
//     useQuery(["history_rollet_result"], () => getResultOfRollet(), {
//       refetchOnMount: false,
//       refetchOnReconnect: true,
//     });

//   const bet_result_history_Data = useMemo(() => {
//     return bet_result_history?.data?.data?.slice(0, 10) || [];
//   }, [bet_result_history]);

//   function removeSingleBetFunction(id) {
//     let filterArray = bet?.filter((i) => i?.id !== id);
//     setBet(filterArray);
//     let element = document.getElementById(`${id}`);
//     let span = element.querySelector("span");
//     if (span) {
//       element.removeChild(span);
//     }
//   }

//   function setBetFuncton(id, number, amount) {
//     console.log(id, number, amount, "all data");
//     if (one_min_time <= 10) return;
//     const obj = {
//       id: id,
//       number: number,
//       amount: amount,
//     };
//     console.log(obj);
//     let isContainsPre = bet?.find((i) => i?.id === id);
//     if (isContainsPre) {
//       console.log("inside if");
//       const updatedArray = bet.map((item) => {
//         if (item.id === id) {
//           return { ...item, amount: amount };
//         }
//         return item;
//       });
//       setBet(updatedArray);
//     } else {
//       console.log("inside else");
//       setBet([...bet, obj]);
//     }
//     console.log(bet);
//     let element = document.getElementById(`${id}`);
//     element.style.position = "relative"; // Ensure the parent is positioned relatively
//     let newelement = element.querySelector("span");

//     if (newelement) {
//       newelement.innerHTML = `${
//         amount >= 1000 ? String(amount / 1000) + "k" : amount
//       }`;
//     } else {
//       newelement = document.createElement("span");
//       let vlaue = `${amount >= 1000 ? String(amount / 1000) + "k" : amount}`;
//       newelement.innerHTML = `${vlaue}`;
//       newelement.style.position = "absolute"; // Make the span position absolute
//       newelement.style.top = "50%"; // Center vertically
//       newelement.style.left = "50%"; // Center horizontally
//       newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
//       newelement.style.display = "flex"; // Use flexbox for centering content
//       newelement.style.alignItems = "center"; // Center content vertically
//       newelement.style.justifyContent = "center"; // Center content horizontally
//       newelement.style.textAlign = "center";
//       newelement.style.height = "15px"; // Ensure height is sufficient
//       newelement.style.width = "15px"; // Ensure width is sufficient
//       newelement.style.backgroundColor = "white";
//       newelement.style.color = "black";
//       newelement.style.border = "1px solid blue";
//       newelement.style.borderRadius = "50%";
//       newelement.style.padding = "3px";
//       newelement.style.fontSize = "8px"; // Adjust font size for better visibility
//     }

//     element.appendChild(newelement);
//   }

//   function removeBetFunctonAll() {
//     bet?.forEach((ele) => {
//       let element = document.getElementById(`${ele?.id}`);
//       let span = element.querySelector("span");
//       if (span) {
//         element.removeChild(span);
//       }
//     });
//     setBet([]);
//   }

//   useEffect(() => {
//     if (!checkTokenValidity()) {
//       localStorage.clear();
//       sessionStorage.clear();
//       window.location.href = "/"; // Redirect to login page
//     }
//   }, []);

//   const speakMessage = (message) => {
//     if ("speechSynthesis" in window) {
//       let newMessage = "hii";
//       if (red_array?.includes(message)) {
//         newMessage = String(message) + " " + "Red Wins";
//       } else if (black_array?.includes(message)) {
//         newMessage = String(message) + " " + "Black Wins";
//       } else {
//         newMessage = String(message) + " " + "Special";
//       }

//       const speech = new SpeechSynthesisUtterance(newMessage);
//       speech.lang = "en-US";
//       window.speechSynthesis.speak(speech);
//     } else {
//       console.error("Speech Synthesis is not supported in this browser.");
//     }
//   };

//   const handlePlaySound = async () => {
//     try {
//       if (audioRefMusic.current) {
//         if (isPlaying) {
//           await audioRefMusic.current.pause();
//         } else {
//           await audioRefMusic.current.play();
//         }
//         setIsPlaying(!isPlaying);
//       }
//     } catch (error) {
//       // Handle any errors during play/pause
//       console.error("Error during play/pause:", error);
//     }
//   };

//   useEffect(() => {
//     const handleOneMin = (onemin) => {
//       setOne_min_time(onemin);

//       if (onemin === 58 || onemin === 57) setIsPreBetHandle(true);
//       if (onemin === 0) {
//         handlePlaySound();
//         interval_music = setInterval(() => {
//           handlePlaySound();
//         }, 1000);
//       }

//       if (onemin === 10) {
//         let id = localStorage.getItem("result_rollet");
//         let element = document.getElementById(`${String(id)}_rotate`);

//         element?.classList.add("hidden");
//         setresult_rollet(0);
//       }
//       if (onemin > 10) {
//         setisOpenPreRoundDialogBox(false);
//       }
//       if (onemin <= 10) {
//         setopenDialogBoxhistory(false);
//         setOpen(false);
//         setOpenDialogBox(false);
//       }
//     };
//     const handleOneMinrolletresult = (onemin) => {
//       spinFunction(onemin);
//       localStorage.setItem("result_rollet", onemin);
//       setTimeout(() => {
//         interval_music && clearInterval(interval_music);
//       }, 9000);

//       setTimeout(() => {
//         setresult_rollet(onemin);
//         client.refetchQueries("history_rollet");
//         client.refetchQueries("walletamount");
//         client.refetchQueries("history_rollet_result");
//         speakMessage(onemin);
//         addWinCap(onemin);
//       }, 10000);
//     };
//     socket.on("oneminrollet", handleOneMin);
//     socket.on("rolletresult", handleOneMinrolletresult);
//     return () => {
//       socket.off("oneminrollet", handleOneMin);
//       socket.off("rolletresult", handleOneMinrolletresult);
//     };
//   }, []);

//   useEffect(() => {
//     if (one_min_time <= 10) setisOpenPreRoundDialogBox(true);
//   }, []);

//   useEffect(() => {
//     let isPlaced = localStorage.getItem("rollet_bet_placed");
//     let win_amount = 0;
//     for (let i = 0; i < bet?.length; i++) {
//       win_amount += Number(bet_history?.data?.data?.[i]?.win || 0) || 0;
//     }
//     console.log(win_amount);
//     if (win_amount > 0 && isPlaced === "true") {
//       setOpenDialogBox(true);
//       setTimeout(() => {
//         setOpenDialogBox(false);
//         localStorage?.setItem("rollet_bet_placed", false);
//       }, 2000);
//     }
//   }, [
//     Number(
//       bet_history_Data?.reduce((a, b) => a + Number(b?.win || 0), 0) || 0
//     )?.toFixed(2),
//   ]);

//   const handleConfirm = () => {
//     setOpen1(false);
//     localStorage.setItem("isPreBet", false);
//     window.location.href = "/dashboard";
//   };

//   const handleCancel = () => {
//     setOpen1(false);
//   };

//   function rebetFuncton() {
//     // setBet([]);
//     bet?.forEach((ele) => {
//       let element = document.getElementById(`${ele?.id}`);
//       let span = element.querySelector("span");
//       if (span) {
//         element.removeChild(span);
//       }
//     });
//     console.log(rebet, "his is");
//     rebet?.forEach((ele) => {
//       forPlaceCoin(ele?.id, ele?.amount);
//     });
//     setBet(rebet);
//     // setrebet
//   }

//   function forPlaceCoin(id, amount) {
//     let element = document.getElementById(`${id}`);
//     element.style.position = "relative"; // Ensure the parent is positioned relatively
//     let newelement = element.querySelector("span");

//     if (newelement) {
//       newelement.innerHTML = `${
//         amount >= 1000 ? String(amount / 1000) + "k" : amount
//       }`;
//     } else {
//       newelement = document.createElement("span");
//       let vlaue = `${amount >= 1000 ? String(amount / 1000) + "k" : amount}`;
//       newelement.innerHTML = `${vlaue}`;
//       newelement.style.position = "absolute"; // Make the span position absolute
//       newelement.style.top = "50%"; // Center vertically
//       newelement.style.left = "50%"; // Center horizontally
//       newelement.style.transform = "translate(-50%, -50%)"; // Adjust position to center
//       newelement.style.display = "flex"; // Use flexbox for centering content
//       newelement.style.alignItems = "center"; // Center content vertically
//       newelement.style.justifyContent = "center"; // Center content horizontally
//       newelement.style.textAlign = "center";
//       newelement.style.height = "15px"; // Ensure height is sufficient
//       newelement.style.width = "15px"; // Ensure width is sufficient
//       newelement.style.backgroundColor = "white";
//       newelement.style.color = "black";
//       newelement.style.border = "1px solid blue";
//       newelement.style.borderRadius = "50%";
//       newelement.style.padding = "3px";
//       newelement.style.fontSize = "8px"; // Adjust font size for better visibility
//     }

//     element.appendChild(newelement);
//   }

//   function justDouble() {
//     bet?.forEach((ele) => {
//       let element = document.getElementById(`${ele?.id}`);
//       let span = element.querySelector("span");
//       if (span) {
//         element.removeChild(span);
//       }
//     });

//     let newUpdateAmountArray = bet?.map((ele) => {
//       return {
//         ...ele,
//         amount: [...black_array, ...red_array]?.includes(Number(ele?.id))
//           ? Number(ele?.amount) * 2 > 5000
//             ? ele?.amount
//             : Number(ele?.amount) * 2
//           : Number(ele?.amount) * 2 > 10000
//           ? ele?.amount
//           : Number(ele?.amount) * 2,
//       };
//     });
//     console.log(newUpdateAmountArray, "update array");
//     newUpdateAmountArray?.forEach((ele) => {
//       forPlaceCoin(ele?.id, ele?.amount);
//     });
//     setBet(newUpdateAmountArray);
//   }
//   console.log(bet, "final");
//   return (
//     <Box className="home" sx={style.root}>
//       {useMemo(() => {
//         return (
//           <>
//             <audio ref={audioRefMusic} hidden>
//               <source src={`${wheel_roulette}`} type="audio/mp3" />
//             </audio>
//             {/* <audio ref={audioRefMusicPlaceBet} hidden>
//               <source src={`${place_your_bet}`} type="audio/mp3" />
//             </audio> */}
//           </>
//         );
//       }, [audioRefMusic])}
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//         }}
//       >
//         <Drawer
//           sx={{
//             "&>div": {
//               background: "transparent",
//               width: "400px",
//               height: "85vh",
//               ...style.flex,
//             },
//           }}
//           anchor="top"
//           open={open1}
//           onClose={() => {
//             setOpen1(open1);
//           }}
//         >
//           <Box
//             sx={{
//               width: "350px",
//               height: "150px",
//               background: "black",
//               transform: "rotate(90deg)",
//               borderRadius: "10px",
//               padding: "20px",
//               color: "yellow",
//               borderColor: "yellow  !important",
//             }}
//           >
//             <div className=" !flex flex-col !justify-center !items-center mt-4">
//               <div>
//                 <p className="text-2xl font-bold ">Are you sure want to exit</p>
//               </div>
//               <div className="!flex !justify-center gap-12 mt-4">
//                 <button
//                   onClick={handleConfirm}
//                   className="font-bold text-xl rounded border border-yellow-300 px-4"
//                 >
//                   OK
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   className="font-bold text-xl rounded border border-yellow-300 px-4"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </Box>
//         </Drawer>
//         <Drawer
//           sx={{
//             "&>div": {
//               background: "transparent",
//               width: "400px",
//               height: "85vh",
//               ...style.flex,
//             },
//           }}
//           anchor="top"
//           open={isOpenPreRoundDialogBox}
//           // onClose={() => {
//           //   setopenDialogBoxhistory(!openDialogBoxhistory);
//           // }}
//         >
//           <Box
//             className="!text-yellow-500 !font-extrabold  "
//             sx={{
//               // width: "100%",
//               // height: "50%",
//               background: "black !important ",
//               transform: "rotate(90deg)",
//               borderRadius: "10px",
//               padding: "10px",
//             }}
//           >
//             PLEASE &nbsp; WAIT&nbsp; TO &nbsp;COMPLETE &nbsp; LAST &nbsp; GAME
//           </Box>
//         </Drawer>
//         <Box direction={"row"} sx={style.winnerlooserouter}>
//           <Box sx={style.winnerLooserList2}>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               Min-Play
//             </Typography>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               in 1 0 out 10
//             </Typography>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               Max-play
//             </Typography>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               in 5000 out 50000
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//         }}
//       >
//         <Box direction={"row"} sx={style.wunningamount}>
//           <Box sx={style.winnerLooserList4}>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               Total bet amount :{" "}
//               <span style={{ color: "red" }}>
//                 {(
//                   bet_history_Data?.reduce(
//                     (a, b) => a + Number(b?.amount || 0),
//                     0
//                   ) || 0
//                 ).toFixed(2)}
//               </span>
//             </Typography>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               You Win :{" "}
//               <span style={{ color: "#15158F !important" }}>
//                 {Number(
//                   bet_history_Data?.reduce(
//                     (a, b) => a + Number(b?.win || 0),
//                     0
//                   ) || 0
//                 )?.toFixed(2)}
//               </span>
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//         }}
//       >
//         <Box direction={"row"} sx={style.winnerlooserouter2}>
//           {[5, 4, 3, 2, 1, 0]?.map((ele) => {
//             return (
//               <Box key={ele} sx={style.winnerLooserList}>
//                 <Typography
//                   variant="body1"
//                   color="initial"
//                   sx={{ color: "red" }}
//                 >
//                   {black_array?.includes(
//                     Number(bet_result_history_Data?.[ele]?.number)
//                   ) && Number(bet_result_history_Data?.[ele]?.number)}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   color="initial"
//                   sx={{ color: "red" }}
//                   className="!mx-2"
//                 >
//                   {0 === Number(bet_result_history_Data?.[ele]?.number) &&
//                     Number(bet_result_history_Data?.[ele]?.number)}
//                 </Typography>
//                 <Typography
//                   variant="body1"
//                   color="initial"
//                   sx={{ color: "red" }}
//                 >
//                   {red_array?.includes(
//                     Number(bet_result_history_Data?.[ele]?.number)
//                   ) && Number(bet_result_history_Data?.[ele]?.number)}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//         }}
//       >
//         <Box direction={"row"} sx={style.winnerlooserouter3}>
//           <Box sx={style.winnerLooserList3}>
//             <Typography variant="body1" color="initial" sx={{ color: "red" }}>
//               {result_rollet}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Box sx={style.bettable} className={""}>
//         <Stack className={"!w-[100%]"} direction="row" justifyContent="end">
//           <span className="!grid !grid-cols-3  !w-[71%]">
//             <IconButton sx={style.btn1}>
//               <p
//                 id="336"
//                 onClick={(e) => {
//                   if (isSelectedDropBet) {
//                     removeSingleBetFunction(336);
//                     return;
//                   }
//                   if (amount < 10 || amount > 50000)
//                     return toast("Please select amount greater than 10");
//                   let isContainsPre = bet?.find((i) => i?.id === 336);
//                   if (isContainsPre) {
//                     // setOpenDialogBox(336);
//                     if (
//                       isContainsPre?.amount + amount > 50000 ||
//                       isContainsPre?.amount < 10
//                     ) {
//                       return toast(
//                         "Bet must be greater than 10 and less that 50000 Rupees"
//                       );
//                     } else {
//                       setBetFuncton(
//                         336,
//                         [336],
//                         Number(isContainsPre?.amount) + amount
//                       );
//                     }
//                   } else {
//                     setBetFuncton(336, [336], amount);
//                   }
//                   e.stopPropagation();
//                 }}
//               >
//                 2 to 1
//               </p>
//             </IconButton>
//             <IconButton sx={style.btn1}>
//               <p
//                 id="235"
//                 onClick={(e) => {
//                   if (isSelectedDropBet) {
//                     removeSingleBetFunction(235);
//                     return;
//                   }
//                   if (amount < 10 || amount > 50000)
//                     return toast("Please select amount greater than 10");
//                   let isContainsPre = bet?.find((i) => i?.id === 235);
//                   if (isContainsPre) {
//                     // setOpenDialogBox(235);
//                     if (
//                       isContainsPre?.amount + amount > 50000 ||
//                       isContainsPre?.amount < 10
//                     ) {
//                       return toast(
//                         "Bet must be greater than 10 and less that 50000 Rupees"
//                       );
//                     } else {
//                       setBetFuncton(
//                         235,
//                         [235],
//                         Number(isContainsPre?.amount) + amount
//                       );
//                     }
//                   } else {
//                     setBetFuncton(235, [235], amount);
//                   }
//                   e.stopPropagation();
//                 }}
//               >
//                 2 to 1
//               </p>
//             </IconButton>
//             <IconButton sx={style.btn1}>
//               <p
//                 id="134"
//                 onClick={(e) => {
//                   if (isSelectedDropBet) {
//                     removeSingleBetFunction(134);
//                     return;
//                   }
//                   if (amount < 10 || amount > 50000)
//                     return toast("Please select amount greater than 10");
//                   let isContainsPre = bet?.find((i) => i?.id === 134);
//                   if (isContainsPre) {
//                     // setOpenDialogBox(134);
//                     if (
//                       isContainsPre?.amount + amount > 50000 ||
//                       isContainsPre?.amount < 10
//                     ) {
//                       return toast(
//                         "Bet must be greater than 10 and less that 50000 Rupees"
//                       );
//                     } else {
//                       setBetFuncton(
//                         134,
//                         [134],
//                         Number(isContainsPre?.amount) + amount
//                       );
//                     }
//                   } else {
//                     setBetFuncton(134, [134], amount);
//                   }
//                   e.stopPropagation();
//                 }}
//               >
//                 2 to 1
//               </p>
//             </IconButton>
//           </span>
//         </Stack>
//         <Third12
//           isSelectedDropBet={isSelectedDropBet}
//           removeSingleBetFunction={removeSingleBetFunction}
//           // setOpenDialogBox={setOpenDialogBox}
//           bet={bet}
//           setBetFuncton={setBetFuncton}
//           amount={amount}
//         />
//         <Second12
//           isSelectedDropBet={isSelectedDropBet}
//           removeSingleBetFunction={removeSingleBetFunction}
//           // setOpenDialogBox={setOpenDialogBox}
//           bet={bet}
//           setBetFuncton={setBetFuncton}
//           amount={amount}
//         />
//         <First12
//           isSelectedDropBet={isSelectedDropBet}
//           removeSingleBetFunction={removeSingleBetFunction}
//           // setOpenDialogBox={setOpenDialogBox}
//           bet={bet}
//           setBetFuncton={setBetFuncton}
//           amount={amount}
//         />
//         <Zero
//           isSelectedDropBet={isSelectedDropBet}
//           removeSingleBetFunction={removeSingleBetFunction}
//           // setOpenDialogBox={setOpenDialogBox}
//           bet={bet}
//           setBetFuncton={setBetFuncton}
//           amount={amount}
//         />
//       </Box>

//       {useMemo(() => {
//         return (
//           <div
//             style={{
//               width: "200px",
//               height: "200px",
//               position: "absolute",
//               // borderRadius: "50%",
//               bottom: "1%",
//               right: "1%",
//             }}
//             className=" !flex !justify-center !items-center animation_image"
//           >
//             {/* animation_image */}
//             <img src={roulette} className="!h-full !w-full !bg-no-repeat " />

//             <Rolletball />
//           </div>
//         );
//       }, [])}
//       <Box
//         sx={{
//           width: "25px",
//           height: "100%",
//         }}
//       >
//         <Box
//           sx={style.naiming6}
//           component={NavLink}
//           onClick={() => {
//             one_min_time > 10 && setOpen(true);
//           }}
//         >
//           <Typography variant="body1" color="initial">
//             NEIGHTBOUR BET
//           </Typography>
//         </Box>
//         <Box sx={style.naiming}>
//           <Typography variant="body1" color="initial">
//             POINT BALANCE
//           </Typography>
//           <Typography variant="body1" color="initial">
//             0.08
//           </Typography>
//         </Box>
//         <Box sx={style.naiming2}>
//           <Typography variant="body1" color="initial">
//             Name
//           </Typography>
//           <Typography variant="body1" color="initial">
//             {isLoading ? (
//               <CircularProgress className="!text-red-600" size={"small"} />
//             ) : profileData?.full_name ? (
//               profileData?.full_name?.substring(0, 15)
//             ) : (
//               "*****"
//             )}
//           </Typography>
//         </Box>
//         <Coin
//           setAmount={setAmount}
//           amount={amount}
//           setisSelectedDropBet={setisSelectedDropBet}
//         />
//         <Box sx={style.naiming3}>
//           <Typography
//             variant="body1"
//             color="initial"
//             onClick={() => one_min_time > 10 && setopenDialogBoxhistory(true)}
//           >
//             GAME HISTORY
//           </Typography>
//         </Box>
//         {preBetHandle && localStorage.getItem("isPreBet") && (
//           <>
//             <Box sx={style.naiming3} className={"!absolute "}>
//               <Typography
//                 variant="body1"
//                 color="initial"
//                 onClick={() => rebetFuncton()}
//               >
//                 Rebet
//               </Typography>
//             </Box>
//             <Box className={"!absolute !bg-red-700 !mr-0 !mb-0"}>
//               <Typography
//                 variant="body1"
//                 color="initial"
//                 className="!bg-red-600 !text-red-700 !cursor-pointer"
//                 onClick={() => justDouble()}
//               >
//                 2XXXX
//               </Typography>
//             </Box>
//           </>
//         )}
//         <Box sx={style.naiming4} onClick={() => setOpen1(true)}>
//           <Typography variant="body1" color="initial">
//             LEAVE TABLE
//           </Typography>
//         </Box>
//         {one_min_time > 10 && (
//           <Box sx={style.naiming5} className={"!flex !gap-3"}>
//             <Typography
//               className="!bg-[#15158f] !p-1"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "11px",
//                 borderRadius: "5px",
//               }}
//               onClick={() =>
//                 confirmBet(
//                   rebet,
//                   setrebet,
//                   bet,
//                   setBet,
//                   user_id,
//                   wallet_amount_data,
//                   client
//                 )
//               }
//               variant="body1"
//               color="initial"
//             >
//               CONFIRM
//             </Typography>
//             <Typography
//               className="!bg-[#FF0000] !p-1 !text-white"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "11px",
//                 borderRadius: "5px",
//               }}
//               onClick={() => {
//                 setisSelectedDropBet(true);
//               }}
//               variant="body1"
//               color="initial"
//             >
//               DROP
//             </Typography>
//           </Box>
//         )}
//         <Box sx={style.naiming7} className={"!flex "}>
//           <Typography
//             onClick={() => removeBetFunctonAll()}
//             variant="body1"
//             color="initial"
//           >
//             CLEAR BET
//           </Typography>
//         </Box>
//       </Box>

//       <Box
//         // countdown
//         sx={{
//           ...style.countdownOuter,
//           backgroundImage: `url(${watch})`,
//           backgroundSize: "100%",
//         }}
//         className=" !flex !justify-center !items-center"
//       >
//         <div
//           className="!text-white absolute right-[-40px] !text-[10px] transform rotate-90"
//           style={{
//             background: "#15158F",
//             padding: "5px",
//             marginRight: "-15px",
//             borderRadius: "2px",
//           }}
//         >
//           Time Left: {show_this_one_min_time}
//         </div>

//         {/* <Box className="wrapper">
//         <Box className="pie spinner"></Box>
//         <Box className="pie filler"></Box>
//         <Box className="mask"></Box>
//       </Box> */}
//         <SvgCircle />
//       </Box>
//       <Drawer
//         sx={{
//           "&>div": { background: "#0000009e", width: "400px", height: "85vh" },
//         }}
//         anchor="top"
//         open={open}
//         onClose={() => {
//           setOpen(!open);
//         }}
//       >
//         <NeighbourHoodBet
//           isSelectedDropBet={isSelectedDropBet}
//           removeSingleBetFunction={removeSingleBetFunction}
//           setOpenDialogBox={setOpenDialogBox}
//           bet={bet}
//           setBetFuncton={setBetFuncton}
//           amount={amount}
//           open={open}
//           setOpen={setOpen}
//         />
//       </Drawer>
//       <Drawer
//         sx={{
//           "&>div": {
//             background: "transparent",
//             width: "400px",
//             height: "85vh",
//             ...style.flex,
//           },
//         }}
//         anchor="top"
//         open={openDialogBox}
//         onClose={() => {
//           setOpenDialogBox(!openDialogBox);
//         }}
//       >
//         <Box
//           sx={{
//             width: "350px",
//             height: "200px",
//             background: "white",
//             transform: "rotate(90deg)",
//             borderRadius: "10px",
//             padding: "20px",
//           }}
//         >
//           <Stack direction="row" sx={{ float: "right" }}>
//             <CloseIcon onClick={() => setOpenDialogBox("")} />
//           </Stack>
//           <div className="!mt-4 !w-full !h-full !flex !justify-center !items-center">
//             {"You Have Win"}
//           </div>
//         </Box>
//       </Drawer>

//       <Drawer
//         sx={{
//           "&>div": {
//             background: "#0000009e",
//             width: "400px",
//             height: "85vh",
//             ...style.flex,
//           },
//         }}
//         anchor="top"
//         open={openDialogBoxhistory}
//         onClose={() => {
//           setopenDialogBoxhistory(!openDialogBoxhistory);
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             height: "50%",
//             background: "white",
//             transform: "rotate(90deg)",
//             borderRadius: "10px",
//             padding: "20px",
//           }}
//         >
//           <Stack direction="row" sx={{ float: "right", my: 1 }}>
//             <CloseIcon onClick={() => setopenDialogBoxhistory("")} />
//           </Stack>
//           <MyTableComponent bet_history_Data={bet_history_Data} />
//         </Box>
//       </Drawer>
//     </Box>
//   );
// }
// export default Testt;














///////////////////////////// wheelll real code /////////////////////
// import React from 'react'

// const Rolletball = () => {
//   return (
//     <>
//       <p id="30_rotate" className="absolute !h-[50%] !w-[50%]  !bg-black ">
//         <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0  "></p>
//       </p>
      {/* <p
        id="8_rotate"
        className=" rotate-[9deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
     <p
        id="23_rotate"
        className=" rotate-[19deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
       <p
        id="10_rotate"
        className=" rotate-[28deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="5_rotate"
        className=" rotate-[39deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="24_rotate"
        className=" rotate-[49deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="16_rotate"
        className=" rotate-[59deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="33_rotate"
        className=" rotate-[69deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="1_rotate"
        className=" rotate-[78deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="20_rotate"
        className=" rotate-[88deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="14_rotate"
        className=" rotate-[98deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="31_rotate"
        className=" rotate-[108deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="9_rotate"
        className=" rotate-[118deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="22_rotate"
        className=" rotate-[128deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="18_rotate"
        className=" rotate-[137deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="29_rotate"
        className=" rotate-[147deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="7_rotate"
        className=" rotate-[157deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="28_rotate"
        className=" rotate-[167deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="12_rotate"
        className=" rotate-[176deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="35_rotate"
        className=" rotate-[186deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="3_rotate"
        className=" rotate-[196deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="26_rotate"
        className=" rotate-[206deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="0_rotate"
        className=" rotate-[215deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="32_rotate"
        className=" rotate-[225deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="15_rotate"
        className=" rotate-[235deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="19_rotate"
        className=" rotate-[245deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="4_rotate"
        className=" rotate-[255deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="21_rotate"
        className=" rotate-[264deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="2_rotate"
        className=" rotate-[274deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="25_rotate"
        className=" rotate-[283deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="17_rotate"
        className=" rotate-[293deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="34_rotate"
        className=" rotate-[302deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="6_rotate"
        className=" rotate-[312deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="27_rotate"
        className=" rotate-[322deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="13_rotate"
        className=" rotate-[331deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="36_rotate"
        className=" rotate-[340deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p>
      <p
        id="11_rotate"
        className=" rotate-[350deg] absolute !h-[50%] !w-[50%]  !bg-black "
      >
        <p className="!bg-white !h-2 !w-2 !rounded-full !absolute !bottom-0 !left-0 "></p>
      </p> */}
    // </>
//   );
// }

// export default Rolletball
