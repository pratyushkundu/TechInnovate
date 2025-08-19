// Simple test component to verify React is working
export default function TestApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Hukitola Solutions
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        React App is Working! 🎉
      </p>
      <div style={{ 
        padding: '1rem',
        border: '1px solid #333',
        borderRadius: '8px',
        backgroundColor: '#111'
      }}>
        <p>Server Status: ✅ Running</p>
        <p>React: ✅ Loaded</p>
        <p>Vite: ✅ Active</p>
      </div>
    </div>
  );
}