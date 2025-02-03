package ch.planner.plannersvc.auth;

import ch.planner.plannersvc.model.User;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SessionState {

  private User user;
  private String email;
}
