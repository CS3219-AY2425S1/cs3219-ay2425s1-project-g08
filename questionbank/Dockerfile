# Build stage
FROM gradle:7.6.1-jdk17 AS build
WORKDIR /app
COPY build.gradle settings.gradle gradlew ./
COPY gradle/wrapper/ gradle/wrapper/
COPY src src
RUN ./gradlew build --no-daemon 

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
RUN addgroup --system javauser && adduser --system --ingroup javauser javauser
USER javauser
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]