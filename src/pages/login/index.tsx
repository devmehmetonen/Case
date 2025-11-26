import CButton from 'components/UI/button/cButton'
import './login.scss'
import CInput from 'components/UI/Input/cInput'
import { useState } from 'react'
import { users } from 'data/users'
import LocalStorageService from 'services/LocalStorageService'
import { history } from 'index'
import { useNavigate } from 'react-router-dom'
import inputValidation from 'utils/validations'
import { openNotificationWith } from 'utils/notification'
const Login = () => {

   const [password, setPassword] = useState(""); 
   const [email, setEmail] = useState(""); 
   const navigate = useNavigate()

  const loginHandler = (e:string,p:string)=> {
    //normalde burada http get isteği atılmalı lakin burada arrayden find metoduyla kullanıcı checki kurguladım
     if(inputValidation('emailInput',e) !==true){
         //@ts-ignore
        openNotificationWith('error','Hata', inputValidation('emailInput',e))
     }else{
      const user = users.find((u)=>{
            return u.email  == e && u.password == p;
      })
      if(user){
        LocalStorageService.setToken('ey2435dfsf')
        openNotificationWith('success','Başarılı','Giriş Başarıyla yapıldı!')
        navigate('/')
      }else{
         openNotificationWith('error','Hata','Kullanıcı Bulunamadı')
      }
     }
      
      
    
  }

  return (
    <div className='login-page'>
      <div className='login-page__card'>
        <CInput label="E-mail adresiniz"  onChange={(e:any)=>setEmail(e.target.value)}></CInput>
        <CInput label="Şifreniz" inputType="password" onChange={(e:any)=>setPassword(e.target.value)}></CInput>
        <div style={{marginTop:'16px'}}>
          <CButton type="primary" onClick={()=>loginHandler(email,password)}>Giriş yap</CButton>
        </div>
      </div>
    </div>
  )
}

export default Login