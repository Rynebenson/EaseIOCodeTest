import { useMemo } from "react"
import { Link } from "react-router-dom"

/**
 * Navigation for Tasks
 *   - All, Open, Completed, Archived
 * 
 * @param {React.ComponentProps} props
 * @param {String} props.filter
 * @param {Object} props.counts
 * @returns {React.Component}
 */
export default function TasksNavigation(props) {
  const links = useMemo(() => {
    return [
      { label: "All", filter: "", count: props.counts.all },
      { label: "Open", filter: "open", count: props.counts.open },
      { label: "Completed", filter: "completed", count: props.counts.completed },
      { label: "Archived", filter: "archived", count: props.counts.archived }
    ]
  }, [props.counts])

  return (
    <div className="flex gap-x-6 py-6 w-full overflow-x-auto">
      {links.map(({ label, filter, count }) => (
        <div className="flex items-center" key={filter}>
          <Link 
            data-testid={`${filter === "" ? "all" : filter}-navigation-tab`}
            to={filter ? `/?filter=${filter}` : "/"}
            className={`flex items-center font-medium shrink-0 ${(props.filter ?? "") === filter ? "text-blue-600" : "text-slate-500"}`}
          >
            {label}

            <span 
              data-testid={`${filter === "" ? "all" : filter}-count-container`}
              className={`flex items-center justify-center h-6 px-2 rounded-full ml-2 text-sm 
                ${(props.filter ?? "") === filter ? "bg-blue-600 text-slate-50" : "bg-slate-200 text-slate-500"}`}
            >
              {count ?? 0}
            </span>
          </Link>

          {!filter && <div className="border-l-2 border-slate-200 ml-6 shrink-0" style={{ height: "1.5rem" }} />}
        </div>
      ))}
    </div>
  )
}