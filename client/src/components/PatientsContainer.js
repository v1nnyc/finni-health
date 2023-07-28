import { useEffect } from "react";
import Patient from "./Patient";
import Wrapper from "../assets/wrappers/PatientsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { getAllPatients } from "../features/allPatients/allPatientsSlice";
import PageBtnContainer from "./PageBtnContainer";
const PatientsContainer = () => {
  const {
    patients,
    isLoading,
    firstName,
    middleName,
    lastName,
    status,
    sort,
    totalPatients,
    numOfPages,
    page,
  } = useSelector((store) => store.allPatients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch, page, firstName, middleName, lastName, status, sort]);

  if (isLoading) {
    return <Loading center={true} />;
  }

  if (totalPatients === 0) {
    return (
      <Wrapper>
        <h2>No patients to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalPatients} patient{totalPatients > 1 && "s"} found
      </h5>
      <div className="patients">
        {patients.map((patient) => {
          return <Patient key={patient.id} {...patient} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default PatientsContainer;
