import React from "react";
import { Carousel } from "react-bootstrap";
import { DisplayPerformer } from "../../Services/homeServices";

const PerformerOfTheWeek = (props) => {
  const [topPerformer, setTopPerformer] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    DisplayPerformer(setTopPerformer, setLoading);
  }, []);

  const AcronymName = (props) => {
    var regular_ex = /\b(\w)/g;
    var matches = props.str.match(regular_ex);
    var acronym = matches.join("");

    return (
      <div className={"p-container_acronym-performer"}>
        <div className={"p-name_acronym-performer top-shift"}>{acronym}</div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="mx-5 bg-light mt-5">
          <div class="inner">
            <div class="d-lg-flex justify-content-center">
              <div className="p-2 bd-highlight text-center bg-warning text-dark">
                <p id="performer" className="mt-4 ">
                  <img
                    src="/images/badge.png"
                    className="img-fluid ml-3"
                    alt="Responsive image"
                  />
                  Loading performers...
                </p>
              </div>
              <div className="arrow-left arrow-right flex-fill text-center">
                <div className="top-shift" />
                <div className="mt-5">
                  <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
              <div id="sub" className="p-2  text-center pt-3">
                <div className="d-lg-flex justify-content-between">
                  <p id="submission" className="mt-4 mx-4">
                    <strong>
                      <div
                        class="spinner-border spinner-border-sm text-secondary"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </strong>
                    <br />
                    Submission
                  </p>
                  <div className="vl-performer mt-3"></div>
                  <p id="interviewd" className="mt-4 mx-4">
                    <strong>
                      <div
                        class="spinner-border spinner-border-sm text-secondary"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </strong>
                    <br />
                    Interviews
                  </p>
                  <div className="vl-performer mt-3"></div>
                  <p id="offers" className="text-success mt-4 mx-4">
                    <strong>
                      <div
                        class="spinner-border spinner-border-sm text-secondary"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </strong>
                    <br />
                    Offers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {Array.isArray(topPerformer) && (
            <Carousel indicators={false}>
              {topPerformer.map(function (item, index) {
                return (
                  <Carousel.Item interval={10000} key={index}>
                    <div className="mx-5 bg-light mt-5">
                      <div className="inner ">
                        <div className="d-lg-flex justify-content-between">
                          <div className="p-2 bd-highlight text-center bg-warning text-dark">
                            <p id="performer" className="mt-4 ">
                              <img
                                src="/images/badge.png"
                                className="img-fluid ml-3"
                                alt="Responsive image"
                              />
                              {item ? item.title : ""}
                            </p>
                          </div>
                          <div className="arrow-left arrow-right flex-fill text-center">
                            {console.log(process.env)}
                            {item.avatar ? (
                              <img
                                id="img"
                                src={`${process.env.REACT_APP_S3_BUCKET_PROFILE}${item.avatar}`}
                                className="rounded-circle circle-img top-shift"
                                // alt="Responsive image"
                              />
                            ) : (
                              <AcronymName str={item.username} />
                            )}
                            <div className="mt-1">
                              {item ? item.username : ""}
                            </div>
                          </div>
                          <div id="sub" className="p-2  text-center pt-3">
                            <div className="d-lg-flex justify-content-between">
                              <p id="submission" className="mt-4 mx-4">
                                <strong>{item ? item.submitted : ""}</strong>
                                <br />
                                Submission
                              </p>
                              <div className="vl-performer mt-3"></div>
                              <p id="interviewd" className="mt-4 mx-4">
                                <strong>
                                  {item ? item.interviewCompleted : ""}
                                </strong>
                                <br />
                                Interviews
                              </p>
                              <div className="vl-performer mt-3"></div>
                              <p id="offers" className="text-success mt-4 mx-4">
                                <strong>
                                  {item ? item.offerAccepted : ""}
                                </strong>
                                <br />
                                Offers
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default PerformerOfTheWeek;
