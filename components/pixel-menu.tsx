'use client'

import { motion } from 'framer-motion'

interface MenuButtonProps {
  label: string
  onClick: () => void
  delay: number
  size: 'small' | 'large'
}

function MenuButton({ label, onClick, delay, size }: MenuButtonProps) {
  const sizeClasses = {
    small: 'w-24',
    large: 'w-40',
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      onClick={onClick}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.8), 0 0 40px rgba(255, 107, 157, 0.6)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'tween', duration: 0.3 }}
      className={`${sizeClasses[size]} px-4 py-3 border-2 border-pixel-cyan bg-pixel-purple hover:bg-pixel-pink text-monitor-text font-bold text-xs transition-all active:translate-y-1`}
      style={{ 
        boxShadow: '0 0 12px rgba(0, 217, 255, 0.5), 0 0 20px rgba(255, 107, 157, 0.3)',
      }}
    >
      {label}
    </motion.button>
  )
}

interface PixelMenuProps {
  onSelectMenu: (menu: string) => void
}

export function PixelMenu({ onSelectMenu }: PixelMenuProps) {
  const menuItems = [
    { label: 'ABOUT', id: 'about', size: 'small' as const },
    { label: 'PROJECTS', id: 'projects', size: 'large' as const },
    { label: 'EXPERIENCE', id: 'experience', size: 'large' as const },
    { label: 'STATS', id: 'stats', size: 'small' as const },
  ]

  return (
    <div className="flex flex-nowrap gap-4 justify-center items-center">
      {menuItems.map((item, idx) => (
        <MenuButton
          key={item.id}
          label={item.label}
          onClick={() => onSelectMenu(item.id)}
          delay={idx * 0.1}
          size={item.size}
        />
      ))}
    </div>
  )
}
