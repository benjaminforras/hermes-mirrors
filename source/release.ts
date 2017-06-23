export class Release {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  prerelease: boolean;
  assets: Asset[];
  published_at: string;
  html_url: string;
}

export interface Asset {
  browser_download_url: string;
  download_count: number;
  name: string;
}
