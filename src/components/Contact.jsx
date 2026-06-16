import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiCopy, FiMapPin } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData';

// ── EmailJS config ─────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier = 200 emails/month)
// 2. Create a service (Gmail / Outlook / etc.) → copy the Service ID
// 3. Create an email template → copy the Template ID
//    In the template body use: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Go to Account → API Keys → copy your Public Key
// Then replace the three placeholder strings below:
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

/* ─── Ripple effect on button click ─────────────────────────── */
const createRipple = (e) => {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.className = 'ripple-wave';
  circle.style.width = circle.style.height = `${size}px`;
  circle.style.left = `${e.clientX - rect.left - size / 2}px`;
  circle.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 700);
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email required';
    if (!formData.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSending(true);

    const templateParams = {
      from_name:  formData.name,
      from_email: formData.email,
      subject:    formData.subject || '(No subject)',
      message:    formData.message,
      to_email:   personalInfo.email,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setSending(false);
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 4500);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setSending(false);
        setErrors({ submit: 'Failed to send. Please try again or email me directly.' });
      });
  };

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, []);

  const inputStyle = (field) => ({
    width: '100%', padding: '13px 16px', borderRadius: 12,
    background: 'rgba(12,12,30,0.6)',
    border: `1px solid ${errors[field] ? 'rgba(239,68,68,0.45)' : focused === field ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)'}`,
    color: '#e2e8f0', fontSize: '0.9rem', outline: 'none',
    fontFamily: "'Space Grotesk', sans-serif",
    backdropFilter: 'blur(12px)',
    boxShadow: focused === field
      ? '0 0 0 3px rgba(124,58,237,0.12), 0 0 20px rgba(124,58,237,0.15)'
      : 'none',
    transition: 'all 0.25s ease',
  });

  const contactItems = [
    {
      icon: FiMail, label: 'Email', value: personalInfo.email,
      action: copyEmail, actionIcon: copied ? FiCheck : FiCopy,
      color: '#0ea5e9',
    },
    {
      icon: FiGithub, label: 'GitHub', value: 'github.com/Aditya-16-03',
      href: personalInfo.github, color: '#94a3b8',
    },
    {
      icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/badiganti-aditya-vardhan',
      href: personalInfo.linkedin, color: '#0ea5e9',
    },
    {
      icon: FiMapPin, label: 'Location', value: 'Nellimarla, Vizianagaram, AP',
      color: '#7c3aed',
    },
  ];

  return (
    <section id="contact" ref={ref} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      {/* Section aura */}
      <div className="aura-blob" style={{
        width: 700, height: 500,
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)',
        bottom: 0, left: '50%', transform: 'translateX(-50%)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 12,
          }}>
            Let's Work Together
          </h2>
          <p style={{ color: '#475569', maxWidth: 480, margin: '0 auto', fontSize: '0.93rem' }}>
            Have an exciting opportunity or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'start' }} className="contact-grid">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div style={{
              padding: '2rem', borderRadius: 20,
              background: 'rgba(10,10,28,0.65)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(24px)', marginBottom: '1.5rem',
            }}
              className="holo-card"
            >
              <h3 style={{
                color: '#f1f5f9', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                Get In Touch
              </h3>

              {contactItems.map(({ icon: Icon, label, value, action, actionIcon: ActionIcon, href, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color, flexShrink: 0,
                      boxShadow: `0 0 16px ${color}20`,
                    }}
                  >
                    <Icon size={17} />
                  </motion.div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      color: '#334155', fontSize: '0.72rem', marginBottom: 3,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{
                          color: '#64748b', fontSize: '0.84rem', textDecoration: 'none', cursor: 'none',
                          fontFamily: "'Space Grotesk', sans-serif",
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.target.style.color = color}
                        onMouseLeave={e => e.target.style.color = '#64748b'}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.84rem', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {value}
                      </span>
                    )}
                  </div>

                  {action && (
                    <motion.button
                      onClick={action}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      style={{
                        background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
                        border: copied ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 8, cursor: 'none',
                        color: copied ? '#34d399' : '#334155',
                        padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4,
                        fontSize: '0.72rem', flexShrink: 0,
                        transition: 'all 0.2s ease',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      <ActionIcon size={13} />
                      {copied ? 'Copied!' : ''}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              style={{
                padding: '1.25rem 1.5rem', borderRadius: 14,
                background: 'rgba(16,185,129,0.05)',
                border: '1px solid rgba(16,185,129,0.15)',
                display: 'flex', alignItems: 'center', gap: 14,
              }}
            >
              <div style={{
                width: 10, height: 10, borderRadius: '50%', background: '#10b981',
                boxShadow: '0 0 10px rgba(16,185,129,0.8)', flexShrink: 0,
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              <div>
                <div style={{
                  color: '#34d399', fontSize: '0.88rem', fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  Available for Work
                </div>
                <div style={{
                  color: '#334155', fontSize: '0.76rem', marginTop: 3,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  Open to SDE and AI/ML roles
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                padding: '2rem', borderRadius: 20,
                background: 'rgba(10,10,28,0.65)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(24px)',
              }}
              className="holo-card"
            >
              <h3 style={{
                color: '#f1f5f9', fontWeight: 700, marginBottom: 26, fontSize: '1.1rem',
                fontFamily: "'Space Grotesk', sans-serif",
              }}>
                Send a Message
              </h3>

              <div className="form-row" style={{ marginBottom: '1rem' }}>
                <div>
                  <input
                    type="text" placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('name')}
                  />
                  {errors.name && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 5, fontFamily: "'JetBrains Mono', monospace" }}>{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email" placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    style={inputStyle('email')}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 5, fontFamily: "'JetBrains Mono', monospace" }}>{errors.email}</p>}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text" placeholder="Subject (optional)"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                  style={inputStyle('subject')}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                />
                {errors.message && <p style={{ color: '#ef4444', fontSize: '0.72rem', marginTop: 5, fontFamily: "'JetBrains Mono', monospace" }}>{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                onClick={!sending && !sent ? createRipple : undefined}
                whileHover={!sending && !sent ? { scale: 1.02, boxShadow: '0 0 40px rgba(124,58,237,0.5)' } : {}}
                whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                className="ripple-btn"
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: 12,
                  background: sent
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                  border: 'none', color: 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '0.95rem', cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.4s ease',
                  opacity: sending ? 0.8 : 1,
                  boxShadow: sent ? '0 0 30px rgba(16,185,129,0.4)' : '0 0 20px rgba(124,58,237,0.3)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {sent ? (
                  <><FiCheck size={16} /> Message Sent!</>
                ) : sending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: 16, height: 16,
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white', borderRadius: '50%',
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </motion.button>

              {errors.submit && (
                <p style={{
                  color: '#ef4444', fontSize: '0.78rem', marginTop: 10, textAlign: 'center',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {errors.submit}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1.2fr !important; }
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
