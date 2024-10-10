import { useContext } from "react"
import { TbCheck } from "react-icons/tb"
import { Context } from "../../libs/Store"
import { updateTask } from "../../services/task"

export default function CompleteTaskButton(props) {
  const [, dispatch] = useContext(Context)

  const toggleCompletion = () => {
    let task = { id: props.id, completed: !props.completed }

    updateTask(task, dispatch)
  }

  return (
    <button
      data-testid={`task-${props.id}-button`}
      onClick={toggleCompletion}
      className={`flex items-center justify-center text-lg rounded-full h-8 w-8 border border-slate-200 shrink-0
        ${props.completed ? "bg-blue-600 text-white" : "bg-none"}
      `}
    >
      {props.completed && <TbCheck />}
    </button>
  )
}