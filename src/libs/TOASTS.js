import { TbCheck, TbLoader, TbX } from "react-icons/tb"

const TOASTS = {
  "UPDATE_TASK_REQUEST": { icon: <TbLoader />, styles: "text-slate-600", message: "Updating task..." },
  "UPDATE_TASK_SUCCESS": { icon: <TbCheck />, styles: "text-green-600", message: "Updated task successfully!", hideToast: true },
  "UPDATE_TASK_FAILURE": { icon: <TbX />, styles: "text-red-600", message: "Failed to update task. Please try again.", hideToast: true },

  "ARCHIVE_TASK_REQUEST": { icon: <TbLoader />, styles: "text-slate-600", message: "Archiving task..." },
  "ARCHIVE_TASK_SUCCESS": { icon: <TbCheck />, styles: "text-green-600", message: "Archived task successfully!", hideToast: true },
  "ARCHIVE_TASK_FAILURE": { icon: <TbX />, styles: "text-red-600", message: "Failed to archive task. Please try again.", hideToast: true },

  "DELETE_TASK_REQUEST": { icon: <TbLoader />, styles: "text-slate-600", message: "Deleting task..." },
  "DELETE_TASK_SUCCESS": { icon: <TbCheck />, styles: "text-green-600", message: "Deleted task successfully!", hideToast: true },
  "DELETE_TASK_FAILURE": { icon: <TbX />, styles: "text-red-600", message: "Failed to delete task. Please try again.", hideToast: true },
}

export default TOASTS