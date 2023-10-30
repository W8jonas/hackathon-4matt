import React from 'react';
import ReactDOM from 'react-dom/client';

import { ReactFlowProvider } from 'reactflow';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'reactflow/dist/style.css';
import { App } from './routes';

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ReactFlowProvider>
			<App />
		</ReactFlowProvider>
	</React.StrictMode>
);
