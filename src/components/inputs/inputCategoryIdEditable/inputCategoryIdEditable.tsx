import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Form } from 'antd'
import { rules } from '~/helpers'
import { NavLink } from 'react-router-dom'
import { InputCategoryId } from '~/components/inputs/inputCategoryId'
import { useGetCategory } from '~/hooks/useGetCategory'

interface InputCategoryIdEditableProps {
  name: string
  title: string
  edit: boolean
  value?: Maybe<number>|undefined
}

const _InputCategoryIdEditable: FC<InputCategoryIdEditableProps> = ({name, title, edit, value}) => {
  const category = useGetCategory(value || null)
  
  return (
    <InputCategoryIdEditable>
      {edit
        ? <Form.Item name={name} rules={rules(true, `Введите ${title}`)} style={{marginBottom: '0'}}>
            <InputCategoryId />
          </Form.Item>
        : <>
            { value && 
              <>
                <NavLink to={`/categories/${value}`}>{`[ ${value} ]`}</NavLink>
                <span> {category.data?.name}</span>
              </>
            }
          </>
      }
    </InputCategoryIdEditable>
  )
}

const InputCategoryIdEditable = styled.div`
  .ant-btn-link {
    padding-left: 0;
  }
`

export { _InputCategoryIdEditable as InputCategoryIdEditable }
