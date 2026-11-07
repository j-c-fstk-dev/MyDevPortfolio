"use client";


interface NavigationProps {
  currentSection: number;
}

export default function Navigation({ currentSection }: NavigationProps) {


  const sections = [
  { id: 0, name: "INIT", label: "Home" },
  { id: 1, name: "STATS", label: "Stats" },
  { id: 2, name: "SKILLS", label: "Skills" },
  { id: 3, name: "PROJECTS", label: "Projects" },
  { id: 4, name: "EXPERIENCE", label: "Experience" },
  { id: 5, name: "CONTACT", label: "Contact" }];


  const scrollToSection = (sectionId: number) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      {/* Side Navigation - Hidden on mobile */}
      <nav
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-3 hidden md:block"
       >

        {sections.map((section) =>
        <div
          key={section.id}
          className="group relative cursor-pointer"
          onClick={() => scrollToSection(section.id)}
         >

            <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            currentSection === section.id ?
            "bg-matrix-primary-green border-matrix-primary-green shadow-neon-green scale-125" :
            "bg-transparent border-matrix-primary-green/50 hover:border-matrix-primary-green hover:shadow-neon-green"}`
            }
            />


            <div
            className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           >

              <div
              className="bg-matrix-black/90 border border-matrix-primary-green/50 px-3 py-1 rounded font-mono-matrix text-sm text-matrix-primary-green whitespace-nowrap"
             >

                {section.name}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Top Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-matrix-black/80 backdrop-blur-sm border-b border-matrix-primary-green/20"
       >

        <div
          className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center"
         >

          <div
            className="font-mono-matrix text-lg sm:text-xl text-glow-green"
           >

            &gt; JORGE_CRISTO.EXE
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex space-x-6 xl:space-x-8"
           >

            {sections.map((section) =>
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`font-mono-matrix text-xs xl:text-sm transition-all duration-300 hover:text-glow-green px-2 py-1 ${
              currentSection === section.id ?
              "text-matrix-primary-green" :
              "text-matrix-light-gray/70"}`
              }
             >

                {section.label.toUpperCase()}
              </button>
            )}
          </nav>

          {/* Mobile Navigation Dots */}
          <div className="flex lg:hidden space-x-2">
            {sections.map((section) =>
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === section.id ?
              "bg-matrix-primary-green shadow-neon-green scale-125" :
              "bg-matrix-primary-green/30 hover:bg-matrix-primary-green/60"}`
              }
              title={section.label}
              />

            )}
          </div>
        </div>
      </header>
    </>);

}