import useSWR from 'swr'
import { User } from '~/api/users'
import axios from '~/lib/axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useGetUser(id: string) {
  const { data, error } = useSWR<User>(`/users/${id}`, fetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
