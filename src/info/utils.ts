import * as cheerio from 'cheerio';

type OpenGraphInfo = {
  title?: string;
  description?: string;
  image?: string;
  imageType?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const fetchOGInfo = async (url: string): Promise<OpenGraphInfo> => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; OpenGraphFetcher/1.0)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const ogInfo: OpenGraphInfo = {};

  ogInfo.title = $('meta[property="og:title"]').attr('content');
  ogInfo.description = $('meta[property="og:description"]').attr('content');
  ogInfo.image = $('meta[property="og:image"]').attr('content');
  ogInfo.imageType = $('meta[property="og:image:type"]').attr('content');

  const widthContent = $('meta[property="og:image:width"]').attr('content');
  const heightContent = $('meta[property="og:image:height"]').attr('content');

  ogInfo.imageWidth = widthContent ? Number.parseInt(widthContent) : undefined;
  ogInfo.imageHeight = heightContent
    ? Number.parseInt(heightContent)
    : undefined;

  return ogInfo;
};
