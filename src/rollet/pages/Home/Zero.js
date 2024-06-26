import React from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { style } from "./CommonCss";
import toast from "react-hot-toast";
const Zero = ({
  isSelectedDropBet,
  removeSingleBetFunction,
  setOpenDialogBox,
  bet,
  setBetFuncton,
  amount,
}) => {
  return (
    <Stack direction="row" justifyContent="end" sx={{ height: "7.14%" }}>
      <Box
        sx={{
          background: "white",
          width: "64%",
          border: "2px solid white",
          transform: "rotate(180deg)",
          position: "relative",
          clipPath: "polygon(50% 0%, 100% 50%, 100% 100%, 0 100%, 0 50%)",
          "&::before": {
            clipPath: "polygon(50% 0%, 100% 50%, 100% 100%, 0 100%, 0 50%)",
            content: "''",
            position: "absolute",
            width: "100%",
            height: "111%",
            background: "#008C34",
          },
        }}
      >
        <IconButton
          sx={style.btn4}
          className="!flex !justify-center !text-center"
        >
          <span
            id="0"
            className="whitespace-nowrap !text-[13px]  !text-white"
            style={{ fontWeight: "500" }}
            onClick={(e) => {
              if (isSelectedDropBet) {
                removeSingleBetFunction("0");
                return; 
              }
              let isContainsPre = bet?.find((i) => i?.id === "0");
              if (isContainsPre) {
                // setOpenDialogBox("0");
                if (
                  isContainsPre?.amount + amount > 5000 ||
                  isContainsPre?.amount < 2
                ) {
                  return toast(
                     <span className="!p-2" style={{ marginTop: "10% ", transform: "rotate(90deg)", backgroundColor: 'black' }}>
                    Bet must be greater than 2 and less that 50000 Rupees
                  </span>
                  );
                } else {
                  setBetFuncton(
                    "0",
                    [0],
                    Number(isContainsPre?.amount) + amount
                  );
                }
              } else {
                setBetFuncton("0", [0], amount);
              }
              e.stopPropagation();
            }}
          >
            0
          </span>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Zero;
