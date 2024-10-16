import { TbTrash } from "react-icons/tb"

/**
 * Show the deletion modal for tasks where a user can archive or permanently delete
 * 
 * @param {React.ComponentProps} props 
 * @param {String} props.id
 * @param {String} props.title
 * @param {Function} props.handleClick
 * @returns {React.Component}
 */
export default function TaskCardDeleteButton(props) {
  const handleClick = () => {
    props.handleClick({ visible: true, id: props.id, title: props.title })
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