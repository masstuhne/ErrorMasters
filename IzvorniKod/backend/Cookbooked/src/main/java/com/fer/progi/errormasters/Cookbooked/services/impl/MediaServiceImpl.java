package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Media;
import com.fer.progi.errormasters.Cookbooked.repositories.MediaRepository;
import com.fer.progi.errormasters.Cookbooked.services.MediaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MediaServiceImpl  implements MediaService {

    private final MediaRepository mediaRepository;
    @Override
    public Optional<Media> getMedia(int mediaId) {
        return mediaRepository.findById(mediaId);


    }
}
