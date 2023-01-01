package com.example.dashplan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dashplan.domain.Backlog;
import com.example.dashplan.domain.Project;
import com.example.dashplan.domain.ProjectTask;
import com.example.dashplan.exceptions.ProjectNotFoundException;
import com.example.dashplan.repositories.BacklogRepository;
import com.example.dashplan.repositories.ProjectRepository;
import com.example.dashplan.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
    
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired 
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer backlogSeq = backlog.getPTSequence();
            backlogSeq++;
            backlog.setPTSequence(backlogSeq);
            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSeq);
            projectTask.setProjectIdentifier(projectIdentifier);
    
            //Set Priority
            if(projectTask.getPriority() == null) {
                projectTask.setPriority(3);
            }
    
            //Set Status
            if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }
    
            return projectTaskRepository.save(projectTask);
        }catch(Exception ex) {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        Project project = projectRepository.findByProjectIdentifier(id);
        if(project == null) {
            throw new ProjectNotFoundException("Project with ID: " + id + " does not exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
