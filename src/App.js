import Pages from "pages"
import Store from "libs/Store"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/task/:id" element={<Pages.Task />} />
        </Routes>
      </BrowserRouter>
    </Store>
  )
}

export default App