import * as Yup from "yup";

const updateProfilerValidationSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  address: Yup.string(),
});

export default updateProfilerValidationSchema;
