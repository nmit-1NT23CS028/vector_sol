// nodes/index.js - All node types including 5 new ones
import { BaseNode } from './BaseNode';

// ─── Node 1: API Request ────────────────────────────────────────────────────
export const ApiNode = ({ id, data }) => (
  <BaseNode id={id} data={data} config={{
    nodeType: 'API Request',
    category: 'Integration',
    icon: '⇄',
    accentColor: '#3b82f6',
    inputs: [{ id: 'url', label: 'url' }, { id: 'body', label: 'body' }],
    outputs: [{ id: 'response', label: 'response' }, { id: 'status', label: 'status' }],
    fields: [
      {
        name: 'method', label: 'Method', type: 'select', defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ],
      },
      { name: 'endpoint', label: 'Endpoint', type: 'text', defaultValue: 'https://api.example.com' },
    ],
  }} />
);

// ─── Node 2: Conditional / Router ──────────────────────────────────────────
export const ConditionalNode = ({ id, data }) => (
  <BaseNode id={id} data={data} config={{
    nodeType: 'Conditional',
    category: 'Logic',
    icon: '⑂',
    accentColor: '#ec4899',
    inputs: [{ id: 'value', label: 'value' }],
    outputs: [{ id: 'true', label: 'true' }, { id: 'false', label: 'false' }],
    fields: [
      {
        name: 'operator', label: 'Operator', type: 'select', defaultValue: 'equals',
        options: [
          { value: 'equals', label: 'equals' },
          { value: 'contains', label: 'contains' },
          { value: 'gt', label: 'greater than' },
          { value: 'lt', label: 'less than' },
          { value: 'exists', label: 'exists' },
        ],
      },
      { name: 'compareValue', label: 'Value', type: 'text', defaultValue: '' },
    ],
  }} />
);

// ─── Node 3: Database Query ─────────────────────────────────────────────────
export const DatabaseNode = ({ id, data }) => (
  <BaseNode id={id} data={data} config={{
    nodeType: 'Database',
    category: 'Storage',
    icon: '⛁',
    accentColor: '#14b8a6',
    inputs: [{ id: 'query', label: 'query' }, { id: 'params', label: 'params' }],
    outputs: [{ id: 'results', label: 'results' }, { id: 'count', label: 'count' }],
    fields: [
      {
        name: 'dbType', label: 'Database', type: 'select', defaultValue: 'postgres',
        options: [
          { value: 'postgres', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'mongodb', label: 'MongoDB' },
          { value: 'sqlite', label: 'SQLite' },
        ],
      },
      {
        name: 'operation', label: 'Operation', type: 'select', defaultValue: 'select',
        options: [
          { value: 'select', label: 'SELECT' },
          { value: 'insert', label: 'INSERT' },
          { value: 'update', label: 'UPDATE' },
          { value: 'delete', label: 'DELETE' },
        ],
      },
    ],
  }} />
);

// ─── Node 4: Transform / Map ─────────────────────────────────────────────────
export const TransformNode = ({ id, data }) => (
  <BaseNode id={id} data={data} config={{
    nodeType: 'Transform',
    category: 'Logic',
    icon: '⟳',
    accentColor: '#f97316',
    inputs: [{ id: 'input', label: 'input' }],
    outputs: [{ id: 'output', label: 'output' }],
    fields: [
      {
        name: 'transformType', label: 'Type', type: 'select', defaultValue: 'json_parse',
        options: [
          { value: 'json_parse', label: 'JSON Parse' },
          { value: 'json_stringify', label: 'JSON Stringify' },
          { value: 'to_uppercase', label: 'To Uppercase' },
          { value: 'to_lowercase', label: 'To Lowercase' },
          { value: 'trim', label: 'Trim Whitespace' },
          { value: 'custom', label: 'Custom Expression' },
        ],
      },
      { name: 'expression', label: 'Expression', type: 'text', defaultValue: '' },
    ],
  }} />
);

// ─── Node 5: Slack Notification ──────────────────────────────────────────────
export const SlackNode = ({ id, data }) => (
  <BaseNode id={id} data={data} config={{
    nodeType: 'Slack',
    category: 'Notification',
    icon: '#',
    accentColor: '#4a154b',
    inputs: [{ id: 'message', label: 'message' }],
    outputs: [{ id: 'sent', label: 'sent' }],
    fields: [
      { name: 'channel', label: 'Channel', type: 'text', defaultValue: '#general' },
      {
        name: 'messageType', label: 'Format', type: 'select', defaultValue: 'text',
        options: [
          { value: 'text', label: 'Plain Text' },
          { value: 'markdown', label: 'Markdown' },
          { value: 'block', label: 'Block Kit' },
        ],
      },
    ],
  }} />
);

// Re-export core nodes
export { InputNode } from './inputNode';
export { LLMNode } from './llmNode';
export { OutputNode } from './outputNode';
export { TextNode } from './textNode';
