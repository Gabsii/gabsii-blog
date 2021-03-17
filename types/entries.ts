export type EntriesOverview = EntryOverview[];

export interface EntryOverview {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
}

export type PostsOverview = PostOverview[];

export interface PostOverview extends EntryOverview {
    categories?: string[];
}

export type ProjectsOverview = ProjectOverview[];

export interface ProjectOverview extends EntryOverview {
    intro: string,
    excerpt: string,
}
