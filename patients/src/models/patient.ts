import mongoose from "mongoose";
// import { updateIfCurrentPlugin } from "mongoose-update-if-current";

enum PatientStatus {
  inquiry = "Inquiry",
  onboarding = "Onboarding",
  active = "Active",
  churned = "Churned",
}

//parameters required to make Patient model
interface PatientAttrs {
  providerId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  status: PatientStatus;
  addresses: string[];
}

// interface that describes the properties
// that a Patient document has
interface PatientDoc extends mongoose.Document {
  providerId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  status: PatientStatus;
  addresses: string[];
}

// interface that describes the properties
// that a Patient model has
interface PatientModel extends mongoose.Model<PatientDoc> {
  build(attrs: PatientAttrs): PatientDoc;
}

const patientSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PatientStatus),
      default: PatientStatus.active,
    },
    addresses: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// patientSchema.plugin(updateIfCurrentPlugin);

// to allow typescript to enforce attribute checking
// when creating new instance of Patient, bc no type checking
// in new Patient(attrs)
patientSchema.statics.build = (attrs: PatientAttrs) => {
  return new Patient(attrs);
};

const Patient = mongoose.model<PatientDoc, PatientModel>(
  "Patient",
  patientSchema
);

export { Patient, PatientStatus };
