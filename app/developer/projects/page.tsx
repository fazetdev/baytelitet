'use client';

import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';

export default function ProjectTrackerPage() {
  return (
    <section className="py-16 bg-bayt-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-bayt-dark mb-8 text-center">
          Project Tracker / متتبع المشاريع
        </h1>

        {/* Project List */}
        <div className="mb-12">
          <ProjectList />
        </div>

        {/* Selected Project Details */}
        <div>
          <ProjectDetails />
        </div>
      </div>
    </section>
  );
}
