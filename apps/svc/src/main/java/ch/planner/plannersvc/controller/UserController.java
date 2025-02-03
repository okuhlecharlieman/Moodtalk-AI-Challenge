package ch.planner.plannersvc.controller;

import ch.planner.plannersvc.api.UserApi;
import ch.planner.plannersvc.auth.IsUser;
import ch.planner.plannersvc.auth.SessionState;
import ch.planner.plannersvc.auth.WithSessionState;
import ch.planner.plannersvc.controller.converter.EnumConverter;
import ch.planner.plannersvc.controller.converter.UserConverter;
import ch.planner.plannersvc.dto.LanguageDto;
import ch.planner.plannersvc.dto.UserDto;
import ch.planner.plannersvc.model.Language;
import ch.planner.plannersvc.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@WithSessionState
@AllArgsConstructor
public class UserController implements UserApi {

  private final SessionState sessionState;
  private final UserService userService;

  @Override
  @IsUser
  public ResponseEntity<UserDto> getUser() {
    return ResponseEntity.ok(UserConverter.toDto(sessionState.getUser())
    );
  }

  @Override
  @IsUser
  public ResponseEntity<Void> putLanguage(LanguageDto lang) {
    userService.saveLanguage(sessionState.getUser(), EnumConverter.convert(Language.class, Language.DE, lang));

    return ResponseEntity.noContent().build();
  }
}
