"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import ProjectCard from "./ProjectCard";
import { PROJECT_LIST } from "@/lib/projects";

export default function WorkSection() {
  return (
    <section id="work" className="bg-[var(--bg-primary)] relative sm:pb-20">
      <div className="px-6 sm:px-12">
        <ScrollStack>
          {PROJECT_LIST.map((project) => (
            <ScrollStackItem key={project.title}>
              <ProjectCard project={project} variant="home" />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
