package com.klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klu.models.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

}