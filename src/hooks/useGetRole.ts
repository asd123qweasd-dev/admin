import useSWR from 'swr'
import { Role } from '~/api/roles'
import axios from '~/lib/axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useGetRole(id: string) {
  const { data, error } = useSWR<Role>(`/roles/${id}`, fetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
