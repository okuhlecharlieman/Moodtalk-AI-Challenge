package ch.planner.plannersvc.repository;

import ch.planner.plannersvc.model.Employee;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, String> {
  List<Employee> findAllByCompanyId(String companyId);

  Optional<Employee> findByIdAndCompanyId(String id, String companyId);
}
