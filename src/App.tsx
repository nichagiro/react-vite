import { Route } from 'wouter'
import { SWRProvider } from './providers/SWRProvider'
import { Layout } from './components/Layout'
import { routes } from './routes'

function App() {
  return (
    <SWRProvider>
      <Layout>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))}
      </Layout>
    </SWRProvider>
  )
}

export default App
