import axios from "axios"
import { BrowserRouter } from "react-router-dom";

import Router from "./router";

function App() {
  axios.defaults.baseURL = "http://ec2-3-38-102-14.ap-northeast-2.compute.amazonaws.com"
  // axios.defaults.baseURL = "http://localhost:8000"

  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
