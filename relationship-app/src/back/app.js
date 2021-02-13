import sup from 'superagent'
import graph from './graph'
// import sup from 'superagent'
// import graph from './graph'
let person;

async function initGraph(src, dec){
  
    try{
    person = await sup.get('https://relationship-builder.herokuapp.com/table/persons')
    // const relationship = await sup.get('https://relationship-builder.herokuapp.com/')
    const g = new graph(person.body.length)
    for(let i =0;i<person.body.length;i++){
        
        const res = await sup.get('https://relationship-builder.herokuapp.com/'+person.body[i].name)

        for(let j=0;j<res.body.length;j++){
                // find index in person table 
            const a=person.body.findIndex((el)=>{if(el.name==res.body[j].relative_name)return true})
            const b = person.body.findIndex((el)=>{if(el.name==res.body[j].name)return true})

            if(res.body[j].name==person.body[i].name){
                   
                g.addEdge(person.body[i].id,person.body[a].id)
            }else{
                g.addEdge(person.body[i].id,person.body[b].id)
            }
        }
    
    }
    return g.printAllPath(src,dec)
    }catch(err){
        console.log('hello')
    }
}



// init(4,5);
export default async function(src,dec){
    const result =  initGraph(src,dec);
    return result
}