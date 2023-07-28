import { useDispatch, useSelector } from "react-redux";
import FormRowToggle from "./FormRowToggle";
import { handleChange } from "../features/patient/patientSlice";

const DynamicFieldForm = ({
  fieldKey,
  label,
  inputType = "text",
  hideSingleToggle = false,
}) => {
  const fieldArray = useSelector((store) => store.patient[fieldKey]);
  const dispatch = useDispatch();

  const handleAddField = (e) => {
    e.preventDefault();
    const defaultValue = inputType === "number" ? 0 : "";
    dispatch(
      handleChange({ name: fieldKey, value: [...fieldArray, defaultValue] })
    );
  };

  const handleRemoveField = (e, indexToRemove) => {
    e.preventDefault();
    dispatch(
      handleChange({
        name: fieldKey,
        value: fieldArray.filter((_, index) => index !== indexToRemove),
      })
    );
  };

  const handleFieldChange = (e, index) => {
    dispatch(
      handleChange({
        name: fieldKey,
        value: fieldArray.map((value, arrayIndex) => {
          if (arrayIndex === index) {
            return e.target.value;
          }
          return value;
        }),
      })
    );
  };

  return (
    <form className="form">
      <div className="form-center" style={{ marginBottom: "1rem" }}>
        {fieldArray.map((fieldValue, index) => (
          <div className="form-row" key={index}>
            <FormRowToggle
              type={inputType}
              name={`${fieldKey}${index}`}
              labelText={`${label} ${index + 1}`}
              value={fieldValue}
              handleChange={(e) => handleFieldChange(e, index)}
              handleToggle={(e) => handleRemoveField(e, index)}
              showToggle={fieldArray.length > 1 || !hideSingleToggle}
            />
          </div>
        ))}
      </div>
      <button className="btn" onClick={handleAddField}>
        Add {label}
      </button>
    </form>
  );
};
export default DynamicFieldForm;
