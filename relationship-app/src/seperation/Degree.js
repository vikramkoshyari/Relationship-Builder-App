import {Form,Input,Button,Typography,Divider} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useState} from 'react';
import sup from 'superagent';
import './style.css'
import init from '../back/app'

const {Title,Text}=Typography;

const FormItem = Form.Item;


const Degree =()=> {
    const [state,setState]=useState({
        loading:false
        
    })
    let arr=[];

    const [s,set]=useState({r:[],type:''})
    const [form] = Form.useForm();
    let jsx=[];
    const display = (path)=>{
       
        
        let pat='';
        

        // console.log('ye chlra hai')
        // console.log(s.r)
        
        for(let i=0;i<path.length;i++){
            
            for(let j=0;j<path[i].length;j++){
                if(j==(path[i].length-1))
                pat=pat+path[i][j]+''
                else
                pat=pat+path[i][j]+'-->'
            }
            arr.push(pat)
            pat='';
            
        }
        // arr.forEach((item)=>{
        //     jsx.push(<p>{item}</p>)
        // })
        // console.log(jsx)
        set({r:arr,type:'success'})
        console.log(s.r)

        
      

        
    }
   

    const find = async (e)=>{
        let path;
        setState({loading:true})
        form.resetFields();
        try{
        const res = await sup.get('https://relationship-builder.herokuapp.com/table/persons')
        const persons = res.body;
        console.log(persons)
        const src = persons.filter(item=>item.name==(e.person1.trim()));
        const des = persons.filter(item=>item.name==(e.person2.trim()));
        console.log(src[0])
        console.log(des[0])
        if(src.length!==0 && des.length!==0){
            path=await init(src[0].id,des[0].id)
            console.log(path)
            arr=[]
            display(path);

        }else{
            console.log(e)
            // console.log('error aara hai')
            arr.push('There is no Relation Between '+e.person1+' & '+e.person2)
            set({r:arr,type:'danger'})
            arr=[];

        }
        setState({loading:false});

        
        }catch(err){
            console.log(err)
        }
    }
    

    
   
    return(
        
        <div className='degree'>
        <Divider/>
        <Title>Degree Of Seperation</Title>
        <Form layout='inline'  form={form} onFinish={find} className='center form'>
        <FormItem name='person1' rules={[{ required: true,message:"Please input Person1"}]}>
        <Input prefix={<UserOutlined style={{fontSize: 13}} />} Placeholder={"Person 1"} allowClear='true' />

        </FormItem>

        <FormItem name='person2' rules={[{ required: true,message:"Please input Person2"}]}>
        <Input prefix={<UserOutlined style={{fontSize: 13}} />} Placeholder={"Person 2"} allowClear='true' />

        </FormItem>

        <FormItem>
            <Button type='primary' htmlType='submit' loading={state.loading}>
                Find
            </Button>
        </FormItem>

        </Form>
        <div className="output_container">
            
            {s.r.map((item)=>(<div><Text type={s.type}>{item}</Text></div>))}
            {/* <Text type={s.type}>{s.r}</Text> */}
        </div>
        
        </div>
        
    )


}

export default Degree
