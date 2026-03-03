// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import {
  InputNode, LLMNode, OutputNode, TextNode,
  ApiNode, ConditionalNode, DatabaseNode, TransformNode, SlackNode,
} from './nodes/index';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: ApiNode,
  conditional: ConditionalNode,
  database: DatabaseNode,
  transform: TransformNode,
  slack: SlackNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const appData = JSON.parse(event.dataTransfer.getData('application/reactflow') || 'null');
    const type = appData?.nodeType;
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const nodeID = getNodeID(type);
    addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
  }, [reactFlowInstance]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#1e2d45" gap={gridSize} size={1} />
        <Controls />
        <MiniMap nodeColor="#263548" maskColor="rgba(8,11,18,0.7)" />
      </ReactFlow>
    </div>
  );
};
