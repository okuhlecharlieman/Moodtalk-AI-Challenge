package ch.planner.plannersvc.auth;

import jakarta.servlet.http.HttpSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class SessionStateProvider {

  @Bean
  @RequestScope
  @Primary
  public HttpSession httpSession() {
    final ServletRequestAttributes attributes =
      (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
    // True means that create is allowed if not exists
    return attributes.getRequest().getSession(true);
  }

  @Bean
  @RequestScope
  public SessionState sessionState(SessionStateService sessionStateService) {
    return sessionStateService.getSessionState();
  }
}
