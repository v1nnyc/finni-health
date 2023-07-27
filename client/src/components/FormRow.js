const FormRow = ({ type, name, value, handleChange, labelText }) => {
  let processedValue = value;

  if (type === "date" && typeof value === "string") {
    const dateObject = new Date(value);
    processedValue = dateObject.toISOString().split("T")[0];
  }

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={processedValue}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
