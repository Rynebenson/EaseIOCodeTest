import { useCallback, useContext, useMemo } from "react"
import { ACTION_TYPES } from "src/libs/Reducer"
import { Context } from "src/libs/Store"
import { archiveTask, deleteTask } from "src/services/task"
import Wrapper from "src/components/Modals/Wrapper"
import DeleteTaskWarningText from "src/components/Tasks/DeleteTaskWarningText"
import DeleteTaskWarningButton from "src/components/Tasks/DeleteTaskWarningButton"

/**
 * Smart container for deleting a task
 * 
 * @returns {React.Component}
 */
export default function DeleteTask() {
  const [state, dispatch] = useContext(Context)

  const handleClose = useCallback(() => {
    dispatch({ type: ACTION_TYPES.SHOW_DELETE_TASK_POPUP, payload: { visible: false, deleteTaskData: {} } })
  }, [dispatch])

  const handleArchive = useCallback(() => {
    archiveTask({ id: state.deleteTaskData?.id, archive: true }, dispatch)
  }, [state.deleteTaskData?.id, dispatch])

  const handleDelete = useCallback(() => {
    deleteTask({ id: state.deleteTaskData?.id }, dispatch)
  }, [state.deleteTaskData?.id, dispatch])

  const disabled = useMemo(() => {
    if(state.archiveTaskStatus === "loading" || state.deleteTaskStatus === "loading") return true

    return false
  }, [state.archiveTaskStatus, state.deleteTaskStatus])

  return (
    <Wrapper dataTestId="delete-task-modal" closeButtonDataTestId="close-delete-task-modal-button" title="Delete Task" visible={state.showDeleteTaskModal} handleClose={handleClose}>
      <DeleteTaskWarningText title={state.deleteTaskData?.title} />

      <DeleteTaskWarningButton title="Archive" disabled={disabled} handleClick={handleArchive} />

      <DeleteTaskWarningButton title="Permanently Delete" disabled={disabled} handleClick={handleDelete} />
    </Wrapper>
  )
}