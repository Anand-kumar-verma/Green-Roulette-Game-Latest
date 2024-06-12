import toast from "react-hot-toast";
import win_cap from "../assets/images/pwin.png";
import axios from "axios";
import { endpoint } from "../../services/urls";

export const red_array = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
];
export const black_array = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];

export const addWinCap = (id) => {
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
};

export const spinFunction = (id) => {
  const angle =
    String(id) === "20"
      ? "9"
      : String(id) === "14"
      ? "19"
      : String(id) === "31"
      ? "28"
      : String(id) === "9"
      ? "39"
      : String(id) === "22"
      ? "49"
      : String(id) === "18"
      ? "59"
      : String(id) === "29"
      ? "69"
      : String(id) === "7"
      ? "78"
      : String(id) === "28"
      ? "88"
      : String(id) === "12"
      ? "98"
      : String(id) === "35"
      ? "108"
      : String(id) === "3"
      ? "118"
      : String(id) === "26"
      ? "128"
      : String(id) === "0"
      ? "137"
      : String(id) === "32"
      ? "147"
      : String(id) === "15"
      ? "157"
      : String(id) === "19"
      ? "167"
      : String(id) === "4"
      ? "176"
      : String(id) === "21"
      ? "186"
      : String(id) === "2"
      ? "196"
      : String(id) === "25"
      ? "206"
      : String(id) === "17"
      ? "215"
      : String(id) === "34"
      ? "225"
      : String(id) === "6"
      ? "235"
      : String(id) === "27"
      ? "245"
      : String(id) === "13"
      ? "255"
      : String(id) === "36"
      ? "264"
      : String(id) === "11"
      ? "274"
      : String(id) === "30"
      ? "283"
      : String(id) === "8"
      ? "293"
      : String(id) === "23"
      ? "302"
      : String(id) === "10"
      ? "312"
      : String(id) === "5"
      ? "322"
      : String(id) === "24"
      ? "331"
      : String(id) === "16"
      ? "340"
      : String(id) === "33"
      ? "350"
      : "0";
  let element = document.getElementById(`${String(id)}_rotate`);

  element.classList.remove("hidden");

  const animation30 = document.createElement("style");
  animation30.type = "text/css";
  const keyframes30 = `
    @keyframes rotatemainnumber30 {
      0% { transform: rotate(${0 + Number(angle)}deg); }
      100% { transform: rotate(${360 + Number(angle)}deg); }
    }
  `;
  animation30.innerHTML = keyframes30;
  document.getElementsByTagName("head")[0].appendChild(animation30);

  element.style.animation = "rotatemainnumber30 2s reverse linear 2 forwards";

  const handleAnimationEnd = (event) => {
    if (event.animationName === "rotatemainnumber30") {
      element.style.animation = "";

      const animation20 = document.createElement("style");
      animation20.type = "text/css";
      const keyframes20 = `
        @keyframes rotatemainnumber20 {
          0% { transform: rotate(${0 + Number(angle)}deg); }
          100% { transform: rotate(${360 + Number(angle)}deg); }
        }
      `;
      animation20.innerHTML = keyframes20;
      document.getElementsByTagName("head")[0].appendChild(animation20);

      element.style.animation =
        "rotatemainnumber20 3s reverse linear 2 forwards";
    } else if (event.animationName === "rotatemainnumber20") {
      element.style.animation = "";
      // element.classList.add("hidden");

      element.removeEventListener("animationend", handleAnimationEnd);
    }
  };

  element.addEventListener("animationend", handleAnimationEnd);
};

