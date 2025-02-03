package ch.planner.plannersvc.repository;

import ch.planner.plannersvc.model.Project;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, String> {
  List<Project> findAllByCompanyId(String companyId);

  Optional<Project> findByIdAndCompanyId(String id, String companyId);
}
