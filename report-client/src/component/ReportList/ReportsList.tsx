import React from "react";
import Report from "../Post/Report";



function ReportList({ reports }: { reports: any[] }) {
  return (
    <div>
      <div className="courses-section">
        {
          reports.map((item) => <Report key={item._id} data={item} />)}
      
      </div>
      
    </div>
  );
}

export default ReportList;
