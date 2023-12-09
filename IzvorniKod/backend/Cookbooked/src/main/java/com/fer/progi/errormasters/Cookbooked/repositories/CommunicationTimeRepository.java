package com.fer.progi.errormasters.Cookbooked.repositories;

import com.fer.progi.errormasters.Cookbooked.entities.CommunicationTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunicationTimeRepository extends JpaRepository<CommunicationTime, Integer> {
}
