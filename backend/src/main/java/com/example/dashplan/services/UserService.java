package com.example.dashplan.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dashplan.domain.User;
import com.example.dashplan.exceptions.UsernameAlreadyExistsException;
import com.example.dashplan.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        }catch(Exception ex) {
            throw new UsernameAlreadyExistsException("The username " + newUser.getUsername() + " already exists");
        }
    }
}
