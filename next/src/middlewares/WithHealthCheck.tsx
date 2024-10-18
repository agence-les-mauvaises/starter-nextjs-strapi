import {
    NextFetchEvent,
    NextMiddleware,
    NextRequest,
    NextResponse,
} from 'next/server'
import { Matcher, MiddlewareFactory } from './utils/types'
import { validateEnvSafe } from '#/env'
import { nextauthNoApi, nextjsRegexpPageOnly } from './utils/static'
import { createApiUrl } from '@/config'

const env = validateEnvSafe(process.env).data
const errorPageRenderingPath = '/middleware/error/healthCheck'

const withHealthCheck: MiddlewareFactory = (next: NextMiddleware) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        if (env?.NODE_ENV === 'development') {
            try {
                const health = await fetch(createApiUrl('/health').href, {
                    method: 'GET',
                }).then((res) => res.json()) as {uptime:number,message:string,timestamp: number}
                if (health.message === 'OK') {
                    if (request.nextUrl.pathname === errorPageRenderingPath) {
                        return NextResponse.redirect(
                            request.nextUrl.searchParams.get('from') ||
                                request.nextUrl.origin + '/'
                        )
                    }
                    return await next(request, _next)
                }
                throw health
            } catch (e) {
                if (request.nextUrl.pathname === errorPageRenderingPath) {
                    return NextResponse.next()
                } else {
                    return NextResponse.redirect(
                        request.nextUrl.origin +
                            errorPageRenderingPath +
                            `?from=${encodeURIComponent(request.url)}`
                    )
                }
            }
        }
        if (request.nextUrl.pathname === errorPageRenderingPath) {
            return NextResponse.redirect(
                request.nextUrl.searchParams.get('from') ||
                    request.nextUrl.origin + '/'
            )
        }
        return await next(request, _next)
    }
}

export default withHealthCheck

export const matcher: Matcher = [{ and: [nextjsRegexpPageOnly, nextauthNoApi] }]
