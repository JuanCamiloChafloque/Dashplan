package com.example.dashplan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dashplan.domain.Backlog;
import com.example.dashplan.domain.Project;
import com.example.dashplan.domain.User;
import com.example.dashplan.exceptions.ProjectIdException;
import com.example.dashplan.exceptions.ProjectNotFoundException;
import com.example.dashplan.repositories.BacklogRepository;
import com.example.dashplan.repositories.ProjectRepository;
import com.example.dashplan.repositories.UserRepository;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {
        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(username);
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if(project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            if(project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        }catch(Exception e) {
            throw new ProjectIdException("Project '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectId, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null) {
            throw new ProjectIdException("Project '" + projectId + "' does not exist");
        }

        if(!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project '" + projectId + "' not found in your account");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }
}
