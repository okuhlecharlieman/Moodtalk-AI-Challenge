package ch.planner.plannersvc.model.base;

import ch.planner.plannersvc.model.Company;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CompanyAwareBaseEntity extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
  @JoinColumn(name = "fk_company_id", nullable = false, updatable = false, insertable = false)
  @EqualsAndHashCode.Exclude
  private Company company;

  @Column(name = "fk_company_id", nullable = false)
  private String companyId;
}
