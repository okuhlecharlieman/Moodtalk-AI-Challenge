package ch.planner.plannersvc.controller.converter;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EnumConverter {

  public static <T1 extends Enum<T1>, T2 extends Enum<T2>> T1 convert(Class<T1> enumType, T2 enumValue) {
    if (enumValue == null) {
      return null;
    }

    return Enum.valueOf(enumType, enumValue.name());
  }

  public static <T1 extends Enum<T1>, T2 extends Enum<T2>> T1 convert(
    Class<T1> enumType,
    T1 defaultValue,
    T2 enumValue
  ) {
    if (enumValue == null) {
      return defaultValue;
    }

    return Enum.valueOf(enumType, enumValue.name());
  }
}
