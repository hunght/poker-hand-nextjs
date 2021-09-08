import '../styles/globals.css'
// import type { AppProps } from 'next/app'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
// export default MyApp


import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '../src/redux/store'
 
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
 
export default  MyApp 
