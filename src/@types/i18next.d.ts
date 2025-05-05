import ruNs1 from '@/shared/locales/ru.json'

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'ns1'
        resources: {
            ns1: typeof ruNs1
        }
    }
}
