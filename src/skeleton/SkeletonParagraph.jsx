import React from "react";
import Skeleton from "react-loading-skeleton";
import { Grid } from "@material-ui/core";
const SkeletonParagraph = () => {
  return (
    <section>
      <ul className="list">
        <Grid container style={{ marginBottom: "10px" }}>
          <Grid item sm={2}>
            <Skeleton width="100%" height={30} alignItems="right" />
          </Grid>
          <Grid item sm={8}></Grid>
          <Grid item sm={2}>
            <Skeleton width="100%" height={30} alignItems="right" />
          </Grid>
        </Grid>
        <div className="usercard">
          <div className="cards">
            <Skeleton height={20} count={4} /> <Skeleton height={100} />
          </div>
        </div>
        <div className="usercard">
          <div className="cards">
            <Skeleton count={4} /> <Skeleton height={100} />
          </div>
        </div>
        {/* {Array(9)
          .fill()
          .map((item, index) => (
            <li className="card" key={index}>
              <Skeleton height={180} />
              <h4 className="card-title">
                <Skeleton circle={true} height={50} width={50} />
                <Skeleton height={36} width={`80%`} />
              </h4>
              <p className="card-channel">
                <Skeleton width={`60%`} />
              </p>
              <div className="card-metrics">
                <Skeleton width={`90%`} />
              </div>
            </li>
          ))} */}
      </ul>
    </section>
  );
};
export default SkeletonParagraph;
