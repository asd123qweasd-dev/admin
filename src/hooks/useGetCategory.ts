import useSWR from 'swr'
import { Category } from '~/api/category'
import { defaultFetcher } from '~/lib/axios'

type Result<T> = T extends number|null ? T extends null ? null : Category : Category[]

export function useGetCategory<T>(id?: T) {
  const path = id ? `/categories/${id}` : (id === null) ? null : `/categories`
  const { data, error } = useSWR<Result<T>>(path, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
