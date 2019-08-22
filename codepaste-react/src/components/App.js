import React from 'react';
import {Header} from "./Header";

function App() {
  return (
      <div>
          <Header/>
          <Route exact path="/" component={CreatePaste}/>
      </div>
  );
}

export default App;
