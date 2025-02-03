package ch.planner.plannersvc.model;

import ch.planner.plannersvc.model.base.CompanyAwareBaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
public class User extends CompanyAwareBaseEntity {

  @Column(name = "email", unique = true, nullable = false)
  private String email;

  @Column(name = "lang", nullable = false)
  @Enumerated(EnumType.STRING)
  @Setter
  private Language lang;

}
