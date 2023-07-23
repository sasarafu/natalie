import sanitizeHtml from 'sanitize-html';

export const useSanitizeHTML = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: ['a', 'p', 'span', 'br'],
    allowedAttributes: {
      a: ['href', 'rel', 'target', 'class'],
    },
    allowedIframeHostnames: [],
  });
};
