import * as yup from 'yup';

export const PopUpDoctorsSchema = yup.object().shape({
  nationalId: yup
    .string()
    .length(14, 'لا يجب ان تقل او تزيد عن 14 رقم')
    .required("رقم البطاقة مطلوب"),
  name: yup
    .string()
    .required("اسم الدكتور مطلوب"),
  major: yup
    .string()
    .required("تخصص الدكتور مطلوب"),
  phoneNumber: yup
    .string()
    .required("رقم الهاتف مطلوب"),
  email: yup
    .string()
    .required("البريد الالكتروني مطلوب"),
})