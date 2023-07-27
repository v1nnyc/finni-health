const FormRow = ({
  type,
  name,
  value,
  handleChange,
  handleToggle,
  showToggle,
  labelText,
}) => {
  let processedValue = value;

  if (type === "date" && value && typeof value === "string") {
    const dateObject = new Date(value);
    processedValue = dateObject.toISOString().split("T")[0];
  }

  return (
    <div className="form-row-toggle">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <div className="input-button-wrapper">
        <input
          id={name}
          type={type}
          name={name}
          value={processedValue}
          onChange={handleChange}
          className="form-input"
        />
        {showToggle && (
          <button
            className="btn btn-block delete-btn"
            onClick={(e) => handleToggle(e)}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default FormRow;
