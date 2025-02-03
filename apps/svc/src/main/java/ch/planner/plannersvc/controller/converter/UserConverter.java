package ch.planner.plannersvc.controller.converter;

import ch.planner.plannersvc.dto.LanguageDto;
import ch.planner.plannersvc.dto.UserDto;
import ch.planner.plannersvc.model.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserConverter {

  public static UserDto toDto(User user) {
    if (user == null) {
      return null;
    }

    return new UserDto()
      .id(user.getId())
      .email(user.getEmail())
      .language(EnumConverter.convert(LanguageDto.class, LanguageDto.DE, user.getLang()))
      .company(CompanyConverter.toDto(user.getCompany()));
  }
}
