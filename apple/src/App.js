
import './App.css';
import { Route } from "react-router-dom";
import HomeSection from './Section/HomeSection';
import ChatSection from './Section/ChatSection';
 import NewsSection from './Section/NewsSection';


function App() {
  return (
    <div className="App">
      <Route path="/" component={HomeSection} exact />
      <Route path="/chats" component={ChatSection} />
       <Route path="/news" component={NewsSection}/>
    </div>
   
  );
}

export default App;
