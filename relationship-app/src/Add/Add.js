import {Form,Input,Button,Typography,Divider} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './style.css'
import su from 'superagent'
import T from '../Table/table'
import {useState} from 'react'
// import relations from './test'


const {Title,Text}=Typography;
const FormItem = Form.Item;


 const Add= ()=>{

 let relationship=[]; 
//  console.log(relationship)
 const [form]=Form.useForm();
 const [state,setState]= useState({
   note:'',
   type:'',
   update:[]
 })
 const [s,set]=useState({loading:false})
 let ta='a'
 
    const handleSubmit = async (e) => {
    set({loading:true})
    setState({note:''})
    form.resetFields();
    const res =await su.get('https://relationship-builder.herokuapp.com/table/persons')
    const result=await su.get('https://relationship-builder.herokuapp.com/table/relationship_type')
    relationship=await su.get('https://relationship-builder.herokuapp.com/')
    const persons=res.body;
    const relation = result.body;
    
    const name = persons.filter(item=>item.name==e.Name.trim())
    const relative = persons.filter(item=>item.name==e.RelativeName.trim())
    const rel = relation.filter(item=>item.relation==e.RelationTag.trim())

      if(name.length==0){
        console.log(e.Name+" is not in database add it right now");
       await su.post("https://relationship-builder.herokuapp.com/persons/"+e.Name.trim());

      }
      if(relative.length==0){
        console.log(e.RelativeName +" is not in databse add it right now")
        await su.post("https://relationship-builder.herokuapp.com/persons/"+e.RelativeName.trim())
        console.log("added successfully")
      }
      if(rel.length==0){
        console.log(e.RelationTag+" is not in db add it right now")
        await su.post("https://relationship-builder.herokuapp.com/relationship_type/"+e.RelationTag.trim())
        console.log("added successfullt")
      }
      const exists = relationship.body.filter(item=>(item.name==e.Name.trim() && item.relative_name==e.RelativeName.trim()))
      const relid = await su.get('https://relationship-builder.herokuapp.com/relationship_type/id/'+e.RelationTag.trim())

      if(exists.length==0){
        //add relation it is not exist
        const id = await su.get('https://relationship-builder.herokuapp.com/persons/id/'+e.Name.trim()+'/'+e.RelativeName.trim())

        await su.post("https://relationship-builder.herokuapp.com/relationship/"+id.body[0].id+"/"+id.body[1].id+"/"+relid.body[0].id)
        setState({note:"Relation Added Successfully",
        type:'success',
        update:relationship.body})
       

        
      }else{
        //only update relationtag 
        // await su.post("https://relationship-builder.herokuapp.com/tag/update/"+exists[0].id+"/"+e.RelationTag)
        setState({note:"Relation already exist if you want to change relation tag please edit it in table",
        type:'danger'})
        
      }
      set({loading:false})


      
  }
  return(
          <div className='add-container'>
          <T data={state.update}/>
          <Divider/>
          <Title>Add Relation</Title>
          <Form layout="inline" onFinish={handleSubmit} form={form} className='center'>
            <FormItem name="Name" rules= {[{ required: true, message: 'Please input your name!' }]}>
            <Input prefix={<UserOutlined style={{ fontSize: 13 }} />} placeholder="Name" allowClear='true'/>
            </FormItem>
            <FormItem name="RelativeName" rules= {[{ required: true, message: 'Please input your relative name!' }]}>
            <Input prefix={<UserOutlined style={{ fontSize: 13 }} />} placeholder="Relative Name" allowClear='true'/>
            </FormItem>
            <FormItem name="RelationTag" rules= {[{ required: true, message: 'Please input your relative Tag!' }]}>
            <Input prefix={<UserOutlined style={{ fontSize: 13 }} />} placeholder="Relation Tag" allowClear='true' enterButton='true'/>
            </FormItem>
            <FormItem>
            <Button  type="primary"  htmlType="submit" loading={s.loading}>
            submit
            </Button>
            </FormItem>
          </Form>
          <Text type={state.type}>{state.note}</Text>
          </div>
        )

  }
// 981019

export default Add;