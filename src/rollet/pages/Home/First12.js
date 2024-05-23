import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { style } from "./CommonCss";
import toast from "react-hot-toast";
const First12 = ({
  isSelectedDropBet,
  removeSingleBetFunction,
  setOpenDialogBox,
  bet,
  setBetFuncton,
  amount,
}) => {
  return (
    <Stack direction="row" justifyContent="end" sx={{ height: "28.56%" }}>
      <div
        className="w-[14%]  !grid grid-rows-2 !place-items-center "
        style={{ border: "1px solid white", ...style.flex }}
      >
        <div className="!p-0" style={{ width: "75%", height: '100%', border: '1px solid white' }}>
          <div
            variant="body1"
            color="initial"
            className="!flex !justify-center !items-center "
          >
            <span
              style={{ fontWeight: 700, transform: 'rotate(90deg)', marginTop: '100%' }}
              className="whitespace-nowrap !text-[12px] !text-white  "
              id="119"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(119);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 119);
                if (isContainsPre) {
                  // setOpenDialogBox(119);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      119,
                      [119],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(119, [119], amount);
                }
                e.stopPropagation();
              }}
            >
              Even
            </span>
          </div>
        </div>
        <div
          className="!p-0"
          style={{ ...style.flex, transform: "rotate(-270deg)" }}
        >
          <div variant="body1" color="initial">
            <span
              style={{ color: "white", fontWeight: 700 }}
              className="whitespace-nowrap !text-[12px] !text-white "
              id="118"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(118);
                  return;
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 118);
                if (isContainsPre) {
                  // setOpenDialogBox(118);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      118,
                      [118],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(118, [118], amount);
                }
                e.stopPropagation();
              }}
            >
              1to 18
            </span>
          </div>
        </div>
      </div>
      <div
        className="w-[14%]  !grid grid-rows-1  !border-white !place-items-center"
        style={{ ...style.flex, border: "1px solid white" }}
      >
        <IconButton className="!p-0" style={{ transform: "rotate(-270deg)" }}>
          <Typography variant="body1" color="initial">
            <span
              style={{ color: "white", fontWeight: 800 }}
              className="whitespace-nowrap !text-[11px]  "
              id="112"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(112)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 112);
                if (isContainsPre) {
                  // setOpenDialogBox(112);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      112,
                      [112],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(112, [112], amount);
                }
                e.stopPropagation();
              }}
            >
              1st 12
            </span>
          </Typography>
        </IconButton>
      </div>
      <Stack
        sx={{
          width: "60%",
          height: "100%",
          // display: "flex",
          // flexWrap: "wrap",
        }}
        className="!w-full !h-full !grid !grid-cols-3 "
      >
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="12"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(12)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 12);
                if (isContainsPre) {
                  // setOpenDialogBox(12);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      12,
                      [12],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(12, [12], amount);
                }
                e.stopPropagation();
              }}
            >
              12
            </p>
          </IconButton>
          <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="121000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(121000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 121000);
                if (isContainsPre) {
                  // setOpenDialogBox(121000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      121000,
                      [9, 12],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(121000, [9, 12], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="122000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(122000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 122000);
                if (isContainsPre) {
                  // setOpenDialogBox(122000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      122000,
                      [11, 12],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(122000, [11, 12], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[17%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="123000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(123000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 123000);
                if (isContainsPre) {
                  // setOpenDialogBox(123000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      123000,
                      [8, 9, 11, 12],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(123000, [8, 9, 11, 12], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="9"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(9)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 9);
                if (isContainsPre) {
                  // setOpenDialogBox(9);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      9,
                      [9],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(9, [9], amount);
                }
                e.stopPropagation();
              }}
            >
              9
            </p>
          </IconButton>
          <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="91000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(91000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 91000);
                if (isContainsPre) {
                  // setOpenDialogBox(91000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      91000,
                      [6, 9],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(91000, [6, 9], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="92000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(92000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 92000);
                if (isContainsPre) {
                  // setOpenDialogBox(92000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      92000,
                      [8, 9],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(92000, [8, 9], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[42%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="93000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(93000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 93000);
                if (isContainsPre) {
                  // setOpenDialogBox(93000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      93000,
                      [5, 6, 8, 9],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(93000, [5, 6, 8, 9], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="6"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(6)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 6);
                if (isContainsPre) {
                  // setOpenDialogBox(6);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      6,
                      [6],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(6, [6], amount);
                }
                e.stopPropagation();
              }}
            >
              6
            </p>
          </IconButton>
          <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="61000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(61000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 61000);
                if (isContainsPre) {
                  // setOpenDialogBox(61000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      61000,
                      [3, 6],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(61000, [3, 6], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[55%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="62000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(62000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 62000);
                if (isContainsPre) {
                  // setOpenDialogBox(62000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      62000,
                      [5, 6],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(62000, [5, 6], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[67%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="63000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(63000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 63000);
                if (isContainsPre) {
                  // setOpenDialogBox(63000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      63000,
                      [2, 3, 5, 6],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(63000, [2, 3, 5, 6], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="3"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(3)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 3);
                if (isContainsPre) {
                  // setOpenDialogBox(3);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      3,
                      [3],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(3, [3], amount);
                }
                e.stopPropagation();
              }}
            >
              3
            </p>
          </IconButton>
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center"></p> */}
          <p className="absolute top-[80%] left-[82%] h-4 w-4  !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="32000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(32000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 32000);
                if (isContainsPre) {
                  // setOpenDialogBox(32000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      32000,
                      [2, 3],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(32000, [2, 3], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          {/* <p className="absolute top-[92%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center"></p> */}
        </span>
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="11"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(11)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 11);
                if (isContainsPre) {
                  // setOpenDialogBox(11);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      11,
                      [11],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(11, [11], amount);
                }
                e.stopPropagation();
              }}
            >
              11
            </p>
          </IconButton>
          <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="111000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(111000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 111000);
                if (isContainsPre) {
                  // setOpenDialogBox(111000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      111000,
                      [8, 11],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(111000, [8, 11], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="112000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(112000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 112000);
                if (isContainsPre) {
                  // setOpenDialogBox(112000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      112000,
                      [10, 11],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(112000, [10, 11], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[17%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="113000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(113000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 113000);
                if (isContainsPre) {
                  // setOpenDialogBox(113000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      113000,
                      [7, 8, 10, 11],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(113000, [7, 8, 10, 11], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="8"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(8)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 8);
                if (isContainsPre) {
                  // setOpenDialogBox(8);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      8,
                      [8],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(8, [8], amount);
                }
                e.stopPropagation();
              }}
            >
              8
            </p>
          </IconButton>
          <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="81000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(81000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 81000);
                if (isContainsPre) {
                  // setOpenDialogBox(81000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      81000,
                      [5, 8],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(81000, [5, 8], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="82000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(82000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 82000);
                if (isContainsPre) {
                  // setOpenDialogBox(82000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      82000,
                      [7, 8],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(82000, [7, 8], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[42%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="83000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(83000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 83000);
                if (isContainsPre) {
                  // setOpenDialogBox(83000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      83000,
                      [4, 5, 7, 8],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(83000, [4, 5, 7, 8], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="5"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(5)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 5);
                if (isContainsPre) {
                  // setOpenDialogBox(5);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      5,
                      [5],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(5, [5], amount);
                }
                e.stopPropagation();
              }}
            >
              5
            </p>
          </IconButton>
          <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="51000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(51000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 51000);
                if (isContainsPre) {
                  // setOpenDialogBox(51000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      51000,
                      [2, 5],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(51000, [2, 5], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[55%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="52000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(52000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 52000);
                if (isContainsPre) {
                  // setOpenDialogBox(52000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      52000,
                      [4, 5],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(52000, [4, 5], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[67%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="53000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(53000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 53000);
                if (isContainsPre) {
                  // setOpenDialogBox(53000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      53000,
                      [1, 2, 4, 5],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(53000, [1, 2, 4, 5], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="2"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(2)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 2);
                if (isContainsPre) {
                  // setOpenDialogBox(2);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      2,
                      [2],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(2, [2], amount);
                }
                e.stopPropagation();
              }}
            >
              2
            </p>
          </IconButton>
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center"></p> */}
          <p className="absolute top-[80%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="22000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(22000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 22000);
                if (isContainsPre) {
                  // setOpenDialogBox(22000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      22000,
                      [1, 2],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(22000, [1, 2], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          {/* <p className="absolute top-[92%] left-[80%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center"></p> */}
        </span>
        <span className="!grid grid-rows-4 !w-full !h-full relative">
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="10"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(10)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 10);
                if (isContainsPre) {
                  // setOpenDialogBox(10);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      10,
                      [10],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(10, [10], amount);
                }
                e.stopPropagation();
              }}
            >
              10
            </p>
          </IconButton>
          <p className="absolute top-[18%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="101000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(101000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 101000);
                if (isContainsPre) {
                  // setOpenDialogBox(101000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      101000,
                      [7, 10],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(101000, [7, 10], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[5%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="102000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(102000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 102000);
                if (isContainsPre) {
                  // setOpenDialogBox(102000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      102000,
                      [10, 11, 12],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(102000, [10, 11, 12], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>{" "}
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="7"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(7)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 7);
                if (isContainsPre) {
                  // setOpenDialogBox(7);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      7,
                      [7],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(7, [7], amount);
                }
                e.stopPropagation();
              }}
            >
              7
            </p>
          </IconButton>
          <p className="absolute top-[43%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="71000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(71000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 71000);
                if (isContainsPre) {
                  // setOpenDialogBox(71000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      71000,
                      [4, 7],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(71000, [4, 7], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[30%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="72000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(72000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 72000);
                if (isContainsPre) {
                  // setOpenDialogBox(72000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      72000,
                      [7, 8, 9],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(72000, [7, 8, 9], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.black }}>
            <p
              id="4"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(4)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 4);
                if (isContainsPre) {
                  // setOpenDialogBox(4);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      4,
                      [4],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(4, [4], amount);
                }
                e.stopPropagation();
              }}
            >
              4
            </p>
          </IconButton>
          <p className="absolute top-[68%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="41000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(41000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 41000);
                if (isContainsPre) {
                  // setOpenDialogBox(41000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      41000,
                      [1, 4],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(41000, [1, 4], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <p className="absolute top-[55%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="42000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(42000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 42000);
                if (isContainsPre) {
                  // setOpenDialogBox(42000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      42000,
                      [4, 5, 6],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(42000, [4, 5, 6], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>
          <IconButton sx={{ ...style.btn2, ...style.red }}>
            <p
              id="1"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(1)
                  return
                }
                let isContainsPre = bet?.find((i) => i?.id === 1);
                if (isContainsPre) {
                  // setOpenDialogBox(1);
                  if (
                    isContainsPre?.amount + amount > 5000 ||
                    isContainsPre?.amount < 2
                  ) {
                    return toast(
                      "Bet must be grater than 2 and less that 5000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      1,
                      [1],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(1, [1], amount);
                }
                e.stopPropagation();
              }}
            >
              1
            </p>
          </IconButton>
          {/* <p className="absolute top-[93%] left-[28%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center"></p> */}
          <p className="absolute top-[80%] left-[82%] h-4 w-4 !rounded-full !z-50 !cursor-pointer !flex !justify-center !items-center">
            <span
              id="12000"
              className="!z-100 h-full w-full !text-[10px]"
              onClick={(e) => {
                if (isSelectedDropBet) {
                  removeSingleBetFunction(12000)
                  return
                }
                if (amount < 10 || amount > 50000)
                  return toast("Please select amount grater than 10");
                let isContainsPre = bet?.find((i) => i?.id === 12000);
                if (isContainsPre) {
                  // setOpenDialogBox(12000);
                  if (
                    isContainsPre?.amount + amount > 50000 ||
                    isContainsPre?.amount < 10
                  ) {
                    return toast(
                      "Bet must be grater than 10 and less that 50000 Rupees"
                    );
                  } else {
                    setBetFuncton(
                      12000,
                      [1, 2, 3],
                      Number(isContainsPre?.amount) + amount
                    );
                  }
                } else {
                  setBetFuncton(12000, [1, 2, 3], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </p>{" "}
        </span>
      </Stack>
    </Stack>
  );
};

export default First12;
