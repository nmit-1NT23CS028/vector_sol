// toolbar.js
import { DraggableNode } from './draggableNode';

const NODE_PALETTE = [
  { type: 'customInput',  label: 'Input',       color: '#10b981', group: 'Data' },
  { type: 'customOutput', label: 'Output',      color: '#f59e0b', group: 'Data' },
  { type: 'text',         label: 'Text',        color: '#06b6d4', group: 'Content' },
  { type: 'llm',          label: 'LLM',         color: '#8b5cf6', group: 'AI' },
  { type: 'api',          label: 'API Request', color: '#3b82f6', group: 'Integration' },
  { type: 'conditional',  label: 'Conditional', color: '#ec4899', group: 'Logic' },
  { type: 'database',     label: 'Database',    color: '#14b8a6', group: 'Storage' },
  { type: 'transform',    label: 'Transform',   color: '#f97316', group: 'Logic' },
  { type: 'slack',        label: 'Slack',       color: '#4a154b', group: 'Notification' },
];

export const PipelineToolbar = () => (
  <div className="toolbar">
    <span className="toolbar__label">Nodes</span>
    <div className="toolbar__divider" />
    {NODE_PALETTE.map((node) => (
      <DraggableNode key={node.type} type={node.type} label={node.label} color={node.color} />
    ))}
  </div>
);
