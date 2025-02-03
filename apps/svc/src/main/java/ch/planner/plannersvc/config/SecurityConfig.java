package ch.planner.plannersvc.config;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.oauth2.server.resource.authentication.JwtIssuerAuthenticationManagerResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@EnableWebSecurity
public class SecurityConfig {

  @Setter
  @Configuration
  @ConfigurationProperties(prefix = "spring.security.config")
  public static class ApiSecurityConfig {

    private List<String> corsAllowedOrigins;

    private List<String> resourceServers;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .headers(headers -> headers.cacheControl(HeadersConfigurer.CacheControlConfig::disable))
        .formLogin(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
        .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .oauth2ResourceServer(oauth2 -> oauth2.authenticationManagerResolver(getAuthenticationManagerResolver()));
      return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverterForKeycloak() {
      Converter<Jwt, Collection<GrantedAuthority>> jwtGrantedAuthoritiesConverter = jwt -> {
        List<String> clientRoles = new ArrayList<>();

        Map<String, Map<String, List<String>>> resourceAccess = jwt.getClaim("resource_access");
        resourceAccess.forEach((key, value) ->
          clientRoles.addAll(
            new ArrayList<>(
              value
                .get("roles")
                .stream()
                .map(r -> "ROLE_" + key.toUpperCase() + '_' + r.toUpperCase())
                .collect(Collectors.toList())
            )
          )
        );

        return clientRoles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
      };

      JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
      jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
      return jwtAuthenticationConverter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration corsConfiguration = new CorsConfiguration();
      corsConfiguration.setAllowedOrigins(this.corsAllowedOrigins);
      corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
      corsConfiguration.setAllowedMethods(Arrays.asList("*"));
      corsConfiguration.setAllowCredentials(true);
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", corsConfiguration);

      return source;
    }

    private JwtIssuerAuthenticationManagerResolver getAuthenticationManagerResolver() {
      final Map<String, AuthenticationManager> authenticationManagers = new HashMap<>();

      resourceServers.forEach(issuer -> {
        JwtAuthenticationProvider authenticationProvider = new JwtAuthenticationProvider(
          JwtDecoders.fromOidcIssuerLocation(issuer)
        );
        authenticationProvider.setJwtAuthenticationConverter(jwtAuthenticationConverterForKeycloak());
        authenticationManagers.put(issuer, authenticationProvider::authenticate);
      });

      return new JwtIssuerAuthenticationManagerResolver(authenticationManagers::get);
    }
  }
}
