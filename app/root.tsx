import './styles/reset.css';
import './styles/global.css';
import './styles/overrides.css';
import './root.css';

import { type ComponentPropsWithoutRef } from 'react';
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';

import { Icon } from '#components/ui/icon';
import i18nServer, { localeCookie } from '#modules/i18n/i18n.server';
import { ClientHintsCheck, getClientHints } from '#utils/client-hints';
import { combineHeaders } from '#utils/headers';
import { useIsClient } from '#utils/misc';
import { CascadeLayers, JavaScriptCheck } from '#utils/root';

import { type Route } from './+types/root';

export const handle = { i18n: ['translation'] };

export const links: Route.LinksFunction = () => {
  return [...Icon.links()];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const t = await i18nServer.getFixedT(request);
  const clientHints = getClientHints(request);
  const locale = await i18nServer.getLocale(request);
  const headers = combineHeaders({ 'Set-Cookie': await localeCookie.serialize(locale) });

  return data({ title: t('root.title'), requestInfo: { clientHints, locale } }, { headers });
};

export const meta = ({ data }: Route.MetaArgs) => [{ title: data.title }];

type LayoutProps = ComponentPropsWithoutRef<'html'>;

export const Layout = ({ children }: LayoutProps) => {
  const loaderData = useRouteLoaderData<typeof loader>('root');
  const isClient = useIsClient();

  return (
    <html lang={loaderData?.requestInfo.locale ?? 'en'} className={isClient ? 'has-js' : ''}>
      <head>
        <JavaScriptCheck />
        <ClientHintsCheck />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <CascadeLayers />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App({ loaderData }: Route.ComponentProps) {
  const { requestInfo } = loaderData;
  useChangeLanguage(requestInfo.locale);

  return <Outlet />;
}
