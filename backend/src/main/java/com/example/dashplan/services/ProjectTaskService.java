package com.example.dashplan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dashplan.domain.Backlog;
import com.example.dashplan.domain.ProjectTask;
import com.example.dashplan.repositories.BacklogRepository;
import com.example.dashplan.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
    
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired 
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
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
    }

    public Iterable<ProjectTask> findBacklogById(String id) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
