package ch.planner.plannersvc.auth;

import java.lang.annotation.*;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Order(Ordered.HIGHEST_PRECEDENCE)
public @interface WithSessionState {
}
