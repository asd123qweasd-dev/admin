import useSWR from 'swr'
import { User } from '~/api/users'
import { defaultFetcher } from '~/lib/axios'

export function useGetMe() {
  const { data, error } = useSWR<User>('/auth/me', defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
