import TasksContainer from "../../components/Tasks/Container"
import TasksList from "../../components/Tasks/List"
import CreateTaskButton from "../../components/Tasks/CreateTaskButton"
import TasksHeader from "../../components/Tasks/Header"
import TaskCard from "../../components/Tasks/TaskCard"
import DeleteTaskButton from "./DeleteTaskButton"
import SearchInput from "./SearchInput"
import Navigation from "./Navigation"

export default function Tasks() {
  return <div />
}

Tasks.Header = TasksHeader
Tasks.Container = TasksContainer
Tasks.List = TasksList
Tasks.CreateTaskButton = CreateTaskButton
Tasks.DeleteTaskButton = DeleteTaskButton
Tasks.TaskCard = TaskCard
Tasks.SearchInput = SearchInput
Tasks.Navigation = Navigation