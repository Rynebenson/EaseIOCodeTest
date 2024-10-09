import { useContext } from "react"
import { TbX } from "react-icons/tb"
import { ACTION_TYPES } from "src/libs/Reducer"
import { Context } from "src/libs/Store"

export default function CreateTask() {
  const [state, dispatch] = useContext(Context)

  const handleClose = () => {
    dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: false })
  }

  return (
    <div className={`fixed ${state.show_create_task_modal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} overflow-auto top-0 left-0 h-full w-full bg-slate-500/50 z-50`}>
      <div className={`flex flex-col ${state.show_create_task_modal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-all duration-300 origin-top h-auto bg-white p-6 m-auto sm:rounded-xl sm:my-20 w-full max-w-xl shadow-md md:w-50`}>
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl">Create Task</h2>

          <button 
            className="flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-all text-xl h-8 w-8 ml-auto"
            onClick={handleClose}
          >
            <TbX />
          </button>
        </div>
      </div>
    </div>
  )
}