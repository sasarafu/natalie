import sanitizeHtml from 'sanitize-html';

export const sanitizeHTML = (html: string) => {
  return sanitizeHtml(html, {
    allowedTags: ['a', 'p', 'span', 'br'],
    allowedAttributes: {
      a: ['href', 'rel', 'target', 'class'],
    },
    allowedIframeHostnames: [],
  });
};
