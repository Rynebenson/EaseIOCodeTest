import { Link } from "react-router-dom"
import EaseLogo from "./EaseLogo"

export default function Header() {
  return (
    <header className="sticky top-0 flex items-center w-full bg-white border-b border-slate-100 h-16 z-20">
      <div className="w-full max-w-5xl mx-auto px-6">
        <Link className="flex items-center gap-x-3" to="/">
          <EaseLogo />

          <span className="text-xl text-slate-500">Task Management</span>
        </Link>
      </div>
    </header>
  )
}