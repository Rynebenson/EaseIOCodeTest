import { useContext } from "react"
import { TbX } from "react-icons/tb"
import { ACTION_TYPES } from "../../libs/Reducer"
import { Context } from "../..//libs/Store"
import { archiveTask, deleteTask } from "../../services/task"

export default function DeleteTask() {
  const [state, dispatch] = useContext(Context)

  const handleClose = () => {
    dispatch({ type: ACTION_TYPES.SHOW_DELETE_TASK_POPUP, payload: { visible: false, deleteTaskData: {} } })
  }

  const handleArchive = () => {
    archiveTask({ id: state.deleteTaskData.id, archive: true }, dispatch)
  }

  const handleDelete = () => {
    deleteTask({ id: state.deleteTaskData.id }, dispatch)
  }

  return (
    <div 
      data-testid="delete-task-modal" 
      className={`fixed ${state.showDeleteTaskModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} overflow-auto top-0 left-0 h-full w-full bg-slate-500/50 z-40`}
    >
      <div className={`flex flex-col ${state.showDeleteTaskModal ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-all duration-300 origin-top h-auto bg-white p-6 m-auto sm:rounded-xl sm:my-20 w-full max-w-lg shadow-md md:w-50`}>
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-medium text-xl">Delete Task</h2>

          <button 
            data-testid="close-delete-task-modal-button"
            className="flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-all text-xl h-8 w-8 ml-auto"
            onClick={handleClose}
          >
            <TbX />
          </button>
        </div>

        <div className="mt-3">
          <h2 className="text-lg">
            Are you sure you want to delete task <span className="font-medium capitalize">{`"${state.deleteTaskData?.title}"`}</span>
          </h2>
        </div>

        <button 
          disabled={state.deleteTaskStatus === "loading" || state.archiveTaskStatus === "loading"}
          onClick={handleArchive}
          className="text-slate-600 mt-6 bg-slate-100 font-medium rounded-lg h-10 disabled:bg-slate-50 disabled:text-slate-400"
        >
          Archive
        </button>

        <button 
          disabled={state.deleteTaskStatus === "loading" || state.archiveTaskStatus === "loading"}
          onClick={handleDelete}
          className="text-red-600 mt-2 bg-red-100 font-medium rounded-lg h-10 disabled:bg-slate-50 disabled:text-slate-400"
        >
          Permanently Delete
        </button>
      </div>
    </div>
  )
}