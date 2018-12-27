import camelize from './modules/camelize'
import snakeize from 'snakecase-keys'

export class HTTPLocaleUseHeaders {
  static headers = {}

  static setHeader(name, value) {
    HTTPLocaleUseHeaders.headers = {
      ...HTTPLocaleUseHeaders.headers,
      [name]: value
    }
  }
}

/*-- Makes an api call
     @param {string} url
     @param {object} options --*/
const apiCall = (url, options, headers) => {
  let status

  return new Promise((onSuccess, onError) => {
    fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
        ...HTTPLocaleUseHeaders.headers,
        ...headers
      }
    })
      .then(payload => {
        status = payload.status
        if (status === 204) return onSuccess({ status: 204, data: {} })

        if (status === 502) return onError('Server Error')

        payload
          .json()
          .then(data => {
            onSuccess({
              status: status,
              json: camelize(data)
            })
          })
          .catch(err => {
            onError(err)
          })
      })
      .catch(err => {
        onError(err)
      })
  })
}

const dataCall = (url, method, body, options, headers = {}) => {
  return apiCall(
    url,
    {
      method: method,
      body: body
        ? body instanceof FormData || (options && options.multipart)
          ? body
          : JSON.stringify(snakeize(body))
        : null
    },
    (body && body instanceof FormData) || (options && options.multipart)
      ? { ...headers, 'Content-Type': 'multipart/form-data' }
      : headers
  )
}

export const apiPost = (url, body, options, headers) => {
  return dataCall(url, 'POST', body, options, headers)
}

export const apiPatch = (url, body, options, headers) => {
  return dataCall(url, 'PATCH', body, options, headers)
}

export const apiGet = (url, headers = {}) => {
  return apiCall(url, { method: 'GET' }, headers)
}

export const apiDelete = (url, headers = {}) => {
  return apiCall(url, { method: 'DELETE' }, headers)
}
