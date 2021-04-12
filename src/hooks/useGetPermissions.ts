import useSWR from 'swr'
import { Permissions } from '~/api/permissions'
import axios from '~/lib/axios'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useGetPermissions(id: string) {
  const { data, error } = useSWR<Permissions>(`/permissions/${id}`, fetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
