import axios from "axios"

const staticParam = {
  state_duration: "1",
  service_type: "SERVICE_01",
}
export async function userSignup(data: { [key: string]: string }) {
  //
  // console.log("-----userSignup api-----")
  // console.log("data send : ", data)

  try {
    const userSignupParam = { ...data, ...staticParam }
    const respData = await axios.post(process.env.NEXT_PUBLIC_USER_SIGNUP, userSignupParam)
    // console.log("respData", respData)
    return true
  } catch (e) {
    console.log("e", e)
    return false
  }
}

export async function businessSignup(data: { [key: string]: string }) {
  //
  // console.log("-----businessSignup api-----")
  // console.log("data send : ", data)

  try {
    const userSignupParam = { ...data, ...staticParam }
    const respData = await axios.post(
      process.env.NEXT_PUBLIC_BUSINESS_SIGNUP,
      userSignupParam,
    )
    // console.log("respData", respData)
    return true
  } catch (e: any) {
    const errorResp = e?.response?.data?.code

    // console.log("errorResp", errorResp)
    if (errorResp === 'ER_DUP_ENTRY') {
      return errorResp
    }
    return false
  }
}
