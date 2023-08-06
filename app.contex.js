import base from "@/app/utils/Api";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});
export const AppContextProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(true);
  const [jobRefresh, setJobRefresh] = useState(true);
  const [carts, setCarts] = useState([]);
  const [cartTotal, setCartTotal]=useState(0)
  const [users, setUsers]=useState([])
  const [jobs, setJobs]=useState([])
  const [noti, setNoti]=useState([])
  const [review, setReview]=useState([])
  const [reviewRefresh, setReviewRefresh]=useState(false)
  const [openNoti, setOpenNoti]=useState(false)
  const [apply, setApply]=useState([])
  const [applyRefresh, setApplyRefresh]=useState(false)

  const context = {
    refresh,
    setRefresh,
    carts,
    setCarts,
    cartTotal,
    setCartTotal,
    users,
    setUsers,
    jobs,
    setJobs,
    jobRefresh,
    setJobRefresh,
    noti,
    setNoti,
    review,
    setReview,
    reviewRefresh,
    setReviewRefresh,
    openNoti,
    setOpenNoti,
    apply,
    setApply,
    applyRefresh,
    setApplyRefresh,
  };
  // useEffect(() => {
  //   const existData = JSON.parse(localStorage.getItem("eComCart"));
  //   setCarts(existData);
  // }, []);

  useEffect(() => {
    axios
      .get(`${base}/job`)
      .then((res) => {
        // console.log("res", res );
        setJobs(res.data.data.reverse() );
      })
      .catch((err) => {
        // console.log("err", err);
      });
  }, [jobRefresh]);

  useEffect(() => {
    axios
      .get(`${base}/apply`)
      .then((res) => {
        // console.log("res", res );
        setApply(res.data.data.reverse() );
      })
      .catch((err) => {
        // console.log("err", err);
      });
  }, [applyRefresh]);

  useEffect(() => {
    axios
      .get(`${base}/review`)
      .then((res) => {
        // console.log("res", res );
        setReview(res.data.data.reverse() );
      })
      .catch((err) => {
        // console.log("err", err);
      });
  }, [reviewRefresh]);

  useEffect(() => {
    axios
      .get(`${base}/notification`)
      .then((res) => {
        // console.log("notification ", res.data.data );
        setNoti(res.data.data.reverse()  );
      })
      .catch((err) => {
        // console.log("err", err);
      });
  }, [jobRefresh]);


	useEffect(()=>{
	  axios
	  .get(`${base}/user`)
	  .then(function (response) {

		setUsers(response.data.data.reverse())
	  })
	  .catch(function (error) {
		// ToastError(error?.message)
	  });
	},[refresh])


  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
