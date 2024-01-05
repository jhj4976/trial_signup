import axios from "axios"

// 작업 중
export async function businessVerification(
  businessNumber = "",
  businessStartDate = "",
  businessCEOName = "",
  businessName = "",
) {
  // input 필드 빈 값
  if (
    !businessNumber ||
    !businessStartDate ||
    !businessCEOName ||
    !businessName
  ) {
    return false
  } else {
    let data = {
      biz: [
        {
          b_no: businessNumber, // 사업자등록번호(필수)
          start_dt: businessStartDate.replaceAll(".", ""), // 개업일자(필수)
          p_nm: businessCEOName, // 대표자명(필수)
          b_nm: businessName, // 기업명
          p_nm2: "",
          b_sector: "",
          b_type: "",
          b_adr: "",
          corp_no: "",
        },
      ],
    }

    try {
      const respData = await axios.post(process.env.NEXT_PUBLIC_BUSINESS_VERIFICATION, data)
      if (respData?.data?.data?.result[0]?.valid_msg === '확인할 수 없습니다.') {
        return false
      } else {
        return true
      }
    } catch (e) {
      console.log("e : ", e)
      return false
    }
  }
}
