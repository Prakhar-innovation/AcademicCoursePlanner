package com.klu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.klu.models.Prerequisite;
import com.klu.service.PrerequisiteService;

@RestController
@RequestMapping("/prerequisites")
@CrossOrigin("*")
public class PrerequisiteController {

    @Autowired
    private PrerequisiteService prerequisiteService;

    @PostMapping("/add")
    public Prerequisite addPrerequisite(@RequestBody Prerequisite prerequisite) {
        return prerequisiteService.addPrerequisite(prerequisite);
    }

    @GetMapping("/all")
    public List<Prerequisite> getAllPrerequisites() {
        return prerequisiteService.getAllPrerequisites();
    }
}