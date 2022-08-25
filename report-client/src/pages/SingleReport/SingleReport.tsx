
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Layout from "../../Layout/Layout";
import "./singlereport.css";

const SingleReport = (props: any) => {



    const { auth } = useAppSelector((state) => state.user);



  return (
      <Layout>
    <div className="singlePage">
      <div className="singlePage__left">
        <div className="singlePage__name">
          {/* <h4>Daad</h4> */}
          {/* <p>{post.id}</p> */}
        </div>
        <div className="singlePage__title">
          <h1>{props.report.name}</h1>
        </div>
        <div className="singlePage__description">
          <p>{props.report.content}</p>
        </div>
        <div className="singlePage__tags">
       {props.report.tags}
        </div>
      </div>
      <div className="singlePage__right">
        <div className="singlePage__right-user">
          <div>
            <p>Author: </p>
            <span>kk...</span>
          </div>
          <button>Follow</button>
          <div>
            <p>Work: </p>
            <span>kkk</span>
          </div>
        </div>
  
      </div>
    </div>
    </Layout>
  );
};

export default SingleReport;
