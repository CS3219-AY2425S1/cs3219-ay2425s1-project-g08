package peerprep.profile_picture_service.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;

/**
 * Service to process logic involving storage from google cloud
 */
@Service
public class StorageService {

    /**
     * Bean instance of Storage class in Google Cloud Library
     */
    @Autowired
    private Storage storage;

    /**
     * Bucket name that access the storage for profile picture
     */
    @Value("${gcp.bucket.name}")
    private String bucketName;

    /**
     * @param file New profile picture
     * @param userId User that request for new profile picture
     * @return Returns link for profile picture in google cloud
     * @throws IOException Exception when upload of file fails
     */
    public String uploadFile(MultipartFile file, String userId) throws IOException {
        String fileName = "profile-pictures/" + userId;
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();
        Blob blob = storage.create(blobInfo, file.getBytes());
        return blob.getMediaLink();
    }

    /**
     * @param userId User profile picture to fetch
     * @return Link to user profile picture stored in google cloud
     */
    public String getFileUrl(String userId) {
        String fileName = "profile-pictures/" + userId;
        BlobId blobId = BlobId.of(bucketName, fileName);
        Blob blob = storage.get(blobId);
        if (blob != null && blob.exists()) {
            return blob.getMediaLink();
        }
        return null;
    }
}