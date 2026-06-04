import React from 'react'

function Jobsearch() {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Job Search</h2>
      </div>

      <form style={{ maxWidth: "450px", marginTop: "1rem" }} onSubmit={(e) => e.preventDefault()}>
        <div className="search-box-container">
          <div className="search-icon-inside">
            <svg
              style={{ width: "1rem", height: "1rem" }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="form-input search-input-box"
            placeholder="Search job roles and companies..."
            required
          />
        </div>
      </form>
    </div>
  );
}

export default Jobsearch