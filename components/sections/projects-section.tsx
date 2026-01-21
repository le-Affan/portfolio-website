'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  name: string
  description: string
  tech: string
  githubLink?: string
  projectLink?: string
  aboutPoints: string[]
}

const projects: Project[] = [
  {
    name: 'GitConnect',
    description: 'GitHub collaborator recommendation system',
    tech: 'Python, Scikit-Learn, Pandas, NumPy',
    githubLink: 'https://github.com/le-Affan/github-collaborator-recommendation-system', // Placeholder - add your link
    projectLink: '#', // Placeholder - add your link
    aboutPoints: [
      'Built a content-based recommendation system to suggest potential GitHub collaborators based on developer similarity across repositories.',
      'Modeled 1,200+ GitHub developers by aggregating repository text, topic tags, and activity metrics into unified developer representations.',
      'Evaluated recommendations using embedding-distance comparisons and tag-overlap coherence to verify semantic relevance',
    ],
  },
  {
    name: 'Analytica',
    description: 'Multi-modal data analysis agent',
    tech: 'Python, LLaMA-4 Maverick, Tesseract',
    githubLink: 'https://github.com/le-Affan/Data-Analyst-Agent', // Placeholder - add your link
    projectLink: '#', // Placeholder - add your link
    aboutPoints: [
      'Built a multi-modal data analysis agent that answers queries over structured and unstructured files through a single interface.',
      'Designed a modular ingestion and processing pipeline to automatically route files to appropriate analysis, EDA, and visualization workflows.',
      'Integrated OCR and document parsing to support image and PDF-based inputs with consistent downstream processing.',
    ],
  },
  {
    name: 'Regression Pipeline',
    description: 'Reusable end-to-end regression pipeline.',
    tech: 'Python, Pandas, NumPy, Scikit-learn',
    githubLink: 'https://github.com/le-Affan/regression-pipeline', // replace if different
    projectLink: '#',
    aboutPoints: [
      'Built a clean regression pipeline from scratch modeled on the Calafornia Housing dataset',
      'Implemented and compared baseline, Linear Regression, Ridge Regression, and Decision Tree models with proper scaling and diagnostics.',
      'Used cross-validation to control model complexity and select hyperparameters, achieving strong generalization on unseen test data.'
    ],
  },
  {
    name: 'Churn Predictor',
    description: 'Reusable end-to-end classification pipeline',
    tech: 'Python, Pandas, NumPy, Scikit-learn',
    githubLink: 'https://github.com/le-Affan/telco-customer-churn-predictor', // replace if different
    projectLink: '#',
    aboutPoints: [
      'Built a complete classification pipeline on telecom dataset.',
      'Handled mixed numerical and categorical features through proper preprocessing, baseline modeling, and iterative capacity increases.',
      'Performed disciplined evaluation and error analysis, and shipped a minimal inference-ready ML system.'
    ],
  },
  {
    name: 'Crypto Sandbox',
    description: 'GitHub collaborator recommendation system',
    tech: 'Python, python-binance',
    githubLink: 'https://github.com/le-Affan/binance-bot', // Placeholder - add your link
    projectLink: '#', // Placeholder - add your link
    aboutPoints: [
      'Built an interactive crypto trading bot supporting real Binance Spot Testnet trading and mock Futures simulations.',
      'Implemented multiple order types including Market, Limit, Stop-Limit, and OCO with proper input validation and error handling.',
      'Designed a modular architecture with secure API key management, detailed logging, and a switchable Spot/Futures execution layer for safe experimentation.'
    ],
  },
  {
    name: 'OutlineX',
    description: 'Heading extractor for PDF files.',
    tech: 'Python, pdfplumber, Docker',
    githubLink: 'https://github.com/le-Affan/pdf-outline-extractor', // Placeholder - add your link
    projectLink: '#', // Placeholder - add your link
    aboutPoints: [
      'Built a PDF processing pipeline to extract document titles and hierarchical headings with page numbers for Adobe Connect The Dots Hackathon 2025.',
      'Designed rule-based classification using font size analysis, formatting cues, and regex patterns to detect structured sections.',
      'Optimized for performance and constraints by processing up to 50-page PDFs under 10 seconds using sequential page handling and Dockerized execution.'
    ],
  },
  
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {projects.map((project, idx) => (
          <motion.button
            key={idx}
            onClick={() => setSelectedProject(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left border-2 border-pixel-pink p-3 bg-pixel-purple/10 hover:bg-pixel-purple/20 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-pixel-yellow">►</span>
              <h3 className="text-xs font-bold text-pixel-pink">{project.name}</h3>
            </div>
            <div className="text-xs text-pixel-cyan ml-3 border-l-2 border-pixel-cyan pl-2">
              {project.tech}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-2xl border-4 border-pixel-purple bg-card p-6"
              style={{ boxShadow: '0 0 30px rgba(216,74,106,0.3)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-pixel-yellow mb-2" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.8)' }}>
                    {selectedProject.name}
                  </h2>
                  <p className="text-xs text-pixel-cyan">{selectedProject.tech}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-pixel-pink hover:text-pixel-cyan transition-colors text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pixel-button flex items-center gap-2 px-4 py-2 text-xs"
                >
                  <span>💻</span>
                  <span>GitHub</span>
                </a>
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pixel-button flex items-center gap-2 px-4 py-2 text-xs"
                >
                  <span>🔗</span>
                  <span>View Project</span>
                </a>
              </div>

              {/* About the Project */}
              <div className="border-2 border-pixel-cyan p-3">
                <h3 className="text-xs font-bold text-pixel-cyan mb-2">ABOUT THE PROJECT</h3>
                <div className="space-y-1">
                  {selectedProject.aboutPoints.map((point, idx) => (
                    <p key={idx} className="text-xs text-monitor-text">
                      ◆ {point}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
