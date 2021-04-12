import { ApiPagination } from '~/api';

export const defaultResponse: ApiPagination<undefined> = {
  data: undefined,
  links: {
    first: null,
    last: null,
    next: null,
    prev: null
  },
  meta: {
    current_page: 0,
    from: 0,
    last_page: 0,
    links: [],
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  }
}
