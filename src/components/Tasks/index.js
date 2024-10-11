import TasksContainer from "./TasksContainer"
import TasksList from "./TasksList"
import CreateTaskButton from "../../components/Tasks/CreateTaskButton"
import TasksHeader from "./TasksHeader"
import TaskCard from "../../components/Tasks/TaskCard"
import DeleteTaskButton from "./TaskCardDeleteButton"
import TasksSearchInput from "./TasksSearchInput"
import TasksNavigation from "./TasksNavigation"
import CreateTaskForm from "./CreateTaskForm"

export default function Tasks() {
  return <div />
}

Tasks.Header = TasksHeader
Tasks.Container = TasksContainer
Tasks.List = TasksList
Tasks.CreateTaskButton = CreateTaskButton
Tasks.CreateTaskForm = CreateTaskForm
Tasks.DeleteTaskButton = DeleteTaskButton
Tasks.TaskCard = TaskCard
Tasks.SearchInput = TasksSearchInput
Tasks.Navigation = TasksNavigation