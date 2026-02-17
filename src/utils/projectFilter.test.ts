import { describe, it, expect } from 'vitest';
import { filterProjects, getActiveFilterCount } from './projectFilter';

describe('Project Filter Logic', () => {
    const projects = [
        { id: '1', category: 'traditional', visible: true },
        { id: '2', category: 'traditional', visible: true },
        { id: '3', category: 'realistic', visible: true },
        { id: '4', category: 'minimal', visible: true },
    ];

    it('should show all projects when filter is "all"', () => {
        const filtered = filterProjects(projects, 'all');
        expect(filtered.every((p) => p.visible)).toBe(true);
        expect(getActiveFilterCount(filtered)).toBe(4);
    });

    it('should only show "traditional" projects when filtered', () => {
        const filtered = filterProjects(projects, 'traditional');
        expect(filtered.filter((p) => p.visible)).toHaveLength(2);
        expect(filtered.find((p) => p.id === '1')!.visible).toBe(true);
        expect(filtered.find((p) => p.id === '3')!.visible).toBe(false);
    });

    it('should only show "realistic" projects when filtered', () => {
        const filtered = filterProjects(projects, 'realistic');
        expect(filtered.filter((p) => p.visible)).toHaveLength(1);
        expect(filtered.find((p) => p.id === '3')!.visible).toBe(true);
    });

    it('should return 0 active projects if filter matches none', () => {
        const filtered = filterProjects(projects, 'non-existent');
        expect(getActiveFilterCount(filtered)).toBe(0);
    });
});
