package ch.planner.plannersvc.model;

import ch.planner.plannersvc.model.base.BaseEntity;
import ch.planner.plannersvc.model.base.CompanyAwareBaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "company")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
public class Company extends BaseEntity {

  @Column(name = "name", unique = true, nullable = false)
  private String name;

  @Column(name = "logo")
  @Setter
  private String logo;

}
