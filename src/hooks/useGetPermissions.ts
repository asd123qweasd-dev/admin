import useSWR from 'swr'
import { Permissions } from '~/api/permissions'
import { defaultFetcher } from '~/lib/axios'

type RoleResult<T> = T extends string ? Permissions : Permissions[]

export function useGetPermissions<T>(id?: T) {
  const { data, error } = useSWR<RoleResult<T>>(`/permissions/${id || ''}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
