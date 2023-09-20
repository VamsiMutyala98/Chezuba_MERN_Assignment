import React, { FC, ReactElement } from "react";
import { ConnectedProps, connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
// eslint-disable-next-line import/no-cycle
import { setEmployeeDetails } from "../../store/actions/base.action";
import { IRootState } from "../../store/types/base.type";
import {
  deleteBranchDetails,
  deleteEmployeeDetails,
  setNewBranchDetails,
  setNewEmployeeDetails,
  updateBranchDetails,
  updateEmployeeDetails,
} from "../../store/slice/base.slice";
// eslint-disable-next-line import/no-cycle
import { EmployeeService } from "../../services/employee.service";
import { BranchService } from "../../services/branch.service";

const employeeService = new EmployeeService();
const branchService = new BranchService();

interface IProps extends PropsFromRedux {}

export interface INewEmployee {
  name: string;
  branchId: string;
  email: string;
  phoneNumber: string;
}

const Settings: FC<IProps> = ({ ...props }): ReactElement => {
  const [newEmployee, setNewEmployee] = React.useState<INewEmployee>({
    name: "",
    branchId: "",
    email: "",
    phoneNumber: "",
  });
  const [editId, setEditId] = React.useState<string>("");
  const [branchId, setBranchId] = React.useState<string>("");
  const [branchName, setBranchName] = React.useState<string>("");
  React.useEffect(() => {
    props.setEmployeeDetails();
  }, []);

  React.useEffect(() => {
    const employeeDetails = props.employeeDetails.find((eDetails) => eDetails._id === editId);
    if (editId && employeeDetails && Object.keys(employeeDetails)?.length) {
      setNewEmployee({
        name: employeeDetails?.name || "",
        branchId: employeeDetails?.branchDetails?._id || "",
        email: employeeDetails?.email || "",
        phoneNumber: employeeDetails?.phoneNumber || "",
      });
    }
  }, [editId]);

  React.useEffect(() => {
    const branchDetails = props.branchDetails.find((eDetails) => eDetails._id === branchId);
    console.log(branchDetails);
    if (branchId && branchDetails && Object.keys(branchDetails)?.length) {
      setBranchName(branchDetails?.name);
    }
  }, [branchId]);

  const addEmployee = async () => {
    if (Object.values(newEmployee).filter((_nEmp: string) => !!_nEmp)?.length === 4) {
      try {
        if (editId) {
          const response = await employeeService.updateEmployee(editId, newEmployee);
          if (response) {
            props.updateEmployeeDetails(response);
            toast.success("Employee Updated successfully", { theme: "colored" });
          }
        } else {
          const response = await employeeService.addEmployee(newEmployee);
          if (response) {
            props.setNewEmployeeDetails(response);
            toast.success("Employee Added successfully", { theme: "colored" });
          }
        }
      } catch (error) {
        toast.error("Error in adding employee details", { theme: "colored" });
      }
    } else {
      toast.warning("Please fill all fields", { theme: "colored" });
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const response = await employeeService.deleteEmployee(id);
      if (response) {
        props.deleteEmployeeDetails(id);
        toast.success("Employee deleted successfully", { theme: "colored" });
      }
    } catch (error) {
      toast.error("Error in deleting employee", { theme: "colored" });
    }
  };

  const addBranch = async () => {
    if (branchName) {
      try {
        if (branchId) {
          const response = await branchService.updateBranch(branchId, branchName);
          if (response) {
            props.updateBranchDetails(response);
            toast.success("Branch Updated successfully", { theme: "colored" });
          }
        } else {
          const response = await branchService.addBranch(branchName);
          if (response) {
            props.setNewBranchDetails(response);
            toast.success("Branch Added successfully", { theme: "colored" });
          }
        }
      } catch (error) {
        toast.error("Error in adding employee details", { theme: "colored" });
      }
    } else {
      toast.warning("Please enter branch name", { theme: "colored" });
    }
  };

  const deleteBranch = async (id: string) => {
    try {
      const response = await branchService.deleteBranch(id);
      if (response) {
        props.deleteBranchDetails(id);
        toast.success("Branch deleted successfully", { theme: "colored" });
      }
    } catch (error) {
      toast.error("Error in deleting employee", { theme: "colored" });
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <h1 className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">Employee Details</h1>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-end mb-3">
        <button type="button" className="checkout__home_button" data-bs-toggle="modal" data-bs-target="#exampleModal">
          +Add Employee
        </button>
      </div>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <table className="table table-bordered  shipped__table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Employee Name</th>
              <th>Branch Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props?.employeeDetails?.length ? (
              props.employeeDetails.map((_employee, i) => (
                <tr key={`${_employee._id}`}>
                  <td className="sNo">{i + 1}.</td>
                  <td>{_employee.name}</td>
                  <td> {_employee.branchDetails.name}</td>
                  <td className="shipped_table_actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="text-success"
                      style={{ cursor: "pointer" }}
                      title="Edit Employee"
                      onClick={() => setEditId(_employee._id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      title="Delete Employee"
                      onClick={() => deleteEmployee(_employee._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Employess in your company
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {editId ? "Edit" : "Add"} Employee
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-group row d-flex align-items-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 form-label fw-bold">Employee Name</div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-label">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee Name"
                    value={newEmployee.name}
                    onChange={($event) => setNewEmployee({ ...newEmployee, name: $event.target.value })}
                  />
                </div>
              </div>
              <div className="form-group row d-flex align-items-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 form-label fw-bold">Branch</div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-label">
                  <select
                    className="form-select"
                    value={newEmployee.branchId}
                    onChange={($event) => setNewEmployee({ ...newEmployee, branchId: $event.target.value })}
                  >
                    <option value="">Select Branch</option>
                    {props.branchDetails
                      .filter(
                        (_branch) =>
                          !props.employeeDetails.map((eDetails) => eDetails.branchDetails._id).includes(_branch._id),
                      )
                      .map((_branch) => (
                        <option value={_branch._id} key={_branch._id}>
                          {_branch.name}
                        </option>
                      ))}
                    {editId ? (
                      <option
                        value={
                          props.employeeDetails.filter((bDetails) => bDetails._id === editId)[0]?.branchDetails?._id
                        }
                      >
                        {props.employeeDetails.filter((bDetails) => bDetails._id === editId)[0]?.branchDetails?.name}
                      </option>
                    ) : null}
                  </select>
                </div>
              </div>
              <div className="form-group row d-flex align-items-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 form-label fw-bold">Employee Email</div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-label">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee Email"
                    value={newEmployee.email}
                    onChange={($event) => setNewEmployee({ ...newEmployee, email: $event.target.value })}
                  />
                </div>
              </div>
              <div className="form-group row d-flex align-items-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 form-label fw-bold">
                  Employee Phone Number
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-label">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee Phone Number"
                    value={newEmployee.phoneNumber}
                    onChange={($event) => setNewEmployee({ ...newEmployee, phoneNumber: $event.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="" onClick={() => addEmployee()}>
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">Branch Details</h1>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-end mb-3">
        <button type="button" className="checkout__home_button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          +Add Branch
        </button>
      </div>
      <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
        <table className="table table-bordered  shipped__table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Branch Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props?.branchDetails?.length ? (
              props.branchDetails.map((_branch, i) => (
                <tr key={`${_branch._id}`}>
                  <td className="sNo">{i + 1}.</td>
                  <td>{_branch.name}</td>
                  <td className="shipped_table_actions">
                    <FontAwesomeIcon
                      icon={faEdit}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      className="text-success"
                      style={{ cursor: "pointer" }}
                      title="Edit Branch"
                      onClick={() => setBranchId(_branch._id)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      title="Delete Branch"
                      onClick={() => deleteBranch(_branch._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>
                  No Branches in your company
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {branchId ? "Edit" : "Add"} Branch
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="form-group row d-flex align-items-center">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 form-label fw-bold">Branch Name</div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 form-label">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Branch Name"
                    value={branchName}
                    onChange={($event) => setBranchName($event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="" onClick={() => addBranch()}>
                {branchId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  employeeDetails: state.root.employeeDetails,
  branchDetails: state.root.branchDetails,
  userDetails: state.root.userDetails,
});

const mapDispatchToProps = {
  setEmployeeDetails,
  setNewEmployeeDetails,
  updateEmployeeDetails,
  deleteEmployeeDetails,
  setNewBranchDetails,
  updateBranchDetails,
  deleteBranchDetails,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Settings);
