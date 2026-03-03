// outputNode.js
import { BaseNode } from './BaseNode';

const outputConfig = {
  nodeType: 'Output',
  category: 'Data',
  icon: '⤴',
  accentColor: '#f59e0b',
  inputs: [{ id: 'value' }],
  outputs: [],
  fields: [
    { name: 'outputName', label: 'Name', type: 'text', defaultValue: '' },
    {
      name: 'outputType', label: 'Type', type: 'select', defaultValue: 'Text',
      options: [{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }],
    },
  ],
};

export const OutputNode = ({ id, data }) => {
  const config = {
    ...outputConfig,
    fields: outputConfig.fields.map((f) =>
      f.name === 'outputName'
        ? { ...f, defaultValue: data?.outputName || id.replace('customOutput-', 'output_') }
        : f
    ),
  };
  return <BaseNode id={id} data={data} config={config} />;
};
