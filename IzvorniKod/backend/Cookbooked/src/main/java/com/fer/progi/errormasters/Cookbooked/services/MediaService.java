package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Media;

import java.util.Optional;

public interface MediaService {

    Optional<Media> getMedia(int mediaId);
}
