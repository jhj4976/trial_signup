"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { NICE_API_TYPE_ENUM } from "@/app/core/enum/niceApi.enum"

export default function success() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<{ [key: string]: string }>({})
  const [pageLife, setPageLife] = useState(true)
  const setQueryHandler = () => {
    const req_type = searchParams.get("req_type") as string
    let set_data = {}
    if (Number(req_type) === NICE_API_TYPE_ENUM.SIGNUP) {
      const name = searchParams.get("name") as string
      set_data = { name }
    }
    setQuery(set_data)
  }
  useEffect(() => {
    setQueryHandler()
  }, [])
  useEffect(() => {
    if (pageLife === false) {
      const message = JSON.stringify(query)
      window.opener.postMessage(message)
      window.close()
    }
  }, [pageLife])
  setTimeout(() => {
    setPageLife(false)
  }, 500)
  return (
    <div>
      {/* <p>Success Page</p>
      <p>Type : {query.type}</p>
      <p>name : {query.name}</p> */}
    </div>
  )
}
