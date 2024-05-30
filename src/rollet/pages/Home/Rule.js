import React, { useEffect } from "react";
import rule from "../../assets/images/rule.png";
import { Box, Drawer } from "@mui/material";

const Rule = ({ setOpen2, open2, style }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Drawer
        className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
        sx={{
          "&>div": {
            background: "transparent",
            width: "370px",
            height: "90vh",
            ...style.flex,
          },
        }}
        anchor="top"
        open={open2}
        onClose={() => {
          setOpen2(open2);
        }}
      >
        <Box
          className="!overflow-x-scroll !overflow-y-scroll overflow-hidden no-scrollbar"
          sx={{
            width: "500px",
            height: "100%",
            background: "black",
            transform: "rotate(90deg)",
            borderRadius: "10px",
            padding: "10px",
            color: "white",
            borderColor: "yellow  !important",
          }}
        >
          {" "}
          <div
            className="!text-white  text-[10px] !text-left w-8 px-1 border border-yellow-400"
            onClick={() => {
              setOpen2(false);
            }}
          >
            Back{" "}
          </div>
          <div className="flex flex-col ">
            <img src={rule} alt="" id="image" />

            <p className="text-[8px] py-2 ">
              The goal of the Lucky36 Mini Timer game is to make a gamble on the
              result of a ball spun around a wheel, which is divided into
              Lucky36 Mini Timer sections. Each Lucky36 Mini Timer section has a
              precise number and a specific color. You can play on a particular
              number being landed on by the ball, or that it will be odd or
              even, or downfall within a column of figures on the Lucky36 Mini
              Timer table layout.
            </p>
            <p className="text-yellow-600 !text-left font-bold"> Payout</p>
          </div>
          <div className="flex flex-col justify-start py-1">
            <div className="flex justify-between border text-[10px]  p-1 border-white text-yellow-500">
              <p className="">Type</p>
              <p className=""> Payout</p>
            </div>
            <div className="flex justify-between   border-b border-r border-l p-1 border-white  text-[8px]">
              <p>
                10 placed on a number only, called a straight-up play, player
                gets{" "}
              </p>
              <p>350</p>
            </div>
            <div className="flex   justify-between border-b border-r border-l p-1 text-[8px] border-white  ">
              <p>
                10 placed in between two-numbers, called split play, player gets{" "}
              </p>
              <p>175</p>
            </div>
            <div className="flex   justify-between border-b border-r border-l p-1 text-[8px] border-white  ">
              <p>
                10 placed in between three-numbers, called street play, player
                gets{" "}
              </p>
              <p>116.60</p>
            </div>
            <div className="flex    justify-between border-b border-r border-l p-1 text-[8px] border-white  ">
              <p>
                10 placed in between four-numbers, called corner play, player
                gets
              </p>
              <p>87.50</p>
            </div>
            <div className="flex    justify-between border-b border-r border-l p-1 text-[8px] border-white  ">
              <p>10 placed on the outside dozen or column, player gets </p>
              <p>30</p>
            </div>
            <div className="flex    justify-between border-b border-r border-l p-1 text-[8px] border-white  ">
              <p>10 placed on Six-numbers, player gets </p>
              <p>58.30</p>
            </div>
            <div className="flex   justify-between border-b border-r border-l p-1 text-[8px] border-white  ">
              <p>10 placed on Even/odd or red/black, player gets </p>
              <p>20</p>
            </div>
            <p className="text-[8px] pt-1">
              There are 2 categories of Lucky36 Mini Timer play that you can
              put, and you may do so in whatever combination or arrangement you
              wish.
            </p>
            <p className="text-[8px] ">
              These two types of Lucky36 Mini Timer play include:
            </p>
            <p className="text-[8px] px-5">
              * Lucky36 Mini Timer inside play - Lucky36 Mini Timer Inside play
              are the figures on the internal area of the Lucky36 Mini Timer
              table layout, where you play.
            </p>
            <p className="text-[8px] px-5">
              * for each particular number. Lucky36 Mini Timer outside play -
              Around the outside of the board lie a figure of other playing
              alternatives, and those are collectively referred to as Lucky36 .{" "}
            </p>
            <p className="text-[8px] ">Mini Timer outside play.</p>
            <p className="text-[8px] pt-1">
              The winners are those play that are on or around the number that
              comes up. Also the play on the outside of the layout win if the
              winning number is represented .
            </p>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default Rule;
