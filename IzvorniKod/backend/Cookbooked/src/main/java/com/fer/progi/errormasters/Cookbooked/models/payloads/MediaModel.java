package com.fer.progi.errormasters.Cookbooked.models.payloads;


import com.fer.progi.errormasters.Cookbooked.entities.Media;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class MediaModel {

    private String mediaName;
    private String link;
    private Date uploadDate;


    public static MediaModel fromEntity(Media media) {
        return new MediaModel(media.getDescription(), "https://cookbooked-storage.ams3.cdn.digitaloceanspaces.com/media/" + media.getKey(), media.getUploadDate());
    }
}
