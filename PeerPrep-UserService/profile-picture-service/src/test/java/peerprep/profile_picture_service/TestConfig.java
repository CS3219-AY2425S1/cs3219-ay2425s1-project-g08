package peerprep.profile_picture_service;

import com.google.cloud.storage.Storage;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import static org.mockito.Mockito.mock;

/**
 * To mock the configurations for test.
 */
@TestConfiguration
public class TestConfig {
    /**
     * Mock the storage as Auth Default Cred is not present during docker build
     * phase.
     * @return Mock storage
     */
    @Bean
    public Storage mockStorage() {
        return mock(Storage.class);
    }
}
