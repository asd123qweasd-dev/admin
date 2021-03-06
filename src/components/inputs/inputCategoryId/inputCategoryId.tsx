import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Modal } from 'antd'
import { useGetUsers } from '~/hooks/useGetUsers';
import { ApiContainer } from '~/components/apiContainer';
import { User } from '~/api/users';
import { CategoryTable } from '~/components/tables/categoryTable';
import { Category } from '~/api/category';
import { useGetCategory } from '~/hooks/useGetCategory';

interface InputCategoryIdProps {
  onChange?: (data: number) => void
  value?: number
  id?: string
}

const _InputCategoryId: FC<InputCategoryIdProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const user = useGetCategory(props.value)

  function handleOk () {

  }

  function picUser (category: Category) {
    props?.onChange && props.onChange(Number(category.id))
    setIsModalVisible(false)
  }
  
  return (
    <InputCategoryId>
      <div>
        <Button type="link" onClick={() => setIsModalVisible(true)}>{props.value ? user.data?.name : 'Выбрать'}</Button>
      </div>

      <Modal 
        title="Выбрать категорию" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={() => setIsModalVisible(false)}
        width="80%"
        footer={null}
      >
        <ApiContainer url="/categories">
          {(data: any) => (
            <CategoryTable data={data} onRowClick={picUser}/>
          )}
        </ApiContainer>
      </Modal>
    </InputCategoryId>
  )
}

const InputCategoryId = styled.div``

export { _InputCategoryId as InputCategoryId }
