// import { NavLink } from "react-router-dom";
// import "./MyPlans.css";

// const MyPlans = ({myplans, homechange, data}) => {
//     console.log(data);
//     return (
//         <>
//             <div className="MyPlansBody">
//                 <h1>My Investment plans (All)</h1>
//                 <div className="MyPlansContent">
//                  {
//                     data?.accountBalance >=1 ?
//                     <div className="MyPlansContentWrap">
//                     <p>
//                         Your Investment plan is on.{" "}
//                     </p>
//                     {/* <button onClick={()=> {homechange(false); myplans(true)}}>Buy a plan</button> */}
//                 </div>: <div className="MyPlansContentWrap">
//                     <p>
//                         You do not have an investment plan at the moment or
//                         no value match your query.{" "}
//                     </p>
//                     <button onClick={()=> {homechange(false); myplans(true)}}>Buy a plan</button>
//                 </div>
//                  }
//                 </div>
//             </div>
//         </>
//     );
// };

// export default MyPlans;

// import {NavLink} from "react-router-dom";
import {FaArrowRight, FaChevronRight} from "react-icons/fa6";
import "./MyPlans.css";
import {useSelector} from "react-redux";
import {clearPlans, getSinglePlan} from "../../Components/store/FeaturesSlice";
import {useDispatch} from "react-redux";

const MyPlans = ({myplans, homechange, handleShowDetailPlan}) => {
    const allPlans = useSelector((state) => state.persisitedReducer.plans);

    console.log(allPlans);
    const dispatch = useDispatch();

    const handleViewMoreSinglePlan = (item) => {
        dispatch(getSinglePlan(item));
        handleShowDetailPlan();
    };
    return (
        <>
            <div className="MyPlansBody">
                <h1>My Investment plans (All)</h1>

                <div className="MyPlansContent">
                    {/* <div className="MyPlansContentWrap">
                        <p>Your Investment plan is on. </p>
                    </div> */}
                    <div className="MyPlansContentWrap">
                        {allPlans.length === 0 ? (
                            <>
                                <p>
                                    You do not have an investment plan at the
                                    moment or no value match your query.{" "}
                                </p>
                                <button
                                    className="MyPlansContentWrapBtn"
                                    onClick={() => {
                                        homechange(false);
                                        myplans(true);
                                    }}
                                >
                                    Buy a plan
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="MyPlansActiveDiv">
                                    {allPlans.map((item, index) => (
                                        <div
                                            className="MyPlansActiveDivItem1"
                                            key={index}
                                        >
                                            <div className="MyPlansActiveDivItem1A">
                                                <p>{item?.name}</p>
                                                <p>
                                                    Amount - $
                                                    {item?.currentInvAmt}
                                                </p>
                                            </div>
                                            <div className="MyPlansActiveDivItem1B">
                                                <p>
                                                    {item?.startDate}
                                                    <FaArrowRight className="FaArrowRight" />
                                                </p>
                                                <p>Start Date</p>
                                            </div>
                                            <div className="MyPlansActiveDivItem1C">
                                                <p>{item?.endDate}</p>
                                                <p>End Date</p>
                                            </div>
                                            <div className="MyPlansActiveDivItem1D">
                                                <button>Active</button>
                                                <p>Status</p>
                                            </div>
                                            <div className="MyPlansActiveDivItem1E">
                                                <FaChevronRight
                                                    className="FaChevronRight"
                                                    onClick={() =>
                                                        handleViewMoreSinglePlan(
                                                            item
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPlans;
