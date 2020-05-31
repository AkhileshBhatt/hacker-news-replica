import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { getAllPostDetails } from '../services';
import {
  timeDifference,
  saveStateToLocalStorage,
  loadStateFromLocalStorage,
} from '../common';

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const stateFromLocalStorage = loadStateFromLocalStorage();
    if (stateFromLocalStorage) {
      const { postList, currentPage, totalPage } = stateFromLocalStorage;
      setPostList(postList);
      setCurrentPage(currentPage);
      setTotalPage(totalPage);
    } else {
      getPostDetails(currentPage);
    }
  }, []);

  useEffect(() => {
    const state = Object.assign({}, { postList, currentPage, totalPage });
    saveStateToLocalStorage(state);
  }, [postList, currentPage, totalPage]);

  const getPostDetails = async (pageNum) => {
    const response = await getAllPostDetails(pageNum);
    setCurrentPage(response.page);
    setTotalPage(response.nbPages);
    setPostList(response.hits);
  };

  const onPreviousClick = () => {
    getPostDetails(currentPage - 1);
  };

  const onNextClick = () => {
    getPostDetails(currentPage + 1);
  };

  const setUpVoteCount = (id) => {
    const currentPost = postList.map((post) => {
      if (post.objectID === id) {
        post.points++;
      }
      return post;
    });
    setPostList(currentPost);
  };

  const setPostHide = (id) => {
    const currentPost = postList.filter((post) => post.objectID !== id);
    setPostList(currentPost);
    saveStateToLocalStorage();
  };

  return (
    <div>
      <table>
        <thead className='table-header'>
          <tr>
            <th>Comments</th>
            <th>Vote Count</th>
            <th>UpVote</th>
            <th>News Details</th>
          </tr>
        </thead>
        <tbody>
          {postList?.map((post, idx) => (
            <tr
              key={post.objectID}
              style={
                idx % 2 !== 0 ? { backgroundColor: 'rgb(221, 195, 185)' } : {}
              }
            >
              <td>{post.num_comments}</td>
              <td>{post.points}</td>
              <td
                className='upVote'
                onClick={() => setUpVoteCount(post.objectID)}
              >
                &#9651;
              </td>
              <td className='post-name-column'>
                <a href={post.url}>{post.title}</a>
                <span className='other-details'>
                  <a
                    href={post.url
                      ?.split('/')[0]
                      .concat('//')
                      .concat(post.url?.split('/')[2])}
                  >{`{${post.url?.split('/')[2]}}`}</a>{' '}
                  by <span className='make-bold'>{post.author}</span>{' '}
                  {`${timeDifference(
                    new Date().valueOf(),
                    new Date(post.created_at).valueOf()
                  )} ago`}
                  <span
                    className='hide-row'
                    onClick={() => setPostHide(post.objectID)}
                  >
                    [hide]
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pre-next'>
        <span
          style={
            currentPage === 0
              ? { pointerEvents: 'none', color: 'grey' }
              : { color: '#ee601e' }
          }
          onClick={onPreviousClick}
        >
          Previous
        </span>{' '}
        |{' '}
        <span
          style={
            currentPage === totalPage - 1 || currentPage === totalPage
              ? { pointerEvents: 'none', color: 'grey' }
              : { color: '#ee601e' }
          }
          onClick={onNextClick}
        >
          Next
        </span>
      </div>
      <hr className='lineBreak' />
      <Chart postList={postList} />
      <hr className='lineBreak' />
    </div>
  );
};

export default Posts;
