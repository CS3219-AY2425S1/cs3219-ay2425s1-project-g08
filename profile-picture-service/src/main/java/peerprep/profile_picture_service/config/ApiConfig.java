package peerprep.profile_picture_service.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;


/**
 * Configuration of API used in application.
 */
@Configuration
public class ApiConfig {
    /**
     * Frontend URL from environment variable.
     */
    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String frontendUrl;

}
