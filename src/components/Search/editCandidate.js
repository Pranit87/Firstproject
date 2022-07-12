import React from "react";
import "./editCandidate.css";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import {
  getCandidateDetails,
  getSkillsOptions,
  postCandidateDetails,
  getDropDownOptions,
} from "../../Services/dropdownServices";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Notification } from "../Common/Notification/Notification";
import * as Yup from "yup";
import { useUsers } from "../../Services/usersService";
import AccessDenied from "../Common/AccessDenied/AccessDenied";
import AsyncSelect from "react-select/async";

const EditCandidate = (props) => {
  const { id } = props.match.params;
  const [profileLoading, setProfileLoading] = React.useState(false);
  const [resumeURL, setResumeURL] = React.useState(null);
  const [options, setOptions] = React.useState(null);
  const [, setLoading] = React.useState(false);
  const [profileInitialValue, setProfileInitialValue] = React.useState({
    resumeId: "",
    name: "",
    email: "",
    location: "",
    zipcode: "",
    city: "",
    state: "",
    mobile: "",
    visa: "",
    rate: "",
    experienceYears: "",
    experienceMonths: "",
    uploadResume: [],
    skills: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [option, setOption] = React.useState([]);
  const [queries, setQueries] = React.useState(null);
  const [notify, setNotify] = React.useState({
    show: false,
    description: "",
    type: "",
  });
  const { currentUser } = useUsers();
  const { permissions } = currentUser;

  React.useEffect(() => {
    getSkillsOptions(queries, setOption, setIsLoading);
  }, [queries]);

  React.useEffect(() => {
    getDropDownOptions(setOptions, setLoading);
  }, [setOptions]);

  React.useEffect(() => {
    getCandidateDetails(
      id,
      setProfileInitialValue,
      profileInitialValue,
      setProfileLoading,
      setResumeURL
    );
  }, [id]);

  const filterColors = (inputValue, dropdownKey) => {
    return (
      options &&
      options[dropdownKey].filter((i) =>
        i.value.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  const promiseOptions = (inputValue, dropdownKey) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue, dropdownKey));
      }, 1000);
    });

  const handleCancel = () => {
    if (window.history && window.history.length > 1) {
      window.history.go(-1);
    } else {
      window.close();
    }
  };

  const SUPPORTED_FORMATS = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/pdf",
    "text/plain",
  ];

  const FormValidations = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    location: Yup.string().required("Required"),
  });

  return (
    (Object.keys(permissions).length && !permissions.UPDATE_CANDIDATE && (
      <AccessDenied />
    )) || (
      <>
        <div className="font">
          <div className="my-4 mx-4 text-white h4">UPDATE RESUME</div>
          <div className="my-4 mx-4">
            {notify.show && <Notification {...notify} />}
          </div>
          <div className="bg-white my-4 mx-4 px-5 py-5 rounded ">
            {!profileLoading ? (
              <tr className="loadingSearchItem loaders">
                <td colSpan="6" className="text-center">
                  <div class="spinner-border text-dark" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : (
              <Formik
                initialValues={profileInitialValue}
                enableReinitialize={true}
                validationSchema={FormValidations}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  postCandidateDetails(values, setNotify, setSubmitting);
                }}
              >
                {(props) => {
                  const {
                    values,
                    handleSubmit,
                    handleReset,
                    handleChange,
                    errors,
                    touched,
                    isValid,
                    dirty,
                    isSubmitting,
                  } = props;
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg">
                          <label htmlFor="select-type" className="required">
                            Full Name
                          </label>
                          {touched.name && errors.name && (
                            <div style={{ color: "red" }}>{errors.name}</div>
                          )}
                          <input
                            type="text"
                            id="name"
                            value={values.name}
                            onChange={handleChange}
                            className="form-control form-control-custom"
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type" className="required">
                            Email
                          </label>
                          {touched.email && errors.email && (
                            <div style={{ color: "red" }}>{errors.email}</div>
                          )}
                          <input
                            type="text"
                            id="email"
                            onChange={handleChange}
                            value={values.email}
                            className="form-control form-control-custom"
                            readOnly
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type" className="required">
                            Location
                          </label>
                          {touched.location && errors.location && (
                            <div style={{ color: "red" }}>
                              {errors.location}
                            </div>
                          )}
                          <input
                            type="text"
                            id="location"
                            onChange={handleChange}
                            value={values.location}
                            className="form-control form-control-custom"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg">
                          <label htmlFor="select-type">Zip Code</label>
                          <input
                            type="text"
                            id="zipcode"
                            onChange={handleChange}
                            value={values.zipcode}
                            className="form-control form-control-custom"
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type">City</label>
                          <AsyncSelect
                            escapeClearsValue
                            isClearable
                            cacheOptions
                            placeholder="Select City"
                            loadOptions={(e) => promiseOptions(e, "cities")}
                            value={
                              options &&
                              options["cities"] &&
                              options["cities"].filter(
                                ({ value }) => value === values.city || ""
                              )
                            }
                            onChange={(e) => {
                              console.log("city", e);
                              props.setFieldValue(
                                "city",
                                e && e.value ? e.value : "Null"
                              );
                            }}
                            getOptionLabel={({ value }) => value}
                            getOptionValue={({ value }) => value}
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type">State</label>
                          <AsyncSelect
                            escapeClearsValue
                            isClearable
                            cacheOptions
                            placeholder="Select State"
                            defaultOptions
                            loadOptions={(e) => promiseOptions(e, "states")}
                            value={
                              options &&
                              options["states"] &&
                              options["states"].filter(
                                ({ value }) => value === values.state || ""
                              )
                            }
                            onChange={(e) => {
                              console.log("state", e);
                              props.setFieldValue(
                                "state",
                                e && e.value ? e.value : "Null"
                              );
                            }}
                            getOptionLabel={({ value }) => value}
                            getOptionValue={({ value }) => value}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg">
                          <label htmlFor="select-type">Mobile</label>
                          <input
                            type="number"
                            id="mobile"
                            onChange={handleChange}
                            value={values.mobile}
                            className="form-control form-control-custom"
                          />
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type">Visa</label>
                          <select
                            name="select-type"
                            id="visa"
                            className="form-control form-control-custom"
                            value={values.visa || ""}
                            onChange={(e) => {
                              const targets = e.target.value;
                              props.setFieldValue("visa", targets);
                            }}
                          >
                            <option value="None">None</option>
                            <option value="H-1B">H-1B</option>
                            <option value="O-1">O-1</option>
                            <option value="L-1">L-1</option>
                            <option value="E-1">E-1</option>
                            <option value="TN">TN</option>
                            <option value="US Citizen">US Citizen</option>
                            <option value="Green Card">Green Card</option>
                            <option value="EAD">EAD</option>
                            <option value="Immigrant Visa">
                              Immigrant Visa
                            </option>
                            <option value="Extraordinary Ability">
                              Extraordinary Ability
                            </option>
                            <option value="Multinational Executive">
                              Multinational Executive
                            </option>
                            <option value="Advance Degree">
                              Advance Degree
                            </option>
                          </select>
                        </div>
                        <div className="col-lg">
                          <label htmlFor="select-type">Rate</label>
                          <input
                            type="number"
                            id="rate"
                            onChange={handleChange}
                            value={values.rate}
                            className="form-control form-control-custom"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <label htmlFor="select-type">Experience</label>
                          <div className="row">
                            <div className="col-md-6 experience-row">
                              <input
                                type="text"
                                id="experienceYears"
                                onChange={(event) => {
                                  props.setFieldValue(
                                    "experienceYears",
                                    /^-?[0-9]\d{0,1}$/.test(event.target.value)
                                      ? event.target.value
                                      : ""
                                  );
                                }}
                                value={values.experienceYears}
                                className="form-control form-control-custom"
                                style={{ zIndex: 1 }}
                              />
                              <label
                                htmlFor="select-type"
                                className="form-control experience-input form-control-custom"
                              >
                                Year(s)
                              </label>
                            </div>
                            <div className="col-md-6 experience-row">
                              <input
                                type="text"
                                id="experienceMonths"
                                onChange={(event) => {
                                  props.setFieldValue(
                                    "experienceMonths",
                                    /^-?[0-9]\d{0,1}$/.test(
                                      event.target.value
                                    ) &&
                                      parseInt(event.target.value) <= 12 &&
                                      parseInt(event.target.value) >= 0
                                      ? event.target.value
                                      : ""
                                  );
                                }}
                                value={values.experienceMonths}
                                className="form-control form-control-custom"
                                style={{ zIndex: 1 }}
                              />
                              <label
                                htmlFor="select-type"
                                className="form-control experience-input form-control-custom"
                              >
                                Month(s)
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="select-type">
                            Updated Resume&nbsp; (
                            <a
                              href={`${resumeURL}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                            )
                          </label>
                          {touched.uploadResume && errors.uploadResume && (
                            <div style={{ color: "red" }}>
                              {errors.uploadResume}
                            </div>
                          )}
                          <input
                            id="uploadResume"
                            style={{ marginTop: "5px", overflow: "hidden" }}
                            name="uploadResume"
                            type="file"
                            accept={SUPPORTED_FORMATS}
                            onChange={(event) => {
                              props.setFieldValue(
                                "uploadResume",
                                event.currentTarget.files[0]
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg">
                          <label htmlFor="select-type">Skills</label>
                          <AsyncTypeahead
                            id="async-example"
                            multiple
                            isLoading={isLoading}
                            labelKey="skills"
                            onSearch={(e) => {
                              setIsLoading(true);
                              setQueries(e);
                            }}
                            options={option}
                            onChange={(e) => props.setFieldValue("skills", e)}
                            placeholder="Skills..."
                            selected={values.skills}
                            renderMenuItemChildren={(option, props) => (
                              <>
                                <span>{option}</span>
                              </>
                            )}
                          />
                        </div>
                      </div>
                      <hr className="hr" />

                      <div className="pagination justify-content-end">
                        <button
                          type="submit"
                          className="px-4 py-2 btn btn-primary mt-2 mr-3"
                          disabled={isSubmitting || !dirty || !isValid}
                        >
                          {isSubmitting ? "Updating..." : "Update"}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-4 btn btn-secondary mt-2 mr-3"
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default EditCandidate;
