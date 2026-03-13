const getWorkflowInstances = (baseURL) => {

    return window.Liferay.Util.fetch(
        `${baseURL}/o/headless-admin-workflow/v1.0/workflow-instances/`
    ).then(response => {
        return response.json();
    }).then(json => {
        return json;
    })

}

const getWorkflowInstanceDetails = (baseURL, workflowInstanceId) => {

    return window.Liferay.Util.fetch(
        `${baseURL}/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}`
    ).then(response => {
        return response.json();
    }).then(json => {
        return json;
    })

}

const getWorkflowInstanceLogs = (baseURL, workflowInstanceId) => {

    return window.Liferay.Util.fetch(
        `${baseURL}/o/headless-admin-workflow/v1.0/workflow-instances/${workflowInstanceId}/workflow-logs`
    ).then(response => {
        return response.json();
    }).then(json => {
        return json;
    })

}

export { getWorkflowInstanceDetails, getWorkflowInstanceLogs, getWorkflowInstances }