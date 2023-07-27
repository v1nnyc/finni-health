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
  const [localSearch, setLocalSearch] = useState("");

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allPatients);

  const { statusOptions } = useSelector((store) => store.patient);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="name"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["All", ...statusOptions]}
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
