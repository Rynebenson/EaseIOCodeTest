import Header from "src/components/Header"

export default function Layout(props) {
  return (
    <div>
      <Header />

      <div className="w-full max-w-5xl mx-auto px-6">
        {props.children}
      </div>
    </div>
  )
}