FROM eclipse-temurin:17-jdk AS build

# Name of the working directory
WORKDIR /app

# Copies all the source code file into the WORKDIR
COPY . .

# This is used to download the maven wrapper script
# It is used to run the maven commands without having maven installed on the system
RUN chmod +x ./mvnw

# This builds the spring-boot maven project/ application
# -DskipTests is used to skip tests during the build process
RUN ./mvnw clean package -DskipTests 

FROM eclipse-temurin:17-jdk

# here working dir name can be different, then that in the build working dir name
WORKDIR /app

# Copies all the .jar file from the build stage to the current working directory
# The .jar file is located in the target directory of the maven project
COPY --from=build /app/target/*.jar app.jar

# This is used to run the spring-boot application on port 9090
# The port can be changed to any other port, but it should be the same as the one used in the application.properties file
# or the one used in the docker-compose file
EXPOSE 9090

# This starts the spring-boot java application that was build
ENTRYPOINT ["java", "-jar", "app.jar"]
