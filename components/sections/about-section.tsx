'use client'

export function AboutSection() {
  const toHref = (label: string, raw: string) => {
    const trimmed = raw.trim()

    if (label.toLowerCase() === 'email') {
      return `mailto:${trimmed}`
    }

    if (label.toLowerCase() === 'whatsapp') {
      // Convert "+91 9167870478" -> "919167870478"
      const digits = trimmed.replace(/[^\d]/g, '')
      return `https://wa.me/${digits}`
    }

    // If it's already a full URL, use it as-is; otherwise assume https.
    if (/^https?:\/\//i.test(trimmed)) return trimmed
    return `https://${trimmed}`
  }

  const socialLinks = [
    { label: 'GitHub', icon: '💻', placeholder: 'https://github.com/le-Affan', display: 'le-Affan' },
    { label: 'LinkedIn', icon: '🔗', placeholder: 'https://www.linkedin.com/in/affan-shaikh-ml/', display: 'affan-shaikh-ml' },
    { label: 'WhatsApp', icon: '📱', placeholder: '+91 9167870478' },
    { label: 'LeetCode', icon: '⚡', placeholder: 'https://leetcode.com/u/le-Affan/', display: 'le-Affan' },
    { label: 'Email', icon: '✉️', placeholder: 'shaikhaffan.work@gmail.com' },
  ]

  return (
    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
      {/* Profile Section */}
      <div className="border-2 border-pixel-cyan p-4 text-center">
        <div className="w-24 h-24 mx-auto mb-4 border-2 border-pixel-cyan bg-pixel-purple/20 flex items-center justify-center">
          <img src="/profile.jpeg" alt="Affan profile" className="w-24 h-24 object-cover" />
        </div>
        <h2 className="text-lg font-bold text-pixel-cyan mb-1">Affan Shaikh</h2>
        <p className="text-sm text-pixel-pink mb-2">Software Developer</p>
        <p className="text-xs text-monitor-text/80">Education: B.Tech AI & Data Science</p>
      </div>

      {/* Bio Section */}
      {/*
      <div className="border-2 border-pixel-purple p-3">
        <h3 className="text-xs font-bold text-pixel-purple mb-2">ABOUT ME</h3>
        <p className="text-xs text-monitor-text">Passionate developer building amazing digital experiences with modern web technologies. Experienced in full stack development with focus on creating scalable and user-friendly applications.</p>
      </div>
      */}
      
      {/* Social Links */}
      <div className="border-2 border-pixel-pink p-3">
        <h3 className="text-xs font-bold text-pixel-pink mb-2">CONNECT WITH ME</h3>
        <div className="grid grid-cols-1 gap-2">
          {socialLinks.map((link) => {
            const href = toHref(link.label, link.placeholder)
            const isExternal = /^https?:\/\//i.test(href)
            const displayText = link.display ?? link.placeholder

            return (
              <a
                key={link.label}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer noopener' : undefined}
                className="pixel-button w-full flex items-center justify-between gap-3"
                aria-label={`${link.label}: ${link.placeholder}`}
                title={link.placeholder}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base leading-none">{link.icon}</span>
                  <span className="text-[10px] md:text-xs">{link.label}</span>
                </span>
                <span className="text-[10px] md:text-xs text-monitor-text/80 truncate max-w-[55%]">
                  {displayText}
                </span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Skills Section */}
      {/*}
      <div className="border-2 border-pixel-cyan p-3">
        <h3 className="text-xs font-bold text-pixel-cyan mb-2">SKILLS</h3>
        <div className="text-xs text-monitor-text space-y-1">
          <p>◆ React / Next.js</p>
          <p>◆ TypeScript</p>
          <p>◆ Tailwind CSS</p>
          <p>◆ Full Stack Web Dev</p>
        </div>
      </div>
      */}
    </div>
  )
}
