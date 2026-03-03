// inputNode.js
import { BaseNode } from './BaseNode';

const inputConfig = {
  nodeType: 'Input',
  category: 'Data',
  icon: '⤵',
  accentColor: '#10b981',
  inputs: [],
  outputs: [{ id: 'value'}],
  fields: [
    { name: 'inputName', label: 'Name', type: 'text', defaultValue: '' },
    {
      name: 'inputType', label: 'Type', type: 'select', defaultValue: 'Text',
      options: [{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }],
    },
  ],
};

export const InputNode = ({ id, data }) => {
  const config = {
    ...inputConfig,
    fields: inputConfig.fields.map((f) =>
      f.name === 'inputName'
        ? { ...f, defaultValue: data?.inputName || id.replace('customInput-', 'input_') }
        : f
    ),
  };
  return <BaseNode id={id} data={data} config={config} />;
};
