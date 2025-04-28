import * as yup from 'yup';

export const PopUpStudentsSchema = yup.object().shape({
  nationalId: yup
    .string()
    .length(14, 'لا يجب ان تقل او تزيد عن 14 رقم')
    .required("رقم البطاقة مطلوب"),
  name: yup
    .string()
    .required("اسم الطالب مطلوب"),
  gender: yup
    .string()
    .required("جنس الطالب مطلوب"),
  universityId: yup
    .string()
    .required("كود الجامعة مطلوب"),
  phoneNumber: yup
    .string()
    .required("رقم الهاتف مطلوب"),
  email: yup
    .string()
    .required("البريد الالكتروني مطلوب"),
  yearId: yup
    .string()
    .required(""),
})