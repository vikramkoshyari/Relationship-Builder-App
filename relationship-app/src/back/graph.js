import list from './linkedList'
import find from './fetch'
// import list from './linkedList'
// import find from './fetch'
class Graph{
    path=[]
    constructor(vertex){
        this.v=vertex+1
        this.adjList=new Array()
        this.initAdjList()

    }
    initAdjList(){
        for(let i=0;i<this.v;i++){
            this.adjList.push(new list())
        }
    }
    addEdge(u,v){
        // console.log(u)
        this.adjList[u].add(v)
    }
    printAllPath(s,d){
        this.isVisited = new Array();
        for(let i =0;i<=this.v;i++){
            this.isVisited[i]=false;
        }
        this.pathList= new Array();
        this.pathList.push(s);
        this.printAllPathsUtil(s,d,this.isVisited,this.pathList)
        return this.path;

    }
    printAllPathsUtil(u,d,isVisited,localPathList){
        // console.log(u,d)
        if(u==d){
            // console.log('hey there')
            // console.log(localPathList)
            const a = find(localPathList)
            this.path.push(a)
            return 
        }
        isVisited[u]=true;
        for(let i =this.adjList[u].head ;i!=null;i=i.next){
            // console.log(i.element)
            if(!isVisited[i.element]){
                localPathList.push(i.element)
                
                this.printAllPathsUtil(i.element,d,isVisited,localPathList)

                localPathList.pop();
            }
        }

        isVisited[u]=false;
    }
}
export default Graph;