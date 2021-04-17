import useSWR from 'swr'
import { Category } from '~/api/category'
import { defaultFetcher } from '~/lib/axios'

type Result<T> = T extends string ? Category : Category[]

export function useGetCategory<T>(id?: T) {
  const { data, error } = useSWR<Result<T>>(`/categories/${id || ''}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
