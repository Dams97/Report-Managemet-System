import "./Home.css"
import { Reports } from "../../component/Post/Reports"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { listReportAsync } from "../../app/redux/report/reportSlice"
import { useSearchParams } from "react-router-dom";


export function Home(){
  let [searchParams, setSearchParams] = useSearchParams();

  let search = searchParams.get("q");
  const { user } = useAppSelector((state) => state.user);
    const { reports } = useAppSelector((state) => state.report);
    const dispatch = useAppDispatch();
   

    useEffect(() => {
      dispatch(listReportAsync(search));
    }, [search, dispatch]);
    useEffect(() => {
      dispatch(listReportAsync());
    }, []);
    return(
        <>
 <Reports reports={reports}/>
         
        </>
    )
}