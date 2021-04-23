import useSWR from 'swr'
import { User } from '~/api/users'
import { swrDefaultResult } from '~/helpers/swrDefaultResult'
import { defaultFetcher } from '~/lib/axios'

type Result<T> = T extends number|null ? T extends null ? null : User : User[]

export function useGetUsers<T>(id?: T) {
  const path = id ? `/users/${id}` : (id === null) ? null : `/users`
  const { data, error } = useSWR<Result<T>>(path, defaultFetcher)
  
  if (id === null) return swrDefaultResult

  return {
    data,
    loading: !error && !data,
    error
  }
}
