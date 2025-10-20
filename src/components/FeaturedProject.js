// src/components/FeaturedProject.js (This is for the visitor side)
import React, { useState, useEffect } from 'react';
import './FeaturedProject.css'; // Create this CSS file

const FeaturedProject = () => {
  const [featuredProject, setFeaturedProject] = useState(null);

  useEffect(() => {
    // Load featured project from localStorage
    const savedFeatured = localStorage.getItem('featuredProject');
    if (savedFeatured) {
      setFeaturedProject(JSON.parse(savedFeatured));
    }
  }, []);

  if (!featuredProject) {
    return null; // Don't show anything if no featured project is set
  }

  return (
    <div className="featured-container">
      <h2 className="section-title">Featured Project</h2>
      <div className="featured-content">
        <div className="featured-image">
          {featuredProject.type === 'image' && (
            <img src={featuredProject.url} alt={featuredProject.title} />
          )}
          {featuredProject.type === 'video' && (
            <div className="video-thumbnail">
              {featuredProject.thumbnail ? (
                <img src={featuredProject.thumbnail} alt={featuredProject.title} />
              ) : (
                <div className="video-placeholder">
                  <i className="fas fa-video"></i>
                </div>
              )}
              <div className="play-button">
                <i className="fas fa-play"></i>
              </div>
            </div>
          )}
          {featuredProject.type === 'music' && (
            <div className="music-thumbnail">
              <i className="fas fa-music"></i>
            </div>
          )}
        </div>
        <div className="featured-info">
          <h3>{featuredProject.title}</h3>
          <p>{featuredProject.description}</p>
          <a href={featuredProject.buttonLink || '#portfolio'} className="featured-button">
            {featuredProject.buttonText || 'View Project'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;