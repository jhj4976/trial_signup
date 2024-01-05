const serverUrl = process.env.NEXT_PUBLIC_NOW_HOST
const localApiUrl = {
  openApi: "http://127.0.0.1:4100/",
}
const devApiUrl = {
  openApi: process.env.NEXT_PUBLIC_DEV_API_URL,
}

const openApiUrl = devApiUrl.openApi

const env = {
  apiUrl: {
    openApi: openApiUrl,
  },
  openApi: {
    getPassEncryptedData: { method: "post", url: "api/nice/pass/encrypted" },
  },
  redirectUrl: {
    signUp: {
      success: `${serverUrl}success`,
      fail: `${serverUrl}fail`,
      req_type: 1,
    },
    findId: {
      success: `${serverUrl}success`,
      fail: `${serverUrl}fail`,
      req_type: 2,
    },
    findPwd: {
      success: `${serverUrl}success`,
      fail: `${serverUrl}fail`,
      req_type: 3,
    },
    updatePhone: {
      success: `${serverUrl}success`,
      fail: `${serverUrl}fail`,
      req_type: 4,
    },
  },
}

export default env
