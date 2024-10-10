import Header from "../components/Header"
import Modals from "./Modals"

export default function Layout(props) {
  return (
    <div className="bg-slate-50">
      <Header />

      <div className="w-full max-w-5xl mx-auto px-6">
        {props.children}
      </div>

      <Modals.CreateTask />
    </div>
  )
}