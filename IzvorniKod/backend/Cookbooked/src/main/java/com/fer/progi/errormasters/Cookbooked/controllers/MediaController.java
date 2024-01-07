package com.fer.progi.errormasters.Cookbooked.controllers;

import com.fer.progi.errormasters.Cookbooked.entities.Media;
import com.fer.progi.errormasters.Cookbooked.models.payloads.MediaModel;
import com.fer.progi.errormasters.Cookbooked.services.MediaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/media")
@AllArgsConstructor
public class MediaController {

    private MediaService mediaService;

    @GetMapping("{mediaId}")
    public ResponseEntity<MediaModel> getMedia(@PathVariable int mediaId) {
        Optional<Media> media = mediaService.getMedia(mediaId);
        if (media.isPresent()) {
            return ResponseEntity.ok(MediaModel.fromEntity(media.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
