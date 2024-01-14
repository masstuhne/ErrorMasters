package com.fer.progi.errormasters.Cookbooked.converters;

import org.springframework.core.convert.converter.Converter;
import org.springframework.web.multipart.MultipartFile;

public class StringEmptyMultipartConverter implements Converter<String, MultipartFile> {
    @Override
    public MultipartFile convert(String source) {
        return null;
    }
}
