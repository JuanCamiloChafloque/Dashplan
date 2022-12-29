package com.example.dashplan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dashplan.domain.Project;
import com.example.dashplan.repositories.ProjectRepository;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository repository;

    public Project saveOrUpdateProject(Project project) {
        return repository.save(project);
    }
}
