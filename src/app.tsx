import { useTranslation } from 'react-i18next'
import Button from 'remote_app/button'

export const App = () => {
    const { t } = useTranslation()

    return (
        <div className="bg-primary flex h-screen w-screen flex-col items-center justify-center gap-2">
            <Button text="BUTTON" />
            <h1 className="text-4xl font-bold text-white">{t('app-name')}</h1>
            <p className="text-white">{process.env.BASE_URL || 'BASE_URL not found in .env'}</p>
        </div>
    )
}
