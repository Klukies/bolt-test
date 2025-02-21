import { PassThrough } from 'node:stream';

import { createReadableStreamFromReadable } from '@react-router/node';
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ServerRouter, type EntryContext } from 'react-router';

import i18nConfig from './modules/i18n/i18n.config';
import i18nServer from './modules/i18n/i18n.server';

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  context: EntryContext,
) {
  const instance = createInstance();
  await instance.use(initReactI18next).init({
    ...i18nConfig,
    lng: await i18nServer.getLocale(request),
    ns: i18nServer.getRouteNamespaces(context),
  });

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get('user-agent');

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || context.isSpaMode ? 'onAllReady' : 'onShellReady';
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={context} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          headers.set('Content-Type', 'text/html');

          resolve(new Response(stream, { headers, status }));

          pipe(body);
        },
        onShellError(error) {
          // This is boileplate code from React Router.
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(error);
        },
        onError(error) {
          status = 500;
          // Log streaming rendering errors from inside the shell.  Don't log errors encountered
          // during initial shell rendering since they'll reject and get logged in
          // handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    // Abort the rendering stream after the `streamTimeout` so it has time to flush down the
    // rejected boundaries
    setTimeout(abort, streamTimeout + 1000);
  });
}
