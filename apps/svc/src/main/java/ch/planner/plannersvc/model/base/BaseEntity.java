package ch.planner.plannersvc.model.base;

import static org.hibernate.internal.util.StringHelper.isBlank;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.UUID;

@Getter
@SuperBuilder(toBuilder = true)
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

  @Id
  @Column(name = "id", nullable = false)
  private String id;

  @PrePersist
  public void prePersist() {
    if (isBlank(id)) {
      id = UUID.randomUUID().toString();
    }
  }

  protected void setId(String id) {
    this.id = id;
  }
}
