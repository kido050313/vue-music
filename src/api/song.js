import { commonParams } from './config'
import axios from 'axios'

export function getSongUrl(songmid) {
  const url = '/api/getSongUrl'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: getData(songmid)
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

function getData(songmid) {
  let data = {
    req: {
      module: 'CDN.SrfCdnDispatchServer',
      method: 'GetCdnDispatch',
      param: { guid: '3575237896', calltype: 0, userip: '' }
    },
    req_0: {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid: '3575237896',
        songmid: [songmid],
        songtype: [0],
        uin: '2957281106',
        loginflag: 1,
        platform: '20'
      }
    },
    comm: { uin: '2957281106', format: 'json', ct: 24, cv: 0 }
  }
  return JSON.stringify(data)
}

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
