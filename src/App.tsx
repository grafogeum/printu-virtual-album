import { Provider } from "react-redux";
import "./App.css";

import { HomeScreen } from "./screens/HomeScreen";
import { store } from "./lib/store";

function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App;
