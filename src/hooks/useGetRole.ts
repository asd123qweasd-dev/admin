import useSWR from 'swr'
import { Role } from '~/api/roles'
import axios from '~/lib/axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

type RoleResult<T> = T extends string ? Role : Role[]

export function useGetRole<T>(id?: T) {
  const { data, error } = useSWR<RoleResult<T>>(`/roles/${id || ''}`, fetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
