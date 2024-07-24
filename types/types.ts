type ParsedSearchParams = { [key: string]: string | string[] | undefined };

export type ServerSidePageProp<
  Params,
  SearchParams extends ParsedSearchParams | undefined = undefined
> = {
  params: Params;
  searchParams: SearchParams;
};
