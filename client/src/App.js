import React from "react";
import { Route } from "react-router-dom";
import StoryList from "./components/Stories/StoryList";
import Navbar from "./components/Navigation/Navbar";
import StoryForm from "./components/Stories/StoryForm";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/" component={StoryList} />
      <Route path="/add-story" component={StoryForm} />
    </div>
  );
};

export default App;
