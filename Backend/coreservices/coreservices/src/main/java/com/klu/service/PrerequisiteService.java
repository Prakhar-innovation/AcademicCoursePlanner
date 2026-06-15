package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.models.Prerequisite;
import com.klu.repository.PrerequisiteRepository;

@Service
public class PrerequisiteService {

    @Autowired
    private PrerequisiteRepository prerequisiteRepository;

    public Prerequisite addPrerequisite(Prerequisite prerequisite) {
        return prerequisiteRepository.save(prerequisite);
    }

    public List<Prerequisite> getAllPrerequisites() {
        return prerequisiteRepository.findAll();
    }
}