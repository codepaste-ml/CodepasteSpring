import React from 'react';
import {Header} from "./Header";
import {Route} from "react-router";
import CreatePaste from "./CreatePaste";
import ViewPaste from "./ViewPaste";

function App() {
  return (
      <div>
          <Header/>
          <Route exact path="/" component={CreatePaste}/>
          <Route path="/:alias" component={ViewPaste}/>
      </div>
  );
}

export default App;
