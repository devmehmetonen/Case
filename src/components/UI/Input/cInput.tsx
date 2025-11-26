import { Input } from 'antd'
import './input.scss'

const CInput = ({ ...props }) => {
  return (
    <div className='cInput'>
      <label>{props.label}</label>
      {props.inputType == "password" ? <Input.Password {...props}/>: <Input {...props}/>}
    </div>
  )
}

export default CInput