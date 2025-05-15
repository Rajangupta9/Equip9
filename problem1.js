class GraphNode{
    constructor(value,child){
       this.value= value;
       this.Neighbor=[];
    }
    addNeighbor(Neighbor){
        this.Neighbor.push(Neighbor);
    }
}
// class Tree {
//     constructor(rootValue){
//         this.root = new TreeNode(rootValue);
//     }
//     findNode(value,node=this.root){
//         if(node.value = value) return node;

//         for(const child of node.children){
//             const found = this.findNode(value,child);
//             if(found) return found;
//         }
//         return null;
//     }
//     addchildren(praentsValue, n){
//         const parentNode = this.findNode(praentsValue);
//         if(!parentNode) {
//             console.log('parents node first give me');
//             return;
//         }
//         for(i=1; i<=n; i++){
//             const childNode = new TreeNode(praentsValue);
//             parentNode.addChild(childNode);
//         }
//     }
//     print(node = this.root , indent =""){
//         console.log(indent +node.value);
//         for(const child of node.children){
//             this.print(child,indent+" ")
//         }
//     }
// }

class Graph {
    constructor(){
        this.nodes = new Map();

    }
    addEdge(a,b){
        if(!this.nodes.has(a)) this.nodes.set(a,new GraphNode(a));
        if(!this.nodes.has(b)) this.nodes.set(b, new GraphNode(b));

        this.nodes.get(a).addNeighbor(this.nodes.get(b));

    }
    addEdges(edgeList){
        for(const [a,b] of edgeList){
            this.addEdge(a,b);
        }
    }
    getNode(id){
        return this.nodes.get(id);
    }

}

function findSortestPath(n, edge, availability, start_provider, target_equipment){
    const graph = new Graph();
    graph.addEdges(edge);
    const startNode =graph.getNode(start_provider);
    if(!startNode) return -1;
    console.log(startNode);
    const queue = [[startNode, [startNode]]];
    const visited = new Set([startNode.id]);
    console.log(startNode.id);

    while(queue.length>0){
        const [currentNode, path] =queue.shift();
        const currentId = currentNode.id;

        if((availability[currentId] || []).includes(target_equipment)){
            return path;
        }
        for(const Neighbor of currentNode.Neighbor){
            if(!visited.has(Neighbor.id)){
                visited.add(Neighbor.id)
                queue.push([Neighbor, [...path, Neighbor.id]]);
            }
        }
    }
    return -1;

}




let n =5;
let edge = [[1,2], [2,3], [3,4], [4,5]];
let availability= {1: ["excavator"], 2: [], 3: ["bulldozer"], 4: ["excavator"], 5: ["crane"]};
let start_provider = 2
let target_equipment = "excavator"


let res = findSortestPath(n,edge,availability,start_provider,target_equipment);

console.log(res);



// let root = new TreeNode(1);
// let child = new TreeNode(2);

// let 



// for(let i=0; i<edge.length; i++){
//     let [parents , child] = edge[0];

// }



// for(let key in availability){
//     let equ = availability[key];
//      for(let i=0; i<equ.length; i++){
//         if(equ[i]===target_equipment){

//         }
//      }
// }
