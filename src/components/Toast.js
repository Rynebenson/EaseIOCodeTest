import { useCallback, useContext, useEffect } from "react"
import { Context } from "../libs/Store"
import { ACTION_TYPES } from "../libs/Reducer"

/**
 * @param {Object} props
 * @param {String} props.id
 * @param {JSX.Element} props.icon
 * @param {String} props.color
 * @param {String} props.message
 * @param {Number} props.timer
 * @returns {JSX}
 */
export default function Toast(props) {
  const [, dispatch] = useContext(Context)

  const hideToast = useCallback(() => {
    if(props.hideToast) {
      setTimeout(() => {
        dispatch({ type: ACTION_TYPES.REMOVE_TOAST, payload: props.id })
      }, 5000)
    }
  }, [props.hideToast, props.id, dispatch])

  useEffect(() => {
    hideToast()
  }, [hideToast])

  return (
    <div className="flex items-center py-3 px-4 w-full bg-white shadow-md shadow-[rgba(0, 0, 0, .06)] rounded-xl">
      <i className={`text-xl ${props.styles}`}>
        {props.icon}
      </i>

      <p className="ml-2 text-sm font-medium">
        {props.message}
      </p>
    </div>
  )
}