"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { NICE_API_TYPE_ENUM } from "@/app/core/enum/niceApi.enum"
// import { INiceApiSignUpResultQuery } from "../core/interface/INiceApi.interface"

export default function fail() {
  const pathname = usePathname()
  const [path, setPath] = useState<{ [key: string]: string }>({})
  const [pageLife, setPageLife] = useState(true)
  const setQueryHandler = () => {
    console.log("pathname", pathname)
    let set_data = { pathname }
    setPath(set_data)
  }
  useEffect(() => {
    setQueryHandler()
  }, [])
  useEffect(() => {
    if (pageLife === false) {
      const message = JSON.stringify(path)
      window.opener.postMessage(message)
      console.log("postMessage", message)
      window.close()
    }
  }, [pageLife])
  setTimeout(() => {
    setPageLife(false)
  }, 500)
  return (
    <div>
      {/* <p>test</p> */}
      {/* <p>Success Page</p>
      <p>Type : {path.type}</p>
      <p>name : {path.name}</p> */}
    </div>
  )
}
