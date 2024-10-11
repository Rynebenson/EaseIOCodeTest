import { TbCheck } from "react-icons/tb"

/**
 * Update the completion state for a task
 * 
 * @param {React.ComponentProps} props
 * @param {String} props.id
 * @param {Boolean} props.completed
 * @param {Function} props.handleClick
 * @returns {React.Component}
 */
export default function TaskCardCompleteButton(props) {
  
  const handleClick = () => {
    props.handleClick({ id: props.id, completed: !props.completed })
  }

  return (
    <button
      data-testid={`task-${props.id}-button`}
      onClick={handleClick}
      className={`flex items-center justify-center text-lg rounded-full h-8 w-8 border border-slate-200 shrink-0
        ${props.completed ? "bg-blue-600 text-white" : "bg-none"}
      `}
    >
      {props.completed && <TbCheck />}
    </button>
  )
}