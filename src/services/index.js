import Axios from 'axios';

export const getAllPostDetails = async (pageNum) => {
  try {
    const URL = `http://hn.algolia.com/api/v1/search_by_date?tags=(story)&page=${pageNum}`;
    const response = await Axios.get(URL);
    return response.data;
  } catch (error) {
    console.log('error while getting data', error);
  }
};
