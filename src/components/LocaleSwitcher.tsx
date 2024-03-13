import {useLocale, useTranslations} from 'next-intl';
import {locales} from '@/config';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {

    const locale = useLocale();

    return (
        <LocaleSwitcherSelect defaultValue={locale} label={'test'}>
            {locales.map((cur) => (
                <option key={cur} value={cur}>
                    {cur}
                </option>
            ))}
        </LocaleSwitcherSelect>
    );
}