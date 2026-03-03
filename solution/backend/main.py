from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(
    nodes: str = Query(default='[]'),
    edges: str = Query(default='[]'),
):
    try:
        parsed_nodes = json.loads(nodes)
        parsed_edges = json.loads(edges)
    except json.JSONDecodeError:
        return {'error': 'Invalid JSON'}

    num_nodes = len(parsed_nodes)
    num_edges = len(parsed_edges)
    is_dag = check_is_dag(parsed_nodes, parsed_edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag,
    }

def check_is_dag(nodes, edges):
    """Check if the graph formed by nodes and edges is a DAG using Kahn's algorithm."""
    node_ids = {node['id'] for node in nodes}
    
    # Build adjacency list and in-degree map
    adj = defaultdict(list)
    in_degree = {node_id: 0 for node_id in node_ids}
    
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Kahn's BFS
    queue = deque([n for n in node_ids if in_degree[n] == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)
