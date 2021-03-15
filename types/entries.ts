export type EntriesOverview = EntryOverview[];

export type EntryOverview = {
    slug: string;
    title: string;
    date: string;
    categories?: string[];
    coverImage: string;
}
