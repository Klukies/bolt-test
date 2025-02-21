export const combineHeaders = (...headers: Array<ResponseInit['headers'] | null | undefined>) => {
  const combinedHeaders = new Headers();

  for (const header of headers) {
    if (!header) {
      continue;
    }

    for (const [key, value] of new Headers(header).entries()) {
      combinedHeaders.append(key, value);
    }
  }

  return combinedHeaders;
};
