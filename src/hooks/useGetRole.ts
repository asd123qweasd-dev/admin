import useSWR from 'swr'
import { Role } from '~/api/roles'
import { defaultFetcher } from '~/lib/axios'

type Result<T> = T extends string ? Role : Role[]

export function useGetRole<T>(id?: T) {
  const { data, error } = useSWR<Result<T>>(`/roles/${id || ''}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
