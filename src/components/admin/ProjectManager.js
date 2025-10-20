import React, { useState, useEffect } from 'react';
import './ProjectManager.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [uploadAreaActive, setUploadAreaActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const MAX_FILE_SIZE = 1000 * 1024 * 1024 * 1024; // 1000GB in bytes

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setUploadAreaActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setUploadAreaActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setUploadAreaActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File "${file.name}" exceeds the 1000GB limit`);
        return;
      }

      const fileType = getFileType(file);
      if (!fileType) {
        alert(`File "${file.name}" is not a supported format`);
        return;
      }

      // Simulate upload progress
      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Create project object
          const reader = new FileReader();
          reader.onload = (e) => {
            const newProject = {
              id: fileId,
              title: file.name.split('.')[0],
              type: fileType,
              url: e.target.result,
              fileName: file.name,
              fileSize: formatFileSize(file.size),
              uploadDate: new Date().toISOString(),
              description: `Uploaded ${fileType} file`
            };

            setProjects(prev => [...prev, newProject]);
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          };
          
          if (fileType === 'image') {
            reader.readAsDataURL(file);
          } else {
            // For videos and music, we'll store metadata only
            const newProject = {
              id: fileId,
              title: file.name.split('.')[0],
              type: fileType,
              url: URL.createObjectURL(file),
              fileName: file.name,
              fileSize: formatFileSize(file.size),
              uploadDate: new Date().toISOString(),
              description: `Uploaded ${fileType} file`,
              file: file // Store file object for actual upload
            };
            setProjects(prev => [...prev, newProject]);
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }
        }
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
      }, 200);
    });
  };

  const getFileType = (file) => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
    const musicTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac'];

    if (imageTypes.includes(file.type)) return 'image';
    if (videoTypes.includes(file.type)) return 'video';
    if (musicTypes.includes(file.type)) return 'music';
    return null;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== id));
    }
  };

  const handleDownload = (project) => {
    if (project.file) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(project.file);
      link.download = project.fileName;
      link.click();
    } else {
      window.open(project.url, '_blank');
    }
  };

  return (
    <div className="project-manager">
      <div className="manager-header">
        <h2>Project Portfolio Manager</h2>
        <div className="stats">
          <span>{projects.length} Projects</span>
          <span>{projects.filter(p => p.type === 'image').length} Images</span>
          <span>{projects.filter(p => p.type === 'video').length} Videos</span>
          <span>{projects.filter(p => p.type === 'music').length} Music</span>
        </div>
      </div>

      <div className="upload-section">
        <div 
          className={`upload-area ${uploadAreaActive ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt"></i>
            <h3>Drag & Drop your files here</h3>
            <p>or</p>
            <label htmlFor="file-input" className="upload-button">
              Browse Files
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*,video/*,audio/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <p className="upload-info">
              Supported formats: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM, MOV), Music (MP3, WAV, OGG)
            </p>
            <p className="upload-limit">Maximum file size: 1000GB</p>
          </div>
        </div>

        {Object.keys(uploadProgress).length > 0 && (
          <div className="upload-progress-container">
            <h4>Uploading files...</h4>
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                <span>{Math.round(progress)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="projects-list">
        <h3>Your Projects</h3>
        {projects.length === 0 ? (
          <p className="no-projects">No projects yet. Upload your first files!</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-preview">
                  {project.type === 'image' && (
                    <img src={project.url} alt={project.title} className="project-image" />
                  )}
                  {project.type === 'video' && (
                    <div className="video-preview">
                      <video className="project-thumbnail" muted>
                        <source src={project.url} type="video/mp4" />
                      </video>
                      <div className="play-icon">▶</div>
                    </div>
                  )}
                  {project.type === 'music' && (
                    <div className="music-preview">
                      <div className="music-icon">♪</div>
                      <audio className="audio-player" controls>
                        <source src={project.url} type="audio/mpeg" />
                      </audio>
                    </div>
                  )}
                </div>
                <div className="project-info">
                  <h4 title={project.fileName}>{project.title}</h4>
                  <span className="project-type">{project.type.toUpperCase()}</span>
                  <p className="file-size">{project.fileSize}</p>
                  <p className="upload-date">
                    {new Date(project.uploadDate).toLocaleDateString()}
                  </p>
                  {project.description && <p>{project.description}</p>}
                </div>
                <div className="project-actions">
                  <button onClick={() => handleDownload(project)} className="download-button">
                    <i className="fas fa-download"></i> Download
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="delete-button">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;