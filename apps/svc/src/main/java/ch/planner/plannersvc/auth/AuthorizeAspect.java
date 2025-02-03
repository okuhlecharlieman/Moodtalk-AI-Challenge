package ch.planner.plannersvc.auth;

import java.lang.reflect.Method;

import ch.planner.plannersvc.exception.AuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class AuthorizeAspect {

  private final SessionState sessionState;

  @Pointcut("within(@org.springframework.web.bind.annotation.RestController *) && @target(ch.planner.plannersvc.auth.WithSessionState)")
  public void relevantControllers() {}

  @Pointcut("relevantControllers() && @annotation(ch.planner.plannersvc.auth.NonAuthenticated)")
  public void nonAuthenticated() {}

  @Pointcut("relevantControllers() && @annotation(ch.planner.plannersvc.auth.IsUser)")
  public void isUserPointcut() {}

  @Before("relevantControllers() && !nonAuthenticated() && !isUserPointcut()")
  public void defaultAuthorization(final JoinPoint joinPoint) {
    throw new AuthException("Default Authorization Failed");
  }

  @Before("isUserPointcut()")
  public void isUser(final JoinPoint joinPoint) {
    final Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
    IsUser annotation = method.getAnnotation(IsUser.class);

    if (sessionState.getUser() == null) {
      throw new AuthException("No User found.");
    }
  }
}
