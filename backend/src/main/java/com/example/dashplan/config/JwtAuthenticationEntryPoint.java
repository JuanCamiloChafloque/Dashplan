package com.example.dashplan.config;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.example.dashplan.exceptions.InvalidLoginResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

                InvalidLoginResponse loginResponse = new InvalidLoginResponse();
                ObjectMapper mapper = new ObjectMapper();
                String jsonLoginResponse = mapper.writeValueAsString(loginResponse);

                response.setContentType("application/json");
                response.setStatus(401);
                response.getWriter().print(jsonLoginResponse);
    }
    
}
