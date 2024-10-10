import Header from "../components/Header"
import Modals from "./Modals"
import ToastContainer from "./ToastContainer"

export default function Layout(props) {
  return (
    <div className="bg-slate-50">
      <Header />

      <div className="w-full max-w-5xl mx-auto px-6 min-h-[calc(100vh-64px)]">
        {props.children}
      </div>

      <ToastContainer />
      <Modals.CreateTask />
      <Modals.DeleteTask />
    </div>
  )
}