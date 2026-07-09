import React, { useEffect } from 'react';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Prevent body scroll when modal is open + handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998,
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '500px',
    width: 'calc(100vw - clamp(16px, 3vw, 32px))',
    maxHeight: '92vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    animation: 'slideUp 0.3s ease-out',
    position: 'relative',
    zIndex: 9999,
  };

  const modalHeaderStyle: React.CSSProperties = {
    padding: 'clamp(12px, 3vw, 32px) clamp(12px, 3vw, 24px) 0 clamp(12px, 3vw, 24px)',
    paddingRight: '40px',
    flexShrink: 0,
  };

  const modalContentStyle: React.CSSProperties = {
    overflow: 'auto',
    flex: 1,
    padding: '0 clamp(12px, 3vw, 24px) clamp(12px, 3vw, 32px) clamp(12px, 3vw, 24px)',
  };

  const closeButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'clamp(12px, 3vw, 16px)',
    right: 'clamp(12px, 3vw, 16px)',
    background: 'none',
    border: 'none',
    fontSize: 'clamp(24px, 5vw, 28px)',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 150ms ease',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(11px, 2.5vw, 14px)',
    color: '#6b7280',
    margin: '0 0 12px 0',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 'clamp(12px, 2.5vw, 28px)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 3.5vw, 16px)',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '6px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'clamp(12px, 3vw, 14px)',
    color: '#4b5563',
    lineHeight: '1.5',
    margin: 0,
  };

  const linkStyle: React.CSSProperties = {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 150ms ease',
  };

  const linkListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const linkItemStyle: React.CSSProperties = {
    marginBottom: 'clamp(8px, 2vw, 10px)',
  };

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: 'clamp(16px, 3vw, 24px) 0',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 20px)',
    fontSize: 'clamp(12px, 3vw, 14px)',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 150ms ease',
  };

  return (
    <>
      {/* Modal Overlay */}
      <div style={modalOverlayStyle} onClick={onClose} />

      {/* Modal Content */}
      <div style={modalStyle}>
        {/* Fixed Header */}
        <div style={modalHeaderStyle}>
          <button
            style={closeButtonStyle}
            onClick={onClose}
            title="Close"
            onMouseEnter={(e) => {
              if (e.currentTarget) e.currentTarget.style.color = '#1f2937';
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) e.currentTarget.style.color = '#6b7280';
            }}
          >
            ✕
          </button>

          <h2 style={titleStyle}>About the Creator</h2>
          <p style={subtitleStyle}>Igal Krigel - Full Stack Developer</p>
        </div>

        {/* Scrollable Content */}
        <div style={modalContentStyle}>
          {/* Bio Section */}
          <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Who I Am</h3>
          <p style={textStyle}>
            I'm a full-stack developer passionate about building elegant, performant tools for the JavaScript ecosystem.
            DevKit Console was born from frustration with debugging workflows that break the flow of development.
            I believe great debugging tools should be invisible—they should get out of your way and just work.
          </p>
        </div>

        {/* Current Work */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>What I'm Working On</h3>
          <p style={textStyle}>
            Currently focused on React ecosystem tooling, data visualization, and developer experience (DX) improvements.
            I'm always exploring ways to make debugging, testing, and monitoring feel natural and intuitive.
          </p>
        </div>

        {/* Portfolio & Links */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Portfolio & Projects</h3>
          <ul style={linkListStyle}>
            <li style={linkItemStyle}>
              <a
                href="https://github.com/ikrigel"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'none';
                }}
              >
                GitHub Profile
              </a>
            </li>
            <li style={linkItemStyle}>
              <a
                href="https://github.com/ikrigel/devkit-console"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'none';
                }}
              >
                DevKit Console Repository
              </a>
            </li>
            <li style={linkItemStyle}>
              <a
                href="https://south-lebanon-map.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'none';
                }}
              >
                South Lebanon Map (React + Leaflet)
              </a>
            </li>
            <li style={linkItemStyle}>
              <a
                href="https://www.npmjs.com/~ikrigel"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  if (e.currentTarget) e.currentTarget.style.textDecoration = 'none';
                }}
              >
                NPM Profile
              </a>
            </li>
          </ul>
        </div>

        <div style={dividerStyle} />

        {/* Contact/Support */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Get in Touch</h3>
          <p style={textStyle}>
            Found a bug? Have a feature request? Open an issue on GitHub or reach out via{' '}
            <a
              href="mailto:ikrigel@gmail.com"
              style={linkStyle}
              onMouseEnter={(e) => {
                if (e.currentTarget) e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                if (e.currentTarget) e.currentTarget.style.textDecoration = 'none';
              }}
            >
              email
            </a>
            .
          </p>
        </div>

          <button
            style={buttonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              if (e.currentTarget) e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
