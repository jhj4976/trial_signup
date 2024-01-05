import axios from "axios"
import requests from "../core/api/requests"

const staticParam = {
  state_duration: "1",
  service_type: "SERVICE_01",
}
export async function userSignup(data: { [key: string]: string }) {
  //
  console.log("-----userSignup api-----")
  console.log("data send : ", data)

  try {
    const userSignupParam = { ...data, ...staticParam }
    const respData = await axios.post(requests.fetchUserSignup, userSignupParam)
    console.log("respData", respData)
    return true
  } catch (e) {
    console.log("e", e)
    return false
  }
}

export async function businessSignup(data: { [key: string]: string }) {
  //
  console.log("-----businessSignup api-----")
  console.log("data send : ", data)

  try {
    const userSignupParam = { ...data, ...staticParam }
    const respData = await axios.post(
      requests.fetchBusinessSignup,
      userSignupParam,
    )
    console.log("respData", respData)
    return true
  } catch (e) {
    console.log("e", e)
    return false
  }
}
