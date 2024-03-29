package com.example.dashplan.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.dashplan.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    Project findByProjectIdentifier(String projectIdentifier); 

    @Override
    Iterable<Project> findAll();

    Iterable<Project> findAllByProjectLeader(String username);
    
}
