import React from "react";
import { Route } from "react-router-dom";
import StoryList from "./components/Stories/StoryList";

const App = () => {
  return (
    <div>
      <Route exact path="/" component={StoryList} />
    </div>
  );
};

export default App;
