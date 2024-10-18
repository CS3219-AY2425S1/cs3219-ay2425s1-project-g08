package peerprep.profile_picture_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import peerprep.profile_picture_service.service.StorageService;
import peerprep.profile_picture_service.config.ApiConfig;

import java.io.IOException;

@CrossOrigin(origins = ApiConfig.FRONTEND_URL)
@RestController
@RequestMapping("/users")
public class ProfilePictureController {

    @Autowired
    private StorageService storageService;

    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String url = storageService.uploadFile(file, userId);
            return ResponseEntity.ok().body(new UploadResponse("File uploaded successfully", url));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<?> getProfilePicture(@PathVariable String userId) {
        String url = storageService.getFileUrl(userId);
        if (url != null) {
            return ResponseEntity.ok().body(new ProfilePictureResponse(url));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private static class UploadResponse {
        public String message;
        public String url;

        public UploadResponse(String message, String url) {
            this.message = message;
            this.url = url;
        }
    }

    private static class ProfilePictureResponse {
        public String imageUrl;

        public ProfilePictureResponse(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }
}