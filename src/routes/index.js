import LayoutAviator from "../GamePage/Layout";
import MainPage from "../GamePage/MainPage";
import PlayGame from "../GamePage/PlayGame";
import CricketRegistrationForm from "../cricket/cricketauth/CricketRegistrationForm";
import CricketUserprofile from "../cricket/profile/CricketUserprofile";
import CricketDepositHistory from "../cricket/transactionHistory/CricketDepositHistory";
import CricketWithdrawlHistory from "../cricket/transactionHistory/CricketWithdrawlHistory";
import CricketWalletFundDepositForm from "../cricket/transacton/CricketWalletFundDepositForm";
import DepositCash from "../cricket/transacton/DepositCash";
import WithdrawlCash from "../cricket/transacton/WithdrawlCash";
import Test from "../pages/Test";
import Account from "../pages/account/Account";
import AddBankDetails from "../pages/account/Component/AddBankDetails";
import AddedBankDetailList from "../pages/account/Component/AddedBankDetailList";
import BatHistorys from "../pages/account/Component/BatHistory";
import Feedback from "../pages/account/Component/Feedback";
import GameNotification from "../pages/account/Component/GameNotification";
import Gamestaticks from "../pages/account/Component/Gamestaticks";
import Gift from "../pages/account/Component/Gift";
import Languages from "../pages/account/Component/Language";
import LoginPassword from "../pages/account/Component/LoginPassword";
import Mail from "../pages/account/Component/Mail";
import Notification from "../pages/account/Component/Notification";
import SettingCenter from "../pages/account/Component/SettingCenter";
import Activity from "../pages/activity/Activity";
import Register from "../pages/auth/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import FundRequest from "../pages/dashboard/FundRequest";
import Withdrawl from "../pages/dashboard/Withdrawl";
import MainPageOFIncome from "../pages/income/MainPageOFIncome";
import DailyCashBackBonus from "../pages/income/incomeSubSection/DailyCashBackBonus";
import DailySalaryBonus from "../pages/income/incomeSubSection/DailySalaryBonus";
import DepositBonus from "../pages/income/incomeSubSection/DepositBonus";
import ReferralBonus from "../pages/income/incomeSubSection/ReferralBonus";
import RegistrationBonus from "../pages/income/incomeSubSection/RegistrationBonus";
import SelfTradingBonus from "../pages/income/incomeSubSection/SelfTradingBonus";
import TeamRewardBonus from "../pages/income/incomeSubSection/TeamRewardBonus";
import TeamTradingBonus from "../pages/income/incomeSubSection/TeamTradingBonus";
import Promotion from "../pages/promotion/Promotion";
import CustomerLine from "../pages/promotion/component/CustomerLine";
import Invitaton from "../pages/promotion/component/Invitaton";
import MyCommission from "../pages/promotion/component/MyCommission";
import PromotionRule from "../pages/promotion/component/PromotionRule";
import RobateRetio from "../pages/promotion/component/RebateRatio";
import Subordinate from "../pages/promotion/component/Subordinate";
import TeamData from "../pages/promotion/component/TeamData";
import TeamReports from "../pages/promotion/component/TeamReport";
import TronScanPage from "../pages/trx/component/TronScanPage";
import Wallet from "../pages/wallet/Wallet";
import DepositeHistory from "../pages/wallet/component/DepositeHistory";
import QRScreen from "../pages/wallet/component/QRScreen";
import WalletRecharge from "../pages/wallet/component/WalletRecharge";
import WithdravalHistory from "../pages/wallet/component/WithdravalHistory";
import WinLossPopup from "../pages/win/component/WinOneMin/WinLossPopup";
import Home from "../rollet/pages/Home/Home";

