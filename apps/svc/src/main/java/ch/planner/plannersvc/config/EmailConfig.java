package ch.planner.plannersvc.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "planner.email")
public class EmailConfig {

  private boolean useRecipient;
  private boolean sendEmails;
  private boolean sendAzureEmails;
  private String host;
  private String connectionString;
}
