import axios from "axios"

export const emailVerification = async (userType: string, email: string) => {
  try {
    const URL = userType === '0'
      ? process.env.NEXT_PUBLIC_USER_EMAIL_VERIFICATION
      : process.env.NEXT_PUBLIC_BUSINESS_EMAIL_VERIFICATION
    const resp = await axios.post(URL, { email })
    // console.log('resp', resp)
    return true
  } catch (e) {
    // console.log('emailVerification error: ', e)
    return false
  }
}