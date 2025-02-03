package ch.planner.plannersvc.service;

import ch.planner.plannersvc.model.Language;
import ch.planner.plannersvc.model.User;
import ch.planner.plannersvc.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
@AllArgsConstructor
@Validated
@Slf4j
public class UserService {

  private final UserRepository userRepository;


  public void saveLanguage(User user, Language lang) {
    user.setLang(lang);
    userRepository.save(user);
  }
}
