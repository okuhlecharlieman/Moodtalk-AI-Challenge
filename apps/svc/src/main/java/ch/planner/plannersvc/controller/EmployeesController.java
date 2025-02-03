package ch.planner.plannersvc.controller;

import ch.planner.plannersvc.api.EmployeesApi;
import ch.planner.plannersvc.api.UserApi;
import ch.planner.plannersvc.auth.IsUser;
import ch.planner.plannersvc.auth.SessionState;
import ch.planner.plannersvc.auth.WithSessionState;
import ch.planner.plannersvc.controller.converter.EmployeeConverter;
import ch.planner.plannersvc.controller.converter.EnumConverter;
import ch.planner.plannersvc.controller.converter.UserConverter;
import ch.planner.plannersvc.dto.EmployeeDto;
import ch.planner.plannersvc.dto.EmployeeProperties;
import ch.planner.plannersvc.dto.LanguageDto;
import ch.planner.plannersvc.dto.UserDto;
import ch.planner.plannersvc.model.Employee;
import ch.planner.plannersvc.model.Language;
import ch.planner.plannersvc.service.EmployeeService;
import ch.planner.plannersvc.service.UserService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@WithSessionState
@AllArgsConstructor
public class EmployeesController implements EmployeesApi {

  private final SessionState sessionState;
  private final EmployeeService employeeService;

  @Override
  @IsUser
  public ResponseEntity<EmployeeDto> createEmployee(EmployeeProperties employeeProperties) {
    final Employee employee = EmployeeConverter.fromProperties(employeeProperties);

    final Employee saved = employeeService.createEmployee(sessionState.getUser(), employee);

    return ResponseEntity.ok(EmployeeConverter.toDto(saved));
  }

  @Override
  @IsUser
  public ResponseEntity<List<EmployeeDto>> getEmployees() {
    final List<Employee> employees = employeeService.getEmployees(sessionState.getUser());

    final List<EmployeeDto> dtos = EmployeeConverter.toDtos(employees);

    return ResponseEntity.ok(dtos);
  }

  @Override
  @IsUser
  public ResponseEntity<EmployeeDto> updateEmployee(String employeeId, EmployeeProperties employeeProperties) {
    final Employee employee = EmployeeConverter.fromProperties(employeeProperties);

    final Employee updated = employeeService.updateEmployee(sessionState.getUser(), employeeId, employee);

    return ResponseEntity.ok(EmployeeConverter.toDto(updated));
  }
}
