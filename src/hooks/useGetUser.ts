import useSWR from 'swr'
import { User } from '~/api/users'
import { defaultFetcher } from '~/lib/axios'

type RoleResult<T> = T extends string ? User : User[]

export function useGetUser<T>(id: T) {
  const { data, error } = useSWR<RoleResult<T>>(`/users/${id}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
