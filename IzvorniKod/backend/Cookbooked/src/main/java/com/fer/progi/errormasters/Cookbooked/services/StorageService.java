package com.fer.progi.errormasters.Cookbooked.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StorageService {

    List<String> getAllFiles();

    String uploadFile(MultipartFile file);




}
