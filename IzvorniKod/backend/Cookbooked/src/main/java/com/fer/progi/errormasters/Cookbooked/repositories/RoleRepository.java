package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fer.progi.errormasters.Cookbooked.entities.Role;
import com.fer.progi.errormasters.Cookbooked.entities.User;
import com.fer.progi.errormasters.Cookbooked.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    public Optional<Role> findByName(RoleEnum name);
}
