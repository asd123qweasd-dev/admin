import useSWR from 'swr'
import { Post } from '~/api/posts'
import { defaultFetcher } from '~/lib/axios'

type Result<T> = T extends string ? Post : Post[]

export function useGetPosts<T>(id: T) {
  const { data, error } = useSWR<Result<T>>(`/posts/${id}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
