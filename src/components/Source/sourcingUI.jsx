import React from "react";
import LayoutVats from "./layoutVats";
import LayoutCareerBuilder from "./layoutCareerBuilder";
import LayoutDice from "./layoutDice";
import LayoutMonster from "./layoutMonster";
import { Form } from "react-bootstrap";

import { getDropDownOptions } from "../../Services/dropdownServices";
import { getCommonResumeDownload } from "../../Services/sourceService";
import "./sourcingUI.css";
import { Formik } from "formik";
import { Modal, Button } from "react-bootstrap";

const VatsUI = (props) => {
  const { reqId, reqUniqueId } = props;
  const [options, setOptions] = React.useState([]);
  const [monsterFormData, setMonsterFormData] = React.useState(null);
  const [diceFormData, setDiceFormData] = React.useState(null);
  const [vatsFormData, setVatsFormData] = React.useState(null);
  const [careerFormData, setCareerFormData] = React.useState(null);
  const [vats, setVats] = React.useState([]);
  const [monster, setMonster] = React.useState([]);
  const [dice, setDice] = React.useState([]);
  const [career, setCareer] = React.useState([]);
  const [commonCount, setCommonCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [bulkDownloadLoader, setBulkDownloadLoader] = React.useState(false);
  const [getYATSFormError, setYATSFormError] = React.useState([]);
  const [getCareerFormError, setCareerFormError] = React.useState([]);
  const [getMonsterFormError, setMonsterFormError] = React.useState([]);
  const [getDiceFormError, setDiceFormError] = React.useState([]);
  window.addEventListener("beforeunload", (e) => {
    console.log("reload");
    Object.keys(localStorage).map((row) => {
      if (row === "token" || row === "profile") {
        // localStorage.removeItem(row);
        console.log("row", row);
      } else {
        localStorage.removeItem(row);
      }
    });
  });

  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  const ddOption = (name) => {
    return (options[name] && options[name].map((obj) => obj.value)) || [];
  };

  const onCommonChangeEvent = (e, name) => {
    setMonsterFormData({
      ...monsterFormData,
      [name === "commonText" ? "commonText" : "monsterPostalCode"]: e,
    });
    setDiceFormData({
      ...diceFormData,
      [name === "commonText" ? "commonText" : "diceLocation"]: e,
    });
    setVatsFormData({
      ...vatsFormData,
      [name === "postalCode" ? "databaseZipcode" : "text"]: e,
    });

    setCareerFormData({
      ...careerFormData,
      [name === "commonText" ? "searchString" : "careerbuilderZipcode"]: e,
    });
  };

  const handleCommonSearch = () => {
    setCommonCount(commonCount + 1);
  };

  const downloadMonster = (setLoading) => {
    setMonsterFormError([]);
    if (monster) {
      try {
        setBulkDownloadLoader(true);
        monster.map((row) => {
          var FormData = require("form-data");
          var data = new FormData();
          data.append("name", `${row.identity["name"]}`);
          data.append(
            "skills",
            `${
              row.relevance &&
              row.relevance.skills &&
              row.relevance.skills.map((skills) => skills.name)
            }`
          );
          data.append(
            "location",
            `${row.location["city"]}, ${row.location["state"]} ${row.location["postalCode"]}, ${row.location["country"]}`
          );
          data.append("exp", `${row.yearsOfExperience}`);
          data.append("zipcode", `${row.location["postalCode"]}`);
          data.append("education", row.degree ? `${row.degree}` : "NULL");
          data.append(
            "resume_job_title",
            row.relevance.experience.title.name
              ? `${row.relevance.experience.title.name}`
              : "NULL"
          );
          data.append(
            "resume_last_updated",
            row.identity["resumeModifiedDate"]
              ? `${row.identity["resumeModifiedDate"]}`
              : "NULL"
          );
          const string = monsterFormData ? monsterFormData.commonText : " ";

          const downloadedResumeID = async () => {
            const functioncall = await getCommonResumeDownload(
              row.identity["textResumeID"],
              data,
              setLoading
            );

            if (functioncall) {
              const dbOrAPi = row.isDownloaded ? 1 : 2;
              const resumeId = row.isDownloaded
                ? row.resumeId
                : functioncall.data.payload[0].ResumeId;
              return window.open(
                `/resume/${resumeId}/${
                  string.replaceAll("/", "%2F").replaceAll("#", "%23") || " "
                }/${reqId || 0}/monster/${reqUniqueId || 0}/${dbOrAPi}`,
                "_blank"
              );
            } else {
              setMonsterFormError((prevArray) => {
                if (prevArray.length === 0) {
                  document
                    .getElementById(
                      "monster-div-" + row.identity["textResumeID"]
                    )
                    .scrollIntoView();
                }
                return [...prevArray, row.identity["textResumeID"]];
              });
            }
          };
          downloadedResumeID();
        });
      } catch (err) {
        console.log(err.message);
        setBulkDownloadLoader(false);
      } finally {
        setTimeout(() => {
          setBulkDownloadLoader(false);
        }, monster.length * 2500 || 0);
      }
    }
  };

  const downloadVats = () => {
    if (vats) {
      try {
        setBulkDownloadLoader(true);
        vats.map((row) => {
          var FormData = require("form-data");
          var data = new FormData();
          data.append("name", `${row.name}`);
          data.append("skills", `"${row.skills}"`);
          data.append("location", `${row.location}`);
          data.append("exp", `${row.experience_years}`);
          data.append("zipcode", `${row.zipcode}`);
          const string = vatsFormData ? vatsFormData.text : " ";
          return window.open(
            `/resume/${row.id}/${
              string.replaceAll("/", "%2F").replaceAll("#", "%23") || " "
            }/${reqId || 0}/database/${reqUniqueId || 0}/1`,
            "_blank"
          );
        });
      } catch (err) {
        console.log(err);
        setBulkDownloadLoader(false);
      } finally {
        setTimeout(() => {
          setBulkDownloadLoader(false);
        }, 3000);
      }
    }
  };

  const downloadDice = (setLoading) => {
    if (dice) {
      try {
        setBulkDownloadLoader(true);
        dice.map((row) => {
          var FormData = require("form-data");
          var data = new FormData();
          data.append("name", `${row.fullName}`);
          data.append(
            "skills",
            `${row.skills && row.skills.map((item) => item.skill)}`
          );
          data.append("location", `${row.city}, ${row.region}, ${row.country}`);
          data.append("exp", `${row.yearsOfExperience}`);
          data.append(
            "education",
            row.education
              ? `${row.education.map((item) => item.degree)}`
              : "NULL"
          );
          data.append(
            "workAuthorization",
            row.workPermitDocuments ? `${row.workPermitDocuments}` : "NULL"
          );
          data.append(
            "resume_job_title",
            row.currentJobTitle ? `${row.currentJobTitle}` : "NULL"
          );
          data.append(
            "resume_last_activity",
            row.dateLastActive ? `${row.dateLastActive}` : "NULL"
          );
          data.append(
            "resume_last_updated",
            row.dateResumeLastUpdated ? `${row.dateResumeLastUpdated}` : "NULL"
          );
          // data.append("zipcode", "78251");
          const string = diceFormData ? diceFormData.commonText : " ";
          const downloadedResumeID = async () => {
            const functioncall = await getCommonResumeDownload(
              row.id,
              data,
              setLoading
            );

            if (functioncall) {
              const dbOrAPi = row.isDownloaded ? 1 : 2;
              const resumeId = row.isDownloaded
                ? row.resumeId
                : functioncall.data.payload[0].ResumeId;

              return window.open(
                `/resume/${resumeId}/${
                  string.replaceAll("/", "%2F").replaceAll("#", "%23") || " "
                }/${reqId || 0}/dice/${reqUniqueId || 0}/${dbOrAPi}`,
                "_blank"
              );
            } else {
              setDiceFormError((prevArray) => {
                if (prevArray.length === 0) {
                  document
                    .getElementById("dice-div-" + row.id)
                    .scrollIntoView();
                }
                return [...prevArray, row.id];
              });
            }
          };
          downloadedResumeID();
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setTimeout(() => {
          setBulkDownloadLoader(false);
        }, dice.length * 2500 || 0);
      }
    }
  };

  const downloadCareer = (setLoading) => {
    if (career) {
      try {
        setBulkDownloadLoader(true);
        career.map((row) => {
          var FormData = require("form-data");
          var data = new FormData();
          row.Name && data.append("name", `${row.Name}`);
          row.Keywords &&
            data.append(
              "skills",
              `${Object.keys(row.Keywords).map((skills) => skills)}`
            );
          row.Location &&
            data.append("location", `${row.Location["FreeLocation"]}`);
          row.YearsOfExperience &&
            data.append("exp", `${row.YearsOfExperience}`);
          row.Location && data.append("zipcode", `${row.Location["ZipCode"]}`);
          data.append(
            "education",
            row.Educations
              ? `${row.Educations.map((item) => item.DegreeLevel)}`
              : "NULL"
          );
          // data.append("workAuthorization", "US Citizen");
          data.append(
            "resume_job_title",
            row.JobTitle ? `${row.JobTitle}` : "NULL"
          );
          data.append(
            "resume_last_activity",
            row.Attributes["LastAccessed"]
              ? `${row.Attributes["LastAccessed"]}`
              : "NULL"
          );
          data.append(
            "resume_last_updated",
            row.ResumeLastModified ? `${row.ResumeLastModified}` : "NULL"
          );

          const string = careerFormData ? careerFormData.searchString : " ";

          const downloadedResumeID = async () => {
            const functioncall = await getCommonResumeDownload(
              row.EdgeID,
              data,
              setLoading
            );

            if (functioncall) {
              const dbOrAPi = row.isDownloaded ? 1 : 2;
              try {
                const resumeId = row.isDownloaded
                  ? row.resumeId
                  : functioncall.data.payload[0].resumeSid;

                return window.open(
                  `/resume/${resumeId}/${
                    string.replaceAll("/", "%2F").replaceAll("#", "%23") || " "
                  }/${reqId || 0}/career/${reqUniqueId || 0}/${dbOrAPi}`,
                  "_blank"
                );
              } catch (err) {
                console.log(err.message);
              }
            } else {
              setCareerFormError((prevArray) => {
                if (prevArray.length === 0) {
                  document
                    .getElementById("career-div-" + row.EdgeID)
                    .scrollIntoView();
                }
                return [...prevArray, row.EdgeID];
              });
            }
          };
          downloadedResumeID();
        });
      } catch (err) {
        console.log(err.message);
        setBulkDownloadLoader(false);
      } finally {
        setTimeout(() => {
          setBulkDownloadLoader(false);
        }, career.length * 2500 || 0);
      }
    }
  };
  return (
    <React.Fragment>
      <Notification
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        message={notificationMessage}
      />
      <Formik
        initialValues={{}}
        enableReinitialize={true}
        validationSchema={null}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          downloadMonster(setSubmitting);
          downloadVats(setSubmitting);
          downloadDice(setSubmitting);
          downloadCareer(setSubmitting);
          if (
            !vats.length &&
            !monster.length &&
            !dice.length &&
            !career.length
          ) {
            setSubmitting(false);
            setNotificationMessage(
              "Please select some candidates for Bulk Download."
            );
            setShowNotification(true);
          }
        }}
      >
        {(props) => {
          const { handleSubmit, isSubmitting } = props;
          const handleCheckedEvent = (name, value, state) => {
            if (name === "vats" && state) {
              vats.push(value);
            }
            if (name === "vats" && !state) {
              vats.pop(value);
            }
            if (name === "monster" && state) {
              monster.push(value);
            }
            if (name === "monster" && !state) {
              monster.pop(value);
            }
            if (name === "dice" && state) {
              dice.push(value);
            }
            if (name === "dice" && !state) {
              dice.pop(value);
            }
            if (name === "career" && state) {
              career.push(value);
            }
            if (name === "career" && !state) {
              career.pop(value);
            }
          };
          return (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Row className={"formRow"}>
                  <div className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
                    <div
                      className="d-lg-flex mb-3"
                      style={{ justifyContent: "space-between" }}
                    >
                      <span className={"common-search"}>
                        Common Search Filter
                      </span>
                      <div className="d-lg-flex">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg px-2 py-0 mr-2"
                        >
                          Submitted
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-lg px-2 py-0 mr-2"
                        >
                          Interviewed
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-lg px-3 py-0 mr-2"
                        >
                          Offer
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-lg px-2 py-0 mr-2"
                        >
                          Started
                        </button>
                      </div>
                    </div>
                    <div className="d-lg-flex" style={{ paddingTop: "10px" }}>
                      <Form.Control
                        className="col-lg-7 mr-3"
                        type="search"
                        name="commonText"
                        tabIndex={1}
                        value={monsterFormData && monsterFormData.commonText}
                        placeholder="Search by Text"
                        onChange={(e) =>
                          onCommonChangeEvent(
                            e.target.value ? e.target.value : "",
                            "commonText"
                          )
                        }
                        onKeyPress={(event) =>
                          event.key === "Enter" && event.preventDefault()
                        }
                      />
                      <input
                        className="col-lg-5 form-control mr-2"
                        type="search"
                        pattern="[0-9]*"
                        name="postalCode"
                        tabIndex={2}
                        value={
                          monsterFormData && monsterFormData.monsterPostalCode
                        }
                        placeholder="Postal Code"
                        onChange={(e) => {
                          return onCommonChangeEvent(
                            /^-?[0-9]+$/.test(e.target.value)
                              ? e.target.value
                              : "",
                            "postalCode"
                          );
                        }}
                        onKeyPress={(event) =>
                          event.key === "Enter" && event.preventDefault()
                        }
                      />
                    </div>
                  </div>
                </Form.Row>
                <Form.Row className={"formRow"}>
                  {loading ? (
                    <div className="bg-white my-4 mx-4 rounded shadow font">
                      <div className="ph-item">
                        <div className="ph-col-12">
                          <div className="ph-picture"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LayoutVats
                      ddOption={ddOption}
                      handleCheckedEvent={handleCheckedEvent}
                      vatsFormData={vatsFormData}
                      reqId={reqId}
                      commonCount={commonCount}
                      reqUniqueId={reqUniqueId}
                      bulkDownload={downloadVats}
                      setVatsFormData={setVatsFormData}
                      vats={vats}
                      bulkDownloadLoader={bulkDownloadLoader}
                      options={options}
                      setVats={setVats}
                    />
                  )}
                </Form.Row>
                <Form.Row className={"formRow"}>
                  {loading ? (
                    <div className="bg-white mx-4 rounded shadow font">
                      <div className="ph-item">
                        <div className="ph-col-12">
                          <div className="ph-picture"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LayoutCareerBuilder
                      ddOption={ddOption}
                      handleCheckedEvent={handleCheckedEvent}
                      careerFormData={careerFormData}
                      reqId={reqId}
                      commonCount={commonCount}
                      reqUniqueId={reqUniqueId}
                      options={options}
                      bulkDownload={downloadCareer}
                      setCareerFormData={setCareerFormData}
                      career={career}
                      bulkDownloadLoader={bulkDownloadLoader}
                      setCareer={setCareer}
                      rowCareerErrorArray={getCareerFormError}
                    />
                  )}
                </Form.Row>
                <Form.Row className={"formRow"}>
                  {loading ? (
                    <div className="bg-white my-4 mx-4 rounded shadow font">
                      <div class="ph-item">
                        <div class="ph-col-12">
                          <div className="ph-picture"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LayoutMonster
                      ddOption={ddOption}
                      handleCheckedEvent={handleCheckedEvent}
                      monsterFormData={monsterFormData}
                      reqId={reqId}
                      commonCount={commonCount}
                      options={options}
                      reqUniqueId={reqUniqueId}
                      bulkDownload={downloadMonster}
                      setMonsterFormData={setMonsterFormData}
                      monster={monster}
                      bulkDownloadLoader={bulkDownloadLoader}
                      setMonster={setMonster}
                      rowMonsterErrorArray={getMonsterFormError}
                    />
                  )}
                </Form.Row>
                <Form.Row className={"formRow"}>
                  {loading ? (
                    <div className="bg-white my-4 mx-4 rounded shadow font">
                      <div class="ph-item">
                        <div class="ph-col-12">
                          <div className="ph-picture"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LayoutDice
                      ddOption={ddOption}
                      handleCheckedEvent={handleCheckedEvent}
                      diceFormData={diceFormData}
                      reqId={reqId}
                      commonCount={commonCount}
                      options={options}
                      reqUniqueId={reqUniqueId}
                      bulkDownload={downloadDice}
                      setDiceFormData={setDiceFormData}
                      dice={dice}
                      bulkDownloadLoader={bulkDownloadLoader}
                      setDice={setDice}
                      rowDiceErrorArray={getDiceFormError}
                    />
                  )}
                </Form.Row>
              </Form.Group>
              <button
                type="button"
                tabIndex={3}
                className="btn btn-warning font-weight-bold px-4 mx-4"
                onClick={() => handleCommonSearch()}
                disabled={!vatsFormData || !vatsFormData.text}
              >
                Common Search
              </button>
              <button
                type="submit"
                tabIndex={-1}
                className="btn btn-warning font-weight-bold px-3"
                onSubmit={() => {
                  props.setFieldValue("commonText", null);
                  props.setFieldValue("location", null);
                }}
                disabled={isSubmitting || !vatsFormData || !vatsFormData.text}
              >
                {!isSubmitting ? "Bulk download" : "Bulk Downloading..."}
              </button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

const Notification = ({ showNotification, setShowNotification, message }) => (
  <Modal show={showNotification} onHide={() => setShowNotification(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Alert</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowNotification(false)}>
        Ok
      </Button>
    </Modal.Footer>
  </Modal>
);

export default VatsUI;
