import Spinner from "react-spinners/ClipLoader"

/**
 * Presentational form for creating a task
 * 
 * @param {React.ComponentProps} props
 * @param {Object} props.task title, date, time, notes
 * @param {Object} props.errors title, date, time, notes
 * @param {Function} props.handleInputChange
 * @param {Function} props.handleSubmit
 * @param {String} props.status
 * @returns {React.Component}
 */
export default function CreateTaskForm(props) {
  return (
    <form
      className="flex flex-col gap-y-6"
      onSubmit={props.handleSubmit}
    >
      <div>
        <label htmlFor="title" className="text-sm text-slate-600">Title</label>

        <input
          data-testid="title-input"
          className="w-full bg-slate-100 rounded-lg h-10 px-4 outline-blue-600"
          id="title"
          type="text"
          name="title"
          value={props.task.title}
          onChange={props.handleInputChange}
          autoComplete="off"
        />

        {props.errors.title && <p className="text-sm text-red-500">{props.errors.title}</p>}
      </div>

      <div className="flex gap-x-6">
        <div className="w-full">
          <label htmlFor="date" className="text-sm text-slate-600">Date</label>

          <input
            data-testid="date-input"
            className="w-full bg-slate-100 rounded-lg h-10 px-4 outline-blue-600"
            id="date"
            type="date"
            name="date"
            value={props.task.date}
            onChange={props.handleInputChange}
            autoComplete="off"
          />

          {props.errors.date && <p className="text-sm text-red-500">{props.errors.date}</p>}
        </div>
            
        <div className="w-1/3 shrink-0">
          <label htmlFor="time" className="text-sm text-slate-600">Time</label>

          <input
            data-testid="time-input"
            className="w-full bg-slate-100 rounded-lg h-10 px-4 outline-blue-600"
            id="time"
            type="time"
            name="time"
            value={props.task.time}
            onChange={props.handleInputChange}
            autoComplete="off"
          />

          {props.errors.time && <p className="text-sm text-red-500">{props.errors.time}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="text-sm text-slate-600">Notes (Optional)</label>
            
        <textarea
          data-testid="notes-input"
          className="w-full bg-slate-100 rounded-lg h-32 p-4 resize-none outline-blue-600"
          id="notes"
          name="notes"
          type="text"
          value={props.task.notes}
          onChange={props.handleInputChange}
          autoComplete="off"
        />

        {props.errors.notes && <p className="text-sm text-red-500">{props.errors.notes}</p>}
      </div>

      <div>
        <button 
          data-testid="create-task-submit-button"
          className="flex items-center justify-center w-full h-10 bg-blue-600 rounded-full text-white font-medium"
          disabled={props.status === "loading"}
        >
          {props.status === "loading" ? <Spinner color="#FFF" size={18} /> : "Create Task"}
        </button>
      </div>
    </form>
  )
}