// BaseNode.js - Node abstraction for all node types

import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export const BaseNode = ({ id, data, config }) => {
  const {
    nodeType,
    category,
    icon,
    accentColor = '#6366f1',
    inputs = [],
    outputs = [],
    fields = [],
    renderBody,
    minWidth = 220,
    minHeight,
  } = config;

  // Initialize field state from data or defaults
  const initFields = () => {
    const vals = {};
    fields.forEach((f) => {
      vals[f.name] = data?.[f.name] !== undefined ? data[f.name] : f.defaultValue ?? '';
    });
    return vals;
  };

  const [fieldValues, setFieldValues] = useState(initFields);

  const setField = (name, value) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (name) => (e) => setField(name, e.target.value);

  // Compute handle positions for evenly-spaced vertical distribution
  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  return (
    <div className="base-node" style={{ minWidth, minHeight }}>
      {/* Input Handles */}
      {inputs.map((input, i) => (
        <div key={input.id}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ top: getHandleTop(i, inputs.length), ...input.style }}
            className="node-handle node-handle--input"
          />
          {input.label && (
            <span
              className="handle-label handle-label--input"
              style={{ top: getHandleTop(i, inputs.length) }}
            >
              {input.label}
            </span>
          )}
        </div>
      ))}

      {/* Header */}
      <div className="node-header" style={{ borderTopColor: accentColor }}>
        <div className="node-header__icon" style={{ background: accentColor + '22', color: accentColor }}>
          {icon || '⬡'}
        </div>
        <div className="node-header__text">
          <span className="node-header__title">{nodeType}</span>
          {category && <span className="node-header__category">{category}</span>}
        </div>
        <div className="node-header__accent" style={{ background: accentColor }} />
      </div>

      {/* Body */}
      <div className="node-body">
        {renderBody
          ? renderBody(fieldValues, setField, id)
          : fields.map((field) => (
              <div className="node-field" key={field.name}>
                <label className="node-field__label">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="node-input node-select"
                    value={fieldValues[field.name]}
                    onChange={handleChange(field.name)}
                  >
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="node-input node-textarea"
                    value={fieldValues[field.name]}
                    onChange={handleChange(field.name)}
                    rows={3}
                  />
                ) : (
                  <input
                    className="node-input"
                    type={field.type || 'text'}
                    value={fieldValues[field.name]}
                    onChange={handleChange(field.name)}
                  />
                )}
              </div>
            ))}
      </div>

      {/* Output Handles */}
      {outputs.map((output, i) => (
        <div key={output.id}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${output.id}`}
            style={{ top: getHandleTop(i, outputs.length), ...output.style }}
            className="node-handle node-handle--output"
          />
          {output.label && (
            <span
              className="handle-label handle-label--output"
              style={{ top: getHandleTop(i, outputs.length) }}
            >
              {output.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