export const confirmBet = async (
  setloding,
  rebet,
  setrebet,
  bet,
  setBet,
  user_id,
  wallet_amount_data,
  client
) => {
  const isAlreadyAppliedBet = localStorage.getItem("rollet_bet_placed");
  if (isAlreadyAppliedBet === "true")
    return toast(
      <span className="!px-4 !py-2 !bg-blue-700 !text-white !border-2 !border-red-700 !rotate-90 !rounded-full">
        Bid Already Placed.
      </span>
    );
  if (bet?.length <= 0)
    return toast(
      <span className="!px-4 !py-2 !bg-blue-700 !text-white !border-2 !border-red-700 !rotate-90 !rounded-full">
        Please Select Your Bet First.
      </span>
    );

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
  const total_amount_bet = updatedBet?.reduce(
    (a, b) => a + Number(b?.amount || 0),
    0
  );

  if (
    Number(total_amount_bet || 0) >
    Number(
      Number(wallet_amount_data?.wallet || 0) +
        Number(wallet_amount_data?.winning || 0)
    )
  ) {
    toast(
      <span className="!px-4 !py-2 !bg-blue-700 !text-white !border-2 !border-red-700 !rotate-90 !rounded-full">
        {`Your bet amount is Rs. ${
          Number(total_amount_bet || 0) -
          Number(wallet_amount_data?.wallet || 0)
        }, greater than your wallet amount.`}
      </span>
    );
    return;
  } else {
    setloding(true);
    try {
      const res = await axios.post(endpoint?.rollet?.bet_now, reqbody);
      toast(
        <span
          className="!bg-blue-800 !py-2 !px-4 !text-white !border-2 !border-red-800 !rounded-full"
          style={{ display: "inline-block", transform: "rotate(90deg)" }}
        >
          {res?.data?.msg}
        </span>
      );
      if (res?.data?.msg === "Bet Successfully") {
        setrebet(bet);
        localStorage.setItem("betlen", bet?.length || 0);
        // bet?.forEach((ele) => {
        //   let element = document.getElementById(`${ele?.id}`);
        //   let span = element.querySelector("span");
        //   if (span) {
        //     element.removeChild(span);
        //   }
        // });
        // setBet([]);
        localStorage.setItem("total_amount_bet", total_amount_bet);
        localStorage?.setItem("rollet_bet_placed", true);
        localStorage?.setItem("isPreBet", true);
      }
      // setTimeout(() => {
      //   client.refetchQueries("history_rollet");
      // }, 5000);

      client.refetchQueries("walletamount");
      // if (res?.data?.error === "200") removeBetFunctonAll();
    } catch (e) {
      console.log(e);
    }
  }
  setloding(false);
};

export const forPlaceCoin = (id, amount) => {
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
};

export const justDouble = (bet, setBet, wallet_amount_data) => {
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
  const total_bet_amont = newUpdateAmountArray?.reduce(
    (a, b) => a + Number(b?.amount),
    0
  );

  if (
    total_bet_amont >
    Number(
      Number(wallet_amount_data?.wallet || 0) +
        Number(wallet_amount_data?.winning || 0)
    )?.toFixed(2)
  )
    return toast(
      <span
        className="!bg-blue-800 !py-2 !px-4 !text-white !border-2 !border-red-800 !rounded-full"
        style={{ display: "inline-block", transform: "rotate(90deg)" }}
      >
        Insufficient Wallet Amount
      </span>
    );

  bet?.forEach((ele) => {
    let element = document.getElementById(`${ele?.id}`);
    let span = element.querySelector("span");
    if (span) {
      element.removeChild(span);
    }
  });

  newUpdateAmountArray?.forEach((ele) => {
    forPlaceCoin(ele?.id, ele?.amount);
  });
  setBet(newUpdateAmountArray);
};

export const rebetFuncton = (bet, rebet, setBet, wallet_amount_data) => {
  // setBet([]);
  bet?.forEach((ele) => {
    let element = document.getElementById(`${ele?.id}`);
    let span = element.querySelector("span");
    if (span) {
      element.removeChild(span);
    }
  });

  const total_bet_amont = rebet?.reduce((a, b) => a + Number(b?.amount), 0);

  if (
    total_bet_amont >
    Number(
      Number(wallet_amount_data?.wallet || 0) +
        Number(wallet_amount_data?.winning || 0)
    )?.toFixed(2)
  )
    return toast(
      <span
        className="!bg-blue-800 !py-2 !px-4 !text-white !border-2 !border-red-800 !rounded-full"
        style={{ display: "inline-block", transform: "rotate(90deg)" }}
      >
        Insufficient Wallet Amount
      </span>
    );

  rebet?.forEach((ele) => {
    forPlaceCoin(ele?.id, ele?.amount);
  });
  setBet(rebet);
  // setrebet
};
