import { useContext, useEffect, useRef } from "react"
import Toast from "./Toast"
import { Context } from "../libs/Store"

export default function ToastContainer() {
  const [state] = useContext(Context)
  const scrollRef = useRef({})

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [state.toasts])

  return (
    <div className={`fixed bottom-6 left-0 right-0 flex flex-col gap-y-3 p-6 mx-auto max-w-md max-h-52 overflow-auto
      ${state.toasts?.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}>
      {state.toasts?.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
        />
      ))}

      <div ref={scrollRef} />
    </div>
  )
}