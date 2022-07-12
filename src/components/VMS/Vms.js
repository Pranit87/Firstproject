import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import { Col, Form, FormControl, Row, Table, Modal } from "react-bootstrap";
import "./VmsStyles.css";
import { Button } from "react-bootstrap";
import AddForm from "./Addform";
import AddForm2 from "./AddformModal";

const VMS = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [show2, setShow2] = useState(false);

  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  return (
    <div>
      <Form.Group className="inner bg-white my-4 px-4 py-4 mx-4 rounded shadow font">
        <span className="VMS">VMS CREDENTIAL RECORDS</span>

        <Row className="my-3">
          <Col sm={3}>
            <FormControl
              type="text"
              id="Portal_name"
              name="Portal_name"
              placeholder="Portal Name"
            />
          </Col>
          <Col sm={3}>
            <FormControl
              type="text"
              id="All_accounts"
              name="All_accounts"
              placeholder="All Accounts"
            />
          </Col>

          <Col sm={3}>
            <FormControl
              type="text"
              id="All_accountmanagers"
              name="All_accountmanagers"
              placeholder="All Account Managers"
            />
          </Col>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              className="btn btn-primary btn-sm px-5 rounded-3 "
            >
              Save
            </Button>
            <Button
              variant="secondary"
              type="button"
              className="btn btn-secondary btn-sm px-5 ml-4 rounded-3 "
            >
              Cancel
            </Button>
          </div>
        </Row>
      </Form.Group>
      <div className=" bg-white  rounded shadow font  my-4 px-4 py-4 mx-4 ">
        <Table table-borderless hover>
          <thead className="job-table-head-bg-color">
            <tr className="text-white bg-dark ">
              <th>Portal</th>
              <th>Username Account manager</th>
              <th>Client Used At</th>
              <th>Renewal Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <td>
              PrideOne MorganStanley
              <tr className="text-primary text-lg">
                <a href="/">https://www.fieldglass.net/login.jsp</a>
              </tr>
              <tr className="text-secondary">
                <small>By: Valerie Schilling</small>
              </tr>
            </td>
            <td>
              MorganStanley@vertisystem.com
              <tr className="text-secondary">
                <small>Amy MacMillan</small>
              </tr>
            </td>
            <td>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary btn-sm rounded-3 "
              >
                Morgan Stanley
              </Button>
            </td>
            <td>july-19-2019</td>
            <td>
              <>
                <Col className="d-lg-flex">
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/empdetails`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              View Profile
                            </Tooltip>
                          }
                        >
                          <Icon.EyeFill size="16px" fill="#666666" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/VMS/Addform`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit</Tooltip>
                          }
                        >
                          <Icon.PencilFill
                            size="16px"
                            fill="#666666"
                            onClick={handleShow2}
                          />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill size="16px" fill="#D50A0A" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                </Col>
              </>
            </td>
          </tbody>
          <tbody>
            <td>
              Suezy
              <tr className="text-primary text-lg">
                <a href="/">https://vms.zerochaos.com/ZCW</a>
              </tr>
              <tr className="text-secondary">
                <small>By: Schilling</small>
              </tr>
            </td>
            <td>
              suez@vertisystem.com
              <tr className="text-secondary">
                <small>Troy Laja</small>
              </tr>
            </td>
            <td>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary btn-sm rounded-3 "
              >
                Suez
              </Button>
            </td>
            <td>july-19-2019</td>
            <td>
              <>
                <Col className="d-lg-flex">
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/empdetails`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              View Profile
                            </Tooltip>
                          }
                        >
                          <Icon.EyeFill size="16px" fill="#666666" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/VMS/Addform`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit</Tooltip>
                          }
                        >
                          <Icon.PencilFill
                            size="16px"
                            fill="#666666"
                            onClick={handleShow2}
                          />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill size="16px" fill="#D50A0A" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                </Col>
              </>
            </td>
          </tbody>
          <tbody>
            <td>
              Nutanix
              <tr className="text-primary">
                <a href="/">https://app.jobvite.com/login/login.html</a>
              </tr>
            </td>
            <td>
              nutanix@vertisystem.com
              <tr className="text-secondary">
                <small>Amy MacMillan</small>
              </tr>
            </td>
            <td>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary btn-sm rounded-3 "
              >
                Morgan Stanley
              </Button>
            </td>
            <td>july-19-2019</td>
            <td>
              <>
                <Col className="d-lg-flex">
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/empdetails`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              View Profile
                            </Tooltip>
                          }
                        >
                          <Icon.EyeFill size="16px" fill="#666666" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/VMS/Addform`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit</Tooltip>
                          }
                        >
                          <Icon.PencilFill
                            size="16px"
                            fill="#666666"
                            onClick={handleShow2}
                          />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill size="16px" fill="#D50A0A" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                </Col>
              </>
            </td>
          </tbody>
          <tbody>
            <td>
              PrideOne MorganStanley
              <tr className="text-primary text-lg">
                <a href="/">https://www.fieldglass.net/login.jsp</a>
              </tr>
              <tr className="text-secondary">
                <small>By:Valerie Schilling</small>
              </tr>
            </td>
            <td>
              MorganStanley@vertisystem.com
              <tr className="text-secondary">
                <small>Amith</small>
              </tr>
            </td>
            <td>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary btn-sm rounded-3 "
              >
                Morgan Stanley
              </Button>
            </td>
            <td>july-19-2019</td>
            <td>
              <>
                <Col className="d-lg-flex">
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/empdetails`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              View Profile
                            </Tooltip>
                          }
                        >
                          <Icon.EyeFill size="16px" fill="#666666" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/VMS/Addform`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit</Tooltip>
                          }
                        >
                          <Icon.PencilFill
                            size="16px"
                            fill="#666666"
                            onClick={handleShow2}
                          />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill size="16px" fill="#D50A0A" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                </Col>
              </>
            </td>
          </tbody>
          <tbody>
            <td>
              Suez
              <tr className="text-primary text-lg">
                <a href="/">https://vms.zerochaos.com/ZCW</a>
              </tr>
              <tr className="text-secondary">
                <small>By: Schilling</small>
              </tr>
            </td>
            <td>
              MorganStanley@vertisystem.com
              <tr className="text-secondary">
                <small>Amith </small>
              </tr>
            </td>
            <td>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary btn-sm rounded-3 "
              >
                Morgan Stanley
              </Button>
            </td>
            <td>july-19-2019</td>
            <td>
              <>
                <Col className="d-lg-flex">
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/empdetails`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              View Profile
                            </Tooltip>
                          }
                        >
                          <Icon.EyeFill size="16px" fill="#666666" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/VMS/Addform`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit</Tooltip>
                          }
                        >
                          <Icon.PencilFill
                            size="16px"
                            fill="#666666"
                            onClick={handleShow2}
                          />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill size="16px" fill="#D50A0A" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                </Col>
              </>
            </td>
          </tbody>
          <tbody>
            <td>
              Nutanix
              <tr className="text-primary">
                <a href="/">https://app.jobvite.com/login/login.html</a>
              </tr>
            </td>
            <td>
              nutanix@vertisystem.com
              <tr className="text-secondary">
                <small>Troy Laja </small>
              </tr>
            </td>
            <td>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary btn-sm rounded-3 "
              >
                Morgan Stanley
              </Button>
            </td>
            <td>july-19-2019</td>
            <td>
              <>
                <Col className="d-lg-flex">
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/<empdetails>`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              View Profile
                            </Tooltip>
                          }
                        >
                          <Icon.EyeFill size="16px" fill="#666666" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link to={`/VMS/Addform`}>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Edit</Tooltip>
                          }
                        >
                          <Icon.PencilFill
                            size="16px"
                            fill="#666666"
                            onClick={handleShow2}
                          />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                  <span className={"showOnHover"}>
                    <span
                      className="font font-weight-bold"
                      data-toggle="modal"
                      data-target="#addRemark"
                    >
                      <Link>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="button-tooltip-2">Delete</Tooltip>
                          }
                        >
                          <Icon.TrashFill size="16px" fill="#D50A0A" />
                        </OverlayTrigger>
                      </Link>
                    </span>
                  </span>
                </Col>
              </>
            </td>
          </tbody>
        </Table>
        <div className={`page pt-2 d-flex justify-content-end mr-4`}>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={4}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"activePagination"}
          />
        </div>
      </div>
      <Col className="text-right" mr={5}>
        <Button
          className="btn btn-warning btn-sm font-weight-bold px-3 mr-5 mb-3 mb-lg-0 text-right fs-3"
          variant="warning"
          type="button"
          onClick={handleShow}
        >
          Add Credential Record
        </Button>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD VMS CLIENT LOGINS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn btn-primary btn-sm px-5 rounded-3"
          >
            Save
          </Button>
          <Button
            variant="secondary"
            className="btn btn-primary btn-sm px-5 rounded-3"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT VMS CLIENT LOGINS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm2 />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="btn btn-primary btn-sm px-5 rounded-3"
          >
            Update
          </Button>
          <Button
            variant="secondary"
            className="btn btn-primary btn-sm px-5 rounded-3"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VMS;
