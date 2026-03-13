import React, { useEffect, useState } from 'react';
import { Provider } from '@clayui/core';
import Icon from '@clayui/icon';
import { ClayButtonWithIcon } from '@clayui/button';
import Label from '@clayui/label';
import Panel from '@clayui/panel';
import { useParams } from "react-router-dom";
import { getWorkflowInstanceDetails, getWorkflowInstanceLogs } from "../services/workflowService";

const WorkflowInstancePage = () => {
    const baseURL = window.Liferay.ThemeDisplay.getPortalURL();

    const [workflowInstanceDetails, setWorkflowInstanceDetails] = useState(null);
    const [workflowInstanceLogs, setWorkflowInstanceLogs] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getWorkflowInstanceDetails(baseURL, id).then(setWorkflowInstanceDetails);
        getWorkflowInstanceLogs(baseURL, id).then(setWorkflowInstanceLogs);
    }, [id]);

    const formatDelay = (logDate) => {
        if (!workflowInstanceDetails?.dateCreated) {
            return new Date(logDate).toLocaleString();
        }

        const seconds = Math.round(
            (new Date(logDate) - new Date(workflowInstanceDetails.dateCreated)) / 1000
        );

        return `${seconds} after workflow start`;
    };

    const getLabelDisplayType = (type) => {
        switch ((type || '').toLowerCase()) {
            case 'approved':
            case 'complete':
                return 'success';
            case 'pending':
                return 'warning';
            case 'rejected':
            case 'error':
                return 'danger';
            default:
                return 'info';
        }
    };

    return (
        <Provider spritemap={window.Liferay.Icons.spritemap}>
            <div className="workflow-instance-page container-fluid container-fluid-max-xl py-4">
                <div className="mb-4">
                    <h1 className="mb-1">Workflow instance</h1>
                    <p className="text-secondary mb-0">
                        Workflow history and context variables
                    </p>
                </div>

                <div className="workflow-section mb-4">
                    <Panel
                        collapsable
                        displayType="secondary"
                        showCollapseIcon
                        displayTitle={
                            <Panel.Title>
                                <div className="d-flex align-items-center">
                                    <Icon symbol="order-list-up" className="mr-2" />
                                    <div>
                                        <h2 className="mb-0">Workflow log</h2>
                                        <span className="text-secondary small">Most recent first</span>
                                    </div>
                                </div>
                            </Panel.Title>
                        }
                    >
                        <Panel.Body>
                            {!workflowInstanceLogs ? (
                                <div className="text-secondary">Chargement des logs...</div>
                            ) : (
                                <div className="workflow-log-list">
                                    {workflowInstanceLogs.items.map((log, index) => (
                                        <div className="workflow-log-item" key={index}>
                                            <div className="workflow-log-card">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="pr-3">
                                                        <div className="d-flex align-items-center mb-1">
                                                            <h4 className="mb-0 mr-2">{log.stateLabel}</h4>
                                                            {log.type && (
                                                                <Label displayType={getLabelDisplayType(log.type)}>
                                                                    {log.type}
                                                                </Label>
                                                            )}
                                                        </div>
                                                        <div className="text-secondary small">
                                                            {formatDelay(log.dateCreated)}
                                                        </div>
                                                    </div>

                                                    <ClayButtonWithIcon
                                                        aria-label="Copier"
                                                        symbol="copy"
                                                        title="Copier"
                                                        displayType="unstyled"
                                                        className="text-secondary"
                                                    />
                                                </div>

                                                {log.description && (
                                                    <div className="mb-3">
                                                        <div className="small text-secondary mb-1">Description</div>
                                                        <pre className="log-code">{log.description}</pre>
                                                    </div>
                                                )}

                                                {log.commentLog && (
                                                    <div>
                                                        <div className="small text-secondary mb-1">Comment</div>
                                                        <pre className="log-code">{log.commentLog}</pre>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Panel.Body>
                    </Panel>
                </div>

                <div className="workflow-section">
                    <Panel
                        collapsable
                        displayType="secondary"
                        showCollapseIcon
                        displayTitle={
                            <Panel.Title>
                                <div className="d-flex align-items-center">
                                    <Icon symbol="code" className="mr-2" />
                                    <h2 className="mb-0">Context variables</h2>
                                </div>
                            </Panel.Title>
                        }
                    >
                        <Panel.Body>
                            {!workflowInstanceDetails ? (
                                <div className="text-secondary">Chargement du contexte...</div>
                            ) : (
                                Object.entries(workflowInstanceDetails.context || {}).map(([key, value]) => {
                                    const strValue = String(value);

                                    return (
                                        <div className="context-card mb-3" key={key}>
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="pr-3">
                                                    <h5 className="mb-1">{key}</h5>
                                                    <div className="text-secondary small">
                                                        {strValue.length > 120
                                                            ? `${strValue.substring(0, 120)}...`
                                                            : strValue}
                                                    </div>
                                                </div>

                                                <ClayButtonWithIcon
                                                    aria-label={`Copier ${key}`}
                                                    symbol="copy"
                                                    title="Copier"
                                                    displayType="unstyled"
                                                    className="text-secondary"
                                                />
                                            </div>

                                            <details>
                                                <summary className="small text-primary">
                                                    Details
                                                </summary>
                                                <pre className="context-code mt-2">{strValue}</pre>
                                            </details>
                                        </div>
                                    );
                                })
                            )}
                        </Panel.Body>
                    </Panel>
                </div>
            </div>
        </Provider>
    );
};

export default WorkflowInstancePage;