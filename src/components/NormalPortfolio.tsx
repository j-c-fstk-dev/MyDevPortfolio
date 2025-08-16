"use client";

import { useState, useEffect } from "react";

interface NormalPortfolioProps {
  onExitMatrix: () => void;
}

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveDemoLink?: string;
  codeLink?: string;
}

interface Job {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function NormalPortfolio({
  onExitMatrix
}: NormalPortfolioProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const skills: { [key: string]: Skill[] } = {
    'Programming Languages': [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'C++', level: 60 },
      { name: 'SQL', level: 80 },
    ],
    'Front-end': [
      { name: 'React', level: 92 },
      { name: 'Angular', level: 70 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
    ],
    'Back-end': [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 85 },
      { name: 'Spring Boot (Java)', level: 65 },
    ],
    'Databases': [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Firebase Firestore', level: 85 },
      { name: 'SQL Server', level: 70 },
    ],
    'Tools & Platforms': [
      { name: 'Git (GitHub)', level: 90 },
      { name: 'Firebase', level: 85 },
      { name: 'Docker (basic)', level: 50 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Cloud Platforms (GCP)', level: 60 },
      { name: 'SEO principles', level: 70 },
      { name: 'CMS', level: 75 },
    ],
    'AI/ML & Development Environments': [
      { name: 'AI/ML/LLM Concepts', level: 75 },
      { name: 'Gemini', level: 80 },
      { name: 'Claude', level: 70 },
      { name: 'ChatGPT', level: 85 },
      { name: 'Grok', level: 60 },
      { name: 'GitHub Copilot', level: 85 },
      { name: 'Manus', level: 60 },
      { name: 'Firebase (IDE/Platform)', level: 85 },
      { name: 'Cursor', level: 70 },
      { name: 'Onlook', level: 65 },
      { name: 'Jarvis (familiarity/exploration)', level: 55 },
      { name: 'VS Code', level: 95 },
    ],
    'Web3 Technologies (Exploring)': [
      { name: 'Blockchain Concepts', level: 70 },
      { name: 'DApps', level: 65 },
      { name: 'Smart Contracts', level: 60 },
      { name: 'NFTs', level: 60 },
      { name: 'DeFi', level: 60 },
    ],
  };

  const projects: Project[] = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI/UX",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "🛒",
      liveDemoLink: "#",
      codeLink: "https://github.com/j-c-fstk-dev/"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      image: "📋",
      liveDemoLink: "#",
      codeLink: "https://github.com/j-c-fstk-dev/"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather tracking application",
      tech: ["React", "API Integration", "Charts.js"],
      image: "🌤️",
      liveDemoLink: "#",
      codeLink: "https://github.com/j-c-fstk-dev/"
    }
  ];

  const experience: Job[] = [
    {
      title: "Content Creator/ Social Media Administrator",
      company: "NftreesBrasil, Beregenerative.life, Greenpill Brasil, ReFIDAO",
      period: "2021 – 2025 (3 years)",
      description:
        "Developed and maintained digital content infrastructure for Web3 projects, including blogs and marketing platforms. Implemented SEO strategies to optimize content visibility and audience reach. Contributed to the development of technical documentation for blockchain and decentralized platforms, ensuring clarity and accuracy of complex information. Managed community platforms, requiring effective technical communication and problem-solving in a dynamic environment. Engaged in building specific applications within this ecosystem.",
    },
    {
      title: "Owner",
      company: "Brincando em Família Ateliê",
      period: "2019 – 2025 (8 years)",
      description:
        "Managed and optimized e-commerce platforms, overseeing product presentation and customer engagement. Implemented digital marketing strategies including social media campaigns and email marketing, often involving custom content and integration. Created and managed website content and product descriptions, applying principles of user experience and clear communication. Involved in the creation and maintenance of company websites.",
    },
    {
      title: "Train Operator",
      company: "Estrada de Ferro Campos do Jordão",
      period: "2015 – 2023 (8 years)",
      description:
        "Developed strong problem-solving skills in troubleshooting and operating complex electromechanical systems. Honed attention to detail and adherence to strict protocols, crucial for system integrity and safety. Practiced clear and concise communication in high-pressure public-facing roles.",
    },
    {
      title: "Engineering Assistant",
      company: "Zodiac Pharmaceutics",
      period: "2010 – 2014 (4 years)",
      description:
        "Contributed to the creation and optimization of technical systems (e.g., cost control, maintenance orders). Gained experience in technical documentation and process improvement, skills directly transferable to software development lifecycle. Managed technical workflows, demonstrating organizational and analytical abilities.",
    },
  ];

  const whatIDo = [
    "Full-Stack Web Development",
    "AI/ML & Web3 Concepts and Application",
    "Proficiency in JavaScript, TypeScript, Python, C++",
    "Front-end (React, Angular, Tailwind CSS, HTML5, CSS3)",
    "Back-end (Node.js, Express.js, Spring Boot)",
    "Databases (PostgreSQL, MySQL, MongoDB, Firebase Firestore, SQL Server)",
    "Cloud Platforms (GCP)",
    "RESTful API Development",
    "Technical Documentation & Content Creation",
  ];

  const quickFacts = [
    "Rapid Learning & Adaptability (especially in emerging tech)",
    "Exceptional Problem-Solving",
    "Proactive Information Seeking & Research",
    "Strong Independent Work Ethic",
    "Effective Collaboration (when in groups)",
    "Analytical & Observational",
    "Visionary & Innovative Thinking",
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans" data-oid="prym87p">
      {/* Hidden Matrix Exit Button */}
      <button
        onClick={onExitMatrix}
        className="fixed bottom-4 right-4 w-12 h-12 bg-black/5 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black/10 transition-all duration-300 z-50 group opacity-20 hover:opacity-100"
        title="Exit Matrix"
        data-oid="vjkkr8:"
      >
        <span className="text-red-500 group-hover:animate-pulse" data-oid="e-0rzdt">
          🔴
        </span>
      </button>

      {/* Navigation */}
      <nav className="bg-[#1A1A1A] shadow-sm border-b border-gray-700 sticky top-0 z-40" data-oid=".-.9iqw">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="jn0jkvb">
          <div className="flex justify-between items-center h-16" data-oid="tcv_1sf">
            <div className="flex items-center" data-oid="z8gzq9v">
              <h1 className="text-xl font-bold text-[#FFFFFF]" data-oid="f4-abg2">
                Jorge Augusto Medeiros Lopes
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8" data-oid="m.cfk__">
              {["about", "skills", "projects", "experience", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === section ? "text-[#00F0FF] border-b-2 border-[#00F0FF]" : "text-[#FFFFFF] hover:text-[#D1D1D1]"
                    }`}
                    data-oid="vdi0pry"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden" data-oid="._t_4.y">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#FFFFFF] hover:text-[#D1D1D1] focus:outline-none"
                data-oid="46i9t17"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="l.ze13t">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    data-oid="4kfnd4m"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-700" data-oid="2us4wag">
              <div className="px-2 pt-2 pb-3 space-y-1" data-oid="rygl9uc">
                {["about", "skills", "projects", "experience", "contact"].map(
                  (section) => (
                    <button
                      key={section}
                      onClick={() => {
                        setActiveSection(section);
                        setIsMenuOpen(false);
                      }}
                      className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                        activeSection === section ? "text-[#00F0FF] bg-[#0A0A0A]" : "text-[#FFFFFF] hover:text-[#D1D1D1] hover:bg-[#1A1A1A]"
                      }`}
                      data-oid="-:j_:hf"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16" data-oid="dd.0lhw">
        {/* About Section */}
        {activeSection === "about" && (
          <div className="space-y-8 bg-[#1A1A1A] p-8 rounded-lg shadow-xl text-[#FFFFFF]" data-oid="9jdtwad">
            <div className="text-center" data-oid="vf64c4g">
            <div
  className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden"
  data-oid=":d-oc1z"
>
  <img
    src="https://res.cloudinary.com/dr0weongo/image/upload/v1754567145/1kjsy9_mqwlus.jpg"
    alt="Profile Picture"
    className="w-full h-full object-cover"
  />
</div>
              <h2 className="text-3xl font-bold mb-4 text-[#00F0FF]" data-oid="es03ijs">
                Jorge Augusto Medeiros Lopes (Professional Name: Jorge Cristo) | Full-Stack Developer | AI/ML & Web3 Enthusiast
              </h2>
              <p className="text-xl text-[#D1D1D1] max-w-2xl mx-auto" data-oid="o1ovjdy">
                Highly motivated and self-taught Full-Stack Developer with a strong passion for building innovative digital solutions, particularly at the intersection of web development, Web3 technologies, and artificial intelligence. Proficient across a wide range of programming languages, frameworks, and databases, with a keen interest in Machine Learning, Large Language Models (LLMs), and cloud platforms. My diverse background, including engineering and content creation, has cultivated exceptional problem-solving abilities, a proactive approach to learning, and a talent for transforming complex ideas into functional applications and engaging user experiences. Actively working on personal projects and a dedicated portfolio to showcase a robust and versatile skill set.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12" data-oid="-ziip7n">
              <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#00F0FF] text-[#D1D1D1]" data-oid="i9c_boo">
                <h3 className="text-xl font-semibold mb-4 text-[#FFFFFF]" data-oid="duy.zkp">
                  What I Do
                </h3>
                <ul className="space-y-2" data-oid=".i-bmq1">
                  {whatIDo.map((item, index) => (
                    <li key={index} data-oid={`what-i-do-${index}`}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#00F0FF] text-[#D1D1D1]" data-oid="33k7j17">
                <h3 className="text-xl font-semibold mb-4 text-[#FFFFFF]" data-oid="oiv06x7">
                  Quick Facts
                </h3>
                <ul className="space-y-2" data-oid="n.9xnek">
                  {quickFacts.map((item, index) => (
                    <li key={index} data-oid={`quick-fact-${index}`}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Links */}
            <div className="mt-8 space-y-4 text-center">
              <h3 className="text-2xl font-bold text-[#00F0FF] mb-4">
                Get in Touch
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:jorge.dev.c@gmail.com"
                  className="flex items-center space-x-3 text-[#FFFFFF] hover:text-[#00F0FF] transition-colors duration-200"
                >
                  <span className="text-xl">📧</span>
                  <span>jorge.dev.c@gmail.com</span>
                </a>
                <a
                  href="tel:+5512982549745"
                  className="flex items-center space-x-3 text-[#FFFFFF] hover:text-[#00F0FF] transition-colors duration-200"
                >
                  <span className="text-xl">📱</span>
                  <span>+55 (12) 98254-9745</span>
                </a>
                <a
                  href="https://github.com/j-c-fstk-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[#FFFFFF] hover:text-[#00F0FF] transition-colors duration-200"
                >
                  <span className="text-xl">🐙</span>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://jcdevportfolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-[#FFFFFF] hover:text-[#00F0FF] transition-colors duration-200"
                >
                  <span className="text-xl">🌐</span>
                  <span>Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="space-y-8 bg-[#1A1A1A] p-8 rounded-lg shadow-xl text-[#FFFFFF]" data-oid="0r5.8jb">
            <div className="text-center" data-oid="8t51:yb">
              <h2 className="text-3xl font-bold text-[#00F0FF] mb-4" data-oid="yvx9dwn">
                Skills & Technologies
              </h2>
              <p className="text-[#D1D1D1] max-w-2xl mx-auto" data-oid="dgauhgz">
                Here are the technologies I work with regularly and my
                proficiency levels.
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6" data-oid="2nhj:l1">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="bg-[#0A0A0A] p-6 rounded-lg border border-[#00F0FF] shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-[#FFFFFF]">{category}</h3>
                  <div className="space-y-4">
                    {skillList.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-[#D1D1D1]">{skill.name}</span>
                          <span className="text-sm text-[#D1D1D1]">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-[#0A0A0A] rounded-full h-2 border border-[#00F0FF]">
                          <div className="bg-[#00F0FF] h-2 rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div className="space-y-8 bg-[#1A1A1A] p-8 rounded-lg shadow-xl text-[#FFFFFF]" data-oid="zz2gvjz">
            <div className="text-center mb-8" data-oid="auznvj.">
              <h2 className="text-3xl font-bold text-[#00F0FF] mb-4" data-oid="tt_xo1u">
                Featured Projects
              </h2>
              <p className="text-[#D1D1D1] max-w-2xl mx-auto" data-oid="yq3v0z-">
                Actively developing a comprehensive online portfolio showcasing various full-stack applications and projects. Numerous personal projects available on GitHub, demonstrating proficiency in diverse technologies and problem-solving approaches. Examples include Web3 applications, AI-powered tools, and various web development projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="j4mrsqq">
              {projects.map((project: Project, index: number) => (
                <div
                  key={index}
                  className="bg-[#0A0A0A] border border-[#00F0FF] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
                  data-oid="2_9hned"
                >
                  <div className="p-6" data-oid="2bjv:2o">
                    <div className="text-4xl mb-4" data-oid="70t93q9">
                      {project.image}
                    </div>
                    <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2" data-oid="7womn7y">
                      {project.title}
                    </h3>
                    <p className="text-[#D1D1D1] mb-4" data-oid="d6jkw9_">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2" data-oid=".u68ojx">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-[#1A1A1A] text-[#00F0FF] text-xs rounded-full border border-[#00F0FF]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-[#0A0A0A] border-t border-[#00F0FF] mt-auto flex justify-between items-center" data-oid="nwuby7p">
                    {project.liveDemoLink && (
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00F0FF] hover:underline text-sm font-medium flex items-center space-x-1"
                      >
                        <span>🌐</span>
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00F0FF] hover:underline text-sm font-medium flex items-center space-x-1"
                      >
                        <span>&lt;/&gt;</span>
                        <span>Code</span>
                      </a>
                    )}
                    {!project.liveDemoLink && !project.codeLink && (
                      <a
                        href="https://github.com/j-c-fstk-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00F0FF] hover:underline text-sm font-medium"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === "experience" && (
          <div className="space-y-8 bg-[#1A1A1A] p-8 rounded-lg shadow-xl text-[#FFFFFF]" data-oid="i1tq4if">
            <div className="text-center" data-oid="cm0j06d">
              <h2 className="text-3xl font-bold text-[#00F0FF] mb-4" data-oid="q.f6zvv">
                Work Experience
              </h2>
              <p className="text-[#D1D1D1] max-w-2xl mx-auto" data-oid="ul_rh__">
                My professional journey and key accomplishments.
              </p>
            </div>

            <div className="space-y-6" data-oid="xyfb9qc">
              {experience.map((job: Job, index: number) => (
                <div
                  key={index}
                  className="bg-[#0A0A0A] border border-[#00F0FF] p-6 rounded-lg shadow-sm text-[#D1D1D1]"
                  data-oid="8ntdogj"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4" data-oid="6vsy0ft">
                    <div data-oid="jz26rxs">
                      <h3 className="text-xl font-semibold text-[#FFFFFF]" data-oid="3:zr6a8">
                        {job.title}
                      </h3>
                      <p className="text-[#00F0FF] font-medium" data-oid="s.e_6ep">
                        {job.company}
                      </p>
                    </div>
                    <span className="text-[#D1D1D1] text-sm mt-2 md:mt-0" data-oid="qh.tvcn">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-[#D1D1D1]" data-oid="fg25cte">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <div className="space-y-8 bg-[#1A1A1A] p-8 rounded-lg shadow-xl text-[#FFFFFF]" data-oid="sdounft">
            <div className="text-center" data-oid="74ol6sr">
              <h2 className="text-3xl font-bold text-[#00F0FF] mb-4" data-oid="d8c813e">
                Get In Touch
              </h2>
              <p className="text-[#D1D1D1] max-w-2xl mx-auto" data-oid="8we85ow">
                I'm always interested in new opportunities and collaborations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8" data-oid="5vxj70z">
              <div className="space-y-6" data-oid="hgnt3k.">
                <div className="flex items-center space-x-4 text-[#D1D1D1]" data-oid="2nkbnzb">
                  <div
                    className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center text-[#00F0FF] text-2xl border border-[#00F0FF]"
                    data-oid="gsb692a"
                  >
                    📧
                  </div>
                  <div data-oid="p.fu-ak">
                    <h3 className="font-semibold text-[#FFFFFF]" data-oid="p-w7on4">
                      Email
                    </h3>
                    <p className="text-[#D1D1D1]" data-oid="w4bvzjz">
                      jorge.dev.c@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-[#D1D1D1]" data-oid="ff0:s9d">
                  <div
                    className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center text-[#00F0FF] text-2xl border border-[#00F0FF]"
                    data-oid="p8n:5-_"
                  >
                    📱
                  </div>
                  <div data-oid="4.a-.qt">
                    <h3 className="font-semibold text-[#FFFFFF]" data-oid="lje.qm2">
                      Phone
                    </h3>
                    <p className="text-[#D1D1D1]" data-oid="rxfprj2">
                      +55 (12) 98254-9745
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-[#D1D1D1]" data-oid="zrrlovq">
                  <div
                    className="w-12 h-12 bg-[#0A0A0A] rounded-full flex items-center justify-center text-[#00F0FF] text-2xl border border-[#00F0FF]"
                    data-oid="2vi4el:"
                  >
                    🐙
                  </div>
                  <div data-oid="bj8ea-i">
                    <h3 className="font-semibold text-[#FFFFFF]" data-oid="1h:c_qk">
                      GitHub
                    </h3>
                    <p className="text-[#D1D1D1]">
                      github.com/j-c-fstk-dev/
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-4" data-oid=".xswkka">
                <div data-oid="2mh1h-g">
                  <label className="block text-sm font-medium text-[#D1D1D1] mb-1" data-oid="h231_xv">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-[#00F0FF] rounded-md bg-[#0A0A0A] text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
                    placeholder="Your name"
                    data-oid="18c.te1"
                  />
                </div>

                <div data-oid="ue-.vzw">
                  <label className="block text-sm font-medium text-[#D1D1D1] mb-1" data-oid="0p72i48">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-[#00F0FF] rounded-md bg-[#0A0A0A] text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
                    placeholder="your@email.com"
                    data-oid="x0wdpzv"
                  />
                </div>

                <div data-oid="nja84zt">
                  <label className="block text-sm font-medium text-[#D1D1D1] mb-1" data-oid="a:igi24">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-[#00F0FF] rounded-md bg-[#0A0A0A] text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
                    placeholder="Your message..."
                    data-oid="1cyo0sc"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00F0FF] text-[#0A0A0A] py-2 px-4 rounded-md hover:bg-[#00D1E0] transition-colors duration-200 font-bold"
                  data-oid="twpqh0."
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] border-t border-[#00F0FF] mt-16" data-oid="b23v7my">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-oid="1b6r7ud">
          <div className="text-center text-[#D1D1D1]" data-oid="52lt.e9">
            <p data-oid="i4qq63i">
              &copy; 2024 Jorge Cristo. All rights reserved.
            </p>
            <p className="text-sm mt-2" data-oid="v.zk8-5">
              Built with React & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}