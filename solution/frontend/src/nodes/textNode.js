// textNode.js - Part 3: Dynamic sizing + variable handle detection
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text
  useEffect(() => {
    const matches = new Set();
    let match;
    const regex = new RegExp(VARIABLE_REGEX.source, 'g');
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    setVariables([...matches]);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const getHandleTop = (index, total) => {
    if (total <= 1) return '50%';
    const step = 100 / (total + 1);
    return `${step * (index + 1)}%`;
  };

  // Dynamic width based on the longest line
  const longestLine = currText.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
  const dynamicWidth = Math.max(220, Math.min(500, longestLine * 8 + 48));

  return (
    <div className="base-node" style={{ minWidth: dynamicWidth }}>
      {/* Dynamic variable handles */}
      {variables.map((variable, i) => (
        <div key={variable}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ top: getHandleTop(i, variables.length) }}
            className="node-handle node-handle--input"
          />
          <span
            className="handle-label handle-label--input"
            style={{ top: getHandleTop(i, variables.length) }}
          >
            {variable}
          </span>
        </div>
      ))}

      {/* Header */}
      <div className="node-header" style={{ borderTopColor: '#06b6d4' }}>
        <div className="node-header__icon" style={{ background: '#06b6d422', color: '#06b6d4' }}>
          T
        </div>
        <div className="node-header__text">
          <span className="node-header__title">Text</span>
          <span className="node-header__category">Content</span>
        </div>
        <div className="node-header__accent" style={{ background: '#06b6d4' }} />
      </div>

      {/* Body */}
      <div className="node-body">
        <div className="node-field">
          <label className="node-field__label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-input node-textarea"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            style={{ minHeight: 60, resize: 'none', overflow: 'hidden' }}
          />
          {variables.length > 0 && (
            <div className="node-vars-hint">
              Variables: {variables.map((v) => (
                <span key={v} className="node-var-badge">{'{{' + v + '}}'}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Output */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
        className="node-handle node-handle--output"
      />
      <span className="handle-label handle-label--output" style={{ top: '50%' }}></span>
    </div>
  );
};
