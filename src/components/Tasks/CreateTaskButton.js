import { TbPlus } from "react-icons/tb"

/**
 * This button is responsible for opening the CreateTask modal
 * 
 * @param {React.ComponentProps} props
 * @param {Function} props.handleClick
 * @returns {React.Component}
 */
export default function CreateTaskButton(props) {
  return (
    <button 
      className="flex items-center gap-x-1 h-8 px-2 bg-blue-100 text-blue-600 rounded-lg"
      onClick={props.handleClick}
    >
      <TbPlus />

      <span className="font-medium">New Task</span>
    </button>
  )
}