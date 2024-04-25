import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Detailpage from './assets/pages/Detailpage';
import Errorpage from './assets/pages/Errorpage';
import Favpage from './assets/pages/Favpage';
import Homepage from './assets/pages/Homepage';
import { store } from '../src/redux/store.jsx';
import { createHashRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Homepage/>}></ Route>
      <Route path='/detailpage/:recipeid' element={<Detailpage/>} />
      <Route path='/favourites' element={<Favpage/>} />
      <Route path='*' element={<Errorpage />}/>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
    <Homepage></Homepage>
  </React.StrictMode>
);

reportWebVitals();
