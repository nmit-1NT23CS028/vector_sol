// submit.js - Part 4: Backend integration
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        nodes: JSON.stringify(nodes),
        edges: JSON.stringify(edges),
      });

      const response = await fetch(`http://localhost:8000/pipelines/parse?${params}`, {
        method: 'GET',
      });

      if (!response.ok) throw new Error('Request failed');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert('Error connecting to backend: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          <span className="submit-btn__icon">▶</span>
          {loading ? 'Analyzing...' : 'Run Pipeline'}
        </button>
      </div>

      {result && (
        <div className="pipeline-alert-overlay" onClick={() => setResult(null)}>
          <div className="pipeline-alert" onClick={(e) => e.stopPropagation()}>
            <div className="pipeline-alert__header">
              <div className="pipeline-alert__icon">📊</div>
              <div>
                <div className="pipeline-alert__title">Pipeline Analysis</div>
                <div className="pipeline-alert__subtitle">Results from parser</div>
              </div>
            </div>

            <div className="pipeline-alert__stats">
              <div className="pipeline-alert__stat">
                <div className="pipeline-alert__stat-value">{result.num_nodes}</div>
                <div className="pipeline-alert__stat-label">Nodes</div>
              </div>
              <div className="pipeline-alert__stat">
                <div className="pipeline-alert__stat-value">{result.num_edges}</div>
                <div className="pipeline-alert__stat-label">Edges</div>
              </div>
            </div>

            <div className="pipeline-alert__dag">
              <div
                className="pipeline-alert__dag-dot"
                style={{ background: result.is_dag ? '#10b981' : '#ef4444' }}
              />
              <div className="pipeline-alert__dag-text">
                This pipeline{' '}
                <strong>{result.is_dag ? 'is a valid DAG' : 'is NOT a valid DAG'}</strong>
                {result.is_dag
                  ? ' — no cycles detected.'
                  : ' — cycles were detected.'}
              </div>
            </div>

            <button className="pipeline-alert__close" onClick={() => setResult(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
