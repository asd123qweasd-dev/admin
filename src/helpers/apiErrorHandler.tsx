import { notification } from 'antd'
import { store } from '~/store'
import { setSession } from '~/store/auth'

export function apiErrorHandler(error: any) {
  if (error.isAxiosError && error?.response) {
    switch (error.response.status) {
      case 401:
        store.dispatch(setSession(null))
        notification.warning({
          message: 'Время сессии истекло',
          description: 'Пройдите авторизацию заново'
        })
        break
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
    notification.error({
      message: 'Ошибка',
      description: error.message
    })
  }
}
