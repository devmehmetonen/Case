import { Button, Input, Layout, Menu, Modal, Select, Space, Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useMemo, useState } from "react";
import LanguageSwitcher from "../../components/LanguageSwitcher/index";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { adduser, getUsersAsync, selectUserList } from "../../redux/slices/userSlice";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import './index.scss'
import { User } from "types/userTypes";
import CInput from "components/UI/Input/cInput";
import CButton from "components/UI/button/cButton";
import inputValidation from "utils/validations";
import { openNotificationWith } from "utils/notification";
import LocalStorageService from "services/LocalStorageService";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUserList);

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState<any>(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [tc, setTc] = useState('');

  // @ts-ignore
  const jobs = useMemo(() => [...new Set(users.map((d: User) => d.meslek))], [users]);

  const handleOk = () =>{
    if(inputValidation('emailInput',email) !==true || inputValidation('TCNoInput',tc) !==true || job=='' || name == ''){
      if(inputValidation('emailInput',email) !== true){
        //@ts-ignore
        openNotificationWith('error','Hata', inputValidation('emailInput',email))
      }
      if(inputValidation('TCNoInput',tc) !== true){
        //@ts-ignore
        openNotificationWith('error','Hata', inputValidation('TCNoInput',tc))
      }
      if(job==''){
        //@ts-ignore
        openNotificationWith('error','Hata','Meslek Alanı Boş Bırakılamaz')
      }
      if(name==''){
        //@ts-ignore
        openNotificationWith('error','Hata', 'Ad soyad Alanı Boş bırakılamaz')
      }
    }else{
        dispatch(adduser({eposta:email,adSoyad:name,meslek:job,tc:tc}))
        setIsModalOpen(false)
        resetForm()
        openNotificationWith('success','Başarılı', 'Kullanıcı Başarıyla Eklendi.')
    }
    
  }

  const resetForm = () =>{
      setEmail('')
      setName('')
      setJob('')
      setTc('')
  }

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  const filteredData = useMemo(() => {

    const _data: any[] = users.filter((row) => {
      const matchesCity = selectedJob ? row.meslek === selectedJob : true;
      return matchesCity
    });
    setTotal(_data.length)
    return _data
  }, [users, selectedJob]);

  console.log(filteredData)

  const columns = [
    {
      title: 'Ad Soyad',
      dataIndex: 'adSoyad',
      key: 'adSoyad',
      sorter: (a: any, b: any) => { return a.adSoyad.localeCompare(b.adSoyad) },
      width: '25%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8, width: 260 }}>
          <Input
            placeholder="Ad soyad ara"
            value={selectedKeys[0] || ""}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              icon={<SearchOutlined />}
            >
              Ara
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small">
              Sıfırla
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value: any, record: any) => {
        if (!value) return true;
        const a = (record.adSoyad || "").toString().toLowerCase().includes(value.toLowerCase())
        setPage(1)
        setTotal(filteredData.filter((d: User) => d.adSoyad.toString().toLowerCase().includes(value.toLowerCase())).length)
        return a;
      },
    },
    {
      title: 'Meslek',
      dataIndex: 'meslek',
      key: 'meslek',
      sorter: (a: any, b: any) => { return a.meslek.localeCompare(b.meslek) },
      onFilter: (value: string, record: any) => {
        console.log(selectedJob)
        if (!value) return true;
        return (record.meslek || "").toString().toLowerCase().includes(value.toLowerCase());
      },
      filterDropdown: () => (
        <div style={{ padding: 8, minWidth: 180 }}>
          <Select
            placeholder="Şehir seç"
            value={selectedJob}
            onChange={(val) => setSelectedJob(val)}
            allowClear
            style={{ width: "100%" }}
          >
            {jobs.map((c) => (
              <Select.Option key={c} value={c}>
                {c}
              </Select.Option>
            ))}
          </Select>
          <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
            <Button size="small" onClick={() => setSelectedJob(null)} icon={<ReloadOutlined />}>Temizle</Button>
            <Button size="small" type="primary" onClick={() => { /* Table'ın internal filterDropdown confirm fonksiyonu yok, biz state ile yönetiyoruz */ }}>Uygula</Button>
          </div>
        </div>
      ),

      width: '25%'
    },
    {
      title: 'E posta',
      dataIndex: 'eposta',
      key: 'eposta',
      sorter: (a: any, b: any) => { return a.eposta.localeCompare(b.eposta) },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8, width: 260 }}>
          <Input
            placeholder="Eposta ara"
            value={selectedKeys[0] || ""}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              icon={<SearchOutlined />}
            >
              Ara
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small">
              Sıfırla
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value: any, record: any) => {
        if (!value) return true;
        setPage(1)
        setTotal(filteredData.filter((d: User) => d.eposta.toString().toLowerCase().includes(value.toLowerCase())).length)
        const a = (record.eposta || "").toString().toLowerCase().includes(value.toLowerCase())
        return a;
      },
      width: '25%'
    },
    {
      title: 'Tc Kimlik No',
      dataIndex: 'tc',
      key: 'tc', filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8, width: 260 }}>
          <Input
            placeholder="Eposta ara"
            value={selectedKeys[0] || ""}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              icon={<SearchOutlined />}
            >
              Ara
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small">
              Sıfırla
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value: any, record: any) => {
        if (!value) return true;
        setPage(1)
        setTotal(filteredData.filter((d: User) => d.tc.toString().toLowerCase().includes(value.toLowerCase())).length)
        const a = (record.tc || "").toString().toLowerCase().includes(value.toLowerCase())
        return a;
      },
      width: '25%'
    },
  ];


  const onPageChane = (a: any, b: any) => {
    setPage(a)
  }


  return (
    <Layout>
      <Layout.Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          style={{ position: "relative" }}
          mode="horizontal"
          defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="1">Kullanıcılar</Menu.Item>

          <LanguageSwitcher />
          <div style={{display:'flex',alignItems:'center'}}>
            <CButton onClick={()=>{LocalStorageService.clearToken();navigate('/login') }}>Çıkış</CButton>
          </div>
         
        </Menu>
      </Layout.Header>
      <Content>
        <div className="table">
          <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'16px' }}>

             <CButton type="primary" onClick={()=>setIsModalOpen(true)}>Kişi Ekle</CButton>
          </div>
         
          <Table
            loading={false}
            dataSource={filteredData}
            // @ts-ignore
            columns={columns}
            rowKey={(e: any) => e.tc}
            pagination={
              { pageSizeOptions: [5, 10, 20], showSizeChanger: true, current: page, defaultPageSize: 10, pageSize: pageSize, total: total, onChange: (a: any, b: any) => onPageChane(a, b), onShowSizeChange: (a, b) => setPageSize(b) }
            } />
        </div>




      </Content>
      <Modal
        title="Basic Modal"
        closable={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={()=>{setIsModalOpen(false);resetForm()}}
      >
        <div>
          <CInput label="E-mail"  onChange={(e:any)=>setEmail(e.target.value)}></CInput>
          <CInput label="Ad Soyad"  onChange={(e:any)=>setName(e.target.value)}></CInput>
          <CInput label="Meslek"  onChange={(e:any)=>setJob(e.target.value)}></CInput>
          <CInput label="Tc No"  onChange={(e:any)=>setTc(e.target.value)}></CInput>
        </div>
      </Modal>
    </Layout>
  );
};

export default Page;
