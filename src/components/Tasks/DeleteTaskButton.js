import { useContext } from "react"
import { TbTrash } from "react-icons/tb"
import { Context } from "../../libs/Store"
import { ACTION_TYPES } from "../../libs/Reducer"

/**
 * 
 * @param {*} props 
 * @returns 
 */
export default function DeleteTaskButton(props) {
  const [, dispatch] = useContext(Context)

  const handleClick = () => {
    dispatch({ type: ACTION_TYPES.SHOW_DELETE_TASK_POPUP, payload: { visible: true, id: props.id, title: props.title } })
  }

  return (
    <button 
      onClick={handleClick}
      className="flex items-center justify-center ml-auto text-lg h-8 w-8 rounded-lg hover:bg-red-600/10 text-red-600"
    >
      <TbTrash />
    </button>
  )
}