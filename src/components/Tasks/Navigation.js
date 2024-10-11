import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"

export default function Navigation(props) {
  const location = useLocation()

  const filter = useMemo(() => {
    return new URLSearchParams(location.search).get("filter")
  }, [location.search])

  return (
    <div className="flex gap-x-6 py-6 w-full overflow-x-auto">
      <Link 
        data-testid="all-navigation-tab"
        to="/"
        className={`flex items-center font-medium
          ${!filter ? "text-blue-600" : "text-slate-500"}
        `}
      >
        All 
        
        <span 
          data-testid="all-count-container"
          className={`flex items-center justify-center h-6 px-2 rounded-full ml-2 text-sm
            ${!filter ? "bg-blue-600 text-slate-50" : "bg-slate-200 text-slate-500"}
          `}
        >
          {props.counts?.all ?? 0}
        </span>
      </Link>

      <span className="border-l-2 border-slate-200"></span>

      <Link 
        data-testid="open-navigation-tab"
        to="/?filter=open"
        className={`flex items-center font-medium
          ${filter === "open" ? "text-blue-600" : "text-slate-500"}
        `}
      >
        Open 

        <span 
          data-testid="open-count-container"
          className={`flex items-center justify-center h-6 px-2 rounded-full ml-2 text-sm
            ${filter === "open" ? "bg-blue-600 text-slate-50" : "bg-slate-200 text-slate-500"}
          `}
        >
          {props.counts?.open ?? 0}
        </span>
      </Link>

      <Link 
        data-testid="completed-navigation-tab"
        to="/?filter=completed"
        className={`flex items-center font-medium
          ${filter === "completed" ? "text-blue-600" : "text-slate-500"}
        `}
      >
        Completed

        <span 
          data-testid="completed-count-container"
          className={`flex items-center justify-center h-6 px-2 rounded-full ml-2 text-sm
            ${filter === "completed" ? "bg-blue-600 text-slate-50" : "bg-slate-200 text-slate-500"}
          `}
        >
          {props.counts?.completed ?? 0}
        </span>
      </Link>

      <Link 
        data-testid="archived-navigation-tab"
        to="/?filter=archived"
        className={`flex items-center font-medium
          ${filter === "archived" ? "text-blue-600" : "text-slate-500"}
        `}
      >
        Archived

        <span 
          data-testid="archived-count-container"
          className={`flex items-center justify-center h-6 px-2 rounded-full ml-2 text-sm
            ${filter === "archived" ? "bg-blue-600 text-slate-50" : "bg-slate-200 text-slate-500"}
          `}
        >
          {props.counts?.archived ?? 0}
        </span>
      </Link>
    </div>
  )
}