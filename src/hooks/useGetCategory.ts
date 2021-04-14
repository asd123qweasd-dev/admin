import useSWR from 'swr'
import { Role } from '~/api/roles'
import { defaultFetcher } from '~/lib/axios'

type RoleResult<T> = T extends string ? Role : Role[]

export function useGetCategory<T>(id?: T) {
  const { data, error } = useSWR<RoleResult<T>>(`/roles/${id || ''}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
