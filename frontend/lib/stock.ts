interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  photographerUrl: string;
  pexelsPageUrl: string;
  width: number;
  height: number;
}

export async function searchPexelsPhotos(query: string, count = 5): Promise<PexelsPhoto[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return [];

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=portrait`,
    { headers: { Authorization: apiKey } }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const photos = Array.isArray(data?.photos) ? data.photos : [];

  return photos.map((photo: any) => ({
    id: photo.id,
    url: photo.src.large2x || photo.src.large,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    pexelsPageUrl: photo.url,
    width: photo.width,
    height: photo.height,
  }));
}
