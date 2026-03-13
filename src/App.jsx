import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkflowInstancePage from "./pages/WorkflowInstancePage";

function App({ }) {

    const baseURL = window.Liferay.ThemeDisplay.getLayoutRelativeURL();
    const friendlyURLMapper = "/-/workflow-manager";

	console.log(`${baseURL}${friendlyURLMapper}/`);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={baseURL} element={<Home />} />
					<Route path={baseURL + friendlyURLMapper + "/"} element={<Home />} />
					<Route path={baseURL + friendlyURLMapper + "/workflow-instance/:id"} element={<WorkflowInstancePage />} />
				</Routes>
			</BrowserRouter>			
		</>
	)
}

export default App