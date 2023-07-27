// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import {
//   handleChange,
//   clearValues,
//   createJob,
//   editJob,
// } from '../../features/job/jobSlice';
import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
const AddPatient = () => {
  const statusOptions = ["Inquiry", "Onboarding", "Active", "Churned"];
  //   const {
  //     isLoading,
  //     position,
  //     company,
  //     jobLocation,
  //     jobType,
  //     jobTypeOptions,
  //     status,
  //     statusOptions,
  //     isEditing,
  //     editJobId,
  //   } = useSelector((store) => store.job);
  //   const { user } = useSelector((store) => store.user);
  //   const dispatch = useDispatch();
  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (!position || !company || !jobLocation) {
  //       toast.error('Please fill out all fields');
  //       return;
  //     }
  //     if (isEditing) {
  //       dispatch(
  //         editJob({
  //           jobId: editJobId,
  //           job: { position, company, jobLocation, jobType, status },
  //         })
  //       );
  //       return;
  //     }
  //     dispatch(createJob({ position, company, jobLocation, jobType, status }));
  //   };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // dispatch(handleChange({ name, value }));
  };

  //   useEffect(() => {
  //     if (!isEditing) {
  //       dispatch(
  //         handleChange({
  //           name: 'jobLocation',
  //           value: user.location,
  //         })
  //       );
  //     }
  //   }, []);

  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          {/* Names */}
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            value={"firstName"}
            // handleChange={handlePatientInput}
          />
          <FormRow
            type="text"
            name="middleName"
            labelText="Middle Name"
            value={"middleName"}
            // handleChange={handlePatientInput}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={"lastName"}
            // handleChange={handlePatientInput}
          />
          {/* Date of Birth */}
          <FormRow
            type="date"
            name="dateOfBirth"
            labelText="Date of Birth"
            value={"dateOfBirth"}
            // handleChange={handlePatientInput}
          />
          {/* Status */}
          <FormRowSelect
            name="status"
            labelText="Status"
            // value={status}
            // handleChange={handlePatientInput}
            list={statusOptions}
          />
          {/* Address */}
          <FormRow
            type="text"
            name="address"
            labelText="Address"
            value={"address"}
            // handleChange={handlePatientInput}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              //   onClick={handleClearValues}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              //   onClick={handleSubmit}
              //   disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddPatient;
