import "./App.scss";
import Domains from "./components/Domains/Domains";
import Header from "./components/Header/Header";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <>
      <Header />
      <hr />
      <Domains />
      <Settings />
    </>
  );
}

export default App;
