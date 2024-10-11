import { TbSearch } from "react-icons/tb"

/**
 * @param {React.ComponentProps} props
 * @param {String} props.query
 * @returns {React.Component}
 */
export default function TasksSearchInput(props) {
  return (
    <div className="relative">
      <div className="relative">
        <label htmlFor="query" className="absolute flex items-center justify-center h-10 w-10 text-slate-600"><TbSearch /></label>

        <input
          className="bg-white h-10 rounded-lg shadow-sm shadow-slate-200 w-full pr-4 pl-10 outline-blue-500 border-none text-slate-800"
          id="query"
          placeholder="Search tasks"
          type="text"
          name="query"
          value={props.query}
          onChange={props.handleInputChange}
          autoComplete="off"
        />
      </div>
    </div>
  )
}