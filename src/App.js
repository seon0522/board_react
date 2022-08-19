import { Header } from "./component/Header";
import "./App.css";
import { CardList } from "./component/CardList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateCard } from "./component/CreateCard";
import { View } from "./component/View";
import { EditView } from "./component/EditView";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          {/* <Route element={<EmptyPage />}></Route> */}
          <Route path="/" element={<CardList />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
          <Route path="/edit_view/:id" element={<EditView />}></Route>
          <Route path="/create_card" element={<CreateCard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
