package ch.planner.plannersvc.auth;

import ch.planner.plannersvc.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SessionStateService {

  private final UserRepository userRepository;
  private final HttpServletRequest request;

  public SessionState getSessionState() {
    AuthStateJwtDataProvider sessionStateDataProvider = getSessionDataProvider();

    if (sessionStateDataProvider == null) {
      return SessionState.builder().user(null).build();
    }

    return SessionState
      .builder()
      .user(sessionStateDataProvider.getUser())
      .email(sessionStateDataProvider.getEmail())
      .build();
  }

  private AuthStateJwtDataProvider getSessionDataProvider() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication instanceof JwtAuthenticationToken) {
      return new AuthStateJwtDataProvider((JwtAuthenticationToken) authentication, userRepository, request);
    }

    return null;
  }
}
