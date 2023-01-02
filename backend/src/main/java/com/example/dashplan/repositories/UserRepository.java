package com.example.dashplan.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.dashplan.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    
}