export const routes = [
    {
        path: "/rollet",
        component: <Home />
    },
    {
        path: "/win-los",
        component: <WinLossPopup />
    },
    {
        path: "/account",
        component: <Account />
    },
    {
        path: "/withdravalHistory",
        component: <WithdravalHistory />
    },
    {
        path: "/Withdrawal",
        component: <Withdrawl />
    },
    {
        path: "/depositHistory",
        component: <DepositeHistory />
    },
    {
        path: "/wallet/Recharge",
        component: <WalletRecharge />
    },
    // {
    //     path: "/trx",
    //     component: <Trx />
    // },
    {
        path: "/wallet",
        component: <Wallet />
    },
    {
        path: "/bathistory",
        component: <BatHistorys />
    },
    {
        path: "/notification",
        component: <Notification />
    },
    {
        path: "/gift",
        component: <Gift />
    },
    {
        path: "/gamestaticks",
        component: <Gamestaticks />
    },
    {
        path: "/Language",
        component: <Languages />
    },
    {
        path: "/SettingCenter",
        component: <SettingCenter />
    },
    {
        path: "/SettingCenter/LoginPassword",
        component: <LoginPassword />
    },
    {
        path: "/SettingCenter/mail",
        component: <Mail />
    },
    {
        path: "/feedback",
        component: <Feedback />
    },
    {
        path: "/gameNotification",
        component: <GameNotification />
    },
    // {
    //     path:"/",
    //     component:<Login/>
    // },
    {
        path: "/test",
        component: <Test />
    },
    {
        path: "/register",
        component: <Register />
    },
    {
        path: "/dashboard",
        component: <Dashboard />
    },
    {
        path: "/activity",
        component: <Activity />
    },
    // {
    //     path: "/win",
    //     component: <Win />
    // },
    {
        path: "/promotion",
        component: <Promotion />
    },
    {
        path: "/promotion/Subordinate",
        component: <Subordinate />
    },
    {
        path: "/promotion/PromotionShare",
        component: <Invitaton />
    },
    {
        path: "/promotion/TeamReport/",
        component: <TeamReports />
    },
    {
        path: "/promotion/TeamReport/data",
        component: <TeamData />
    },
    {
        path: "/promotion/MyCommission/",
        component: <MyCommission />
    },
    {
        path: "/promotion/PromotionRule/",
        component: <PromotionRule />
    },
    {
        path: "/promotion/RebateRatio/",
        component: <RobateRetio />
    },
    {
        path: "/promotion/customerLine/",
        component: <CustomerLine />
    },
    {
        path: "/view_fund_request",
        component: <FundRequest />
    },
    {
        path: "/aviator-login",
        component: <MainPage />
    },
    {
        path: "/playgame",
        component: <LayoutAviator component={<PlayGame />} />
    },
    {
        path: "/account/:id",
        component: <LayoutAviator component={<Account />} />
    },
    {
        path: "/cricket/user-profile",
        component: <CricketUserprofile />
    },
    {
        path: "/cricket/deposit-history",
        component: <CricketDepositHistory />
    },
    {
        path: "/cricket/withdrawl-history",
        component: <CricketWithdrawlHistory />
    },
    {
        path: "/cricket/depositCash",
        component: <DepositCash />
    },
    {
        path: "/cricket/withdrawlCash",
        component: <WithdrawlCash />
    },
    {
        path: "/cricket/fund-deposit-request-form",
        component: <CricketWalletFundDepositForm />
    },
    {
        path: "/cricket/registration",
        component: <CricketRegistrationForm />
    },
    // {
    //     path: "/cricket",
    //     component: <Cricket />
    // },
    {
        path: "/account/income-main",
        component: <MainPageOFIncome />
    },
    {
        path: "/account/income-main/registration-bonus",
        component: <RegistrationBonus />
    },
    {
        path: "/account/income-main/deposit-bonus",
        component: <DepositBonus />
    },
    {
        path: "/account/income-main/referral-bonus",
        component: <ReferralBonus />
    },
    {
        path: "/account/income-main/daily-cash-back-bonus",
        component: <DailyCashBackBonus />
    },
    {
        path: "/account/income-main/daily-salary-bonus",
        component: <DailySalaryBonus />
    },
    {
        path: "/account/income-main/self-trading-bonus",
        component: <SelfTradingBonus />
    },
    {
        path: "/account/income-main/team-trading-bonus",
        component: <TeamTradingBonus />
    },
    {
        path: "/account/income-main/team-reward-bonus",
        component: <TeamRewardBonus />
    },
    {
        path: "/add-bank-details",
        component: <AddBankDetails />
    },
    {
        path: "/add-bank-details/pre-added-bank-details",
        component: <AddedBankDetailList />
    },
    {
        path: "/deposit/qr-screen",
        component: <QRScreen />
    },
    {
        path: "/trx/tron-scan",
        component: <TronScanPage />
    },
]