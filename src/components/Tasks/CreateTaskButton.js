import { useContext } from "react"
import { TbPlus } from "react-icons/tb"
import { ACTION_TYPES } from "src/libs/Reducer"
import { Context } from "src/libs/Store"

export default function CreateTaskButton() {
  const [, dispatch] = useContext(Context)

  const handleClick = () => {
    dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: true })
  }

  return (
    <button 
      className="flex items-center gap-x-1 ml-auto h-8 px-2 bg-blue-50 text-blue-500 rounded-lg"
      onClick={handleClick}
    >
      <TbPlus />

      <span className="font-medium">New Task</span>
    </button>
  )
}