import { useDispatch, useSelector } from "react-redux";
import FormRowToggle from "./FormRowToggle";
import { handleChange } from "../features/patient/patientSlice";

const AddressForm = () => {
  const { addresses } = useSelector((store) => store.patient);
  const dispatch = useDispatch();

  const name = "addresses";

  const handleAddAddress = (e) => {
    e.preventDefault();
    dispatch(handleChange({ name, value: [...addresses, ""] }));
  };

  const handleRemoveAddress = (e, indexToRemove) => {
    e.preventDefault();
    dispatch(
      handleChange({
        name,
        value: addresses.filter((_, index) => index !== indexToRemove),
      })
    );
  };

  const handleAddressChange = (e, index) => {
    dispatch(
      handleChange({
        name,
        value: addresses.map((address, addressIndex) => {
          if (addressIndex === index) {
            return e.target.value;
          }
          return address;
        }),
      })
    );
  };

  return (
    <form className="form">
      <div className="form-center" style={{ marginBottom: "1rem" }}>
        {addresses.map((address, index) => (
          <div className="form-row" key={index}>
            <FormRowToggle
              type="text"
              name={`address${index}`}
              labelText={`Address ${index + 1}`}
              value={address}
              handleChange={(e) => handleAddressChange(e, index)}
              handleToggle={(e) => handleRemoveAddress(e, index)}
              showToggle={addresses.length > 1}
            />
          </div>
        ))}
      </div>
      <button className="btn" onClick={handleAddAddress}>
        Add address
      </button>
    </form>
  );
};
export default AddressForm;
