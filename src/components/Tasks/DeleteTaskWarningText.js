export default function DeleteTaskWarningText(props) {
  return (
    <div className="py-6">
      <h2 className="text-lg text-center">
        Are you sure you want to delete task <span className="font-medium capitalize">{`"${props.title}"`}</span>
      </h2>
    </div>
  )
}