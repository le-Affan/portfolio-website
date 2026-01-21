'use client'

interface Project {
  name: string
  description: string
  tech: string
}

const projects: Project[] = [
  {
    name: 'Project Alpha',
    description: 'A revolutionary web app',
    tech: 'React, Node.js, MongoDB',
  },
  {
    name: 'Project Beta',
    description: 'Real-time collaboration tool',
    tech: 'Next.js, WebSocket, PostgreSQL',
  },
  {
    name: 'Project Gamma',
    description: 'Mobile-first dashboard',
    tech: 'React Native, Firebase',
  },
]

export function ProjectsSection() {
  return (
    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
      {projects.map((project, idx) => (
        <div key={idx} className="border-2 border-pixel-pink p-3 bg-pixel-purple/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-pixel-yellow">►</span>
            <h3 className="text-xs font-bold text-pixel-pink">{project.name}</h3>
          </div>
          <p className="text-xs text-monitor-text ml-3 mb-1">{project.description}</p>
          <div className="text-xs text-pixel-cyan ml-3 border-l-2 border-pixel-cyan pl-2">
            {project.tech}
          </div>
        </div>
      ))}
    </div>
  )
}
