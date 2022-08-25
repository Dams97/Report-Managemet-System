import "./report.css";

import { Link } from "react-router-dom";


export function Report({report}:any){

  
  return (
    <Link to={`/report?id=${report.report_id}`} className="report">
      <div className="report__name">
        <div className="flx-report"> 
   <img className="my-avatar" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" />
        {/* <h4>{user?.name}</h4> */}
       
        </div>
      
      </div>
      <div className="report__title">
        <h1>{report.name}</h1>
      </div>
      <div className="report__content">
        <p>{report.content}</p>
      </div>
      <br />
      <div className="singlePage__tags">
     
          <p>{report.tags}</p>
        </div>
  
        <br />
      <div className="report-footer">   <div className="report__icons">
    
    
      </div>
    <div className="save-date">
       <span>4 min read</span>
      <span id="save">Edit</span>



     
    </div>
      </div>
   
    </Link>
  );
};

export default Report;
