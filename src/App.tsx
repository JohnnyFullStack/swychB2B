import React, { Suspense } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from "./router/routes";
import Router from "./router";

function App() {
  return (
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Router />
        </Suspense>
      </div>
  );
}

export default App;
