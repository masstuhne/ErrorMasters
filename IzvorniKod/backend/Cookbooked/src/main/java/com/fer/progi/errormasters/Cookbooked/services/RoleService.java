package com.fer.progi.errormasters.Cookbooked.services;

import com.fer.progi.errormasters.Cookbooked.entities.Role;
import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;

import java.util.Optional;

public interface RoleService {
    Optional<Role> getRoleByName(RoleEnum name);
}
