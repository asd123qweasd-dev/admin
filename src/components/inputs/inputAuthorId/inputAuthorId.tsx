import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Modal } from 'antd'
import { UsersTable } from '~/components/tables/usersTable';
import { useGetUsers } from '~/hooks/useGetUsers';
import { ApiContainer } from '~/components/apiContainer';
import { User } from '~/api/users';

interface InputAuthorIdProps {
  onChange?: (data: number) => void
  value?: number
  id?: string
}

const _InputAuthorId: FC<InputAuthorIdProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const user = useGetUsers(props.value)

  function handleOk () {

  }

  function picUser (e: User) {
    props?.onChange && props.onChange(e.id)
    setIsModalVisible(false)
  }
  
  return (
    <InputAuthorId>
      <div>
        <Button type="link" onClick={() => setIsModalVisible(true)}>{props.value ? user.data?.name : 'Выбрать'}</Button>
      </div>

      <Modal 
        title="Выбрать пользователя" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={() => setIsModalVisible(false)}
        width="80%"
        footer={null}
      >
        <ApiContainer url="/users">
          {(data: any) => (
            <UsersTable data={data} onRowClick={picUser}/>
          )}
        </ApiContainer>
      </Modal>
    </InputAuthorId>
  )
}

const InputAuthorId = styled.div``

export { _InputAuthorId as InputAuthorId }
