import useSWR from 'swr'
import { Permissions } from '~/api/permissions'
import axios from '~/lib/axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)
type RoleResult<T> = T extends string ? Permissions : Permissions[]

export function useGetPermissions<T>(id?: T) {
  const { data, error } = useSWR<RoleResult<T>>(`/permissions/${id || ''}`, fetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
