package ch.planner.plannersvc.auth;

import ch.planner.plannersvc.model.User;
import ch.planner.plannersvc.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

@RequiredArgsConstructor
public class AuthStateJwtDataProvider {

  private final JwtAuthenticationToken token;
  private final UserRepository userRepository;
  private final HttpServletRequest request;

  private boolean userLoaded = false;
  private User user;

  public User getUser() {
    if (!this.userLoaded) {
      this.user = userRepository.findByEmail(getEmail()).orElse(null);
      this.userLoaded = true;
    }

    return this.user;
  }

  public String getEmail() {
    return (String) token.getTokenAttributes().get("email");
  }
}
