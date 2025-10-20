import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load projects from localStorage (same as admin)
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
    } else {
      // Default projects if none are saved
      setProjects([
        {
          id: '1',
          title: "News Studio Production",
          type: "image",
          url: "https://images.unsplash.com/photo-1574375927918-4c102b5c0963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Professional news studio setup with multiple cameras"
        },
        {
          id: '2',
          title: "Professional Photoshoot",
          type: "image",
          url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Studio photoshoot with professional lighting"
        },
        {
          id: '3',
          title: "Event Coverage",
          type: "video",
          url: "https://example.com/event-video.mp4",
          thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Complete event coverage with multi-angle filming"
        },
        {
          id: '4',
          title: "Commercial Production",
          type: "video",
          url: "https://example.com/commercial-video.mp4",
          thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "High-end commercial video production"
        }
      ]);
    }
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const getFileExtension = (url) => {
    if (url.startsWith('blob:')) return '';
    return url.split('.').pop().split('?')[0].toLowerCase();
  };

  const isVideoFile = (url) => {
    const extension = getFileExtension(url);
    return ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(extension);
  };

  const isAudioFile = (url) => {
    const extension = getFileExtension(url);
    return ['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(extension);
  };

  return (
    <div id="portfolio" className="portfolio-container">
      <h2 className="section-title">Our Work</h2>
      <p className="section-subtitle">A showcase of our recent productions and creative projects</p>
      
      {projects.length === 0 ? (
        <div className="no-projects-message">
          <i className="fas fa-folder-open"></i>
          <p>No projects available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="portfolio-grid">
          {projects.map(project => (
            <div key={project.id} className="portfolio-item" onClick={() => handleProjectClick(project)}>
              {project.type === 'image' && (
                <img 
                  src={project.url} 
                  alt={project.title} 
                  className="portfolio-image" 
                  onError={(e) => {
                    e.target.src = 'https://picsum.photos/seed/placeholder/400/300.jpg';
                  }}
                />
              )}
              {project.type === 'video' && (
                <div className="video-thumbnail">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="portfolio-image" />
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
              {project.type === 'music' && (
                <div className="music-thumbnail">
                  <div className="music-icon">
                    <i className="fas fa-music"></i>
                  </div>
                  <div className="music-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div className="portfolio-overlay">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
                <span className="portfolio-type">{project.type.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing projects */}
      {showModal && selectedProject && (
        <div className="portfolio-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <span className="modal-type">{selectedProject.type.toUpperCase()}</span>
            </div>
            
            <div className="modal-body">
              {selectedProject.type === 'image' && (
                <img 
                  src={selectedProject.url} 
                  alt={selectedProject.title} 
                  className="modal-image"
                />
              )}
              
              {selectedProject.type === 'video' && (
                <div className="modal-video">
                  {isVideoFile(selectedProject.url) ? (
                    <video controls autoPlay className="video-player">
                      <source src={selectedProject.url} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="video-embed">
                      <p>Video Preview</p>
                      <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="video-link">
                        <i className="fas fa-external-link-alt"></i> Open Video
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {selectedProject.type === 'music' && (
                <div className="modal-music">
                  {isAudioFile(selectedProject.url) ? (
                    <audio controls className="audio-player" autoPlay>
                      <source src={selectedProject.url} />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <div className="music-embed">
                      <p>Audio Preview</p>
                      <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="music-link">
                        <i className="fas fa-external-link-alt"></i> Open Audio
                      </a>
                    </div>
                  )}
                  <div className="music-visualizer">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <p>{selectedProject.description}</p>
              {selectedProject.fileName && (
                <p className="file-info">
                  <i className="fas fa-file"></i> {selectedProject.fileName}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;