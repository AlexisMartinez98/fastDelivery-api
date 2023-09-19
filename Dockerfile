# Template image
    FROM node:latest

# Crear un directorio de la app  
    WORKDIR /Fast-Delivery-Back

# Archivos a copiar para generar la imagen
    COPY package*.json ./
    COPY . .

# Instalar las dependencias necesarias
    RUN npm install

# Exponer los puertos del proyecto
    EXPOSE 3000 

# Ejecutar el proyecto
    CMD ["npm","start"]