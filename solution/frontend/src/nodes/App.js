import './index.css';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar__logo">
          <div className="top-bar__logo-mark">VS</div>
          <span className="top-bar__brand">Vector<span>Shift</span></span>
        </div>
        <div className="top-bar__pipeline-name">untitled-pipeline</div>
        <div style={{ width: 120 }} />
      </header>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
