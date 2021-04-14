import useSWR from 'swr'
import { User } from '~/api/users'
import axios from '~/lib/axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useGetMe() {
  const { data, error } = useSWR<User>('/auth/me', fetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
