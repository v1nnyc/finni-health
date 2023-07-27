import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import {
  clearFilters,
  handleChange,
} from "../features/allPatients/allPatientsSlice";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const SearchContainer = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const { isLoading, status, sort, sortOptions } = useSelector(
    (store) => store.allPatients
  );

  const { statusOptions } = useSelector((store) => store.patient);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = (setter) => {
    let timeoutID;
    return (e) => {
      setter(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizedDebounceFirstName = useMemo(() => debounce(setFirstName), []);
  const optimizedDebounceMiddleName = useMemo(
    () => debounce(setMiddleName),
    []
  );
  const optimizedDebounceLastName = useMemo(() => debounce(setLastName), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFirstName("");
    setMiddleName("");
    setLastName("");
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search firstName */}
          <FormRow
            type="text"
            name="firstName"
            value={firstName}
            handleChange={optimizedDebounceFirstName}
          />
          {/* search middleName */}
          <FormRow
            type="text"
            name="middleName"
            value={middleName}
            handleChange={optimizedDebounceMiddleName}
          />
          {/* search lastName */}
          <FormRow
            type="text"
            name="lastName"
            value={lastName}
            handleChange={optimizedDebounceLastName}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="status"
            value={status}
            handleChange={handleSearch}
            list={["All", ...statusOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
