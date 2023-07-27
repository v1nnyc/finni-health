import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Patients";
import { useDispatch } from "react-redux";
import PatientInfo from "./PatientInfo";
import moment from "moment";
import {
  deletePatient,
  setEditPatient,
} from "../features/patient/patientSlice";
const Patients = ({
  id,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  status,
  addresses,
}) => {
  const dispatch = useDispatch();

  const date = moment.utc(dateOfBirth).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{firstName.charAt(0)}</div>
        <div className="info">
          <h5>
            {firstName} {middleName} {lastName}
          </h5>
          <p className={`status ${status}`}>{status}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PatientInfo icon={<FaCalendarAlt />} text={date} />
          {addresses.map((address, index) => (
            <PatientInfo
              key={index}
              icon={<FaLocationArrow />}
              text={address}
            />
          ))}
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-patient"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditPatient({
                    editPatientId: id,
                    firstName,
                    middleName,
                    lastName,
                    dateOfBirth,
                    status,
                    addresses,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deletePatient(id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Patients;
