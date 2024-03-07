import {IoMdArrowBack} from "react-icons/io";
import "./MyPlans.css";
import {useSelector} from "react-redux";
import {removeSinglePlan} from "../../Components/store/FeaturesSlice";
import {Modal} from "antd";
import {useState} from "react";
import {useDispatch} from "react-redux";

const DetailPlan = ({handleShowMyPlans}) => {
    const singlePlans = useSelector(
        (state) => state.persisitedReducer.singlePlan
    );
    console.log(singlePlans);
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const dispatch = useDispatch();
    console.log(handleShowMyPlans);

    const handleConfirmDelete = (item) => {
        dispatch(removeSinglePlan(item));
        setOpenModal(false);
        handleShowMyPlans();
        // window.location.reload();
    };

    return (
        <>
            <Modal
                title={`Delete ${singlePlans?.name} Plan`}
                open={openModal}
                onCancel={handleCloseModal}
                footer={null}
                closeIcon={true}
                maskClosable={false}
            >
                <div className="DeletePlanBody">
                    <p>Are You sure you want to delete this plan?</p>
                    <div className="DeletePlanBodyBtns">
                        <button style={{backgroundColor: "green"}}>No</button>
                        <button
                            style={{backgroundColor: "red"}}
                            onClick={() => handleConfirmDelete(singlePlans)}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="DetailPlanBody">
                <h1>{singlePlans?.name} Plan</h1>
                <div className="DetailPlanMain">
                    <div className="DetailPlanMainBackIcon">
                        <IoMdArrowBack className="IoMdArrowBack" onClick={()=>handleShowMyPlans()}/>
                    </div>
                    <h2 className="planBigTextInfo">
                        {singlePlans?.name} Plan - $1125 Daily for{" "}
                        {singlePlans?.duration} days
                    </h2>
                    <div className="DetailPlanMainTopBtns">
                        <button
                            className="DetailPlanMainTopBtns1"
                            style={{backgroundColor: "green"}}
                        >
                            Active
                        </button>
                        <button
                            className="DetailPlanMainTopBtns1"
                            style={{backgroundColor: "red"}}
                            onClick={() => setOpenModal(true)}
                        >
                            Cancel this plan
                        </button>
                    </div>
                    <div className="DetailPlanInfoDiv">
                        <h2 className="DetailPlanInfoDivH2">
                            Plan information
                        </h2>
                        <div className="DetailPlanInfoDivMain1">
                            <div className="DetailPlanInfoDivMain1DivA">
                                <h3>
                                    ${singlePlans?.currentInvAmt}.00{" "}
                                    <span>Invested amount</span>
                                </h3>
                                <h3>+</h3>
                                <h3>
                                    $0.00 <span>Profit earned</span>
                                </h3>
                            </div>
                            <div className="DetailPlanInfoDivMain1DivB">
                                <h3>
                                    ${singlePlans?.currentInvAmt}.00{" "}
                                    <span>Total return</span>
                                </h3>
                            </div>
                        </div>
                        <div className="DetailPlanInfoDivMain2">
                            <div className="DetailPlanInfoDivMain2A">
                                <p>Duration:</p>
                                <p>{singlePlans?.duration} days</p>
                            </div>
                            <div className="DetailPlanInfoDivMain2B">
                                <p>Start Date:</p>
                                <p>{singlePlans?.startDate}</p>
                            </div>
                            <div className="DetailPlanInfoDivMain2C">
                                <p>End Date:</p>
                                <p>{singlePlans?.endDate}</p>
                            </div>
                        </div>
                        <div className="DetailPlanInfoDivMain2">
                            <div className="DetailPlanInfoDivMain2A">
                                <p>Minimum Return:</p>
                                <p>{singlePlans?.minimumReturn}%</p>
                            </div>
                            <div className="DetailPlanInfoDivMain2B">
                                <p>Maximum Return:</p>
                                <p>{singlePlans?.maximumReturn}%</p>
                            </div>
                            <div className="DetailPlanInfoDivMain2C">
                                <p>ROI Interval</p>
                                <p>Daily</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailPlan;
