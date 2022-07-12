import React from "react";
import { getCategoryById, getUserById } from "../../Services/candidateServices";

function Vcare(props) {
  const { data } = props;
  const CategoryName = (props) => {
    const { data } = props;
    const [dataCategory, setDataCategory] = React.useState("");

    React.useEffect(() => {
      if (data) {
        getCategoryById(data, setDataCategory);
      }
    }, [data]);

    return (
      <span className="bg-primary text-white rounded small px-2 py-1">
        {dataCategory}
      </span>
    );
  };
  const UserName = (props) => {
    const { data } = props;
    const [datauser, setDataUser] = React.useState("");

    React.useEffect(() => {
      if (data) {
        getUserById(data, setDataUser);
      }
    }, [data]);

    return <span>By: {datauser}</span>;
  };
  if (data && !data.length)
    return (
      <div className="bg-white py-4 mx-4 text-center h6">
        No records available.
      </div>
    );
  return (
    data &&
    data.map((row) => (
      <div className="bg-white py-4 mx-4 font">
        <div className="h5">
          <span className="font-weight-bold">{row.client_name}:</span>
          <span>{row.job_title}</span>
        </div>
        <div className="vats-font-size">
          {row.vcare
            ? JSON.parse(row.vcare).map((row) => (
                <>
                  <div className="py-2">
                    <div className="font-weight-bold">{row.comment}</div>
                    <div className="d-lg-flex justify-content-between pb-2">
                      <div>
                        <CategoryName data={row.catogery} />
                        &nbsp;
                        <UserName data={row.user_id} />
                      </div>
                      <div className="text-secondary">{row.date_time}</div>
                    </div>
                  </div>
                </>
              ))
            : "N/A"}

          <div className="hr-remark py-1"></div>
        </div>
      </div>
    ))
  );
}

export default Vcare;
