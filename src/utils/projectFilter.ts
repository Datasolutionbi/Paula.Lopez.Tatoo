export interface Project {
    id: string;
    category: string;
    visible: boolean;
}

export const filterProjects = (
    projects: Project[],
    filter: string
): Project[] => {
    if (filter === 'all') {
        return projects.map((p) => ({ ...p, visible: true }));
    }

    return projects.map((p) => ({
        ...p,
        visible: p.category === filter,
    }));
};

export const getActiveFilterCount = (projects: Project[]): number => {
    return projects.filter((p) => p.visible).length;
};
