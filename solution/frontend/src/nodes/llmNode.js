// llmNode.js
import { BaseNode } from './BaseNode';

const llmConfig = {
  nodeType: 'LLM',
  category: 'AI',
  icon: '✦',
  accentColor: '#8b5cf6',
  inputs: [
    { id: 'system' },
    { id: 'prompt' },
  ],
  outputs: [{ id: 'response' }],
  fields: [
    {
      name: 'model', label: 'Model', type: 'select', defaultValue: 'gpt-4o',
      options: [
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
        { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
        { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
      ],
    },
  ],
};

export const LLMNode = ({ id, data }) => (
  <BaseNode id={id} data={data} config={llmConfig} />
);
