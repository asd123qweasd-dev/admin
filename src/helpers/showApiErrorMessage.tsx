import React from 'react'
import { notification } from 'antd'


export function showApiErrorMessage(error: any) {
  if (!error.isAxiosError || !error.config.headers['showError']) return
  const message = error?.response?.data?.message
  let description = Object.values(error?.response?.data?.errors).map((item: any, key) => {
    return <div key={key}>{item[0]}</div>
  })

  notification.error({ message, description })
}
