export enum MediaType {
    Image = 'Image',
    Video = 'Video',
    Article = 'Article',
    Youtube = 'Youtube'
}
export interface Post {
    id: number,
    userId: number,
    avatarUrl: string,
    title: string,
    subtitle: string,
    mediaType: MediaType,
    mediaUrl: string,
    articleText: string,
    description: string
}