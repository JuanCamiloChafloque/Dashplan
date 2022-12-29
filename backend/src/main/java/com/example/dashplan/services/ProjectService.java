package com.example.dashplan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dashplan.domain.Project;
import com.example.dashplan.exceptions.ProjectIdException;
import com.example.dashplan.repositories.ProjectRepository;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository repository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return repository.save(project);
        }catch(Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = repository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return repository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = repository.findByProjectIdentifier(projectId);
        if(project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' cannot be deleted. Project does not exist");
        }
        repository.delete(project);
    }
}
