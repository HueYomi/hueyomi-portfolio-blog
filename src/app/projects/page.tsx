export default function Projects() {
  const projects = [
    {
      id: '1',
      title: 'Portfolio Blog',
      description: 'A modern portfolio and blog website built with Next.js and Chakra UI.',
      technologies: ['Next.js', 'TypeScript', 'Chakra UI', 'React'],
      githubUrl: 'https://github.com/username/portfolio-blog',
      liveUrl: 'https://portfolio-blog.vercel.app',
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A full-stack task management application with real-time updates.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      githubUrl: 'https://github.com/username/task-app',
    },
  ]

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#333' }}>
          Projects
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          A collection of projects I've worked on.
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
        {projects.map((project) => (
          <div key={project.id} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px', 
            padding: '24px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: '#333' }}>
              {project.title}
            </h3>
            <p style={{ color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
              {project.description}
            </p>
            
            <div style={{ marginBottom: '16px' }}>
              {project.technologies.map((tech) => (
                <span key={tech} style={{
                  display: 'inline-block',
                  backgroundColor: '#e6f3ff',
                  color: '#0066cc',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  marginRight: '8px',
                  marginBottom: '4px'
                }}>
                  {tech}
                </span>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  color: '#333',
                  fontSize: '0.875rem'
                }}
              >
                📁 Code
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#0066cc',
                    color: 'white',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  🚀 Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>← Back to Home</a>
      </div>
    </div>
  )
} 