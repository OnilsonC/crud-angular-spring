package com.onilson.crud_spring.controller;

import com.onilson.crud_spring.model.Course;
import com.onilson.crud_spring.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> list() {
        return courseRepository.findAll();
    }

    @PostMapping
    public Course save(@RequestBody Course c) {
        return courseRepository.save(c);
        //System.out.println(c.getName());
    }
}
