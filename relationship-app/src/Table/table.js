import {Component} from 'react';
import reqwest from 'reqwest';
import {Table,Popconfirm,Input} from 'antd';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.development';

let id=0;
let val='';
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

const update= async (id,value)=>{
  reqwest({
    url:'https://relationship-builder.herokuapp.com/tag/update/'+id+'/'+value,
    method:'post',
    success:(res)=>{
      console.log('success')
    }
  })

}


class T extends Component {
 
  componentWillReceiveProps(props){
    this.fetch()
  }

    state={
        data:[],
        loading:false
        
      }
    
     
    // componentDidUpdate(props){
    //   this.fetch();
    // }
      column = [
        {
          title:'Name',
          dataIndex:'name',
          sorter:(a,b)=>a.name.length - b.name.length,
          sortDirection:'descend',
          key:'name'
          
        },
        {
          title:'Relative',
          dataIndex:'relative_name',
          key:'relative'
          // width:'10%'
        },
        {
          title:'Relationship Tag',
          dataIndex:'relation',
          key:'relation',
          render:(text,record)=>this.renderColumns(text,record,'relation')
          // width:'10%'
        },
        {
          title:'action',
          render: (text, record) => {
            const { editable } = record;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <a onClick={() => this.save(record.id)} style={{marginRight:8,}}>Save</a>
                      <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                    : <a onClick={() => this.edit(record.id)}>Edit</a>
                }
              </div>
            );
          }
        }
      ]
      renderColumns(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.id, column)}
          />
        );
      }
      handleChange(value, key, column) {
        id=key;
        val=value;
        // update(key,value);
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
          target[column] = value;
          this.setState({ data: newData });
        }
      }
    
      save(key) {
        update(id,val);
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
    
        if (target) {
          delete target.editable;
          this.setState({ data: newData });
          this.cacheData = newData.map(item => ({ ...item }));
        }
      }
      cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.id)[0]);
          delete target.editable;
          this.setState({ data: newData });
        }
      }
      
      edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.id)[0];
        if (target) {
          target.editable = true;
          this.setState({ data: newData });
        }
      }
      
      componentDidMount(){ 
        // const {pagination} = this.state
        this.fetch()
      }

      fetch=async ()=>{
        this.setState({loading:true})
       
        reqwest({
          url:'https://relationship-builder.herokuapp.com/',
          method:'get',
          type:'json'
          
        }).then(data=>{
          this.cacheData=data.map(item=>({...item}));
          this.setState(
            {
              loading:false,
              data
              
            }

          )
      })
    }
  
    render(){
        const{data,loading}=this.state
        return ( 
        
            <div className='table'>
                <Table columns={this.column} loading={loading} dataSource={data} bordered size='small'/>
            </div>
            
        );

    }
}
export default T;