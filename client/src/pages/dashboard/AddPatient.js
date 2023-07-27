import { useSelector, useDispatch } from "react-redux";
// import { toast } from 'react-toastify';
import {
  handleChange,
  clearValues,
  editPatient,
  createPatient,
} from "../../features/patient/patientSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import { useEffect } from "react";
const AddPatient = () => {
  const {
    isLoading,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    status,
    statusOptions,
    address,
    isEditing,
    editPatientId,
  } = useSelector((store) => store.patient);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!position || !company || !jobLocation) {
    //   toast.error('Please fill out all fields');
    //   return;
    // }
    // if (isEditing) {
    //   dispatch(
    //     editPatient({
    //       patientId: editPatientId,
    //       patient: {
    //         firstName,
    //         middleName,
    //         lastName,
    //         dateOfBirth,
    //         status,
    //         address,
    //       },
    //     })
    //   );
    //   return;
    // }
    dispatch(
      createPatient({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        status,
        address,
      })
    );
  };

  const handlePatientInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      // dispatch(
      //   handleChange({
      //     name: 'jobLocation',
      //     value: user.location,
      //   })
      // );
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          {/* Names */}
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            value={firstName}
            handleChange={handlePatientInput}
          />
          <FormRow
            type="text"
            name="middleName"
            labelText="Middle Name"
            value={middleName}
            handleChange={handlePatientInput}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={lastName}
            handleChange={handlePatientInput}
          />
          {/* Date of Birth */}
          <FormRow
            type="date"
            name="dateOfBirth"
            labelText="Date of Birth"
            value={dateOfBirth}
            handleChange={handlePatientInput}
          />
          {/* Status */}
          <FormRowSelect
            name="status"
            labelText="Status"
            value={status}
            handleChange={handlePatientInput}
            list={statusOptions}
          />
          {/* Address */}
          <FormRow
            type="text"
            name="address"
            labelText="Address"
            value={address}
            handleChange={handlePatientInput}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
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
