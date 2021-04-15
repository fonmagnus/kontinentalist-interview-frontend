// import { endpoint } from "~/api/endpoint";
export default function (context) {
  const accessToken = context.store.state.accessToken
  if(accessToken instanceof String) {
    context.$axios.setHeader('Authorization', 'JWT ' + accessToken)
  }
}