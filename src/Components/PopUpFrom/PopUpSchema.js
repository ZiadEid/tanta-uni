import * as yup from 'yup';

export const PopUpSchema = yup.object().shape({
  yearName: yup
    .string()
    .required("اسم السنة مطلوب"),
    yearNumber: yup
    .string()
    .required("رقم السنة مطلوب"),
})