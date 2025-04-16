import * as yup from 'yup';

export const PopUpSubjectsSchema = yup.object().shape({
  subjectName: yup
    .string()
    .required("اسم المادة مطلوب"),
    subjectCode: yup
    .string()
    .required("كود المادة مطلوب"),
    hoursNumber: yup
    .string()
    .required("عدد ساعات المادة مطلوب"),
    highestDegree: yup
    .string(),
    doctorId: yup
    .string(),
    sectionId: yup
    .string(),
    yearId: yup
    .string(),
})