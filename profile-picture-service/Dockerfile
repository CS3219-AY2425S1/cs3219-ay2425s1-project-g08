# Use an official Maven image as the base image
FROM maven:3.9.9-eclipse-temurin-23 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

RUN touch src/main/resources/gcp-service-account-key.json

# Build the application
RUN mvn clean package 

# Use OpenJDK for the runtime image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Specify the command to run the application
CMD ["java", "-jar", "app.jar"]