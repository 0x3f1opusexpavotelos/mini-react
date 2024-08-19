export { default as createBrowserHistory } from './createBrowserHistory'
export { default as createHashHistory } from './createHashHistory'

history.push('/home?the=query#the-hash', { the: 'state' })

expect(location).toMatchObject({
  pathname: '/home',
  search: '?the=query',
  hash: '#the-hash',
  state: { the: 'state' },
})
