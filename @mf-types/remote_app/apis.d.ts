
    export type RemoteKeys = 'remote_app';
    type PackageType<T> = T extends 'remote_app' ? typeof import('remote_app') :any;