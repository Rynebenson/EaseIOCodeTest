import Tasks from "../../components/Tasks"

export default function TasksHeader() {
  return (
    <div className="w-full flex items-center z-10 py-4">
      <h2 className="text-2xl text-slate-900">Tasks</h2>

      <Tasks.CreateTaskButton />
    </div>
  )
}