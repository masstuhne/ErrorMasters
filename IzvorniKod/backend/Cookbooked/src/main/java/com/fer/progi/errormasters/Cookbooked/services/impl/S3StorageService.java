package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.fer.progi.errormasters.Cookbooked.services.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class S3StorageService implements StorageService {
    private final AmazonS3 space;

    public S3StorageService() {
        AWSCredentialsProvider awsCredentialProv = new AWSStaticCredentialsProvider( new BasicAWSCredentials("DO00JNJXDJN7UDBBJF77","W02d9NQ0AOgzDb9e4HiIH1uwEFtGNLG9XgUKE+HOw5I"));

        space = AmazonS3ClientBuilder
                .standard()
                .withCredentials(awsCredentialProv)
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("ams3.digitaloceanspaces.com", "ams3"))
                .build();
    }


    @Override
    public List<String> getAllFiles() {
        ListObjectsV2Result result = space.listObjectsV2("cookbooked-storage");
        List<S3ObjectSummary> objects = result.getObjectSummaries();
        List<String> keys = new ArrayList<>();
//        objects.forEach(object -> keys.add(object.getKey()));
        space.listBuckets().forEach(bucket -> keys.add(bucket.getName()));
        return keys;

    }

    public String uploadFile(MultipartFile file) {

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            metadata.setContentType(file.getContentType());
            String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String key = UUID.randomUUID() + extension;
            space.putObject(new PutObjectRequest("cookbooked-storage", "media/" + key, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
            return key;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
