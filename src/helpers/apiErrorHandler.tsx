import { notification } from 'antd'

export function apiErrorHandler(error: any) {
  if (error.isAxiosError && error?.response) {
    switch(error.response.status) {
      case 422:
        console.log('Ошибка валидации 422', error.response.data.errors);
        break
      default:
        notification.error({ 
          message: 'Ошибка',
          description: error.response.data.message
        })
        break
    }
  } else {
    const isNetworkError = error.message === 'Network Error'
    notification.error({ 
      message: 'Ошибка',
      description: isNetworkError ? 'Нет подключения к интернету' : error.message
    })
  }
}
