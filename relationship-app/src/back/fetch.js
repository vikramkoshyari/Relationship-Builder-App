import sup from 'superagent'
// import sup from 'superagent'
let person;
async function fetch(){
    try{
    person = await sup.get('https://relationship-builder.herokuapp.com/table/persons')
    }catch(err){
        console.log(err)
    }
}
fetch()
const find = function (arr){
    
    let name=[];
    for(let i=0 ; i<arr.length;i++){
        let id=arr[i];
         name[i]=person.body.find((i)=>{
            if(i.id==id)return true
        }).name
        
    }
    // console.log(name)
    return name;
}
export default find;