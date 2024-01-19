package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.fer.progi.errormasters.Cookbooked.services.StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class S3StorageService implements StorageService {
    private final AmazonS3 space;

    private String accessKey;

    private String secretKey;

    private String serverUrl;

    private String bucketName;

    private String bucketRegion;

    public S3StorageService(@Value("${s3.access.key}") String accessKey,
                            @Value("${s3.secret.key}") String secretKey,
                            @Value("${s3.server.url}") String serverUrl,
                            @Value("${s3.bucket.name}") String bucketName,
                            @Value("${s3.bucket.region}") String bucketRegion ) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.serverUrl = serverUrl;
        this.bucketName = bucketName;
        this.bucketRegion = bucketRegion;

        AWSCredentialsProvider awsCredentialProv = new AWSStaticCredentialsProvider( new BasicAWSCredentials(accessKey,secretKey));

        space = AmazonS3ClientBuilder
                .standard()
                .withCredentials(awsCredentialProv)
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(serverUrl, bucketRegion))
                .build();
    }


    @Override
    public List<String> getAllFiles() {
        ListObjectsV2Result result = space.listObjectsV2(bucketName);
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
