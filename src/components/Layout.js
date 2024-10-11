import Header from "src/components/Header"
import Modals from "src/components/Modals"
import ToastContainer from "src/components/ToastContainer"

/**
 * Layout prop for each page
 * 
 * @param {React.ComponentProps} props
 * @param {React.ReactNode} props.children
 * @returns {React.Component}
 */
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