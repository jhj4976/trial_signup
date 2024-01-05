/* ----- 유효성 검사 - 정규식 사용 ----- */
// 이메일
const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
// 비밀번호(8~20자 영문자, 숫자, 특수문자)
const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
// 날짜
const dateRegex = /^\d{4}.\d{2}.\d{2}$/

export function validationCheck(type: string, value: string) {
  // type을 분기로 유효성 검사
  switch (type) {
    case "email":
      return emailReg.test(value)
    case "password":
      return passwordReg.test(value)
    case "date":
      return dateRegex.test(value)
    default:
      return
  }
}
