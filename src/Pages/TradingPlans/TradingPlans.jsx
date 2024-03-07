import {FaHandHoldingDollar} from "react-icons/fa6";
import {FaAngleDown} from "react-icons/fa";
import "./TradingPlans.css";
import {IoWalletOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {addPlans} from "../../Components/store/FeaturesSlice";
import {useDispatch} from "react-redux";

const TradingPlans = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    console.log("namebe", selectedPackage);
    const [planPrice, setPlanPrice] = useState(0);
    // const [boxPrice, setBoxPrice] = useState(0);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.persisitedReducer.user);
    // const allPlans = useSelector((state) => state.persisitedReducer.plans);
    console.log("mal", userData);

    const handleShowSelect = () => {
        setShowSelect(!showSelect);
    };

    const [disabledBtn, setDisabledBtn] = useState(true);
    const [info, setInfo] = useState("");
    const [error, setError] = useState(false);
    const calculateEndDate = (startDate, duration) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);
        return endDate;
    };

    const formatDate = (date) => {
        const options = {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return new Date(date).toLocaleString("en-US", options);
    };

    const packageDatas = [
        {
            name: "Bronze Package",
            duration: 7,
            price: "9,999",
            minimumDeposit: "3,000",
            maximunDeposit: "9,999",
            minimumReturn: "325",
            maximumReturn: "325",
            packageId:
                "BRONZE" + Math.floor(1000000000 + Math.random() * 9000000000),
            profit: 0,
            selected: true,
            currentInvAmt: planPrice,
            startDate: formatDate(new Date()), // Start date is set to current date
            endDate: formatDate(calculateEndDate(new Date(), 7)), // Calculate end date dynamically
        },
        {
            name: "Silver Package",
            duration: 14,
            price: "29,999",
            minimumDeposit: "10,000",
            maximunDeposit: "29,999",
            minimumReturn: "325",
            maximumReturn: "325",
            packageId:
                "SILVER" + Math.floor(1000000000 + Math.random() * 9000000000),
            profit: 0,
            currentInvAmt: planPrice,
            selected: true,
            startDate: formatDate(new Date()), // Start date is set to current date
            endDate: formatDate(calculateEndDate(new Date(), 14)), // Calculate end date dynamically
        },
        {
            name: "Gold Plan",
            duration: 28,
            price: "1,000,000",
            minimumDeposit: "30,000",
            maximunDeposit: "99,999",
            minimumReturn: "325",
            maximumReturn: "325",
            packageId:
                "GOLD" + Math.floor(1000000000 + Math.random() * 9000000000),
            profit: 0,
            currentInvAmt: planPrice,
            selected: true,
            startDate: formatDate(new Date()),
            endDate: formatDate(calculateEndDate(new Date(), 28)),
        },
        {
            name: "Diamond Plan",
            duration: 168,
            price: "99,999",
            minimumDeposit: "100,000",
            maximunDeposit: "1,000,000",
            minimumReturn: "325",
            maximumReturn: "325",
            packageId:
                "DIAMOND" + Math.floor(1000000000 + Math.random() * 9000000000),
            profit: 0,
            currentInvAmt: planPrice,
            selected: true,
            startDate: formatDate(new Date()),
            endDate: formatDate(calculateEndDate(new Date(), 168)),
        },
    ];

    const validateSubmit = () => {
        if (planPrice > parseInt(userData.accountBalance)) {
            setDisabledBtn(true);
            setInfo("Insufficient fund");
            setError(true);
        } else {
            setDisabledBtn(false);
            setInfo("");
            setError(false);
        }
    };

    useEffect(() => {
        validateSubmit();
    }, []);

    const checkAmount = () => {
        if (!planPrice) {
            alert("Please input a deposit amount");
        } else if (!selectedPackage) {
            alert("Please select a package");
        } else if (planPrice > parseInt(userData.accountBalance)) {
            alert("Insufficent funds");
        } else {
            const planPriceNumber = parseFloat(planPrice.replace(/,/g, ""));
            const minDepositNumber = parseFloat(
                selectedPackage.minimumDeposit.replace(/,/g, "")
            );

            if (isNaN(planPriceNumber) || isNaN(minDepositNumber)) {
                alert("Invalid plan price or minimum deposit");
            } else if (planPriceNumber < minDepositNumber) {
                alert(
                    `${selectedPackage.name} minimum deposit should be at least $${minDepositNumber}`
                );
            } else {
                dispatch(addPlans(selectedPackage));
                console.log("Making Plan...");
                alert("Success.....");
                // window.location.reload();
            }
        }
    };

    const updatePlanPrice = (value) => {
        setPlanPrice(value);
        setSelectedPackage((prevPackage) => ({
            ...prevPackage,
            currentInvAmt: value,
        }));
    };

    return (
        <>
            <div className="TradingPlansBody">
                <h1>Get started with your investment</h1>
                <div className="TradingPlansContent">
                    <div className="TradingPlansLeft">
                        <div className="TradingPlansLeftBoxA">
                            <div
                                className="TradingPlansLeftBoxAMain"
                                onClick={handleShowSelect}
                            >
                                <h3>
                                    <span>
                                        <FaHandHoldingDollar />
                                    </span>
                                    {selectedPackage !== null
                                        ? `${selectedPackage.name}`
                                        : "SELECT PACKAGE"}
                                </h3>
                                <p
                                    className={`Angle ${
                                        showSelect ? "active" : ""
                                    }`}
                                >
                                    <FaAngleDown />
                                </p>
                            </div>
                            <div
                                className={`TradingPlansLeftBoxADrop ${
                                    showSelect ? "active" : ""
                                }`}
                            >
                                {packageDatas?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="TradingPlansLeftBoxADropItem"
                                        onClick={() => {
                                            handleShowSelect();
                                            setSelectedPackage(item);
                                        }}
                                    >
                                        <h3>
                                            <span>
                                                <FaHandHoldingDollar />
                                            </span>
                                            {item.name}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="TradingPlansLeftBoxC">
                            <p>Enter Your Amount</p>
                            <input
                                type="number"
                                min={0}
                                placeholder="0"
                                // value={planPrice}
                                onChange={(e) =>
                                    updatePlanPrice(e.target.value)
                                }
                            />
                        </div>
                        <div className="TradingPlansLeftBoxD">
                            <p>
                                Available balance{" "}
                                <span style={{color: "red"}}>
                                    {error ? `${info}` : null}
                                </span>
                            </p>
                            <div className="TradingPlansLeftBoxDDiv">
                                <div className="TradingPlansLeftBoxDItem">
                                    <IoWalletOutline className="IoWalletOutline" />
                                    <p>
                                        Account Balance{" "}
                                        <span>${userData?.accountBalance}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="TradingPlansRight">
                        <h3>Your Investment Details</h3>
                        <div className="TradingPlansRightBox">
                            {selectedPackage && (
                                <>
                                    <div className="TradingPlansRightBoxRow1">
                                        <div className="TradingPlansRightBoxRow1L">
                                            <h5>Name of plan</h5>
                                            <p>{selectedPackage.name}</p>
                                        </div>
                                        <div className="TradingPlansRightBoxRow1R">
                                            <h5>Plan Price</h5>
                                            <p>{selectedPackage.price}</p>
                                        </div>
                                    </div>
                                    {/* <div className="TradingPlansRightBoxRow1">
                                <div className="TradingPlansRightBoxRow1L">
                                    <h5>Duration</h5>
                                    <p>{selectedPackage.duration} Days</p>
                                </div>
                                <div className="TradingPlansRightBoxRow1R">
                                    <h5>Profit</h5>
                                    <p>{selectedPackage.profit}% Daily</p>
                                </div>
                            </div> */}
                                    <div className="TradingPlansRightBoxRow1">
                                        <div className="TradingPlansRightBoxRow1L">
                                            <h5>Minimum Deposit</h5>
                                            <p>
                                                $
                                                {selectedPackage.minimumDeposit}
                                            </p>
                                        </div>
                                        <div className="TradingPlansRightBoxRow1R">
                                            <h5>Maximum Deposit</h5>
                                            <p>
                                                $
                                                {selectedPackage.maximunDeposit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="TradingPlansRightBoxRow1">
                                        <div className="TradingPlansRightBoxRow1L">
                                            <h5>Minimum Return</h5>
                                            <p>
                                                {selectedPackage.minimumReturn}%
                                            </p>
                                        </div>
                                        <div className="TradingPlansRightBoxRow1R">
                                            <h5>Maximum Return</h5>
                                            <p>
                                                {selectedPackage.maximumReturn}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="TradingPlansRightBoxRow2">
                                        <div className="TradingPlansRightBoxRow1L">
                                            <h5>Duration</h5>
                                            <p>
                                                {selectedPackage.duration} Days
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="TradingPlansRightBoxPay">
                            <div className="TradingPlansRightBoxPayTop">
                                <p>
                                    Payment method: <span>Account Balance</span>
                                </p>
                            </div>
                            <div className="TradingPlansRightBoxPayDown">
                                <p>
                                    Amount to invest: <span>${planPrice}</span>
                                </p>
                                <button
                                    onClick={checkAmount}
                                    disabled={disabledBtn}
                                >
                                    Confirm & Invest
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TradingPlans;
