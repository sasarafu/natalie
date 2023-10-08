const now = ref(new Date());

setInterval(() => {
  now.value = new Date();
}, 1000);

export const useNow = () => {
  return now.value.toString();
};
