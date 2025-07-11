import React from 'react';
import PropTypes from 'prop-types';

function ResumePage({ pageHeading = 'This is the Resume page', pageContent = 'sfsafs' }) {
  return (
    <div className="bg-gradient-my-gradient d-flex flex-column min-vh-100">
      <div className='container'>
        <h1>
          {pageHeading}
        </h1>
        <p>
          {pageContent}
        </p>
      </div>
    </div>
  );
}

export default ResumePage;

ResumePage.propTypes = {
  pageHeading: PropTypes.string,
  pageContent: PropTypes.string,
};
