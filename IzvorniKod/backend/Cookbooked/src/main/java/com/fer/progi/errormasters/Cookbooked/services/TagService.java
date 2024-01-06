package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Tag;

import java.util.Optional;

public interface TagService {

    public Optional<Tag> getTagByName(String name);
}
