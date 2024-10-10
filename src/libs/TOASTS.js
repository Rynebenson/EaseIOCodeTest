import { TbCheck, TbLoader } from "react-icons/tb"


const TOASTS = {
  "UPDATE_TASK_REQUEST": { icon: <TbLoader />, styles: "text-slate-600", message: "Updating task..." },
  "UPDATE_TASK_SUCCESS": { icon: <TbCheck />, styles: "text-green-600", message: "Updated task successfully!", hideToast: true }
}

export default TOASTS