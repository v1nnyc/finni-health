import NavLinks from "./NavLinks";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "./FormRow";
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
    <>
      {addresses.map((address, index) => (
        <div className="form-row" key={index}>
          <FormRow
            type="text"
            name={`address${index}`}
            labelText={`Address ${index + 1}`}
            value={address}
            handleChange={(e) => handleAddressChange(e, index)}
          />
          {addresses.length > 1 && (
            <button onClick={(e) => handleRemoveAddress(e, index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button onClick={handleAddAddress}>Add address</button>
    </>
  );
};
export default AddressForm;
