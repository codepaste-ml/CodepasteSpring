FROM openjdk:11-jdk-slim AS build
WORKDIR /build/

# Run gradlew with only wrapper files to cache binary
COPY gradlew /build/
COPY gradle /build/gradle
RUN ./gradlew --version

# Cache dependencies
COPY build.gradle.kts settings.gradle /build/
RUN ./gradlew build -x test --no-daemon || return 0

COPY . /build
RUN ./gradlew build -x test --no-daemon


FROM openjdk:11-jdk-slim
EXPOSE 8080
RUN mkdir /app
COPY --from=build /build/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-Xms400m", "-Xmx400m", "-Xss512k", "-XX:CICompilerCount=2", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]
