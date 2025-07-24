"use client";

import { useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

const skills: Skill[] = [
{ name: "React/Next.js", level: 95, category: "Frontend", color: "#00FF00" },
{ name: "TypeScript", level: 90, category: "Language", color: "#00CC00" },
{ name: "Node.js", level: 88, category: "Backend", color: "#00FF00" },
{ name: "Python", level: 85, category: "Language", color: "#00CC00" },
{ name: "AI/ML", level: 80, category: "Specialty", color: "#00FFFF" },
{
  name: "Cloud (AWS)",
  level: 82,
  category: "Infrastructure",
  color: "#00FF00"
},
{ name: "Docker", level: 78, category: "DevOps", color: "#00CC00" },
{ name: "GraphQL", level: 75, category: "API", color: "#00FFFF" }];


export default function SkillsContent() {
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(
    new Array(skills.length).fill(0)
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedLevels((prev) => {
            const newLevels = [...prev];
            newLevels[index] = skill.level;
            return newLevels;
          });
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = [...new Set(skills.map((skill) => skill.category))];

  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8"
      data-oid="b8clzp1">

      {/* Skills Matrix */}
      <div className="space-y-6" data-oid="-c68rxx">
        <h3
          className="text-2xl font-mono-matrix text-glow-green mb-6"
          data-oid="f0xr5bw">

          SKILL_MATRIX.exe
        </h3>

        <div className="space-y-4" data-oid="gtde:bz">
          {skills.map((skill, index) =>
          <div
            key={skill.name}
            className={`matrix-loading ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            data-oid="d.as4cc">

              <div
              className="flex justify-between items-center mb-2"
              data-oid="gxygqzs">

                <span
                className="font-mono-matrix text-matrix-light-gray"
                data-oid="l..rgm3">

                  {skill.name}
                </span>
                <span
                className="font-mono-matrix text-matrix-primary-green text-sm"
                data-oid="qwz8qeu">

                  {animatedLevels[index]}%
                </span>
              </div>

              <div
              className="relative h-2 bg-matrix-dark-gray rounded-full overflow-hidden"
              data-oid="quil-zk">

                <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${animatedLevels[index]}%`,
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}`
                }}
                data-oid="bi0q-0f" />


                {/* Animated particles */}
                <div
                className="absolute top-0 left-0 h-full w-2 bg-white/50 rounded-full animate-pulse"
                style={{
                  left: `${Math.max(0, animatedLevels[index] - 2)}%`,
                  opacity: animatedLevels[index] > 0 ? 1 : 0
                }}
                data-oid="fh6as-0" />

              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories Breakdown */}
      <div className="space-y-6" data-oid="013sf9a">
        <h3
          className="text-2xl font-mono-matrix text-glow-blue mb-6"
          data-oid="30ouiaz">

          CATEGORIES.log
        </h3>

        <div className="grid grid-cols-2 gap-4" data-oid="z83ej5j">
          {categories.map((category, index) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            const avgLevel =
            categorySkills.reduce((sum, skill) => sum + skill.level, 0) /
            categorySkills.length;

            return (
              <div
                key={category}
                className={`pixel-border bg-matrix-black/50 p-4 rounded-lg matrix-loading ${
                isVisible ? "opacity-100" : "opacity-0"}`
                }
                style={{ animationDelay: `${index * 0.2}s` }}
                data-oid="i.1k5pm">

                <h4
                  className="font-mono-matrix text-matrix-electric-blue text-sm mb-2"
                  data-oid="qwpdagy">

                  {category.toUpperCase()}
                </h4>
                <div
                  className="text-2xl font-bold text-glow-green mb-1"
                  data-oid="o6l0zp9">

                  {Math.round(avgLevel)}%
                </div>
                <div
                  className="text-xs text-matrix-light-gray"
                  data-oid="n1b-:o8">

                  {categorySkills.length} skill
                  {categorySkills.length !== 1 ? "s" : ""}
                </div>
              </div>);

          })}
        </div>

        {/* Code snippet */}
        <div
          className="pixel-border bg-matrix-black/80 p-4 rounded-lg font-mono-matrix text-sm"
          data-oid="v5n57l7">

          <div className="text-matrix-electric-blue mb-2" data-oid="we2b.3:">
            // Current focus areas
          </div>
          <div className="text-matrix-primary-green" data-oid="w9uvm1p">
            <div data-oid="nkv.uc0">const priorities = [</div>
            <div className="ml-4" data-oid="tygu26-">
              'AI/ML Integration',
            </div>
            <div className="ml-4" data-oid="j---xic">
              'Cloud Architecture',
            </div>
            <div className="ml-4" data-oid="bts6qep">
              'Performance Optimization'
            </div>
            <div data-oid="3amrr37">];</div>
          </div>
        </div>
      </div>
    </div>);

}