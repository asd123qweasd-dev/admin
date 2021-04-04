const fse = require('fs-extra')
const path = require('path')

const color = {
  green: '\x1b[42m%s\x1b[0m',
  red: '\x1b[41m%s\x1b[0m'
}

const root = path.join(process.env.PWD)
const moduleName = process.argv[2]

const fileList = (name) => {
  const PascalCaseName = toPascalCase(name)
  const freeSpace = /          /g
  const templates = {

    // ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ
    //  Компонент
    // ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ
    'component': [
      {
        name: `${name}.tsx`,
        path: '',
        content: `
          import React, { FC } from 'react'
          import styled from '@emotion/styled'
          
          interface ${PascalCaseName}Props {}
          
          const _${PascalCaseName}: FC<${PascalCaseName}Props> = () => {
            return (
              <${PascalCaseName}>
                
              </${PascalCaseName}>
            )
          }
          
          const ${PascalCaseName} = styled.div\`\`
          
          export { _${PascalCaseName} as ${PascalCaseName} }
          `.replace(freeSpace, '').replace(/\n/, '')
      },
      {
        name: `index.ts`,
        path: '',
        content: `
          import { ${PascalCaseName} } from './${name}'
  
          export { ${PascalCaseName} }
          export default ${PascalCaseName}
          `.replace(freeSpace, '').replace(/\n/, '')
      }
    ],

    // ˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉˉ
    //  Store
    // ˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍˍ
    'store': [
      {
        name: 'slice.ts',
        path: '',
        content: `
          import { createSlice, PayloadAction } from '@reduxjs/toolkit'
          import { AppThunk } from '../index'
          import { notification } from 'antd'
          
          type ${PascalCaseName}State = {
            loading: boolean
          }
          
          const initialState: ${PascalCaseName}State = {
            loading: false
          }
          
          export const ${name}Slice = createSlice({
            name: '${name}',
            initialState,
            reducers: {
              changeLoader: (state, action: PayloadAction<boolean>) => {
                state.loading = action.payload
              }
            }
          })
          
          export const { changeLoader } = ${name}Slice.actions
          
          export const asyncAction = (): AppThunk => async (dispatch, getState) => {
            dispatch(changeLoader(true))
            try {
              // await api.auth.logout()
            } catch (err) {
              notification.error({
                message: 'Ошибка',
                description: err.message
              })
            }
            dispatch(changeLoader(false))
          }
          `.replace(freeSpace, '').replace(/\n/, '')
      },
      {
        name: `index.ts`,
        path: '',
        content: `
          import { ${name}Slice } from './slice'
          import { use${PascalCaseName} } from './hook'
          
          export {
            use${PascalCaseName},
            ${name}Slice
          }
          `.replace(freeSpace, '').replace(/\n/, '')
      },
      {
        name: `hook.ts`,
        path: '',
        content: `
          import { shallowEqual } from "react-redux"
          import { RootState, useAppDispatch, useAppSelector } from "~/store"
          import { asyncAction } from "./slice"
          
          const ${name}State = (state: RootState) => ({ ...state.${name} })
          
          export function use${PascalCaseName}() {
            const ${name} = useAppSelector(${name}State, shallowEqual)
            const dispatch = useAppDispatch()
          
            return {
              ...${name},
              asyncAction() {
                dispatch(asyncAction())
              }
            }
          }
          `.replace(freeSpace, '').replace(/\n/, '')
      }
    ]
  }
  return templates[moduleName]
}

const arg = process.argv.filter(item => item !== process.argv[0] && item !== process.argv[1] && item !== process.argv[2])


// ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
// Проверяем что-бы не перезаписать
// ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱
arg.forEach(async originalPath => {
  const filleName = originalPath.split('/').reverse()[0]
  const dataInfo = {
    name: filleName,
    path: path.join(root, originalPath),
    originalPath
  }
  try {
    const exists = await fse.pathExists(dataInfo.path)
    if (exists) throw 'exists'
      create(dataInfo)
  } catch (error) {
    if (error === 'exists') {
      console.log(color.red, `${dataInfo.name} - уже существует`)
    }
  }
})

// ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
// 	Cоздания модуля
// ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱ ̱
const create = (component) => {
  fse.mkdirp(component.path)
  fileList(component.name).forEach( async item => {
    if (item.isFolder) {
      fse.mkdirp(path.join(component.path, item.path, item.name))
    } else {
      try {
        const fille = path.join(component.path, item.path, item.name)
        await fse.outputFile(fille, item.content)
      } catch (error) {
        console.log(color.red, `При создании файла: ${item.name} - произошла неизвесная ошибка ((.`)
      }
    }
  })
  console.log(color.green, `${moduleName}: ${component.name} - успешно создан.`)
}

function toPascalCase (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
