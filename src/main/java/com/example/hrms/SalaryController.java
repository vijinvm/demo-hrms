package com.example.hrms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salaries")
public class SalaryController {

    @Autowired
    private SalaryService service;

    @GetMapping
    public List<Salary> getAllSalaries() {
        return service.getAllSalaries();
    }

    @GetMapping("/{id}")
    public Salary getSalary(@PathVariable Long id) {
        return service.getSalaryById(id);
    }

    @PostMapping
    public Salary createSalary(@RequestBody Salary salary) {
        return service.saveSalary(salary);
    }

    @PutMapping("/{id}")
    public Salary updateSalary(@PathVariable Long id, @RequestBody Salary salary) {
        salary.setId(id);
        return service.saveSalary(salary);
    }

    @DeleteMapping("/{id}")
    public void deleteSalary(@PathVariable Long id) {
        service.deleteSalary(id);
    }
}

