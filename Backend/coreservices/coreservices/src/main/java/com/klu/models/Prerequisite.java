package com.klu.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "prerequisites")
public class Prerequisite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prerequisiteId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Course course;

    @ManyToOne
    @JoinColumn(name = "prerequisite_course_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Course prerequisiteCourse;

    public Prerequisite() {
    }

    public Long getPrerequisiteId() {
        return prerequisiteId;
    }

    public void setPrerequisiteId(Long prerequisiteId) {
        this.prerequisiteId = prerequisiteId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Course getPrerequisiteCourse() {
        return prerequisiteCourse;
    }

    public void setPrerequisiteCourse(Course prerequisiteCourse) {
        this.prerequisiteCourse = prerequisiteCourse;
    }
}