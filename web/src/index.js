import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css'
import 'reactflow/dist/style.css';
import { ReactFlowProvider } from 'reactflow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);
