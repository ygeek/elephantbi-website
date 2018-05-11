import { requestSimple } from 'utils/request';

export function query() {
  return requestSimple({
    url: '',
    method: 'GET'
  })
}
