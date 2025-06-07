import Link from 'next/link'

export default function Contact() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#333' }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
          I'd love to hear from you! Feel free to reach out for collaborations, 
          questions, or just to say hello.
        </p>
      </div>
      
      {/* Contact Form */}
      <div style={{ 
        backgroundColor: '#f7fafc', 
        padding: '32px', 
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#333' }}>
          Send a Message
        </h2>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
              Name
            </label>
            <input 
              type="text"
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
              Email
            </label>
            <input 
              type="email"
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
              Subject
            </label>
            <input 
              type="text"
              placeholder="What's this about?"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
              Message
            </label>
            <textarea 
              placeholder="Your message..."
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: 'white',
                resize: 'vertical'
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              padding: '16px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Send Message
          </button>
        </form>
      </div>
      
      {/* Social Links */}
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#333' }}>
          Connect With Me
        </h2>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <a 
            href="mailto:contact@example.com" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#666', 
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            📧 Email
          </a>
          <a 
            href="https://github.com/username" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#666', 
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            🐙 GitHub
          </a>
          <a 
            href="https://linkedin.com/in/username" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#666', 
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            💼 LinkedIn
          </a>
          <a 
            href="https://twitter.com/username" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#666', 
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            🐦 Twitter
          </a>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>← Back to Home</Link>
      </div>
    </div>
  )
} 