import * as yup from 'yup';

export const PopUpDoctorsSchema = yup.object().shape({
  doctorName: yup
    .string()
    .required("اسم الدكتور مطلوب"),
    doctorMajor: yup
    .string()
    .required("تخصص الدكتور مطلوب"),
})