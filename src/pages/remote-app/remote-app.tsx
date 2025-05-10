import { PageLoader } from '@/components/loader'
import { loadRemote } from '@module-federation/enhanced/runtime'
import { ComponentType, lazy, Suspense } from 'react'

export const RemoteApp = () => {
    const Component = lazy(() => loadRemote('remote_app') as Promise<{ default: ComponentType<unknown> }>)

    return (
        <Suspense fallback={<PageLoader />}>
            <Component />
        </Suspense>
    )
}
