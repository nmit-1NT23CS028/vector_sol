// draggableNode.js

export const DraggableNode = ({ type, label, color }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="draggable-node__dot" style={{ background: color || '#7c3aed' }} />
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};
