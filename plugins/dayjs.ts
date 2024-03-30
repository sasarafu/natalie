import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';

export default defineNuxtPlugin((_nuxtApp) => {
  dayjs.extend(relativeTime, {
    thresholds: [
      { l: 's', r: 59, d: 'second' },
      { l: 'm', r: 1 },
      { l: 'mm', r: 59, d: 'minute' },
      { l: 'h', r: 1 },
      { l: 'hh', r: 23, d: 'hour' },
      { l: 'd', r: 1 },
      { l: 'dd', r: 29, d: 'day' },
      { l: 'M', r: 1 },
      { l: 'MM', r: 11, d: 'month' },
      { l: 'y' },
      { l: 'yy', d: 'year' },
    ],
  });

  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    relativeTime: {
      future: '-%s',
      past: '%s',
      s: '%ds',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1mo',
      MM: '%dmo',
      y: '1y',
      yy: '%dy',
    },
  });

  return {
    provide: {
      dayjs,
    },
  };
});
