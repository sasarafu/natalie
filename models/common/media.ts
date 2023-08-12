export const mediaTypes = ['video', 'image', 'audio'] as const;

export type IMedia = {
  type: (typeof mediaTypes)[number];
  detailedType: string;
  thumbnailUrl: string;
  url: string;
  sensitive: boolean;
};
