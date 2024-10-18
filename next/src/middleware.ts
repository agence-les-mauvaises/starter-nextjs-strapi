// middleware.ts

import { stackMiddlewares } from './middlewares/utils/stackMiddlewares'
import { withHeaders } from './middlewares/WithHeaders'
import * as HealthCheckMiddleware from './middlewares/WithHealthCheck'
import * as EnvMiddleware from './middlewares/WithEnv'
import * as WithInternalization from "./middlewares/WithInternalization";
import { Middleware } from './middlewares/utils/types'

const middlewares = [
  EnvMiddleware,
  HealthCheckMiddleware,
  WithInternalization,
  withHeaders,
] satisfies Middleware[]

export default stackMiddlewares(middlewares)
