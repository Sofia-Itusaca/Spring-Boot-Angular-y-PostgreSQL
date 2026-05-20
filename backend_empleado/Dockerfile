FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY backend_empleado/pom.xml .
COPY backend_empleado/.mvn .mvn
COPY backend_empleado/mvnw .
COPY backend_empleado/src src

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","app.jar"]
