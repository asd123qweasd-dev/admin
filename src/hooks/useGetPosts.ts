import useSWR from 'swr'
import { Post } from '~/api/posts'
import axios from '~/lib/axios'

type Result<T> = T extends string ? Post : Post[]

// костыль, распарсиваем JSON
const defaultFetcher = (url: string) => axios.get(url).then(res => {
  if(res.data.body) {
    res.data.body = res.data.body ? JSON.parse(res.data.body) : null
    return res.data
  }
  if(res.data.data.lenght) {
    res.data.data.forEach((item:any) => {
      item.data.body = item.data.body ? JSON.parse(item.data.body) : null
    })
    return res.data
  }
  return res.data
})

export function useGetPosts<T>(id: T) {
  const { data, error } = useSWR<Result<T>>(`/posts/${id}`, defaultFetcher)

  return {
    data,
    loading: !error && !data,
    error
  }
}
