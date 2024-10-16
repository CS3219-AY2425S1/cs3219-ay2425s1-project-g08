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

@Service
public class StorageService {

    @Autowired
    private Storage storage;

    @Value("${gcp.bucket.name}")
    private String bucketName;

    public String uploadFile(MultipartFile file, String userId) throws IOException {
        String fileName = "profile-pictures/" + userId;
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();
        Blob blob = storage.create(blobInfo, file.getBytes());
        return blob.getMediaLink();
    }

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