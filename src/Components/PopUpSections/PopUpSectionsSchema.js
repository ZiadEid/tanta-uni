import * as yup from 'yup';

export const PopUpSectionsSchema = yup.object().shape({
  sectionName: yup
    .string()
    .required("اسم التخصص مطلوب"),
  sectionYear: yup
    .string()
    .required("سنة التخصص مطلوب"),
})