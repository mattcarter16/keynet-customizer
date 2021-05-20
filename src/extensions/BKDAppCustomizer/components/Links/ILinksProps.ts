export interface IUrl {
    Description: string;
    Url: string;
}

export interface ILink {
    Url: IUrl;
    Image: IUrl;
    Weight: number;
}

export interface ILinksProps {
    links: ILinkGroup[];
    loadingLinks: boolean;
    visible: boolean;
}

export interface ILinkGroup {
    GroupId: number;
    GroupTitle: string;
    Links: ILink[];
}