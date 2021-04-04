import { notification } from 'antd'

export function showApiErrorMessage(error: any) {
  if (!error.isAxiosError || error.config.headers['showError'] === 'disabled') return

  const message = error?.response?.data?.message || error.message
  
  notification.error({ message })
}
