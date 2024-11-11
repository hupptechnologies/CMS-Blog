import React from 'react';
import RouterContainer from './route/Route';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import './styles/app.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterContainer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
