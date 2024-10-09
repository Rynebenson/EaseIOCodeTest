import Tasks from "src/components/Tasks"

export default function TasksHeader() {
  return (
    <div className="flex items-center py-4">
      <h2 className="text-2xl text-slate-900">Tasks</h2>

      <Tasks.CreateTaskButton />
    </div>
  )
}