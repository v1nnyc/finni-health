import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
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
  _id,
  position,
  company,
  patientLocation,
  patientType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PatientInfo icon={<FaLocationArrow />} text={patientLocation} />
          <PatientInfo icon={<FaCalendarAlt />} text={date} />
          <PatientInfo icon={<FaBriefcase />} text={patientType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-patient"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditPatient({
                    editPatientsId: _id,
                    position,
                    company,
                    patientLocation,
                    patientType,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deletePatient(_id))}
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
