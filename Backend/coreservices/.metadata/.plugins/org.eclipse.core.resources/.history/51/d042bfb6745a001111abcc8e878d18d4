package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.models.Enrollment;
import com.klu.service.EnrollmentService;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin("*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/add")
    public Enrollment addEnrollment(@RequestBody Enrollment enrollment) {
        return enrollmentService.addEnrollment(enrollment);
    }

    @GetMapping("/all")
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }
}