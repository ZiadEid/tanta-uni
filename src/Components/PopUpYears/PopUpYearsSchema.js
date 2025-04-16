import * as yup from 'yup';

export const PopUpYearsSchema = yup.object().shape({
  yearName: yup
    .string()
    .required("اسم السنة مطلوب"),
})