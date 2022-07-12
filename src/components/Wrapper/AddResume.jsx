/*********************************************************************
 *        Copyright of Vertisystem Inc.
 *        2020
 *
 * Project: Applicant Tracking System
 *
 * Date           Branch/Issue Number    Developer       Description
 * -----------------------------------------------------------------
 * 26-Oct-2020    -    TEAMS_HTML_STABLE                  Esha Joshi      Created
 *
 *
 *
 *********************************************************************/
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./navBar.css";
import { postUploadResume } from "../../Services/homeServices";

const AddResume = ({ showState, setShowState, setState }) => {
  const [show, setShow] = useState(showState);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [validFiles, setValidFiles] = useState([]);
  const [uploadReumeData, setUploadResumedata] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addClass, setAddClass] = React.useState(false);
  const URL = window.location.pathname.split("/");
  const isSearchPage = URL[1] === "job-details";
  const urlString =
    isSearchPage && typeof URL.indexOf(2) !== "undefined" ? URL[2] : "";

  const handleClose = () => {
    setState();
    setShow(!show);
    setValidFiles([]);
    setSelectedFiles([]);
    setError(false);
    setShowState(false);
  };

  const dragOver = (e) => {
    e.preventDefault();
    setAddClass(true);
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setAddClass(false);
  };

  const fileDrop = (e) => {
    e.preventDefault();
    setAddClass(false);
    const files = e.dataTransfer.files;

    if (
      files.length &&
      Object.keys(validFiles).length <= 25 &&
      files[0].name.match(/(\.doc|\.docx|\.pdf|\.txt)$/)
    ) {
      setError(false);
      handleFiles(files);
    } else if (!files[0].name.match(/(\.doc|\.docx|\.pdf|\.txt)$/)) {
      setError(true);
      setErrorMessage("Invalid file format");
    } else {
      setError(true);
      setErrorMessage("25 Resume limit reached");
    }
  };

  // Future code to validate file type
  // const validateFile = (file) => {
  //   const validTypes = [
  //     "image/jpeg",
  //     "image/jpg",
  //     "image/png",
  //     "image/gif",
  //     "image/x-icon",
  //   ];
  //   if (validTypes.indexOf(file.type) === -1) {
  //     return false;
  //   }
  //   return true;
  // };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      setSelectedFiles((prevArray) => [...prevArray, files[i]]);
    }
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  React.useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
  };

  const uploadFiles = () => {
    postUploadResume(
      validFiles,
      urlString,
      setUploadResumedata,
      setUploading,
      setLoading,
      setErrorMessage,
      setError
    );
    setValidFiles([]);
    setSelectedFiles([]);
    setError(false);
    setUploadResumedata(null);
    // setShow(false);
  };

  const fileInputRef = React.useRef();

  const fileInputClicked = (e) => {
    fileInputRef.current.click();
  };
  const filesSelected = () => {
    if (
      fileInputRef.current.files.length &&
      fileInputRef.current.files.length <= 25
    ) {
      handleFiles(fileInputRef.current.files);
      setError(false);
    } else {
      setError(true);
      setErrorMessage("25 Resume limit reached");
    }
  };
  const SUPPORTED_FORMATS = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/pdf",
    "text/plain",
  ];

  return (
    <>
      <Modal
        show={showState}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-50w"
      >
        <Modal.Header className="message-popup-custom text-white add-resume-modal-size">
          <Modal.Title>Upload Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body className="font px-4">
          {!validFiles.length && uploadReumeData && (
            <span style={{ color: "green", fontSize: "15px" }}>
              {uploadReumeData}
            </span>
          )}
          <div className="text-primary">
            <small>Max 25 resumes can be uploaded</small>
          </div>
          {error && <span style={{ color: "red" }}>{errorMessage}</span>}
          <div className="addresume-scroll">
            <div
              className={`border-customs text-center my-4 py-2 mr-4 ${
                addClass ? "is-dragover" : ""
              }`}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
              onClick={fileInputClicked}
            >
              <div className="">
                Drop files here or&nbsp;<u className="text-primary">Browse</u>
              </div>
              <input
                ref={fileInputRef}
                className="file-input"
                type="file"
                multiple
                accept={SUPPORTED_FORMATS}
                onChange={filesSelected}
              />
            </div>

            {loading ? (
              <div className="text-center add-resume-spinner-background">
                <div
                  class="spinner-border spinner-border-sm text-primary"
                  role="status"
                ></div>
              </div>
            ) : (
              <React.Fragment>
                {validFiles &&
                  validFiles.map((data, i) => (
                    <div
                      className="d-flex justify-content-between border my-4 py-3 px-2 mr-4"
                      key={i}
                    >
                      <div className="text-success">{data.name}</div>
                      <div className="d-flex justify-content-end">
                        <div>({fileSize(data.size)})</div>
                        <div>
                          <span
                            className="text-dark"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeFile(data.name)}
                          >
                            <i class="fa fa-trash"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="pagination justify-content-start">
          <Button
            className="px-4 b-color-search-description text-white"
            onClick={() => uploadFiles()}
            disabled={!validFiles.length}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
          <Button variant="secondary" className="px-4" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddResume;
