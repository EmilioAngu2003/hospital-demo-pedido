export const useHover = (open, close, delay = 200) => {
  const isMouse = () => window.matchMedia("(pointer: fine)").matches;

  const onMouseEnter = () => isMouse() && open();
  const onMouseLeave = () => isMouse() && close(delay);

  return { onMouseEnter, onMouseLeave };
};
