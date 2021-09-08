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
