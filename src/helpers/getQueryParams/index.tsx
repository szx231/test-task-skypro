export const getParams = () => {
  // api search users start on page
  const firstPage = 1;
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page') || firstPage;
  const userLogin = urlParams.get('userLogin') || '';

  return { userLogin, page };
};
