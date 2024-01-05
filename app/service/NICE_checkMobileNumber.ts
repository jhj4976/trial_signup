import axios from "axios"

export const NICE_checkMobileNumber = async (phone: string, user_type: string) => {
  try {
    const resp = await axios.post(process.env.NEXT_PUBLIC_NICE_MOBILE_VERIFICATION, {
      phone,
      user_type
    })
    // console.log('NICE_checkMobileNumber success : ', resp?.data?.data?.validation)
    return resp?.data?.data?.validation
  } catch (e) {
    // console.log('NICE_checkMobileNumber error : ', e)
    return false
  }
}