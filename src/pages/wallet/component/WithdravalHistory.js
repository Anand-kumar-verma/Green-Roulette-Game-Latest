import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import CustomCircularProgress from "../../../Shared/CustomCircularProgress";
import { zubgback, zubgbackgrad, zubgmid } from "../../../Shared/color";
import deposit from "../../../assets/images/user-guide.png";
import Layout from "../../../component/Layout/Layout";
import {
  withdrawlHistoryFunction
} from "../../../services/apicalling";

function WithdravalHistory() {
  const [filter ,setFilter] =React.useState("0")
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { isLoading, data } = useQuery(
    ["deposit_history"],
    () => withdrawlHistoryFunction(),
    {
      refetchOnMount: false,
      refetchOnReconnect: true,
    }
  );

  const res = 
  React.useMemo(()=>{
    return filter==="0"?data?.data?.data: data?.data?.data?.filter((i)=>i?.status===filter)
  },[filter,data?.data?.data])
  
  return (
    <Layout>
      <Container
        sx={{
          background: zubgback,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          mb: 5,
        }}
        className="no-scrollbar"
      >
        <CustomCircularProgress isLoading={isLoading} />
        <Box sx={style.header}>
          <Box component={NavLink} onClick={goBack}>
            <KeyboardArrowLeftOutlinedIcon />
          </Box>
          <Typography variant="body1" color="initial">
            Withdrawl history
          </Typography>
          <Box></Box>
        </Box>

        <Box>
          <Box
            sx={{
              padding: "10px",
              width: "95%",
              margin: "auto",
              background: zubgmid,
              borderRadius: "10px",
              mb: 5,
            }}
          >
           
         <Stack
          direction="row"
          sx={{
            mb: "10px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
           >
             <Stack direction="row" sx={{ alignItems: "center", mb: "20px" }}>
              <Box component="img" src={deposit} width={30}></Box>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontSize: "15px ", color: "white", ml: "10px" }}
              >
                Withdrawl history
              </Typography>
              </Stack>
            
            <select onChange={(e)=>setFilter(e.target.value)} className="mb-5 px-5 rounded">
            <option value={"0"}>All</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Approve"}>Approved </option>
            <option value={"Procesing"}>Proccesing</option>
            <option value={"Reject"}>Reject</option>
          </select>
         </Stack>
            
            {res?.map((i) => {
              return (
                <Box
                  sx={{
                    mb: 2,
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid white",
                    background: zubgback,
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      paddingBottom: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: "1px solid white",
                    }}
                  >
                    <Box>
                      <Button
                        sx={{
                          background: zubgmid,
                          color: "white",
                          textTransform: "capitalize",
                        }}
                      >
                        Withdrawl
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        sx={{ color: "green", textTransform: "capitalize" }}
                        className={`${i?.status
                            === "Approve"
                            ? "!text-green-500"
                            : "!text-red-500"
                          }`}
                      >
                        {i?.status === "Approve"?"Approved":i?.status}
                      </Button>
                      
                      <IconButton>
                        <ArrowForwardIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Box>
                  </Stack>
                  .
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Balance
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {i?.amount}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Date/Time
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {moment(i?.date)?.format("DD-MM-YYYY")}{" "}
                      {moment(i?.date)?.format("HH:mm:ss")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      mb: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&>p": { color: "white" },
                    }}
                  >
                    <Typography variant="body1" color="initial">
                      Status
                    </Typography>
                    <Typography variant="body1" color="initial">
                      {i?.status
                      }{" "}
                    </Typography>
                  </Stack>
                 
                 </Box>
              );
            })}
            {/* <Button sx={style.paytmbtntwo}>All history</Button> */}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default WithdravalHistory;

const style = {
  header: {
    padding: "15px 8px",
    background: zubgback,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > p": {
      fontSize: "20px",
      fontWeight: "600",
      textAlign: "center",
      color: "white",
    },
    "& > a > svg": {
      color: "white",
      fontSize: "35px",
    },
  },
  wthui: {
    textAlign: "center",
    width: "32%",
    minHeight: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>div>p": { color: "white" },
  },
  paymentlink: {
    width: "32%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    background: zubgmid,
    borderRadius: "10px",
    mb: "10px",
    "&>p": {
      color: "white",
      fontSize: "12px",
      fontWeight: "500",
      textAlign: "center",
      mt: "5px",
    },
  },
  paymentBoxOuter: {
    width: "95%",
    margin: "auto",
    my: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paytmbtn: {
    mb: 2,
    background: zubgback,
    color: "white !important",
    width: "31%",
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  paytmbtntwo: {
    borderRadius: "5px",
    textTransform: "capitalize",
    mb: 2,
    background: zubgbackgrad,
    color: "white !important",
    width: "100%",
    mt: 2,
    border: "1px solid white",
    padding: "10px",
    "&:hover": { background: zubgbackgrad, border: "1px solid transparent" },
  },
  rechargeinstext: {
    mb: "10px",
    alignItems: "center",
    justifyContent: "start",
    "&>p": { marginLeft: "10px", color: "white !important", fontSize: "14px" },
  },
};
