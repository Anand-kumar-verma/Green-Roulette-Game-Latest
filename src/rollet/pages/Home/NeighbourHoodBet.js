import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import rollatesidebar from "../../assets/images/roulettesidebar.png";
const NeighbourHoodBet = ({
  setOpenDialogBox,
  bet,
  setBetFuncton,
  amount,
  open,
  setOpen,
}) => {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          zIndex: "5000000",
        }}
      >
        <NavLink
          onClick={() => {
            setOpen(!open);
          }}
        >
          <CloseIcon sx={{ color: "white", fontSize: "40px" }} />
        </NavLink>
      </Box>
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            transform: "rotate(90deg)",
            width: 500,
            height: 173,
            top: "35%",
            left: "-14%",
          }}
        >
          <Box component="img" src={rollatesidebar}></Box>
          <Box
            // component={NavLink}
            sx={{
              width: "143px",
              height: "62px",
              position: "absolute",
              top: "33%",
              left: "7%",
              clipPath: "polygon(0 0, 65% 0, 100% 100%, 0% 100%)",
              // background: 'red',
            }}
            className={"!flex !justify-center !items-center"}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="101"
              onClick={(e) => {
                let isContainsPre = bet?.find((i) => i?.id === 101);
                if (isContainsPre) {
                  setOpenDialogBox(101);
                } else {
                  setBetFuncton(101, [101], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
          <Box
            // component={NavLink}
            sx={{
              width: 133,
              height: 62,
              position: "absolute",
              top: "33%",
              left: "26%",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)",
              WebkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)",
              // backgroundColor: 'green',
            }}
            className={"!flex !justify-center !items-center"}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="102"
              onClick={(e) => {
                let isContainsPre = bet?.find((i) => i?.id === 102);
                if (isContainsPre) {
                  setOpenDialogBox(102);
                } else {
                  setBetFuncton(102, [102], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
          <Box
            // component={NavLink}
            sx={{
              width: 125,
              height: 62,
              position: "absolute",
              top: "33%",
              left: "53%",
              // backgroundColor: 'yellow',
            }}
            className={"!flex !justify-center !items-center"}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="103"
              onClick={(e) => {
                let isContainsPre = bet?.find((i) => i?.id === 103);
                if (isContainsPre) {
                  setOpenDialogBox(103);
                } else {
                  setBetFuncton(103, [103], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
          <Box
            // component={NavLink}
            sx={{
              width: 73,
              height: 62,
              position: "absolute",
              top: "33%",
              right: "7%",
              // backgroundColor: 'black',
              borderRadius: "25px",
            }}
            className={"!flex !justify-center !items-center"}
          >
            <span
              className="whitespace-nowrap !h-full !w-full !text-[10px] !text-white"
              id="104"
              onClick={(e) => {
                let isContainsPre = bet?.find((i) => i?.id === 104);
                if (isContainsPre) {
                  setOpenDialogBox(104);
                } else {
                  setBetFuncton(104, [104], amount);
                }
                e.stopPropagation();
              }}
            ></span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NeighbourHoodBet;
