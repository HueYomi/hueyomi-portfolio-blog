export default function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        🚀 Hueyomi Portfolio Blog
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Personal portfolio and blog website built with Next.js
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <a href="/about" style={{ 
          padding: '10px 20px', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          textDecoration: 'none', 
          color: 'white',
          borderRadius: '5px'
        }}>
          About
        </a>
        <a href="/blog" style={{ 
          padding: '10px 20px', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          textDecoration: 'none', 
          color: 'white',
          borderRadius: '5px'
        }}>
          Blog
        </a>
        <a href="/projects" style={{ 
          padding: '10px 20px', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          textDecoration: 'none', 
          color: 'white',
          borderRadius: '5px'
        }}>
          Projects
        </a>
        <a href="/contact" style={{ 
          padding: '10px 20px', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          textDecoration: 'none', 
          color: 'white',
          borderRadius: '5px'
        }}>
          Contact
        </a>
        <a href="/test" style={{ 
          padding: '10px 20px', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          textDecoration: 'none', 
          color: 'white',
          borderRadius: '5px'
        }}>
          Test
        </a>
      </div>

      <p style={{ marginTop: '40px', opacity: 0.8 }}>
        ✅ Next.js is working perfectly!
      </p>
    </div>
  )
} 