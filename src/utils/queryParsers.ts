import { parseAsInteger, parseAsString } from 'nuqs';

export const parseAsSearchType = parseAsString.withDefault('repositories');
export const parseAsPerPage = parseAsString.withDefault('20');
export const parseAsPage = parseAsInteger.withDefault(1);
