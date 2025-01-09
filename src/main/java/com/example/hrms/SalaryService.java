package com.example.hrms;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryService {

    @Autowired
    private SalaryRepository repository;

    public List<Salary> getAllSalaries() {
        return repository.findAll();
    }

    public Salary getSalaryById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Salary not found"));
    }

    public Salary saveSalary(Salary salary) {
        return repository.save(salary);
    }

    public void deleteSalary(Long id) {
        repository.deleteById(id);
    }
}
