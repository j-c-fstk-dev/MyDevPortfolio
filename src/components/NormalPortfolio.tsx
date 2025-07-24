"use client";

import { useState, useEffect } from "react";

interface NormalPortfolioProps {
  onExitMatrix: () => void;
}

export default function NormalPortfolio({
  onExitMatrix
}: NormalPortfolioProps) {
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const skills = [
  { name: "JavaScript", level: 95 },
  { name: "React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 82 },
  { name: "AWS", level: 78 }];


  const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with modern UI/UX",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "🛒"
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool",
    tech: ["Vue.js", "Express", "PostgreSQL"],
    image: "📋"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather tracking application",
    tech: ["React", "API Integration", "Charts.js"],
    image: "🌤️"
  }];


  const experience = [
  {
    title: "Senior Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description:
    "Leading development of web applications and mentoring junior developers."
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description:
    "Built responsive websites and web applications for various clients."
  },
  {
    title: "Frontend Developer",
    company: "Startup Co.",
    period: "2019 - 2020",
    description: "Developed user interfaces and improved user experience."
  }];


  return (
    <div
      className="min-h-screen bg-white text-gray-800 font-sans"
      data-oid="prym87p">

      {/* Hidden Matrix Exit Button */}
      <button
        onClick={onExitMatrix}
        className="fixed bottom-4 right-4 w-12 h-12 bg-black/5 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black/10 transition-all duration-300 z-50 group opacity-20 hover:opacity-100"
        title="Exit Matrix"
        data-oid="vjkkr8:">

        <span
          className="text-red-500 group-hover:animate-pulse"
          data-oid="e-0rzdt">

          🔴
        </span>
      </button>

      {/* Navigation */}
      <nav
        className="bg-white shadow-sm border-b sticky top-0 z-40"
        data-oid=".-.9iqw">

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="jn0jkvb">

          <div
            className="flex justify-between items-center h-16"
            data-oid="tcv_1sf">

            <div className="flex items-center" data-oid="z8gzq9v">
              <h1
                className="text-xl font-bold text-gray-900"
                data-oid="f4-abg2">

                John Developer
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8" data-oid="m.cfk__">
              {["about", "skills", "projects", "experience", "contact"].map(
                (section) =>
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === section ?
                  "text-blue-600 border-b-2 border-blue-600" :
                  "text-gray-600 hover:text-gray-900"}`
                  }
                  data-oid="vdi0pry">

                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>

              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden" data-oid="._t_4.y">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                data-oid="46i9t17">

                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  data-oid="l.ze13t">

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    data-oid="4kfnd4m" />

                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen &&
          <div
            className="md:hidden border-t border-gray-200"
            data-oid="2us4wag">

              <div className="px-2 pt-2 pb-3 space-y-1" data-oid="rygl9uc">
                {["about", "skills", "projects", "experience", "contact"].map(
                (section) =>
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                  activeSection === section ?
                  "text-blue-600 bg-blue-50" :
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
                  }
                  data-oid="-:j_:hf">

                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>

              )}
              </div>
            </div>
          }
        </div>
      </nav>

      {/* Main Content */}
      <main
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="dd.0lhw">

        {/* About Section */}
        {activeSection === "about" &&
        <div className="space-y-8" data-oid="9jdtwad">
            <div className="text-center" data-oid="vf64c4g">
              <div
              className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white"
              data-oid=":d-oc1z">

                👨‍💻
              </div>
              <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="es03ijs">

                Hello, I'm John
              </h2>
              <p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              data-oid="o1ovjdy">

                A passionate full-stack developer with 5+ years of experience
                creating beautiful and functional web applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12" data-oid="-ziip7n">
              <div className="bg-gray-50 p-6 rounded-lg" data-oid="i9c_boo">
                <h3 className="text-xl font-semibold mb-4" data-oid="duy.zkp">
                  What I Do
                </h3>
                <ul className="space-y-2 text-gray-600" data-oid=".i-bmq1">
                  <li data-oid="3_cd8-1">• Full-stack web development</li>
                  <li data-oid="7_wo3mt">• Modern JavaScript frameworks</li>
                  <li data-oid="h8jp91i">• Cloud architecture & deployment</li>
                  <li data-oid="go7y3z3">• UI/UX design implementation</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg" data-oid="33k7j17">
                <h3 className="text-xl font-semibold mb-4" data-oid="oiv06x7">
                  Quick Facts
                </h3>
                <ul className="space-y-2 text-gray-600" data-oid="n.9xnek">
                  <li data-oid="x:40f:_">• 📍 Based in San Francisco, CA</li>
                  <li data-oid="5vgfp69">• 🎓 Computer Science Degree</li>
                  <li data-oid="1judhz9">• ☕ Coffee enthusiast</li>
                  <li data-oid="9x0-ed7">
                    • 🚀 Always learning new technologies
                  </li>
                </ul>
              </div>
            </div>
          </div>
        }

        {/* Skills Section */}
        {activeSection === "skills" &&
        <div className="space-y-8" data-oid="0r5.8jb">
            <div className="text-center" data-oid="8t51:yb">
              <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="yvx9dwn">

                Skills & Technologies
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto" data-oid="dgauhgz">
                Here are the technologies I work with regularly and my
                proficiency levels.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6" data-oid="2nhj:l1">
              {skills.map((skill) =>
            <div
              key={skill.name}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm"
              data-oid="wjrrfr6">

                  <div
                className="flex justify-between items-center mb-2"
                data-oid="rvlpz-z">

                    <span
                  className="font-medium text-gray-900"
                  data-oid="n7e6a_4">

                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500" data-oid="jhhu.5a">
                      {skill.level}%
                    </span>
                  </div>
                  <div
                className="w-full bg-gray-200 rounded-full h-2"
                data-oid="o0-.dm.">

                    <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                  data-oid="old:vok">
                </div>
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {/* Projects Section */}
        {activeSection === "projects" &&
        <div className="space-y-8" data-oid="zz2gvjz">
            <div className="text-center" data-oid="auznvj.">
              <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="tt_xo1u">

                Featured Projects
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto" data-oid="yq3v0z-">
                A selection of projects I've worked on recently.
              </p>
            </div>

            <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="j4mrsqq">

              {projects.map((project, index) =>
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              data-oid="2_9hned">

                  <div className="p-6" data-oid="2bjv:2o">
                    <div className="text-4xl mb-4" data-oid="70t93q9">
                      {project.image}
                    </div>
                    <h3
                  className="text-xl font-semibold text-gray-900 mb-2"
                  data-oid="7womn7y">

                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4" data-oid="d6jkw9_">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2" data-oid=".u68ojx">
                      {project.tech.map((tech) =>
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    data-oid="8xwimj.">

                          {tech}
                        </span>
                  )}
                    </div>
                  </div>
                  <div
                className="px-6 py-3 bg-gray-50 border-t border-gray-200"
                data-oid="nwuby7p">

                    <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  data-oid="tskm6ih">

                      View Project →
                    </button>
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {/* Experience Section */}
        {activeSection === "experience" &&
        <div className="space-y-8" data-oid="i1tq4if">
            <div className="text-center" data-oid="cm0j06d">
              <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="q.f6zvv">

                Work Experience
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto" data-oid="ul_rh__">
                My professional journey and key accomplishments.
              </p>
            </div>

            <div className="space-y-6" data-oid="xyfb9qc">
              {experience.map((job, index) =>
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm"
              data-oid="8ntdogj">

                  <div
                className="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
                data-oid="6vsy0ft">

                    <div data-oid="jz26rxs">
                      <h3
                    className="text-xl font-semibold text-gray-900"
                    data-oid="3:zr6a8">

                        {job.title}
                      </h3>
                      <p
                    className="text-blue-600 font-medium"
                    data-oid="s.e_6ep">

                        {job.company}
                      </p>
                    </div>
                    <span
                  className="text-gray-500 text-sm mt-2 md:mt-0"
                  data-oid="qh.tvcn">

                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-600" data-oid="fg25cte">
                    {job.description}
                  </p>
                </div>
            )}
            </div>
          </div>
        }

        {/* Contact Section */}
        {activeSection === "contact" &&
        <div className="space-y-8" data-oid="sdounft">
            <div className="text-center" data-oid="74ol6sr">
              <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              data-oid="d8c813e">

                Get In Touch
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto" data-oid="8we85ow">
                I'm always interested in new opportunities and collaborations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8" data-oid="5vxj70z">
              <div className="space-y-6" data-oid="hgnt3k.">
                <div className="flex items-center space-x-4" data-oid="2nkbnzb">
                  <div
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                  data-oid="gsb692a">

                    📧
                  </div>
                  <div data-oid="p.fu-ak">
                    <h3
                    className="font-semibold text-gray-900"
                    data-oid="p-w7on4">

                      Email
                    </h3>
                    <p className="text-gray-600" data-oid="w4bvzjz">
                      john@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4" data-oid="ff0:s9d">
                  <div
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                  data-oid="p8n:5-_">

                    💼
                  </div>
                  <div data-oid="4.a-.qt">
                    <h3
                    className="font-semibold text-gray-900"
                    data-oid="lje.qm2">

                      LinkedIn
                    </h3>
                    <p className="text-gray-600" data-oid="rxfprj2">
                      linkedin.com/in/johndeveloper
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4" data-oid="zrrlovq">
                  <div
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                  data-oid="2vi4el:">

                    🐙
                  </div>
                  <div data-oid="bj8ea-i">
                    <h3
                    className="font-semibold text-gray-900"
                    data-oid="1h:c_qk">

                      GitHub
                    </h3>
                    <p className="text-gray-600" data-oid="htys8gx">
                      github.com/johndeveloper
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-4" data-oid=".xswkka">
                <div data-oid="2mh1h-g">
                  <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="h231_xv">

                    Name
                  </label>
                  <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  data-oid="18c.te1" />

                </div>

                <div data-oid="ue-.vzw">
                  <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="0p72i48">

                    Email
                  </label>
                  <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  data-oid="x0wdpzv" />

                </div>

                <div data-oid="nja84zt">
                  <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  data-oid="a:igi24">

                    Message
                  </label>
                  <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message..."
                  data-oid="1cyo0sc">
                </textarea>
                </div>

                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                data-oid="twpqh0.">

                  Send Message
                </button>
              </form>
            </div>
          </div>
        }
      </main>

      {/* Footer */}
      <footer
        className="bg-gray-50 border-t border-gray-200 mt-16"
        data-oid="b23v7my">

        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          data-oid="1b6r7ud">

          <div className="text-center text-gray-600" data-oid="52lt.e9">
            <p data-oid="i4qq63i">
              &copy; 2024 John Developer. All rights reserved.
            </p>
            <p className="text-sm mt-2" data-oid="v.zk8-5">
              Built with React & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>);

}