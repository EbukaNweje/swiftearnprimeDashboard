import "./Transactions.css";
import {FaDownload, FaArrowAltCircleUp} from "react-icons/fa";
import {LuArrowRightFromLine} from "react-icons/lu";
import {FaArrowUpLong, FaArrowDownLong} from "react-icons/fa6";
import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";

const Transactions = () => {
    const {id} = useParams()
    const userData = useSelector((state) => state.persisitedReducer.depositData)
    const userData2 = useSelector((state) => state.persisitedReducer.withdraw)
    console.log(userData2);
    const [transDeposit, setTransDeposit] = useState(true);
    const [transWithdrawal, setTransWithdrawal] = useState(false);
    const [transOthers, setTransOthers] = useState(false);
    const [allDeposit, setAllDeposit] = useState();
    const [allWithdrawal, setAllWithdrawal] = useState();
    const [others, setOthers] = useState();


    const handleShowDeposit = () => {
        setTransDeposit(true);
        setTransWithdrawal(false);
        setTransOthers(false);
    };
    
    const handleShowWithdrawal = () => {
        setTransDeposit(false);
        setTransWithdrawal(true);
        setTransOthers(false);
    };
    const handleShowOthers = () => {
        setTransDeposit(false);
        setTransWithdrawal(false);
        setTransOthers(true);
    };

    const url = `https://swiftearnprime-coral.vercel.app/api/getalldeposit/${id}`
    const url2 = `https://swiftearnprime-coral.vercel.app/api/getallwithdrawal/${id}`
    const url3 = `https://swiftearnprime-coral.vercel.app/api/getalltransactions/${id}`

    const getAllDeposit = ()=>{
           axios.get(url)
               .then(res=>{
               console.log(res)
               setAllDeposit(res.data.data)
           })
            .catch((err)=>{
               console.log(err)
           })
}
    const getAllWithdrawal = ()=>{
           axios.get(url2)
               .then(res=>{
               console.log(res.data.data)
               setAllWithdrawal(res.data.data)
           })
            .catch((err)=>{
               console.log(err)
           })
}
    const getAllOthers = ()=>{
           axios.get(url3)
               .then(res=>{
               console.log(res.data)
               setOthers(res.data)
           })
            .catch((err)=>{
               console.log(err)
           })
}

useEffect(()=>{
    getAllDeposit()
    getAllWithdrawal()
    getAllOthers()
},[])

    return (
        <>
            <div className="TransactionsBody">
                <h1>Transaction Record</h1>
                <div className="TransactionContent">
                    <div className="TransactionContentNav">
                        <div
                            className={`TransactionContentNav1 ${transDeposit === true ? 'active' : ' '}`}
                            onClick={handleShowDeposit}
                        >
                            <span>
                                <FaDownload />
                            </span>
                            <p>Deposit</p>
                        </div>
                        <div
                            className={`TransactionContentNav2 ${transWithdrawal === true ? 'active' : ' '}`}
                            onClick={handleShowWithdrawal}
                        >
                            <span>
                                <FaArrowAltCircleUp />
                            </span>
                            <p>Withdrawal</p>
                        </div>
                        <div
                            className={`TransactionContentNav3 ${transOthers === true ? 'active' : ' '}`}
                            onClick={handleShowOthers}
                        >
                            <span>
                                <LuArrowRightFromLine />
                            </span>
                            <p>Others</p>
                        </div>
                    </div>
                    <div className="TransactionContentResult">
                        {transDeposit ? (
                            <>
                                <div className="TransactionContentResultA">
                                    <div className="TransactionContentResultALeft">
                                        <p>
                                            Show{" "}
                                            <select>
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>{" "}
                                            entries
                                        </p>
                                    </div>
                                    <div className="TransactionContentResultARight">
                                        <p>Search</p>
                                        <input type="search" />
                                    </div>
                                </div>
                                <div className="TransactionContentResultB">
                                    <div className="TransactionContentResultB1">
                                        Amount
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB2">
                                        Paymant mode
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB3">
                                        Status
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB4">
                                        Date created
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                </div>
                                <div className="TransactionContentResultC">
                                    {
                                        allDeposit?.map((data, index)=>(
                                        <div className="TransactionContentResultCItem" key={index+1}>
                                        <div className="TransactionContentResultC1">
                                            ${data.amount}
                                        </div>
                                        <div className="TransactionContentResultC2">
                                            {data.coin}
                                        </div>
                                        <div className="TransactionContentResultC3">
                                            <span>{data.status}</span>
                                        </div>
                                        <div className="TransactionContentResultC4">
                                        {data.depositDate}
                                        </div>
                                    </div>
                                        ))
                                    }
                                    
                                </div>
                                <div className="TransactionContentResultD">
                                    <div className="TransactionContentResultDLeft">
                                        Showing 1 &nbsp; <p> to 1 &nbsp;</p> of
                                        1 entries
                                    </div>
                                    <div className="TransactionContentResultDRight">
                                        <div className="TransactionContentResultDRightBtn1">
                                            Previous
                                        </div>
                                        <div className="TransactionContentResultDRightBtn2">
                                            1
                                        </div>
                                        <div className="TransactionContentResultDRightBtn3">
                                            Next
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : transWithdrawal ? (
                            <>
                                <div className="TransactionContentResultA">
                                    <div className="TransactionContentResultALeft">
                                        <p>
                                            Show{" "}
                                            <select>
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>{" "}
                                            entries
                                        </p>
                                    </div>
                                    <div className="TransactionContentResultARight">
                                        <p>Search</p>
                                        <input type="search" />
                                    </div>
                                </div>
                                <div className="TransactionContentResultB">
                                    <div className="TransactionContentResultB1">
                                        Amount requested
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB2W">
                                       Wallet Address
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB3W">
                                        Recieving mode
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB4W">
                                        Status
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB4W">
                                        Date Created
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                </div>
                                <div className="TransactionContentResultC">
                                {
                                        allWithdrawal?.map((props)=>( 
                                    <div className="TransactionContentResultCItem">
                                        <div className="TransactionContentResultC1W">
                                            ${props.amount}
                                        </div>
                                        <div className="TransactionContentResultC2W">
                                            {props.walletAddress}
                                        </div>
                                        <div className="TransactionContentResultC2W">
                                            {props.coin}
                                        </div>
                                        <div className="TransactionContentResultC3W">
                                            <span 
                                            style={{
                                            background: props.status === "Approved"? "Green" : "red"
                                        }}
                                            > {props.status}</span>
                                        </div>
                                        <div className="TransactionContentResultC4W">
                                            {props.withdrawDate}
                                        </div>
                                    </div>
                                    ))
                            }
                                </div>
                                <div className="TransactionContentResultD">
                                    <div className="TransactionContentResultDLeft">
                                        Showing 1 &nbsp; <p> to 2 &nbsp;</p> of
                                        2 entries
                                    </div>
                                    <div className="TransactionContentResultDRight">
                                        <div className="TransactionContentResultDRightBtn1">
                                            Previous
                                        </div>
                                        <div className="TransactionContentResultDRightBtn2">
                                            1
                                        </div>
                                        <div className="TransactionContentResultDRightBtn3">
                                            Next
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : transOthers ? (
                            <>
                                <div className="TransactionContentResultA">
                                    <div className="TransactionContentResultALeft">
                                        <p>
                                            Show{" "}
                                            <select>
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>{" "}
                                            entries
                                        </p>
                                    </div>
                                    <div className="TransactionContentResultARight">
                                        <p>Search</p>
                                        <input type="search" />
                                    </div>
                                </div>
                                <div className="TransactionContentResultB">
                                    <div className="TransactionContentResultB1">
                                        Amount
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB2">
                                        Type
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB3">
                                        Status
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                    <div className="TransactionContentResultB4">
                                        Date created
                                        <span>
                                            <FaArrowUpLong />{" "}
                                            <FaArrowDownLong />
                                        </span>
                                    </div>
                                </div>

                                {
                                    others?.map((props) => (
                                        <div className="TransactionContentResultC">
                                        <div className="TransactionContentResultCItem">
                                            <div className="TransactionContentResultC1">
                                                ${props.amount}
                                            </div>
                                            <div className="TransactionContentResultC2">
                                                {props.transactionType}
                                            </div>
                                            <div className="TransactionContentResultC3">
                                                {props.status}
                                            </div>
                                            <div className="TransactionContentResultC4">
                                                {props.date}
                                            </div>
                                        </div>
                                    </div>
                                    ))
                                }
                               
                                <div className="TransactionContentResultD">
                                    <div className="TransactionContentResultDLeft">
                                        Showing 3 &nbsp; <p> to 3 &nbsp;</p> of
                                        4 entries
                                    </div>
                                    <div className="TransactionContentResultDRight">
                                        <div className="TransactionContentResultDRightBtn1">
                                            Previous
                                        </div>
                                        <div className="TransactionContentResultDRightBtn2">
                                            1
                                        </div>
                                        <div className="TransactionContentResultDRightBtn3">
                                            Next
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Transactions;
