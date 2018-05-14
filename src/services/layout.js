import { requestSimple } from 'utils/request';

export async function _reserveExperience(params) {
  return requestSimple({
    url: '/website/trail',
    method: 'POST',
    body: params
  })
}

export async function _submitFeedbacks(params) {
  return requestSimple({
    url: '/website/feedback',
    method: 'POST',
    body: params
  })
}