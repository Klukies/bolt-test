import { invariant } from '@epic-web/invariant';
import { useRouteLoaderData } from 'react-router';

import { type loader } from '#app/root';

export const useRootLoaderData = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  invariant(rootLoaderData, 'Root loader data is missing.');

  return rootLoaderData;
};

/**
 * @returns inline style element that ensures our cascade layers are created before stylesheets
 * are loaded
 */
export const CascadeLayers = () => {
  return <style>{'@layer reset, global, ui, overrides;'}</style>;
};

/**
 * @returns inline script element that adds a .has-js class to the HTML document for progressive
 * enhancement.
 */
export const JavaScriptCheck = () => {
  return (
    <script
      // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('has-js')" }}
    />
  );
};
