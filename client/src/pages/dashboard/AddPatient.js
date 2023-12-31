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
import DynamicFieldForm from "../../components/DynamicFieldForm";
const AddPatient = () => {
  const {
    isLoading,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    status,
    statusOptions,
    addresses,
    additionalTextFields,
    additionalNumericalFields,
    isEditing,
    editPatientId,
  } = useSelector((store) => store.patient);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(
        editPatient({
          patientId: editPatientId,
          patient: {
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            status,
            addresses,
            additionalTextFields,
            additionalNumericalFields,
          },
        })
      );
      return;
    }

    dispatch(
      createPatient({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        status,
        addresses,
        additionalTextFields,
        additionalNumericalFields,
      })
    );
  };

  const handlePatientInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <h4>{isEditing ? "edit" : "add new"} patient</h4>
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
        </div>
      </form>
      <DynamicFieldForm
        fieldKey="addresses"
        label="Address"
        hideSingleToggle={true}
      />
      <DynamicFieldForm fieldKey="additionalTextFields" label="Text Field" />
      <DynamicFieldForm
        fieldKey="additionalNumericalFields"
        label="Numerical Field"
        inputType="number"
      />

      <div className="btn-container">
        {!isEditing && (
          <button
            type="button"
            className="btn btn-block clear-btn"
            onClick={() => dispatch(clearValues())}
          >
            Clear
          </button>
        )}
        <button
          type="submit"
          className="btn btn-block submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isEditing ? "Save" : "Submit"}
        </button>
      </div>
    </Wrapper>
  );
};
export default AddPatient;
