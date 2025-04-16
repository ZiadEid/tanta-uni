import * as yup from 'yup';

export const PopUpStudentsSchema = yup.object().shape({
  studentName: yup
    .string()
    .required("اسم الدكتور مطلوب"),
    studentMajor: yup
    .string()
    .required("تخصص الدكتور مطلوب"),
    yearId: yup
    .string()
    .required("السنة الدراسية مطلوبة"),
})