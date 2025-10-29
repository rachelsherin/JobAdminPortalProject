# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj and restore separately for layer caching
COPY *.sln ./
COPY JobManagementAPI/*.csproj ./JobManagementAPI/
RUN dotnet restore

# copy all source and publish
COPY . .
WORKDIR /src/JobManagementAPI
RUN dotnet publish -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "JobManagementAPI.dll"]
