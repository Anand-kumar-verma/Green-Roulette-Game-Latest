import rouletteBORD from "../../assets/images/thumbs_bgs.webp";

export const style = {
  root: {
    maxWidth: "400px",
    width: "100%",
    backgroundColor: "#000000",
    height: "93vh",
    overflow: "hidden",
    marginTop: "auto",
    position: "relative",
    backgroundImage: `url(${rouletteBORD})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    // transform: 'rotate(-90deg) !important',
    // left: '22% !important',
  },

  red: {
    "&>p": {
      background: "red",
      width: "80%",
      borderRadius: "60%",
      fontSize: "15px",
      fontWeight: 600,
      color: "white",
    },
  },
  black: {
    "&>p": {
      background: "black",
      width: "80%",
      borderRadius: "60%",
      fontSize: "15px",
      fontWeight: 600,
      color: "white",
    },
  },
  bettable: {
    // width: "32%",
    // height: "52%",
    // position: "absolute",
    // left: "31%",
    // top: "12%",
    // transform: 'skew(31deg, -45deg)',

    width: "44%",
    height: "58%",
    position: "absolute",
    left: "24%",
    top: "10%",
    transform: 'rotate(-0deg)',

  },
  btn1: {
    padding: 0,
    border: "1px solid white",
    // width: "20%",
    borderRadius: "0px",
    height: "100%",
    transform: "rotate(-180deg)",
    "&>p": {
      fontSize: "10px",
      fontWeight: 600,
      color: "white",
    },
  },
  btn2: {
    padding: 0,
    border: "1px solid white",
    // width: "33.33333%",
    borderRadius: "0px",
    // height: "25%",
    transform: "rotate(-180deg)",
  },
  btn3: {
    padding: 0,
    border: "1px solid white",
    // width: "100%",
    borderRadius: "0px",
    // fontSize: "10px",
    color: "white",
    fontWeight: 600,
    height: "100%",
    "&>p": {
      transform: "rotate(-270deg)",
      fontSize: "12px",
      fontWeight: 600,
      color: "white",
    },
  },
  btn4: {
    padding: 0,
    fontSize: "12px",
    fontWeight: 900,
    color: "white",
    position: "relative",
    left: "43%",
    background: "green",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: 'flex',
    alignItems: 'end',
    marginTop: '5px'
  },
  rotatingElement: { animation: "$rotateInfinite 4s linear infinite" },
  "@keyframes rotateInfinite": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  naiming: {
    background:
      "linear-gradient(to right,#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
    width: "100px",
    transform: "rotate(90deg)",
    position: "absolute",
    top: "6%",
    left: "-6%",
    borderRadius: "13px 13px 5px 5px",
    clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
    "&>p:nth-child(1)": {
      color: "black",
      fontSize: "10px",
      fontWeight: "600",
      textAlign: "center",
    },
    "&>p:nth-child(2)": {
      color: "white",
      fontSize: "11px",
      fontWeight: "600",
      padding: "2px 2px",
      background: "#0849AC",
      width: "95%",
      margin: "auto",
      marginBottom: "2px",
      borderRadius: "13px 13px 5px 5px",
      clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0% 100%)",
      textAlign: 'center',
    },
  },

  naiming6: {
    transform: "rotate(90deg)",
    position: "absolute",
    top: "6.2%",
    left: "6.5%",
    borderRadius: "5px",
    textAlign: "center",
    border: '3px solid #CEAE5E',
    width: "90px",
    "&>p:nth-child(1)": {
      color: "black",
      fontSize: "10px",
      fontWeight: "600",
      padding: "4px",
      background: "#02FAFD",
      width: "100%",
      textAlign: 'center',
      lineHeight: '12px',
    },
  },

  naiming2: {
    background:
      "linear-gradient(to right,#BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
    width: "100px",
    transform: "rotate(90deg)",
    position: "absolute",
    top: "21%",
    left: "-6.1%",
    borderRadius: "13px 13px 5px 5px",
    clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0% 100%)",
    "&>p:nth-child(1)": {
      color: "black",
      fontSize: "10px",
      fontWeight: "600",
      textAlign: "center",
    },
    "&>p:nth-child(2)": {
      color: "white",
      fontSize: "11px",
      fontWeight: "600",
      padding: "2px 2px",
      background: "#0849AC",
      width: "95%",
      margin: "auto",
      marginBottom: "2px",
      borderRadius: "13px 13px 5px 5px",
      clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0% 100%)",
      textAlign: 'center',
    },
  },

  naiming3: {
    transform: "rotate(90deg)",
    position: "absolute",
    top: "74.5%",
    left: "-7.5%",
    borderRadius: "5px",
    textAlign: "center",
    border: '3px solid #CEAE5E',
    width: "90px",
    opacity: '0',
    "&>p:nth-child(1)": {
      color: "black",
      fontSize: "10px",
      fontWeight: "600",
      padding: "4px 10px",
      background: "#02FAFD",
      width: "100%",
      textAlign: 'center',
      lineHeight: '12px',
    },
  },

  naiming4: {
    background: "red",
    width: "70px",
    transform: "rotate(90deg)",
    position: "absolute",
    bottom: "8.7%",
    left: "-6%",
    borderRadius: "2px",
    padding: '5px 0px',
    opacity: 0,
    "&>p:nth-child(1)": {
      color: "white",
      fontSize: "10px",
      background: "red",
      borderRadius: "2px",
      textAlign: 'center;'
    },
  },

  naiming7: {
    background: 'red',
    transform: "rotate(90deg)",
    position: "absolute",
    bottom: "57.5%",
    left: "-8.3%",
    padding: "10px 32px",
    borderRadius: "5px",
    "&>p:nth-child(1)": {
      color: "white",
      fontSize: "10px",
      fontWeight: "600",
      textAlign: "center",
    },
  },

  naiming8: {
    background: 'red',
    transform: "rotate(90deg)",
    position: "absolute",
    bottom: "39.5%",
    left: "-8.1%",
    padding: "6px 32px",
    borderRadius: "5px",
    "&>p:nth-child(1)": {
      color: "white",
      fontSize: "10px",
      fontWeight: "600",
      textAlign: "center",
    },
  },

  naiming5: {
    transform: "rotate(90deg)",
    position: "absolute",
    bottom: "22.5%",
    left: "7%",
    borderRadius: "5px",
    width: '100px',
    height: '27px',
    opacity: '0',
    "&>p:nth-child(1)": {
      color: "white",
      fontWeight: "600",
      textAlign: "center",
      padding: '9px 5px !important',
      width: '100%',
    },
  },


  countdownOuter: {
    position: "absolute",
    width: "60px",
    height: "60px",
    background: "black",
    bottom: "5.5%",
    left: "7.5%",
    border: "1px solid white",
    borderRadius: "10px",
    outline: "10px solid black",
    boxSizing: "border-box",
  },
  winnerlooserouter: {
    padding: "2px",
    border: "2px solid #C9A553",
    position: "absolute",
    right: "0%",
    transform: "rotate(90deg)",
    top: "11%",
    width: "131px",
    borderRadius: "5px",
    background: 'black',
    height: '118px',
  },
  wunningamount: {
    padding: "10px",
    border: "2px solid #C9A553",
    position: "absolute",
    right: "-16%",
    transform: "rotate(90deg)",
    bottom: "42%",
    // width: "120px",
    borderRadius: "5px",
  },
  winnerlooserouter2: {
    padding: "2px",
    border: "2px solid #C9A553",
    position: "absolute",
    right: "14%",
    transform: "rotate(90deg)",
    top: "-5%",
    width: "54px",
    borderRadius: "5px",
    background: 'black',
  },
  winnerlooserouter3: {
    padding: "0px",
    border: "2px solid #C9A553",
    position: "absolute",
    right: "1.5%",
    transform: "rotate(90deg)",
    top: "32.5%",
    width: "50px",
    height: "47px",
    borderRadius: "5px",
    background: "black",


  },
  winnerLooserList: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    "&>p:nth-child(1)": {
      fontSize: "12px",
      fontWeight: "900",
      color: "yellow",
    },
    "&>p:nth-child(2)": {
      fontSize: "12px",
      fontWeight: "900",
      color: "#90ff90",
    },
    "&>p:nth-child(3)": { fontSize: "12px", fontWeight: "900", color: "red" },
  },
  winnerLooserList2: {
    width: "100%",
    "&>p": {
      fontSize: "12px",
      fontWeight: "600",
      color: "yellow",
      textAlign: "center",
    },
  },
  winnerLooserList4: {
    width: "100%",
    "&>p": {
      fontSize: "11px",
      fontWeight: "500",
      color: "white",
    },
  },
  winnerLooserList3: {
    width: "100%",
    "&>p": {
      fontSize: "35px",
      fontWeight: "600",
      color: "yellow",
      textAlign: "center",
    },
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

