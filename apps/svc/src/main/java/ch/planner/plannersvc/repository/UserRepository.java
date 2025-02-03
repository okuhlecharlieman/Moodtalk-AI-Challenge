package ch.planner.plannersvc.repository;

import ch.planner.plannersvc.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
  Optional<User> findByEmail(String email);
}
