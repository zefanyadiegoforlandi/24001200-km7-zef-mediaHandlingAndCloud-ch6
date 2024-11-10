FROM node:20-alpine

WORKDIR /usr/src/app

# Menyalin file package.json dan package-lock.json untuk menginstall dependensi terlebih dahulu
COPY package*.json ./
RUN npm install

# Menyalin semua file proyek ke dalam image
COPY . .

EXPOSE 3000

# Menambahkan perintah untuk menjalankan migrasi dan aplikasi
CMD npm start
