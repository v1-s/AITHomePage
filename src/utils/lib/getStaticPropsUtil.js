// lib/getStaticPropsUtil.js
import pageData from './pageData';

export function getStaticPropsForPage(pageName) {
  const data = pageData[pageName];
  if (!data) {
    return {
      notFound: true, // Return 404 if page data is not found
    };
  }
  return {
    props: data,
  };
}
