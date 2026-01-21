'use client'

interface Experience {
  company: string
  role: string
  duration: string
  achievements: string[]
}

const experiences: Experience[] = [
  {
    company: 'Makeflow',
    role: 'ML Engineer Intern ',
    duration: 'Dec 2025 - Present',
    achievements: ['Designed and implemented an adaptive persuasion system for donation-oriented conversational AI using multi-turn dialogue control', 
      'Implemented modular persuasion strategies with dynamic escalation and trust-recovery behavior across individual dialogues.', 
      'Integrated the persuasion controller with a LLaMA-3.1–based language model, enforcing controlled response generation through system-level logic.'],
  },
  {
    company: 'KIAAR',
    role: 'ML & GIS Intern ',
    duration: '2020 - 2022',
    achievements: ['Designed an automated GIS pipeline to generate soil salinity maps over 2.5+ sq. km using multispectral satellite imagery', 
      'Extracted spectral features and validated predictions against field-measured EC and SAR ground truth.', 
      'Produced geospatial outputs adopted by researchers for soil assessment and reporting.'],
  },
]

export function ExperienceSection() {
  return (
    <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
      {experiences.map((exp, idx) => (
        <div key={idx} className="border-2 border-pixel-yellow p-3 bg-pixel-purple/10">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xs font-bold text-pixel-yellow">{exp.company}</h3>
            <span className="text-xs text-muted-foreground">{exp.duration}</span>
          </div>
          <p className="text-xs text-pixel-pink mb-2">{exp.role}</p>
          <div className="text-xs text-monitor-text ml-2 space-y-1">
            {exp.achievements.map((achievement, i) => (
              <p key={i} className="text-pixel-cyan">◆ {achievement}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
