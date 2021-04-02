import { LoginFormData } from "~/store/loginForm/slice";
import { RegistrationFormData } from "~/store/registrationForm/slice";


export function hasRemember (data: LoginFormData|RegistrationFormData) {
  return data.find(item => ~String(item?.name)?.indexOf('remember'))?.value
}
