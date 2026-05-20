FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 3408

CMD ["java", "-jar", "target/backend_empleado-0.0.1-SNAPSHOT.jar"]
