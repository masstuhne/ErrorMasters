package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Tag;
import com.fer.progi.errormasters.Cookbooked.repositories.TagRepository;
import com.fer.progi.errormasters.Cookbooked.services.TagService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class TagServiceImpl implements TagService {
    TagRepository tagRepository;
    @Override
    public Optional<Tag> getTagByName(String name) {
        return tagRepository.findByName(name);

    }
}
