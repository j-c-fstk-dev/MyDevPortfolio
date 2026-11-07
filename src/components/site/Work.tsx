import { contact, projects, statusLabels, type Project } from "@/data/portfolio";
import MoreProjects from "./MoreProjects";
import { Section, TextLink } from "./ui";

export function StatusMark({ status }: { status: Project["status"] }) {
  const live = status === "live";
  return (
    <span className="inline-flex items-center gap-2 text-sm text-lichen">
      <span
        className={`h-2 w-2 rounded-full ${live ? "bg-pine" : "border-[1.5px] border-lichen"}`}
        aria-hidden
      />
      {statusLabels[status]}
    </span>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      {project.live && <TextLink href={project.live}>Visit site</TextLink>}
      {project.repo && <TextLink href={project.repo}>Source code</TextLink>}
    </div>
  );
}

function FeaturedRow({ project }: { project: Project }) {
  return (
    <li className="grid gap-4 border-t border-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
      <div>
        <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.02em] [font-stretch:80%]">
          {project.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-sm font-medium">{project.context}</span>
          <StatusMark status={project.status} />
        </div>
      </div>
      <div className="max-w-prose">
        <p className="text-lg leading-relaxed">{project.description}</p>
        <p className="mt-3 text-sm text-lichen">{project.tech.join(", ")}</p>
        <div className="mt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </li>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      title="Selected work"
      intro="Production apps for clients and my own products, mostly for Web3, climate and community projects."
    >
      <ul className="border-b border-line">
        {featured.map((project) => (
          <FeaturedRow key={project.title} project={project} />
        ))}
      </ul>

      <div className="mt-20">
        <h3 className="text-2xl font-bold [font-stretch:85%]">More projects</h3>
        <p className="mt-2 text-lichen">
          Recent experiments, hackathon entries and products in progress. Everything else is on{" "}
          <TextLink href={`${contact.github}?tab=repositories`}>GitHub</TextLink>.
        </p>
        <MoreProjects projects={others} />
      </div>
    </Section>
  );
}
