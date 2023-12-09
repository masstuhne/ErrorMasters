package com.fer.progi.errormasters.Cookbooked.services.impl;

import com.fer.progi.errormasters.Cookbooked.entities.Role;
import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;
import com.fer.progi.errormasters.Cookbooked.repositories.RoleRepository;
import com.fer.progi.errormasters.Cookbooked.services.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Optional<Role> getRoleByName(RoleEnum name) {
        return roleRepository.findByName(name);
    }
}
