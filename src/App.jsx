import React, { useState } from "react";

// Main App Component
export default function App() {
  // State variables to manage input, user data, loading, and errors
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch user data from the GitHub API
  const fetchUserData = async () => {
    if (!username) {
      setError("Please enter a username.");
      return;
    }
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found. Check the username and try again.");
        }
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  // SVG Icon for location
  const LocationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  // SVG Icon for company/organization
  const CompanyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="2" ry="2" />
      <path d="M6 9h4" />
      <path d="M6 15h4" />
      <path d="M14 9h4" />
      <path d="M14 15h4" />
    </svg>
  );

  // SVG Icon for GitHub
  const GitHubIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <div className="app-container">
      <div className="main-content">
        <h1 className="title">GitHub User Finder</h1>
        <p className="subtitle">
          Enter a username to fetch their profile details.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., octocat"
            className="search-input"
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="display-area">
          {error && <div className="error-message">{error}</div>}

          {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}

          {userData && (
            <div className="user-card animate-fade-in">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="avatar"
              />
              <div className="user-info">
                <h2 className="user-name">{userData.name}</h2>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="user-login"
                >
                  @{userData.login}
                </a>
                <p className="user-bio">
                  {userData.bio || "This user has no bio."}
                </p>

                <div className="user-meta">
                  {userData.company && (
                    <span className="meta-item">
                      <CompanyIcon /> {userData.company}
                    </span>
                  )}
                  {userData.location && (
                    <span className="meta-item">
                      <LocationIcon /> {userData.location}
                    </span>
                  )}
                </div>

                <div className="user-stats">
                  <div className="stat-item">
                    <p className="stat-number">{userData.public_repos}</p>
                    <p className="stat-label">Repositories</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">{userData.followers}</p>
                    <p className="stat-label">Followers</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">{userData.following}</p>
                    <p className="stat-label">Following</p>
                  </div>
                </div>

                <div className="profile-button-container">
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-button"
                  >
                    <GitHubIcon />
                    <span>View Profile on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        /*
          This rule ensures the app's container can expand to the full
          height of the screen, which is necessary for vertical centering.
        */
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden; /* Prevent horizontal scroll */
        }

        /* General Styles */
        .app-container {
          background-color: #111827;
          min-height: 100%;
          width: 100%;
          color: white;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
        }
        .main-content {
          width: 100%;
          max-width: 56rem; /* 896px - Increased width for larger screens */
          margin: 0 auto;
        }
        .title {
          font-size: 2.25rem; /* 36px */
          font-weight: bold;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: #9CA3AF; /* gray-400 */
          text-align: center;
          margin-bottom: 2rem;
        }
        
        /* Search Form */
        .search-form {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-direction: column;
        }
        .search-input {
          width: 100%;
          padding: 0.75rem;
          background-color: #1F2937; /* gray-800 */
          border: 1px solid #374151; /* gray-700 */
          border-radius: 0.5rem;
          transition: all 0.2s;
          color: white;
          box-sizing: border-box;
        }
        .search-input::placeholder {
          color: #6B7280; /* gray-500 */
        }
        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 2px #3B82F6; /* ring-blue-500 */
        }
        .search-button {
          background-color: #2563EB; /* blue-600 */
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .search-button:hover {
          background-color: #1D4ED8; /* blue-700 */
        }
        .search-button:disabled {
          background-color: #1E3A8A; /* blue-800 */
          cursor: not-allowed;
        }
        
        /* Display Area */
        .display-area {
          min-height: 28rem; /* Use min-height to allow it to grow */
        }
        .error-message {
          background-color: rgba(127, 29, 29, 0.5); /* bg-red-900/50 */
          color: #FCA5A5; /* red-300 */
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
        }
        .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            min-height: 28rem;
        }
        .loader {
            animation: spin 1s linear infinite;
            border-radius: 50%;
            width: 4rem; /* h-16 w-16 */
            height: 4rem;
            border-top: 2px solid #3B82F6; /* border-blue-500 */
            border-bottom: 2px solid #3B82F6;
            border-left: 2px solid transparent;
            border-right: 2px solid transparent;
        }
        
        /* User Card */
        .user-card {
          background-color: #1F2937; /* gray-800 */
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .avatar {
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          border: 4px solid #374151; /* gray-700 */
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .user-info {
          flex-grow: 1;
          text-align: center;
          width: 100%;
        }
        .user-name {
          font-size: 1.875rem;
          font-weight: bold;
        }
        .user-login {
          font-size: 1.25rem;
          color: #60A5FA; /* blue-400 */
          text-decoration: none;
        }
        .user-login:hover {
          text-decoration: underline;
        }
        .user-bio {
          color: #D1D5DB; /* gray-300 */
          margin-top: 0.75rem;
        }
        .user-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 1.5rem;
          margin-top: 1rem;
          color: #9CA3AF; /* gray-400 */
          font-size: 0.875rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
        }
        .meta-item svg {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.5rem;
            color: #9CA3AF; /* gray-400 */
        }
        .user-stats {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
          background-color: rgba(17, 24, 39, 0.5); /* bg-gray-900/50 */
          padding: 1rem;
          border-radius: 0.5rem;
        }
        .stat-item {
          text-align: center;
          min-width: 70px;
        }
        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .stat-label {
          font-size: 0.875rem;
          color: #9CA3AF; /* gray-400 */
        }
        
        .profile-button-container {
            margin-top: 1.5rem;
            text-align: center;
        }
        .profile-button {
          display: inline-flex;
          align-items: center;
          background-color: #374151; /* gray-700 */
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: background-color 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .profile-button:hover {
            background-color: #4B5563; /* gray-600 */
        }
        .profile-button svg {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: 0.5rem;
        }
        
        /* Animations */
        .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Responsive Design */
        @media (min-width: 640px) {
            .title {
                font-size: 3rem;
            }
            .search-form {
                flex-direction: row;
            }
            .user-card {
                flex-direction: row;
                align-items: flex-start;
                text-align: left;
            }
            .user-info {
                text-align: left;
            }
            .user-meta, .user-stats, .profile-button-container {
                justify-content: flex-start;
            }
        }
      `}</style>
    </div>
  );
}
