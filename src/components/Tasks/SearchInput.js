import { useContext, useState } from "react"
import { TbSearch } from "react-icons/tb"
import { Context } from "../../libs/Store"
import { ACTION_TYPES } from "../../libs/Reducer"

export default function SearchInput() {
  const [query, setQuery] = useState("")
  const [, dispatch] = useContext(Context)

  const handleChange = (event) => {
    setQuery(event.target.value)

    dispatch({ type: ACTION_TYPES.UPDATE_SEARCH_QUERY, payload: event.target.value })
  }

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
          value={query}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
    </div>
  )
}