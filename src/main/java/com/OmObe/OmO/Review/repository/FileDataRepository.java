package com.OmObe.OmO.Review.repository;

import com.OmObe.OmO.Review.entity.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileDataRepository extends JpaRepository<FileData,Integer> {
    Optional<FileData> findByName(String name);
}
