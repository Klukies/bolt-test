import { type CreateMetaArgs } from 'react-router/route-module';

type LoaderDataWithTitle = {
  title: string;
};

const isLoaderDataWithTitle = (data: unknown): data is LoaderDataWithTitle => {
  return (data as LoaderDataWithTitle)?.title !== undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => unknown;

type RouteModule = {
  meta?: Func;
  links?: Func;
  headers?: Func;
  loader?: Func;
  clientLoader?: Func;
  action?: Func;
  clientAction?: Func;
  HydrateFallback?: unknown;
  default?: unknown;
  ErrorBoundary?: unknown;
  [key: string]: unknown;
};

type RouteInfo = {
  parents: RouteInfo[];
  module: RouteModule;
  id: unknown;
  file: string;
  path: string;
  params: unknown;
  loaderData: unknown;
  actionData: unknown;
};

export const mergeTitles = <T extends RouteInfo>({ matches }: CreateMetaArgs<T>) => {
  return Object.values(matches)
    .reduce<string[]>((titles, match) => {
      if (!isLoaderDataWithTitle(match?.data)) {
        return titles;
      }

      return [match.data.title, ...titles];
    }, [])
    .join(' · ');
};
