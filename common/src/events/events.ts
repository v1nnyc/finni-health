import { Subjects } from "./subjects";

export default interface Event {
  subject: Subjects;
  data: any;
}
