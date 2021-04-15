import useSWR from 'swr'
import { Category } from '~/api/category'
import { defaultFetcher } from '~/lib/axios'

type RoleResult<T> = T extends string ? Category : Category[]

export function useGetCategory<T>(id?: T) {
  const { data, error } = useSWR<RoleResult<T>>(`/categories/${id || ''}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
