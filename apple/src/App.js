
import './App.css';
import { Route } from "react-router-dom";
import HomeSection from './Section/HomeSection';
import ChatSection from './Section/ChatSection';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomeSection} exact />
      <Route path="/chats" component={ChatSection} />
    </div>
  );
}

export default App;
