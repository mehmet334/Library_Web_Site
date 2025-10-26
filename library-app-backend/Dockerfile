# Java 17 imajı kullan
FROM eclipse-temurin:17-jdk

# Çalışma dizini oluştur
WORKDIR /app

# Maven Wrapper ve kaynak dosyalarını kopyala
COPY . .

# Uygulamayı derle (testleri atla)
RUN ./mvnw clean package -DskipTests

# Spring Boot jar'ını çalıştır
CMD ["java", "-jar", "target/library-app-backend-0.0.1-SNAPSHOT.jar"]
