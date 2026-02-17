import React, { useState, useMemo } from 'react';

// Simplified interface for the data we need
export interface ProjectData {
    id: string;
    data: {
        title: string;
        category: string;
        size: string;
        featured: boolean;
        images: {
            thumbnail: string;
        };
    };
}

interface ProjectsGalleryProps {
    projects: ProjectData[];
    categories: string[];
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects, categories }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Memoize filtered projects to avoid recalculation on unrelated re-renders
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects;
        return projects.filter(p => p.data.category === activeFilter);
    }, [projects, activeFilter]);

    return (
        <div className="dynamic-gallery">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                    className={`filter-btn px-6 py-3 border rounded-none text-xs uppercase tracking-widest transition-all shadow-lg ${activeFilter === 'all'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black/60 border-black/10 hover:border-studio-purple hover:text-studio-purple'
                        }`}
                    onClick={() => setActiveFilter('all')}
                >
                    All Projects
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn px-6 py-3 border rounded-none text-xs uppercase tracking-widest transition-all ${activeFilter === cat
                                ? 'bg-black text-white border-black shadow-lg'
                                : 'bg-white text-black/60 border-black/10 hover:border-studio-purple hover:text-studio-purple'
                            }`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Flash Sheet Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4" id="projects-grid">
                    {filteredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className="project-card relative group cursor-pointer transition-all duration-500 reveal-effect hover:z-10 animate-fade-in"
                            style={{
                                // Add a slight random rotation for the "flash sheet on table" vibe, memoized via index seeding or just static for SSR consistency?
                                // Using index to keep it consistent avoiding hydration mismatch
                                transform: `rotate(${index % 2 === 0 ? '-' : ''}${(index % 3) * 0.5}deg)`
                            }}
                        >
                            {/* Card Content */}
                            <div className="bg-white p-0 group-hover:shadow-lg transition-all duration-500 rounded-none border border-black/5 relative overflow-hidden">

                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden mb-4 ink-bleed">
                                    <img
                                        src={project.data.images.thumbnail}
                                        alt={project.data.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                                    />

                                    {/* Featured Badge */}
                                    {project.data.featured && (
                                        <div className="absolute bottom-2 right-2">
                                            <span className="inline-block px-2 py-1 bg-black text-white text-[8px] font-bold uppercase tracking-widest font-sans">
                                                Flash Pick
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Handwritten Style Info */}
                                <div className="text-center pb-4">
                                    <h3 className="font-tattoo text-3xl mb-1 text-black group-hover:text-studio-purple transition-colors">
                                        {project.data.title}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-black/60 font-bold font-tattoo">
                                        <span>{project.data.category}</span>
                                        <span>•</span>
                                        <span>{project.data.size}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div id="no-results" className="text-center py-20">
                    <p className="font-tattoo text-2xl opacity-50 text-black">
                        No flash found in this style...
                    </p>
                </div>
            )}
        </div>
    );
};
