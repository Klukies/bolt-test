import { useTranslation } from 'react-i18next';

import i18nServer from '#modules/i18n/i18n.server';

import { type Route } from './+types/route';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const t = await i18nServer.getFixedT(request);

  return { title: t('index.title') };
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('index.title')}</h1>
    </>
  );
}
