import Pages from "src/pages"
import Store from "src/libs/Store"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
        </Routes>
      </BrowserRouter>
    </Store>
  )
}

export default App