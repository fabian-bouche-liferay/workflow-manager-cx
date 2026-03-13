import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx'

import "@clayui/css/lib/css/atlas.css";

class WebComponent extends HTMLElement {

	connectedCallback() {
		this.root = createRoot(this);

		this.root.render(
			<StrictMode>
				<App
				/>
			</StrictMode>
		);
	}

	disconnectedCallback() {
		this.root.unmount();

		delete this.root;
	}
}

const ELEMENT_ID = 'workflow-manager';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}