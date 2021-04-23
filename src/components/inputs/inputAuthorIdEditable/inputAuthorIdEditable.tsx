import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Form } from 'antd'
import { InputAuthorId } from '~/components/inputs/inputAuthorId'
import { rules } from '~/helpers'
import { NavLink } from 'react-router-dom'
import { useGetUsers } from '~/hooks/useGetUsers'

interface InputAuthorIdEditableProps {
  name: string
  title: string
  edit: boolean
  value?: Maybe<number>|undefined
}

const _InputAuthorIdEditable: FC<InputAuthorIdEditableProps> = ({name, title, edit, value}) => {
  const user = useGetUsers(value || null)
  
  return (
    <InputAuthorIdEditable>
      {edit
        ? <Form.Item name={name} rules={rules(true, `Введите ${title}`)} style={{marginBottom: '0'}}>
            <InputAuthorId />
          </Form.Item>
        : <>
            { value && 
              <>
                <NavLink to={`/users/${value}`}>{`[ ${value} ]`}</NavLink>
                <span> {user.data?.name}</span>
              </>
            }
          </>
      }
    </InputAuthorIdEditable>
  )
}

const InputAuthorIdEditable = styled.div`
  .ant-btn-link {
    padding-left: 0;
  }
`

export { _InputAuthorIdEditable as InputAuthorIdEditable }
