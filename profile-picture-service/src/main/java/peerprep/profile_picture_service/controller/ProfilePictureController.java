package peerprep.profile_picture_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import peerprep.profile_picture_service.service.StorageService;
import peerprep.profile_picture_service.config.ApiConfig;

import java.io.IOException;

/**
 * Controller for Profile Picture Service, handles API and calls necessary
 * service.
 */
@CrossOrigin(origins = ApiConfig.FRONTEND_URL)
@RestController
@RequestMapping("/users")
public class ProfilePictureController {

    /**
     * Bean instance of StorageService to process logic.
     */
    @Autowired
    private StorageService storageService;

    /**
     * Uploads a profile picture for a specific user.
     *
     * @param userId Profile picture of user to fetch
     * @param file New profile picture
     * @return ResponseEntity containing UploadResponse with link to get profile
     * picture from google cloud
     */
    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(
            @PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String url = storageService.uploadFile(file, userId);
            return ResponseEntity.ok().body(new UploadResponse(
                    "File uploaded successfully", url));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading"
                    + " file: " + e.getMessage());
        }
    }

    /**
     * Retrieves the profile picture URL for a specific user.
     *
     * @param userId User that requests profile picture
     * @return ResponseEntity containing ProfilePictureResponse with link of
     * profile picture from google cloud
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
     * An encapsulation of upload response.
     */
    public static class UploadResponse {
        /**
         * Message of response.
         */
        private String message;

        /**
         * Url of uploaded profile picture.
         */
        private String url;

        /**
         * Constructs an UploadResponse with a message and URL.
         *
         * @param message Message of response
         * @param url Url of profile picture
         */
        public UploadResponse(String message, String url) {
            this.message = message;
            this.url = url;
        }

        /**
         * Gets the response message.
         *
         * @return The response message
         */
        public String getMessage() {
            return message;
        }

        /**
         * Sets the response message.
         *
         * @param message The response message to set
         */
        public void setMessage(String message) {
            this.message = message;
        }

        /**
         * Gets the URL of the uploaded profile picture.
         *
         * @return The URL of the profile picture
         */
        public String getUrl() {
            return url;
        }

        /**
         * Sets the URL of the uploaded profile picture.
         *
         * @param url The URL to set
         */
        public void setUrl(String url) {
            this.url = url;
        }
    }

    /**
     * An encapsulation of profile picture response.
     */
    public static class ProfilePictureResponse {
        /**
         * Url of profile picture returned from google cloud.
         */
        private String imageUrl;

        /**
         * Constructs a ProfilePictureResponse with an image URL.
         *
         * @param imageUrl Url of profile picture from google cloud
         */
        public ProfilePictureResponse(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        /**
         * Gets the URL of the profile picture.
         *
         * @return The URL of the profile picture
         */
        public String getImageUrl() {
            return imageUrl;
        }

        /**
         * Sets the URL of the profile picture.
         *
         * @param imageUrl The URL of the profile picture to set
         */
        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }
}
