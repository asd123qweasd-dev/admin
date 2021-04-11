import dayjs from "dayjs";


export function formatDate(value: string | null | undefined) {
  return value ? dayjs(value).format('DD.MM.YYYY HH:mm') : ''
}
