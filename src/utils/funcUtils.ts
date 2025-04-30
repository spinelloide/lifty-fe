export const navigateAfterSubmit = (path: string) => {
  setTimeout(() => {
    window.location.href = path;
  }, 3000);
};
