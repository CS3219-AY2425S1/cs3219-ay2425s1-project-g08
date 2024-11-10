import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class LoadTest {
    private static final String HOSTNAME = "http://34.143.227.15:3000";
    private static final String URL_TO_TEST = HOSTNAME + "/match/findMatch";
    private static final int THREADS_TO_SPAWN = 20;
    private static final int WORK_PER_THREAD = 500;
    private static final String REQUEST_BODY = """
            {
                "name": "temp",
                "category": "ALGORITHMS",
                "difficulty": "EASY"
            }
            """;

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(THREADS_TO_SPAWN);
        HttpClient client = HttpClient.newHttpClient();

        for (int i = 0; i < THREADS_TO_SPAWN; i++) {
            executorService.submit(() -> sendRequests(client));
        }

        // Shut down the executor service
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(1, TimeUnit.MINUTES)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
        }
    }

    private static void sendRequests(HttpClient client) {
        for (int i = 0; i < WORK_PER_THREAD; i++) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(URL_TO_TEST))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(REQUEST_BODY))
                    .build();

            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println("Response Code: " + response.statusCode());
            } catch (Exception e) {
                System.err.println("Request failed: " + e.getMessage());
            }
        }
    }
}
