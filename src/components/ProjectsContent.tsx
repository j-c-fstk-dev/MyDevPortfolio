"use client";

import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: "completed" | "in-progress" | "planned";
  type: "web" | "ai" | "mobile" | "tool";
}

const projects: Project[] = [
{
  id: 1,
  title: "AI-Powered Analytics Dashboard",
  description:
  "Real-time data visualization with machine learning insights and predictive analytics.",
  tech: ["React", "Python", "TensorFlow", "AWS"],
  status: "completed",
  type: "ai"
},
{
  id: 2,
  title: "Distributed Microservices Platform",
  description:
  "Scalable microservices architecture with containerized deployment and auto-scaling.",
  tech: ["Node.js", "Docker", "Kubernetes", "GraphQL"],
  status: "completed",
  type: "web"
},
{
  id: 3,
  title: "Neural Network Optimizer",
  description:
  "Custom optimization algorithms for deep learning model training and inference.",
  tech: ["Python", "PyTorch", "CUDA", "NumPy"],
  status: "in-progress",
  type: "ai"
},
{
  id: 4,
  title: "Real-time Collaboration Tool",
  description:
  "WebRTC-based collaboration platform with synchronized editing and video calls.",
  tech: ["TypeScript", "WebRTC", "Socket.io", "Redis"],
  status: "planned",
  type: "web"
}];


export default function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0]
  );
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
  filter === "all" ?
  projects :
  projects.filter(
    (project) => project.type === filter || project.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#00FF00";
      case "in-progress":
        return "#00FFFF";
      case "planned":
        return "#FFFF00";
      default:
        return "#00FF00";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ai":
        return "🧠";
      case "web":
        return "🌐";
      case "mobile":
        return "📱";
      case "tool":
        return "🔧";
      default:
        return "💻";
    }
  };

  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 h-full"
      data-oid="4edsyna">

      {/* Project List */}
      <div className="lg:col-span-1 space-y-4" data-oid="mbgt5oc">
        <div className="flex gap-2 mb-4 flex-wrap" data-oid="br672cv">
          {["all", "ai", "web", "completed", "in-progress"].map(
            (filterType) =>
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-xs font-mono-matrix rounded border transition-all ${
              filter === filterType ?
              "bg-matrix-primary-green text-matrix-black border-matrix-primary-green" :
              "bg-matrix-black/50 text-matrix-primary-green border-matrix-primary-green/50 hover:bg-matrix-primary-green/20"}`
              }
              data-oid="wak4edi">

                {filterType.toUpperCase()}
              </button>

          )}
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto" data-oid="p_9cqjv">
          {filteredProjects.map((project) =>
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`pixel-border p-3 rounded cursor-pointer transition-all hover:bg-matrix-primary-green/10 ${
            selectedProject?.id === project.id ?
            "bg-matrix-primary-green/20 border-matrix-primary-green" :
            "bg-matrix-black/50 border-matrix-primary-green/30"}`
            }
            data-oid="qkz-h5c">

              <div
              className="flex items-center justify-between mb-2"
              data-oid="ib1zgo5">

                <span className="text-lg" data-oid="ylx7w9w">
                  {getTypeIcon(project.type)}
                </span>
                <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: getStatusColor(project.status),
                  boxShadow: `0 0 5px ${getStatusColor(project.status)}`
                }}
                data-oid="jqq7:xx" />

              </div>
              <h4
              className="font-mono-matrix text-matrix-light-gray text-sm mb-1"
              data-oid="cbfb9ih">

                {project.title}
              </h4>
              <div
              className="text-xs text-matrix-primary-green"
              data-oid="f8lwtm1">

                {project.status.replace("-", " ").toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="lg:col-span-2" data-oid="gabbbic">
        {selectedProject &&
        <div className="h-full flex flex-col" data-oid="y053wqg">
            {/* Project Header */}
            <div
            className="pixel-border bg-matrix-black/80 p-6 rounded-lg mb-6"
            data-oid="bgh:u-q">

              <div className="flex items-center gap-4 mb-4" data-oid="ov9al2_">
                <span className="text-3xl" data-oid="-l_c-m0">
                  {getTypeIcon(selectedProject.type)}
                </span>
                <div data-oid="8m.9-_6">
                  <h3
                  className="text-2xl font-mono-matrix text-glow-green"
                  data-oid="yde:r5v">

                    {selectedProject.title}
                  </h3>
                  <div
                  className="flex items-center gap-2 mt-1"
                  data-oid="dbd6xwb">

                    <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor: getStatusColor(selectedProject.status),
                      boxShadow: `0 0 10px ${getStatusColor(selectedProject.status)}`
                    }}
                    data-oid="wwy_t7r" />


                    <span
                    className="font-mono-matrix text-sm text-matrix-light-gray"
                    data-oid="-ca-6z7">

                      {selectedProject.status.replace("-", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <p
              className="text-matrix-light-gray mb-4 leading-relaxed"
              data-oid=".gl.q2g">

                {selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2" data-oid="lb0rlfl">
                {selectedProject.tech.map((tech) =>
              <span
                key={tech}
                className="px-3 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded text-sm font-mono-matrix text-matrix-primary-green"
                data-oid="y4krijd">

                    {tech}
                  </span>
              )}
              </div>
            </div>

            {/* Project Visualization */}
            <div
            className="flex-1 pixel-border bg-matrix-black/50 p-6 rounded-lg"
            data-oid="am_8:gx">

              <div
              className="h-full flex items-center justify-center"
              data-oid="l-k4bsq">

                {/* Placeholder for project preview */}
                <div
                className="w-full max-w-md aspect-video bg-gradient-to-br from-matrix-primary-green/20 to-matrix-electric-blue/20 rounded-lg border border-matrix-primary-green/30 flex items-center justify-center relative overflow-hidden"
                data-oid="x8to5g1">

                  {/* Animated grid */}
                  <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                                                linear-gradient(rgba(0, 255, 0, 0.3) 1px, transparent 1px),
                                                linear-gradient(90deg, rgba(0, 255, 0, 0.3) 1px, transparent 1px)
                                            `,
                    backgroundSize: "20px 20px",
                    animation: "matrix-rain 10s linear infinite"
                  }}
                  data-oid="e_t8azj" />


                  {/* Project icon */}
                  <div className="text-6xl opacity-50" data-oid="jz_kpof">
                    {getTypeIcon(selectedProject.type)}
                  </div>

                  {/* Overlay text */}
                  <div
                  className="absolute bottom-4 left-4 right-4"
                  data-oid="s5.zuq9">

                    <div
                    className="font-mono-matrix text-matrix-primary-green text-xs"
                    data-oid="mxbysli">

                      PROJECT_PREVIEW.render()
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}