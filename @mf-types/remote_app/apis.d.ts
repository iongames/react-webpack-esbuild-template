
    export type RemoteKeys = 'remote_app/button';
    type PackageType<T> = T extends 'remote_app/button' ? typeof import('remote_app/button') :any;