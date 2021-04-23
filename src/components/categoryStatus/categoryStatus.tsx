import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Spin, Tag } from 'antd'
import { useGetCategory } from '~/hooks/useGetCategory'
import { mutate } from 'swr'
import { api } from '~/api'

interface CategoryStatusProps {
  id: number
  changed?: boolean
}

const _CategoryStatus: FC<CategoryStatusProps> = ({ id, changed }) => {
  const category = useGetCategory(id)
  const [loading, setLoading] = useState<boolean>(false)

  async function changeStatus() {
    setLoading(true)
    try {
      const { data } = await api.category.status(String(id))
      mutate(`/categories/${id}`, { ...data })
    } catch (err) { }
    setLoading(false)
  }

  return (
    <CategoryStatus>
      <Spin spinning={category.loading || loading}>
        {category.data?.deleted_at
          ? <Tag color="error">Удалена</Tag>
          : <>
            <Tag color={category.data?.is_active ? 'success' : 'orange'}>{category.data?.is_active ? 'Активна' : 'Неактивная'}</Tag>
            {changed && <Button type="link" onClick={changeStatus}>Сменить</Button>}
          </>
        }
      </Spin>
    </CategoryStatus>
  )
}

const CategoryStatus = styled.div``

export { _CategoryStatus as CategoryStatus }
