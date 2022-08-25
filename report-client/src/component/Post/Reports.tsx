
import Layout from '../../Layout/Layout';
import { Report } from './Report';
import "./report.css";

export function Reports({ reports }:any) {

	return (
		<Layout >  
		<div className='reports' id=''>
			{reports.map((p:any)=>(
				<Report report={p}/>
			))}
			          
          
			{/* {reportsDivs} */}
		</div>
		</Layout >  
	);
}