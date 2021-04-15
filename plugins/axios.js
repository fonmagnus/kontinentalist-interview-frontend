export default ({ store, $axios }) => {
  $axios.defaults.baseURL = store.state.env.URL
}

export default function ({ $axios, app, store }) {
  $axios.onRequest(config => {
    if (store.state.accessToken instanceof String) {
      config.headers.common['Authorization'] = `JWT ${store.state.accessToken}`
    }
  })
}