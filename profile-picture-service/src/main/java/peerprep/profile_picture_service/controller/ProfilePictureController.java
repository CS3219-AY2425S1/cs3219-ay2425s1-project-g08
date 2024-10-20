package peerprep.profile_picture_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;
import peerprep.profile_picture_service.service.StorageService;
import peerprep.profile_picture_service.config.ApiConfig;

import java.io.IOException;

/**
 * Controller for Profile Picture Service, handles API and calls necessary
 * service
 */
@CrossOrigin(origins = ApiConfig.FRONTEND_URL)
@RestController
@RequestMapping("/users")
public class ProfilePictureController {

    /**
     * Bean instance of StorageService to process logic
     */
    @Autowired
    private StorageService storageService;

    /**
     * @param userId Profile picture of user to fetch
     * @param file New profile picture
     * @return Link to get profile picture from google cloud
     */
    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String url = storageService.uploadFile(file, userId);
            return ResponseEntity.ok().body(new UploadResponse(
                    "File uploaded successfully", url));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading" +
                    " file: " + e.getMessage());
        }
    }

    /**
     * @param userId User that request profile picture
     * @return Link of profile picture from google cloud
     */
    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<?> getProfilePicture(@PathVariable String userId) {
        String url = storageService.getFileUrl(userId);
        if (url != null) {
            return ResponseEntity.ok().body(new ProfilePictureResponse(url));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * An encapsulation of upload response
     */
    private static class UploadResponse {
        public String message;
        public String url;

        public UploadResponse(String message, String url) {
            this.message = message;
            this.url = url;
        }
    }

    /**
     * An encapsulation of profile picture response
     */
    private static class ProfilePictureResponse {
        public String imageUrl;

        public ProfilePictureResponse(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }
}
